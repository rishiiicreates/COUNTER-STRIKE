import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import { motion } from "framer-motion";
import CustomCursor from "./components/cursor/CustomCursor";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="app-container"
      >
        <CustomCursor />
        <Router />
        <Toaster />
      </motion.div>
    </QueryClientProvider>
  );
}

export default App;
