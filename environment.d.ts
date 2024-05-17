namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    NEXTAUTH_SECRET: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    PWD: string;
  }
}

