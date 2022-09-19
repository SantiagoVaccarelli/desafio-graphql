import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import cors from "cors";
import router from "./routes/indexRoutes.js";
import { connectMongoDB } from "./persistencia/configMongoDB.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  })
);

app.use("/", router);
connectMongoDB();

const schema = makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: resolvers,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));