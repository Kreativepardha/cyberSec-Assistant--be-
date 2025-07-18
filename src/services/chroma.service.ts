
import { ChromaClient } from 'chromadb';
import { getEmbedding } from '../lib/embedding/huggingface';
import { v4 as uuid } from 'uuid';

const client = new ChromaClient();
const collection = await client.getOrCreateCollection({ name: "security_docs" });

export const addToChroma = async (text: string, metadata: object) => {
  try {
    const embedding = await getEmbedding(text); // From embedding.service.ts
    await collection.add({ documents: [text], embeddings: [embedding], metadatas: [metadata], ids: [uuid()] });
  } catch (err) {
    console.error('Chroma add error:', err);
  }
};

export const queryChroma = async (query: string) => {
  try {
    const embedding = await getEmbedding(query);
    return await collection.query({ queryEmbeddings: [embedding], nResults: 3 });
  } catch (err) {
    console.error('Chroma query error:', err);
    return { documents: [[]] };
  }
};
