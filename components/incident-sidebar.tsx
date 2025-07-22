"use client"

import { AlertTriangle, Clock, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Incident } from "@/types"

interface IncidentSidebarProps {
  incidents: Incident[]
  selectedIncident: Incident | null
  onIncidentSelect: (incident: Incident) => void
  onIncidentResolve: (incidentId: string) => void
  loading: boolean
}

export function IncidentSidebar({
  incidents,
  selectedIncident,
  onIncidentSelect,
  onIncidentResolve,
  loading,
}: IncidentSidebarProps) {
  const getThreatColor = (type: string) => {
    switch (type) {
      case "Gun Threat":
        return "bg-red-600 text-white"
      case "Unauthorised Access":
        return "bg-orange-600 text-white"
      case "Face Recognised":
        return "bg-blue-600 text-white"
      case "Suspicious Activity":
        return "bg-purple-600 text-white"
      case "Traffic congestion":
        return "bg-teal-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getIncidentThumbnail = (incident: Incident) => {
    const thumbnailMap: { [key: string]: string } = {
      "Gun Threat": "/images/incident-thumbnail-2.png",
      "Unauthorised Access": "/images/incident-thumbnail-1.png",
      "Face Recognised": "/images/incident-thumbnail-3.png",
      "Suspicious Activity": "/images/incident-thumbnail-1.png",
      "Traffic congestion": "/images/incident-thumbnail-1.png",
    }

    return thumbnailMap[incident.type] || "/images/incident-thumbnail-1.png"
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatTimeRange = (start: string, end: string) => {
    return `${formatTime(start)}-${formatTime(end)}`
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const unresolvedCount = incidents.filter((i) => !i.resolved).length
  const resolvedCount = incidents.filter((i) => i.resolved).length

  return (
    <div className="h-full bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <span className="text-xl font-bold text-white">{unresolvedCount} Unresolved Incidents</span>
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">{unresolvedCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">{resolvedCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">{resolvedCount} resolved incidents</span>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <Card key={i} className="p-3 bg-gray-700 border-gray-600 animate-pulse">
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-3/4"></div>
              </Card>
            ))
          ) : incidents.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No incidents found</p>
            </div>
          ) : (
            incidents.map((incident) => (
              <Card
                key={incident.id}
                className={`p-3 cursor-pointer transition-all border ${
                  selectedIncident?.id === incident.id
                    ? "bg-gray-700 border-blue-500"
                    : "bg-gray-750 border-gray-600 hover:bg-gray-700"
                }`}
                onClick={() => onIncidentSelect(incident)}
              >
                {/* Incident Header */}
                <div className="flex items-start justify-between mb-3">
                  <Badge className={`${getThreatColor(incident.type)} text-xs font-medium`}>{incident.type}</Badge>

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs bg-yellow-600 border-yellow-600 text-white hover:bg-yellow-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      onIncidentResolve(incident.id)
                    }}
                  >
                    Resolve
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>

                {/* Incident Thumbnail */}
                <div className="mb-3">
                  <img
                    src={getIncidentThumbnail(incident) || "/placeholder.svg"}
                    alt={`${incident.type} thumbnail`}
                    className="w-full h-16 object-cover rounded border border-gray-600"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/images/incident-thumbnail-1.png"
                    }}
                  />
                </div>

                {/* Incident Details */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-sm text-gray-300">
                    <MapPin className="h-3 w-3" />
                    <span>{incident.camera.location || incident.camera.name}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>
                      {formatTimeRange(incident.tsStart, incident.tsEnd)} on {formatDate(incident.tsStart)}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
