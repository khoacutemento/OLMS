import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Users,
  PlayCircle,
  ClipboardCheck,
  BarChart3,
  MessageSquare,
  Globe,
  LogIn,
  UserPlus,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Authentication & Authorization",
    desc: "Secure JWT-based sessions with Role-Based Access Control for Admins, Instructors, Students, and Guests.",
  },
  {
    icon: Users,
    title: "User Management",
    desc: "Admins can create accounts, import user lists, manage states (active/banned), and assign roles.",
  },
  {
    icon: BookOpen,
    title: "Course & Curriculum Builder",
    desc: "Instructors structure courses into chapters and lessons with rich-text, video embeds, and enrollment keys.",
  },
  {
    icon: PlayCircle,
    title: "Enrollment & Learning",
    desc: "Students browse the catalog, self-enroll, mark lessons complete, and track progress in real-time.",
  },
  {
    icon: ClipboardCheck,
    title: "Assessment & Auto-Grading",
    desc: "Custom Quiz Engine with auto-grading, randomized questions, and a grading interface for essay assignments.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking & Analytics",
    desc: "Aggregated reports, personal dashboards for GPA, and course analytics for instructors.",
  },
  {
    icon: MessageSquare,
    title: "Course Interaction",
    desc: "Q&A and comment sections attached to lessons for collaborative discussion and announcements.",
  },
  {
    icon: Globe,
    title: "Public Course Catalog",
    desc: "Guests can browse courses, search topics, and view syllabi before registering.",
  },
];

const roles = [
  {
    icon: GraduationCap,
    title: "Instructors",
    desc: "Create courses, upload materials (video, docs), and manage assessments.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: BookOpen,
    title: "Students",
    desc: "Enroll in courses, study at your own pace, and track your learning path.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Administrators",
    desc: "Oversee system operations, user accounts, and content quality.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Globe,
    title: "Guests",
    desc: "Browse the course catalog, search topics, and view syllabi before signing up.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span>OLMS</span>
          </Link>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link to="/profile">
                <Button size="sm">My Profile</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <LogIn className="h-4 w-4" /> Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="gap-1.5">
                    <UserPlus className="h-4 w-4" /> Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_70%)]" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Online Learning Management System
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Learn Without{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Boundaries
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            OLMS is a centralized web-based platform bridging the gap between traditional education
            and digital accessibility. Instructors create, students learn, and administrators
            oversee — all in one place with automated progress tracking.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {isAuthenticated ? (
              <Link to="/profile">
                <Button size="lg" className="gap-2">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    Sign in
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="border-t border-border/40 bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Built for Every Role</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Whether you teach, learn, or manage — OLMS is designed around your needs.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r) => (
              <Card key={r.title} className="border-border/50 bg-background">
                <CardContent className="flex flex-col items-start gap-3 p-6">
                  <div className={`rounded-lg p-2.5 ${r.bg}`}>
                    <r.icon className={`h-5 w-5 ${r.color}`} />
                  </div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Major Features</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            A comprehensive suite of tools powering the complete learning lifecycle.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="group border-border/50 transition-colors hover:border-primary/30">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="rounded-lg bg-primary/10 p-2.5 w-fit transition-colors group-hover:bg-primary/20">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-muted/30 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to Start Learning?</h2>
          <p className="mt-3 text-muted-foreground">
            Join OLMS today and experience a modern, digital-first approach to education.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {!isAuthenticated && (
              <>
                <Link to="/register">
                  <Button size="lg" className="gap-2">
                    Create an Account <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    Sign in
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} OLMS — Online Learning Management System
        </div>
      </footer>
    </div>
  );
};

export default Index;
