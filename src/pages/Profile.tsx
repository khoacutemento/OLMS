import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authApi } from "@/lib/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import "@/styles/auth.scss";

const Profile = () => {
  const { user, logout, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.updateProfile({ name, email });
      await refreshUser();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">My Profile</h1>
          <p className="auth-card__subtitle">Manage your account details</p>
        </div>

        <form className="auth-card__form" onSubmit={handleUpdate}>
          <div className="auth-card__field">
            <label htmlFor="name">Full Name</label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="auth-card__field">
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving…" : "Save changes"}
          </Button>
        </form>

        <div className="flex flex-col gap-3 mt-6">
          <Link to="/change-password">
            <Button variant="outline" className="w-full">Change Password</Button>
          </Link>
          <Button variant="destructive" className="w-full" onClick={logout}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
