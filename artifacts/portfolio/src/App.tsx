import { useEffect, useRef, useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Home from '@/pages/Home';
import Tentang from '@/pages/Tentang';
import NotFound from '@/pages/not-found';
import NavMenu from '@/components/NavMenu';

function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [animKey, setAnimKey] = useState(0);
  const prevRef = useRef(location);

  useEffect(() => {
    if (location === prevRef.current) return;
    prevRef.current = location;
    setAnimKey(k => k + 1);
  }, [location]);

  return (
    <div key={animKey} className="page-wrap page-wrap--enter">
      {children}
    </div>
  );
}

function App() {
  return (
    <>
      <NavMenu />
      <PageTransition>
        <Switch>
          <Route path="/" component={Tentang} />
          <Route path="/tentang" component={Tentang} />
          <Route path="/projects/imei/barcode-gen" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </>
  );
}

export default App;
