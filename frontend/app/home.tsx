import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import DescriptionScreen from "./descriptionScreen";

type AuthScreen = "signIn" | "signUp" | "report";

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>("signIn");

  const handleSignInSuccess = () => {
    setCurrentScreen("report");
  };

  const handleSignUpSuccess = () => {
    setCurrentScreen("report");
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
      case "report":
        return (
          <DescriptionScreen />
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
