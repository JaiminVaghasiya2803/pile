import { ViewStyle, TextStyle, ImageStyle, StyleProp } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

export type LoginScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginStyles {
  container: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  scrollCard: StyleProp<ViewStyle>;
  logoContainer: StyleProp<ViewStyle>;
  logoPlaceholder: StyleProp<ViewStyle>;
  logoImage: StyleProp<ImageStyle>;
  logoText: StyleProp<TextStyle>;
  formContainer: StyleProp<ViewStyle>;
  inputContainer: StyleProp<ViewStyle>;
  label: StyleProp<TextStyle>;
  input: StyleProp<TextStyle>;
  passwordContainer: StyleProp<ViewStyle>;
  passwordInput: StyleProp<ViewStyle>;
  eyeIcon: StyleProp<ViewStyle>;
  forgotPassword: StyleProp<TextStyle>;
  signInButton: StyleProp<ViewStyle>;
  signInButtonText: StyleProp<TextStyle>;
  signUpContainer: StyleProp<ViewStyle>;
  signUpText: StyleProp<TextStyle>;
  signUpLink: StyleProp<TextStyle>;
  dividerContainer: StyleProp<ViewStyle>;
  dividerLine: StyleProp<ViewStyle>;
  dividerText: StyleProp<TextStyle>;
  socialContainer: StyleProp<ViewStyle>;
  socialButton: StyleProp<ViewStyle>;
  guestContainer: StyleProp<ViewStyle>;
  guestText: StyleProp<TextStyle>;
  actionContainer: StyleProp<ViewStyle>;
}
