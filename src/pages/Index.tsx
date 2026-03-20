import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Auth Starter
      </h1>
      <p className="max-w-md text-muted-foreground">
        A clean React authentication scaffold with Axios interceptors, route guards, and token management.
      </p>
      <div className="flex gap-3">
        {isAuthenticated ? (
          <Link to="/profile">
            <Button size="lg">Go to Profile</Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button size="lg">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline">Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
