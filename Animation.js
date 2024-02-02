import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, Text, StyleSheet } from 'react-native';

const Animation = () => {
  const textOpacityValue = useRef(new Animated.Value(0)).current;
  const arrowTranslateYValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startTextAnimation();
    startArrowAnimation();
  }, []);

  const startTextAnimation = () => {
    Animated.timing(textOpacityValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const startArrowAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowTranslateYValue, {
          toValue: 20,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(arrowTranslateYValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <Animated.Text style={[styles.text, { opacity: textOpacityValue }]}>Upload Image</Animated.Text>
        <Animated.View style={[styles.arrowContainer, { transform: [{ translateY: arrowTranslateYValue }] }]}>
          <Text style={styles.arrow}>&#9660;</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 400,
    backgroundColor:'#F3EEEA',
    marginBottom:2
  },
  animationContainer: {
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 30,
  },
});

export default Animation;
