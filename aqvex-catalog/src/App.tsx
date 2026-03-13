import { Routes, Route } from 'react-router-dom'
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'
import { MainComponent } from './components/MainComponent/MainComponent'
import { BasketPage } from './pages/BasketPage/BasketPage'

function App() {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/basket" element={<BasketPage />} />
      </Routes>
    </>
  )
}

export default App
