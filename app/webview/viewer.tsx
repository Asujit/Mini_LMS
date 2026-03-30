import { useLocalSearchParams, router } from 'expo-router';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, View, BackHandler, Alert, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/config/constants';

export default function WebViewerScreen() {
  const { url, title, instructor, description, duration } = useLocalSearchParams<{
    url?: string;
    title?: string;
    instructor?: string;
    description?: string;
    duration?: string;
  }>();

  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  let source;
  if (url) {
    const customHeaders = {
      'X-Course-Id': title || 'Unknown Course',
      'X-Instructor': instructor || 'Unknown',
    };
    source = { uri: url, headers: customHeaders };
  } else {
    source = require('../../assets/html/course_template.html');
  }

  const injectCourseData = `
    window.updateContent && window.updateContent({
      title: '${title || 'React Native Course'}',
      instructor: '${instructor || 'John Doe'}',
      duration: '${duration || '8 hours'}',
      description: '${description?.replace(/'/g, "\\'") || 'Learn React Native with hands-on projects.'}'
    });
    true;
  `;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, []);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-end bg-primary px-4 py-10">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">
          {title || 'Course Content'}
        </Text>
      </View>

      <View className="flex-1">
        {loading && (
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-10">
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
        <WebView
          ref={webViewRef}
          source={source}
          onLoadEnd={() => setLoading(false)}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          injectedJavaScript={injectCourseData}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
            Alert.alert('Error', 'Failed to load content. Please try again.');
          }}
        />
      </View>
    </View>
  );
}