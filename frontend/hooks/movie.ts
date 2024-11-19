import {useEffect, useState} from "react";
import {APIEndpointsUrls, baseURL} from "@/services/api-urls";
import axios from "axios";
import {Movie} from "@/types/Movie";



interface MoviesItemsResponse {
  items: Movie[]
}


export const useGetRandomMovieListItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<MoviesItemsResponse>(
        `${baseURL}/${APIEndpointsUrls.RandomMovies}/`, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000
        }
      )
      .then(({ data }) => {
        setIsLoading(false);
        setMovies(data.items);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        console.log(e);
      });
  }, []);

  return { movies, isLoading, error };
}


export const useGetRecommendationMovieListItems = (likedMovies: number[], dislikedMovies: number[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post<MoviesItemsResponse>(
        `${baseURL}/${APIEndpointsUrls.RecommendationMovies}/`,
        {
          liked_movies: likedMovies,
          disliked_movies: dislikedMovies,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000
        }
      )
      .then(({ data }) => {
        setIsLoading(false);
        setMovies(data.items);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        console.log(e);
      });
  }, []);

  return { movies, isLoading, error };
}
