import { FormEvent } from 'react';

export function title(title, sep = '|', suffix = 'طحن الدولار') {
  return `${title} ${sep} ${suffix}`;
}

export function parseForm(e: FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.currentTarget);
  return Object.fromEntries(formData.entries());
}
