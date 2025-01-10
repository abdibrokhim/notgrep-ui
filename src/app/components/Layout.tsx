import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showSearch, setShowSearch] = React.useState(false);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        setShowSearch(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowSearch(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      // Remove input event listener since we're handling keyboard events
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setQuery(q);
      setShowSearch(true);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header 
        showSearch={showSearch}
        query={query}
      />
      <main className="flex-1 overflow-hidden">{children}</main>
      <Footer />
    </div>
  );
}
