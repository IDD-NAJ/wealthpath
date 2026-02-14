'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, Settings, Plus } from 'lucide-react'

export default function AdminIntegrations() {
  const integrations = [
    { name: 'OpenAI', status: 'connected', type: 'AI', icon: 'AI' },
    { name: 'Stripe', status: 'connected', type: 'Payment', icon: 'Payments' },
    { name: 'SendGrid', status: 'connected', type: 'Email', icon: 'Email' },
    { name: 'Slack', status: 'connected', type: 'Communication', icon: 'Chat' },
    { name: 'Google Analytics', status: 'connected', type: 'Analytics', icon: 'Analytics' },
    { name: 'Mailchimp', status: 'disconnected', type: 'Marketing', icon: 'Marketing' },
    { name: 'Twilio', status: 'disconnected', type: 'SMS', icon: 'SMS' },
    { name: 'GitHub', status: 'connected', type: 'Development', icon: 'Dev' },
  ]

  const connected = integrations.filter(i => i.status === 'connected').length
  const total = integrations.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">Integration Management</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect and manage third-party integrations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Connected</p>
          <p className="mt-2 text-3xl font-bold">{connected}/{total}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Sync</p>
          <p className="mt-2 text-3xl font-bold">Real-time</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">System Status</p>
          <p className="mt-2 text-3xl font-bold text-green-600">Healthy</p>
        </Card>
      </div>

      {/* Integrations Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.name} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{integration.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{integration.type}</p>
              </div>
              <div
                className={`h-3 w-3 rounded-full ${
                  integration.status === 'connected'
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant={integration.status === 'connected' ? 'outline' : 'default'}
                size="sm"
                className="flex-1"
              >
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* API Status */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Integration Status & Health
        </h3>
        <div className="space-y-3">
          {integrations.filter(i => i.status === 'connected').map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <p className="text-sm font-medium">{integration.name}</p>
                <p className="text-xs text-muted-foreground">Last sync: 2 minutes ago</p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-green-700" />
                Operational
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
