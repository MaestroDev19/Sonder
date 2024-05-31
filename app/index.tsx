import React from 'react';
import { View, Text } from 'react-native';
import HomeScreen from './screens/homeScreen';
import { Link } from 'expo-router';

const App = () => {
    return (
        <>
            {/* <HomeScreen /> */}
            <Link style={{paddingTop: 300}} href='/screens/homeScreen'>home</Link>
        </>
    );
};

export default App;