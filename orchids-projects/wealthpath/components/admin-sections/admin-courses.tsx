'use client'

import { useState } from 'react'
import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, BookOpen } from 'lucide-react'

export default function AdminCourses() {
  const { state, addCourse, updateCourse, deleteCourse } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    price: 0,
    level: 'beginner' as const,
    duration: 0,
  })

  const handleSubmit = () => {
    if (editingId) {
      updateCourse(editingId, formData)
      setEditingId(null)
    } else {
      addCourse({
        ...formData,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        thumbnail: '',
        students: 0,
        rating: 4.5,
      } as any)
    }
    setFormData({ title: '', description: '', instructor: '', price: 0, level: 'beginner', duration: 0 })
    setIsOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold">Course Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Course' : 'Create New Course'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Course Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Course title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Course description"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Instructor</Label>
                <Input
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="Instructor name"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Duration (hours)</Label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseFloat(e.target.value) })}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label>Level</Label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingId ? 'Update Course' : 'Create Course'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Courses</p>
          <p className="mt-1 text-2xl font-bold">{state.courses.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="mt-1 text-2xl font-bold">${state.courses.reduce((acc, c) => acc + (c.price * 10), 0)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Students</p>
          <p className="mt-1 text-2xl font-bold">{state.courses.reduce((acc, c) => acc + c.students, 0)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Rating</p>
          <p className="mt-1 text-2xl font-bold">4.6/5</p>
        </Card>
      </div>

      {/* Courses Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Instructor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Students</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Level</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.courses.slice(0, 10).map((course) => (
                <tr key={course.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.duration}h course</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{course.instructor}</td>
                  <td className="px-6 py-4 text-sm font-medium">{course.students}</td>
                  <td className="px-6 py-4 text-sm">${course.price}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCourse(course.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
