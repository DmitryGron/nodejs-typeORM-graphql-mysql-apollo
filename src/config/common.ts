require("dotenv").config();

export default {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT as string, 10) || 5001,
  corsDomain: process.env.CORS_DOMAIN || "*",
  REDIS_HOST_NAME: process.env.MIR_REDIS_HOST_NAME || 'redis',

};
