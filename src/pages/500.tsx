import { ButtonClassic } from '../components/UI/Buttons/ButtonClassic/ButtonClaasic';
import './style.css';
import { useRouter } from 'next/router';

export function Page500() {
  const router = useRouter();
  return (
    <div className="notFoundField">
      <h1 className="notFoundField__title">500</h1>
      <p className="notFoundField__message">Internal server error</p>
      <ButtonClassic onClick={() => router.push(`/`)}>
        Go to main page
      </ButtonClassic>
    </div>
  );
}
