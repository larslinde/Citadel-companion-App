import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Plus } from 'lucide-react';
import { identifyPaintsFromImage } from '../services/geminiService';
import { MatchedColor, PaintType } from '../types';

const Matcher: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [matches, setMatches] = useState<MatchedColor[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        analyzeImage(base64.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Data: string) => {
    setIsAnalyzing(true);
    try {
      const results = await identifyPaintsFromImage(base64Data);
      setMatches(results);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getBadgeColor = (type: string) => {
    // Simple mapping, fallback to gray
    const t = type as PaintType;
    if (t === PaintType.Base) return 'bg-red-700';
    if (t === PaintType.Layer) return 'bg-blue-600';
    if (t === PaintType.Contrast) return 'bg-yellow-600';
    if (t === PaintType.Shade) return 'bg-purple-600';
    return 'bg-gray-600';
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white overflow-y-auto p-4">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">AI Color Matcher</h2>
          <p className="text-gray-400 text-sm">Upload a photo of a model or real-world object to find the matching Citadel paints.</p>
        </div>

        {/* Image Upload Area */}
        <div 
          className="relative aspect-video bg-gray-800 rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center hover:border-blue-500 transition-colors cursor-pointer overflow-hidden group"
          onClick={() => fileInputRef.current?.click()}
        >
          {image ? (
            <>
              <img src={image} alt="Analysis target" className="w-full h-full object-contain z-0" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <p className="font-semibold">Click to change image</p>
              </div>
            </>
          ) : (
            <>
              <Camera className="w-12 h-12 text-gray-500 mb-2" />
              <span className="text-gray-400 font-medium">Tap to take photo or upload</span>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileUpload} 
          />
        </div>

        {/* Results */}
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-blue-400 animate-pulse">Scanning pigments...</p>
          </div>
        ) : (
          matches.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="text-lg font-semibold border-b border-gray-800 pb-2">Identified Matches</h3>
              <div className="grid gap-3">
                {matches.map((match, idx) => (
                  <div key={idx} className="bg-gray-800 p-4 rounded-xl flex gap-4 items-start border border-gray-700">
                    <div 
                      className="w-16 h-16 rounded-lg shadow-sm flex-shrink-0 ring-1 ring-white/10"
                      style={{ backgroundColor: match.hexEstimate }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{match.citadelPaint}</h4>
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded text-white ${getBadgeColor(match.paintType)}`}>
                            {match.paintType}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">Match</div>
                      </div>
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                        "{match.reasoning}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Matcher;