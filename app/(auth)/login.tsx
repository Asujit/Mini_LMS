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
import { COLORS } from "@/src/config/constants";

// Validation schema
const loginSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Simulate API call – replace with actual auth logic later
      console.log("Login data:", data);
      // await loginApi(data.email, data.password);
      Alert.alert("Success", "Logged in successfully!", [
        { text: "OK", onPress: () => router.replace("/(tabs)/Index") },
      ]);
    } catch (error) {
      Alert.alert("Error", "Invalid credentials. Please try again.");
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

            {/* Email Field */}
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
              {errors.email && (
                <Text className="text-danger text-sm mt-1">{errors.email.message}</Text>
              )}
            </View>

            {/* Password Field */}
            <View className="mb-3">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`border rounded-2xl px-5 py-4 bg-card text-textPrimary text-base ${
                      errors.password ? "border-danger" : "border-border"
                    }`}
                    placeholder="Password"
                    placeholderTextColor={COLORS.textSecondary}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text className="text-danger text-sm mt-1">{errors.password.message}</Text>
              )}
            </View>

            <TouchableOpacity className="self-end mb-8">
              <Text className="text-primary font-medium text-base">Forgot Password?</Text>
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
            <Text className="text-textSecondary text-base">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text className="text-primary font-semibold text-base">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}