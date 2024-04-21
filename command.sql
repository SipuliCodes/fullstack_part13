CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes bigint DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Someone', 'google.com', 'Something', 10);

insert into blogs (author, url, title, likes) values ('Somewho', 'tesla.com', 'FSD', 1000);