export interface TrainResponse {
  accuracy: number;
  classification_report: any;
}

export interface SentimentResponse {
  label: string;
  score: number;
}

export interface ChatResponse {
  response: string;
}
