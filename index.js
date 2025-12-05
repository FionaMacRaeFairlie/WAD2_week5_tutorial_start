// app.js (ESM)
import express from "express";
import mustache from "mustache-express";

const app = express();
app.use(express.urlencoded({ extended: false }));

// Configure Mustache as the view engine
app.engine("mustache", mustache());
app.set("view engine", "mustache");

const staff = {
  Fred: { name: "Fred", bio: "Fred is our European travel expert." },
  Madeline: { name: "Madeline", bio: "Madeline is our US expert." },
  Tom: { name: "Tom", bio: "Tom deals with travel to Asia." },
};

// Route for staff details
app.get("/staff/:name", (req, res, next) => {
  const info = staff[req.params.name];
  if (!info) return next(); // falls through to 404
  res.render("staffPage", { staffInfo: info });
});

// Optional: Add a fallback 404 handler
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Express started on http://localhost:${port}; press Ctrl-C to terminate.`
  );
});
