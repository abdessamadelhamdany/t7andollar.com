import React, { FC, useState } from 'react';
import ActionIcon from '@/components/ActionIcon';
import { XIcon } from '@heroicons/react/solid';

interface Props {
  keywords?: string[];
  onChange: (keywords: string[]) => void;
}

const KeywordArea: FC<Props> = ({ keywords = [], onChange }) => {
  const [value, setValue] = useState('');

  return (
    <>
      <div className="keyword-area">
        <div className="keyword-area-list">
          {keywords.map((keyword, idx) => (
            <span key={idx}>
              {keyword}
              <ActionIcon
                onClick={(e) => {
                  e.preventDefault();
                  onChange(keywords.filter((k) => k !== keyword));
                }}
              >
                <XIcon height={18} />
              </ActionIcon>
            </span>
          ))}
        </div>
        <textarea
          rows={1}
          value={value}
          placeholder="الكلمة المفتاحية"
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
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            background: rgb(255, 255, 255);
            border: 1px solid rgb(243, 243, 243);
          }

          .keyword-area-list {
            display: flex;
            flex-wrap: wrap;
          }

          .keyword-area-list span {
            padding: 0.25rem;
            white-space: nowrap;
          }

          textarea {
            flex-grow: 1;
            resize: none;
            display: flex;
            min-width: 250px;
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
