'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Plus } from 'lucide-react'

export default function AdminScheduler() {
  const scheduleItems = [
    { id: 1, title: 'Publish: Advanced SEO Tips', type: 'article', date: '2024-02-15', time: '09:00 AM', status: 'scheduled' },
    { id: 2, title: 'Email: New Course Launch', type: 'email', date: '2024-02-16', time: '10:00 AM', status: 'scheduled' },
    { id: 3, title: 'Social: Weekly Update', type: 'social', date: '2024-02-14', time: '02:00 PM', status: 'published' },
    { id: 4, title: 'Publish: Investing Trends', type: 'article', date: '2024-02-17', time: '03:00 PM', status: 'draft' },
    { id: 5, title: 'Webinar: Freelancing 101', type: 'webinar', date: '2024-02-20', time: '06:00 PM', status: 'scheduled' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">Content Scheduler</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Schedule articles, emails, social posts, and webinars
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Item
        </Button>
      </div>

      {/* Calendar View */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Scheduled Content
        </h3>
        <div className="space-y-3">
          {scheduleItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-l-4 border-primary p-4 bg-secondary/50">
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">{item.date} at {item.time}</span>
                  <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">
                    {item.type}
                  </span>
                </div>
              </div>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                item.status === 'published'
                  ? 'bg-green-100 text-green-700'
                  : item.status === 'scheduled'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduling Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Upcoming This Week</p>
          <p className="mt-2 text-3xl font-bold">3</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Published This Month</p>
          <p className="mt-2 text-3xl font-bold">24</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Average Engagement</p>
          <p className="mt-2 text-3xl font-bold">4.2%</p>
        </Card>
      </div>
    </div>
  )
}
