import { ButtonProps } from '../types';
// import '../style.css';

export function ButtonRounded({
  style,
  type,
  children,
  icon,
  dataTestid,
  onClick,
}: ButtonProps) {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      data-testid={dataTestid}
      className="button button__rounded"
    >
      {icon && icon}
      {children && children}
    </button>
  );
}
