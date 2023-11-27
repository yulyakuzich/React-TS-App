export type PaginationProps = {
  total: number;
  currentPage: number;
  onChange: (page: number) => void;
};
