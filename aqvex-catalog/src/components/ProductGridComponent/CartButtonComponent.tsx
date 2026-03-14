import Basket from "@assets/basket.svg"
import styles from "./CartButtonComponent.module.scss"

interface Props {
  isInStock: boolean;
  onClick?: () => void;
  className?: string;
}

export const CartButtonComponent = ({ isInStock, onClick, className }: Props) => {
  return (
    <div className={styles.cart}>
      <button 
        className={`${styles.cart__button} ${!isInStock ? styles.cart__buttonDisabled : ''} ${className || ''}`}
        disabled={!isInStock}
        onClick={onClick}
      >
        <img 
          src={Basket} 
          alt="" 
          className={`${styles.cart__icon} ${!isInStock ? styles.cart__iconDisabled : ''}`} 
        /> 
        <span className={styles.cart__text}>
          {isInStock ? 'В корзину' : 'Нет в наличии'}
        </span>
      </button>
    </div>
  );
};