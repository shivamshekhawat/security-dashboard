import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const incident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
      include: {
        camera: true,
      },
    })

    return NextResponse.json(incident)
  } catch (error) {
    console.error("Error resolving incident:", error)
    return NextResponse.json({ error: "Failed to resolve incident" }, { status: 500 })
  }
}
