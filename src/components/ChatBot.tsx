import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface ChatBotProps {
  page: "home" | "barbers" | "ai-assistant" | "booking";
}

const ChatBot = ({ page }: ChatBotProps) => {
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const isGreeting = (message: string) => {
    const lowerMessage = message.toLowerCase();
    const greetings = ['halo', 'hai', 'hello', 'hi', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'hei', 'hey'];
    return greetings.some(greeting => lowerMessage.includes(greeting));
  };

  const isRelevantQuestion = (message: string) => {
    const lowerMessage = message.toLowerCase();
    const relevantKeywords = [
      'barber', 'potong', 'rambut', 'haircut', 'cukur', 'shave', 'beard', 'jenggot',
      'booking', 'pesan', 'janji', 'appointment', 'reservasi', 'layanan', 'service',
      'harga', 'price', 'biaya', 'cost', 'jam', 'waktu', 'time', 'buka', 'tutup',
      'lokasi', 'alamat', 'location', 'address', 'cara', 'how', 'bagaimana',
      'ai', 'rekomendasi', 'recommendation', 'style', 'gaya', 'foto', 'photo',
      'upload', 'barbers', 'pilih', 'choose', 'rating', 'review', 'ulasan',
      'langkah', 'step', 'ubah', 'cancel', 'reschedule', 'elite', 'cuts',
      'premium', 'expert', 'fade', 'classic', 'modern', 'trending', 'akurat',
      'anak', 'children', 'kapster', 'pembayaran', 'payment', 'qris', 'cash',
      'tunai', 'kredit', 'debit', 'hubungi', 'contact', 'whatsapp', 'telepon',
      'paket', 'package', 'creambath', 'coloring', 'warna', 'walk-in', 'datang',
      'sosial', 'social', 'media', 'instagram', 'tiktok', 'youtube', 'follow',
      'subscribe', 'promo'
    ];
    
    return relevantKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const getContextualHelp = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Show greeting if no message (first time)
    if (userMessage.trim() === "") {
      // Context-aware greeting based on page
      if (page === "home") {
        return "Selamat datang di Elite Cuts! Kami menawarkan layanan barbershop premium. Anda bisa melihat layanan kami, memilih barber favorit, atau mencoba AI Style Assistant untuk rekomendasi gaya rambut.";
      }
      if (page === "barbers") {
        return "Halaman ini menampilkan barber profesional kami. Setiap barber memiliki spesialisasi dan pengalaman berbeda. Klik tombol 'Book' untuk membuat janji dengan barber pilihan Anda.";
      }
      if (page === "ai-assistant") {
        return "AI Style Assistant membantu Anda menemukan gaya rambut yang sempurna! Upload foto Anda untuk analisis personal atau dapatkan rekomendasi cepat gaya trending.";
      }
      if (page === "booking") {
        return "Halaman booking ini memudahkan Anda membuat janji. Pilih layanan, barber, tanggal, dan waktu yang Anda inginkan, lalu klik Confirm Booking.";
      }
    }

    // Respond to greetings
    if (isGreeting(userMessage)) {
      return "Halo! Selamat datang di Elite Cuts! 👋 Saya siap membantu Anda. Silakan tanyakan apa saja tentang layanan kami, cara booking, atau informasi lainnya.";
    }

    // Check if question is out of context (only for actual questions)
    if (!isRelevantQuestion(userMessage)) {
      return "Mohon maaf, saya tidak tahu jawaban dari pertanyaan Anda. Untuk informasi lebih lanjut, mohon hubungi customer service di +62 857-7198-3031.";
    }

    // General FAQ responses (applicable to all pages)
    if (lowerMessage.includes("lokasi") || lowerMessage.includes("alamat") || lowerMessage.includes("location") || lowerMessage.includes("address")) {
      return "Kami berlokasi di Ruko Ruby Commercial, Jl. Bulevar Selatan Blok TA, RT.003/RW.005, Marga Mulya, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17142. Anda bisa menemukan kami dengan mudah di Google Maps dengan mencari 'Elite Cuts'!";
    }

    if (lowerMessage.includes("jam") && (lowerMessage.includes("buka") || lowerMessage.includes("operasional") || lowerMessage.includes("tutup"))) {
      return "Kami buka setiap hari:\n• Senin - Jumat: 10:00 - 21:00\n• Sabtu - Minggu: 09:00 - 20:00\n\nPastikan Anda booking terlebih dahulu untuk mengamankan jadwal Anda.";
    }

    if (lowerMessage.includes("hubungi") || lowerMessage.includes("contact") || lowerMessage.includes("whatsapp") || lowerMessage.includes("telepon")) {
      return "Anda bisa menghubungi kami melalui WhatsApp atau telepon di +62 857-7198-3031. Jangan ragu untuk bertanya ya!";
    }

    if (lowerMessage.includes("pembayaran") || lowerMessage.includes("payment") || lowerMessage.includes("bayar")) {
      return "Kami menerima pembayaran tunai, kartu debit/kredit, dan semua dompet digital melalui QRIS. Pilih metode yang paling nyaman untuk Anda!";
    }

    if (lowerMessage.includes("anak") || lowerMessage.includes("children") || lowerMessage.includes("kid")) {
      return "Ya, kami memiliki kapster yang berpengalaman dan sabar dalam menangani pelanggan anak-anak agar mereka nyaman dan mendapatkan hasil potongan yang rapi.";
    }

    if (lowerMessage.includes("walk-in") || lowerMessage.includes("langsung datang")) {
      return "Kami sangat menyarankan untuk membuat janji temu terlebih dahulu untuk memastikan Anda mendapatkan slot. Namun, kami tetap melayani walk-in jika ada kapster yang tersedia.";
    }

    if (lowerMessage.includes("paket") || lowerMessage.includes("package")) {
      return "Tentu! Kami punya paket 'Elite Experience' yang mencakup potong rambut, cuci, dan pijat kepala dengan harga spesial. Sangat cocok untuk relaksasi!";
    }

    if (lowerMessage.includes("sosial") || lowerMessage.includes("social") || lowerMessage.includes("media") || lowerMessage.includes("instagram") || lowerMessage.includes("tiktok") || lowerMessage.includes("youtube") || lowerMessage.includes("follow") || lowerMessage.includes("promo")) {
      return "Tentu! Jangan lupa follow kami di Instagram @elitecuts07, TikTok @elitecuts07, dan subscribe channel YouTube kami di elitecuts07 untuk melihat hasil karya kami dan info promo terbaru!";
    }

    // Context-aware responses based on page
    if (page === "home") {
      if (lowerMessage.includes("layanan") || lowerMessage.includes("service") || lowerMessage.includes("tersedia")) {
        return "Kami menyediakan berbagai layanan premium:\n• Classic Haircut (Rp 150.000)\n• Beard Trim (Rp 75.000)\n• Royal Shave (Rp 100.000)\n• Creambath\n• Pewarnaan Rambut (Hair Coloring)\n• Paket perawatan lengkap\n\nKlik 'Book Now' untuk reservasi!";
      }
      if (lowerMessage.includes("harga") || lowerMessage.includes("price") || lowerMessage.includes("biaya") || lowerMessage.includes("cost")) {
        return "Harga potong rambut (Gentleman's Cut) kami mulai dari Rp 150.000. Harga sudah termasuk cuci, styling, dan konsultasi dengan kapster profesional kami.";
      }
      if (lowerMessage.includes("booking") || lowerMessage.includes("pesan")) {
        return "Cara termudah adalah melalui tombol 'Book Appointment' di bagian atas. Anda bisa memilih layanan, kapster favorit, dan jadwal yang Anda inginkan secara online.";
      }
      return "Anda bisa bertanya tentang layanan, harga, cara booking, atau fitur-fitur kami yang lain.";
    }

    if (page === "barbers") {
      if (lowerMessage.includes("pilih") || lowerMessage.includes("choose") || lowerMessage.includes("siapa") || lowerMessage.includes("kapster")) {
        return "Kami memiliki tim kapster profesional dan bersertifikat. Setiap barber memiliki spesialisasi berbeda. Marcus Rodriguez ahli di Classic Cuts, James Wilson di Modern Styles, dan David Chen di Beard Specialist. Klik 'Book' untuk memilih favorit Anda!";
      }
      if (lowerMessage.includes("rating") || lowerMessage.includes("review")) {
        return "Semua barber kami memiliki rating tinggi berdasarkan ulasan pelanggan. Anda bisa melihat jumlah review di setiap kartu barber.";
      }
      return "Anda bisa bertanya tentang spesialisasi barber, cara memilih, atau rating mereka.";
    }

    if (page === "ai-assistant") {
      if (lowerMessage.includes("cara") || lowerMessage.includes("how") || lowerMessage.includes("gunakan")) {
        return "Sangat mudah! Ada 2 cara: 1) Upload foto Anda untuk analisis AI dan rekomendasi personal, atau 2) Klik 'Get Quick Recommendations' untuk melihat gaya rambut trending yang cocok untuk Anda.";
      }
      if (lowerMessage.includes("foto") || lowerMessage.includes("upload")) {
        return "Klik tombol 'Upload Your Photo' dan pilih foto selfie Anda. AI kami akan menganalisis bentuk wajah dan memberikan rekomendasi gaya rambut yang paling cocok untuk Anda.";
      }
      if (lowerMessage.includes("akurat") || lowerMessage.includes("accurate")) {
        return "AI kami menggunakan teknologi pengenalan wajah untuk menganalisis bentuk wajah Anda dan memberikan rekomendasi berdasarkan database gaya rambut yang sesuai dengan karakteristik wajah Anda.";
      }
      return "Anda bisa bertanya cara menggunakan AI, upload foto, atau akurasi rekomendasi.";
    }

    if (page === "booking") {
      if (lowerMessage.includes("langkah") || lowerMessage.includes("step") || lowerMessage.includes("cara")) {
        return "Langkah booking: 1) Pilih layanan yang diinginkan, 2) Pilih barber favorit Anda, 3) Tentukan tanggal di kalender, 4) Pilih waktu yang tersedia, 5) Klik 'Confirm Booking'.";
      }
      if (lowerMessage.includes("waktu") || lowerMessage.includes("jam") || lowerMessage.includes("time")) {
        return "Kami buka dari jam 09:00 - 20:00. Pilih tanggal terlebih dahulu, lalu pilih slot waktu yang tersedia. Setiap sesi memiliki durasi sesuai layanan yang dipilih.";
      }
      if (lowerMessage.includes("ubah") || lowerMessage.includes("cancel") || lowerMessage.includes("reschedule") || lowerMessage.includes("batal")) {
        return "Untuk mengubah jadwal atau membatalkan, mohon hubungi kami via WhatsApp di +62 857-7198-3031 minimal 3 jam sebelum jadwal Anda agar kami bisa menyesuaikannya.";
      }
      return "Anda bisa bertanya tentang langkah booking, jam operasional, atau cara mengubah booking.";
    }

    return "Silakan tanyakan hal spesifik tentang halaman ini dan saya akan membantu Anda.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = { text: getContextualHelp(input), isBot: true };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);

    setInput("");
  };

  const handleQuickQuestion = (question: string) => {
    setMessages([
      { text: question, isBot: false },
      { text: getContextualHelp(question), isBot: true },
    ]);
  };

  const getQuickQuestions = () => {
    switch (page) {
      case "home":
        return ["Apa saja layanan yang tersedia?", "Berapa harga potong rambut?", "Jam buka hari apa?"];
      case "barbers":
        return ["Siapa saja kapster di Elite Cuts?", "Bagaimana memilih barber?"];
      case "ai-assistant":
        return ["Bagaimana cara menggunakan AI?", "Apakah hasilnya akurat?"];
      case "booking":
        return ["Langkah-langkah booking?", "Metode pembayaran apa saja?"];
      default:
        return [];
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50 bg-primary"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 sm:w-96 h-[500px] flex flex-col p-0 mr-4 mb-2"
        align="end"
        side="top"
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 rounded-t-md">
          <h3 className="font-semibold text-lg">Chat Assistant</h3>
          <p className="text-sm opacity-90">Bagaimana saya bisa membantu Anda?</p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                {getContextualHelp("")}
              </p>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Pertanyaan Cepat:
              </p>
              {getQuickQuestions().map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto py-2 px-3 whitespace-normal"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      msg.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Ketik pertanyaan Anda..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBot;
