export type Bookmark = {
  id: string
  url: string
  title: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export type BookmarkInsert = Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt' | 'userId'>


