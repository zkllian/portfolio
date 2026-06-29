import { Route, Switch } from 'wouter';
import Home from '@/pages/Home';
import Tentang from '@/pages/Tentang';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects/imei/barcode-gen" component={Home} />
      <Route path="/tentang" component={Tentang} />
      <Route component={Home} />
    </Switch>
  );
}

export default App;
