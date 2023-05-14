import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StockOverviewPage } from './pages/StockOverviewPage';
import { StockDetailPage } from './pages/StockDetailPage';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


export default function App() {
  return (
    <main className='container'>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<StockOverviewPage/>}/>
        <Route path='/detail/:symbol' element={<StockDetailPage/>}/>
      </Routes>
     </BrowserRouter>
    </main>
  );
}
