import { View, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { COLORS } from '@/src/config/constants';

interface ProfileImagePickerProps {
  currentImage?: string;
  onImageSelected: (uri: string) => void;
}

export default function ProfileImagePicker({ currentImage, onImageSelected }: ProfileImagePickerProps) {
  const [image, setImage] = useState(currentImage);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to set a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setImage(uri);
      onImageSelected(uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} className="relative self-center mb-6">
      <View className="w-32 h-32 rounded-full bg-gray-200 border-4 border-primary overflow-hidden">
        {image ? (
          <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="w-full h-full items-center justify-center bg-gray-100">
            <Ionicons name="person" size={48} color={COLORS.textSecondary} />
          </View>
        )}
      </View>
      <View className="absolute bottom-0 right-0 bg-primary rounded-full p-2 border-2 border-white">
        <Ionicons name="camera" size={16} color="white" />
      </View>
    </TouchableOpacity>
  );
}