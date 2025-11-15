CREATE TABLE `shopping_cart` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userid` int NOT NULL,
	CONSTRAINT `shopping_cart_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shoppingcart_item` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cart_id` int NOT NULL,
	`product_id` int NOT NULL,
	CONSTRAINT `shoppingcart_item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `category` enum('WOMEN','MEN','KIDS');--> statement-breakpoint
ALTER TABLE `shopping_cart` ADD CONSTRAINT `shopping_cart_userid_users_id_fk` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shoppingcart_item` ADD CONSTRAINT `shoppingcart_item_cart_id_shopping_cart_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `shopping_cart`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shoppingcart_item` ADD CONSTRAINT `shoppingcart_item_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;