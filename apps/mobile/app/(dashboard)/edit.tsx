import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const TOOLS = [
  { id: 'adjust', name: 'Adjust', icon: 'contrast' as const },
  { id: 'filter', name: 'Filters', icon: 'color-filter' as const },
  { id: 'crop', name: 'Crop', icon: 'crop' as const },
  { id: 'text', name: 'Text', icon: 'text' as const },
  { id: 'draw', name: 'Draw', icon: 'brush' as const },
  { id: 'effects', name: 'Effects', icon: 'sparkles' as const },
];

export default function EditScreen() {
  const { imageId } = useLocalSearchParams();
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState('');

  const handleSave = () => {
    // Implement save logic here
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="close-outline" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://picsum.photos/400/400?random=${imageId}` }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.toolsScroll}
        contentContainerStyle={styles.toolsContainer}
      >
        {TOOLS.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={[
              styles.toolButton,
              selectedTool === tool.id && styles.toolButtonActive,
            ]}
            onPress={() => setSelectedTool(tool.id)}
          >
            <Ionicons
              name={tool.icon}
              size={24}
              color={selectedTool === tool.id ? '#4A90E2' : '#666'}
            />
            <Text
              style={[
                styles.toolText,
                selectedTool === tool.id && styles.toolTextActive,
              ]}
            >
              {tool.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.adjustmentPanel}>
        {selectedTool === 'adjust' && (
          <View style={styles.adjustTools}>
            <TouchableOpacity style={styles.adjustTool}>
              <Ionicons name="sunny-outline" size={24} color="#666" />
              <Text style={styles.adjustToolText}>Brightness</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adjustTool}>
              <Ionicons name="contrast-outline" size={24} color="#666" />
              <Text style={styles.adjustToolText}>Contrast</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adjustTool}>
              <Ionicons name="color-palette-outline" size={24} color="#666" />
              <Text style={styles.adjustToolText}>Saturation</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Add more tool panels here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerButton: {
    padding: 5,
  },
  saveButton: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 10,
  },
  toolsScroll: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  toolsContainer: {
    padding: 15,
    gap: 20,
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  toolButtonActive: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
  },
  toolText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  toolTextActive: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  adjustmentPanel: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  adjustTools: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  adjustTool: {
    alignItems: 'center',
  },
  adjustToolText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
});