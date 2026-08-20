CREATE TABLE IF NOT EXISTS entrepreneurs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    photo TEXT,
    bio TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_entrepreneurs_sort_order ON entrepreneurs (sort_order);

CREATE TABLE IF NOT EXISTS donors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    role VARCHAR(500) NOT NULL DEFAULT '',
    bio TEXT NOT NULL DEFAULT '',
    photo TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_donors_sort_order ON donors (sort_order);

CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_partners_sort_order ON partners (sort_order);

CREATE TABLE IF NOT EXISTS faq_items (
    id SERIAL PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_faq_items_sort_order ON faq_items (sort_order);

CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL
);
