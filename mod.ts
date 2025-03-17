// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT License.

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

/**
 * Encode the given number into bijective base-n notation with the given alphabet.
 *
 * @param n The number to encode.
 * @param alphabet The alphabet to use for encoding. Defaults to "abcdefghijklmnopqrstuvwxyz".
 * @returns The encoded string.
 */
export function encode(n: number | bigint, alphabet = ALPHABET): string {
  let k: bigint;
  if (typeof n === "number") {
    if (!Number.isInteger(n)) {
      throw new Error(`Not an integer: ${n}`);
    }
    if (n < 0) {
      throw new Error(`Not a positive number: ${n}`);
    }
    k = BigInt(n);
  } else if (typeof n === "bigint") {
    if (n < 0n) {
      throw new Error(`Not a positive number: ${n}`);
    }
    k = n;
  } else {
    throw new Error(`Not a number: ${n} (${typeof n})`);
  }

  if (k === 0n) {
    return "";
  }

  const base = BigInt(alphabet.length);

  let len = 1;
  let m = base;
  while (k > m) {
    len++;
    k -= m;
    m *= base;
  }

  k--;

  const digits = [];

  for (let i = 0; i < len; i++) {
    const digit = k % base;
    k = (k - digit) / base;
    digits.unshift(digit);
  }

  return digits.map((c) => alphabet[Number(c)]).join("");
}

/**
 * Decode the given bijective base-n string to a bigint with the given alphabet.
 *
 * @param s The string to decode.
 * @param alphabet The alphabet to use for decoding. Defaults to "abcdefghijklmnopqrstuvwxyz".
 * @returns The decoded bigint.
 */
export function decode(s: string, alphabet = ALPHABET): bigint {
  if (typeof s !== "string") {
    throw new Error(`Not a string: ${s} (${typeof s})`);
  }
  if (s === "") {
    return 0n;
  }

  const base = BigInt(alphabet.length);

  let n = 0n;

  for (const c of s) {
    const digit = alphabet.indexOf(c);
    if (digit === -1) {
      throw new Error(`Not a valid string: ${s} (alphabet: ${alphabet})`);
    }
    n = n * base + BigInt(digit);
  }

  for (let i = 1; i < s.length; i++) {
    n += base ** BigInt(i);
  }

  return n + 1n;
}
