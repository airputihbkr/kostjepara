-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Table: Kecamatan
CREATE TABLE kecamatan (
    id SERIAL PRIMARY KEY,
    nama TEXT NOT NULL
);

-- Seed Data for Kecamatan
INSERT INTO kecamatan (nama) VALUES
('Bangsri'), ('Batealit'), ('Donorojo'), ('Jepara'), ('Kalinyamatan'),
('Karimunjawa'), ('Kedung'), ('Keling'), ('Kembang'), ('Mayong'),
('Mlonggo'), ('Nalumsari'), ('Pakis Aji'), ('Pecangaan'), ('Tahunan'), ('Welahan');

-- 2. Table: Kosts
CREATE TABLE kosts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_kost TEXT NOT NULL,
    harga NUMERIC NOT NULL,
    fasilitas TEXT,
    alamat_lengkap TEXT,
    kecamatan_id INTEGER REFERENCES kecamatan(id),
    google_drive_link TEXT,
    maps_link TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Table: Traffic Stats
CREATE TABLE traffic_stats (
    id SERIAL PRIMARY KEY,
    daily_visits_display INTEGER DEFAULT 0,
    monthly_visits_display INTEGER DEFAULT 0
);

-- Initial Traffic Stats Row (assuming single row for global stats)
INSERT INTO traffic_stats (id, daily_visits_display, monthly_visits_display) VALUES (1, 120, 3500);


-- Security & RLS
ALTER TABLE kecamatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE kosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_stats ENABLE ROW LEVEL SECURITY;

-- Policies for Kecamatan
CREATE POLICY "Public can read kecamatan" ON kecamatan FOR SELECT USING (true);
CREATE POLICY "Admin can all kecamatan" ON kecamatan USING (auth.role() = 'authenticated');

-- Policies for Kosts
CREATE POLICY "Public can read kosts" ON kosts FOR SELECT USING (true);
CREATE POLICY "Admin can insert kosts" ON kosts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update kosts" ON kosts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete kosts" ON kosts FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for Traffic Stats
CREATE POLICY "Public can read traffic_stats" ON traffic_stats FOR SELECT USING (true);
CREATE POLICY "Admin can update traffic_stats" ON traffic_stats FOR UPDATE USING (auth.role() = 'authenticated');
