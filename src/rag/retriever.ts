import { chunkText } from './chunker';
import { addToChroma, queryChroma } from '../services/chroma.service';

export async function ingestToolDoc(toolName: string, docText: string) {
  const chunks = chunkText(docText);
  await Promise.all(
    chunks.map(async (chunk, idx) => {
      await addToChroma(chunk, { toolName, chunkIndex: idx });
    })
  );
}

export async function retrieveRelevantChunks(query: string, topN = 3): Promise<string[]> {
  const results = await queryChroma(query);
  // ChromaDB returns { documents: [[...]], metadatas: [[...]], ... }
  if (results && results.documents && results.documents[0]) {
    return results.documents[0].slice(0, topN);
  }
  return [];
}
