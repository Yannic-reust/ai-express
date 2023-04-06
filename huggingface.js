import express from "express";

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
    inputs: "astronaut riding on a horse",
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
