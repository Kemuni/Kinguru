
export const baseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL! + "/api";

export enum APIEndpointsUrls {
  RandomMovies = "movies/random",
  RecommendationMovies = "movies/recommendations",
  MoviePoster = "movies/poster",
  Movies = "movies",
}