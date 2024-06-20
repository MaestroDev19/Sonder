import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
    return (
        <SafeAreaView>
            <View className="w-screen h-screen flex items-center justify-center border-1 border-red-500">

                {/* <HomeScreen /> */}
                <Link className='text-white' href='/login'>Login</Link>
            </View>
        </SafeAreaView>
    );
};

export default App;