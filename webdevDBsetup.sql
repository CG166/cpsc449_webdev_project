CREATE DATABASE IF NOT EXISTS shop_db;
USE shop_db;

-- USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- PRODUCTS TABLE
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category ENUM('WOMEN','MEN','KIDS')
);

-- SHOPPING CART TABLE
CREATE TABLE shopping_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id)
);

-- SHOPPING CART ITEMS TABLE
CREATE TABLE shoppingcart_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES shopping_cart(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- PAYMENT METHOD TABLE
CREATE TABLE payment_method (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    card_holder_name VARCHAR(100) NOT NULL,
    card_number VARCHAR(100) NOT NULL,
    expir_date VARCHAR(100) NOT NULL,
    cvc VARCHAR(100) NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id)
);

-- DELIVERY ADDRESS TABLE
CREATE TABLE delivery_address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    address_line VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    zipcode VARCHAR(100) NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id)
);

-- ORDERS TABLE
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    product_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    delivery_address_id INT NOT NULL,
    ordered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_method(id),
    FOREIGN KEY (delivery_address_id) REFERENCES delivery_address(id)
);
