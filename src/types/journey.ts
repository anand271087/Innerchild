export interface JourneyStep {
  heading: string;
  content: string[];
  example: string;
}

export interface JourneyResponse {
  id: number;
  journeyId: number;
  heading: string;
  response: string;
  audioUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SaveJourneyResponse {
  heading: string;
  response: string;
  audioUrl?: string;
}