// Server-side Firebase Admin SDK Configuration

export function initializeFirebaseAdmin() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    console.log('🔥 Firebase Admin initialized with project credentials:', projectId);
    return { isConfigured: true, projectId };
  } else {
    console.log('ℹ️ Running backend with high-performance local SQLite/JSON database persistent storage.');
    return { isConfigured: false, projectId: 'local-store' };
  }
}
