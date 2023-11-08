import { CSSProperties, ReactElement } from 'react';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children?: string;
  style?: CSSProperties;
  icon?: ReactElement;
  dataTestid?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};
