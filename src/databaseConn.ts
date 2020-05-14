import { createConnection, getConnection, getConnectionOptions } from "typeorm";

export default async () => {
  let name = "test";
  if (process.env.NODE_ENV === "default") {
    name = process.env.NODE_ENV;
  }

  const connectionOptions = await getConnectionOptions(name);
  console.log('connectionOptions', connectionOptions);
  await createConnection({ ...connectionOptions, name: "default" });
};

export const closeDatabaseConn = async () => {
  await getConnection().close();
};
