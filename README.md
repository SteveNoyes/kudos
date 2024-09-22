database sql setup:

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(id)
);



Upload your PHP files to your server (e.g., using cPanel).
Make sure the database credentials in the PHP files are correct.
Place the index.html and app.js files in your public folder (if using Node.js or Apache).
Access your post wall through the browser and test the CRUD functionalities.



User Authentication: Add user accounts and track who liked or posted.
Pagination: Implement pagination if you have a lot of posts.
Styling: Improve the UI with CSS or use frameworks like Bootstrap.

