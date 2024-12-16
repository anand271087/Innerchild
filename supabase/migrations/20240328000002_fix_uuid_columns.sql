-- Update journeys table to use UUID for user_id
ALTER TABLE journeys 
ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

-- Add indexes for better query performance
CREATE INDEX idx_journeys_user_id ON journeys(user_id);
CREATE INDEX idx_journeys_created_at ON journeys(created_at);
CREATE INDEX idx_analyses_journey_id ON analyses(journey_id);
CREATE INDEX idx_exercises_journey_id ON exercises(journey_id);
CREATE INDEX idx_journey_responses_journey_id ON journey_responses(journey_id);