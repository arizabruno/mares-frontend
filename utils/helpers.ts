import { DecodedToken } from '../interfaces/Token';
import Cookies from 'js-cookie';
import { jwtVerify } from 'jose';

/**
 * Formats a given input as a valid IMDb ID string by ensuring it is a numeric string
 * with a fixed length of 7 characters. If the input string is shorter than 7 characters,
 * it is prefixed with zeros to reach the required length. Non-numeric inputs or undefined
 * values result in an empty string return.
 *
 * @param {any} numberString - The input value intended to be formatted as an IMDb ID. The function
 * attempts to convert this value to a string if it is not undefined.
 *
 * @returns {string} A string representing a formatted IMDb ID. If the input is a valid numeric string
 * and shorter than 7 characters, it will be prefixed with zeros. If the input is non-numeric or
 * undefined, an empty string is returned. In the case of non-numeric inputs, a console warning is
 * also issued.
 *
 * @example
 * // Returns '0123456'
 * formatImdbId('123456');
 *
 * @example
 * // Returns ''
 * formatImdbId('abc123');
 */
export function formatImdbId(numberString: any): string {
  if (numberString == undefined) {
    return '';
  }

  numberString = String(numberString).trim();

  if (!/^\d+$/.test(numberString)) {
    console.log('The input must be a string containing only digits.');
    return '';
  }

  const targetLength = 7;

  const zerosNeeded = targetLength - numberString.length;

  if (zerosNeeded > 0) {
    numberString = '0'.repeat(zerosNeeded) + numberString;
  }

  return numberString;
}

export async function verifyToken(token: string, secretKey: Uint8Array) {
  try {
    await jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
