import express from "express";
import { db_Connection } from "./DB/connection.js";
import { config } from "dotenv";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./src/schema/index.js";
import { getContext } from "./src/utils/auth.js";

config({ path: "./.env" });
const app = express();


app.use(express.json());
app.use(cors());


app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    context: getContext(req),
    graphiql: true, 
    customFormatErrorFn: (error) => {
      console.log("GraphQL Error:", error);
      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
        path: error.path,
      };
    },
  }))
);

const port = process.env.PORT || 3000;

await db_Connection();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `GraphQL Playground available at http://localhost:${port}/graphql`
  );
});
