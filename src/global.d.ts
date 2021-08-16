interface ImportMeta {
  env: {
    MODE: 'development' | 'production';
    VITE_API_URL: string;
    VITE_AUTH0_CLIENT_ID: string;
    VITE_AUTH0_DOMAIN: string;
    VITE_FIREBASE_API_KEY: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
    VITE_FIREBASE_APP_ID: string;
  };
}
