-- Script to create a new admin user
-- Run this in your Neon SQL Editor after replacing username and password

-- First, generate a password hash using Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = bcrypt.hashSync('your_password_here', 10);
-- console.log(hash);

-- Then insert the new admin:
INSERT INTO admins (username, password_hash) 
VALUES ('your_username', 'your_bcrypt_hash_here');
