-- Clean up all existing news sources and maintain only the specified 8 sources

-- First, delete all existing sources
DELETE FROM news_sources;

-- Insert the 8 specified sources with correct data
INSERT INTO news_sources (name, url, rss_feed_url, active) VALUES
('Citinews', 'https://citinewsroom.com', 'https://citinewsroom.com/feed/', true),
('Graphic Online', 'https://www.graphic.com.gh', 'https://www.graphic.com.gh/rss/news.xml', true),
('GhanaFeed', 'https://www.ghanafeed.com', 'https://www.ghanafeed.com/feed/', true),
('Reuters World News', 'https://www.reuters.com', 'https://www.reutersagency.com/feed/?best-regions=world&post_type=best', true),
('GhanaWeb', 'https://www.ghanaweb.com/GhanaHomePage/', NULL, true),
('WION News', 'https://www.wionews.com/', 'https://www.wionews.com/rss', true),
('BBC', 'https://www.bbc.com/', 'https://feeds.bbci.co.uk/news/rss.xml', true),
('MyJoyOnline', 'https://www.myjoyonline.com/', NULL, true);