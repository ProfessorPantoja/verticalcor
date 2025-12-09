import React, { useEffect, useState } from 'react';
import { fetchLocationData } from '../services/geminiService';
import { GroundingChunk } from '../types';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

const MapSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [mapChunk, setMapChunk] = useState<GroundingChunk | null>(null);
  const [addressText, setAddressText] = useState("R. Papa João Paulo II, 4000 - Ataíde, Vila Velha - ES");

  useEffect(() => {
    const loadMapData = async () => {
      // Use the specific address provided in the briefing
      const query = "R. Papa João Paulo II, 4000 - Ataíde, Vila Velha - ES";
      const result = await fetchLocationData(query);
      
      // Find a map chunk if available
      const foundMapChunk = result.chunks.find(c => c.maps);
      if (foundMapChunk) {
        setMapChunk(foundMapChunk);
      }
      
      setLoading(false);
    };

    loadMapData();
  }, []);

  return (
    <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex items-start gap-3">
        <MapPin className="w-6 h-6 text-cyan-600 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-navy-900 mb-1">Localização</h4>
          <p className="text-slate-600 text-sm mb-4">{addressText}</p>
          
          {loading ? (
            <div className="flex items-center gap-2 text-xs text-slate-500 animate-pulse">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              Buscando localização exata via satélite...
            </div>
          ) : mapChunk && mapChunk.maps ? (
            <div className="space-y-3">
              <a 
                href={mapChunk.maps.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                Abrir no Google Maps
              </a>
              
              {/* If there are snippets (rare for just an address, but good to handle) */}
              {mapChunk.maps.placeAnswerSources?.[0]?.reviewSnippets && (
                 <div className="mt-2 text-xs text-slate-500 italic border-l-2 border-cyan-200 pl-2">
                   "{mapChunk.maps.placeAnswerSources[0].reviewSnippets[0].content}"
                 </div>
              )}
            </div>
          ) : (
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:underline"
            >
              Ver no Mapa <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSection;