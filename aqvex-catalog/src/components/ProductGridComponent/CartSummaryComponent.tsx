import styles from "./CartSummaryComponent.module.scss";
import type { Product } from "@/types/product.types";
import photo from "@assets/product-placeholder.png";

export type CartItem = {
  product: Product;
  quantity: number;
};

interface Props {
  items: CartItem[];
  onRemove: (item: CartItem) => void;
}

export const CartSummaryComponent = ({ items, onRemove }: Props) => {
  if (items.length === 0) return null;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <section className={styles.cart}>
      <header className={styles.cart__header}>
        <h2 className={styles.cart__headerTitle}>Корзина</h2>
        <div className={styles.cart__headerTotal}>{total} грн</div>
      </header>
      <ul className={styles.cart__list}>
        {items.map((item) => (
          <li
            key={`${item.product.id}-${item.product.selected_volume_id}`}
            className={styles.cart__item}
          >
            <div className={styles.cart__imageWrapper}>
              <img
                src={photo}
                alt={item.product.name}
                className={styles.cart__image}
              />
            </div>
            <div className={styles.cart__info}>
              <div className={styles.cart__name}>{item.product.name}</div>
              <div className={styles.cart__meta}>
                Объём: {item.product.selected_volume_id} · Цена:{" "}
                {item.product.price} {item.product.currency}
              </div>
            </div>
            <div className={styles.cart__qty}>
              × {item.quantity}
              <div className={styles.cart__itemTotal}>
                {item.product.price * item.quantity} {item.product.currency}
              </div>
            </div>
            <button
              type="button"
              className={styles.cart__remove}
              onClick={() => onRemove(item)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
