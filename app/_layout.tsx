import { Stack } from "expo-router";
import './global.css'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeScreen from "@/components/SafeScreen";
import Toast from 'react-native-toast-message';
import { StatusBar } from "react-native";

export default function RootLayout() {

  return (
      <SafeAreaProvider>
          <SafeScreen>
            <StatusBar hidden={true}/>
              <Stack
              
              >
                  <Stack.Screen
                      name="(tabs)"
                      options={{headerShown: false}}
                  />
                  <Stack.Screen
                      name="(auth)"
                      options={{headerShown: false}}
                  />
                  <Stack.Screen
                      name="players/[id]"
                      options={{headerShown: false}}
                  />
                  <Stack.Screen 
                    name="edit"
                    options={{headerShown: false}}
                  />
                  <Stack.Screen 
                    name="scrim"
                    options={{
                        headerShown: false
                    }}
                  />
                  <Stack.Screen
                      name="scrims/[id]"
                      options={{headerShown: false}}
                  />
              </Stack>
              <Toast />
          </SafeScreen>
      </SafeAreaProvider>
  );
}
