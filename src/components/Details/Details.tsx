import { Link, useNavigate, useParams } from 'react-router-dom';
import './style.css';

import { CloseIcon } from '../UI/Icons/CloseIcon';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { useGetPeopleByIdQuery } from '../../services/api';

export default function Details() {
  const urlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { id } = useParams();
  const skip = !id;
  const { data, isFetching } = useGetPeopleByIdQuery(id ? id.toString() : '', {
    skip,
  });

  return (
    <div className="item-details">
      {isFetching ? (
        <LoadingComponent />
      ) : (
        data && (
          <>
            <div className="close_icon" data-testid="close-button">
              <Link to={`/?${urlParams.toString()}`}>
                <CloseIcon />
              </Link>
            </div>

            <div
              className="details-outside-area"
              onClick={() => navigate(`/?${urlParams.toString()}`)}
            ></div>
            <p className="characters_list_item_name">{data.name}</p>
            <p className="character_detail">
              <strong>Birth year:</strong> {data.birth_year}
            </p>
            <p className="character_detail">
              <strong>Height:</strong> {data.height}
            </p>
            <p className="character_detail">
              <strong>Mass:</strong> {data.mass}
            </p>
            <p className="character_detail">
              <strong>Skin color:</strong> {data.skin_color}
            </p>
            <p className="character_detail">
              <strong>Created:</strong> {data.created}
            </p>
            <p className="character_detail">
              <strong>Edited:</strong> {data.edited}
            </p>
            <p className="character_detail">
              <strong>Eye color:</strong> {data.eye_color}
            </p>
            <p className="character_detail">
              <strong>Gender:</strong> {data.gender}
            </p>
            <p className="character_detail">
              <strong>Hair color:</strong> {data.hair_color}
            </p>
            <p className="character_detail">
              <strong>Homeworld:</strong> {data.homeworld}
            </p>
          </>
        )
      )}
    </div>
  );
}
