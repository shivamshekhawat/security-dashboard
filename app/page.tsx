"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { MainVideoPlayer } from "@/components/main-video-player"
import { IncidentSidebar } from "@/components/incident-sidebar"
import { TimelineSection } from "@/components/timeline-section"
import type { Incident, Camera } from "@/types"

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [cameras, setCameras] = useState<Camera[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState("03:12:37")
  const [currentDate] = useState("05-Jun-2025")

  const fetchData = async () => {
    try {
      const [incidentsRes, camerasRes] = await Promise.all([
        fetch("/api/incidents?resolved=false"),
        fetch("/api/cameras"),
      ])

      const incidentsData = await incidentsRes.json()
      const camerasData = await camerasRes.json()

      setIncidents(incidentsData)
      setCameras(camerasData)

      if (camerasData.length > 0) {
        setSelectedCamera(camerasData[0])
      }

      if (incidentsData.length > 0) {
        setSelectedIncident(incidentsData[0])
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toTimeString().slice(0, 8))
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [])

  const handleIncidentResolve = async (incidentId: string) => {
    try {
      await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: "PATCH",
      })
      await fetchData()
    } catch (error) {
      console.error("Failed to resolve incident:", error)
    }
  }

  const handleCameraSelect = (camera: Camera) => {
    setSelectedCamera(camera)
  }

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident)
    setSelectedCamera(incident.camera)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1 h-[calc(100vh-80px)] bg-gray-900">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player and Incident List */}
          <div className="flex flex-1">
            {/* Main Video Player */}
            <div className="flex-1 p-4">
              <MainVideoPlayer
                camera={selectedCamera}
                incident={selectedIncident}
                cameras={cameras}
                currentTime={currentTime}
                currentDate={currentDate}
                onCameraSelect={handleCameraSelect}
              />
            </div>

            {/* Incident Sidebar */}
            <div className="w-80">
              <IncidentSidebar
                incidents={incidents}
                selectedIncident={selectedIncident}
                onIncidentSelect={handleIncidentSelect}
                onIncidentResolve={handleIncidentResolve}
                loading={loading}
              />
            </div>
          </div>

          {/* Timeline Section */}
          <div className="h-64 border-t border-gray-700">
            <TimelineSection
              cameras={cameras}
              incidents={incidents}
              selectedIncident={selectedIncident}
              onIncidentSelect={handleIncidentSelect}
              currentTime={currentTime}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
