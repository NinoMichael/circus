import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/front/Home';
import NotFound from './pages/NotFound';       
import PrivacyPolicy from './pages/Privacy';
import Terms from './pages/Terms';
import Sitemap from './pages/front/Sitemap';
import News from './pages/front/News';
import CooperativeList from './pages/front/Cooperative';
import AboutUs from './pages/front/about';
import Trip from './pages/front/trip';

import './App.css';

export default function App() {
  return (
    <>
      <BrowserRouter>

          <main className='px-12'>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/trip" element={<Trip />} />
              <Route exact path="/about" element={<AboutUs />} />
              <Route path= "/404" element={<NotFound />} />
              <Route path= "/privacy" element={<PrivacyPolicy />} />
              <Route path= "/terms" element={<Terms />} />
              <Route path= "/sitemap" element={<Sitemap />} />
              <Route path= "/news" element={<News />} />
              <Route path= "/cooperative" element={<CooperativeList />} />
            </Routes>
          </main>

      </BrowserRouter>
      </>
  );
}
