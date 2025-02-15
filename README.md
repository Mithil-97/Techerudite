# Required information to run project successfully
<!-- create "users" table in "mithil" database run below query in MySQL Workbench -->
CREATE TABLE mithil.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )

- run "npm i" command inside both backend and frontend directories
- then to run both backend and frontend run "npm start" command inside both directories
