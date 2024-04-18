'use client';

import SearchMovies from '../../../components/search-movies';



export default function MovieSearchPage({
  searchParams
}: {
  searchParams: { title: string; page: string };
}) {

  const title = searchParams.title || ' ';
  const page = searchParams.page || '1';
  const page_size = '10';

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <SearchMovies title={title} page={page} page_size={page_size}/>
    </main>
  );
}
