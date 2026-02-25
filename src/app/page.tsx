
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, BookOpen, LayoutDashboard } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary mb-4 font-headline">
          Acumen<span className="text-accent">Flow</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Enterprise-grade Training Lifecycle Management for the modern workforce. 
          Compliance, verification, and learning—streamlined.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-primary">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Administrators</CardTitle>
            <CardDescription>Manage hierarchy, users, and global compliance reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard" passHref>
              <Button className="w-full">Enter Admin Console</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-accent">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <CardTitle>Trainers</CardTitle>
            <CardDescription>Schedule sessions, build assessments, and track progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/assessments" passHref>
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white">Trainer Access</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-primary">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Trainees</CardTitle>
            <CardDescription>Secure self-learning with AI identity verification.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/verify" passHref>
              <Button variant="secondary" className="w-full">Trainee Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-20 text-muted-foreground text-sm">
        &copy; {new Date().getFullYear()} AcumenFlow TLMS. All rights reserved.
      </footer>
    </div>
  );
}
