-- Create database schema for Pill Pall app
-- This handles: medications, user medications, reminders, analytics, and diary

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medications from public API (reference data)
CREATE TABLE medications (
    id SERIAL PRIMARY KEY,
    ndc_code VARCHAR(20) UNIQUE, -- National Drug Code
    name VARCHAR(255) NOT NULL,
    generic_name VARCHAR(255),
    brand_name VARCHAR(255),
    manufacturer VARCHAR(255),
    dosage_form VARCHAR(100), -- tablet, capsule, liquid, etc.
    strength VARCHAR(100), -- mg, ml, etc.
    description TEXT,
    api_source VARCHAR(50), -- which API this came from
    api_id VARCHAR(100), -- ID from the external API
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User's personal medications
CREATE TABLE user_medications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    medication_id INTEGER REFERENCES medications(id) ON DELETE CASCADE,
    custom_name VARCHAR(255), -- user can override medication name
    dose VARCHAR(100) NOT NULL, -- e.g., "2 tablets", "5ml"
    frequency VARCHAR(100) NOT NULL, -- e.g., "twice daily", "every 8 hours"
    instructions TEXT, -- additional instructions
    start_date DATE NOT NULL,
    end_date DATE, -- null for ongoing medications
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reminders for medications
CREATE TABLE reminders (
    id SERIAL PRIMARY KEY,
    user_medication_id INTEGER REFERENCES user_medications(id) ON DELETE CASCADE,
    time TIME NOT NULL, -- time of day for reminder
    days_of_week INTEGER[] DEFAULT '{1,2,3,4,5,6,7}', -- array of days (1=Monday, 7=Sunday)
    is_active BOOLEAN DEFAULT true,
    reminder_type VARCHAR(50) DEFAULT 'medication', -- could extend for other types
    custom_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pill taking confirmations (for analytics)
CREATE TABLE pill_confirmations (
    id SERIAL PRIMARY KEY,
    user_medication_id INTEGER REFERENCES user_medications(id) ON DELETE CASCADE,
    reminder_id INTEGER REFERENCES reminders(id) ON DELETE SET NULL,
    scheduled_time TIMESTAMP NOT NULL, -- when it was supposed to be taken
    confirmed_time TIMESTAMP, -- when user confirmed they took it
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, missed, skipped
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pain records (for analytics)
CREATE TABLE pain_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pain_level INTEGER NOT NULL CHECK (pain_level >= 0 AND pain_level <= 10),
    location VARCHAR(255), -- where the pain is located
    pain_type VARCHAR(100), -- sharp, dull, throbbing, etc.
    triggers TEXT, -- what might have caused it
    relief_methods TEXT, -- what helped
    notes TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Diary entries
CREATE TABLE diary_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL, -- rich text content
    entry_date DATE NOT NULL,
    mood VARCHAR(50), -- optional mood tracking
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
    is_private BOOLEAN DEFAULT true,
    tags TEXT[], -- array of tags for categorization
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medication side effects tracking
CREATE TABLE side_effects (
    id SERIAL PRIMARY KEY,
    user_medication_id INTEGER REFERENCES user_medications(id) ON DELETE CASCADE,
    effect_name VARCHAR(255) NOT NULL,
    severity VARCHAR(20) NOT NULL, -- mild, moderate, severe
    start_date DATE NOT NULL,
    end_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_user_medications_user_id ON user_medications(user_id);
CREATE INDEX idx_user_medications_active ON user_medications(is_active);
CREATE INDEX idx_reminders_user_medication_id ON reminders(user_medication_id);
CREATE INDEX idx_reminders_active ON reminders(is_active);
CREATE INDEX idx_pill_confirmations_user_medication_id ON pill_confirmations(user_medication_id);
CREATE INDEX idx_pill_confirmations_scheduled_time ON pill_confirmations(scheduled_time);
CREATE INDEX idx_pain_records_user_id ON pain_records(user_id);
CREATE INDEX idx_pain_records_recorded_at ON pain_records(recorded_at);
CREATE INDEX idx_diary_entries_user_id ON diary_entries(user_id);
CREATE INDEX idx_diary_entries_entry_date ON diary_entries(entry_date);
CREATE INDEX idx_medications_ndc_code ON medications(ndc_code);
CREATE INDEX idx_medications_api_id ON medications(api_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON medications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_medications_updated_at BEFORE UPDATE ON user_medications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON reminders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diary_entries_updated_at BEFORE UPDATE ON diary_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 