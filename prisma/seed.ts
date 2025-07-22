import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create cameras matching the design
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: "01",
        location: "Shop Floor Camera A",
      },
    }),
    prisma.camera.create({
      data: {
        name: "02",
        location: "Shop Floor Camera B",
      },
    }),
    prisma.camera.create({
      data: {
        name: "03",
        location: "Entrance Camera",
      },
    }),
  ])

  // Create incidents matching the design timeline
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const incidentData = [
    // Camera 01 incidents
    { camera: cameras[0], type: "Unauthorised Access", hour: 14, minute: 35, duration: 2 },
    { camera: cameras[0], type: "Gun Threat", hour: 14, minute: 37, duration: 3 },
    { camera: cameras[0], type: "Unauthorised Access", hour: 14, minute: 40, duration: 2 },
    { camera: cameras[0], type: "Unauthorised Access", hour: 14, minute: 43, duration: 2 },
    { camera: cameras[0], type: "Unauthorised Access", hour: 14, minute: 45, duration: 2 },

    // Camera 02 incidents
    { camera: cameras[1], type: "Unauthorised Access", hour: 8, minute: 15, duration: 3 },
    { camera: cameras[1], type: "Face Recognised", hour: 12, minute: 30, duration: 1 },
    { camera: cameras[1], type: "Unauthorised Access", hour: 16, minute: 20, duration: 2 },

    // Camera 03 incidents
    { camera: cameras[2], type: "Face Recognised", hour: 9, minute: 45, duration: 1 },
    { camera: cameras[2], type: "Traffic congestion", hour: 11, minute: 0, duration: 5 },
    { camera: cameras[2], type: "Gun Threat", hour: 18, minute: 30, duration: 4 },
    { camera: cameras[2], type: "Unauthorised Access", hour: 20, minute: 15, duration: 2 },
  ]

  for (const incident of incidentData) {
    const startTime = new Date(today)
    startTime.setHours(incident.hour, incident.minute, 0, 0)

    const endTime = new Date(startTime.getTime() + incident.duration * 60 * 1000)

    await prisma.incident.create({
      data: {
        cameraId: incident.camera.id,
        type: incident.type,
        tsStart: startTime,
        tsEnd: endTime,
        thumbnailUrl: `/placeholder.svg?height=120&width=200&query=${encodeURIComponent(`${incident.type} security camera footage`)}`,
        resolved: Math.random() > 0.8, // 20% chance of being resolved
      },
    })
  }

  console.log("Database seeded successfully!")
  console.log(`Created ${cameras.length} cameras and ${incidentData.length} incidents`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
