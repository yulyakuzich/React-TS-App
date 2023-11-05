import { PaginationProps } from './types';
import './style.css';
import { ButtonRoundedBordered } from '../UI/Buttons/ButtonRoundedBordered';
import { ArrowLeft } from '../UI/Icons/ArrowLeft';
import { ArrowRight } from '../UI/Icons/ArrowRight';

export function Pagination({ total, currentPage, onChange }: PaginationProps) {
  const pagesCount = Math.ceil(total / 10);
  console.log(pagesCount);

  const goBack = () => {
    if (currentPage !== 1) {
      onChange(currentPage - 1);
    }
  };
  const goNext = () => {
    if (currentPage !== pagesCount) {
      onChange(currentPage + 1);
    }
  };
  const goToPage = (num: number) => {
    onChange(num);
  };

  return (
    <div className="pagination_container column">
      <div className="row">
        <ButtonRoundedBordered
          icon={<ArrowLeft />}
          style={{ opacity: currentPage == 1 ? 0.5 : 1 }}
          onClick={goBack}
        />

        {Array.from(Array(pagesCount).keys()).map((el) => (
          <ButtonRoundedBordered
            key={el + 1}
            style={{
              background: currentPage == el + 1 ? '#c226ff' : '',
            }}
            onClick={() => goToPage(el + 1)}
          >
            {(el + 1).toString()}
          </ButtonRoundedBordered>
        ))}
        <ButtonRoundedBordered
          icon={<ArrowRight />}
          style={{ opacity: currentPage == pagesCount ? 0.5 : 1 }}
          onClick={goNext}
        />
      </div>
    </div>
  );
}
