import { ButtonRoundedBordered } from '../../components/UI/Buttons/ButtonRoundedBordered/ButtonRoundedBordered';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="container">
      <nav className="row nav">
        <Link to="/">
          <ButtonRoundedBordered>Main Page</ButtonRoundedBordered>
        </Link>
        <Link to="/uncontrolled-form">
          <ButtonRoundedBordered>Uncomtrolled form</ButtonRoundedBordered>
        </Link>
        <Link to="/controlled-form">
          <ButtonRoundedBordered>React hook form</ButtonRoundedBordered>
        </Link>
      </nav>
    </header>
  );
}
