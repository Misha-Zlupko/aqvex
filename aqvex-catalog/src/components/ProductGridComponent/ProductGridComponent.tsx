import { ProductCardComponent } from "./ProductCardComponent";
import styles from "./ProductGridComponent.module.scss";
import type { Product } from "@/types/product.types";

interface Props {
  products: Product[];
  loading?: boolean;
  onAddToCart: (product: Product, selectedVolumeId: string) => void; // ← змінено тип
}

export const ProductGridComponent = ({ products, loading = false, onAddToCart }: Props) => {
  if (loading) {
    return (
      <div className={styles.grid}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.skeleton}>Завантаження...</div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Товари не знайдено</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id} className={styles.grid__item}>
            <ProductCardComponent
              product={product}
              onAddToCart={(selectedVolumeId) => onAddToCart(product, selectedVolumeId)} // ← передаємо selectedVolumeId
            />
          </li>
        ))}
      </ul>
    </section>
  );
};