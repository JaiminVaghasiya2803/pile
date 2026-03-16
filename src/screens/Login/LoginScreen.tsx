import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react-native";
import { LoginScreenProps, LoginFormData } from "./interface";
import { useStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import {
  loginUser,
  enterAsGuest,
  clearError,
} from "../../store/slices/authSlice";
import { RootState, AppDispatch } from "../../store";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppleIcon, GoogleIcon, FacebookIcon } from "../../components/Icons";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const { isDark } = useTheme();

  const styles = useStyles({ theme: isDark ? "dark" : "light" });

  const [formData, setFormData] = useState<LoginFormData>({
    email: "testpracticaluser001@mailinator.com",
    password: "Test@123",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Show API / network errors via Alert
  useEffect(() => {
    if (error) {
      Alert.alert("Login Failed", error, [
        { text: "OK", onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [error, dispatch]);

  const handleInputChange = useCallback(
    (field: keyof LoginFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSignIn = useCallback(async () => {
    if (!formData.email.trim()) {
      Alert.alert("Validation", "Please enter your email address.");
      return;
    }
    if (!formData.password) {
      Alert.alert("Validation", "Please enter your password.");
      return;
    }

    try {
      await dispatch(
        loginUser({
          email: formData.email.trim(),
          password: formData.password,
        }),
      ).unwrap();
      navigation.navigate("Main");
    } catch {
      // Error is handled via the Redux error state → useEffect above
    }
  }, [formData, dispatch, navigation]);

  const handleSocialLogin = useCallback((provider: string) => {
    Alert.alert("Social Login", `${provider} login not implemented yet`);
  }, []);

  const handleGuestAccess = useCallback(() => {
    dispatch(enterAsGuest());
    navigation.navigate("Main");
  }, [dispatch, navigation]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const logoSection = useMemo(
    () => (
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Pliē</Text>
        <View style={styles.logoPlaceholder}>
          <Image
            source={require("../../assets/pile_logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
    ),
    [styles],
  );

  const formSection = useMemo(
    () => (
      <View style={styles.formContainer}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@email.com"
            placeholderTextColor="#999"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              placeholderTextColor="#999"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleShowPassword}
            >
              {showPassword ? (
                <EyeOff size={20} color="#999" />
              ) : (
                <Eye size={20} color="#999" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <Text style={styles.signInButtonText}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Not a member? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpLink}>Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
    [
      styles,
      formData,
      showPassword,
      isLoading,
      handleInputChange,
      toggleShowPassword,
      handleSignIn,
    ],
  );

  const socialSection = useMemo(
    () => (
      <>
        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or Sign In with:</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin("Google")}
          >
            <GoogleIcon width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin("Apple")}
          >
            <AppleIcon width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin("Facebook")}
          >
            <FacebookIcon width={40} height={40} />
          </TouchableOpacity>
        </View>
      </>
    ),
    [styles, handleSocialLogin],
  );

  const guestSection = useMemo(
    () => (
      <View style={styles.guestContainer}>
        <TouchableOpacity onPress={handleGuestAccess}>
          <Text style={styles.guestText}>Enter as Guest</Text>
        </TouchableOpacity>
      </View>
    ),
    [styles.guestContainer, styles.guestText, handleGuestAccess],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {logoSection}
      <View style={styles.scrollCard}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {formSection}
          {socialSection}
          {guestSection}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
