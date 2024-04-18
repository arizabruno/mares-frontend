'use client';

import { addFavoriteMovie, searchMovies } from '../app/actions';
import { useEffect, useState } from 'react';
import { Card } from '@tremor/react';
import MovieDetails from '../interfaces/MovieDetails';
import PaginationMenu from './paginationMenu';
import Search from './search';
import Spinner from './spinner';
import MoviesTable from './movies-table';

export default function SearchMovies({
  title,
  page,
  page_size
}: {
  title: string;
  page: string;
  page_size: string;
}) {

  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [addingFavorite, setAddingFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const moviesRaw = await searchMovies(title, page_size, page);
      setMovies(moviesRaw);
    } catch (error) {
      console.error('Failed to load movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (movie_id: number) => {
    setAddingFavorite(true);
    const success = await addFavoriteMovie(movie_id);
    console.log('addFavoriteMovie:', success);
    if(success) {
      setMovies(movies.filter((movie) => movie.movie_id !== movie_id));
    }
    setAddingFavorite(false);
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
          <MoviesTable movies={movies} action={addFavorite} actionLabel='⭐️' loadingAction={addingFavorite}/>
        )}
      </Card>
      <br />
      <PaginationMenu currentPage={page} />
    </div>
  );
}
