import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold tracking-tight animate-slide-up">
            Smart<span className="text-primary">Pay</span> Dashboard
          </h1>
          <p className="text-2xl text-muted-foreground animate-fade-in">
            Your AI-Powered Finance Analytics Platform
          </p>
          
          <div className="flex gap-4 justify-center pt-8 animate-slide-up">
            <Button onClick={() => navigate("/auth")} size="lg" className="bg-primary hover:bg-primary-hover text-lg px-8">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="p-6 rounded-xl bg-card border-2 border-primary/20 gradient-card">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-muted-foreground">Track your finances with beautiful interactive charts</p>
            </div>
            <div className="p-6 rounded-xl bg-card border-2 border-success/20 gradient-card">
              <Zap className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
              <p className="text-muted-foreground">Get personalized recommendations powered by AI</p>
            </div>
            <div className="p-6 rounded-xl bg-card border-2 border-accent/20 gradient-card">
              <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">Your data is encrypted and protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
