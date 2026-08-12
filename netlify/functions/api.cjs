// Runs the whole Express app (server.cjs) as one Netlify Function.
// Reuses every route unchanged — the only Netlify-specific bit is the path
// rewrite below.
const serverless = require("serverless-http");
const { connectLambda } = require("@netlify/blobs");
const app = require("../../server.cjs");

const handler = serverless(app);

// Netlify's /api/* redirect can surface the path as /.netlify/functions/api/*.
// Rewrite it back to /api/* so the Express routes match with no changes.
module.exports.handler = (event, context) => {
  // Netlify Blobs configures itself from the request context, which it can
  // only reach when the framework hands it the raw Lambda event. Running
  // Express through serverless-http hides that, so getStore() throws and the
  // download counter silently stops counting. This one call wires it up.
  connectLambda(event);

  if (event.path && event.path.startsWith("/.netlify/functions/api")) {
    event.path = event.path.replace("/.netlify/functions/api", "/api") || "/api";
  }
  return handler(event, context);
};
