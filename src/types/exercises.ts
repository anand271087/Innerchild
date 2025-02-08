export interface Exercise {
  title: string;
  goal: string;
  steps: string[];
}

export interface ExerciseResponse {
  reframing_worksheet?: Exercise;
  affirmation_exercise?: Exercise;
  visualization_exercise?: Exercise;
  journal_exercise?: Exercise;
  healing_ritual?: Exercise;
  mirror_work?: Exercise;
  forgiveness_exercise?: Exercise;
  error_response?: Exercise;
  service_pause?: Exercise;
  temporary_pause?: Exercise;
}