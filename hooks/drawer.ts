import { useNavigation } from "expo-router"
import { DrawerActions } from '@react-navigation/native';

const useDrawer = () => {
    const navigation = useNavigation('/(screens)');


    function openDrawer() {
        return navigation.dispatch(DrawerActions.openDrawer())
    }

    return {
        openDrawer
    }
}

export default useDrawer