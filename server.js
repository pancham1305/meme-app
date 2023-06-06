import express from "express";
import path from "path";
const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const url = "https://meme-api.com/gimme";
const data = await fetch(url).then((res) => res.json());
app.get("/", (req, res) => {
  res.render("index", { data });
});

app.post("/", async (req, res) => {
  const { next } = req.body;
  const url = "https://meme-api.com/gimme";
  const data = await fetch(url).then((res) => res.json());
  res.render("index", { data });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
