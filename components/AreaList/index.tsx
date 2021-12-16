import React, { FC } from 'react';
import { XIcon } from '@heroicons/react/solid';
import ActionIcon from '@/components/ActionIcon';

interface Option {
  id: number;
  name: string;
}

interface Props {
  items: Option[] | string[];
  onItemRemoved: (item: Option | string) => void;
}

const AreaList: FC<Props> = ({ items, onItemRemoved }) => (
  <>
    {items.length > 0 ? (
      <div className="many-relation-area-list">
        {items.map((item, idx) => (
          <span key={idx}>
            <span className="many-relation-area-list-item-value">
              {item.name || item}
            </span>
            <ActionIcon
              onClick={(e) => {
                e.preventDefault();
                onItemRemoved(item);
              }}
            >
              <XIcon height={18} />
            </ActionIcon>
          </span>
        ))}
      </div>
    ) : null}

    <style jsx>
      {`
        @media (min-width: 768px) {
          .many-relation-area-list {
            grid-template-columns: 1fr;
          }
        }

        .many-relation-area-list {
          gap: 0.5rem;
          display: grid;
          grid-template-columns: 1fr ${items.length > 1 ? '1fr' : ''};
        }

        .many-relation-area-list > span {
          cursor: default;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          white-space: nowrap;
          background-color: #ededed;
          font-size: 0.8125rem;
        }

        .many-relation-area-list-item-value {
          padding: 0.25rem;
        }
      `}
    </style>
  </>
);

export default AreaList;
