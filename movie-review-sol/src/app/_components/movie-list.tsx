"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "@/types/movie";
import { MovieCoordinator } from "@/types/movie-coordinator";
import { useConnection } from "@solana/wallet-adapter-react";
import { FC, useEffect, useState } from "react";

interface MovieListProps {}

const MovieList: FC<MovieListProps> = ({}) => {
  const { connection } = useConnection();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const newMovies = await MovieCoordinator.fetchPage(connection, page, 12);
      setMovies(newMovies);
    };

    fetchMovies();
  }, [connection, page]);

  return (
    <div className="space-y-4">
      <div className="flex gap-x-2">
        <h1 className="text-2xl mr-auto font-semibold">Movies</h1>
        <Button onClick={() => setPage(page - 1)} variant="outline">
          Previous
        </Button>
        <Button onClick={() => setPage(page + 1)} variant="outline">
          Next
        </Button>
      </div>
      <div className="grid grid-cols-3 w-full gap-2">
        {movies.map((movie, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{movie.title}</CardTitle>
              <CardDescription>{movie.rating}/5</CardDescription>
            </CardHeader>
            <CardContent>{movie.description}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
