import express from "express";
import multer from "multer";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());

app.post("/enhance", upload.single("photo"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `enhanced-${Date.now()}.jpg`;

  // Run Python Real-ESRGAN
  exec(`python3 server/enhancer.py ${inputPath} ${outputPath}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Enhancement failed");
    }

    const img = fs.readFileSync(outputPath);
    res.set("Content-Type", "image/jpeg");
    res.send(img);

    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
