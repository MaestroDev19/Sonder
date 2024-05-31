import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';


const Avatar = ({ src, initials, ...props }) => {
  return (
    <View
      className={styles.containerStyles}
      // style={[styles.container, props.containerStyle]}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          className={styles.imageStyles}
          // style={styles.image}
        />
      ) : (
        <View
          // style={styles.initials}
          className={styles.initialsStyles}
        > 
            <Text>
                {initials}
            </Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;
