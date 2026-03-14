import styles from "./PaginationComponent.module.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const buildPages = (page: number, totalPages: number): (number | "...")[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) pages.push("...");

  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  if (end < totalPages - 1) pages.push("...");

  pages.push(totalPages);

  return pages;
};

export const PaginationComponent = ({ page, totalPages, onChange }: Props) => {
  const items = buildPages(page, totalPages);

  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Пагинация товаров">
      <button
        type="button"
        className={`${styles.pagination__button} ${
          page === 1 ? styles["pagination__button--disabled"] : ""
        }`}
        onClick={() => page > 1 && onChange(page - 1)}
        disabled={page === 1}
      >
        <FaArrowLeftLong />
      </button>

      {items.map((item, idx) =>
        item === "..." ? (
          <span key={`dots-${idx}`} className={styles.pagination__dots}>
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`${styles.pagination__button} ${
              item === page ? styles["pagination__button--active"] : ""
            }`}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={`${styles.pagination__button} ${
          page === totalPages ? styles["pagination__button--disabled"] : ""
        }`}
        onClick={() => page < totalPages && onChange(page + 1)}
        disabled={page === totalPages}
      >
        <FaArrowRightLong />
      </button>
    </nav>
  );
}

