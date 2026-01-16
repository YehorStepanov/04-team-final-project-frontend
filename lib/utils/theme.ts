export const setTheme = (theme: 'pink' | 'blue' | 'neutral') => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
};

export const getThemeFromGender = (gender: string): 'pink' | 'blue' | 'neutral' => {
  const themeMap: Record<string, 'pink' | 'blue' | 'neutral'> = {
    girl: 'pink',
    boy: 'blue',
    unknown: 'neutral',
  };
  return themeMap[gender] || 'neutral';
};