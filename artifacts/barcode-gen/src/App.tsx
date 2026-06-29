import { useEffect, useRef, useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Home from '@/pages/Home';
import Tentang from '@/pages/Tentang';

function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const [stage, setStage] = useState<'enter' | 'exit' | 'idle'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (location === displayedLocation) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    setStage('exit');

    timerRef.current = setTimeout(() => {
      setDisplayedLocation(location);
      setStage('enter');
      timerRef.current = setTimeout(() => setStage('idle'), 300);
    }, 160);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [location]);

  return (
    <div className={`page-wrap page-wrap--${stage}`} key={displayedLocation}>
      <Switch location={displayedLocation}>
        {children}
      </Switch>
    </div>
  );
}

function App() {
  return (
    <PageTransition>
      <Route path="/" component={Home} />
      <Route path="/projects/imei/barcode-gen" component={Home} />
      <Route path="/tentang" component={Tentang} />
      <Route component={Home} />
    </PageTransition>
  );
}

export default App;
