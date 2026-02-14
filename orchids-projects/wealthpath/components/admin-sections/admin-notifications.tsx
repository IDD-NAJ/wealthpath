'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, Send } from 'lucide-react'
import { useState } from 'react'

export default function AdminNotifications() {
  const { state, addNotification } = useAdmin()
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as const,
  })

  const handleSend = () => {
    if (newNotification.message.trim()) {
      addNotification(newNotification.message, newNotification.type)
      setNewNotification({ title: '', message: '', type: 'info' })
    }
  }

  const notifications = state.notifications || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Notifications</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Send system notifications to users
        </p>
      </div>

      {/* Send Notification */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Send Notification</h3>
        <div className="space-y-4">
          <div>
            <Label>Notification Type</Label>
            <select
              value={newNotification.type}
              onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value as any })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
            >
              <option value="info">Information</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div>
            <Label>Message</Label>
            <Textarea
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
              placeholder="Enter notification message"
              className="mt-1"
            />
          </div>
          <Button onClick={handleSend} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Notification
          </Button>
        </div>
      </Card>

      {/* Recent Notifications */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold">Recent Notifications</h3>
        </div>
        <div className="space-y-2 p-6">
          {notifications.length > 0 ? (
            notifications.slice(0, 10).map((notif) => (
              <div
                key={notif.id}
                className={`rounded-lg p-4 flex items-start gap-3 ${
                  notif.type === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : notif.type === 'error'
                    ? 'bg-red-50 border border-red-200'
                    : notif.type === 'warning'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      notif.type === 'success'
                        ? 'text-green-900'
                        : notif.type === 'error'
                        ? 'text-red-900'
                        : notif.type === 'warning'
                        ? 'text-yellow-900'
                        : 'text-blue-900'
                    }`}
                  >
                    {notif.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notif.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-6">No notifications</p>
          )}
        </div>
      </Card>

      {/* Notification Templates */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Quick Templates</h3>
        <div className="grid gap-2 md:grid-cols-2">
          <Button
            variant="outline"
            className="justify-start text-left"
            onClick={() => setNewNotification({
              ...newNotification,
              message: 'New course now available! Check out our latest offering.',
              type: 'success'
            })}
          >
            New Course Alert
          </Button>
          <Button
            variant="outline"
            className="justify-start text-left"
            onClick={() => setNewNotification({
              ...newNotification,
              message: 'System maintenance scheduled for tonight from 9 PM to 11 PM.',
              type: 'warning'
            })}
          >
            Maintenance Notice
          </Button>
          <Button
            variant="outline"
            className="justify-start text-left"
            onClick={() => setNewNotification({
              ...newNotification,
              message: 'Limited time offer: Get 50% off annual subscriptions today!',
              type: 'info'
            })}
          >
            Special Offer
          </Button>
          <Button
            variant="outline"
            className="justify-start text-left"
            onClick={() => setNewNotification({
              ...newNotification,
              message: 'Your certificate is ready to download!',
              type: 'success'
            })}
          >
            Certificate Ready
          </Button>
        </div>
      </Card>
    </div>
  )
}
