import dotenv from "dotenv";



const envFound = dotenv.config();

if (!envFound) {
  throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

let configData: any;
if(process.env.NODE_ENV=='development'){
  configData = {
    port: parseInt(process.env.PORT, 10),
    env: process.env.NODE_ENV,
    epicDev: {
      url: process.env.EPICMOBILE_DEV_ATLAS_URL,
      db: process.env.EPICMOBILE_DEV_ATLAS_DATABASE,
      collectionProduct: process.env.EPICMOBILE_DEV_ATLAS_COLLECTION,
      collectionPriceLog: process.env.EPICMOBILE_DEV_ATLAS_COLLECTION_PRODUCTLOG,
      collectionContents: process.env.EPICMOBILE_DEV_ATLAS_COLLECTION_CONTENTS
    },
    agenda: {
      dbCollection: process.env.MONGO_ATLAS_COLLECTION_TEST,
    },
    api: {
      prefix: "/api",
    },
  };
}
else if(process.env.NODE_ENV=='production'){
  configData = {
    port: parseInt(process.env.PORT, 10),
    env: process.env.NODE_ENV,
    logs: {
      level: process.env.LOG_LEVEL || "silly",
    },
    epicDev: {
      url: process.env.EPICMOBILE_PRODUCT_ATLAS_URL,
      db: process.env.EPICMOBILE_PRODUCT_ATLAS_DATABASE,
      collectionProduct: process.env.EPICMOBILE_PRODUCT_ATLAS_COLLECTION,
      collectionPriceLog: process.env.EPICMOBILE_PRODUCT_ATLAS_COLLECTION_PRODUCTLOG,
      collectionContents: process.env.EPICMOBILE_PRODUCT_ATLAS_COLLECTION_CONTENTS
    },
    api: {
      prefix: "/api",
    },
  };
}

export default configData;