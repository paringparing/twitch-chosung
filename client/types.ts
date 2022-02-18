export type Word = { word: string; hint: string; category?: string }

export type Category = { words: Word[]; title: string; id: string }
