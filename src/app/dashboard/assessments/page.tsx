
"use client";

import * as React from "react";
import { generateAssessmentQuestions, type TrainerAssessmentQuestionGeneratorOutput } from "@/ai/flows/trainer-genai-assessment-question-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AssessmentsPage() {
  const [trainingContent, setTrainingContent] = React.useState("");
  const [count, setCount] = React.useState(3);
  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState<TrainerAssessmentQuestionGeneratorOutput>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!trainingContent.trim()) {
      toast({ title: "Error", description: "Please provide some training content first.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await generateAssessmentQuestions({
        trainingContent,
        numberOfQuestions: count
      });
      setQuestions(result);
      toast({ title: "Success", description: `Generated ${result.length} questions successfully.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate questions. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Assessment Builder</h1>
        <p className="text-muted-foreground">Create quizzes manually or leverage AI to generate them from content.</p>
      </div>

      <Card className="border-accent/20">
        <CardHeader className="bg-accent/5">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            AI Question Generator
          </CardTitle>
          <CardDescription>Paste your training summary or outline below to generate multiple-choice questions automatically.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content">Training Content Summary</Label>
            <Textarea 
              id="content" 
              placeholder="e.g., This course covers the basics of fire safety, including the different types of extinguishers, emergency exit protocols, and how to report a fire hazard..." 
              className="min-h-[150px]"
              value={trainingContent}
              onChange={(e) => setTrainingContent(e.target.value)}
            />
          </div>
          <div className="flex items-end gap-4">
            <div className="grid gap-2 w-32">
              <Label htmlFor="count">Question Count</Label>
              <Input 
                id="count" 
                type="number" 
                min={1} 
                max={10} 
                value={count} 
                onChange={(e) => setCount(parseInt(e.target.value))} 
              />
            </div>
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="flex-1 bg-accent hover:bg-accent/90"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Questions
            </Button>
          </div>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Generated Questions Preview</h2>
            <Button variant="outline" onClick={() => setQuestions([])}>Clear All</Button>
          </div>
          
          {questions.map((q, idx) => (
            <Card key={idx} className="relative group overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">Question {idx + 1}</Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeQuestion(idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg leading-tight">{q.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {q.options.map((option, oIdx) => (
                    <div 
                      key={oIdx} 
                      className={cn(
                        "flex items-center p-3 rounded-lg border transition-colors",
                        option === q.correctAnswer 
                          ? "border-green-500 bg-green-50 text-green-700 font-medium" 
                          : "bg-background"
                      )}
                    >
                      <div className={cn(
                        "h-4 w-4 rounded-full border mr-3 flex items-center justify-center",
                        option === q.correctAnswer ? "bg-green-500 border-green-500" : "border-muted"
                      )}>
                        {option === q.correctAnswer && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      {option}
                      {option === q.correctAnswer && <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700 text-[10px]">Correct Answer</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button className="w-full h-12 text-lg">
            <Plus className="mr-2 h-5 w-5" /> Save Assessment to Library
          </Button>
        </div>
      )}
    </div>
  );
}

// Utility component Badge is used above
function Badge({ children, variant = "default", className }: { children: React.ReactNode, variant?: "default" | "secondary" | "outline", className?: string }) {
  const styles = {
    default: "bg-primary text-white",
    secondary: "bg-secondary text-primary",
    outline: "border border-input text-foreground"
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", styles[variant], className)}>
      {children}
    </span>
  );
}
