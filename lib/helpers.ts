import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { FormEvent } from 'react';

export function title(title, sep = '|', suffix = 'طحن الدولار') {
  return `${title} ${sep} ${suffix}`;
}

export function parseForm(e: FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.currentTarget);
  return Object.fromEntries(formData.entries());
}

export function parseCookies(reqCookies: NextApiRequestCookies) {
  const cookies: string[] = [];
  for (let cookieName in reqCookies) {
    cookies.push(`${cookieName}=${reqCookies[cookieName]}`);
  }
  return cookies.join('; ');
}
