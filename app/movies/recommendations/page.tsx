'use client';

import BasePageMenu from '../../../components/base-page-menu';
import MoviesRecommendation from '../../../components/movies-recommendation';



export default function MoviesRecommendationPage({
  searchParams
}: {
  searchParams: { title: string; page: string };
}) {

  const title = searchParams.title || ' ';
  const page = searchParams.page || '1';
  const page_size = '10';

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <MoviesRecommendation title={title} page={page} page_size={page_size}/>
    </main>
  );
}
