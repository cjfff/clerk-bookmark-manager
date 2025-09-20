// lib/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { insertBookmark, deleteBookmark } from "@/lib/bookmark-utils";
import { BookmarkInsert } from "@/types/bookmark";
import { revalidatePath } from "next/cache";

export async function createBookmark(data: BookmarkInsert) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await insertBookmark(userId, data);
    revalidatePath("/");
}

export async function removeBookmark(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await deleteBookmark(userId, id);
    revalidatePath("/");
}