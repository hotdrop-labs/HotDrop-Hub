import {useSafeAreaInsets} from "react-native-safe-area-context";
import {View} from "react-native";

export default function SafeScreen({children}: {children: any}) {
    const insets = useSafeAreaInsets();


    return (
        <View className={"flex-1 bg-gray-900"} style={{paddingTop: insets.top}}>
            {children}
        </View>
    )
}