import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { pathForPage, pageForPath } from '../routes';

export default function useNav() {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  // Redirect legacy hash links (/#/glossary) to their clean URL equivalents.
  useEffect(() => {
    const match = hash.match(/^#\/?(.+)/);
    if (match) {
      const path = pathForPage(match[1]);
      if (path) navigate(path, { replace: true });
    }
  }, [hash, navigate]);

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const page = pageForPath(pathname);

  const go = (key) => {
    const path = pathForPage(key) ?? '/';
    if (path === pathname) {
      window.scrollTo(0, 0); // re-clicking the current page still scrolls up
      return;
    }
    navigate(path);
  };

  return { page, go };
}
