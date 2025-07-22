"use client"

import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import type { Camera, Incident } from "@/types"

interface MainVideoPlayerProps {
  camera: Camera | null
  incident: Incident | null
  cameras: Camera[]
  currentTime: string
  currentDate: string
  onCameraSelect: (camera: Camera) => void
}

export function MainVideoPlayer({
  camera,
  incident,
  cameras,
  currentTime,
  currentDate,
  onCameraSelect,
}: MainVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState([45])

  const getMainCameraImage = () => {
    if (camera) {
      return `/images/security-camera-${camera.name}.jpg`
    }
    return "/images/security-camera-1.png"
  }

  return (
    <div className="h-full flex flex-col">
      {/* Main Video Display */}
      <div className="flex-1 relative bg-black rounded-lg overflow-hidden min-h-[400px]">
        {/* Video Content */}
        <div className="absolute inset-0">
          <img
            src={getMainCameraImage() || "/placeholder.svg"}
            alt="Security Camera Feed"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/images/security-camera-1.png"
            }}
          />
        </div>

        {/* Camera Label */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black bg-opacity-80 px-3 py-2 rounded flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-sm">
              {camera ? `Camera - ${camera.name.padStart(2, "0")}` : "Camera - 01"}
            </span>
          </div>
        </div>

        {/* Timestamp */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black bg-opacity-80 px-3 py-2 rounded">
            <span className="text-white font-mono text-sm">
              {currentDate} - {currentTime}
            </span>
          </div>
        </div>

        {/* Multi-Camera Thumbnails */}
        <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
          {cameras.slice(1, 3).map((cam, index) => (
            <div
              key={cam.id}
              className="relative w-28 h-20 bg-gray-800 rounded border-2 border-gray-600 cursor-pointer hover:border-blue-500 transition-colors overflow-hidden"
              onClick={() => onCameraSelect(cam)}
            >
              <img
                src={`/images/security-camera-${index + 2}.jpg`}
                alt={`Camera ${index + 2}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/images/security-camera-1.png"
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-xs text-white text-center py-1">
                Camera - {String(index + 2).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Controls */}
      <div className="bg-gray-800 p-4 rounded-b-lg border-t border-gray-700">
        <div className="flex items-center space-x-4 mb-3">
          <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:bg-gray-700"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
            <SkipForward className="h-4 w-4" />
          </Button>

          <div className="flex-1 mx-4">
            <Slider value={progress} onValueChange={setProgress} max={100} step={1} className="w-full" />
          </div>

          <div className="text-sm text-gray-300 font-mono min-w-[140px]">
            {currentTime} ({currentDate})
          </div>

          <div className="text-xs text-gray-400 px-2">1x</div>

          <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
            <Volume2 className="h-4 w-4" />
          </Button>

          <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
