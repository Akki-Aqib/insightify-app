import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Insights() {
  const [insights, setInsights] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/");
      } else {
        fetchInsights(session.user.id);
      }
    });
  }, [navigate]);

  const fetchInsights = async (userId: string) => {
    const { data } = await supabase
      .from("insights")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setInsights(data || []);
  };

  const generateInsights = async () => {
    setIsGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke("generate-insights");
      
      if (error) throw error;
      toast.success("AI insights generated successfully!");
      fetchInsights(session.user.id);
    } catch (error: any) {
      toast.error(error.message || "Failed to generate insights");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">AI Insights</h1>
            <p className="text-muted-foreground mt-2">Personalized financial recommendations powered by AI</p>
          </div>
          <Button onClick={generateInsights} disabled={isGenerating} className="bg-primary hover:bg-primary-hover">
            {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Generate Insights
          </Button>
        </div>

        {insights.length === 0 ? (
          <Card className="gradient-card border-2 border-primary/20 p-12 text-center">
            <Sparkles className="w-16 h-16 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">No insights yet</h3>
            <p className="text-muted-foreground mb-6">Generate AI-powered insights to understand your spending patterns</p>
            <Button onClick={generateInsights} disabled={isGenerating} className="bg-primary hover:bg-primary-hover">
              {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Generate Your First Insight
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {insights.map((insight) => (
              <Card key={insight.id} className="gradient-card border-2 border-accent/20">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="capitalize">{insight.insight_type}</CardTitle>
                      <CardDescription>{new Date(insight.created_at).toLocaleDateString()}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{insight.message}</p>
                  {insight.category && (
                    <p className="text-sm text-muted-foreground mt-2">Category: {insight.category}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
