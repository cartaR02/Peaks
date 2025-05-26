import 'dotenv/config';

export default {
  expo: {
    name: "Peaks",
    slug: "peaks",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      EXERCISE_API_KEY: process.env.EXERCISE_API_KEY,
      appwriteEndpoint: process.env.APPWRITE_ENDPOINT,
      appwriteProject: process.env.APPWRITE_PROJECT_ID || "your_project_id",
      appwriteBundleId: process.env.APPWRITE_BUNDLE_ID || "com.yourcompany.peaks",
      appwritePackageName: process.env.APPWRITE_PACKAGE_NAME || "com.yourcompany.peaks"
    }
  }
};
