INSERT INTO site_settings (key, value) VALUES
  ('hero_image', 'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/e0278096-1125-4087-8f19-b384d38d1c3d.png'),
  ('monument_image', 'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/9cbd1e9a-0bc5-40b5-a600-133269b0f520.png'),
  ('location_image', 'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/eafcd2bc-6509-4d37-9a72-d1a9f9d336b0.jpg'),
  ('org_logo', 'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/708717a5-e1d8-48dc-b066-c29ad7d4b1e6.png')
ON CONFLICT (key) DO NOTHING;
