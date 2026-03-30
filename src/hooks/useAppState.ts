import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  scheduleNotification,
  cancelAllNotifications,
} from "@/src/services/notificationService";

const LAST_ACTIVE_KEY = "last_active";

export const useAppState = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const recordActive = async () => {
      const now = Date.now();
      await AsyncStorage.setItem(LAST_ACTIVE_KEY, now.toString());
    };
    recordActive();

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current === "active" &&
      nextAppState.match(/inactive|background/)
    ) {
    } else if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      const lastActiveStr = await AsyncStorage.getItem(LAST_ACTIVE_KEY);
      const lastActive = lastActiveStr ? parseInt(lastActiveStr) : 0;
      const now = Date.now();
      const hoursSince = (now - lastActive) / (1000 * 60 * 60);
      if (hoursSince >= 24) {
        await scheduleNotification(
          "We miss you!",
          "You haven’t opened the app in 24 hours. Come back and continue learning.",
        );
      }

      await AsyncStorage.setItem(LAST_ACTIVE_KEY, now.toString());
    }
    appState.current = nextAppState;
  };
};
