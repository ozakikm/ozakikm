import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import DataTree from './views/DataTree';
import Navigation from './views/Navigation';
import Report from './views/Report';
import DataCorrection from './views/DataCorrection';
import TaishakuCorrection from './views/TaishakuCorrection';
import ZandakaCorrection from './views/ZandakaCorrection';
import SchemeList from './views/SchemeList';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact>
        <SchemeList />
      </Route>
      <Route path="/dataTree" exact>
        <DataTree />
      </Route>
      <Route path="/schemeList" exact>
        <SchemeList />
      </Route>
      <Route path="/report" exact>
        <Report />
      </Route>
      <Route path="/dataCorrection" exact>
        <DataCorrection />
      </Route>
      <Route path="/taishakuCorrection" exact>
        <TaishakuCorrection />
      </Route>
      <Route path="/zandakaCorrection" exact>
        <ZandakaCorrection />
      </Route>
    </BrowserRouter>
  );
}