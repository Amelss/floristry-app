import { useState } from 'react';

export default function useNav() {
  const [page, setPage] = useState('home');
  const [flowerTab, setFlowerTab] = useState('flowers');
  const go = (p, tab) => { setPage(p); if (tab) setFlowerTab(tab); window.scrollTo(0, 0); };
  return { page, go, flowerTab, setFlowerTab };
}
