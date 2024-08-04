import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence} from 'framer-motion'

import Homepage from './pages/Home';

function App() {
  const [loading, setLoading] = useState(false);

        useEffect(() => {
          const handleStart = () => setLoading(true);
          const handleComplete = () => setLoading(false);

          window.addEventListener('beforeunload', handleStart);
          window.addEventListener('load', handleComplete);

        return () => {
            window.removeEventListener('beforeunload', handleStart);
            window.removeEventListener('load', handleComplete);
          };
        }, [])

  return (
    <>
    { loading }
        <AnimatePresence>
          <body className='min-h-screen'>
            <BrowserRouter>
              <Routes>
                <Route exact path = "/" element = {<Homepage />} />
              </Routes>
            </BrowserRouter>
          </body>
        </AnimatePresence>
    </>
  );
}

export default App;
