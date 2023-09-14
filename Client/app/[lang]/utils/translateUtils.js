import i18n from "@/i18n"; // Import your i18n configuration

// Modify your dictionaries to use i18next
const dictionaries = {
  en: () => i18n.getResourceBundle("en", "translation"), // Load 'English' translations
  bn: () => i18n.getResourceBundle("bn", "translation"), // Load 'Bengali' translations
};

export const getTranslation = (lang) => {
  i18n.changeLanguage(lang);
  // Check if the lang parameter is a valid key in the dictionaries object
  if (dictionaries.hasOwnProperty(lang)) {
    return dictionaries[lang]();
  } else {
    // Handle the case when an invalid lang parameter is provided
    console.error(`Invalid language: ${lang}`);
    return Promise.resolve({}); // Return an empty object or handle as needed
  }
};
