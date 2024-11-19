
export interface MovieRating {
  source: string
  vote_average: number
  vote_count: number
}

export interface Movie {
  id: number
  tmdb_id: number
  imdb_id: number
  ru_title: string
  en_title: string
  original_title: string
  description: string
  image_path: string
  release_date: string
  duration: number
  ratings: MovieRating[]
  countries: string[]
  directors: string[]
  genres: string[]
}
