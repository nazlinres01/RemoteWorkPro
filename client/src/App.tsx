import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import JobDetail from "@/pages/job-detail";
import Companies from "@/pages/companies";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import SavedJobs from "@/pages/saved-jobs";
import Profile from "@/pages/profile";
import Register from "@/pages/register";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/jobs/:id" component={JobDetail} />
      <Route path="/companies" component={Companies} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/saved-jobs" component={SavedJobs} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
