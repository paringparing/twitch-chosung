export type Word = { word: string; hint: string; category?: string }

export type WordSet = { words: Word[]; title: string }

export type Category = {
  words: Word[]
  title: string
  id: string
  description?: string
}
