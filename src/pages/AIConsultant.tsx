import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Scissors, ArrowLeft, Sparkles, Upload, Wand2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ChatBot from "@/components/ChatBot";

interface HairstyleRecommendation {
  name: string;
  description: string;
  suitableFor: string;
  maintenance: string;
}

const AIConsultant = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<HairstyleRecommendation[]>([]);

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(file);
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('analyze-hairstyle', {
        body: { imageData: base64Image }
      });

      if (error) {
        console.error('Error analyzing image:', error);
        throw new Error(error.message || 'Failed to analyze image');
      }

      if (data?.recommendations && Array.isArray(data.recommendations)) {
        setRecommendations(data.recommendations);
        setShowRecommendations(true);
        toast.success("Analysis complete! Here are your personalized recommendations.");
      } else {
        throw new Error('Invalid response from AI');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
      // Reset the input
      e.target.value = '';
    }
  };

  const handleRandomRecommendations = async () => {
    setIsAnalyzing(true);
    
    try {
      // Call the edge function for random recommendations
      const { data, error } = await supabase.functions.invoke('random-hairstyle-recommendations');

      if (error) {
        console.error('Error getting recommendations:', error);
        throw new Error(error.message || 'Failed to get recommendations');
      }

      if (data?.recommendations && Array.isArray(data.recommendations)) {
        setRecommendations(data.recommendations);
        setShowRecommendations(true);
        toast.success("Here are your trending hairstyle recommendations!");
      } else {
        throw new Error('Invalid response from AI');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to get recommendations. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Elite Cuts
            </span>
          </Link>
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Technology</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">AI Style Assistant</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get personalized hairstyle recommendations based on your face shape, style preferences, and current trends
            </p>
          </div>

          {!showRecommendations ? (
            <Card className="p-8 bg-gradient-card border-primary/20 max-w-2xl mx-auto">
              <div className="text-center">
                <Wand2 className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Start Your Style Journey</h2>
                <p className="text-muted-foreground mb-8">
                  Upload your photo for personalized recommendations or get instant trending styles
                </p>

                <div className="space-y-4">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full text-lg py-6"
                    onClick={() => navigate('/quick-recommendations')}
                    disabled={isAnalyzing}
                  >
                    <Upload className="h-6 w-6" />
                    Upload Your Photo
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-lg py-6"
                    onClick={handleRandomRecommendations}
                    disabled={isAnalyzing}
                  >
                    <Sparkles className="h-6 w-6" />
                    {isAnalyzing ? "Generating..." : "Get Quick Recommendations"}
                  </Button>
                </div>

                {isAnalyzing && (
                  <div className="mt-8">
                    <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-6 py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-sm font-medium text-primary">
                        AI is analyzing your photo...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Your Personalized Recommendations</h2>
                <p className="text-muted-foreground">
                  Our AI has selected these styles that would look great on you
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.map((style, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-gradient-card border-primary/20 hover:border-primary hover:shadow-glow transition-smooth"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Scissors className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{style.name}</h3>
                        <p className="text-muted-foreground text-sm">{style.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-medium text-primary">Best for:</span>
                        <span className="text-sm text-muted-foreground">{style.suitableFor}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-medium text-primary">Maintenance:</span>
                        <span className="text-sm text-muted-foreground">{style.maintenance}</span>
                      </div>
                    </div>

                    <Link to="/booking">
                      <Button variant="outline" className="w-full">
                        Book This Style
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowRecommendations(false)}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatBot page="ai-assistant" />
    </div>
  );
};

export default AIConsultant;
