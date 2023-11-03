import { ReactElement } from 'react';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children?: string;
  icon?: ReactElement;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};
