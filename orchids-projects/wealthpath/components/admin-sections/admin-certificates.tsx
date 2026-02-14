'use client'

import { Card } from '@/components/ui/card'
import { Award, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminCertificates() {
  const certificates = [
    { id: 1, student: 'John Doe', course: 'Freelancing 101', issueDate: '2024-02-10', status: 'issued' },
    { id: 2, student: 'Jane Smith', course: 'Stock Market Investing', issueDate: '2024-02-09', status: 'issued' },
    { id: 3, student: 'Mike Johnson', course: 'Dropshipping Basics', issueDate: '2024-02-08', status: 'issued' },
    { id: 4, student: 'Sarah Connor', course: 'Passive Income Streams', issueDate: '2024-02-07', status: 'pending' },
    { id: 5, student: 'Alex Brown', course: 'Digital Marketing Mastery', issueDate: '2024-02-06', status: 'issued' },
  ]

  const stats = {
    issued: certificates.filter(c => c.status === 'issued').length,
    pending: certificates.filter(c => c.status === 'pending').length,
    totalStudents: certificates.length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Certificate Management</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Issue and manage course completion certificates
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Issued Certificates</p>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.issued}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pending Issue</p>
          <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Certificates</p>
          <p className="mt-2 text-3xl font-bold">{stats.totalStudents}</p>
        </Card>
      </div>

      {/* Certificates Table */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Award className="h-5 w-5" />
            Certificates
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Course</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Issue Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-medium text-sm">{cert.student}</td>
                  <td className="px-6 py-4 text-sm">{cert.course}</td>
                  <td className="px-6 py-4 text-sm">{cert.issueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      cert.status === 'issued'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {cert.status === 'issued' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                    {cert.status === 'pending' && (
                      <Button size="sm">Issue</Button>
                    )}
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
