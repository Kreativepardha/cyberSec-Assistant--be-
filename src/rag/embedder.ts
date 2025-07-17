import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function fakeEmbed(text: string): Promise<number[]> {
  // Hash the content to get a simple vector representation (simulated)
  const sum = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Array(512).fill(sum % 1000); // fake 512-dim vector
}
