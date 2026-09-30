export type Category = 'Hats' | 'Plushies' | 'Scarves' | 'More'

export interface Product {
  id: string
  name: string
  meta: string
  price: number
  cat: Category
  tag?: string
}

export const products: Product[] = [
  { id: 'p1', name: 'Froggy Bucket Hat', meta: 'Hats · Moss green', price: 38, cat: 'Hats', tag: 'Bestseller' },
  { id: 'p2', name: 'Pond Pal Frog Plushie', meta: 'Plushies · 8 in', price: 32, cat: 'Plushies', tag: 'Fan favorite' },
  { id: 'p3', name: 'Lily Pad Chunky Scarf', meta: 'Scarves · 60 in', price: 46, cat: 'Scarves' },
  { id: 'p4', name: 'Strawberry Beanie', meta: 'Hats · Pink & red', price: 30, cat: 'Hats', tag: 'New' },
  { id: 'p5', name: 'Sleepy Mushroom Buddy', meta: 'Plushies · 6 in', price: 26, cat: 'Plushies' },
  { id: 'p6', name: 'Clover Striped Scarf', meta: 'Scarves · 54 in', price: 42, cat: 'Scarves', tag: 'New' },
  { id: 'p7', name: 'Tiny Tadpole Keychain', meta: 'And more · 3 in', price: 12, cat: 'More' },
  { id: 'p8', name: 'Grotto Tote Bag', meta: 'And more · Market size', price: 36, cat: 'More' },
]

export const categories = [
  { name: 'Hats', color: 'pink', placeholder: 'Hats photo' },
  { name: 'Plushies', color: 'green', placeholder: 'Plushies photo' },
  { name: 'Scarves', color: 'yellow', placeholder: 'Scarves photo' },
  { name: 'And more!', color: 'purple', placeholder: 'Bags, keychains…' },
] as const

export const filters = ['All', 'Hats', 'Plushies', 'Scarves', 'More'] as const
export type Filter = (typeof filters)[number]
