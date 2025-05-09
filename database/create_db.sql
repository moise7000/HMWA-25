-- SQL Script to generate the yoga studio database for Supabaseca
-- Compatible with PostgreSQL

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  photo BYTEA,
  biography TEXT,
  certificates JSONB DEFAULT '[]'::JSONB,
  social_media JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  photo BYTEA,
  date_of_birth DATE,
  address TEXT,
  emergency_contact JSONB DEFAULT '{}'::JSONB,
  medical_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL,
  image BYTEA,
  description TEXT,
  goals JSONB DEFAULT '[]'::JSONB,
  timetable JSONB DEFAULT '[]'::JSONB,
  price DECIMAL(10, 2) NOT NULL,
  intro_video_url VARCHAR(255),
  difficulty_level VARCHAR(20),
  duration_minutes INTEGER,
  max_capacity INTEGER,
  teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Equipment table (corrected spelling from "equipements")
CREATE TABLE IF NOT EXISTS equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  image BYTEA,
  description TEXT,
  stock_quantity INTEGER DEFAULT 0,
  purchase_link VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  comment TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  max_classes INTEGER,
  benefits JSONB DEFAULT '[]'::JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL,
  image BYTEA,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  capacity INTEGER,
  price DECIMAL(10, 2) DEFAULT 0.00,
  is_free BOOLEAN DEFAULT FALSE,
  registration_required BOOLEAN DEFAULT TRUE,
  teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  image BYTEA,
  authors JSONB DEFAULT '[]'::JSONB,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  snippet TEXT,
  slug VARCHAR(255) UNIQUE,
  tags JSONB DEFAULT '[]'::JSONB,
  is_published BOOLEAN DEFAULT TRUE,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Junction tables
-- Course and Subscription relation
CREATE TABLE IF NOT EXISTS course_subscription (
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, subscription_id)
);

-- Course and Equipment relation (corrected spelling)
CREATE TABLE IF NOT EXISTS course_equipment (
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  is_required BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (course_id, equipment_id)
);

-- Article and Course relation
CREATE TABLE IF NOT EXISTS article_course (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, course_id)
);

-- Article and Event relation
CREATE TABLE IF NOT EXISTS article_event (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, event_id)
);

-- Student and Course relation
CREATE TABLE IF NOT EXISTS student_course (
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  completion_date TIMESTAMP WITH TIME ZONE,
  attendance_count INTEGER DEFAULT 0,
  notes TEXT,
  PRIMARY KEY (student_id, course_id)
);

-- Student and Subscription relation
CREATE TABLE IF NOT EXISTS student_subscription (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP WITH TIME ZONE,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Event registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'confirmed',
  payment_status VARCHAR(50),
  payment_amount DECIMAL(10, 2),
  payment_date TIMESTAMP WITH TIME ZONE,
  UNIQUE(event_id, student_id)
);

-- Insert test data
-- Teachers data
INSERT INTO teachers (id, name, biography, certificates, social_media) VALUES
(uuid_generate_v4(), 'Sarah Johnson', 'Certified yoga instructor with 10 years of experience in Hatha and Vinyasa.', '["Yoga Alliance 500h", "Yin Yoga", "Prenatal Yoga"]', '{"instagram": "@sarah_yoga", "facebook": "sarahjohnsonyoga"}'),
(uuid_generate_v4(), 'Thomas Miller', 'Ashtanga and meditation expert with training in India.', '["Ashtanga Yoga", "Meditation"]', '{"instagram": "@thomas_ashtanga", "youtube": "ThomasYoga"}'),
(uuid_generate_v4(), 'Emma Lewis', 'Specialized in therapeutic and restorative yoga.', '["Therapeutic Yoga", "Restorative Yoga", "Applied Anatomy"]', '{"instagram": "@emma_yogatherapy", "website": "emmayoga.com"}');

-- Students data
INSERT INTO students (id, name, email, phone) VALUES
(uuid_generate_v4(), 'Julie Roberts', 'julie.roberts@email.com', '555-123-4567'),
(uuid_generate_v4(), 'Anthony Small', 'anthony.small@email.com', '555-234-5678'),
(uuid_generate_v4(), 'Emily Grande', 'emily.grande@email.com', '555-345-6789'),
(uuid_generate_v4(), 'Lucas Morgan', 'lucas.morgan@email.com', '555-456-7890'),
(uuid_generate_v4(), 'Chloe Ray', 'chloe.ray@email.com', '555-567-8901');

