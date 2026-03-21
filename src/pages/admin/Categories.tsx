import { useEffect, useState } from "react";
import { adminApi, type CategoryDTO } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryDTO | null>(null);
  const [form, setForm] = useState({ categoryName: "", description: "" });
  const [saving, setSaving] = useState(false);

  const fetchCategories = () => {
    setLoading(true);
    adminApi.getCategories()
      .then(({ data }) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load categories"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ categoryName: "", description: "" });
    setOpen(true);
  };

  const openEdit = (cat: CategoryDTO) => {
    setEditing(cat);
    setForm({ categoryName: cat.categoryName || "", description: cat.description || "" });
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminApi.updateCategory(editing.categoryId, form);
        toast.success("Category updated");
      } else {
        await adminApi.createCategory(form);
        toast.success("Category created");
      }
      setOpen(false);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (categoryId: number) => {
    if (!confirm("Delete this category?")) return;
    try {
      await adminApi.deleteCategory(categoryId);
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="auth-spinner" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={openCreate}><Plus className="h-4 w-4" /> Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit Category" : "New Category"}</DialogTitle></DialogHeader>
            <form className="space-y-4" onSubmit={handleSave}>
              <Input placeholder="Category Name" value={form.categoryName} onChange={(e) => setForm({ ...form, categoryName: e.target.value })} required />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Saving…" : editing ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.categoryId}>
                <TableCell>{c.categoryId}</TableCell>
                <TableCell className="font-medium">{c.categoryName}</TableCell>
                <TableCell className="text-muted-foreground max-w-xs truncate">{c.description || "—"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(c.categoryId)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No categories found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Categories;
