import { useNavigate } from 'react-router-dom';
import { ButtonClassic } from '../UI/Buttons/ButtonClassic/ButtonClaasic';
import './style.css';

export function Page404() {
  const navigate = useNavigate();
  return (
    <div className="notFoundField">
      <h1 className="notFoundField__title">404</h1>
      <p className="notFoundField__message">Page not found</p>
      <ButtonClassic onClick={() => navigate(`/`)}>
        Go to main page
      </ButtonClassic>
    </div>
  );
}
