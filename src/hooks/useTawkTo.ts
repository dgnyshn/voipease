import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export const useTawkTo = () => {
  useEffect(() => {
    // Tawk.to Integration
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/65f1b2918d261e1b5f5c4c26/1hocv2m9j';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode?.insertBefore(s1, s0);

    return () => {
      // Cleanup
      if (window.Tawk_API?.onLoaded) {
        window.Tawk_API.onLoaded = null;
      }
    };
  }, []);

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  };

  return { openChat };
}