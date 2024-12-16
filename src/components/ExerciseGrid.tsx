import React from 'react';
import { ExerciseResponse } from '../types/exercises';
import ExerciseCard from './ExerciseCard';

interface ExerciseGridProps {
  exercises: ExerciseResponse;
}

export default function ExerciseGrid({ exercises }: ExerciseGridProps) {
  return (
    <div className="space-y-6">
      {Object.entries(exercises).map(([key, exercise]) => 
        exercise && !['error_response', 'service_pause', 'temporary_pause'].includes(key) && (
          <ExerciseCard
            key={key}
            title={key}
            exercise={exercise}
          />
        )
      )}
    </div>
  );
}