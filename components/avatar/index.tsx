import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import styles from './styles';
import { Image } from 'expo-image';
import { cn } from '../../lib/utils';

interface AvatarProps {
  className?: string,
  src: string,
  containerStyle?: string,
  initials: string,
  width?: number,
  height?: number
}

const Avatar = ({ src, initials, className, width, height, ...props }: AvatarProps) => {
  return (
    <View
      className={cn(styles.containerStyles, props.containerStyle)}
      // style={[styles.container, props.containerStyle]}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          className={cn(styles.imageStyles, className)}
          style={{ width: width ?? 100, height: height ?? 100, borderRadius: 999 }}
          // style={styles.image}
        />
      ) : (
        <View
          // style={styles.initials}
          style={{ width: 100, height: 100, borderRadius: 999 }}
          className={styles.initialsStyles}
        > 
            <Text className='text-3xl font-semibold'>
              {initials}
            </Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;
