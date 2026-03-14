import { Routes, Route } from 'react-router-dom'
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'
import { MainComponent } from './components/MainComponent/MainComponent'
import { BasketPage } from './pages/BasketPage/BasketPage'
import { FooterComponent } from './components/FooterComponent/FooterComponent'
import styles from './App.module.scss' // ← додай імпорт стилів

function App() {
  return (
    <div className={styles.app}> {/* ← додай контейнер */}
      <HeaderComponent />
      
      <main className={styles.main}> {/* ← main як обгортка для Routes */}
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>
      </main>
      
      <FooterComponent />
    </div>
  )
}

export default App
