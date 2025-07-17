import { chunkText } from './chunker';
import { fakeEmbed } from './embedder';

type ChunkData = { chunk: string; embedding: number[] };

let memoryChunks: ChunkData[] = [];

export async function ingestToolDoc(toolName: string, docText: string) {
  const chunks = chunkText(docText);
  const withEmbeddings = await Promise.all(
    chunks.map(async (chunk) => ({
      chunk,
      embedding: await fakeEmbed(chunk),
    }))
  );
  memoryChunks.push(...withEmbeddings);
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((acc, val, i) => acc + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
  return dot / (normA * normB);
}

export async function retrieveRelevantChunks(query: string, topN = 3): Promise<string[]> {
  const queryVec = await fakeEmbed(query);
  const scored = memoryChunks.map(({ chunk, embedding }) => ({
    chunk,
    score: cosineSimilarity(queryVec, embedding),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((x) => x.chunk);
}
