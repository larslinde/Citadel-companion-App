import React, { useState, useEffect } from 'react';
import { Palette, Camera, MessageSquare } from 'lucide-react';
import { INITIAL_PAINTS } from './constants';
import { Paint } from './types';
import PaintLibrary from './components/PaintLibrary';
import Advisor from './components/Advisor';
import Matcher from './components/Matcher';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'collection' | 'matcher' | 'advisor'>('collection');
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
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'collection' && (
          <PaintLibrary 
            paints={paints} 
            onToggleOwned={toggleOwned} 
            onToggleWishlist={toggleWishlist} 
          />
        )}
        {activeTab === 'matcher' && <Matcher />}
        {activeTab === 'advisor' && (
            <div className="h-full flex flex-col">
                <Advisor />
            </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="h-16 bg-gray-900 border-t border-gray-800 flex justify-around items-center shrink-0 z-50 safe-area-pb">
        <button 
          onClick={() => setActiveTab('collection')}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
            activeTab === 'collection' ? 'text-blue-400 bg-blue-500/10' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Palette className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wide">Paints</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('matcher')}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
            activeTab === 'matcher' ? 'text-blue-400 bg-blue-500/10' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Camera className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wide">Match</span>
        </button>

        <button 
          onClick={() => setActiveTab('advisor')}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
            activeTab === 'advisor' ? 'text-blue-400 bg-blue-500/10' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wide">Advisor</span>
        </button>
      </nav>
    </div>
  );
};

export default App;