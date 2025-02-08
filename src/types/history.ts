export interface JourneyEntry {
  id: string;
  prompt: string;
  exercises: Record<string, {
    title: string;
    goal: string;
    steps: string[];
  }>;
  analysis?: any;
  timestamp: string;
}