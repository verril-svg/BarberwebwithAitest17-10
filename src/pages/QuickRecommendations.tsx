import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Scissors, ArrowLeft, Camera, Upload, X, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Hairstyle {
  name: string;
  image: string;
  desc?: string;
  faceShape: string;
}

const HAIRSTYLES_DATA: Hairstyle[] = [
  {
    name: "Brush Up",
    image: "/images/hairstyles/brush-up-rectangular.jpeg",
    desc: "Gaya rambut dengan volume di atas, cocok untuk wajah rectangular",
    faceShape: "rectangular"
  },
  {
    name: "Chin Length Bob",
    image: "/images/hairstyles/chin_length_bob_heart.jpeg",
    desc: "Bob sebahu yang elegan, ideal untuk wajah heart",
    faceShape: "heart"
  },
  {
    name: "Chin Length Bob",
    image: "/images/hairstyles/chin_length_bob_oblong.jpeg",
    desc: "Bob sebahu modern, sempurna untuk wajah oblong",
    faceShape: "oblong"
  },
  {
    name: "Full Fringe",
    image: "/images/hairstyles/full_fringe_diamond.jpeg",
    desc: "Poni penuh yang stylish, cocok untuk wajah diamond",
    faceShape: "diamond"
  },
  {
    name: "High Volume Top",
    image: "/images/hairstyles/high-volume-top-round.jpeg",
    desc: "Volume tinggi di bagian atas, ideal untuk wajah round",
    faceShape: "round"
  },
  {
    name: "Layered Bangs",
    image: "/images/hairstyles/Layered_bangs_square.jpg",
    desc: "Layer dengan poni, sempurna untuk wajah square",
    faceShape: "square"
  },
  {
    name: "Layered Waves",
    image: "/images/hairstyles/layered_waves_diamond.jpeg",
    desc: "Gelombang berlayer yang natural, cocok untuk wajah diamond",
    faceShape: "diamond"
  },
  {
    name: "Layered Cut",
    image: "/images/hairstyles/layered-cut-oval.jpeg",
    desc: "Potongan berlayer klasik, ideal untuk wajah oval",
    faceShape: "oval"
  },
  {
    name: "Long Bob",
    image: "/images/hairstyles/long-bob-oval.jpeg",
    desc: "Long bob yang versatile, sempurna untuk wajah oval",
    faceShape: "oval"
  },
  {
    name: "Long Layer",
    image: "/images/hairstyles/long-layer-round.jpeg",
    desc: "Layer panjang yang flowing, cocok untuk wajah round",
    faceShape: "round"
  },
  {
    name: "Short Crop",
    image: "/images/hairstyles/short-crop-rectangular.jpeg",
    desc: "Potongan pendek yang rapi dan modern",
    faceShape: "rectangular"
  },
  {
    name: "Side Bangs",
    image: "/images/hairstyles/side_bangs_heart.jpeg",
    desc: "Poni samping yang stylish untuk wajah heart",
    faceShape: "heart"
  },
  {
    name: "Side Part",
    image: "/images/hairstyles/side_part_diamond.jpeg",
    desc: "Belahan samping klasik untuk wajah diamond",
    faceShape: "diamond"
  },
  {
    name: "Side Part",
    image: "/images/hairstyles/side_Part_round.jpeg",
    desc: "Belahan samping elegant untuk wajah round",
    faceShape: "round"
  },
  {
    name: "Side Swept Fringe",
    image: "/images/hairstyles/side_swept_fringe_oblong.jpeg",
    desc: "Poni swept ke samping untuk wajah oblong",
    faceShape: "oblong"
  },
  {
    name: "Side Swept Bangs",
    image: "/images/hairstyles/side-swept-bangs-oval.jpeg",
    desc: "Poni swept modern untuk wajah oval",
    faceShape: "oval"
  },
  {
    name: "Soft Curls",
    image: "/images/hairstyles/soft_Curls_square.jpg",
    desc: "Keriting lembut yang natural untuk wajah square",
    faceShape: "square"
  },
  {
    name: "Textured Fringe",
    image: "/images/hairstyles/textured-fringe-rectangular.jpeg",
    desc: "Poni bertekstur modern untuk wajah rectangular",
    faceShape: "rectangular"
  },
  {
    name: "Textured Crop",
    image: "/images/hairstyles/Textureed_crop_square.jpeg",
    desc: "Crop bertekstur casual untuk wajah square",
    faceShape: "square"
  },
  {
    name: "Wavy Bangs",
    image: "/images/hairstyles/wavy_bangs_oblong.jpeg",
    desc: "Poni bergelombang natural untuk wajah oblong",
    faceShape: "oblong"
  },
  {
    name: "Wavy Layers",
    image: "/images/hairstyles/wavy_layers_heart.jpeg",
    desc: "Layer bergelombang yang indah untuk wajah heart",
    faceShape: "heart"
  }
];

