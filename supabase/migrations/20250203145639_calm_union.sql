/*
  # Add Beta Feedback Table

  1. New Tables
    - `beta_feedback`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `rating` (integer, 1-5 rating)
      - `feedback` (text, user's feedback)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `beta_feedback` table
    - Add policies for authenticated users to create and read feedback
*/

CREATE TABLE beta_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE beta_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own feedback"
    ON beta_feedback FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read all feedback"
    ON beta_feedback FOR SELECT
    TO authenticated
    USING (true);

-- Add index for better query performance
CREATE INDEX idx_beta_feedback_user_id ON beta_feedback(user_id);
CREATE INDEX idx_beta_feedback_created_at ON beta_feedback(created_at);