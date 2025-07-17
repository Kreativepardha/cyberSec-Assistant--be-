import { ChromaClient } from 'chromadb';

const client = new ChromaClient({ path: 'http://localhost:8000' });

export const getCollection = async (name: string) => {
  return client.getOrCreateCollection({ name });
};
