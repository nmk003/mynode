// import OpenAI from "openai";
// export const getOpenAI = async (req, res) => {
//   const client = new OpenAI({
//     apiKey:
//       "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",
//   });
//   const prompt = req.body;

//   try {
//     const response = await client.responses.create({
//       model: "gpt-5",
//       prompt: "What is an object",
//     });

//     console.log(response.output_text);
//   } catch (error) {
//     console.log("Get Open AI API Error: ", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
export const getGenAI = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
      toolConfig: {
        temperature: 1,
      },
    });
    res.status(200).json({ success: true, data: response.text });
  } catch (error) {
    console.log("Get Open AI API Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};
