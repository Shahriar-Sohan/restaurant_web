-- CLEANUP: truncate tables and reset sequences to avoid duplicates and FK issues
TRUNCATE TABLE
  cart_items,
  cart,
  invoice,
  order_items,
  orders,
  payments,
  address,
  menu,
  category,
  users
RESTART IDENTITY CASCADE;

-- USERS
INSERT INTO users (name, email, pwd)
SELECT
  'User_' || i,
  'user' || i || '@example.com',
  'password_hash'
FROM generate_series(1, 1000) AS s(i);

-- CATEGORY
INSERT INTO category (category_title, category_description)
VALUES
('Appetizers', 'Start your meal with our delicious appetizers'),
('Main Course', 'Hearty main dishes to satisfy your hunger'),
('Desserts', 'Sweet treats to finish your meal'),
('Beverages', 'Refreshing drinks and cocktails'),
('Salads', 'Fresh and healthy salads');

-- MENU (1000 items)
INSERT INTO menu (category_id, img, price, availability, discount, image, rating, prep_time, calories, ingredients)
SELECT
  (random() * 4 + 1)::int, -- category_id between 1 and 5
  'https://example.com/img' || i || '.jpg',
  ROUND((random()*30 + 5)::numeric, 2), -- price between 5 and 35 rounded to 2 decimals
  TRUE,
  0,
  'https://example.com/img' || i || '.jpg',
  ROUND((random()*5)::numeric, 2), -- rating 0-5 rounded
  (random() * 60)::int, -- prep time 0-60 mins
  (random() * 1000)::int, -- calories
  ARRAY['ingredient1', 'ingredient2', 'ingredient3']
FROM generate_series(1, 1000) AS s(i);

-- ADDRESS
INSERT INTO address (user_id, address_line, city, postal_code, country)
SELECT
  (random() * 999 + 1)::int,
  '123 Street ' || i,
  'City_' || ((random() * 20)::int + 1),
  '1000' || (random() * 9000 + 1000)::int,
  'Country_' || ((random() * 10)::int + 1)
FROM generate_series(1, 1000) AS s(i);

-- CART (one per user approx)
INSERT INTO cart (user_id)
SELECT i FROM generate_series(1, 1000) AS s(i);

-- CART ITEMS (3000 items randomly spread)
INSERT INTO cart_items (cart_id, food_id, quantity)
SELECT
  c.cart_id,
  m.food_id,
  (random() * 5 + 1)::int
FROM
  (SELECT cart_id FROM cart ORDER BY random() LIMIT 3000) c,
  (SELECT food_id FROM menu ORDER BY random() LIMIT 3000) m
LIMIT 3000;

-- ORDERS (2000 orders)
INSERT INTO orders (user_id, total_price, status)
SELECT
  (random() * 999 + 1)::int,
  ROUND((random()*150 + 10)::numeric, 2),
  (ARRAY['pending'::order_status, 'paid'::order_status, 'cancelled'::order_status, 'delivered'::order_status])[floor(random()*4 + 1)]
FROM generate_series(1, 2000);

-- ORDER ITEMS (5000 items)
INSERT INTO order_items (order_id, food_id, quantity, price_at_purchase)
SELECT
  o.order_id,
  m.food_id,
  (random() * 5 + 1)::int,
  ROUND((random()*30 + 5)::numeric, 2)
FROM
  (SELECT order_id FROM orders ORDER BY random() LIMIT 5000) o,
  (SELECT food_id FROM menu ORDER BY random() LIMIT 5000) m
LIMIT 5000;

-- PAYMENTS (for paid or completed orders, 1500 payments)
INSERT INTO payments (order_id, payment_method, payment_status, amount)
SELECT
  o.order_id,
  (ARRAY['cash'::payment_method, 'card'::payment_method, 'paypal'::payment_method])[floor(random()*3 + 1)],
  'completed'::payment_status,
  ROUND((random()*150 + 10)::numeric, 2)
FROM
  (SELECT order_id FROM orders ORDER BY random() LIMIT 1500) o;

-- INVOICE (1500 invoices)
INSERT INTO invoice (order_id, user_id, address_line, city, postal_code, country)
SELECT
  o.order_id,
  (random() * 999 + 1)::int,
  '123 Invoice Street ' || i,
  'InvoiceCity_' || ((random() * 20)::int + 1),
  '2000' || (random() * 9000 + 1000)::int,
  'InvoiceCountry_' || ((random() * 10)::int + 1)
FROM
  (SELECT order_id FROM orders ORDER BY random() LIMIT 1500) o,
  generate_series(1,1500) AS s(i);