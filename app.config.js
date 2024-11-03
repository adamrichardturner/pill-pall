export default {
  expo: {
    name: "PillPall",
    slug: "pillpall",
    scheme: "pillpall",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.adamrichardturner.pillpall"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.adamrichardturner.pillpall"
    },
    extra: {
      eas: {
        projectId: "2dc04885-94e9-4615-a8cc-4355912228bb",
      },
    },
  }
} 