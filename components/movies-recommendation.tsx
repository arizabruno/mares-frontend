'use client';

import { getMoviesRecommendation } from '../app/actions';
import { useEffect, useState } from 'react';
import { Card } from '@tremor/react';
import MovieDetails from '../interfaces/MovieDetails';
import PaginationMenu from './paginationMenu';
import Search from './search';
import Spinner from './spinner';
import MoviesTable from './movies-table';

export default function MoviesRecommendation({
  title,
  page,
  page_size
}: {
  title: string;
  page: string;
  page_size: string;
}) {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const moviesRaw = await getMoviesRecommendation();
      setMovies(moviesRaw);
    } catch (error) {
      console.error('Failed to load movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }

  };

  const remove = async () => {
    console.log('removeRecommendation:', false);
  }

  useEffect(() => {
    loadMovies();
  }, [title, page]);

  return (
    <div className="flex-col">
      <br />
      <Card>
        {loading ? (
          <Spinner />
        ) : (
          <MoviesTable loadingAction={false} movies={movies} action={() => {}} actionLabel=''/>
        )}
      </Card>
      <br />
    </div>
  );
}
