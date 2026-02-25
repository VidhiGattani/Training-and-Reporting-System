
"use client";

import * as React from "react";
import { traineeGenAIIdentityVerification, type TraineeGenAIIdentityVerificationOutput } from "@/ai/flows/trainee-genai-identity-verification-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShieldCheck, User, Camera, Upload, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function VerifyPage() {
  const [currentPhoto, setCurrentPhoto] = React.useState<string | null>(null);
  const [referencePhoto, setReferencePhoto] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<TraineeGenAIIdentityVerificationOutput | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'current' | 'reference') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === 'current') setCurrentPhoto(base64);
        else setReferencePhoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = async () => {
    if (!currentPhoto || !referencePhoto) {
      toast({ title: "Error", description: "Please upload both photos for verification.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const verification = await traineeGenAIIdentityVerification({
        currentPhotoDataUri: currentPhoto,
        referencePhotoDataUri: referencePhoto,
        traineeName: "John Doe"
      });
      setResult(verification);
    } catch (error) {
      toast({ title: "Error", description: "Verification process failed. Please check image formats.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">AI Identity Verification</h1>
        <p className="text-muted-foreground">Confirm attendee authenticity using deep learning facial recognition.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <User className="h-4 w-4 text-primary" /> Reference Photo
            </CardTitle>
            <CardDescription>Official government ID or employee record photo.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden bg-secondary/30">
              {referencePhoto ? (
                <div className="relative h-full w-full">
                  <Image src={referencePhoto} alt="Reference" fill className="object-cover" />
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="absolute bottom-2 right-2"
                    onClick={() => setReferencePhoto(null)}
                  >Change</Button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center p-6 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                  <span className="text-sm font-medium">Click to upload reference image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'reference')} />
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Camera className="h-4 w-4 text-accent" /> Current Selfie
            </CardTitle>
            <CardDescription>Live snapshot captured during session login.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden bg-secondary/30">
              {currentPhoto ? (
                <div className="relative h-full w-full">
                  <Image src={currentPhoto} alt="Current" fill className="object-cover" />
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="absolute bottom-2 right-2"
                    onClick={() => setCurrentPhoto(null)}
                  >Retake</Button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center p-6 text-center">
                  <Camera className="h-10 w-10 text-muted-foreground mb-4" />
                  <span className="text-sm font-medium">Capture or upload current photo</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'current')} />
                </label>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-6">
        <Button 
          size="lg" 
          className="w-full max-w-md h-12 text-lg font-bold shadow-lg shadow-primary/20"
          disabled={!currentPhoto || !referencePhoto || loading}
          onClick={handleVerify}
        >
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ShieldCheck className="mr-2 h-5 w-5" />}
          Run Identity Validation
        </Button>

        {result && (
          <Card className={cn(
            "w-full max-w-2xl border-2 animate-in zoom-in-95 duration-300",
            result.isVerified ? "border-green-500 bg-green-50/50" : "border-destructive bg-destructive/5"
          )}>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {result.isVerified ? (
                  <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                ) : (
                  <div className="h-16 w-16 bg-destructive rounded-full flex items-center justify-center shadow-lg shadow-red-200">
                    <XCircle className="h-10 w-10 text-white" />
                  </div>
                )}
              </div>
              
              <h3 className={cn(
                "text-2xl font-bold mb-2",
                result.isVerified ? "text-green-700" : "text-destructive"
              )}>
                {result.isVerified ? "Identity Verified" : "Verification Failed"}
              </h3>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-sm font-medium text-muted-foreground">Confidence Score:</span>
                <span className="font-mono font-bold">{(result.confidenceScore * 100).toFixed(1)}%</span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-1000", result.isVerified ? "bg-green-500" : "bg-destructive")} 
                    style={{ width: `${result.confidenceScore * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-muted-foreground max-w-md mx-auto italic font-medium">
                "{result.reason}"
              </p>

              {result.isVerified && (
                <Button className="mt-8 bg-green-600 hover:bg-green-700 w-full md:w-auto">
                  Proceed to Training Module
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
