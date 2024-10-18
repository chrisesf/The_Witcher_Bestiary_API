CREATE TABLE loots (
    loot_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(100),
    tier VARCHAR(100),
    base_value DECIMAL(10, 2),
    sell_price DECIMAL(10, 2),
    buy_price DECIMAL(10, 2),
    craftable BOOLEAN,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE locations (
    location_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE categories (
    category_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE creatures (
    creature_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT,
    category_id VARCHAR(100),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE items (
    item_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    item_type VARCHAR(100),
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE drop (
    loot_id VARCHAR(100),
    creature_id VARCHAR(100),
    PRIMARY KEY (loot_id, creature_id),
    FOREIGN KEY (loot_id) REFERENCES loots(loot_id),
    FOREIGN KEY (creature_id) REFERENCES creatures(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE occurrence (
    location_id VARCHAR(100),
    creature_id VARCHAR(100),
    PRIMARY KEY (location_id, creature_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id),
    FOREIGN KEY (creature_id) REFERENCES creatures(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE variation (
    creature_id VARCHAR(100),
    variation_id VARCHAR(100),
    PRIMARY KEY (creature_id, variation_id),
    FOREIGN KEY (creature_id) REFERENCES creatures(creature_id),
    FOREIGN KEY (variation_id) REFERENCES creatures(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE weakness (
    item_id VARCHAR(100),
    creature_id VARCHAR(100),
    PRIMARY KEY (item_id, creature_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (creature_id) REFERENCES creatures(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
