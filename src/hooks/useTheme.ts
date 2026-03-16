import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { toggleTheme, setThemeMode, setIsDark } from '../store/slices/themeSlice';
import { lightColors, darkColors } from '../styles/theme';

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDark, mode } = useSelector((state: RootState) => state.theme);

  const colors = isDark ? darkColors : lightColors;

  return {
    isDark,
    mode,
    colors,
    toggleTheme: () => dispatch(toggleTheme()),
    setThemeMode: (newMode: 'light' | 'dark' | 'system') => dispatch(setThemeMode(newMode)),
    setIsDark: (dark: boolean) => dispatch(setIsDark(dark)),
  };
};
