export interface SupabaseJourney {
  id: string;
  user_id: number;
  prompt: string;
  created_at: string;
  analyses: SupabaseAnalysis[];
  exercises: SupabaseExercise[];
  journey_responses: SupabaseJourneyResponse[];
}

export interface SupabaseAnalysis {
  id: string;
  journey_id: string;
  triggers: any;
  created_at: string;
}

export interface SupabaseExercise {
  id: string;
  journey_id: string;
  exercise_type: string;
  title: string;
  goal: string;
  steps: string[];
  created_at: string;
}

export interface SupabaseJourneyResponse {
  id: string;
  journey_id: string;
  heading: string;
  response: string;
  audio_url?: string;
  created_at: string;
}