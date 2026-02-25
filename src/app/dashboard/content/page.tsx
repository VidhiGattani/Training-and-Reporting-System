
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, MoreVertical, Plus, Search, Filter } from "lucide-react";
import Image from "next/image";

const courses = [
  { id: 1, title: "Workplace Health & Safety", type: "Document", category: "Compliance", date: "May 12, 2024", icon: FileText, image: "https://picsum.photos/seed/h1/400/200" },
  { id: 2, title: "Leadership Excellence 2024", type: "Video", category: "Soft Skills", date: "May 15, 2024", icon: Video, image: "https://picsum.photos/seed/h2/400/200" },
  { id: 3, title: "Intro to Cybersecurity", type: "Interactive", category: "IT Security", date: "May 18, 2024", icon: FileText, image: "https://picsum.photos/seed/h3/400/200" },
  { id: 4, title: "Customer Service Mastery", type: "Video", category: "Operations", date: "May 20, 2024", icon: Video, image: "https://picsum.photos/seed/h4/400/200" },
];

export default function ContentPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Content Management</h1>
          <p className="text-muted-foreground">Upload and organize your digital training assets.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Upload Material
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search materials by title, tag, or category..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden group hover:shadow-md transition-all">
            <div className="relative aspect-video">
              <Image 
                src={course.image} 
                alt={course.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-white/90 text-primary hover:bg-white">{course.category}</Badge>
              </div>
            </div>
            <CardHeader className="p-4">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{course.title}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-2 pt-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <course.icon className="h-3 w-3" />
                <span>{course.type}</span>
                <span className="mx-1">•</span>
                <span>Added {course.date}</span>
              </div>
            </CardContent>
            <CardFooter className="px-4 pb-4 pt-0">
              <Button variant="secondary" className="w-full text-xs">Manage Content</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
