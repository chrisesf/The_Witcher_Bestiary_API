export type CategoryRequestBody = {
  id: string
  name: string
  description: string
}

export type CreatureRequestBody = {
  id: string
  name: string
  description: string
  image: string
  category_id: string
}
