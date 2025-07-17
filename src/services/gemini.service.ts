import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';
import { retrieveRelevantChunks } from '../rag/retriever';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export async function askGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = await response.text();

  return text;
}

export async function askGeminiWithRAG(question: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const contextChunks = await retrieveRelevantChunks(question);
  const fullPrompt = `Context:\n${contextChunks.join('\n\n')}\n\nQuestion: ${question}`;

  const result = await model.generateContent(fullPrompt);
  return await result.response.text();
}