'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, TrendingUp } from 'lucide-react'

export default function AdminStudentProgress() {
  const { state, updateStudentProgress } = useAdmin()

  const completionStats = {
    totalStudents: state.students.length,
    avgCompletion: Math.round(
      state.students.reduce((acc, s) => {
        const avg = s.enrollments.reduce((sum, e) => sum + e.progress, 0) / (s.enrollments.length || 1)
        return acc + avg
      }, 0) / state.students.length
    ),
    certificatesIssued: 45,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Student Progress Tracking</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Monitor student enrollment and course completion
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Students</p>
          <p className="mt-2 text-3xl font-bold">{completionStats.totalStudents}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Average Completion</p>
          <p className="mt-2 text-3xl font-bold">{completionStats.avgCompletion}%</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Certificates Issued</p>
          <p className="mt-2 text-3xl font-bold">{completionStats.certificatesIssued}</p>
        </Card>
      </div>

      {/* Students Progress */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold">Student Enrollments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Courses Enrolled</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Average Progress</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {state.students.slice(0, 15).map((student) => {
                const avgProgress = student.enrollments.length > 0
                  ? Math.round(student.enrollments.reduce((sum, e) => sum + e.progress, 0) / student.enrollments.length)
                  : 0

                return (
                  <tr key={student.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-sm">{student.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">{student.email}</td>
                    <td className="px-6 py-4 text-sm font-medium">{student.enrollments.length}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${avgProgress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{avgProgress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        avgProgress >= 70 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {avgProgress >= 70 ? 'On Track' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
