export type User = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export type Repository = {
  id: string
  name: string
  description?: string | null
  url: string
  owner: string
}

export type Readme = {
  id: string
  title: string
  content: string
  repositoryId: string
}

export type Notification = {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}