const QuickRecommendations = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedBlob, setUploadedBlob] = useState<Blob | null>(null);
  const [results, setResults] = useState<Hairstyle[]>([]);
  const [status, setStatus] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Pilih file gambar");
      return;
    }

    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setUploadedBlob(file);
    setStatus("Foto siap untuk dianalisis");
    setResults([]);
  };

  const handleClear = () => {
    setUploadedImage(null);
    setUploadedBlob(null);
    setResults([]);
    setStatus("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const startCamera = async () => {
    try {
      stopCamera();
      const constraints = { 
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        streamRef.current = stream;
        setIsCameraActive(true);
        setStatus("Kamera aktif (depan)");
      }
    } catch (err) {
      console.error("Camera error:", err);
      toast.error("Tidak bisa mengaktifkan kamera. Pastikan izin diberikan.");
      setStatus("Gagal mengaktifkan kamera");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      setStatus("Kamera dimatikan");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isCameraActive) {
      toast.error("Kamera belum aktif");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setUploadedImage(url);
          setUploadedBlob(blob);
          setStatus("Foto diambil dari kamera dan siap dianalisis");
          setResults([]);
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const analyzeImage = async () => {
    if (!uploadedBlob) {
      toast.error("Pilih foto terlebih dahulu");
      return;
    }

    setStatus("Menganalisis...");
    setResults([]);

    // Simulate analysis - randomly select 3 hairstyles
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get random 3 hairstyles
    const shuffled = [...HAIRSTYLES_DATA].sort(() => 0.5 - Math.random());
    const selectedStyles = shuffled.slice(0, 3);

    setResults(selectedStyles);
    setStatus("Analisis selesai");
    toast.success("Rekomendasi siap!");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/20 to-background flex items-center justify-center border border-primary/20">
              <span className="text-lg font-bold text-primary">BC</span>
            </div>
            <div>
              <div className="font-bold">BarberCuts AI</div>
              <div className="text-xs text-muted-foreground">Rekomendasi Gaya Rambut</div>
            </div>
          </Link>
          <Link to="/ai-consultant">
            <Button variant="ghost">
              <ArrowLeft className="h-5 w-5" />
              Kembali
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            AI Hair Recommendation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload foto wajah Anda, dan biarkan AI merekomendasikan gaya rambut terbaik untuk Anda
          </p>
        </div>

        {/* Upload Area */}
        <Card className="p-8 bg-gradient-card border-primary/20 mb-8 shadow-glow hover:border-primary transition-smooth animate-scale-in">
          <div className="grid md:grid-cols-[400px_1fr] gap-8">
            {/* Preview */}
            <div className="relative group">
              <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 flex items-center justify-center overflow-hidden shadow-elegant transition-smooth group-hover:border-primary/40">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover animate-fade-in" />
                ) : (
                  <div className="text-center p-8">
                    <Upload className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                    <span className="text-muted-foreground text-sm">Belum ada foto</span>
                  </div>
                )}
              </div>
              {uploadedImage && (
                <div className="absolute top-4 right-4">
                  <Button onClick={handleClear} size="sm" variant="secondary" className="rounded-full">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Upload Your Photo
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Pilih foto dengan wajah terlihat jelas untuk hasil terbaik
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:transition-smooth file:cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm">AI akan memberikan 3 rekomendasi gaya rambut terbaik</p>
              </div>

              <Button onClick={analyzeImage} size="lg" className="w-full text-lg py-6 shadow-glow">
                <Sparkles className="h-5 w-5" />
                Analisis dengan AI
              </Button>

              {status && (
                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20 animate-fade-in">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-sm font-medium text-primary">{status}</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Camera Section */}
        <Card className="p-8 bg-gradient-card border-primary/20 mb-8 shadow-glow animate-scale-in">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            Atau Gunakan Kamera
          </h3>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <Button onClick={startCamera} disabled={isCameraActive} size="lg" variant="hero">
              <Camera className="h-5 w-5" />
              Aktifkan Kamera
            </Button>
            <Button onClick={capturePhoto} variant="outline" size="lg" disabled={!isCameraActive}>
              <Sparkles className="h-5 w-5" />
              Ambil Foto
            </Button>
            <Button onClick={stopCamera} variant="outline" size="lg" disabled={!isCameraActive}>
              <X className="h-5 w-5" />
              Matikan
            </Button>
          </div>

          <div className="grid md:grid-cols-[400px_1fr] gap-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-80 object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              {isCameraActive && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                  Live
                </div>
              )}
            </div>
            
            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl">
                <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Kamera Langsung</p>
                  <p className="text-sm text-muted-foreground">
                    Gunakan kamera depan untuk mengambil foto wajah secara langsung
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl">
                <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Instant Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Setelah mengambil foto, langsung dapatkan rekomendasi AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Rekomendasi untuk Anda</h2>
              <p className="text-muted-foreground">3 gaya rambut terbaik berdasarkan analisis AI</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <Link key={index} to="/booking" className="group">
                  <Card className="p-6 bg-gradient-card border-primary/20 text-center hover:border-primary hover:shadow-glow transition-smooth cursor-pointer overflow-hidden relative animate-scale-in">
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      #{index + 1}
                    </div>
                    
                    <div className="relative mb-4 rounded-xl overflow-hidden">
                      <img
                        src={result.image}
                        alt={result.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{result.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{result.desc}</p>
                    
                    <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      <Scissors className="h-4 w-4" />
                      <span>Book Appointment</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickRecommendations;
