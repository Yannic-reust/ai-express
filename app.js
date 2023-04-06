import Replicate from "replicate";
import express from "express";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);

  return new Buffer(bitmap).toString("base64");
}

const initAPI = async function () {
  return await replicate.run(
    "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
    {
      input: {
        image: "data:image/png;base64," + base64str,
      },
    }
  );
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

var base64str = base64_encode("shieldIcon.png");

app.get("/", async (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server" + (await initAPI()));
});
