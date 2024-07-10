import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native'; // Assuming you're using Tailwind CSS React Native or a similar approach


const AnimatedToggleButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const moveAnimation = useRef(new Animated.Value(0)).current;
 

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    Animated.timing(moveAnimation, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

const movingMargin = moveAnimation.interpolate({
    inputRange: [0, 1],
    
    outputRange: [0, 20],
});

  return (
    <View className='flex-1 items-center justify-center'>
      <TouchableOpacity onPress={toggleSwitch}  className='w-14 h-8 py-1 px-1  rounded-lg justify-center border border-[#EFEFEF33]'>
        
        <Animated.View className={` ${isEnabled ? 'bg-[#1DB954]' : 'bg-gray-400'} h-6 w-6 rounded-lg  items-center`} style = { {transform: [{ translateX: movingMargin }] }} >
          
        </Animated.View>
                
      </TouchableOpacity>
    </View>
  );
};

export default AnimatedToggleButton;