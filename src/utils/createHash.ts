export function createHash(length: number) {
  const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let hash = '';

  for(let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * caracteres.length);

    hash += caracteres.charAt(index);
  }

  return hash;
}