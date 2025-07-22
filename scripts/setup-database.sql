-- This file is for reference only - Prisma handles the actual database setup
-- Run `npm run setup` to initialize the database

-- Cameras table
CREATE TABLE Camera (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Incidents table  
CREATE TABLE Incident (
    id TEXT PRIMARY KEY,
    cameraId TEXT NOT NULL,
    type TEXT NOT NULL,
    tsStart DATETIME NOT NULL,
    tsEnd DATETIME NOT NULL,
    thumbnailUrl TEXT NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cameraId) REFERENCES Camera(id)
);

-- Sample data (handled by prisma/seed.ts)
INSERT INTO Camera (id, name, location) VALUES 
('cam1', 'Shop Floor A', 'Main Production Area - North Wing'),
('cam2', 'Vault', 'Secure Storage - Basement Level'),
('cam3', 'Entrance', 'Main Building Entrance - Ground Floor');
