// App.js
import React, { useEffect, useState } from "react";
import { AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import SignInScreen from "./src/view/signInScreen/SingnInScreen";
import ChatListView from "./src/view/chatListView/ChatListView";
import ChatView from "./src/view/chatView/ChatView";
import UserDetailsScreen from "./src/view/userDetailsScreen/UserDetailsScreen";
import "./firebaseConfig";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import CreateGroupScreen from "./src/view/chatListView/components/CreateGroupScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1050971238885-et6rrvtvejvkfgrps0aa2bnfmj4rh6tq.apps.googleusercontent.com",
    });
  }, []);

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        setUser(null);
        setUserDetails(null);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await firestore()
          .collection("users")
          .doc(authUser.uid)
          .get();
        if (userDoc.exists) {
          setUserDetails(userDoc.data());
        }

        setUser(authUser);

        // Set user online
        await firestore().collection("users").doc(authUser.uid).update({
          online: true,
          lastSeen: firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }

      setLoading(false);
    });

    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      const currentUser = auth().currentUser;
      if (!currentUser) return;

      const userRef = firestore().collection("users").doc(currentUser.uid);

      if (nextAppState === "active") {
        await userRef.update({
          online: true,
        });
      } else {
        await userRef.update({
          online: false,
          lastSeen: firestore.FieldValue.serverTimestamp(),
        });
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  if (loading) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user == null ? (
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          ) : userDetails ? (
            <>
              <Stack.Screen name="ChatListView" component={ChatListView} />
              <Stack.Screen
                name="CreateGroupScreen"
                component={CreateGroupScreen}
              />
              <Stack.Screen
                name="UserDetailsScreen"
                component={UserDetailsScreen}
              />
              <Stack.Screen name="ChatView" component={ChatView} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="UserDetailsScreen"
                component={UserDetailsScreen}
              />
              <Stack.Screen name="ChatListView" component={ChatListView} />
              <Stack.Screen name="ChatView" component={ChatView} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
