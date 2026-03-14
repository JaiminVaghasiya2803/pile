import { ColorSchemeName } from 'react-native';
import { LoginStyles } from './interface';
import { getThemeColors } from '../../styles/theme';
import { createUseStyles } from '../../hooks/useStyles';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): LoginStyles => {
  const themeColors = getThemeColors(theme);

  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 30,
    },
    logoText: {
      fontSize: 42,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 20,
    },
    logoPlaceholder: {
      width: 100,
      height: 100,
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      overflow: 'hidden',
    },
    logoImage: {
      width: '100%',
      height: '100%',
    },
    formContainer: {},
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: themeColors.textSecondary,
      marginBottom: 8,
    },
    input: {
      height: 52,
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      color: themeColors.text,
      backgroundColor: themeColors.surface,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    passwordContainer: {
      position: 'relative',
    },
    passwordInput: {
      paddingRight: 50,
    },
    eyeIcon: {
      position: 'absolute',
      right: 16,
      top: 14,
    },
    forgotPassword: {
      fontSize: 14,
      color: themeColors.textSecondary,
      textAlign: 'right',
      marginTop: 8,
    },
    signInButton: {
      backgroundColor: themeColors.primary,
      height: 52,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    signInButtonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 30,
    },
    signUpText: {
      fontSize: 14,
      color: themeColors.textSecondary,
    },
    signUpLink: {
      fontSize: 14,
      color: themeColors.primary,
      fontWeight: 'bold',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: themeColors.border,
    },
    dividerText: {
      marginHorizontal: 10,
      color: themeColors.textSecondary,
      fontSize: 14,
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 40,
    },
    socialButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    socialIcon: {
      width: 30,
      height: 30,
    },
    socialIconText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    socialIconTextFacebook: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1877F2',
    },
    guestContainer: {
      alignItems: 'flex-end',
      paddingBottom: 20,
    },
    guestText: {
      color: themeColors.textSecondary,
      fontSize: 14,
    },
  };
};

export const useStyles = createUseStyles(getStyles);
