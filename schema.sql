-- Create Database
CREATE DATABASE IF NOT EXISTS ems_db;
USE ems_db;

-- Drop tables if exist
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Events Table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    total_capacity INT NOT NULL,
    remaining_tickets INT NOT NULL
);

-- Bookings Table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    booking_date DATETIME,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample Data (Users)
INSERT INTO users (name, email) VALUES
('Rohan', 'rohan123@gmail.com'),
('Mohit', 'mohitrocks@gmail.com'),
('Ansh', 'ansh98@gmail.com'),
('Raghav', 'rghv23@gmail.com');

-- Sample Data (Events)
INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES
('Tech Conference 2026', 'A conference discussing the latest trends in AI, cloud computing, and system design.', '2026-04-15', 300, 300),
('Startup Pitch Night', 'An event where early-stage startups pitch their ideas to investors and mentors.', '2026-04-20', 150, 150),
('Music Fest Live', 'Live performances by popular bands and indie artists.', '2026-05-05', 500, 500),
('Web Development Workshop', 'Hands-on workshop covering React, Node.js, and modern web practices.', '2026-04-25', 100, 100),
('Data Science Bootcamp', 'Hands-on workshop covering React, Node.js, and modern web practices.', '2026-05-10', 200, 200);