import styles from './PriceComponent.module.scss';
import discountImg from "@assets/discount.svg";

interface Props {
  price: number;
  oldPrice: number | null;
  discountPercent: number | null;
  currency: string;
}

export const PriceComponent = ({ price, oldPrice, discountPercent, currency }: Props) => {
  if (!oldPrice || !discountPercent) {
    return (
      <div className={styles.price}>
        <span className={styles.price__current}>
          {price} {currency}
        </span>
      </div>
    );
  }

  return (
    <div className={styles.price}>
      <div className={styles.price__row}>
        <span className={styles.price__old}>
          {oldPrice} {currency}
        </span>
        <span className={styles.price__current}>
          {price} {currency}
        </span>
        <div className={styles.price__discountWrapper}>
          <img src={discountImg} alt={`Знижка ${discountPercent}%`} className={styles.price__discount} />
          <span className={styles.price__discountValue}>{discountPercent}%</span>
        </div>
      </div>
    </div>
  );
};