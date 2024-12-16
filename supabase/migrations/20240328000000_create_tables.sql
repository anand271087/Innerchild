-- Create tables
CREATE TABLE IF NOT EXISTS journeys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    prompt TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
    triggers JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exercises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
    exercise_type TEXT NOT NULL,
    title TEXT NOT NULL,
    goal TEXT NOT NULL,
    steps TEXT[] NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journey_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
    heading TEXT NOT NULL,
    response TEXT NOT NULL,
    audio_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(journey_id, heading)
);

-- Enable Row Level Security
ALTER TABLE journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own journeys"
    ON journeys FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own journeys"
    ON journeys FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journeys"
    ON journeys FOR DELETE
    USING (auth.uid() = user_id);

-- Analyses policies
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

-- Exercises policies
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

-- Journey responses policies
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