import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save,
  Briefcase,
  GraduationCap,
  Award,
  Settings,
  Shield,
  Bell
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@email.com",
    phone: "+90 555 123 45 67",
    location: "İstanbul, Türkiye",
    title: "Senior Frontend Developer",
    bio: "5+ yıl deneyimli frontend geliştirici. React, TypeScript ve modern web teknolojileri konusunda uzmanım. Uzaktan çalışma deneyimi olan, problem çözme odaklı bir yazılımcıyım.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"],
    experience: [
      {
        company: "TechCorp",
        position: "Senior Frontend Developer",
        period: "2022 - Devam ediyor",
        description: "React ve TypeScript ile büyük ölçekli web uygulamaları geliştirme"
      },
      {
        company: "StartupXYZ",
        position: "Frontend Developer",
        period: "2020 - 2022",
        description: "E-ticaret platformu frontend geliştirme ve optimizasyon"
      }
    ],
    education: [
      {
        school: "İstanbul Teknik Üniversitesi",
        degree: "Bilgisayar Mühendisliği",
        period: "2016 - 2020"
      }
    ]
  });
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profil güncellendi",
      description: "Profiliniz başarıyla kaydedildi",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" />
                  <AvatarFallback>AY</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-slate-800 mb-1">{userData.name}</h2>
                <p className="text-slate-600 mb-3">{userData.title}</p>
                <p className="text-sm text-slate-500 mb-4 flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {userData.location}
                </p>
                <Button 
                  variant={isEditing ? "default" : "outline"} 
                  className="w-full"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Profili Düzenle
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">İstatistikler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Profil Görüntülenme</span>
                  <span className="font-semibold">248</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Başvuru Sayısı</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kayıtlı İş</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Profil Tamamlanma</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Başvurularım
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Hesap Ayarları
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Bildirimler
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Gizlilik
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Kişisel Bilgiler</TabsTrigger>
                <TabsTrigger value="experience">Deneyim</TabsTrigger>
                <TabsTrigger value="skills">Yetenekler</TabsTrigger>
                <TabsTrigger value="settings">Ayarlar</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Kişisel Bilgiler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Ad Soyad</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Ünvan</Label>
                        <Input
                          id="title"
                          value={userData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Konum</Label>
                      <Input
                        id="location"
                        value={userData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Hakkımda</Label>
                      <Textarea
                        id="bio"
                        value={userData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience */}
              <TabsContent value="experience">
                <div className="space-y-6">
                  {/* Work Experience */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        İş Deneyimi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.experience.map((exp, index) => (
                        <div key={index}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-800">{exp.position}</h3>
                              <p className="text-primary font-medium">{exp.company}</p>
                              <p className="text-sm text-slate-500 mb-2">{exp.period}</p>
                              <p className="text-slate-600">{exp.description}</p>
                            </div>
                            {isEditing && (
                              <Button variant="ghost" size="sm">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          {index < userData.experience.length - 1 && <Separator className="mt-6" />}
                        </div>
                      ))}
                      {isEditing && (
                        <Button variant="outline" className="w-full">
                          + Deneyim Ekle
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Education */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        Eğitim
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {userData.education.map((edu, index) => (
                        <div key={index} className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-800">{edu.degree}</h3>
                            <p className="text-primary font-medium">{edu.school}</p>
                            <p className="text-sm text-slate-500">{edu.period}</p>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <Button variant="outline" className="w-full">
                          + Eğitim Ekle
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Yetenekler & Teknolojiler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium text-slate-800 mb-3">Teknik Yetenekler</h3>
                      <div className="flex flex-wrap gap-2">
                        {userData.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {skill}
                            {isEditing && (
                              <button className="ml-2 text-blue-500 hover:text-blue-700">×</button>
                            )}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            + Yetenek Ekle
                          </Button>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium text-slate-800 mb-3">Dil Yetenekleri</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-700">Türkçe</span>
                          <Badge variant="outline">Anadil</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-700">İngilizce</span>
                          <Badge variant="outline">İleri Seviye</Badge>
                        </div>
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="mt-3">
                          + Dil Ekle
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hesap Ayarları</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">E-posta Bildirimleri</h3>
                          <p className="text-sm text-slate-600">Yeni iş fırsatları hakkında bildirim al</p>
                        </div>
                        <Button variant="outline" size="sm">Aktif</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Profil Görünürlüğü</h3>
                          <p className="text-sm text-slate-600">Profilinizin işverenler tarafından görünürlüğü</p>
                        </div>
                        <Button variant="outline" size="sm">Herkese Açık</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">CV İndirme</h3>
                          <p className="text-sm text-slate-600">CV'nizi PDF olarak indirin</p>
                        </div>
                        <Button variant="outline" size="sm">İndir</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">Tehlikeli Bölge</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium">Hesabı Deaktive Et</h3>
                          <p className="text-sm text-slate-600 mb-3">
                            Hesabınızı geçici olarak deaktive edebilirsiniz
                          </p>
                          <Button variant="outline" className="text-orange-600 border-orange-600">
                            Hesabı Deaktive Et
                          </Button>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="font-medium text-red-600">Hesabı Sil</h3>
                          <p className="text-sm text-slate-600 mb-3">
                            Bu işlem geri alınamaz. Tüm verileriniz silinecektir.
                          </p>
                          <Button variant="destructive">
                            Hesabı Kalıcı Olarak Sil
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}