-- Equipment data (corrected spelling)
INSERT INTO equipment (id, name, description, stock_quantity) VALUES
(uuid_generate_v4(), 'Yoga Mat', 'Non-slip mat for comfortable practice.', 25),
(uuid_generate_v4(), 'Yoga Block', 'Accessory to help with poses that require more flexibility.', 40),
(uuid_generate_v4(), 'Yoga Strap', 'Strap to help extend reach during stretches.', 30),
(uuid_generate_v4(), 'Meditation Cushion', 'Comfortable cushion for meditation sessions.', 20),
(uuid_generate_v4(), 'Blanket', 'Soft blanket for restorative practices and relaxation.', 25);

-- Retrieve teacher IDs for course associations
DO $$
DECLARE 
    sarah_id UUID;
    thomas_id UUID;
    emma_id UUID;
BEGIN
    SELECT id INTO sarah_id FROM teachers WHERE name = 'Sarah Johnson' LIMIT 1;
    SELECT id INTO thomas_id FROM teachers WHERE name = 'Thomas Miller' LIMIT 1;
    SELECT id INTO emma_id FROM teachers WHERE name = 'Emma Lewis' LIMIT 1;

    -- Courses data
    INSERT INTO courses (id, title, description, goals, timetable, price, intro_video_url, teacher_id, difficulty_level, duration_minutes) VALUES
    (uuid_generate_v4(), 'Beginner Hatha Yoga', 'Hatha Yoga class for beginners, learn the basics.', '["Improve flexibility", "Learn basic poses", "Breathing techniques"]', '["Monday 10am-11:30am", "Wednesday 6pm-7:30pm"]', 15.00, 'https://example.com/videos/hatha-intro', sarah_id, 'beginner', 90),
    (uuid_generate_v4(), 'Dynamic Ashtanga', 'Energetic Ashtanga class for intermediate practitioners.', '["Muscle strengthening", "Complete sequence", "Concentration"]', '["Tuesday 6pm-7:30pm", "Thursday 6pm-7:30pm", "Saturday 9am-10:30am"]', 18.00, 'https://example.com/videos/ashtanga-dynamic', thomas_id, 'intermediate', 90),
    (uuid_generate_v4(), 'Restorative Yoga', 'Gentle session to recover and deeply relax.', '["Deep relaxation", "Recovery", "Stress reduction"]', '["Friday 7pm-8:30pm", "Sunday 5pm-6:30pm"]', 16.00, 'https://example.com/videos/restorative', emma_id, 'all-levels', 90),
    (uuid_generate_v4(), 'Prenatal Yoga', 'Yoga adapted for pregnant women, all trimesters.', '["Birth preparation", "Tension relief", "Mother-baby connection"]', '["Tuesday 10am-11:30am", "Saturday 2pm-3:30pm"]', 20.00, 'https://example.com/videos/prenatal', sarah_id, 'specialized', 90),
    (uuid_generate_v4(), 'Guided Meditation', 'Meditation sessions for all levels.', '["Stress reduction", "Mindfulness", "Concentration"]', '["Monday 7pm-8pm", "Wednesday 8am-9am", "Sunday 9am-10am"]', 12.00, 'https://example.com/videos/meditation', thomas_id, 'all-levels', 60);
END $$;

-- Retrieve IDs for associations
DO $$
DECLARE
    hatha_id UUID;
    ashtanga_id UUID;
    restorative_id UUID;
    prenatal_id UUID;
    meditation_id UUID;
    
    mat_id UUID;
    block_id UUID;
    strap_id UUID;
    cushion_id UUID;
    blanket_id UUID;
    
    student1_id UUID;
    student2_id UUID;
    student3_id UUID;
    student4_id UUID;
    student5_id UUID;
