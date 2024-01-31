const conf = {
  appwriteUrl: String(import.meta.VITE_APP_APPWRITE_URL),
  appwriteProjectId: String(import.meta.VITE_APP_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.VITE_APP_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.VITE_APP_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.VITE_APP_APPWRITE_BUCKET_ID),
};

export default conf;
