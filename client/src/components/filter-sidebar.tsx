import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void;
}

export default function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    type: [] as string[],
    experienceLevel: [] as string[],
    remoteType: [] as string[],
    salaryMin: "",
    salaryMax: "",
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    const currentValues = filters[category as keyof typeof filters] as string[];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    handleFilterChange(category, newValues);
  };

  const applyFilters = () => {
    onFiltersChange(filters);
  };

  return (
    <div className="lg:w-80 space-y-6">
      <Card className="filter-sidebar shadow-lg border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Filter className="mr-2 text-primary w-5 h-5" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Job Type Filter */}
          <div>
            <h4 className="font-medium text-slate-700 mb-3">İş Tipi</h4>
            <div className="space-y-2">
              {[
                { value: "full-time", label: "Tam Zamanlı", count: 2345 },
                { value: "part-time", label: "Yarı Zamanlı", count: 567 },
                { value: "freelance", label: "Freelance", count: 890 },
              ].map((type) => (
                <div key={type.value} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={type.value}
                      checked={filters.type.includes(type.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange("type", type.value, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={type.value}
                      className="text-slate-600 cursor-pointer hover:text-slate-800 transition-colors"
                    >
                      {type.label}
                    </Label>
                  </div>
                  <span className="text-sm text-slate-400">({type.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <h4 className="font-medium text-slate-700 mb-3">Deneyim Seviyesi</h4>
            <div className="space-y-2">
              {[
                { value: "entry", label: "Giriş Seviyesi" },
                { value: "mid", label: "Orta Seviye" },
                { value: "senior", label: "Üst Seviye" },
              ].map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={level.value}
                    checked={filters.experienceLevel.includes(level.value)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("experienceLevel", level.value, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={level.value}
                    className="text-slate-600 cursor-pointer hover:text-slate-800 transition-colors"
                  >
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <h4 className="font-medium text-slate-700 mb-3">Maaş Aralığı (USD)</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.salaryMin}
                  onChange={(e) => handleFilterChange("salaryMin", e.target.value)}
                  className="text-sm focus-ring"
                />
                <span className="text-slate-400">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.salaryMax}
                  onChange={(e) => handleFilterChange("salaryMax", e.target.value)}
                  className="text-sm focus-ring"
                />
              </div>
            </div>
          </div>

          {/* Remote Type */}
          <div>
            <h4 className="font-medium text-slate-700 mb-3">Çalışma Şekli</h4>
            <div className="space-y-2">
              {[
                { value: "fully-remote", label: "Tamamen Uzaktan" },
                { value: "hybrid", label: "Hibrit" },
                { value: "timezone-specific", label: "Belirli Saat Dilimi" },
              ].map((remote) => (
                <div key={remote.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={remote.value}
                    checked={filters.remoteType.includes(remote.value)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("remoteType", remote.value, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={remote.value}
                    className="text-slate-600 cursor-pointer hover:text-slate-800 transition-colors"
                  >
                    {remote.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={applyFilters}
            className="w-full btn-gradient font-medium"
          >
            Filtreleri Uygula
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
