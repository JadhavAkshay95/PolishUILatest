import { useState, useEffect, useMemo } from 'react';
import MnemonicList from 'mnemonic-words';
import { generateMnemonic } from 'bip39';

export function getRandom(arr: readonly string[], n: number) {

  // Generate a random mnemonic (uses crypto.randomBytes under the hood), defaults to 128-bits of entropy
  const mnemonic = generateMnemonic()
  // sample => 'seed sock milk update focus rotate barely fade car face mechanic mercy'

  console.log(mnemonic);

  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  let num = n;
  // eslint-disable-next-line no-plusplus
  while (num--) {
    const x = Math.floor(Math.random() * len);
    result[num] = arr[x in taken ? taken[x] : x];
    // eslint-disable-next-line no-plusplus
    taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
}
export const useMneumonicWords = (length: number) => {
  const [mneumonicWords, setMneumonicWords] = useState<string[]>([]);

  useEffect(() => {
    setMneumonicWords([...getRandom(MnemonicList, length)]);
  }, [length]);
  return { mneumonicWords, getRandom };
};
