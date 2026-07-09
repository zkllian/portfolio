import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Home from '@/pages/Home';
import Tentang from '@/pages/Tentang';
import NotFound from '@/pages/not-found';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const WARM_ROUTES = new Set(['/projects/imei/barcode-gen']);

function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [animKey, setAnimKey] = useState(0);
  const prevRef = useRef(location);

  useEffect(() => {
    if (location === prevRef.current) return;
    prevRef.current = location;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setAnimKey(k => k + 1);
  }, [location]);

  return (
    <div key={animKey} className="page-wrap page-wrap--enter">
      {children}
    </div>
  );
}

function App() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    if (WARM_ROUTES.has(location)) {
      document.body.classList.add('bg-warm');
    } else {
      document.body.classList.remove('bg-warm');
    }
  }, [location]);

  return (
    <>
      <PageTransition>
        <Switch>
          <Route path="/" component={Tentang} />
          <Route path="/tentang" component={Tentang} />
          <Route path="/projects/imei/barcode-gen" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
