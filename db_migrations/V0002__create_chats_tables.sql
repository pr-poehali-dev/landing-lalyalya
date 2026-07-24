CREATE TABLE IF NOT EXISTS chats (
    id VARCHAR(40) PRIMARY KEY,
    ai_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    lead_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_message_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    chat_id VARCHAR(40) NOT NULL,
    sender VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_chat ON chat_messages(chat_id, id);
CREATE INDEX IF NOT EXISTS idx_chats_last ON chats(last_message_at DESC);