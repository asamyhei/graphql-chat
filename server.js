//Install express server
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const graphqlHttp = require("express-graphql");
const schema = require("./server/schema/schema");
const mongoose = require("mongoose");

const {execute, subscribe} = require("graphql");
const {createServer} = require("http");
const {SubscriptionServer} = require("subscriptions-transport-ws");
const uri = "mongodb+srv://arthur:Aqwarium1@cluster0-10jva.mongodb.net/chat?retryWrites=true";

app.use(cors());

mongoose.connect(uri);

mongoose.connection.once("open", () => {
   console.log("connection open");
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/graphql-chat"));

app.use("/graphql", graphqlHttp({schema: schema, graphiql: true}));

app.get("/*", function (req, res) {
   res.sendFile(path.join(__dirname + "/dist/graphql-chat/index.html"));
});

// Start the app by listening on the default Heroku port
const ws = createServer(app);
ws.listen(process.env.PORT || 8080, () => {
   console.log(`GraphQL Server is now running on http://localhost:${process.env.PORT || 8080}`);

   // Set up the WebSocket for handling GraphQL subscriptions.
   new SubscriptionServer({
      execute,
      schema: schema,
      subscribe,
   }, {
      path: "/graphql",
      server: ws,
   });
});
