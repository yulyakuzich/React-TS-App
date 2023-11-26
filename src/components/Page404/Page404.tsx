// import { useNavigate } from 'react-router-dom';

import { ButtonClassic } from '../UI/Buttons/ButtonClassic/ButtonClaasic';
import './style.css';
import { useRouter } from 'next/router';

export function Page404() {
  const router = useRouter();
  return (
    <div className="notFoundField">
      <h1 className="notFoundField__title">404</h1>
      <p className="notFoundField__message">Page not found</p>
      <ButtonClassic onClick={() => router.push(`/`)}>
        Go to main page
      </ButtonClassic>
    </div>
  );
}
