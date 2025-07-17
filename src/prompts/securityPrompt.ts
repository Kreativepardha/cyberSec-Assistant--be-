type Tool =
  | 'Semgrep'
  | 'Trivy'
  | 'Gitleaks'
  | 'Snyk'
  | 'Anchore'
  | 'Nikto'
  | 'SonarQube'
  | 'Generic';

interface SecurityPromptInput {
  tool: Tool;
  scanOutput: string;
  objective: 'explain' | 'remediate' | 'recommend';
}

export function buildSecurityPrompt({
  tool,
  scanOutput,
  objective,
}: SecurityPromptInput): string {
  const toolInfo = {
    Semgrep: 'Semgrep is a static code analysis tool for identifying security and logic flaws in source code.',
    Trivy: 'Trivy is a vulnerability scanner for containers and filesystems.',
    Gitleaks: 'Gitleaks detects hardcoded secrets like API keys and credentials in git repos.',
    Snyk: 'Snyk scans for vulnerabilities in dependencies and suggests patches.',
    Anchore: 'Anchore scans container images for policy compliance and CVEs.',
    Nikto: 'Nikto is a web server scanner for detecting vulnerabilities.',
    SonarQube: 'SonarQube analyzes code quality, bugs, and security hotspots.',
    Generic: 'This is a security scan result from an unspecified tool.',
  };

  return `
You are a security assistant specialized in interpreting scan results.

Tool: ${tool}
About the Tool: ${toolInfo[tool]}
Objective: ${objective}

Scan Output:
\`\`\`
${scanOutput}
\`\`\`

Based on the above, please ${
    objective === 'explain'
      ? 'explain the issues found in simple terms'
      : objective === 'remediate'
      ? 'suggest detailed remediation steps'
      : 'recommend security best practices for this type of issue'
  }.
Include examples if applicable.
`;
}
