import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Search, Filter } from "lucide-react";
import JobCard from "@/components/job-card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import type { JobWithCompany } from "@shared/schema";

export default function SavedJobs() {
  // Mock user ID - in a real app this would come from authentication
  const userId = 1;

  const { data: savedJobs, isLoading } = useQuery<JobWithCompany[]>({
    queryKey: ["/api/saved-jobs", "user", userId],
    queryFn: () => fetch(`/api/saved-jobs/user/${userId}`).then(res => res.json()),
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-white mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Kayıtlı İşlerim
            </h1>
          </div>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Beğendiğiniz ve daha sonra başvurmayı planladığınız işler burada
          </p>
          <div className="flex items-center justify-center text-white/80 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{savedJobs?.length || 0}</div>
              <div className="text-sm">Kayıtlı İş</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm">Uzaktan</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isLoading ? "Yükleniyor..." : `${savedJobs?.length || 0} kayıtlı iş`}
            </h2>
            <p className="text-slate-600 mt-1">Beğendiğiniz işleri buradan takip edebilirsiniz</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Ara
            </Button>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
          </div>
        ) : savedJobs && savedJobs.length > 0 ? (
          <div className="space-y-6">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Henüz kayıtlı işiniz yok
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              İş ilanlarına göz atın ve beğendiklerinizi kaydedin. 
              Daha sonra buradan kolayca erişebilirsiniz.
            </p>
            <Button className="btn-gradient font-semibold px-8">
              İş İlanlarına Göz At
            </Button>
          </div>
        )}

        {/* Tips Section */}
        {savedJobs && savedJobs.length > 0 && (
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                İpuçları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Düzenli Takip Edin</h4>
                  <p className="text-slate-600 text-sm">
                    Kayıtlı işlerinizi düzenli olarak kontrol edin. Bazı pozisyonlar hızla dolabilir.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Başvuru Zamanlaması</h4>
                  <p className="text-slate-600 text-sm">
                    En beğendiğiniz pozisyonlara öncelik vererek başvurularınızı planlayın.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Profil Güncellemesi</h4>
                  <p className="text-slate-600 text-sm">
                    Başvuru yapmadan önce profilinizin güncel olduğundan emin olun.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Şirket Araştırması</h4>
                  <p className="text-slate-600 text-sm">
                    Başvuru öncesi şirket hakkında detaylı araştırma yapın.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}