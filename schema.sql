-- Existing updates
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'kosts' AND column_name = 'google_drive_link_2') THEN
        ALTER TABLE kosts ADD COLUMN google_drive_link_2 TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'kosts' AND column_name = 'google_drive_link_3') THEN
        ALTER TABLE kosts ADD COLUMN google_drive_link_3 TEXT;
    END IF;
    -- Add WhatsApp if missing
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'kosts' AND column_name = 'whatsapp') THEN
        ALTER TABLE kosts ADD COLUMN whatsapp TEXT;
    END IF;
END $$;

-- ==========================================
-- NEW: BLOG / ARTICLE SYSTEM
-- ==========================================
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT, -- HTML or Markdown
    cover_image TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (Open read, Admin write) -> Assumes you have an auth system or just generic access for now as per previous code
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Articles" ON articles
    FOR SELECT USING (true);

CREATE POLICY "Admin All Articles" ON articles
    FOR ALL USING (true); -- Simplification for this demo, usually would check auth.uid()
