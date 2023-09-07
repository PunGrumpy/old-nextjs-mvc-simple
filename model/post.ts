type Post = {
  id: number
  createdAt: Date
  updatedAt: Date
  title?: string
  content?: string
  published: boolean
  viewCount: number
  author: User
  authorId: number
}
