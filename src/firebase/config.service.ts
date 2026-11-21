
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

const recaptchaSiteKey =
  import.meta.env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY;

if (!recaptchaSiteKey) {
  throw new Error(
    "Missing VITE_RECAPTCHA_ENTERPRISE_SITE_KEY"
  );
}

// Enable debug token only during local development
if (import.meta.env.DEV) {
  (
    self as typeof self & {
      FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean;
    }
  ).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(recaptchaSiteKey),
  isTokenAutoRefreshEnabled: true,
});

export const db = getFirestore(app);
