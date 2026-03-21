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
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.updateProfile({ fullName, phone, address });
      await refreshUser();
      toast.success("Profile updated successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" value={user?.email || ""} disabled />
          </div>
          <div className="auth-card__field">
            <label htmlFor="fullName">Full Name</label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="auth-card__field">
            <label htmlFor="phone">Phone</label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="auth-card__field">
            <label htmlFor="address">Address</label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving…" : "Save changes"}
          </Button>
        </form>

        <div className="flex flex-col gap-3 mt-6">
          <Link to="/change-password">
            <Button variant="outline" className="w-full">Change Password</Button>
          </Link>
          {user?.role === "Admin" && (
            <Link to="/admin">
              <Button variant="outline" className="w-full">Admin Dashboard</Button>
            </Link>
          )}
          <Button variant="destructive" className="w-full" onClick={logout}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;