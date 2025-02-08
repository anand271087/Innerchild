/*
  # Set up voice recordings storage

  1. Storage Setup
    - Create voice-recordings bucket
    - Enable public access for authenticated users
  
  2. Security
    - Allow authenticated users to upload recordings
    - Allow public access to read recordings
*/

-- Enable storage by creating the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-recordings', 'voice-recordings', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies
CREATE POLICY "Allow authenticated users to upload recordings"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'voice-recordings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Allow public access to recordings"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'voice-recordings');