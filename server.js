const express = require("express");
const app = express();
const path = require("path");

const FLAG = "ACN{XSS_Bypassed_With_IMG}";

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // to parse POST body

// Endpoint to check payload
app.post("/submit", (req, res) => {
  const payload = req.body.payload;

  // Check if payload contains an <img> tag with onerror
  if (/<img[^>]+onerror/i.test(payload)) {
    // Flag is returned only when condition is met
    res.send(FLAG);
  } else {
    res.send("Try again!");
  }
});

app.listen(3000, () => {
  console.log("CTF app running on http://localhost:3000");
});
