import { Category } from '@prisma/client';
import React, { FC, useEffect, useState } from 'react';
import Label from '../Label';

interface Props {
  featuredAtHome?: boolean;
  onFeaturedAtHomeChange: (featured: boolean) => void;
  featuredAtCategory?: number | null;
  onFeaturedAtCategoryChange: (categoryId?: number | null) => void;
  categories: Category[];
}

const FeaturedPostToggler: FC<Props> = ({
  featuredAtHome,
  onFeaturedAtHomeChange,
  featuredAtCategory,
  onFeaturedAtCategoryChange,
  categories,
}) => {
  const [value, setValue] = useState('');
  const [matches, setMatches] = useState(categories);

  useEffect(() => {
    if (featuredAtCategory) {
      const category = categories.find((cat) => cat.id === featuredAtCategory);
      if (category) {
        setValue(category.name);
      }
    }
  }, []);

  useEffect(() => {
    const newMatches = categories.filter(
      (cat) => cat.name.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
    );
    setMatches(newMatches);
  }, [value]);

  return (
    <>
      <div className="featured-post-toggler">
        <label className="featured-checkbox">
          <input
            type="checkbox"
            checked={featuredAtHome}
            onChange={(e) => {
              onFeaturedAtHomeChange(e.target.checked);
            }}
          />
          مميزة في الصفحة الرئيسية
        </label>

        <label className="featured-post-category-wrapper">
          مميزة في التصنيف
          <div className="featured-post-category">
            <textarea
              rows={1}
              value={value}
              placeholder="اختر التصنيف"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  e.preventDefault();

                  const match = matches.find(
                    (match) =>
                      match.name.toLowerCase() === value.toLowerCase().trim()
                  );

                  if (match) {
                    onFeaturedAtCategoryChange(match.id);
                    setValue(match.name);
                  }
                  return;
                }
              }}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>

            {matches.length > 0 && (
              <div className="featured-post-category-dropdown">
                {matches.map((match) => (
                  <button
                    key={match.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      onFeaturedAtCategoryChange(match.id);
                      setValue(match.name);
                    }}
                  >
                    {match.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </label>
      </div>
      <style jsx>{`
        .featured-post-toggler {
          gap: 0.5rem;
          display: flex;
          flex-direction: column;
          padding: 0.5rem;
          margin-bottom: 1rem;
          background: rgb(255, 255, 255);
          border: 1px solid rgb(243, 243, 243);
        }

        .featured-checkbox {
          gap: 0.5rem;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .featured-post-category-wrapper {
          gap: 0.25rem;
          display: flex;
          align-items: center;
        }

        .featured-post-category {
          flex-grow: 1;
          position: relative;
        }

        .featured-post-category textarea {
          width: 100%;
          resize: none;
          display: flex;
          min-width: 250px;
          font-size: 1rem;
          align-items: center;
          padding: 0.75rem 0.5rem;
          border: 1px solid transparent;
        }

        .featured-post-category textarea:focus {
          outline: none;
          border-color: #5da731;
        }

        .featured-post-category-dropdown {
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

        .featured-post-category
          textarea:focus
          ~ .featured-post-category-dropdown {
          height: auto;
          opacity: 1;
          border-color: #ededed;
        }

        .featured-post-category-dropdown button {
          margin: 0;
          display: block;
          padding: 0.5rem;
          border: 1px solid transparent;
          transition: all 300ms;
          background-color: transparent;
          cursor: pointer;
        }

        .featured-post-category-dropdown button:hover {
          border-color: #5da731;
        }
      `}</style>
    </>
  );
};

export default FeaturedPostToggler;
