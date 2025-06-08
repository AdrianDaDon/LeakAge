import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

type AuthScreen = "signIn" | "signUp" | "home";

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>("signIn");

  const handleSignInSuccess = () => {
    setCurrentScreen("home");
  };

  const handleSignUpSuccess = () => {
    setCurrentScreen("home");
  };

  const navigateToSignUp = () => {
    setCurrentScreen("signUp");
  };

  const navigateToSignIn = () => {
    setCurrentScreen("signIn");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "signIn":
        return (
          <SignInScreen
            onSignInSuccess={handleSignInSuccess}
            onNavigateToSignUp={navigateToSignUp}
          />
        );
      case "signUp":
        return (
          <SignUpScreen
            onSignUpSuccess={handleSignUpSuccess}
            onNavigateToSignIn={navigateToSignIn}
          />
        );
      case "home":
        return (
          <View style={styles.homeContainer}>
            <Text style={styles.homeText}>Welcome! You're signed </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  homeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
});

export default App;
