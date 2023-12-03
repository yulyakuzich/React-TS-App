import { useSelector } from 'react-redux';
import { selectForm } from '../../store/searchSlice';

export default function Main() {
  const { name } = useSelector(selectForm);
  console.log();

  return (
    <main className="container">
      <div className="main__inner">
        <p className="main__message">You dont have data yet</p>
        <div>
          Name: <p>{name}</p>
        </div>
      </div>
    </main>
  );
}
