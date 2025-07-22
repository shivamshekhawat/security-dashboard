"use client"

import { Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Camera as CameraType, Incident } from "@/types"

interface TimelineSectionProps {
  cameras: CameraType[]
  incidents: Incident[]
  selectedIncident: Incident | null
  onIncidentSelect: (incident: Incident) => void
  currentTime: string
}

export function TimelineSection({
  cameras,
  incidents,
  selectedIncident,
  onIncidentSelect,
  currentTime,
}: TimelineSectionProps) {
  // Generate 24-hour timeline
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getThreatColor = (type: string) => {
    switch (type) {
      case "Gun Threat":
        return "bg-red-600"
      case "Unauthorised Access":
        return "bg-orange-600"
      case "Face Recognised":
        return "bg-blue-600"
      case "Traffic congestion":
        return "bg-teal-600"
      case "Suspicious Activity":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const getIncidentPosition = (timestamp: string) => {
    const date = new Date(timestamp)
    const hour = date.getHours()
    const minute = date.getMinutes()
    return ((hour * 60 + minute) / (24 * 60)) * 100
  }

  const formatTime = (hour: number) => {
    return `${hour.toString().padStart(2, "0")}:00`
  }

  // Group incidents by camera
  const incidentsByCamera = cameras.reduce(
    (acc, camera) => {
      acc[camera.id] = incidents.filter((incident) => incident.cameraId === camera.id)
      return acc
    },
    {} as Record<string, Incident[]>,
  )

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Timeline Header */}
      <div className="flex border-b border-gray-700">
        {/* Camera List Header */}
        <div className="w-48 p-3 border-r border-gray-700 bg-gray-800">
          <h3 className="text-white font-medium">Camera List</h3>
        </div>

        {/* Timeline Hours */}
        <div className="flex-1 relative">
          <div className="flex h-12 border-b border-gray-700">
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex-1 border-r border-gray-700 last:border-r-0 flex items-center justify-center text-xs text-gray-400"
              >
                {formatTime(hour)}
              </div>
            ))}
          </div>

          {/* Current Time Indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-yellow-500 z-10"
            style={{ left: `${((new Date().getHours() * 60 + new Date().getMinutes()) / (24 * 60)) * 100}%` }}
          >
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 flex">
        {/* Camera List */}
        <div className="w-48 border-r border-gray-700 bg-gray-800">
          {cameras.map((camera, index) => (
            <div
              key={camera.id}
              className="h-16 border-b border-gray-700 last:border-b-0 flex items-center px-3 hover:bg-gray-750 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Home className="h-4 w-4 text-gray-400" />
                <span className="text-white text-sm">Camera - {String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Grid */}
        <div className="flex-1 relative">
          {/* Hour Grid Lines */}
          <div className="absolute inset-0 flex">
            {hours.map((hour) => (
              <div key={hour} className="flex-1 border-r border-gray-700 last:border-r-0" />
            ))}
          </div>

          {/* Camera Rows */}
          {cameras.map((camera, cameraIndex) => (
            <div key={camera.id} className="h-16 border-b border-gray-700 last:border-b-0 relative">
              {/* Incidents for this camera */}
              {incidentsByCamera[camera.id]?.map((incident) => (
                <div
                  key={incident.id}
                  className={`absolute top-2 h-12 cursor-pointer transition-all hover:scale-105 ${
                    selectedIncident?.id === incident.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{
                    left: `${getIncidentPosition(incident.tsStart)}%`,
                    width: "60px",
                  }}
                  onClick={() => onIncidentSelect(incident)}
                >
                  <Badge
                    className={`${getThreatColor(incident.type)} text-white text-xs px-2 py-1 w-full justify-center`}
                  >
                    {incident.type === "Unauthorised Access"
                      ? "Unauthorised Access"
                      : incident.type === "Face Recognised"
                        ? "Face Recognised"
                        : incident.type === "Gun Threat"
                          ? "Gun Threat"
                          : incident.type === "Traffic congestion"
                            ? "Traffic congestion"
                            : incident.type}
                  </Badge>

                  {/* Multiple events indicator */}
                  {incidentsByCamera[camera.id]?.filter(
                    (i) => Math.abs(new Date(i.tsStart).getTime() - new Date(incident.tsStart).getTime()) < 300000,
                  ).length > 1 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center text-xs text-white border border-gray-600">
                      {
                        incidentsByCamera[camera.id]?.filter(
                          (i) =>
                            Math.abs(new Date(i.tsStart).getTime() - new Date(incident.tsStart).getTime()) < 300000,
                        ).length
                      }
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Current Time Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-yellow-500 z-20"
            style={{ left: `${((new Date().getHours() * 60 + new Date().getMinutes()) / (24 * 60)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
