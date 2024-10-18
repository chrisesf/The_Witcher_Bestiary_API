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

export type ItensRequestBody = {
  id: string
  name: string
  description: string
  item_type: string
  image: string
}

export type LocationsRequestBody = {
  id: string
  name: string
  description: string
}
