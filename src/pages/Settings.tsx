import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account preferences</p>
        </div>
        
        <Card className="gradient-card border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Profile settings coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
