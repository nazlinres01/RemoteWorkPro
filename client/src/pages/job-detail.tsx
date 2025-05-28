import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Heart, 
  Share2, 
  Building2,
  Calendar,
  Globe,
  Briefcase,
  ChevronLeft
} from "lucide-react";
import { formatSalary, formatDate, formatJobType, formatExperienceLevel, formatRemoteType, getSkillColor } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { JobWithCompany } from "@shared/schema";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";

export default function JobDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: job, isLoading } = useQuery<JobWithCompany>({
    queryKey: ["/api/jobs", id],
    queryFn: () => fetch(`/api/jobs/${id}`).then(res => res.json()),
  });

  const applyMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/applications", { 
        userId: 1, 
        jobId: parseInt(id!),
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

  const saveMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/saved-jobs", { userId: 1, jobId: parseInt(id!) });
    },
    onSuccess: () => {
      toast({
        title: "İş kaydedildi",
        description: "İş kayıtlı işlerinize eklendi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">İş ilanı bulunamadı</h1>
            <Link href="/">
              <Button>Ana Sayfaya Dön</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Geri Dön
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={job.company.logo} />
                      <AvatarFallback>{job.company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h1 className="text-3xl font-bold text-slate-800">{job.title}</h1>
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
                      </div>
                      <p className="text-xl text-slate-600 mb-4">{job.company.name}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {formatJobType(job.type)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(job.createdAt!)}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {job.applicationCount} başvuru
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => saveMutation.mutate()}
                      disabled={saveMutation.isPending}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Kaydet
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Paylaş
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Maaş</p>
                    <p className="font-semibold text-slate-800">
                      {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Deneyim Seviyesi</p>
                    <p className="font-semibold text-slate-800">
                      {formatExperienceLevel(job.experienceLevel)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Çalışma Şekli</p>
                    <p className="font-semibold text-slate-800">
                      {formatRemoteType(job.remoteType)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Kategori</p>
                    <p className="font-semibold text-slate-800">{job.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>İş Açıklaması</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed">{job.description}</p>
                  
                  <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Aranan Özellikler</h3>
                  <ul className="space-y-2">
                    <li>• {formatExperienceLevel(job.experienceLevel)} seviyesinde deneyim</li>
                    <li>• {job.skills.join(", ")} teknolojilerinde yetkinlik</li>
                    <li>• {formatRemoteType(job.remoteType)} çalışma modeline uyum</li>
                    <li>• İyi seviyede İngilizce</li>
                    <li>• Takım çalışmasına yatkınlık</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Ne Sunuyoruz</h3>
                  <ul className="space-y-2">
                    <li>• Rekabetçi maaş paketi</li>
                    <li>• Esnek çalışma saatleri</li>
                    <li>• Uzaktan çalışma imkanı</li>
                    <li>• Sağlık sigortası</li>
                    <li>• Kişisel gelişim bütçesi</li>
                    <li>• Modern teknoloji altyapısı</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Gerekli Teknolojiler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => {
                    const color = getSkillColor(skill);
                    return (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className={`bg-${color}-50 text-${color}-700 border-${color}-200 px-3 py-1`}
                      >
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <Card>
              <CardContent className="p-6">
                <Button 
                  onClick={() => applyMutation.mutate()}
                  disabled={applyMutation.isPending}
                  className="w-full btn-gradient font-semibold text-lg py-3"
                >
                  {applyMutation.isPending ? "Başvuruluyor..." : "Hemen Başvur"}
                </Button>
                <p className="text-sm text-slate-500 text-center mt-2">
                  Başvurunuz direkt olarak şirkete iletilecektir
                </p>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Şirket Hakkında
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={job.company.logo} />
                    <AvatarFallback>{job.company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-slate-800">{job.company.name}</h3>
                    <p className="text-sm text-slate-600">{job.company.industry}</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-700">{job.company.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-slate-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.company.location}
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Users className="w-4 h-4 mr-2" />
                    {job.company.size}
                  </div>
                  {job.company.website && (
                    <div className="flex items-center text-slate-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <a 
                        href={job.company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        Web Sitesi
                      </a>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Kullanılan Teknolojiler</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.company.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Şirket Profilini Gör
                </Button>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Benzer İşler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <h4 className="font-medium text-slate-800 text-sm mb-1">Frontend Developer</h4>
                    <p className="text-xs text-slate-600 mb-2">TechCorp • $60k-$80k</p>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs">React</Badge>
                      <Badge variant="outline" className="text-xs">TypeScript</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}