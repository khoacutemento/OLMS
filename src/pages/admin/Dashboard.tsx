
import { useEffect, useState } from "react";
import { adminApi, type AdminReport } from "@/lib/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap } from "lucide-react";

const Dashboard = () => {
    const [report, setReport] = useState<AdminReport | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminApi.getReport()
            .then(({ data }) => setReport(data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="auth-spinner" /></div>;
    }

    const stats = [
        { label: "Total Users", value: report?.totalUsers ?? 0, icon: Users },
        { label: "Total Courses", value: report?.totalCourses ?? 0, icon: BookOpen },
        { label: "Total Enrollments", value: report?.totalEnrollments ?? 0, icon: GraduationCap },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((s) => (
                    <Card key={s.label}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                            <s.icon className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-foreground">{s.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;