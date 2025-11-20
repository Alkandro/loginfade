import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Animated,
{
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const CONTAINER_WIDTH = width * 0.9;

export default function App() {
  const [isRegister, setIsRegister] = useState(false);

  // Mueve todo el slider (Login -> Register)
  const translateX = useSharedValue(0);

  // Mueve el fondo del gradiente
  const gradientX = useSharedValue(0);

  // Fade para suavizar el cambio de color
  const overlayOpacity = useSharedValue(0);

  const toggleForm = () => {
    const goReg = !isRegister;
    setIsRegister(goReg);

    // Slide de las pantallas
    translateX.value = withTiming(goReg ? -CONTAINER_WIDTH : 0, {
      duration: 700,
      easing: Easing.out(Easing.quad),
    });

    // Slide del fondo
    gradientX.value = withTiming(goReg ? -CONTAINER_WIDTH : 0, {
      duration: 700,
      easing: Easing.out(Easing.quad),
    });

    // Fade extra
    overlayOpacity.value = withTiming(goReg ? 1 : 0, {
      duration: 500,
      easing: Easing.ease,
    });
  };

  // Animación para el slider (pantallas)
  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Animación del fondo deslizante
  const gradientStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: gradientX.value }],
  }));

  // Fade del fondo para suavizar
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  // Fade + escala de cada pantalla
  const loginAnim = useAnimatedStyle(() => ({
    opacity: withTiming(isRegister ? 0 : 1, { duration: 350 }),
    transform: [
      { scale: withTiming(isRegister ? 0.9 : 1, { duration: 350 }) },
    ],
  }));

  const registerAnim = useAnimatedStyle(() => ({
    opacity: withTiming(isRegister ? 1 : 0, { duration: 350 }),
    transform: [
      { scale: withTiming(isRegister ? 1 : 0.9, { duration: 350 }) },
    ],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Login | Signup Animation</Text>

      <View style={styles.formContainer}>

        {/** BACKGROUND COMPLETO — SLIDE + FADE (OPCIÓN C) */}
        <Animated.View
          style={[
            styles.gradientSlider,
            gradientStyle
          ]}
        >
          <LinearGradient
            colors={['#1a1a1a', '#ff6b4a']}
            style={styles.gradientPage}
          />

          <LinearGradient
            colors={['#1a1a1a', '#6b4aff']}
            style={styles.gradientPage}
          />
        </Animated.View>

        {/** Capa oscura suave para transición */}
        <Animated.View style={[styles.fadeOverlay, overlayStyle]} />

        {/** SLIDER DE FORMULARIOS */}
        <Animated.View style={[styles.slider, sliderStyle]}>

          {/** LOGIN */}
          <Animated.View
            style={[styles.screen, loginAnim]}
            pointerEvents={isRegister ? 'none' : 'auto'}
          >
            <Text style={styles.formTitle}>Login</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aaa"
              />
              <Ionicons name="person-outline" size={20} color="#aaa" style={styles.icon} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
              />
              <Ionicons name="lock-closed-outline" size={20} color="#aaa" style={styles.icon} />
            </View>

            <TouchableOpacity style={styles.button}>
              <LinearGradient
                colors={['#ff6b4a', '#ff8c6b']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Don't have an account?</Text>
              <TouchableOpacity onPress={toggleForm}>
                <Text style={styles.linkButton}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/** REGISTER */}
          <Animated.View
            style={[styles.screen, registerAnim]}
            pointerEvents={isRegister ? 'auto' : 'none'}
          >
            <Text style={styles.formTitle}>Register</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aaa"
              />
              <Ionicons name="person-outline" size={20} color="#aaa" style={styles.icon} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
              />
              <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.icon} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
              />
              <Ionicons name="lock-closed-outline" size={20} color="#aaa" style={styles.icon} />
            </View>

            <TouchableOpacity style={styles.button}>
              <LinearGradient
                colors={['#6b4aff', '#8c6bff']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Already have an account?</Text>
              <TouchableOpacity onPress={toggleForm}>
                <Text style={styles.linkButton}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

        </Animated.View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  // Contenedor principal
  formContainer: {
    width: CONTAINER_WIDTH,
    height: height * 0.62,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#333',
    position: 'relative',
  },

  // FONDO DESLIZANTE
  gradientSlider: {
    position: 'absolute',
    width: CONTAINER_WIDTH * 2,
    height: '100%',
    flexDirection: 'row',
  },
  gradientPage: {
    width: CONTAINER_WIDTH,
    height: '100%',
  },

  // Fade extra
  fadeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  // SLIDER DE PANTALLAS
  slider: {
    position: 'absolute',
    width: CONTAINER_WIDTH * 2,
    height: '100%',
    flexDirection: 'row',
  },

  // Cada pantalla
  screen: {
    width: CONTAINER_WIDTH,
    padding: 25,
    justifyContent: 'center',
  },

  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 15,
    position: 'relative',
  },

  input: {
    borderBottomWidth: 1.4,
    borderBottomColor: '#444',
    color: '#fff',
    paddingVertical: 8,
    paddingRight: 30,
  },

  icon: {
    position: 'absolute',
    right: 0,
    top: 10,
  },

  button: {
    marginVertical: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  linkContainer: {
    alignItems: 'center',
  },
  linkText: {
    color: '#ccc',
    fontSize: 12,
  },
  linkButton: {
    color: '#ff6b4a',
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
});


