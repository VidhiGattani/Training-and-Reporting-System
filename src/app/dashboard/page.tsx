
import { StatCards } from "@/components/dashboard/stat-cards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, Download } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Overview Dashboard</h1>
          <p className="text-muted-foreground">Monitor training performance and compliance metrics.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Data
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" /> New Session
          </Button>
        </div>
      </div>

      <StatCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 overflow-hidden">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-1">
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Scheduled training across all campus sites.</CardDescription>
            </div>
            <Button size="sm" className="ml-auto gap-1">
              View All <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Safety Protocol 101", campus: "Main Campus", date: "Today, 2:00 PM", status: "Ongoing", color: "bg-green-500" },
                { title: "Leadership Workshop", campus: "West Campus", date: "Tomorrow, 10:00 AM", status: "Scheduled", color: "bg-blue-500" },
                { title: "Tech Skills BootCamp", campus: "South Regional", date: "May 25, 9:00 AM", status: "Scheduled", color: "bg-blue-500" },
                { title: "Customer Obsession", campus: "Main Campus", date: "May 26, 1:00 PM", status: "Review", color: "bg-orange-500" },
              ].map((session, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-secondary/20 transition-colors">
                  <div className={`h-2 w-2 rounded-full ${session.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{session.title}</p>
                    <p className="text-xs text-muted-foreground">{session.campus}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{session.date}</p>
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5">{session.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system logs and user updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { user: "Sarah Johnson", action: "Completed Assessment", time: "2 mins ago", detail: "Advanced Excel Proficiency" },
                { user: "Michael Chen", action: "Registered Trainee", time: "1 hour ago", detail: "Assigned to South Campus" },
                { user: "System AI", action: "Flagged Session", time: "3 hours ago", detail: "Face mismatch detected in session #421" },
                { user: "Admin", action: "New Course Added", time: "5 hours ago", detail: "Updated HR Ethics Policy 2024" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold">{log.user[0]}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-bold">{log.user}</span> {log.action}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">{log.detail}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
