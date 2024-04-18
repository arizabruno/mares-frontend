'use server';

import axios, { AxiosError } from 'axios';
import MovieDetails from '../interfaces/MovieDetails';
import { DecodedToken, TokenResponse } from '../interfaces/Token';
import { cookies } from 'next/headers';
import authAxios from '../utils/authAxios';
import { RedirectType, redirect } from 'next/navigation'
import { decodeJwt } from "jose";
import { verifyToken } from '../utils/helpers';
import { UserUpdate } from '../interfaces/User';
import SongFromMovie from '../interfaces/SongFromMovie';

/**
 * Creates a new user
 *
 * @param email The email of the user.
 * @param username The username of the user.
 * @param password The password of the user.
 * @returns a boolean indicating if the user was created successfully.
 */
export async function createUser(
  email: string,
  username: string,
  password: string
): Promise<boolean> {
  const baseURL = process.env.MARES_API_V1_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return false;
  }

  const url = `${baseURL}/users`;

  try {
    const response = await axios.post(url, {
      email,
      username,
      password
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error: any) {
    console.error(error.message);
    return false;
  }

  return false;
}


/**
 * Updates the user's information.
 *
 * @param userChanges a UserUpdate object with the new user information.
 * @returns a boolean indicating if the user was updated successfully.
 */
export async function updateUser(
  userChanges: UserUpdate
): Promise<boolean> {
  const baseURL = process.env.MARES_API_V1_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return false;
  }

  const url = `${baseURL}/users/${userChanges.userId}`;

  try {
    const response = await authAxios.put(url, {...userChanges});

    if (response.status === 200) {
      cookies().set('jwt', response.data.access_token, {httpOnly: true});
      return true;
    }
  } catch (error:any) {
    console.error(error.message);
    return false;
  }

  return false;
}

/**
 * Logs in as a guest.
 * @returns a boolean indicating if the user was logged in as a guest.
 */

export async function loginAsGuest() {
  const baseURL = process.env.MARES_API_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return false;
  }

  const url = `${baseURL}/token/guest`;

  try {
    const response = await axios.post(url);

    if (response.status === 200) {
      cookies().set('jwt', response.data.access_token, {httpOnly: true});
      return true;
    }
  } catch (error:any) {
    console.error(error.message);
    return false;
  }

  return false;
}

/**
 * Validates the user's credentials.
 *
 * @param username The username of the user.
 * @param password The password of the user.
 */

export async function authenticateUser(
  username: string,
  password: string
) {


  const baseURL = process.env.MARES_API_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return ;
  }

  const url = `${baseURL}/token/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      cache: 'no-store',
      body: new URLSearchParams({
        username: username,
        password: password,
      }).toString(),
    });

    if (response.ok) {
      const data = await response.json();
      cookies().set('jwt', data.access_token, {httpOnly: true});
      return true
    }
  } catch (error:any) {
    console.error(error.message);
  }
  return false;
}

/**
 * Logs out the user.
 */

export async function signOut() {
  cookies().set('jwt','',{httpOnly: true});
  redirect('/login');
}

/**
 * Searches for movies by title.
 *
 * @param title The title of the movie to search for.
 * @param page_size The number of items per page.
 * @param page The page number for pagination.
 * @returns An array of MovieDetails objects or an empty array in case of an error.
 */
export async function searchMovies(
  title: string,
  page_size: number | string,
  page: number | string
): Promise<MovieDetails[]> {
  const baseURL = process.env.MARES_API_V1_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return [];
  }

  const url = `${baseURL}/movies/search?title=${title}&page=${page}&page_size=${page_size}`;

  try {
    const response = await authAxios.get<MovieDetails[]>(url);
    return response.data;
  } catch (error:any) {
    console.error(error.message);
    return [];
  }
}

/**
 * Gets the session from the JWT
 *
 * @param token The JWT as a string.
 * @returns An object with decoded user information if valid, otherwise null.
 */

export async function getSession(): Promise<DecodedToken | null> {
  const token = cookies().get('jwt')?.value;

  if (!token) {
    return null;
  }

  const decodedToken = decodeJwt(token) as DecodedToken;
  return decodedToken
}

/**
 * Adds a movie to the user's favorites.
 * @param movie_id The ID of the movie to add to favorites.
 * @returns a boolean indicating if the movie was added to favorites.
 */

export async function addFavoriteMovie(
  movie_id: number
): Promise<boolean> {
  const baseURL = process.env.MARES_API_V1_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return false;
  }

  const url = `${baseURL}/movies/favorite?movie_id=${movie_id}`;

  try {
    const response = await authAxios.post<MovieDetails[]>(url);

    if (response.status === 200) {
      return true;
    }
  } catch (error:any) {
    console.error(error.message);
    return false;
  }

  return false;
}

/**
 * Retrieves all favorite movies by user email
 * @param title The title of the movie to search for.
 * @param page_size The number of items per page.
 * @param page The page number for pagination.
 * @returns An array of MovieDetails objects or an empty array in case of an error.
 */

export async function getAllFavoriteMovies(
  title: string,
  page_size: number | string,
  page: number | string
): Promise<MovieDetails[]> {
  const baseURL = process.env.MARES_API_V1_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return [];
  }

  const url = `${baseURL}/movies/favorite?title=${title}&page_size=${page_size}&page=${page}`;

  try {
    const response = await authAxios.get<MovieDetails[]>(url);
    return response.data;
  } catch (error:any) {
    console.error(error.message);
    return [];
  }
}

/**
 * Removes a movie from the user's favorites.
 * @param movie_id The ID of the movie to remove from favorites.
 * @returns a boolean indicating if the movie was removed from favorites.
 */

export async function removeFavoriteMovie(
  movie_id: number
): Promise<boolean> {
  const baseURL = process.env.MARES_API_V1_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return false;
  }

  const url = `${baseURL}/movies/favorite?movie_id=${movie_id}`;

  try {
    const response = await authAxios.delete<MovieDetails[]>(url);

    if (response.status === 200) {
      return true;
    }
  } catch (error:any) {
    console.error(error.message);
    return false;
  }

  return false;
}

/**
 * Get movie recommendations for the user.
 * @returns An array of MovieDetails objects or an empty array in case of an error.
 */
export async function getMoviesRecommendation(
): Promise<MovieDetails[]> {
  const baseURL = process.env.MARES_API_V1_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return [];
  }

  const url = `${baseURL}/movies/recommendation`;

  try {
    const response = await authAxios.get<MovieDetails[]>(url);
    return response.data;
  } catch (error:any) {
    console.error(error.message);
    return [];
  }
}

/**
 * Get songs from the user's favorite movies.
 * @returns An array of SongFromMovie objects or an empty array in case of an error.
 */
export async function getSongsFromFavoriteMovies(
): Promise<SongFromMovie[]> {
  const baseURL = process.env.MARES_API_V1_BASE_URL;
  if (!baseURL) {
    console.error('MARES_API_BASE_URL is not defined.');
    return [];
  }

  const url = `${baseURL}/movies/favorite_movies_soundtracks`;

  try {
    const response = await authAxios.get<SongFromMovie[]>(url);
    return response.data;
  } catch (error:any) {
    console.error(error.message);
    return [];
  }
}
