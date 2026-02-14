'use client'

import { useState } from 'react'
import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Zap, Loader2, CheckCircle } from 'lucide-react'

export default function AdminAIGenerator() {
  const { generateArticleWithAI, addNotification } = useAdmin()
  const [topic, setTopic] = useState('')
  const [category, setCategory] = useState('freelancing')
  const [isLoading, setIsLoading] = useState(false)
  const [lastGenerated, setLastGenerated] = useState<any>(null)

  const handleGenerate = async () => {
    if (!topic.trim()) {
      addNotification('Please enter a topic', 'warning')
      return
    }

    setIsLoading(true)
    try {
      await generateArticleWithAI(topic, category)
      setLastGenerated({ topic, category, time: new Date() })
      addNotification(`Article "${topic}" generated successfully`, 'success')
      setTopic('')
    } catch (error) {
      addNotification('Failed to generate article', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">AI Article Generator</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Generate high-quality articles using OpenAI API integration
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-4 border border-amber-200">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Smart Article Generation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This feature uses OpenAI's GPT models to generate engaging, SEO-optimized articles based on your topic and category. Perfect for scaling content production.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Article Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Best Practices for Remote Freelancing"
                disabled={isLoading}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isLoading}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2"
              >
                <option value="freelancing">Freelancing</option>
                <option value="investing">Investing</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="passive-income">Passive Income</option>
              </select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate Article
                </>
              )}
            </Button>
          </div>

          {lastGenerated && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm text-green-900">Article Generated</h3>
                  <p className="text-sm text-green-700 mt-1">
                    "{lastGenerated.topic}" - {lastGenerated.category}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {lastGenerated.time.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Configuration Info */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Integration Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-sm">OpenAI API</p>
              <p className="text-xs text-muted-foreground">GPT-4 Model</p>
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-700" />
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-sm">Daily Quota</p>
              <p className="text-xs text-muted-foreground">Articles generated today</p>
            </div>
            <span className="text-sm font-semibold">5 / 100</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-sm">Avg Generation Time</p>
              <p className="text-xs text-muted-foreground">Per article</p>
            </div>
            <span className="text-sm font-semibold">~45 seconds</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
