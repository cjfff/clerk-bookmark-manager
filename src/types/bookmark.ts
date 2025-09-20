export type Bookmark = {
  id: string
  url: string
  title: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface BookmarkInsert extends Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt' | 'userId'> {}


