import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoryColor } from "@/lib/utils";
import { Code, Palette, TrendingUp, Users, Megaphone, Headphones } from "lucide-react";
import type { JobCategory } from "@shared/schema";

const iconMap = {
  "fas fa-code": Code,
  "fas fa-palette": Palette,
  "fas fa-chart-line": TrendingUp,
  "fas fa-users": Users,
  "fas fa-bullhorn": Megaphone,
  "fas fa-headset": Headphones,
};

export default function JobCategories() {
  const { data: categories, isLoading } = useQuery<JobCategory[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0 text-center">
                  <Skeleton className="w-12 h-12 rounded-xl mx-auto mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Popüler Kategoriler</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">En çok aranan uzaktan çalışma pozisyonlarını keşfedin</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories?.map((category) => {
            const color = getCategoryColor(category.name);
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code;
            
            return (
              <Card
                key={category.id}
                className={`group card-hover cursor-pointer bg-gradient-to-br from-${color}-50 to-${color}-100 border-${color}-200 hover:border-${color}-300`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-${color}-200 transition-colors duration-300`}>
                    <IconComponent className={`text-${color}-600 w-6 h-6`} />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2 text-sm">{category.name}</h3>
                  <p className="text-xs text-slate-600">{category.count?.toLocaleString()} pozisyon</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