BEGIN
    SELECT id INTO hatha_id FROM courses WHERE title = 'Beginner Hatha Yoga' LIMIT 1;
    SELECT id INTO ashtanga_id FROM courses WHERE title = 'Dynamic Ashtanga' LIMIT 1;
    SELECT id INTO restorative_id FROM courses WHERE title = 'Restorative Yoga' LIMIT 1;
    SELECT id INTO prenatal_id FROM courses WHERE title = 'Prenatal Yoga' LIMIT 1;
    SELECT id INTO meditation_id FROM courses WHERE title = 'Guided Meditation' LIMIT 1;
    
    SELECT id INTO mat_id FROM equipment WHERE name = 'Yoga Mat' LIMIT 1;
    SELECT id INTO block_id FROM equipment WHERE name = 'Yoga Block' LIMIT 1;
    SELECT id INTO strap_id FROM equipment WHERE name = 'Yoga Strap' LIMIT 1;
    SELECT id INTO cushion_id FROM equipment WHERE name = 'Meditation Cushion' LIMIT 1;
    SELECT id INTO blanket_id FROM equipment WHERE name = 'Blanket' LIMIT 1;
    
    SELECT id INTO student1_id FROM students WHERE name = 'Julie Roberts' LIMIT 1;
    SELECT id INTO student2_id FROM students WHERE name = 'Anthony Small' LIMIT 1;
    SELECT id INTO student3_id FROM students WHERE name = 'Emily Grande' LIMIT 1;
    SELECT id INTO student4_id FROM students WHERE name = 'Lucas Morgan' LIMIT 1;
    SELECT id INTO student5_id FROM students WHERE name = 'Chloe Ray' LIMIT 1;

    -- Course-equipment associations
    INSERT INTO course_equipment (course_id, equipment_id, quantity, is_required) VALUES
    (hatha_id, mat_id, 1, TRUE),
    (hatha_id, block_id, 2, FALSE),
    (ashtanga_id, mat_id, 1, TRUE),
    (ashtanga_id, strap_id, 1, TRUE),
    (restorative_id, mat_id, 1, TRUE),
    (restorative_id, blanket_id, 1, TRUE),
    (restorative_id, block_id, 2, TRUE),
    (prenatal_id, mat_id, 1, TRUE),
    (prenatal_id, block_id, 2, TRUE),
    (prenatal_id, cushion_id, 1, TRUE),
    (meditation_id, cushion_id, 1, TRUE),
    (meditation_id, blanket_id, 1, FALSE);
    
    -- Student course enrollments
    INSERT INTO student_course (student_id, course_id, status) VALUES
    (student1_id, hatha_id, 'active'),
    (student1_id, restorative_id, 'active'),
    (student2_id, ashtanga_id, 'active'),
    (student2_id, meditation_id, 'active'),
    (student3_id, prenatal_id, 'active'),
    (student4_id, ashtanga_id, 'active'),
    (student4_id, meditation_id, 'active'),
    (student5_id, hatha_id, 'active'),
    (student5_id, restorative_id, 'active');
    
    -- Student feedback
    INSERT INTO feedbacks (id, student_id, course_id, comment, rating) VALUES
    (uuid_generate_v4(), student1_id, hatha_id, 'Excellent class for beginners, very attentive instructor.', 5),
    (uuid_generate_v4(), student2_id, ashtanga_id, 'Dynamic and energizing class. I feel revitalized after each session.', 5),
    (uuid_generate_v4(), student3_id, prenatal_id, 'Perfectly adapted to my pregnancy, I feel much better.', 4),
    (uuid_generate_v4(), student4_id, meditation_id, 'The meditation techniques are really effective for managing stress.', 5),
    (uuid_generate_v4(), student5_id, restorative_id, 'Very relaxing, ideal after an intense work week.', 4);
END $$;

-- Subscriptions data
INSERT INTO subscriptions (id, name, type, price, description, duration_days, max_classes) VALUES
(uuid_generate_v4(), 'Discovery Pass', 'monthly', 45.00, 'Access to 3 classes per week for one month', 30, 12),
(uuid_generate_v4(), 'Unlimited Pass', 'monthly', 75.00, 'Unlimited access to all classes for one month', 30, NULL),
(uuid_generate_v4(), 'Wellness Package', 'quarterly', 180.00, 'Access to 3 classes per week for three months', 90, 36),
(uuid_generate_v4(), 'Annual Subscription', 'annual', 650.00, 'Unlimited access to all classes for one year', 365, NULL);

