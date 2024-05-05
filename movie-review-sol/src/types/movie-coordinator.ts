import { Connection, PublicKey } from "@solana/web3.js";
import { Movie } from "./movie";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

export class MovieCoordinator {
  static accounts: PublicKey[] = [];

  static async prefetchAccounts(connection: Connection) {
    const accounts = await connection.getProgramAccounts(
      new PublicKey(MOVIE_REVIEW_PROGRAM_ID),
      {
        dataSlice: { offset: 2, length: 18 },
      }
    );

    this.accounts = accounts
      .filter(({ account }) => account.data.length > 4)
      .toSorted((a, b) => {
        const lengthA = a.account.data.readUInt32LE(0);
        const lengthB = b.account.data.readUInt32LE(0);
        const dataA = a.account.data.slice(4, 4 + lengthA);
        const dataB = b.account.data.slice(4, 4 + lengthB);
        return dataA.compare(dataB);
      })
      .map(({ pubkey }) => pubkey);
  }

  static async fetchPage(
    connection: Connection,
    page: number,
    perPage: number
  ): Promise<Movie[]> {
    if (this.accounts.length === 0) {
      await this.prefetchAccounts(connection);
    }

    const paginatedPublicKeys = this.accounts.slice(
      (page - 1) * perPage,
      page * perPage
    );

    if (paginatedPublicKeys.length === 0) {
      return [];
    }

    const accounts = await connection.getMultipleAccountsInfo(
      paginatedPublicKeys
    );

    const movies = accounts.reduce((movies: Movie[], account) => {
      const movie = Movie.deserialize(account?.data);
      if (!movie) {
        return movies;
      }

      return [...movies, movie];
    }, []);

    return movies;
  }
}
