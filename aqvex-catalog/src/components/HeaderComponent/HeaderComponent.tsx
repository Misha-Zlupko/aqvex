import styles from './HeaderComponent.module.scss'
import logo from '@assets/logo.svg'
import { PiBasketBold } from "react-icons/pi";
import { Link } from 'react-router-dom'

export const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <Link to="/basket" className={styles.header__basket}>
          <PiBasketBold size={32} />
          <span className={styles.header__basketCount}>0</span>
            
        </Link>
      </div>
    </header>
  )
}