import React from 'react';
import { View, Text, StyleProp, ViewStyle, Pressable } from 'react-native';
import styles from './styles';
import { Image } from 'expo-image';
import { cn } from '../../lib/utils';
import { ImagePlus } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

interface AvatarProps {
  className?: string,
  src: string,
  containerStyle?: string,
  initials: string,
  width?: number,
  height?: number,
  editMode?: boolean,
  onPress?: () => any
}

const Avatar = ({ src, initials, className, width, height, ...props }: AvatarProps) => {
  function renderAvatar() {
    return (
      <View
        className={cn(styles.containerStyles, props.containerStyle)}
      >
        {src ? (
          <Image
            source={{ uri: src }}
            className={cn(styles.imageStyles, className)}
            style={{ width: width ?? 100, height: height ?? 100, borderRadius: 999 }}
            contentFit="fill"
            // style={styles.image}
          />
        ) : (
          <View
            // style={styles.initials}
            style={{ width: width ?? 100, height: height ?? 100, borderRadius: 999 }}
            className={styles.initialsStyles}
          > 
              <Text className='text-3xl font-semibold mx-auto'>
                {initials}
              </Text>
          </View>
        )}
      </View>
    )
  }
  
  return (
    <>
      {
        !props.editMode ? renderAvatar() :
        <Pressable onPress={props.onPress} style={{ opacity: 0.45 }} className={cn(styles.containerStyles, "w-auto h-fit flex items-center justify-start flex-row relative")}>
          <ImagePlus style={{ position: "absolute", zIndex: 20, left: moderateScale(25) }} stroke="white"/>
          {renderAvatar()}
        </Pressable>
      }
    </>
  );
};

export default Avatar;
