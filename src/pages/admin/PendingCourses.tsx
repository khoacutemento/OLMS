import { useEffect, useState } from "react";
import { adminApi, type CourseAdmin } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

const PendingCourses = () => {
  const [courses, setCourses] = useState<CourseAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = () => {
    setLoading(true);
    adminApi.getPendingCourses()
      .then(({ data }) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load pending courses"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPending(); }, []);

  const handleApprove = async (courseId: number) => {
    try {
      await adminApi.approveCourse(courseId);
      toast.success("Course approved");
      fetchPending();
    } catch {
      toast.error("Failed to approve course");
    }
  };

  const handleReject = async (courseId: number) => {
    try {
      await adminApi.updateCourseStatus(courseId, { status: "Rejected" });
      toast.success("Course rejected");
      fetchPending();
    } catch {
      toast.error("Failed to reject course");
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="auth-spinner" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Pending Courses</h1>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((c) => (
              <TableRow key={c.courseId}>
                <TableCell>{c.courseId}</TableCell>
                <TableCell className="font-medium">{c.title}</TableCell>
                <TableCell>{c.instructorName || "—"}</TableCell>
                <TableCell>${c.price?.toFixed(2)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" onClick={() => handleApprove(c.courseId)} className="gap-1">
                    <Check className="h-3 w-3" /> Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleReject(c.courseId)} className="gap-1">
                    <X className="h-3 w-3" /> Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {courses.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No pending courses</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PendingCourses;
