import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/config/constants";
import { registerApi } from "@/src/api/authApi";
import { useState } from "react";

const registerSchema = yup.object({
  username: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerApi({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      Alert.alert("Success", "Account created successfully! Please login.", [
        { text: "OK", onPress: () => router.replace("/(auth)/login") },
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
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
            <Text className="text-5xl font-bold text-textPrimary mb-2 mt-12">Create an Account</Text>
            <Text className="text-lg text-textSecondary mb-12">Sign up to get started!</Text>

            
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
              {errors.username && <Text className="text-danger text-sm mt-1">{errors.username.message}</Text>}
            </View>

            
            <View className="mb-5">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`border rounded-2xl px-5 py-4 bg-card text-textPrimary text-base ${
                      errors.email ? "border-danger" : "border-border"
                    }`}
                    placeholder="Email"
                    placeholderTextColor={COLORS.textSecondary}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.email && <Text className="text-danger text-sm mt-1">{errors.email.message}</Text>}
            </View>

            
            <View className="mb-8">
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
              {errors.password && <Text className="text-danger text-sm mt-1">{errors.password.message}</Text>}
            </View>

            
            <TouchableOpacity
              className="bg-primary rounded-2xl py-4 items-center mb-6"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? <ActivityIndicator color="white" /> : <Text className="text-white font-semibold text-lg">Sign Up</Text>}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center pb-8">
            <Text className="text-textSecondary text-base">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text className="text-primary font-semibold text-base">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}