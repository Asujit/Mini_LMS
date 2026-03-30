import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/config/constants";
import { loginApi } from "@/src/api/authApi";
import { useAuthStore } from "@/src/store/authStore";
import { useState } from "react";

const loginSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginApi({
        username: data.username,
        password: data.password,
      });
      const { accessToken, user } = response.data.data;
      const mappedUser = {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar?.url,
        role: user.role,
      };
      await useAuthStore.getState().login(accessToken, mappedUser);
      router.replace("/(tabs)/Index");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      Alert.alert("Error", message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 justify-between py-8">
          <View>
            <Text className="text-5xl font-bold text-textPrimary mb-2 mt-12">
              Welcome!
            </Text>
            <Text className="text-lg text-textSecondary mb-12">
              Please sign in to continue
            </Text>

            <View className="mb-5">
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`border rounded-2xl px-5 py-4 bg-card text-textPrimary text-base ${
                      errors.username ? "border-danger" : "border-border"
                    }`}
                    placeholder="Username"
                    placeholderTextColor={COLORS.textSecondary}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.username && (
                <Text className="text-danger text-sm mt-1">
                  {errors.username.message}
                </Text>
              )}
            </View>

            <View className="mb-3">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="relative">
                    <TextInput
                      className={`border rounded-2xl px-5 py-4 pr-12 bg-card text-textPrimary text-base ${
                        errors.password ? "border-danger" : "border-border"
                      }`}
                      placeholder="Password"
                      placeholderTextColor={COLORS.textSecondary}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color={COLORS.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text className="text-danger text-sm mt-1">
                  {errors.password.message}
                </Text>
              )}
            </View>

            <TouchableOpacity className="self-end mb-8">
              <Text className="text-primary font-medium text-base">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-primary rounded-2xl py-4 items-center mb-6"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-lg">Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center pb-8">
            <Text className="text-textSecondary text-base">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text className="text-primary font-semibold text-base">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
