import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { CartProvider } from './context/CartContext';

// Lazy load components
const PostList = React.lazy(() => import('./components/PostList/PostList'));
const PostDetails = React.lazy(() => import('./components/PostDetails/PostDetails'));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/products" element={<PostList />} />
                <Route path="/post/:id" element={<PostDetails />} />
              </Routes>
            </Suspense>
          </main>
        
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
