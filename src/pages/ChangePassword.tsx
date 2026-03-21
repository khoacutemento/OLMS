import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/lib/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import "@/styles/auth.scss";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await authApi.changePassword({ oldPassword, newPassword });
      toast.success("Password changed successfully!");
      navigate("/profile");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Change Password</h1>
          <p className="auth-card__subtitle">Update your account password</p>
        </div>

        {error && <div className="auth-card__error">{error}</div>}

        <form className="auth-card__form" onSubmit={handleSubmit}>
          <div className="auth-card__field">
            <label htmlFor="oldPassword">Current Password</label>
            <Input id="oldPassword" type="password" placeholder="••••••••" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
          </div>
          <div className="auth-card__field">
            <label htmlFor="newPassword">New Password</label>
            <Input id="newPassword" type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div className="auth-card__field">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating…" : "Update Password"}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/profile")}>
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;