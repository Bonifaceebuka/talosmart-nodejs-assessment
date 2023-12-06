require("dotenv").config();
const hat = require("hat");
const VRE = require("@boxpositron/vre");
const validate = VRE.default;
const { RequiredEnvironmentTypes } = VRE;

validate([
  {
    name: "DB_CONNECTION_DIALECT",
    type: RequiredEnvironmentTypes.String,
  },
  {
    name: "DB_HOST",
    type: RequiredEnvironmentTypes.String,
  },
  {
    name: "DB_PORT",
    type: RequiredEnvironmentTypes.String,
  },
  {
    name: "DB_DATABASE",
    type: RequiredEnvironmentTypes.String,
  },
  {
    name: "DB_USERNAME",
    type: RequiredEnvironmentTypes.String,
  },
  {
    name: "PORT",
    type: RequiredEnvironmentTypes.String,
  }
]);

/**
 * JWT config.
 */
const jwtConfig = {
  // Generate random secret when this is not defined
  secret: process.env.APP_KEY || hat(),
  tokenLiveSpan: "720h", // 30 Days In hours
};

const port = process.env.PORT || 3000;
const DB_CONNECTION_DIALECT = process.env.DB_CONNECTION_DIALECT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const isProduction = process.env.NODE_ENV === "production";
const baseUri = process.env.baseUri;
const maxFileSizes ={
  images: 5135,
  videos: 5135,
  audios: 5135
}
const allowedFileTypes ={
  images: {
    mimes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
    extensions:  ['png', 'jpeg', 'jpg', 'gif', 'webp']
  },
  videos: 5135,
  audios: 5135
}

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true
}
const moralisApiKey = process.env.MORALIS_API_KEY;
const dataFetchLimit = 12;
export{
  DB_CONNECTION_DIALECT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  jwtConfig,
  cloudinaryConfig,
  port,
  baseUri,
  isProduction,
  moralisApiKey,
  maxFileSizes,
  allowedFileTypes,
  dataFetchLimit
};
