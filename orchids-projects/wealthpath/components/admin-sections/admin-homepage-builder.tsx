'use client'

import { useEffect, useState, useTransition } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Eye, EyeOff, Settings, RefreshCw, ExternalLink } from 'lucide-react'
import { getHomepageSections } from '@/app/actions/homepage'
import { updateSectionEnabled, updateSectionOrder } from '@/app/actions/homepage'
import type { HomepageSection } from '@/lib/db/schema'

function SortableRow({
  section,
  onToggle,
}: {
  section: HomepageSection
  onToggle: (id: string, enabled: boolean) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-xl border border-border/50 bg-card px-4 py-3 shadow-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <span className="w-6 text-xs font-mono text-muted-foreground/50">{section.sectionOrder}</span>

      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{section.label}</p>
        <p className="text-xs text-muted-foreground">{section.key}</p>
      </div>

      {section.scheduledAt && (
        <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-500">
          Scheduled
        </span>
      )}

      <button
        onClick={() => onToggle(section.id, !section.enabled)}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
          section.enabled
            ? 'bg-teal/10 text-teal hover:bg-teal/20'
            : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
        }`}
      >
        {section.enabled ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        {section.enabled ? 'Live' : 'Hidden'}
      </button>
    </div>
  )
}

export default function AdminHomepageBuilder() {
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, startSave] = useTransition()

  const load = async () => {
    setLoading(true)
    const data = await getHomepageSections()
    setSections(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sections.findIndex((s) => s.id === active.id)
    const newIndex = sections.findIndex((s) => s.id === over.id)
    const reordered = arrayMove(sections, oldIndex, newIndex).map((s, i) => ({
      ...s,
      sectionOrder: i + 1,
    }))
    setSections(reordered)
    startSave(async () => {
      await updateSectionOrder(reordered.map((s) => ({ id: s.id, order: s.sectionOrder })))
    })
  }

  const handleToggle = (id: string, enabled: boolean) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, enabled } : s)))
    startSave(async () => {
      await updateSectionEnabled(id, enabled)
    })
  }

  const liveCount = sections.filter((s) => s.enabled).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Homepage Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag to reorder sections. Toggle visibility on or off. Changes apply instantly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saving && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <RefreshCw className="h-3 w-3 animate-spin" /> Saving...
            </span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Preview
          </a>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Sections', value: sections.length },
          { label: 'Live', value: liveCount },
          { label: 'Hidden', value: sections.length - liveCount },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border/50 bg-card p-4">
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {sections.map((section) => (
                <SortableRow key={section.id} section={section} onToggle={handleToggle} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
