// app/(auth)/register.tsx
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { COLORS } from '@/src/config/constants';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // TODO: Call API to register user
    Alert.alert('Sign Up', 'Implement registration later');
    // router.replace('/(tabs)'); // after success
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 justify-between py-8">
          <View>
            <Text className="text-5xl font-bold text-textPrimary mb-2 mt-12">
              Create an Account
            </Text>
            <Text className="text-lg text-textSecondary mb-12">
              Sign up to get started!
            </Text>

            {/* Name Field */}
            <View className="mb-5">
              <TextInput
                className="border border-border rounded-2xl px-5 py-4 bg-card text-textPrimary text-base"
                placeholder="Name"
                placeholderTextColor={COLORS.textSecondary}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email Field */}
            <View className="mb-5">
              <TextInput
                className="border border-border rounded-2xl px-5 py-4 bg-card text-textPrimary text-base"
                placeholder="Email"
                placeholderTextColor={COLORS.textSecondary}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password Field */}
            <View className="mb-8">
              <TextInput
                className="border border-border rounded-2xl px-5 py-4 bg-card text-textPrimary text-base"
                placeholder="Password"
                placeholderTextColor={COLORS.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-primary rounded-2xl py-4 items-center mb-6"
              onPress={handleSignUp}
            >
              <Text className="text-white font-semibold text-lg">Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Section */}
          <View className="flex-row justify-center pb-8">
            <Text className="text-textSecondary text-base">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text className="text-primary font-semibold text-base">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}