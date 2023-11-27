import { ButtonProps } from '../types';
// import '../style.css';

export function ButtonRoundedBordered({
  style,
  type,
  children,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className="button__bordered spaced"
    >
      {icon && icon}
      {children && children}
    </button>
  );
}
