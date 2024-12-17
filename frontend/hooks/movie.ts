import {useEffect, useState} from "react";
import {APIEndpointsUrls, baseURL} from "@/services/api-urls";
import axios from "axios";
import {Movie} from "@/types/Movie";



interface MoviesItemsResponse {
  items: Movie[]
}

interface PagerResponse {
  total_elements: number,
  currentPage: number,
  page_size: number,
  pages_count: number;
}

interface MoviesPaginatedItemsResponse {
  items: Movie[],
  pager: PagerResponse;
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

export const useGetMovieById = (id: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<Movie>(
        `${baseURL}/movies/${id}/`, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000
        }
      )
      .then(({ data }) => {
        setIsLoading(false);
        setMovie(data);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        console.log(e);
      });
  }, []);

  return { movie, isLoading, error };
}


export const useGetMovieAndPagesListItems = (currentPage: number) =>{
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<MoviesPaginatedItemsResponse | undefined>(undefined);
  const [page, setPage] = useState<number>(currentPage);


  useEffect(() => {
    setIsLoading(true);
    axios
      .get<MoviesPaginatedItemsResponse>(
        `${baseURL}/${APIEndpointsUrls.Movies}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000,
          params: {page: page}
        }
      )
      .then(({ data }) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        console.log(e);
      });
  }, [page]);

  return { data, setPage, page, isLoading, error };
}
