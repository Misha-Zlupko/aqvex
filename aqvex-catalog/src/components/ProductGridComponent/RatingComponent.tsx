import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styles from "./RatingComponent.module.scss";

interface Props {
  rating: number;
  reviewsCount: number;
}

export const RatingComponent = ({ rating, reviewsCount }: Props) => {
  const fullStars = Math.floor(rating);
  const fractionalPart = rating - fullStars; 
  
  const hasHalfStar = fractionalPart >= 0.3 && fractionalPart < 0.7;
  const hasFullStar = fractionalPart >= 0.7;
  
  return (
    <div className={styles.rating}>
      <div className={styles.rating__stars}>
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <FaStar key={index} className={styles.rating__starFilled} />;
          } else if (index === fullStars && hasHalfStar) {
            return <FaStarHalfAlt key={index} className={styles.rating__starFilled} />;
          } else if (index === fullStars && hasFullStar) {
            return <FaStar key={index} className={styles.rating__starFilled} />;
          } else {
            return <FaRegStar key={index} className={styles.rating__starEmpty} />;
          }
        })}
      </div>
      <span className={styles.rating__count}>{reviewsCount}</span>
    </div>
  );
};