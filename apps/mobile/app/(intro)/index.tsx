import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'AI-Powered Image Generation',
    description: 'Create stunning images with the power of artificial intelligence',
    backgroundColor: '#4A90E2',
    illustration: `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="40" width="120" height="120" rx="8" stroke="white" stroke-width="4"/>
      <circle cx="100" cy="100" r="30" stroke="white" stroke-width="4"/>
      <path d="M70 70L130 130M130 70L70 130" stroke="white" stroke-width="4"/>
    </svg>`,
  },
  {
    id: 2,
    title: 'Edit & Customize',
    description: 'Fine-tune and personalize your generated images with advanced editing tools',
    backgroundColor: '#50C878',
    illustration: `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="50" stroke="white" stroke-width="4"/>
      <path d="M80 100L95 115L120 85" stroke="white" stroke-width="4"/>
      <path d="M150 50L170 70M170 50L150 70" stroke="white" stroke-width="4"/>
    </svg>`,
  },
  {
    id: 3,
    title: 'Join Our Community',
    description: 'Sign in to save your creations and connect with other creators',
    backgroundColor: '#9B59B6',
    illustration: `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="80" r="30" stroke="white" stroke-width="4"/>
      <path d="M60 140C60 118.67 77.67 100 100 100C122.33 100 140 118.67 140 140" stroke="white" stroke-width="4"/>
      <circle cx="60" cy="90" r="20" stroke="white" stroke-width="4"/>
      <circle cx="140" cy="90" r="20" stroke="white" stroke-width="4"/>
    </svg>`,
  },
];

export default function IntroScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const Indicator = ({ scrollX }: { scrollX: Animated.Value }) => {
    return (
      <View style={styles.indicatorContainer}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`indicator-${slides[i].id}`}
              style={[styles.indicator, { opacity, transform: [{ scale }] }]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={slides}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <View
            style={[styles.slide, { backgroundColor: item.backgroundColor }]}
          >
            <View style={styles.content}>
              <View style={styles.illustrationContainer}>
                <SvgXml xml={item.illustration} width={200} height={200} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Indicator scrollX={scrollX} />
        {currentIndex === slides.length - 1 ? (
          <Link href="/sign-in" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});