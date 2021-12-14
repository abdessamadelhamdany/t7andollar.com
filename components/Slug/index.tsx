import React, { FC, useEffect, useState } from 'react';
import Input from '../Input';
import slugify from 'lib/slugify';

interface Props {
  title?: string;
  defaultValue?: string;
  onChange: (slug) => void;
}

const Slug: FC<Props> = ({ defaultValue, title, onChange }) => {
  const [slug, setSlug] = useState(defaultValue || '');

  useEffect(() => {
    const generatedSlug = slugify(title);
    setSlug(generatedSlug);
    onChange(generatedSlug);
  }, [title]);

  return (
    <>
      <Input
        type="text"
        name="slug"
        value={slug}
        disabled
        placeholder="سبيكة"
      />
    </>
  );
};

export default Slug;
