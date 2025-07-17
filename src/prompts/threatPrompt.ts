
export const threatPrompt = (context: string, query: string) => `
You are a cybersecurity expert. Based on the below vulnerability scan context, explain the threat and impact.

Context:
${context}

Query:
${query}

Respond in simple terms with threat type, severity, and impact.
`;
