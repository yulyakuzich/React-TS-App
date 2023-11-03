import { useEffect, useState } from 'react';

import { ButtonClassic } from '../UI/Buttons/ButtonClaasic';

function ErrorButtonLayout() {
  const [hasError, setHasError] = useState<boolean>(false);

  const throwError = () => {
    throw new Error('Some error');
  };

  useEffect(() => {
    if (hasError) {
      throwError();
    }
  }, [hasError]);

  return (
    <section>
      <div className="container column">
        <ButtonClassic
          onClick={() => {
            setHasError(true);
          }}
        >
          Error Button
        </ButtonClassic>
      </div>
    </section>
  );
}

export default ErrorButtonLayout;
