import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyCard from "./company-card";
import type { CompanyWithJobCount } from "@shared/schema";

export default function FeaturedCompanies() {
  const { data: companies, isLoading } = useQuery<CompanyWithJobCount[]>({
    queryKey: ["/api/companies"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="companies" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Öne Çıkan Şirketler</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Dünyanın en inovatif şirketlerinde kariyerinizi ilerletin</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies?.slice(0, 3).map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-gradient px-8 py-3 font-semibold">
            Tüm Şirketleri Gör
          </Button>
        </div>
      </div>
    </section>
  );
}
