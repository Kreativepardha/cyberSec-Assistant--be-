
import { ChromaClient } from 'chromadb';

const client = new ChromaClient();
const collection = await client.getOrCreateCollection({ name: "security_docs" });

export const addToChroma = async (text: string, metadata: object) => {
  const embedding = await getEmbedding(text); // From embedding.service.ts
  await collection.add({ documents: [text], embeddings: [embedding], metadatas: [metadata], ids: [uuid()] });
};

export const queryChroma = async (query: string) => {
  const embedding = await getEmbedding(query);
  return await collection.query({ queryEmbeddings: [embedding], nResults: 3 });
};