-- Retrieve subscription and course IDs for associations
DO $$
DECLARE
    discovery_id UUID;
    unlimited_id UUID;
    wellness_id UUID;
    annual_id UUID;
    
    hatha_id UUID;
    ashtanga_id UUID;
    restorative_id UUID;
    prenatal_id UUID;
    meditation_id UUID;
BEGIN
    SELECT id INTO discovery_id FROM subscriptions WHERE name = 'Discovery Pass' LIMIT 1;
    SELECT id INTO unlimited_id FROM subscriptions WHERE name = 'Unlimited Pass' LIMIT 1;
    SELECT id INTO wellness_id FROM subscriptions WHERE name = 'Wellness Package' LIMIT 1;
    SELECT id INTO annual_id FROM subscriptions WHERE name = 'Annual Subscription' LIMIT 1;
    
    SELECT id INTO hatha_id FROM courses WHERE title = 'Beginner Hatha Yoga' LIMIT 1;
    SELECT id INTO ashtanga_id FROM courses WHERE title = 'Dynamic Ashtanga' LIMIT 1;
    SELECT id INTO restorative_id FROM courses WHERE title = 'Restorative Yoga' LIMIT 1;
    SELECT id INTO prenatal_id FROM courses WHERE title = 'Prenatal Yoga' LIMIT 1;
    SELECT id INTO meditation_id FROM courses WHERE title = 'Guided Meditation' LIMIT 1;

    -- Subscription-course associations
    INSERT INTO course_subscription (subscription_id, course_id) VALUES
    (discovery_id, hatha_id),
    (discovery_id, restorative_id),
    (discovery_id, meditation_id),
    (unlimited_id, hatha_id),
    (unlimited_id, ashtanga_id),
    (unlimited_id, restorative_id),
    (unlimited_id, prenatal_id),
    (unlimited_id, meditation_id),
    (wellness_id, hatha_id),
    (wellness_id, restorative_id),
    (wellness_id, meditation_id),
    (annual_id, hatha_id),
    (annual_id, ashtanga_id),
    (annual_id, restorative_id),
    (annual_id, prenatal_id),
    (annual_id, meditation_id);
END $$;

-- Events data
DO $$
DECLARE
    sarah_id UUID;
    thomas_id UUID;
    emma_id UUID;
BEGIN
    SELECT id INTO sarah_id FROM teachers WHERE name = 'Sarah Johnson' LIMIT 1;
    SELECT id INTO thomas_id FROM teachers WHERE name = 'Thomas Miller' LIMIT 1;
    SELECT id INTO emma_id FROM teachers WHERE name = 'Emma Lewis' LIMIT 1;

    INSERT INTO events (id, title, date, description, location, teacher_id, capacity, price, is_free, registration_required) VALUES
    (uuid_generate_v4(), 'Open House Day', CURRENT_DATE + INTERVAL '14 days', 'Come discover our center and try our classes for free.', 'Namaste Yoga Center', sarah_id, 50, 0, TRUE, TRUE),
    (uuid_generate_v4(), 'Mindfulness Meditation Workshop', CURRENT_DATE + INTERVAL '21 days', 'A 3-hour workshop to discover and deepen mindfulness practices.', 'Zen Room, Namaste Yoga Center', thomas_id, 20, 30, FALSE, TRUE),
    (uuid_generate_v4(), 'Weekend Yoga & Nature Retreat', CURRENT_DATE + INTERVAL '30 days', 'An immersive weekend of yoga and meditation in nature.', 'The Springs Domain, Countryside', emma_id, 15, 250, FALSE, TRUE),
    (uuid_generate_v4(), 'Postural Alignment Workshop', CURRENT_DATE + INTERVAL '10 days', 'Learn to perfect your alignment in poses for safer practice.', 'Main Studio, Namaste Yoga Center', sarah_id, 25, 35, FALSE, TRUE);
END $$;

