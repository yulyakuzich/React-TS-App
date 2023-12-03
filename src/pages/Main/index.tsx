import { useSelector } from 'react-redux';
import { selectForm } from '../../store/searchSlice';

export default function Main() {
  const { name, age, email, password, gender, photo } = useSelector(selectForm);

  return (
    <main className="container">
      <div className="form__comtainer">
        {name ? (
          <div className="form__container_field ">
            <div className="row form__item">
              Name: <p className="personal-data">{name}</p>
            </div>
            <div className="row form__item">
              Age: <p className="personal-data">{age}</p>
            </div>
            <div className="row form__item">
              Email: <p className="personal-data">{email}</p>
            </div>
            <div className="row form__item">
              Password: <p className="personal-data">{password}</p>
            </div>
            <div className="row form__item">
              Gender: <p className="personal-data">{gender}</p>
            </div>
            <div className="row form__item">
              <img src="" alt="" />
              Photo: <img className="personal-data" src={photo} />
            </div>
          </div>
        ) : (
          <p className="main__message">You dont have data yet</p>
        )}
      </div>
    </main>
  );
}
