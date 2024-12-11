import type { JourneyStep } from '../types/journey';

export function parseExerciseStep(text: string): JourneyStep {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const heading = lines[0].split(':')[0];
  const example = text.match(/\*\*(.*?)\*\*/)?.[1] || '';
  const content = lines.slice(1).filter(line => !line.includes('**'));
  
  return { heading, content, example };
}

export function parseExerciseSteps(exercise: string) {
  const exerciseLines = exercise.split('\n\n').filter(Boolean);
  const title = exerciseLines[0];
  const steps = exerciseLines.slice(1).map(parseExerciseStep);
  
  return { title, steps };
}