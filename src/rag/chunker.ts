export function chunkText(text: string, maxTokens = 300): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += maxTokens) {
    const chunk = words.slice(i, i + maxTokens).join(' ');
    chunks.push(chunk);
  }

  return chunks;
}
