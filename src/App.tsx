import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Wardrobe from "./pages/Wardrobe";
import ItemDetail from "./pages/ItemDetail";
import Outfits from "./pages/Outfits";
import Insights from "./pages/Insights";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
