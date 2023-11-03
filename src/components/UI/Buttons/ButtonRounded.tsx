import { ButtonProps } from './types';
import './style.css';

export function ButtonRounded({ type, children, icon, onClick }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="button button__rounded">
      {icon && icon}
      {children && children}
    </button>
  );
}
