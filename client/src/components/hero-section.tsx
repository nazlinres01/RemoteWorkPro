import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    // In a real app, this would trigger a search
    console.log("Searching for:", searchQuery, "in", location);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-20 h-20 bg-white/10 rounded-xl backdrop-blur-sm"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Uzaktan Çalışma
            <span className="text-accent-gradient block">
              Geleceğin İşi
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Dünyanın her yerinden en iyi uzaktan iş fırsatlarını keşfedin. Modern teknoloji şirketlerinde kariyerinizi ilerletin.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl mb-16">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="İş pozisyonu veya anahtar kelime"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-12 h-12 text-base focus-ring"
                  />
                </div>
              </div>
              <div>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12 text-base focus-ring">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-slate-400 mr-2" />
                      <SelectValue placeholder="Tüm Lokasyonlar" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tüm Lokasyonlar</SelectItem>
                    <SelectItem value="fully-remote">Tamamen Uzaktan</SelectItem>
                    <SelectItem value="hybrid">Hibrit</SelectItem>
                    <SelectItem value="timezone-specific">Avrupa Saati</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSearch}
                className="h-12 text-base btn-gradient shadow-lg hover:shadow-xl font-semibold"
              >
                <Search className="w-5 h-5 mr-2" />
                Ara
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15,000+</div>
              <div className="text-white/80">Aktif İş İlanı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2,500+</div>
              <div className="text-white/80">Teknoloji Şirketi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-white/80">Uzaktan Pozisyon</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Ülke</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
