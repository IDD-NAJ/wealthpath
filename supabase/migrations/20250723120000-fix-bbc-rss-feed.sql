
-- Fix BBC RSS feed URL to use a more reliable endpoint
UPDATE news_sources 
SET rss_feed_url = 'https://feeds.bbci.co.uk/news/world/rss.xml'
WHERE name = 'BBC' AND (rss_feed_url IS NULL OR rss_feed_url = 'https://feeds.bbci.co.uk/news/rss.xml');

-- Also ensure BBC is active
UPDATE news_sources 
SET active = true
WHERE name = 'BBC';
