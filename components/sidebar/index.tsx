import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Image
  } from "react-native";
import Avatar from "../avatar";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
  
  const CustomDrawer = (props) => {
    return (
      <>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ marginHorizontal: 15}}
          className="bg-[#121212] pt-[65px]"
        >
            <Avatar src="https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg" initials="S" containerStyle={{height: 50, width: 50}} />
            <View className="mt-3">
                <TouchableOpacity>
                    <Text className="text-[20px] font-bold text-white">
                        Display Name
                    </Text>
                    <Text className="text-sm text-[#EFEFEF80]">
                        @username
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                className="flex-row items-center mt-3.5">
                    <View className="bg-[#EFEFEF1A] rounded-[10px] border-[#B3B3B333] border px-4 py-1.5">
                        <Text className="text-center text-[#EFEFEF]">219</Text>
                    </View>
                    <Text className="ml-1.5 text-xl text-[#EFEFEF80]">Friends</Text>
                </TouchableOpacity>
            </View>
            <View className="mt-6">
                <DrawerItemList {...props} /> 
            </View>
        </DrawerContentScrollView>
        <View className="p-5 bg-[#121212]">
          <Button title="logout" color={"#C62525"} />
        </View>
      </>
    );
  };
  
  export default CustomDrawer;