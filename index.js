const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly and knowledgeable local concierge who specializes in everything related to Celebration, Florida. Answer questions helpfully and clearly, based on local knowledge.",
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
