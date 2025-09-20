import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import * as z from "zod"
import { deleteBookmark } from "@/lib/bookmark-utils"


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const deleted = await deleteBookmark(userId, id)
        return NextResponse.json(deleted)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to delete bookmark" }, { status: 500 })
    }
}