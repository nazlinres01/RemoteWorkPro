import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";
import CompanyCard from "@/components/company-card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import type { CompanyWithJobCount } from "@shared/schema";

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");

  const { data: companies, isLoading } = useQuery<CompanyWithJobCount[]>({
    queryKey: ["/api/companies"],
  });

  const filteredCompanies = companies?.filter(company => {
    const matchesSearch = !searchQuery || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = !industryFilter || company.industry.includes(industryFilter);
    const matchesSize = !sizeFilter || company.size.includes(sizeFilter);
    
    return matchesSearch && matchesIndustry && matchesSize;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Uzaktan Çalışan Şirketler
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Dünyanın en inovatif şirketlerinde kariyerinizi ilerletin. Remote-first kültürü benimseyen şirketleri keşfedin.
          </p>
          <div className="flex items-center justify-center text-white/80 space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold">{companies?.length || 0}</div>
              <div className="text-sm">Şirket</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{companies?.reduce((sum, c) => sum + c.jobCount, 0) || 0}</div>
              <div className="text-sm">Açık Pozisyon</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm">Ülke</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Şirket adı veya açıklama ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sektör" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tüm Sektörler</SelectItem>
                  <SelectItem value="Fintech">Fintech</SelectItem>
                  <SelectItem value="Design">Design & Branding</SelectItem>
                  <SelectItem value="Cloud">Cloud Infrastructure</SelectItem>
                  <SelectItem value="SaaS">SaaS & Productivity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Şirket Büyüklüğü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tüm Büyüklükler</SelectItem>
                  <SelectItem value="50">1-50 çalışan</SelectItem>
                  <SelectItem value="100">50-100 çalışan</SelectItem>
                  <SelectItem value="250">100-250 çalışan</SelectItem>
                  <SelectItem value="500">250+ çalışan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isLoading ? "Yükleniyor..." : `${filteredCompanies?.length || 0} şirket bulundu`}
            </h2>
            <p className="text-slate-600 mt-1">Uzaktan çalışma imkanı sunan şirketler</p>
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Daha Fazla Filtre
          </Button>
        </div>

        {/* Companies Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-96 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompanies?.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredCompanies?.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Şirket bulunamadı</h3>
            <p className="text-slate-600 mb-6">Arama kriterlerinizi değiştirmeyi deneyin</p>
            <Button onClick={() => {
              setSearchQuery("");
              setIndustryFilter("");
              setSizeFilter("");
            }}>
              Filtreleri Temizle
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredCompanies && filteredCompanies.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" className="px-8">
              Daha Fazla Yükle
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}