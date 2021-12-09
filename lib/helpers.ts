import { FormEvent } from 'react';

export function title(title, sep = '|', suffix = 'طحن الدولار') {
  return `${title} ${sep} ${suffix}`;
}

export function parseForm(e: FormEvent<HTMLFormElement>) {
  return new FormData(e.currentTarget);
}
