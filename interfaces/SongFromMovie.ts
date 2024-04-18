export default interface SongFromMovie {
  song_id: number;
  song_title: string | null;
  artist_name: string | null;
  spotify_id: string | null;
  movie_id: number;
  movie_title: string | null;
  movie_image_path: string | null;
}
