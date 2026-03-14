import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react-native';
import { LoginScreenProps, LoginFormData } from './interface';
import { useStyles } from './styles';
import { useTheme } from '../../hooks/useTheme';
import { loginUser, enterAsGuest } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppleIcon, GoogleIcon, FacebookIcon } from '../../components/Icons';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const { isDark } = useTheme();

  const styles = useStyles({ theme: isDark ? 'dark' : 'light' });

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof LoginFormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSignIn = useCallback(async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await dispatch(loginUser(formData)).unwrap();
      navigation.navigate('Main');
    } catch (error) {
      if (__DEV__) {
        console.log('Login Failed', JSON.stringify(error));
      }
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  }, [formData, dispatch, navigation]);

  const handleSocialLogin = useCallback((provider: string) => {
    Alert.alert('Social Login', `${provider} login not implemented yet`);
  }, []);

  const handleGuestAccess = useCallback(() => {
    dispatch(enterAsGuest());
    navigation.navigate('Main');
  }, [dispatch, navigation]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const logoSection = useMemo(
    () => (
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Plié</Text>
        <View style={styles.logoPlaceholder}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100?text=LOGO' }}
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
            onChangeText={text => handleInputChange('email', text)}
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
              onChangeText={text => handleInputChange('password', text)}
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

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.signInButtonText}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Not a member? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign Up Here</Text>
          </TouchableOpacity>
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
            onPress={() => handleSocialLogin('Google')}
          >
            <GoogleIcon width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Apple')}
          >
            <AppleIcon width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Facebook')}
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
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {logoSection}
        {formSection}
        {socialSection}
        {guestSection}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
