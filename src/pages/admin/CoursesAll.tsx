import { useEffect, useState } from "react";
import { adminApi, type CourseAdmin, type UpdateCourseStatusPayload } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const STATUSES = ["Active", "Inactive", "Pending", "Rejected"];

const CoursesAll = () => {
  const [courses, setCourses] = useState<CourseAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    setLoading(true);
    adminApi.getAllCourses()
      .then(({ data }) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load courses"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleStatusChange = async (courseId: number, status: string) => {
    try {
      await adminApi.updateCourseStatus(courseId, { status } as UpdateCourseStatusPayload);
      toast.success("Status updated");
      fetchCourses();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (courseId: number) => {
    if (!confirm("Delete this course?")) return;
    try {
      await adminApi.deleteCourse(courseId);
      toast.success("Course deleted");
      fetchCourses();
    } catch {
      toast.error("Failed to delete course");
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="auth-spinner" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">All Courses</h1>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
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
                <TableCell>
                  <Select defaultValue={c.status || ""} onValueChange={(v) => handleStatusChange(c.courseId, v)}>
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(c.courseId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {courses.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No courses found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CoursesAll;
