import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import Marketplace from "./pages/Marketplace";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, - 1 min
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="crops" element={<Crops />} />
            <Route path="marketplace" element={<Marketplace />} />
          </Route>

          {/* FUTURE LOGIN ROUTE WITH PAGENOTFOUND */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
