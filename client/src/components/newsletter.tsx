import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      setEmail("");
      toast({
        title: "Başarılı!",
        description: "Newsletter'a başarıyla abone oldunuz.",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Newsletter aboneliğinde bir hata oluştu.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <section className="py-16 gradient-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-4">En Son İş Fırsatlarından Haberdar Olun</h2>
          <p className="text-xl text-white/90 mb-8">Size özel uzaktan iş fırsatlarını e-postanızla alın</p>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="E-posta adresinizi girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-base bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-white/50"
              />
              <Button 
                type="submit"
                disabled={subscribeMutation.isPending}
                className="bg-white hover:bg-slate-50 text-primary h-12 px-8 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5 mr-2" />
                {subscribeMutation.isPending ? "Abone Oluyor..." : "Abone Ol"}
              </Button>
            </form>
            <p className="text-white/80 text-sm mt-4">Günde sadece 1 e-posta, spam yok!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
