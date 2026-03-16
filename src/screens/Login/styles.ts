import { ColorSchemeName } from 'react-native';
import { LoginStyles } from './interface';
import { getThemeColors } from '../../styles/theme';
import { createUseStyles } from '../../hooks/useStyles';
import { fonts } from '../../styles/fonts';

export const getStyles = ({ theme }: { theme: ColorSchemeName }): LoginStyles => {
  const themeColors = getThemeColors(theme);

  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      paddingHorizontal: 24,
      paddingBottom: 40,
      paddingTop: 32,
    },
    scrollCard: {
      flex: 1,
      backgroundColor: themeColors.surface,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 8,
      overflow: 'hidden',
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    logoText: {
      fontFamily: fonts.bold,
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
      fontFamily: fonts.regular,
      fontSize: 16,
      color: themeColors.textSecondary,
      marginBottom: 8,
    },
    input: {
      fontFamily: fonts.regular,
      height: 48,
      borderRadius: 10,
      paddingHorizontal: 16,
      fontSize: 15,
      color: themeColors.text,
      backgroundColor: themeColors.surface,
      shadowColor: themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
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
      fontFamily: fonts.regular,
      fontSize: 14,
      color: themeColors.textSecondary,
      textAlign: 'right',
      marginTop: 8,
    },
    signInButton: {
      backgroundColor: themeColors.primary,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 8,
      marginBottom: 15,
    },
    signInButtonText: {
      fontFamily: fonts.bold,
      color: '#FFF',
      fontSize: 16,
      fontWeight: '700',
    },
    actionContainer: {
      alignItems: 'flex-end',
      marginTop: 20,
      marginBottom: 30,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 30,
    },
    signUpText: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: themeColors.black,
    },
    signUpLink: {
      fontFamily: fonts.bold,
      fontSize: 12,
      color: themeColors.black,
      textDecorationLine: 'underline',
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
      fontFamily: fonts.regular,
      marginHorizontal: 10,
      color: themeColors.textSecondary,
      fontSize: 14,
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 17,
      marginBottom: 40,
    },
    socialButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    guestContainer: {
      alignItems: 'flex-end',
      paddingBottom: 20,
    },
    guestText: {
      fontFamily: fonts.regular,
      color: themeColors.textSecondary,
      fontSize: 14,
    },
  };
};

export const useStyles = createUseStyles(getStyles);
