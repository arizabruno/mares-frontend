'use client';

import { getSongsFromFavoriteMovies } from '../app/actions';
import { useEffect, useState } from 'react';
import { Card } from '@tremor/react';
import SongFromMovie from '../interfaces/SongFromMovie';
import PaginationMenu from './paginationMenu';
import Search from './search';
import Spinner from './spinner';
import MoviesTable from './movies-table';
import SongsTable from './songs-table';

export default function SongsFromFavoriteMovies({
  title,
  page,
  page_size
}: {
  title: string;
  page: string;
  page_size: string;
}) {
  const [songs, setSongs] = useState<SongFromMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSongs = async () => {
    setLoading(true);
    try {
      const songsRaw = await getSongsFromFavoriteMovies();
      setSongs(songsRaw);
    } catch (error) {
      console.error('Failed to load songs:', error);
      setSongs([]);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    loadSongs();
  }, [title, page]);

  return (
    <div className="flex-col">
      <br />
      <Card>
        {loading ? (
          <Spinner />
        ) : (
          <SongsTable loadingAction={false} songs={songs} action={() => {}} actionLabel=''/>
  )}
      </Card>
      <br />
    </div>
  );
}
