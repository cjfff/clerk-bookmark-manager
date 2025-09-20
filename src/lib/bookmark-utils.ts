import { BookmarkInsert } from "@/types/bookmark"
import { PrismaClient } from "@/generated/prisma"

const prisma = new PrismaClient()

export const insertBookmark = async (userId: string, bookmark: BookmarkInsert) => {

    const data = await prisma.bookmark.create({ data: { userId, ...bookmark} })

    return data
}

export const getBookmarksByUserId = async (userId: string) => {
    const bookmarks = await prisma.bookmark.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
    return bookmarks
}

export const deleteBookmark = async (userId: string, id: string) => {
    try {
        const bookmark = await prisma.bookmark.findUnique({ where: { id, userId } })
        if (!bookmark) return false
        await prisma.bookmark.delete({ where: { id, userId } })
        return true
    } catch (error: unknown) {
        console.error(error)
        throw new Error("Failed to delete bookmark")
    }
}
