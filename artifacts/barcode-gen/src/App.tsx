import { useEffect, useRef, useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Home from '@/pages/Home';
import Tentang from '@/pages/Tentang';
import NavMenu from '@/components/NavMenu';

function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
  const [animKey, setAnimKey] = useState(0);
  const prevRef = useRef(location);

  useEffect(() => {
    if (location === prevRef.current) return;
    prevRef.current = location;
    setPhase('exit');
    const t = setTimeout(() => {
      setAnimKey(k => k + 1);
      setPhase('enter');
    }, 200);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <div key={animKey} className={`page-wrap page-wrap--${phase}`}>
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
          <Route path="/" component={Home} />
          <Route path="/projects/imei/barcode-gen" component={Home} />
          <Route path="/tentang" component={Tentang} />
          <Route component={Home} />
        </Switch>
      </PageTransition>
    </>
  );
}

export default App;
