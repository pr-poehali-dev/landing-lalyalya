INSERT INTO site_settings (key, value) VALUES ('about_org_popup_enabled', 'true')
ON CONFLICT (key) DO NOTHING;
