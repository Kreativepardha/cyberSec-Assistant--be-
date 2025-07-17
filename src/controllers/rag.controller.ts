import { queryChroma } from "../services/chroma.service";
import { callHuggingFace } from "../services/inference.service";

export const handleQuery = async (req, res) => {
  const { query } = req.body;

  const intent = await detectIntent(query); // intent.service.ts
  const contextChunks = await queryChroma(query); // top 3

  const prompt = buildPrompt(intent, contextChunks, query); // from prompts/
  const result = await callHuggingFace(prompt); // inference.service.ts

  return res.json({ intent, context: contextChunks, response: result });
};
