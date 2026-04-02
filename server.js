import express from "express";

console.log("BOOTING MINIMAL SERVER");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.get("/health", (req, res) => {
  res.json({ ok: true, port: PORT });
});

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});
