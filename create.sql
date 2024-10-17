CREATE TABLE loots (
    loot_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(100),
    tier VARCHAR(100),
    base_value DECIMAL(10, 2),
    sell_price DECIMAL(10, 2),
    buy_price DECIMAL(10, 2),
    craftable BOOLEAN,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE creatures (
    creature_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(class_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    item_type VARCHAR(100),
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drop (
    loot_id INT,
    creature_id INT,
    PRIMARY KEY (loot_id, creature_id),
    FOREIGN KEY (loot_id) REFERENCES loots(loot_id),
    FOREIGN KEY (creature_id) REFERENCES creatures(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE occurrence (
    location_id INT,
    creature_id INT,
    PRIMARY KEY (location_id, creature_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id),
    FOREIGN KEY (creature_id) REFERENCES creatures(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE variation (
    creature_id INT,
    variation_id INT,
    PRIMARY KEY (creature_id, variation_id),
    FOREIGN KEY (creature_id) REFERENCES creatures(creature_id),
    FOREIGN KEY (variation_id) REFERENCES creatures(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weakness (
    item_id INT,
    creature_id INT,
    PRIMARY KEY (item_id, creature_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (creature_id) REFERENCES creatures(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
