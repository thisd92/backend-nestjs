import * as argon2 from 'argon2';

export async function hashPass(password: string) {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
}
