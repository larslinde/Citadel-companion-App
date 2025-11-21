import React, { useState, useEffect } from 'react';
import { INITIAL_PAINTS } from './constants';
import { Paint } from './types';
import PaintLibrary from './components/PaintLibrary';

const App: React.FC = () => {
  const [paints, setPaints] = useState<Paint[]>(() => {
    // Load from localStorage or fall back to initial constant
    const saved = localStorage.getItem('citadel_paints');
    if (saved) {
      return JSON.parse(saved);
    }
    return INITIAL_PAINTS;
  });

  // Persist paints whenever they change
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