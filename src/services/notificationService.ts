import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "Default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });
}

export const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return false;
  }
  return true;
};

export const scheduleNotification = async (
  title: string,
  body: string,
  seconds?: number,
) => {
  let trigger: Notifications.NotificationTriggerInput | null = null;
  if (seconds && seconds > 0) {
    trigger = {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
    };
  }
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger,
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const showBookmarkThresholdNotification = async (count: number) => {
  if (count >= 5) {
    await scheduleNotification(
      "🎉 You’re a fan!",
      `You’ve bookmarked ${count} courses. Keep learning!`,
    );
  }
};

export const showEnrollmentNotification = async (courseTitle: string) => {
  await scheduleNotification(
    "🎉 Enrollment Success!",
    `You enrolled in ${courseTitle}. Happy learning!`,
  );
};
