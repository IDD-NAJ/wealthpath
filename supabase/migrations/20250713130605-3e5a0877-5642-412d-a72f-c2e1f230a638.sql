-- First, clean up draft articles that reference invalid news sources
DELETE FROM draft_articles 
WHERE source_id IN (
  SELECT id FROM news_sources 
  WHERE name = 'News Source Name' 
     OR name LIKE '{{%'
     OR url = 'https://example.com'
);

-- Now delete the invalid news sources
DELETE FROM news_sources 
WHERE name = 'News Source Name' 
   OR name LIKE '{{%'
   OR url = 'https://example.com';

-- Update the legitimate sources to ensure they have correct data
UPDATE news_sources SET 
  name = 'Citinews',
  url = 'https://citinewsroom.com',
  rss_feed_url = 'https://citinewsroom.com/feed/',
  active = true
WHERE name = 'Citinews' OR url LIKE '%citinewsroom%';

UPDATE news_sources SET 
  name = 'Graphic Online',
  url = 'https://www.graphic.com.gh',
  rss_feed_url = 'https://www.graphic.com.gh/rss/news.xml',
  active = true
WHERE name = 'Graphic Online' OR url LIKE '%graphic.com.gh%';

UPDATE news_sources SET 
  name = 'GhanaFeed',
  url = 'https://www.ghanafeed.com',
  rss_feed_url = 'https://www.ghanafeed.com/feed/',
  active = true
WHERE name = 'GhanaFeed' OR url LIKE '%ghanafeed%';

UPDATE news_sources SET 
  name = 'Reuters World News',
  url = 'https://www.reuters.com',
  rss_feed_url = 'https://www.reutersagency.com/feed/?best-regions=world&post_type=best',
  active = true
WHERE name = 'Reuters World News' OR url LIKE '%reuters%';

UPDATE news_sources SET 
  name = 'GhanaWeb',
  url = 'https://www.ghanaweb.com/GhanaHomePage/',
  rss_feed_url = NULL,
  active = true
WHERE name = 'GhanaWeb' OR url LIKE '%ghanaweb%';

UPDATE news_sources SET 
  name = 'WION News',
  url = 'https://www.wionews.com/',
  rss_feed_url = 'https://www.wionews.com/rss',
  active = true
WHERE name = 'WION News' OR url LIKE '%wionews%';

UPDATE news_sources SET 
  name = 'BBC',
  url = 'https://www.bbc.com/',
  rss_feed_url = 'https://feeds.bbci.co.uk/news/rss.xml',
  active = true
WHERE name = 'BBC' OR url LIKE '%bbc%';

UPDATE news_sources SET 
  name = 'MyJoyOnline',
  url = 'https://www.myjoyonline.com/',
  rss_feed_url = NULL,
  active = true
WHERE name = 'MyJoyOnline' OR url LIKE '%myjoyonline%';