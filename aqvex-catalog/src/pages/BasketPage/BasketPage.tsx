import { useEffect, useState } from "react";
import {
  CartSummaryComponent,
  type CartItem,
} from "@/components/ProductGridComponent/CartSummaryComponent";
import styles from "./BasketPage.module.scss";

type CheckoutForm = {
  firstName: string;
  lastName: string;
  phone: string;
};

export const BasketPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("aqvex_cart");
      if (raw) {
        setItems(JSON.parse(raw) as CartItem[]);
      }
    } catch {
      setItems([]);
    }
  }, []);

  const handleRemove = (toRemove: CartItem) => {
    setItems((prev) => {
      const next = prev.filter(
        (item) =>
          !(
            item.product.id === toRemove.product.id &&
            item.product.selected_volume_id ===
              toRemove.product.selected_volume_id
          ),
      );
      try {
        window.localStorage.setItem("aqvex_cart", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleChange = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<CheckoutForm> = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "Введите имя";
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = "Введите фамилию";
    }

    const phoneClean = form.phone.replace(/[^\d+]/g, "");
    if (!phoneClean || phoneClean.length < 10) {
      nextErrors.phone = "Введите корректный номер телефона";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
  };

  return (
      <section className={styles.basket}>
        <div className={styles.basket__main}>
          <CartSummaryComponent items={items} onRemove={handleRemove} />
        </div>
        <aside className={styles.basket__sidebar}>
          <div className={styles.checkout}>
            <h2 className={styles.checkout__title}>Оформление заказа</h2>
            <form className={styles.checkout__form} onSubmit={handleSubmit}>
              <div className={styles.checkout__field}>
                <label className={styles.checkout__label}>Имя</label>
                <input
                  className={styles.checkout__input}
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
                {errors.firstName && (
                  <span className={styles.checkout__error}>
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className={styles.checkout__field}>
                <label className={styles.checkout__label}>Фамилия</label>
                <input
                  className={styles.checkout__input}
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
                {errors.lastName && (
                  <span className={styles.checkout__error}>
                    {errors.lastName}
                  </span>
                )}
              </div>

              <div className={styles.checkout__field}>
                <label className={styles.checkout__label}>Телефон</label>
                <input
                  className={styles.checkout__input}
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+380..."
                />
                {errors.phone && (
                  <span className={styles.checkout__error}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={styles.checkout__button}
                disabled={items.length === 0}
              >
                Оформить заказ
              </button>

              {submitted && (
                <div className={styles.checkout__success}>
                  Заказ успешно оформлен!
                </div>
              )}
            </form>
          </div>
        </aside>
      </section>
  );
};