import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Copy, LogIn, AlertTriangle, X } from 'lucide-react';
import { Paint, PaintType } from '../types';

interface AdminPanelProps {
  paints: Paint[];
  setPaints: React.Dispatch<React.SetStateAction<Paint[]>>;
}

declare global {
  interface Window {
    google: any;
  }
}

const AdminPanel: React.FC<AdminPanelProps> = ({ paints, setPaints }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState<Paint | null>(null);
  const [showExport, setShowExport] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Paint>>({
    name: '',
    type: PaintType.Base,
    hex: '#000000',
  });

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Placeholder - user would need a real ID
        callback: (response: any) => {
          if (response.credential) setIsAuthenticated(true);
        }
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleSave = () => {
    if (!formData.name || !formData.hex) return;

    if (isEditing) {
      // Update existing
      setPaints(prev => prev.map(p => p.id === isEditing.id ? { ...p, ...formData } as Paint : p));
    } else {
      // Add new
      const newPaint: Paint = {
        id: `new_${Date.now()}`,
        name: formData.name,
        type: formData.type as PaintType,
        hex: formData.hex,
        owned: false,
        wishlist: false
      } as Paint;
      setPaints(prev => [...prev, newPaint]);
    }
    
    // Reset
    setIsEditing(null);
    setFormData({ name: '', type: PaintType.Base, hex: '#000000' });
  };

  const handleEditClick = (paint: Paint) => {
    setIsEditing(paint);
    setFormData(paint);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this paint?')) {
      setPaints(prev => prev.filter(p => p.id !== id));
    }
  };

  const generateConfig = () => {
    // Clean data for export (remove user state if desired, but here we reset owned/wishlist for the master list)
    const cleanList = paints.map(p => ({
      id: p.id,
      name: p.name,
      type: p.type,
      hex: p.hex,
      owned: false,
      wishlist: false
    }));
    
    return `import { Paint, PaintType } from './types';\n\nexport const INITIAL_PAINTS: Paint[] = ${JSON.stringify(cleanList, null, 2)};`;
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 p-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">Admin Access</h1>
          <p className="text-gray-400 mb-8">Sign in to manage the Citadel Paint Database.</p>
          
          <div className="flex flex-col gap-4 items-center">
            <div id="googleSignInDiv"></div>
            
            {/* Dev Bypass for the user since they don't have a ClientID configured yet */}
            <div className="relative w-full py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-800 px-2 text-gray-500">Or</span></div>
            </div>
            <button 
              onClick={() => setIsAuthenticated(true)}
              className="text-sm text-gray-500 hover:text-white underline"
            >
              Developer Bypass (Local Mode)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold">Paint Database Admin</h1>
            <p className="text-gray-400 mt-1">Add, edit, or remove paints from the global registry.</p>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <Copy className="w-4 h-4" />
              {showExport ? 'Hide Config' : 'Export JSON'}
            </button>
          </div>
        </div>

        {/* Export Area */}
        {showExport && (
          <div className="bg-gray-950 border border-purple-500/30 rounded-xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-mono text-purple-400 text-sm font-bold">constants.ts</h3>
              <button onClick={() => navigator.clipboard.writeText(generateConfig())} className="text-xs text-gray-400 hover:text-white">Copy to Clipboard</button>
            </div>
            <textarea 
              readOnly 
              className="w-full h-64 bg-black/50 text-green-400 font-mono text-xs p-4 rounded-lg border border-gray-800 focus:outline-none resize-none"
              value={generateConfig()}
            />
            <div className="mt-2 flex gap-2 text-xs text-yellow-500 items-center">
              <AlertTriangle className="w-4 h-4" />
              <span>Copy this content into your <code>constants.ts</code> file to persist these changes permanently.</span>
            </div>
          </div>
        )}

        {/* Editor Form */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {isEditing ? 'Edit Paint' : 'Add New Paint'}
            {isEditing && <button onClick={() => { setIsEditing(null); setFormData({ name: '', type: PaintType.Base, hex: '#000000' }) }} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300 hover:text-white ml-auto">Cancel Edit</button>}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Mephiston Red"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Type</label>
              <select 
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as PaintType }))}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {Object.values(PaintType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Hex Color</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={formData.hex}
                  onChange={e => setFormData(prev => ({ ...prev, hex: e.target.value }))}
                  className="h-9 w-12 rounded cursor-pointer bg-transparent border-0"
                />
                <input 
                  type="text" 
                  value={formData.hex}
                  onChange={e => setFormData(prev => ({ ...prev, hex: e.target.value }))}
                  className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>
            </div>
            <button 
              onClick={handleSave}
              disabled={!formData.name}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isEditing ? 'Update Paint' : 'Add Paint'}
            </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900/50 text-gray-400 font-medium">
              <tr>
                <th className="p-4">Color</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[...paints].reverse().map(paint => (
                <tr key={paint.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="p-4">
                    <div className="w-8 h-8 rounded-full shadow-sm ring-1 ring-white/10" style={{ backgroundColor: paint.hex }} />
                  </td>
                  <td className="p-4 font-medium">{paint.name}</td>
                  <td className="p-4">
                    <span className="bg-gray-900 text-gray-300 px-2 py-1 rounded text-xs border border-gray-600">{paint.type}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(paint)}
                        className="p-2 hover:bg-blue-900/50 text-blue-400 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(paint.id)}
                        className="p-2 hover:bg-red-900/50 text-red-400 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;