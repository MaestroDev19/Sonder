import { Pressable, Linking } from "react-native";

export const SpotifyLink = ({ url, children, ...props }) => (
    <Pressable style={props.style} className={props.className} onPress={() => Linking.openURL(url)}>
      {children}
    </Pressable>
  );