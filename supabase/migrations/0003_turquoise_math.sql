/*
  # Update User ID Column Type and Add Indexes

  1. Changes
    - Convert user_id column in journeys table from integer to UUID
    - Add performance optimization indexes
  
  2. Process
    - Drop all dependent policies first
    - Alter column type
    - Recreate policies
    - Add indexes
*/

-- Drop all dependent policies
DROP POLICY IF EXISTS "Users can create their own journeys" ON journeys;
DROP POLICY IF EXISTS "Users can view their own journeys" ON journeys;
DROP POLICY IF EXISTS "Users can delete their own journeys" ON journeys;
DROP POLICY IF EXISTS "Users can create analyses for their journeys" ON analyses;
DROP POLICY IF EXISTS "Users can view analyses for their journeys" ON analyses;
DROP POLICY IF EXISTS "Users can create exercises for their journeys" ON exercises;
DROP POLICY IF EXISTS "Users can view exercises for their journeys" ON exercises;
DROP POLICY IF EXISTS "Users can create responses for their journeys" ON journey_responses;
DROP POLICY IF EXISTS "Users can view responses for their journeys" ON journey_responses;

-- Update journeys table to use UUID for user_id
ALTER TABLE journeys 
ALTER COLUMN user_id TYPE UUID USING user_id::UUID;

-- Recreate policies for journeys table
CREATE POLICY "Users can create their own journeys"
    ON journeys FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own journeys"
    ON journeys FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journeys"
    ON journeys FOR DELETE
    USING (auth.uid() = user_id);

-- Recreate policies for analyses table
CREATE POLICY "Users can create analyses for their journeys"
    ON analyses FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM journeys
        WHERE journeys.id = journey_id
        AND journeys.user_id = auth.uid()
    ));

CREATE POLICY "Users can view analyses for their journeys"
    ON analyses FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM journeys
        WHERE journeys.id = journey_id
        AND journeys.user_id = auth.uid()
    ));

-- Recreate policies for exercises table
CREATE POLICY "Users can create exercises for their journeys"
    ON exercises FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM journeys
        WHERE journeys.id = journey_id
        AND journeys.user_id = auth.uid()
    ));

CREATE POLICY "Users can view exercises for their journeys"
    ON exercises FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM journeys
        WHERE journeys.id = journey_id
        AND journeys.user_id = auth.uid()
    ));

-- Recreate policies for journey_responses table
CREATE POLICY "Users can create responses for their journeys"
    ON journey_responses FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM journeys
        WHERE journeys.id = journey_id
        AND journeys.user_id = auth.uid()
    ));

CREATE POLICY "Users can view responses for their journeys"
    ON journey_responses FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM journeys
        WHERE journeys.id = journey_id
        AND journeys.user_id = auth.uid()
    ));

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_journeys_user_id ON journeys(user_id);
CREATE INDEX IF NOT EXISTS idx_journeys_created_at ON journeys(created_at);
CREATE INDEX IF NOT EXISTS idx_analyses_journey_id ON analyses(journey_id);
CREATE INDEX IF NOT EXISTS idx_exercises_journey_id ON exercises(journey_id);
CREATE INDEX IF NOT EXISTS idx_journey_responses_journey_id ON journey_responses(journey_id);