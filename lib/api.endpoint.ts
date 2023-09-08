type APIEndpoints = {
  category?: string
  method: string
  path: string
  description: string
  response: string
}

export const apiEndpoints: APIEndpoints[] = [
  {
    category: 'User',
    method: 'GET',
    path: '/api/user',
    description: 'Get all users',
    response: 'Array of users'
  },
  {
    category: 'User',
    method: 'GET',
    path: '/api/user/:id',
    description: 'Get user by id',
    response: 'User'
  },
  {
    category: 'User',
    method: 'POST',
    path: '/api/user',
    description: 'Create a new user',
    response: 'User'
  },
  {
    category: 'User',
    method: 'PUT',
    path: '/api/user/:id',
    description: 'Update user by id',
    response: 'User'
  },
  {
    category: 'User',
    method: 'DELETE',
    path: '/api/user/:id',
    description: 'Delete user by id',
    response: 'User'
  },
  {
    category: 'Post',
    method: 'GET',
    path: '/api/post',
    description: 'Get all posts',
    response: 'Array of posts'
  },
  {
    category: 'Post',
    method: 'GET',
    path: '/api/post/:id',
    description: 'Get post by id',
    response: 'Post'
  },
  {
    category: 'Post',
    method: 'POST',
    path: '/api/post',
    description: 'Create a new post',
    response: 'Post'
  },
  {
    category: 'Post',
    method: 'PUT',
    path: '/api/post/:id',
    description: 'Update post by id',
    response: 'Post'
  },
  {
    category: 'Post',
    method: 'DELETE',
    path: '/api/post/:id',
    description: 'Delete post by id',
    response: 'Post'
  }
]
