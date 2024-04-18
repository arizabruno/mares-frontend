'use client';

import BasePageMenu from '../../../components/base-page-menu';
import FavoriteMovies from '../../../components/favorite-movies';



export default function FavoriteMoviesPage({
  searchParams
}: {
  searchParams: { title: string; page: string };
}) {

  const title = searchParams.title || ' ';
  const page = searchParams.page || '1';
  const page_size = '10';

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <FavoriteMovies title={title} page={page} page_size={page_size}/>
    </main>
  );
}
