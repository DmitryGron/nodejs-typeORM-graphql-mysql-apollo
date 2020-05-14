import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { useContainer } from "typeorm";
import path from "path";
import Container from "typedi";
import { ErrorLoggerMiddleware } from "./middlewares/error-logger";

export default async () => {
  useContainer(Container);


  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.resolver.ts"],
    validate: false,
    globalMiddlewares: [ErrorLoggerMiddleware],
    container: Container,
    emitSchemaFile: path.resolve(__dirname, "schema.gql")

  });

  return new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    playground: {
      endpoint: "http://localhost:5001/api",
      settings: {
        "editor.theme": "dark",
        "request.credentials": "include",
      }
    }
  });
};
