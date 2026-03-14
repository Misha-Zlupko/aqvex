import { useState } from "react";
import styles from "./ProductCardComponent.module.scss";
import photo from "@assets/product-placeholder.png";
import { PriceComponent } from "./PriceComponent";
import type { Product } from "@/types/product.types";
import { RatingComponent } from "./RatingComponent";
import { CartButtonComponent } from "./CartButtonComponent";
import stock from "@assets/stock.svg";
import whaterdrop from "@assets/whater.svg";
import { VolumeSelectorComponent } from "./VolumeSelectorComponent";

interface Props {
  product: Product;
  onAddToCart?: (selectedVolumeId: string) => void; // ← змінив тип
}

export const ProductCardComponent = ({ product, onAddToCart }: Props) => {
  const [selectedVolumeId, setSelectedVolumeId] = useState(product.selected_volume_id);
  
  const isInStock = product.in_stock;
  const selectedVolume = product.volumes.find(v => v.id === selectedVolumeId);
  const isVolumeInStock = selectedVolume?.in_stock ?? false;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(selectedVolumeId); // ← передаємо вибраний об'єм
    }
  };

  return (
    <div className={`${styles.card} ${!isInStock ? styles.cardOutOfStock : ""}`}>
      <img 
        src={photo} 
        alt={product.name} 
        className={styles.card__image} 
      />
      
      <div className={styles.card__content}>
        <PriceComponent 
          price={product.price}
          oldPrice={product.old_price}
          discountPercent={product.discount_percent}
          currency={product.currency}
        />
        
        <h3 className={styles.card__title}>{product.name}</h3>

        <RatingComponent 
          rating={product.rating} 
          reviewsCount={product.reviews_count}
        />
        
        <div className={styles.card__info}>
          <p className={styles.card__availability}>
            <img 
              src={stock} 
              alt="В наличии" 
              className={`${styles.card__icon} ${!isInStock ? styles.card__iconNoStock : ""}`} 
            /> 
            {isVolumeInStock ? "В наличии" : "Нет в наличии"}
          </p>
          <p className={styles.card__category}>
            <img 
              src={whaterdrop} 
              alt="Капля" 
              className={`${styles.card__icon} ${!isInStock ? styles.card__iconNoStock : ""}`}
            />
            {product.category}
          </p>
        </div>
        
        <div className={styles.card__footer}>
          <VolumeSelectorComponent 
            volumes={product.volumes}
            selectedVolumeId={selectedVolumeId}
            onVolumeChange={setSelectedVolumeId}
          />
          <CartButtonComponent 
            isInStock={isVolumeInStock} 
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};