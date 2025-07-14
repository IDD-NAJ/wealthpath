-- Fix RLS policies to work with admin role

-- Drop problematic policies first
DROP POLICY IF EXISTS "Admins can manage news sources" ON public.news_sources;
DROP POLICY IF EXISTS "Admins and chief authors can manage draft articles" ON public.draft_articles;

-- Create new working policies for news_sources
CREATE POLICY "Admins can manage news sources" 
ON public.news_sources 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'chief_author')
  )
);

-- Create new working policies for draft_articles  
CREATE POLICY "Admins and chief authors can manage draft articles" 
ON public.draft_articles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'chief_author')
  )
);