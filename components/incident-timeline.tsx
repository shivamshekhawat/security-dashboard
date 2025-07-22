"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Incident } from "@/types"

interface IncidentTimelineProps {
  incidents: Incident[]
  selectedIncident: Incident | null
  onIncidentSelect: (incident: Incident) => void
}

export function IncidentTimeline({ incidents, selectedIncident, onIncidentSelect }: IncidentTimelineProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getThreatColor = (type: string) => {
    switch (type) {
      case "Gun Threat":
        return "bg-red-600"
      case "Unauthorised Access":
        return "bg-orange-600"
      case "Face Recognised":
        return "bg-yellow-600"
      case "Suspicious Activity":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Group incidents by hour for timeline view
  const groupedIncidents = incidents.reduce(
    (acc, incident) => {
      const hour = new Date(incident.tsStart).getHours()
      if (!acc[hour]) acc[hour] = []
      acc[hour].push(incident)
      return acc
    },
    {} as Record<number, Incident[]>,
  )

  if (!isExpanded) {
    return (
      <div className="bg-gray-800 border-t border-gray-700 p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="w-full text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <ChevronUp className="h-4 w-4 mr-2" />
          Show Timeline
        </Button>
      </div>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700 border-t-0 rounded-t-none">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-white">24-Hour Timeline</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="text-gray-400 hover:text-white"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>

          <div className="space-y-4">
            {Object.entries(groupedIncidents)
              .sort(([a], [b]) => Number.parseInt(b) - Number.parseInt(a))
              .map(([hour, hourIncidents]) => (
                <div key={hour} className="relative">
                  {/* Hour marker */}
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600 relative z-10">
                      <span className="text-xs font-medium text-white">{hour.padStart(2, "0")}</span>
                    </div>
                    <div className="ml-3 text-sm text-gray-400">
                      {hour}:00 - {Number.parseInt(hour) + 1}:00
                    </div>
                  </div>

                  {/* Incidents for this hour */}
                  <div className="ml-11 space-y-2">
                    {hourIncidents.map((incident) => (
                      <div
                        key={incident.id}
                        className={`p-2 rounded cursor-pointer transition-all ${
                          selectedIncident?.id === incident.id
                            ? "bg-blue-900 border border-blue-600"
                            : "bg-gray-700 hover:bg-gray-650"
                        }`}
                        onClick={() => onIncidentSelect(incident)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getThreatColor(incident.type)} text-white text-xs`}>
                              {incident.type}
                            </Badge>
                            <span className="text-sm text-gray-300">{incident.camera.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">{formatTime(incident.tsStart)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
