import { IMeta } from "../types/table.types";
import ResponsivePagination from "react-responsive-pagination";

import "react-responsive-pagination/themes/classic.css";

interface PaginationType {
  meta: IMeta;
  setCurrentPage: (e: number) => void;
  currentPage: number;
  className?: string;
}

export default function Pagination({
  meta,
  currentPage = 1,
  setCurrentPage,
  className,
}: PaginationType) {
  const { last_page } = meta;

  return (
    <div className={className}>
      <ResponsivePagination
        current={currentPage}
        total={last_page || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
