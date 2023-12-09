DELIMITER //

CREATE PROCEDURE InsertData()
BEGIN
TRUNCATE TABLE roles;
TRUNCATE TABLE users;
TRUNCATE TABLE personal_details;
TRUNCATE TABLE posts;
TRUNCATE TABLE tags;
TRUNCATE TABLE post_tags;

INSERT INTO roles (role_title)
VALUES
    ('Tech content creator'),
    ('Wild-Life content creator'),
    ('Social Issues content creator');


    INSERT INTO users (first_name, last_name, full_name, role_id)
VALUES
    ('John', 'Doe', 'John Doe', 1),
    ('Jane', 'Smith', 'Jane Smith', 2),
    ('Michael', 'Johnson', 'Michael Johnson', 3),
    -- Add more entries as needed
    ('Alice', 'Brown', 'Alice Brown', 1),
    ('David', 'Lee', 'David Lee', 2),
    ('Emily', 'Wilson', 'Emily Wilson', 3),
    ('James', 'Martinez', 'James Martinez', 1),
    ('Sophia', 'Anderson', 'Sophia Anderson', 2),
    ('William', 'Taylor', 'William Taylor', 3),
    ('Olivia', 'Thomas', 'Olivia Thomas', 1);


INSERT INTO personal_details (address, phone_number, email_address, country_name, user_id)
VALUES
    ('123 Main St', '123-456-7890', 'john@example.com', 'USA', 1),
    ('456 Elm St', '987-654-3210', 'jane@example.com', 'Canada', 2),
    ('789 Oak St', '555-123-4567', 'michael@example.com', 'Australia', 3),
    -- Add more entries as needed
    ('321 Maple St', '555-555-5555', 'alice@example.com', 'USA', 4),
    ('654 Pine St', '111-222-3333', 'david@example.com', 'Canada', 5),
    ('654 Pine St-1', '111-222-3332', 'info.david@example.com', 'Canada', 5),
    ('777 Cedar St', '777-888-9999', 'james@example.com', 'USA', 7),
    ('999 Birch St', '333-444-5555', 'sophia@example.com', 'Australia', 8),
    ('555 Oak St', '222-333-4444', 'william@example.com', 'Canada', 9),
    ('222 Elm St', '666-777-8888', 'olivia@example.com', 'USA', 10);
    -- Add entries for other users

INSERT INTO posts (title, content, user_id)
VALUES
    ('Introduction to MySQL', 'This is a beginners guide to MySQL.', 1),
    ('Wildlife Conservation', 'Preserving endangered species around the world.', 2),
    ('Social Issues Discussion', 'Analyzing current social challenges.', 3),
    -- Add more entries as needed
    ('Database Optimization', 'Tips for optimizing your database performance.', 4),
    ('Exploring Nature', 'A journey into the wilderness.', 5),
    ('Tackling Inequality', 'Addressing economic disparities in society.', 7);
    -- Add entries for other users

INSERT INTO tags (title)
VALUES
    ('Technology'),
    ('Wildlife'),
    ('Social Issues'),
    -- Add more entries as needed
    ('Programming'),
    ('Conservation'),
    ('Equality');
    -- Add more entries

INSERT INTO post_tags (post_id, tag_id)
VALUES
    (1, 1), -- Technology
    (1, 4), -- Programming
    (1, 6), -- Equality
    (2, 2), -- Wildlife
    (2, 5), -- Conservation;
    (2, 6); -- Equality;

END;
//

DELIMITER ;


/*    // "debug": "nodemon --exec \"node --inspect-brk=0.0.0.0:9229\" --loader ts-node/esm server.ts"*/

