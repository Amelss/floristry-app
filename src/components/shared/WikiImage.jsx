import { useState, useEffect } from 'react';
import { wikiImg } from '../../utils';

export default function WikiImage({ wiki, alt, className, placeholder = '#B8CEAE', size = 500 }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(!!wiki);

  useEffect(() => {
    if (!wiki) return;
    fetch(wikiImg(wiki, size))
      .then(r => r.json())
      .then(data => {
        const p = data.query && Object.values(data.query.pages)[0];
        if (p && p.thumbnail) setSrc(p.thumbnail.source);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, [wiki, size]);

  if (loading) return (
    <div className={className + ' animate-pulse'} style={{background: placeholder}}>
      <div className="w-6 h-6 rounded-full border-2 border-white/40 border-t-white animate-spin m-auto" style={{marginTop:'40%'}}/>
    </div>
  );
  if (src) return <img src={src} alt={alt} className={className}/>;
  return <div className={className} style={{background: placeholder}}/>;
}
