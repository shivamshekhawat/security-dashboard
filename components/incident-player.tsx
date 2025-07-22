"use client"

import { Play, Pause, Volume2, Maximize, AlertTriangle, Camera, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import type { Incident } from "@/types"

interface IncidentPlayerProps {
  incident: Incident | null
  loading: boolean
}

export function IncidentPlayer({ incident, loading }: IncidentPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState([0])

  if (loading) {
    return (
      <Card className="h-full bg-gray-800 border-gray-700 flex items-center justify-center">
        <div className="text-gray-400">Loading incident data...</div>
      </Card>
    )
  }

  if (!incident) {
    return (
      <Card className="h-full bg-gray-800 border-gray-700 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>No incident selected</p>
          <p className="text-sm mt-2">Select an incident from the list to view details</p>
        </div>
      </Card>
    )
  }

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

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <Card className="h-full bg-gray-800 border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-white">Incident Playback</h2>
          </div>
          <Badge className={`${getThreatColor(incident.type)} text-white`}>{incident.type}</Badge>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Camera className="h-4 w-4" />
            <span>{incident.camera.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{incident.camera.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatTimestamp(incident.tsStart)}</span>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 relative bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={incident.thumbnailUrl || "/placeholder.svg"}
            alt={`${incident.type} incident`}
            className="max-w-full max-h-full object-contain"
          />

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full w-16 h-16"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-4 mb-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:bg-gray-700"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <div className="flex-1">
            <Slider value={progress} onValueChange={setProgress} max={100} step={1} className="w-full" />
          </div>

          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-gray-400 text-center">
          Duration:{" "}
          {new Date(new Date(incident.tsEnd).getTime() - new Date(incident.tsStart).getTime())
            .toISOString()
            .substr(11, 8)}
        </div>
      </div>
    </Card>
  )
}
