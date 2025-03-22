import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const configure =  () =>{ GoogleSignin.configure({
  webClientId: '1050971238885-et6rrvtvejvkfgrps0aa2bnfmj4rh6tq.apps.googleusercontent.com',
});
}
export const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken; 

      if (!idToken) {
        throw new Error('Google Sign-In failed: No ID token returned');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login process');
      } else {
        console.error('Google Sign-In Error:', error);
      }
    }
  };