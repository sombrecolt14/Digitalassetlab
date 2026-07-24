// Runs the whole Express app (server.cjs) as one Netlify Function.
// Reuses every route unchanged — the only Netlify-specific bit is the path
// rewrite below.
const serverless = require("serverless-http");
const app = require("../../server.cjs");

const handler = serverless(app);

// Netlify's /api/* redirect can surface the path as /.netlify/functions/api/*.
// Rewrite it back to /api/* so the Express routes match with no changes.
module.exports.handler = (event, context) => {
  if (event.path && event.path.startsWith("/.netlify/functions/api")) {
    event.path = event.path.replace("/.netlify/functions/api", "/api") || "/api";
  }
  return handler(event, context);
};
