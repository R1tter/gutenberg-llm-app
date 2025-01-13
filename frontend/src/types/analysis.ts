// Represents the result of an analysis
export interface AnalysisResponse {
  analysis: string;
  summary?: string;
  keyCharacters?: string[];
  language?: string;
  sentiment?: string;
}

export interface AnalysisResult {
  analysis: string;
  summary: string;
  keyCharacters: string[];
  language: string;
  sentiment: string;
}

