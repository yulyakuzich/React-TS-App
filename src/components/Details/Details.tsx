import './style.css';

import { CloseIcon } from '../UI/Icons/CloseIcon';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { PersonType } from '../MainSection/types';
import Link from 'next/link';

export default function Details({
  data,
  isFetching,
}: {
  data: PersonType;
  isFetching: boolean;
}) {
  return (
    <div className="item-details">
      {isFetching ? (
        <LoadingComponent />
      ) : (
        data && (
          <>
            <div className="close_icon" data-testid="close-button">
              <Link href={`/`}>
                <CloseIcon />
              </Link>
            </div>

            <div
              className="details-outside-area"
              // onClick={() => navigate(`/?${urlParams.toString()}`)}
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
