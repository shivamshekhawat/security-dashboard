"use client"

import { CheckCircle, AlertTriangle, Camera, Clock, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Incident } from "@/types"

interface IncidentListProps {
  incidents: Incident[]
  selectedIncident: Incident | null
  onIncidentSelect: (incident: Incident) => void
  onIncidentResolve: (incidentId: string) => void
  loading: boolean
}

export function IncidentList({
  incidents,
  selectedIncident,
  onIncidentSelect,
  onIncidentResolve,
  loading,
}: IncidentListProps) {
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

  if (loading) {
    return (
      <div className="h-full bg-gray-800 p-4">
        <h3 className="text-lg font-semibold mb-4 text-white">Incidents</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-3 bg-gray-700 border-gray-600 animate-pulse">
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded w-3/4"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Incidents ({incidents.length})</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {incidents.length === 0 ? (
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
                    ? "bg-blue-900 border-blue-600"
                    : incident.resolved
                      ? "bg-gray-700 border-gray-600 opacity-75"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-650"
                }`}
                onClick={() => onIncidentSelect(incident)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {incident.resolved ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    <Badge className={`${getThreatColor(incident.type)} text-white text-xs`}>{incident.type}</Badge>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!incident.resolved && (
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onIncidentResolve(incident.id)
                          }}
                        >
                          Mark as Resolved
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-sm text-gray-300">
                    <Camera className="h-3 w-3" />
                    <span>{incident.camera.name}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(incident.tsStart)}</span>
                  </div>

                  <div className="text-xs text-gray-500">{incident.camera.location}</div>
                </div>

                {/* Thumbnail */}
                <div className="mt-2">
                  <img
                    src={incident.thumbnailUrl || "/placeholder.svg"}
                    alt={`${incident.type} thumbnail`}
                    className="w-full h-16 object-cover rounded border border-gray-600"
                  />
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
