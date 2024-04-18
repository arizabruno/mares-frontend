'use client';

import { getAllFavoriteMovies, removeFavoriteMovie } from '../app/actions';
import { useEffect, useState } from 'react';
import { Card } from '@tremor/react';
import MovieDetails from '../interfaces/MovieDetails';
import PaginationMenu from './paginationMenu';
import Search from './search';
import Spinner from './spinner';
import MoviesTable from './movies-table';

export default function FavoriteMovies({
  title,
  page,
  page_size
}: {
  title: string;
  page: string;
  page_size: string;
}) {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [removingFavorite, setRemovingFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const moviesRaw = await getAllFavoriteMovies(title, page_size, page);
      setMovies(moviesRaw);
    } catch (error) {
      console.error('Failed to load movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (movie_id: number) => {
    setRemovingFavorite(true);
    const success = await removeFavoriteMovie(movie_id);
    console.log('addFavoriteMovie:', success);
    if(success) {
      setMovies(movies.filter((movie) => movie.movie_id !== movie_id));
    }

    setRemovingFavorite(false);
  }

  useEffect(() => {
    loadMovies();

  }, [title, page]);

  return (
    <div className="flex-col">
      <Search />
      <br />
      <Card>
        {loading ? (
          <Spinner />
        ) : (
          <MoviesTable movies={movies} action={remove} actionLabel='🗑️' loadingAction={removingFavorite}/>
        )}
      </Card>
      <br />
      <PaginationMenu currentPage={page} />
    </div>
  );
}
