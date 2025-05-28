import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid, List } from "lucide-react";
import FilterSidebar from "./filter-sidebar";
import JobCard from "./job-card";
import type { JobWithCompany } from "@shared/schema";

export default function JobListings() {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: jobs, isLoading } = useQuery<JobWithCompany[]>({
    queryKey: ["/api/jobs", filters],
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const sortedJobs = jobs?.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      case "oldest":
        return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
      case "salary-high":
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      case "salary-low":
        return (a.salaryMin || 0) - (b.salaryMin || 0);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-80">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-48 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="jobs" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar onFiltersChange={handleFiltersChange} />
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">En Son İş İlanları</h2>
                <p className="text-slate-600 mt-1">{sortedJobs?.length || 0} pozisyon bulundu</p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">En Yeni</SelectItem>
                    <SelectItem value="oldest">En Eski</SelectItem>
                    <SelectItem value="salary-high">Maaş (Yüksek-Düşük)</SelectItem>
                    <SelectItem value="salary-low">Maaş (Düşük-Yüksek)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "text-primary bg-primary/10" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "text-primary bg-primary/10" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {sortedJobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {sortedJobs && sortedJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600">No jobs found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {sortedJobs && sortedJobs.length > 0 && (
              <div className="flex items-center justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" disabled>
                    Previous
                  </Button>
                  <Button size="sm" className="bg-primary text-white">1</Button>
                  <Button variant="ghost" size="sm">2</Button>
                  <Button variant="ghost" size="sm">3</Button>
                  <span className="px-4 py-2 text-slate-400">...</span>
                  <Button variant="ghost" size="sm">10</Button>
                  <Button variant="ghost" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
