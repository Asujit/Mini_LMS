import { TextInput, View } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/config/constants";

interface SearchBarProps {
  onSearch: (text: string) => void;
  placeholder?: string;
  debounceDelay?: number;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search courses...",
  debounceDelay = 300,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [query, debounceDelay]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <View className="flex-row items-center bg-card border border-border rounded-2xl px-4 py-3 mx-4 my-2">
      <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} />
      <TextInput
        className="flex-1 ml-2 text-textPrimary text-base"
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}
