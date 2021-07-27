import i18n from 'i18next';

export const getI18NLanguage = () => {
  if (window.localStorage.getItem('i18nextLng')) {
    return window.localStorage.getItem('i18nextLng');
  }

  const language = i18n.language || 'pl';
  return language;
};
