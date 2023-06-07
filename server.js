import express from "express";
import path from "path";
import fs, { createReadStream } from "fs";
import cors from "cors";
const app = express();
// app.use(cors())
const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const url = "https://meme-api.com/gimme";
const data = await fetch(url).then((res) => res.json());
app.get("/", async (req, res) => {
  let ImgUrl = data.url;
  const response = await fetch(ImgUrl);
  // const u = URL.createObjectURL(response);
  // console.log(response);
  res.render("index", { data, res: response });
});

app.post("/", async (req, res) => {
  // const { next } = req.body;
  const url = "https://meme-api.com/gimme";
  const data = await fetch(url).then((res) => res.json());
  res.render("index", { data });
});

app.post("/download", async (req, res) => {
  const { url } = req.body;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "image/png",
    },
  });
  res.setHeader("Content-Type", "image/png");
  const arr = await response.arrayBuffer();
  const buffer = Buffer.from(arr);

  fs.createWriteStream("./public/meme.png").write(buffer);
  res.setHeader("Content-Disposition", "attachment; filename=meme.png");
  res.download("./public/meme.png");
});

app.options("/download", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.json();
});
app.get("/image", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendFile(`${process.cwd()}/public/meme.png`);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
