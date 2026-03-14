import styles from "./FooterComponent.module.scss";
import mastercard from "@assets/master.svg";
import visa from "@assets/visa.svg";
import pay from "@assets/google-pay.svg";
import logo from "@assets/mini-logo.svg";
import made from "@assets/made.svg";
import apple from "@assets/apple-pay.svg";

export const FooterComponent = () => {
  return (
    <footer className={`${styles.footer} ${styles.container}`}>
      <div className={styles.footer__left}>
        <img src={logo} alt="logo" className={styles.footer__logo} />
        <img src={made} alt="made" className={styles.footer__made} />
        <p className={styles.footer__copyright}>AQVEX © 2026 | Все права защищены</p>
      </div>
      
      <div className={styles.footer__right}>
        <img src={mastercard} alt="mastercard" className={styles.footer__paymentIcon} />
        <img src={visa} alt="visa" className={styles.footer__paymentIcon} />
        <img src={pay} alt="pay" className={styles.footer__paymentIcon} />
        <img src={apple} alt="apple" className={styles.footer__paymentIcon} />
      </div>
    </footer>
  );
};