-- Articles data
INSERT INTO articles (id, title, content, authors, snippet, slug, tags) VALUES
(uuid_generate_v4(), 'The Benefits of Yoga for Mental Health', 'How regular yoga practice helps reduce stress and anxiety...', '["Emma Lewis", "Dr. Michael Durant"]', 'Discover how yoga can transform your mental well-being', 'yoga-mental-health-benefits', '["mental health", "well-being", "stress relief"]'),
(uuid_generate_v4(), 'Beginner''s Guide: 10 Essential Poses', 'A comprehensive guide to the fundamental poses to start your practice...', '["Sarah Johnson"]', 'Master the yoga basics with these fundamental poses', 'beginners-guide-essential-poses', '["beginners", "yoga poses", "fundamentals"]'),
(uuid_generate_v4(), 'Breathing and Meditation: Advanced Techniques', 'Exploration of pranayama and meditation techniques to deepen your practice...', '["Thomas Miller"]', 'Deepen your practice with these breathing techniques', 'advanced-breathing-meditation-techniques', '["meditation", "pranayama", "advanced"]'),
(uuid_generate_v4(), 'Prenatal Yoga: Adapting Your Practice Trimester by Trimester', 'How to adapt your yoga practice throughout your pregnancy...', '["Sarah Johnson", "Dr. Elizabeth Little"]', 'A complete guide to practicing yoga during pregnancy', 'prenatal-yoga-trimester-guide', '["prenatal", "pregnancy", "women''s health"]');

-- Retrieve IDs for article-course-event associations
DO $$
DECLARE
    article1_id UUID;
    article2_id UUID;
    article3_id UUID;
    article4_id UUID;
    
    hatha_id UUID;
    ashtanga_id UUID;
    restorative_id UUID;
    prenatal_id UUID;
    meditation_id UUID;
    
    event1_id UUID;
    event2_id UUID;
    event3_id UUID;
    event4_id UUID;
BEGIN
    SELECT id INTO article1_id FROM articles WHERE title = 'The Benefits of Yoga for Mental Health' LIMIT 1;
    SELECT id INTO article2_id FROM articles WHERE title = 'Beginner''s Guide: 10 Essential Poses' LIMIT 1;
    SELECT id INTO article3_id FROM articles WHERE title = 'Breathing and Meditation: Advanced Techniques' LIMIT 1;
    SELECT id INTO article4_id FROM articles WHERE title = 'Prenatal Yoga: Adapting Your Practice Trimester by Trimester' LIMIT 1;
    
    SELECT id INTO hatha_id FROM courses WHERE title = 'Beginner Hatha Yoga' LIMIT 1;
    SELECT id INTO ashtanga_id FROM courses WHERE title = 'Dynamic Ashtanga' LIMIT 1;
    SELECT id INTO restorative_id FROM courses WHERE title = 'Restorative Yoga' LIMIT 1;
    SELECT id INTO prenatal_id FROM courses WHERE title = 'Prenatal Yoga' LIMIT 1;
    SELECT id INTO meditation_id FROM courses WHERE title = 'Guided Meditation' LIMIT 1;
    
    SELECT id INTO event1_id FROM events WHERE title = 'Open House Day' LIMIT 1;
    SELECT id INTO event2_id FROM events WHERE title = 'Mindfulness Meditation Workshop' LIMIT 1;
    SELECT id INTO event3_id FROM events WHERE title = 'Weekend Yoga & Nature Retreat' LIMIT 1;
    SELECT id INTO event4_id FROM events WHERE title = 'Postural Alignment Workshop' LIMIT 1;

    -- Article-course associations
    INSERT INTO article_course (article_id, course_id) VALUES
    (article1_id, restorative_id),
    (article1_id, meditation_id),
    (article2_id, hatha_id),
    (article3_id, meditation_id),
    (article3_id, ashtanga_id),
    (article4_id, prenatal_id);
    
    -- Article-event associations
    INSERT INTO article_event (article_id, event_id) VALUES
    (article1_id, event3_id),
    (article2_id, event1_id),
    (article3_id, event2_id),
    (article4_id, event4_id);
END $$;

-- Student subscription associations
DO $$
DECLARE
    student1_id UUID;
    student2_id UUID;
    student3_id UUID;
    student4_id UUID;
    student5_id UUID;
    
    discovery_id UUID;
    unlimited_id UUID;
    wellness_id UUID;
    annual_id UUID;
