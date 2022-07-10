import { StatusBar } from "expo-status-bar";
import { Text, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebase.config";
import SignIn from "./src/screens/SignIn";
import ContextWrapper from "./src/context/ContextWrapper";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log("firebase user :-", user);
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SIGN_IN" component={SignIn} />
        </Stack.Navigator>
      ) : (
        <Text>Hello user</Text>
      )}
    </NavigationContainer>
  );
}

function Main() {
  const [assets] = useAssets(
    require("./src/assets/icon-square.png"),
    require("./src/assets/chatbg.png"),
    require("./src/assets/user-icon.png"),
    require("./src/assets/welcome-img.png")
  );

  if (!assets) {
    return <Text>Loading...</Text>;
  }

  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

export default Main;
