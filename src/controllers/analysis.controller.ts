import type { Request, Response } from 'express';
import { logger } from '../config/logger';
import { askGemini, askGeminiWithRAG } from '../services/gemini.service';
import { prisma } from '../config/client';
import { ingestToolDoc } from '../rag/retriever';

export async function runAnalysis(req: Request, res: Response) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const answer = await askGemini(question);
    const raganswer = await askGeminiWithRAG(question);


    logger.ai('Gemini analysis response', { question, answer });

      await prisma.queryLog.create({ data: { question, answer } });

    return res.json({ success: true, answer });
  } catch (error) {
    logger.error('Analysis failed', { error });
    return res.status(500).json({ message: 'Failed to analyze input' });
  }
}



export async function ingestToolText(req: Request, res: Response) {
  const { toolName, docText } = req.body;
  if (!toolName || !docText) return res.status(400).json({ message: 'toolName and docText are required' });

  await ingestToolDoc(toolName, docText);
  logger.info(`Ingested ${toolName} docs`);

  return res.json({ success: true });
}
