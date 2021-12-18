import React, { FC, useEffect, useState } from 'react';
import AreaList from '@/components/AreaList';

interface Option {
  id: number;
  name: string;
}

interface Props {
  options?: Option[];
  placeholder?: string;
  selectedOptions?: Option[];
  selectedOptionsChange: (selectedOptions: Option[]) => void;
}

const ManyRelationArea: FC<Props> = ({
  options = [],
  placeholder,
  selectedOptions = [],
  selectedOptionsChange,
}) => {
  const [value, setValue] = useState('');
  const [matches, setMatches] = useState([...options]);

  useEffect(() => {
    setMatches(
      options.filter(
        (opt) =>
          selectedOptions.findIndex((sOpt) => sOpt.id === opt.id) === -1 &&
          opt.name.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
      )
    );
  }, [value, selectedOptions]);

  return (
    <>
      <div className="many-relation-area">
        <AreaList
          items={selectedOptions}
          onItemRemoved={(selectedOption) => {
            if (typeof selectedOption === 'string') {
              return;
            }

            selectedOptionsChange(
              selectedOptions.filter((sOpt) => sOpt.id !== selectedOption.id)
            );

            setMatches(matches.concat(selectedOption));
          }}
        />

        <div className="many-relation-area-input">
          <textarea
            rows={1}
            value={value}
            placeholder={placeholder}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault();

                const match = matches.find(
                  (match) =>
                    match.name.toLowerCase() === value.toLowerCase().trim()
                );

                if (match) {
                  selectedOptionsChange(selectedOptions.concat(match));
                  setValue('');
                }
                return;
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>

          {matches.length > 0 && (
            <div className="many-relation-area-dropdown">
              {matches.map((match) => (
                <button
                  key={match.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.preventDefault();
                    setValue(match.name);
                    selectedOptionsChange(selectedOptions.concat(match));
                    setValue('');
                  }}
                >
                  {match.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .many-relation-area {
            gap: 0.5rem;
            display: flex;
            padding: 0.5rem;
            align-items: center;
            margin-bottom: 1rem;
            background: rgb(255, 255, 255);
            border: 1px solid rgb(243, 243, 243);
          }

          .many-relation-area-input {
            flex-grow: 1;
            position: relative;
          }

          .many-relation-area-input textarea {
            width: 100%;
            resize: none;
            display: flex;
            min-width: 250px;
            font-size: 1rem;
            align-items: center;
            padding: 0.75rem 0.5rem;
            border: 1px solid transparent;
          }

          .many-relation-area-input textarea:focus {
            outline: none;
            border-color: #5da731;
          }

          .many-relation-area-dropdown {
            top: 100%;
            right: 0;
            position: absolute;
            width: 100%;
            background-color: white;
            border: 1px solid transparent;
            display: flex;
            flex-wrap: wrap;
            height: 0;
            overflow: hidden;
            opacity: 0;
            transition: all 300ms;
          }

          .many-relation-area-input
            textarea:focus
            ~ .many-relation-area-dropdown {
            height: auto;
            opacity: 1;
            border-color: #ededed;
          }

          .many-relation-area-dropdown button {
            margin: 0;
            display: block;
            padding: 0.5rem;
            border: 1px solid transparent;
            transition: all 300ms;
            background-color: transparent;
            cursor: pointer;
          }

          .many-relation-area-dropdown button:hover {
            border-color: #5da731;
          }
        `}
      </style>
    </>
  );
};

export default ManyRelationArea;
