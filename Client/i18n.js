import i18n from "i18next";
import HttpBackend from "i18next-http-backend";

// Custom logger function
const customLogger = (level, message) => {
  if (level === "error") {
    console.error(`i18next ${level}: ${message}`);
  }
};

i18n
  .use(HttpBackend) // Use i18next-http-backend
  .init({
    debug: false, // Enable debugging, but only log errors using the custom logger
    lng: "en", // Set the initial language
    fallbackLng: "en", // Fallback language
    // Specify additional supported languages
    supportedLngs: ["en", "bn", "hi", "es", "fr"],
    logger: {
      error: customLogger,
    },
    // Other i18next configuration options...

    // Configure the backend
    backend: {
      loadPath: `${process.env.I18N_SERVER}/locales/{{lng}}.json`, // Remote URL for translations
    },
  });

export default i18n;
