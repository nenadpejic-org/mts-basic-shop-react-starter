import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ConsolePage from './components/pages/ConsolePage'
import HomePage from './components/pages/HomePage'
import ShopPage from './components/pages/ShopPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
      </Route>
      <Route path="console" element={<Layout headerType="console" />}>
        <Route index element={<ConsolePage />} />
      </Route>
    </Routes>
  )
}

export default App
