CREATE TABLE `delivery_address` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userid` int NOT NULL,
	`address_line` varchar(100) NOT NULL,
	`country` varchar(100) NOT NULL,
	`state` varchar(100) NOT NULL,
	`city` varchar(100) NOT NULL,
	`zipcode` varchar(100) NOT NULL,
	CONSTRAINT `delivery_address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userid` int NOT NULL,
	`product_id` int NOT NULL,
	`payment_method_id` int NOT NULL,
	`delivery_address_id` int NOT NULL,
	`ordered_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment_method` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userid` int NOT NULL,
	`card_holder_name` varchar(100) NOT NULL,
	`card_number` varchar(100) NOT NULL,
	`expir_date` varchar(100) NOT NULL,
	`cvc` varchar(100) NOT NULL,
	CONSTRAINT `payment_method_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `delivery_address` ADD CONSTRAINT `delivery_address_userid_users_id_fk` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_userid_users_id_fk` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_payment_method_id_payment_method_id_fk` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_delivery_address_id_delivery_address_id_fk` FOREIGN KEY (`delivery_address_id`) REFERENCES `delivery_address`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payment_method` ADD CONSTRAINT `payment_method_userid_users_id_fk` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;