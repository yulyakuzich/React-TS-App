import { ButtonProps } from '../types';
// import '../style.css';

export function ButtonClassic({ type, children, icon, onClick }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="button">
      {icon && icon}
      {children}
    </button>
  );
}
