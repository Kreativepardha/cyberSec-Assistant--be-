import { pipeline } from '@xenova/transformers';

let embedder: any;

export const loadEmbedder = async () => {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedder;
};

export const getEmbedding = async (text: string): Promise<number[]> => {
  const model = await loadEmbedder();
  const output = await model(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
};
