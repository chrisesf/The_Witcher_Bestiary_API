CREATE TABLE component (
    component_id SERIAL PRIMARY KEY,
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

CREATE TABLE location (
    location_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE creature (
    creature_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE item (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    item_type VARCHAR(100),
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE drop (
    component_id INTEGER,
    creature_id INTEGER,
    PRIMARY KEY (component_id, creature_id),
    FOREIGN KEY (component_id) REFERENCES component(component_id),
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE occurrence (
    location_id INTEGER,
    creature_id INTEGER,
    PRIMARY KEY (location_id, creature_id),
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE variation (
    creature_id INTEGER,
    variation_id INTEGER,
    PRIMARY KEY (creature_id, variation_id),
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (variation_id) REFERENCES creature(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE weakness (
    item_id INTEGER,
    creature_id INTEGER,
    PRIMARY KEY (item_id, creature_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id),
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
