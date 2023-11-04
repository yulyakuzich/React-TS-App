import { Link, useParams } from 'react-router-dom';
import { getPerson } from '../../api';
import './style.css';
import LoadingComponent from '../LoadingComponent/loadingComponent';
import { PersonType } from '../MainSection/types';
import { CloseIcon } from '../UI/Icons/CloseIcon';
import { useEffect, useState } from 'react';

export default function Details() {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<PersonType | null>(null);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getPerson(id).then((resp) => {
      setDetails(resp.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="item-details">
      {loading ? (
        <LoadingComponent />
      ) : (
        details && (
          <>
            <div className="close_icon">
              <Link to="/">
                <CloseIcon />
              </Link>
            </div>
            <p className="characters_list_item_name">{details.name}</p>
            <p className="character_detail">
              <strong>Birth year:</strong> {details.birth_year}
            </p>
            <p className="character_detail">
              <strong>Height:</strong> {details.height}
            </p>
            <p className="character_detail">
              <strong>Mass:</strong> {details.mass}
            </p>
            <p className="character_detail">
              <strong>Skin color:</strong> {details.skin_color}
            </p>
            <p className="character_detail">
              <strong>Created:</strong> {details.created}
            </p>
            <p className="character_detail">
              <strong>Edited:</strong> {details.edited}
            </p>
            <p className="character_detail">
              <strong>Eye color:</strong> {details.eye_color}
            </p>
            <p className="character_detail">
              <strong>Gender:</strong> {details.gender}
            </p>
            <p className="character_detail">
              <strong>Hair color:</strong> {details.hair_color}
            </p>
            <p className="character_detail">
              <strong>Homeworld:</strong> {details.homeworld}
            </p>
          </>
        )
      )}
    </div>
  );
}
