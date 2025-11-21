import React, { useState, useEffect } from 'react';
import { INITIAL_PAINTS } from './constants';
import { Paint } from './types';
import PaintLibrary from './components/PaintLibrary';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  // Basic Routing
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const [paints, setPaints] = useState<Paint[]>(() => {
    const saved = localStorage.getItem('citadel_paints');
    if (saved) {
      return JSON.parse(saved);
    }
    return INITIAL_PAINTS;
  });

  useEffect(() => {
    localStorage.setItem('citadel_paints', JSON.stringify(paints));
  }, [paints]);

  const toggleOwned = (id: string) => {
    setPaints(prev => prev.map(p => 
      p.id === id ? { ...p, owned: !p.owned } : p
    ));
  };

  const toggleWishlist = (id: string) => {
    setPaints(prev => prev.map(p => 
      p.id === id ? { ...p, wishlist: !p.wishlist } : p
    ));
  };

  // Admin Route Check
  if (currentPath.startsWith('/admin')) {
    return <AdminPanel paints={paints} setPaints={setPaints} />;
  }

  // Default Route
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-950 text-gray-100 font-sans">
      <PaintLibrary 
        paints={paints} 
        onToggleOwned={toggleOwned} 
        onToggleWishlist={toggleWishlist} 
      />
    </div>
  );
};

export default App;