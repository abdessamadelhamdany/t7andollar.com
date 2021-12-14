import React, { FC, useEffect, useState } from 'react';
import slugify from 'lib/slugify';
import Input from '../Input';

interface Props {
  title?: string;
  visible?: boolean;
  defaultValue?: string;
  onChange: (slug) => void;
}

const Slug: FC<Props> = ({ defaultValue, title, visible = true, onChange }) => {
  const [slug, setSlug] = useState(defaultValue || '');

  useEffect(() => {
    const generatedSlug = slugify(title);
    setSlug(generatedSlug);
    onChange(generatedSlug);
  }, [title]);

  if (!visible) {
    return null;
  }

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
