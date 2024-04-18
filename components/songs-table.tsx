'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react';
import SongFromMovie from '../interfaces/SongFromMovie';
import Image from 'next/image';
import { formatImdbId } from '../utils/helpers';
import { useState } from 'react';

const BASE_MOVIE_IMG_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';
const SPOTIFY_BASE_URL = 'spotify:track:';

export default function SongsTable({
  songs,
  action = () => {},
  actionLabel = '',
  loadingAction
}: {
  songs: SongFromMovie[];
  action: Function;
  actionLabel: string;
  loadingAction: boolean;
}) {
  const [songIdSelected, setSongIdSelected] = useState<number | null>(null);

  const handleClick = (song_id: number) => {
    setSongIdSelected(song_id);
    action(song_id);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {songs.map((song) => song.spotify_id &&  (
          <TableRow key={song.song_id}>
            <TableCell className=" max-w-10">
              <div className="flex items-center space-x-4 ">
                <img
                  src={BASE_MOVIE_IMG_URL + song.movie_image_path}
                  alt=""
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0 overflow-auto ">
                  <p className="font-bold truncate text-wrap ">{song.song_title}</p>
                  <p className="truncate text-wrap ">By {song.artist_name}</p>
                  <div>
                    <br />
                    <div className="flex items-center">
                      <div className="flex items-center justify-start space-x-2">
                        {song.spotify_id && (
                          <a
                            href={SPOTIFY_BASE_URL + song.spotify_id}
                            target="_blank"
                            className=""
                          >
                            <Image
                              src='/icons/spotify.svg'
                              width={30}
                              height={30}
                              alt="external"
                            />
                          </a>
                        )}
                        <button
                          onClick={() => handleClick(song.song_id)}
                          className="rounded py-2 h-10 hover:pointer"
                        >
                          {loadingAction &&
                          songIdSelected == song.song_id ? (
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
