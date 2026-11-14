import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
} from "firebase/ai";

import { app } from "@/firebase/config.service";
import { buildMonthlyAnalysisPrompt } from "./prompts/monthlyAnalysis";
import type { MonthlyFinancialContext } from "../types/utilscontext.types";

const ai = getAI(app, {
  backend: new GoogleAIBackend(),
});

const model = getGenerativeModel(ai, {
  model: "gemini-3.5-flash-lite",
  generationConfig: {
    temperature: 0.3,
    maxOutputTokens: 1200,
  },
});

export async function generateSpendingInsights(
  context: MonthlyFinancialContext,
): Promise<string> {
  const prompt = buildMonthlyAnalysisPrompt(context);

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  if (!text) {
    throw new Error("The AI returned an empty response.");
  }

  return text;
}