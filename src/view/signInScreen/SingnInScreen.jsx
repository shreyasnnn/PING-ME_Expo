import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useFonts } from "expo-font";

const { height } = Dimensions.get("window");

export default function SignInScreen() {
  const [fontsLoaded] = useFonts({
    'BalooChettan2-Regular': require('../../../assets/fonts/BalooChettan2-Regular.ttf'),
    'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1050971238885-et6rrvtvejvkfgrps0aa2bnfmj4rh6tq.apps.googleusercontent.com",
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo?.data?.idToken ?? userInfo?.idToken;

      if (!idToken) {
        throw new Error("Google Sign-In failed: No ID token returned");
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login process");
      } else {
        console.error("Google Sign-In Error:", error);
      }
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00A859" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/Backgroud-image.jpg")}
        style={styles.topContainer}
        resizeMode="cover"
      >
        <Image
          source={require("../../../assets/tripconnect-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>TripConnect</Text>
        <Text style={styles.subtitle}>Your Ride, Your Tribe!</Text>
      </ImageBackground>

      <View style={styles.bottomCard}>
        <View style={styles.textWrapper}>
          <Text style={styles.create}>Create Account</Text>
          <Text style={styles.sub}>to get started now</Text>
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={signInWithGoogle}
        >
          <Image
            source={require("../../../assets/google-icon.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontFamily: 'BalooChettan2-Regular',
    fontWeight: "800",
    color: "#FBFDFF",
  },
  subtitle: {
    fontWeight: "800",
    fontSize: 16,
    color: "#FBFDFF",
    marginTop: 4,
  },
  bottomCard: {
    height: height * 0.4,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 24,
    alignItems: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  create: {
    fontSize: 20,
    color: "#F0B502",
    fontWeight: "500",
  },
  sub: {
    fontSize: 20,
    color: "#00A859",
    marginTop: 4,
    fontWeight: "300",
  },
  googleButton: {
    width: "95%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#0B57D080",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: 'Poppins-Regular',
  },
});
