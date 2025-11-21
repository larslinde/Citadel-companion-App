import React, { useState, useMemo } from 'react';
import { Search, Check, Heart, ArrowDownAZ, ArrowUpAZ, Filter } from 'lucide-react';
import { Paint, PaintType } from '../types';

interface PaintLibraryProps {
  paints: Paint[];
  onToggleOwned: (id: string) => void;
  onToggleWishlist: (id: string) => void;
}

const PaintLibrary: React.FC<PaintLibraryProps> = ({ paints, onToggleOwned, onToggleWishlist }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'inventory' | 'wishlist'>('all');
  const [selectedCategory, setSelectedCategory] = useState<PaintType | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredPaints = useMemo(() => {
    let result = paints;

    // Tab Filter
    if (activeTab === 'inventory') {
      result = result.filter(p => p.owned);
    } else if (activeTab === 'wishlist') {
      result = result.filter(p => p.wishlist);
    }

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.type === selectedCategory);
    }

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    return result;
  }, [paints, activeTab, selectedCategory, searchQuery, sortOrder]);

  const categories = ['All', ...Object.values(PaintType)];

  const getCategoryColor = (type: PaintType) => {
    switch (type) {
      case PaintType.Base: return 'bg-red-700 text-white';
      case PaintType.Layer: return 'bg-blue-600 text-white';
      case PaintType.Shade: return 'bg-purple-600 text-white';
      case PaintType.Contrast: return 'bg-yellow-600 text-white';
      case PaintType.Dry: return 'bg-gray-400 text-gray-900';
      case PaintType.Technical: return 'bg-orange-700 text-white';
      case PaintType.Spray: return 'bg-gray-600 text-white';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Controls Header */}
      <div className="p-4 space-y-4 border-b border-gray-800 bg-gray-900/95 backdrop-blur z-10">
        
        {/* Search and Sort */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search paints..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
            title={`Sort ${sortOrder === 'asc' ? 'Z-A' : 'A-Z'}`}
          >
            {sortOrder === 'asc' ? <ArrowDownAZ className="w-5 h-5" /> : <ArrowUpAZ className="w-5 h-5" />}
          </button>
        </div>

        {/* Main Tabs */}
        <div className="flex bg-gray-800 rounded-lg p-1">
          {(['all', 'inventory', 'wishlist'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-all ${
                activeTab === tab 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab === 'all' ? 'All Paints' : tab}
            </button>
          ))}
        </div>

        {/* Horizontal Category Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as PaintType | 'All')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredPaints.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Filter className="w-12 h-12 mb-2 opacity-50" />
            <p>No paints found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPaints.map((paint) => (
              <div key={paint.id} className="bg-gray-800 rounded-xl p-3 flex items-center gap-4 shadow-sm border border-gray-700/50 hover:border-gray-600 transition-colors">
                {/* Color Swatch */}
                <div 
                  className="w-12 h-12 rounded-full flex-shrink-0 shadow-inner ring-2 ring-black/20"
                  style={{ backgroundColor: paint.hex }}
                />
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${getCategoryColor(paint.type)}`}>
                      {paint.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm truncate" title={paint.name}>{paint.name}</h3>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => onToggleOwned(paint.id)}
                    className={`p-2 rounded-lg transition-all ${
                      paint.owned 
                      ? 'bg-green-900/50 text-green-400 hover:bg-green-900' 
                      : 'bg-gray-700 text-gray-500 hover:bg-gray-600 hover:text-gray-300'
                    }`}
                    title={paint.owned ? "Remove from Inventory" : "Add to Inventory"}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onToggleWishlist(paint.id)}
                    className={`p-2 rounded-lg transition-all ${
                      paint.wishlist 
                      ? 'bg-pink-900/50 text-pink-400 hover:bg-pink-900' 
                      : 'bg-gray-700 text-gray-500 hover:bg-gray-600 hover:text-gray-300'
                    }`}
                    title={paint.wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${paint.wishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaintLibrary;