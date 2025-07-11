import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import StudyGlobeLogo from '../assets/StudyGlobeLogo.png';

const { width, height } = Dimensions.get('window');

export default function StartScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b']}
      style={styles.container}
    >
      {/* Decorative Light Blobs */}
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

      {/* Animated Content Card */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <BlurView intensity={50} tint="light" style={styles.blurCard}>
          <Image source={StudyGlobeLogo} style={styles.logo} />

          <Text style={styles.title}>StudyGlobe</Text>
          <Text style={styles.subtitle}>
            Unlock your future. Explore world-class education opportunities.
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPress={() => navigation.replace('MainTabs')}
          >
            <LinearGradient
              colors={['#FDE68A', '#F59E0B']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={styles.ctaText}>Get Started</Text>
              {/* <Text style={styles.arrow}>→</Text> */}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footer}>Made for dreamers & doers 🌍</Text>
        </BlurView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blobTop: {
    position: 'absolute',
    top: -120,
    right: -80,
    width: 250,
    height: 250,
    backgroundColor: 'rgba(253, 224, 71, 0.1)',
    borderRadius: 125,
  },
  blobBottom: {
    position: 'absolute',
    bottom: -140,
    left: -100,
    width: 280,
    height: 280,
    backgroundColor: 'rgba(253, 224, 71, 0.08)',
    borderRadius: 140,
  },
  card: {
    width: width * 0.85,
    maxWidth: 380,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
  },
  blurCard: {
    padding: 28,
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 18,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    maxWidth: 280,
  },
  ctaButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    marginBottom: 16,
  },
  ctaGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
  },
  arrow: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  footer: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
