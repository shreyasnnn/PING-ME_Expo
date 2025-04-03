import React, { useEffect, useState } from "react";
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

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (authUser) => {
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
        } else {
          setUserDetails(null);
        }
        setUser(authUser);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null; // Show a loading indicator if needed

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user == null ? (
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          ) : userDetails ? (
            <>
              <Stack.Screen name="ChatListView" component={ChatListView} />
              <Stack.Screen name="ChatView" component={ChatView} />
            </>
          ) : (
            <>
            <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen}/>
            <Stack.Screen name="ChatListView" component={ChatListView} />
            </>
            
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
