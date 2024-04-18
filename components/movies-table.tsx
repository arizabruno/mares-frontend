'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react';
import MovieDetails from '../interfaces/MovieDetails';
import Image from 'next/image';
import { formatImdbId } from '../utils/helpers';
import { useState } from 'react';

const BASE_MOVIE_IMG_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';
const IMDB_BASE_URL = 'https://www.imdb.com/title/tt';

export default function MoviesTable({
  movies,
  action = () => {},
  actionLabel = '',
  loadingAction
}: {
  movies: MovieDetails[];
  action: Function;
  actionLabel: string;
  loadingAction: boolean;
}) {
  const [movieIdSelected, setMovieIdSelected] = useState<number | null>(null);

  const handleClick = (movie_id: number) => {
    setMovieIdSelected(movie_id);
    action(movie_id);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {movies.map((movie) => (
          <TableRow key={movie.movie_id}>
            <TableCell className=" max-w-10">
              <div className="flex items-center space-x-4 ">
                <img
                  src={BASE_MOVIE_IMG_URL + movie.image_path}
                  alt=""
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0 overflow-auto ">
                  <p className="font-bold truncate text-wrap ">{movie.title}</p>
                  <p className=" truncate text-wrap font-light text-xs ">{movie.year}</p>

                  <div>
                    <br />
                    <div className="flex items-center">
                      <div className="flex items-center justify-start space-x-2">
                        {movie.imdb_id && (
                          <a
                            href={IMDB_BASE_URL + formatImdbId(movie.imdb_id)}
                            target="_blank"
                            className=""
                          >
                            <Image
                              src='/icons/imdb-color.svg'
                              width={30}
                              height={30}
                              alt="external"
                            />
                          </a>
                        )}
                        <button
                          onClick={() => handleClick(movie.movie_id)}
                          className="rounded py-2 h-10 hover:pointer"
                        >
                          {loadingAction &&
                          movieIdSelected == movie.movie_id ? (
                            <div className="animate-spin">⏳</div>
                          ) : (
                            actionLabel
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
