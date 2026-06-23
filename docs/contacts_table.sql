-- Run this in the Supabase SQL Editor for project: drodstfbouwlltxyhela
-- https://supabase.com/dashboard/project/drodstfbouwlltxyhela/sql

CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the anon key (public access for the contact form)
CREATE POLICY "Allow anon inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only allow reading via service_role (dashboard)
CREATE POLICY "Allow service_role select" ON contacts
  FOR SELECT
  TO service_role
  USING (true);