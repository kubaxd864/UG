INSERT INTO items (name, price, category)
SELECT name, price, category
FROM (
  VALUES
    ('Laptop', 999.99, 'Electronics'),
    ('Mouse', 29.99, 'Electronics'),
    ('Desk', 199.99, 'Furniture')
) AS seed(name, price, category)
WHERE NOT EXISTS (SELECT 1 FROM items);
