


export const basePrompt = (context: string, question: string) => `
You are a CyberSecurity Assistant. You will be given context from a report.

Context:
${context}

Question:
${question}

Please Answer clearly and explain in detail.
`;
