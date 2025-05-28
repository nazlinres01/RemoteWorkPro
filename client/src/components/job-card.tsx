import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, Users, DollarSign } from "lucide-react";
import { formatSalary, formatDate, getSkillColor } from "@/lib/utils";
import type { JobWithCompany } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface JobCardProps {
  job: JobWithCompany;
}

export default function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isSaved) {
        return apiRequest("DELETE", "/api/saved-jobs", { userId: 1, jobId: job.id });
      } else {
        return apiRequest("POST", "/api/saved-jobs", { userId: 1, jobId: job.id });
      }
    },
    onSuccess: () => {
      setIsSaved(!isSaved);
      toast({
        title: isSaved ? "İş kaydedildi" : "İş kaydı kaldırıldı",
        description: isSaved ? "İş kayıtlı işlerinize eklendi" : "İş kayıtlı işlerinizden kaldırıldı",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/saved-jobs"] });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const applyMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/applications", { 
        userId: 1, 
        jobId: job.id,
        coverLetter: ""
      });
    },
    onSuccess: () => {
      toast({
        title: "Başvuru gönderildi",
        description: "Başvurunuz başarıyla gönderildi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Başvuru gönderilemedi",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    saveMutation.mutate();
  };

  const handleApply = () => {
    applyMutation.mutate();
  };

  return (
    <Card className="group card-hover bg-white shadow-lg border border-slate-100 hover:border-primary/20 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <img 
              src={job.company.logo} 
              alt={`${job.company.name} logo`}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Link href={`/jobs/${job.id}`}>
                  <h3 className="text-xl font-semibold text-slate-800 group-hover:text-primary transition-colors cursor-pointer">
                    {job.title}
                  </h3>
                </Link>
                {job.featured && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Öne Çıkan
                  </Badge>
                )}
                {job.urgent && (
                  <Badge variant="destructive" className="bg-orange-100 text-orange-700">
                    Acil
                  </Badge>
                )}
                {new Date(job.createdAt!).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                  <Badge variant="outline" className="bg-green-100 text-green-700">
                    Yeni
                  </Badge>
                )}
              </div>
              <p className="text-slate-600 mb-3">
                {job.company.name} • {job.company.location} (Remote)
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed line-clamp-2">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.slice(0, 4).map((skill, index) => {
                  const color = getSkillColor(skill);
                  return (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className={`bg-${color}-50 text-${color}-700 border-${color}-200`}
                    >
                      {skill}
                    </Badge>
                  );
                })}
                {job.skills.length > 4 && (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700">
                    +{job.skills.length - 4} more
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-slate-500 space-x-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDate(job.createdAt || new Date())}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {job.applicationCount} başvuru
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className={`p-2 transition-all duration-200 ${
                isSaved 
                  ? "text-red-500 bg-red-50 hover:bg-red-100" 
                  : "text-slate-400 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
            </Button>
            <Button 
              onClick={handleApply}
              disabled={applyMutation.isPending}
              className="btn-gradient font-medium"
            >
              {applyMutation.isPending ? "Başvuruluyor..." : "Başvur"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
