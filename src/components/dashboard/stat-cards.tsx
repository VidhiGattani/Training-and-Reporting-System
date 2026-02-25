
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, CheckCircle, AlertCircle } from "lucide-react";

const stats = [
  {
    title: "Total Trainees",
    value: "2,482",
    description: "+12% from last month",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Active Sessions",
    value: "24",
    description: "Across 8 regional sites",
    icon: Calendar,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Compliance Rate",
    value: "94.2%",
    description: "+2.1% improvement",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Pending Verifications",
    value: "18",
    description: "Require admin review",
    icon: AlertCircle,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

export function StatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-md ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
