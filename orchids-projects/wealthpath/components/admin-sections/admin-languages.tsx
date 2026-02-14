'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Plus, MoreVertical } from 'lucide-react'

export default function AdminLanguages() {
  const languages = [
    { code: 'en', name: 'English', status: 'active', completion: 100, speakers: '1.5B' },
    { code: 'es', name: 'Spanish', status: 'active', completion: 85, speakers: '500M' },
    { code: 'fr', name: 'French', status: 'active', completion: 72, speakers: '280M' },
    { code: 'de', name: 'German', status: 'active', completion: 68, speakers: '130M' },
    { code: 'zh', name: 'Chinese', status: 'in-progress', completion: 45, speakers: '1.1B' },
    { code: 'ja', name: 'Japanese', status: 'in-progress', completion: 35, speakers: '125M' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">Multilingual Support</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage content translations and language support
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Language
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Languages Supported</p>
          <p className="mt-2 text-3xl font-bold">{languages.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Languages</p>
          <p className="mt-2 text-3xl font-bold">{languages.filter(l => l.status === 'active').length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Reach</p>
          <p className="mt-2 text-3xl font-bold">4.5B+</p>
        </Card>
      </div>

      {/* Languages Table */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Supported Languages
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Language</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Code</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Completion</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Native Speakers</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((lang) => (
                <tr key={lang.code} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-medium text-sm">{lang.name}</td>
                  <td className="px-6 py-4 font-mono text-sm">{lang.code}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      lang.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {lang.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${lang.completion}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{lang.completion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{lang.speakers}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Translation Status */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Translation Queue</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <span className="text-sm font-medium">Pending Translations</span>
            <span className="text-sm font-semibold">24 items</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <span className="text-sm font-medium">In Progress</span>
            <span className="text-sm font-semibold">12 items</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <span className="text-sm font-medium">Completed This Month</span>
            <span className="text-sm font-semibold">89 items</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
