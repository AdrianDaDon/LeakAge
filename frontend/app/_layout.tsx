import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{
            title: 'Splash',
          }}
        />
        <Stack.Screen 
          name="onboarding" 
          options={{
            title: 'Onboarding',
          }}
        />
        <Stack.Screen 
          name="home" 
          options={{
            title: 'Home',
          }}
        />
      </Stack>
    </>
  );
}