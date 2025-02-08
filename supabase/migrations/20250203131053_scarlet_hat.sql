/*
  # Create voice recordings storage bucket

  1. Storage Setup
    - Create voice-recordings bucket
    - Enable public access
    - Set up CORS policy
  
  2. Security
    - Add RLS policies for authenticated users
    - Allow public read access
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-recordings', 'voice-recordings', true)
ON CONFLICT (id) DO NOTHING;

-- Set up CORS policy
UPDATE storage.buckets
SET cors_origins = array['*'],
    cors_methods = array['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS']
WHERE id = 'voice-recordings';

-- Allow authenticated users to upload recordings
CREATE POLICY "Users can upload their own recordings"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'voice-recordings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to update their recordings
CREATE POLICY "Users can update their own recordings"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'voice-recordings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their recordings
CREATE POLICY "Users can delete their own recordings"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'voice-recordings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access to all recordings
CREATE POLICY "Anyone can read recordings"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'voice-recordings');