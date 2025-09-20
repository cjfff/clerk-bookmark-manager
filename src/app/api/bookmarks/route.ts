import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import * as z from "zod"
import { insertBookmark, getBookmarksByUserId } from "@/lib/bookmark-utils"



const validatedBookmarkSchema = z.object({
    url: z.string().url(),
    title: z.string(),
    notes: z.string().optional(),

})


export async function POST(request: NextRequest) {
    const bookmarkData = await request.json()

    try {
        const validatedBookmark = validatedBookmarkSchema.parse(bookmarkData)
        const { url, title, notes } = validatedBookmark

        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const bookmark = await insertBookmark(userId, { url, title, notes })
        return NextResponse.json(bookmark)
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error(error.issues)
            return NextResponse.json({ error: "Invalid bookmark data" }, { status: 400 })
        }
        console.error(error)
        return NextResponse.json({ error: "Failed to create bookmark" }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const bookmarks = await getBookmarksByUserId(userId)
        return NextResponse.json(bookmarks)

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to get bookmarks" }, { status: 500 })
    }
}