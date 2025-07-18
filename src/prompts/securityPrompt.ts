export function buildSecurityPrompt({ tool, scanOutput, objective }: { tool: string, scanOutput: string, objective: string }) {
  return `You are a cybersecurity expert. Analyze the following scan output from ${tool} with the objective: ${objective}.

Scan Output:
${scanOutput}

Provide a detailed analysis, highlight key findings, and suggest actionable remediation steps.`;
} 