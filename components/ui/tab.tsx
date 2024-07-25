"use client";

import React, { FC, ReactNode, useState } from "react";

type TabProps = {
  children: ReactNode;
  headers: string[];
  defaultTab?: number;
};

type TabItemProps = {
  index?: number;
  children: ReactNode;
  activeIndex?: number;
};

export const Tab = ({ children, defaultTab = 0, headers }: TabProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultTab);

  const handleItemClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div>
      <div className="flex gap-4 items-center">
        {headers.map((headItem, index) => {
          return (
            <button
              className={`${activeIndex === index ? "font-bold" : ""}`}
              key={headItem}
              onClick={() => handleItemClick(index)}
            >
              {headItem}
            </button>
          );
        })}
      </div>

      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<TabItemProps>(child)) {
          return React.cloneElement(child, {
            index,
            activeIndex,
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabItem: FC<TabItemProps> = ({
  activeIndex,
  children,
  index,
}: TabItemProps): JSX.Element => {
  return (
    <div className="mt-4">{activeIndex === index && <div>{children}</div>}</div>
  );
};
