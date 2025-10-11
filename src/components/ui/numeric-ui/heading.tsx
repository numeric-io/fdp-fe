import { JSX } from 'react';

interface HeadingProps {
  children: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = ({ children, level }: HeadingProps) => {
  const HeadingTag: keyof JSX.IntrinsicElements = `h${level}`;
  return <HeadingTag>{children}</HeadingTag>;
};
