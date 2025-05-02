export interface Config {
  env: string;
  port: number | string;
  mongo: {
    uri: string;
  };
  jwt: {
    secret: string;
  };
  api: {
    clientId: string;
    clientSecret: string;
  };
  cors: {
    origin: string | string[];
    methods: string[];
    allowedHeaders: string[];
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
} 