BEGIN
    SELECT id INTO student1_id FROM students WHERE name = 'Julie Roberts' LIMIT 1;
    SELECT id INTO student2_id FROM students WHERE name = 'Anthony Small' LIMIT 1;
    SELECT id INTO student3_id FROM students WHERE name = 'Emily Grande' LIMIT 1;
    SELECT id INTO student4_id FROM students WHERE name = 'Lucas Morgan' LIMIT 1;
    SELECT id INTO student5_id FROM students WHERE name = 'Chloe Ray' LIMIT 1;
    
    SELECT id INTO discovery_id FROM subscriptions WHERE name = 'Discovery Pass' LIMIT 1;
    SELECT id INTO unlimited_id FROM subscriptions WHERE name = 'Unlimited Pass' LIMIT 1;
    SELECT id INTO wellness_id FROM subscriptions WHERE name = 'Wellness Package' LIMIT 1;
    SELECT id INTO annual_id FROM subscriptions WHERE name = 'Annual Subscription' LIMIT 1;

    -- Student subscription records
    INSERT INTO student_subscription (id, student_id, subscription_id, start_date, end_date, payment_status, payment_method, is_active) VALUES
    (uuid_generate_v4(), student1_id, discovery_id, CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '15 days', 'paid', 'credit_card', TRUE),
    (uuid_generate_v4(), student2_id, unlimited_id, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '20 days', 'paid', 'bank_transfer', TRUE),
    (uuid_generate_v4(), student3_id, wellness_id, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE + INTERVAL '60 days', 'paid', 'credit_card', TRUE),
    (uuid_generate_v4(), student4_id, unlimited_id, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '25 days', 'paid', 'credit_card', TRUE),
    (uuid_generate_v4(), student5_id, annual_id, CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE + INTERVAL '305 days', 'paid', 'bank_transfer', TRUE);
END $$;

-- Event registrations
DO $$
DECLARE
    student1_id UUID;
    student2_id UUID;
    student3_id UUID;
    student4_id UUID;
    student5_id UUID;
    
    event1_id UUID;
    event2_id UUID;
    event3_id UUID;
    event4_id UUID;
BEGIN
    SELECT id INTO student1_id FROM students WHERE name = 'Julie Roberts' LIMIT 1;
    SELECT id INTO student2_id FROM students WHERE name = 'Anthony Small' LIMIT 1;
    SELECT id INTO student3_id FROM students WHERE name = 'Emily Grande' LIMIT 1;
    SELECT id INTO student4_id FROM students WHERE name = 'Lucas Morgan' LIMIT 1;
    SELECT id INTO student5_id FROM students WHERE name = 'Chloe Ray' LIMIT 1;
    
    SELECT id INTO event1_id FROM events WHERE title = 'Open House Day' LIMIT 1;
    SELECT id INTO event2_id FROM events WHERE title = 'Mindfulness Meditation Workshop' LIMIT 1;
    SELECT id INTO event3_id FROM events WHERE title = 'Weekend Yoga & Nature Retreat' LIMIT 1;
    SELECT id INTO event4_id FROM events WHERE title = 'Postural Alignment Workshop' LIMIT 1;

    -- Event registration records
    INSERT INTO event_registrations (id, event_id, student_id, registration_date, status, payment_status, payment_amount, payment_date) VALUES
    (uuid_generate_v4(), event1_id, student1_id, CURRENT_DATE - INTERVAL '5 days', 'confirmed', 'free', 0, NULL),
    (uuid_generate_v4(), event1_id, student3_id, CURRENT_DATE - INTERVAL '4 days', 'confirmed', 'free', 0, NULL),
    (uuid_generate_v4(), event1_id, student5_id, CURRENT_DATE - INTERVAL '3 days', 'confirmed', 'free', 0, NULL),
    (uuid_generate_v4(), event2_id, student2_id, CURRENT_DATE - INTERVAL '7 days', 'confirmed', 'paid', 30, CURRENT_DATE - INTERVAL '7 days'),
    (uuid_generate_v4(), event2_id, student4_id, CURRENT_DATE - INTERVAL '6 days', 'confirmed', 'paid', 30, CURRENT_DATE - INTERVAL '6 days'),
    (uuid_generate_v4(), event3_id, student1_id, CURRENT_DATE - INTERVAL '15 days', 'confirmed', 'paid', 250, CURRENT_DATE - INTERVAL '15 days'),
    (uuid_generate_v4(), event3_id, student5_id, CURRENT_DATE - INTERVAL '14 days', 'confirmed', 'paid', 250, CURRENT_DATE - INTERVAL '14 days'),
    (uuid_generate_v4(), event4_id, student1_id, CURRENT_DATE - INTERVAL '2 days', 'confirmed', '