"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default async function BasePageMenu() {

  return (
      <div className="flex row justify-center p-4">
        <Link className={`rounded hover:bg-gray-200 px-5 py-2 text-center`} href={`/movies/search`}>🔎 Search</Link>
        <Link className={`rounded hover:bg-gray-200 px-5 py-2 text-center`} href={`/movies/favorites`}>⭐️ Favorites</Link>
        <Link className={`rounded hover:bg-gray-200 px-5 py-2 text-center`} href={`/movies/recommendations`}>🧠 Recs</Link>
        <Link className={`rounded hover:bg-gray-200 px-5 py-2 text-center`} href={`/movies/songs`}>🎵 Songs</Link>

      </div>
  );
}
