declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    Mail_ID: string;
    PASSWORD: string;
    HOST: string;
    JWT_SECRET: string;
    ENV: 'development' | 'production' | 'dev'; // Adjust as needed
    AWS_SECRET_ACCESS_KEY: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_S3_REGION: string;
    AWS_BUCKET_NAME: string;
    PORT: string;
    FRONTEND_URL: string;
    FAST2SMS_API: string;
    WHATSAPP_API_ACCESS_TOKEN: string;
  }
}
