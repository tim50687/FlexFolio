const express = require("express");
const app = express(); // create express app
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Flexfolio");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
