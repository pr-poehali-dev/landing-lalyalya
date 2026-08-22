INSERT INTO site_settings (key, value) VALUES
  ('raised_amount', '10000'),
  ('goal_amount', '15000000')
ON CONFLICT (key) DO NOTHING;
