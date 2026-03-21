import { useEffect, useState } from "react";
import { adminApi, type AdminReport } from "@/lib/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Report = () => {
  const [report, setReport] = useState<AdminReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getReport()
      .then(({ data }) => setReport(data))
      .catch(() => toast.error("Failed to load report"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="auth-spinner" /></div>;

  if (!report) return <p className="text-muted-foreground">No report data available.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(report).map(([key, value]) => (
          <Card key={key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{String(value)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Report;
