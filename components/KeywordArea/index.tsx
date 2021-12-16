import React, { FC, useState } from 'react';
import AreaList from '@/components/AreaList';

interface Props {
  keywords?: string[];
  onChange: (keywords: string[]) => void;
}

const KeywordArea: FC<Props> = ({ keywords = [], onChange }) => {
  const [value, setValue] = useState('');

  return (
    <>
      <div className="keyword-area">
        <AreaList
          items={keywords}
          onItemRemoved={(keyword) => {
            onChange(keywords.filter((k) => k !== keyword));
          }}
        />

        <textarea
          rows={1}
          value={value}
          placeholder="الكلمة المفتاحية"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              e.preventDefault();
              onChange(keywords.concat(value.trim()));
              setValue('');
              return;
            }
          }}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <style jsx>
        {`
          .keyword-area {
            gap: 0.5rem;
            display: flex;
            padding: 0.5rem;
            align-items: center;
            margin-bottom: 1rem;
            background: rgb(255, 255, 255);
            border: 1px solid rgb(243, 243, 243);
          }

          textarea {
            flex-grow: 1;
            resize: none;
            display: flex;
            min-width: 250px;
            font-size: 1rem;
            align-items: center;
            padding: 0.75rem 0.5rem;
            border: 1px solid transparent;
          }

          textarea:focus {
            outline: none;
            border-color: #5da731;
          }
        `}
      </style>
    </>
  );
};

export default KeywordArea;
