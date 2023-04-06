import Replicate from "replicate";
import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import { EOF } from "dns";
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

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/kohbanye/pixel-art-style",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

app.get("/", async (req, res) => {
  query({
    inputs: "horse riding a astronaut, pixelartstyle",
    temperature: 0,
    seed: Math.random(),
  }).then(async (response) => {
    console.log("response:" + (await response.arrayBuffer()));
    // Use image
    response.arrayBuffer().then((buff) => {
      res.status(200);
      res.set("Content-Disposition", `attachment; filename="picture.jpg"`);
      res.send(Buffer.from(buff));
    });
  });
});

/*function base64_encode(file) {
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

*/
