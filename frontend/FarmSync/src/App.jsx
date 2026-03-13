import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import Marketplace from "./pages/Marketplace";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Crops" element={<Crops />} />
          <Route path="Marketplace" element={<Marketplace />} />
        </Route>

        {/* FUTURE LOGIN ROUTE WITH PAGENOTFOUND */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
