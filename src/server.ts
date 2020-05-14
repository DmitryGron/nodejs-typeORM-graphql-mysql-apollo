import cors from "cors";
import express from "express";
import session from "express-session";
import apollo from "./apollo";
import common from "./config/common";
import databaseConn from "./databaseConn";


const app = express();


app.use(
  session({
    name: "qid",
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
    }
  })
);
app.use(
  cors({
    origin: common.corsDomain,
    optionsSuccessStatus: 200
  })
);


const prepareServer = async () => {
  try {
    const apolloServer = await apollo();

    apolloServer.applyMiddleware({
      app,
      cors: false,
      path: "/api"
    });

    await databaseConn();
  } catch (e) {
    console.log(e);
  }

  return app;
};

export default async () => await prepareServer();
