import type{ Request, Response } from 'express';
import { buildSecurityPrompt } from '../prompts/securityPrompt';
import { generateGeminiResponse } from '../services/ai.service';

export async function handleScanAI(req: Request, res: Response) {
  try {
    const { tool, scanOutput, objective } = req.body;

    if (!tool || !scanOutput || !objective) {
      return res.status(400).json({ error: 'Missing tool, scanOutput, or objective' });
    }

    const prompt = buildSecurityPrompt({ tool, scanOutput, objective });
    const aiResponse = await generateGeminiResponse(prompt);

    return res.status(200).json({ response: aiResponse });
  } catch (err) {
    console.error('AI Scan Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function handleScanUpload(req: Request, res: Response) {
  try {
    const { tool, objective } = req.body;
    const file = req.file;

    if (!tool || !objective || !file) {
      return res.status(400).json({ error: 'Missing tool, objective, or file' });
    }

    const scanOutput = file.buffer.toString('utf-8');

    const prompt = buildSecurityPrompt({ tool, scanOutput, objective });
    const aiResponse = await generateGeminiResponse(prompt);

    return res.status(200).json({ response: aiResponse });
  } catch (err) {
    console.error('Upload Scan Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

