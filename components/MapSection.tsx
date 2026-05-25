import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { SITE_CONTACT } from '../siteConfig';

const MapSection: React.FC = () => {
  const addressText = SITE_CONTACT.address;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONTACT.mapsQuery)}`;

  return (
    <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex items-start gap-3">
        <MapPin className="w-6 h-6 text-cyan-600 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-navy-900 mb-1">Localização</h4>
          <p className="text-slate-600 text-sm mb-4">{addressText}</p>
          <p className="text-slate-500 text-xs mb-4">Ponto de referência: {SITE_CONTACT.reference}</p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            <Navigation className="w-4 h-4" />
            Abrir no Google Maps
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
