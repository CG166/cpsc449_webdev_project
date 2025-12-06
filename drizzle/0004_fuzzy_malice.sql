ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_order_id_orders_id_fk`;
--> statement-breakpoint
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_product_id_products_id_fk`;
--> statement-breakpoint
ALTER TABLE `order_items` MODIFY COLUMN `quantity` int NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `total` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `created_at` timestamp DEFAULT (now());