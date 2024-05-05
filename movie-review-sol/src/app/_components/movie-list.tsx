"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "@/types/movie";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

interface MovieListProps {}

const MovieList: FC<MovieListProps> = ({}) => {
  const { connection } = useConnection();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const programDataAccounts = await connection.getProgramAccounts(
        new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
      );
      console.log("[INFO] Program data accounts:", programDataAccounts.length);
      setMovies(
        programDataAccounts
          .map(({ account }) => Movie.deserialize(account.data))
          .filter((movie) => movie !== null) as Movie[]
      );
    };

    fetchMovies();
  }, [connection]);

  return (
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
  );
};

export default MovieList;
