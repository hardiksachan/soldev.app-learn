import { FC } from "react";
import { AddReviewForm } from "./_components/add-review-form";
import MovieList from "./_components/movie-list";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="flex flex-col items-center py-12 px-12 gap-y-2">
      <AddReviewForm />
      <MovieList />
    </main>
  );
};

export default page;
