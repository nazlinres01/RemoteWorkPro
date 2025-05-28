import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Laptop,
  Building2,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [userType, setUserType] = useState<"jobseeker" | "employer">("jobseeker");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companySize: "",
    agreeTerms: false,
    subscribeNewsletter: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Hata",
        description: "Şifreler eşleşmiyor",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Hata",
        description: "Kullanım şartlarını kabul etmelisiniz",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Başarılı!",
      description: "Hesabınız oluşturuldu. E-posta adresinizi doğrulayın.",
    });
    
    setIsSubmitting(false);
  };

  const benefits = [
    "Binlerce uzaktan iş fırsatına erişim",
    "Kişiselleştirilmiş iş önerileri",
    "Şirketlerle direkt iletişim",
    "Kariyer rehberliği ve destek",
    "Profil görünürlüğü analizi",
    "Premium iş ilanlarına öncelikli erişim"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-800">
                  Hesap Oluştur
                </CardTitle>
                <p className="text-slate-600">
                  Ücretsiz hesabınızı oluşturun ve uzaktan çalışma fırsatlarını keşfedin
                </p>
              </CardHeader>
              <CardContent>
                {/* User Type Selection */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button
                    type="button"
                    variant={userType === "jobseeker" ? "default" : "outline"}
                    className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                      userType === "jobseeker" ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setUserType("jobseeker")}
                  >
                    <User className="w-6 h-6" />
                    <span className="text-sm font-medium">İş Arayan</span>
                  </Button>
                  <Button
                    type="button"
                    variant={userType === "employer" ? "default" : "outline"}
                    className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                      userType === "employer" ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setUserType("employer")}
                  >
                    <Building2 className="w-6 h-6" />
                    <span className="text-sm font-medium">İşveren</span>
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Information */}
                  <div>
                    <Label htmlFor="fullName">
                      {userType === "employer" ? "Yetkili Adı Soyadı" : "Ad Soyad"} *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder={userType === "employer" ? "John Doe" : "Adınızı girin"}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-posta Adresi *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                      required
                      className="mt-1"
                    />
                  </div>

                  {/* Company Information (for employers) */}
                  {userType === "employer" && (
                    <>
                      <div>
                        <Label htmlFor="companyName">Şirket Adı *</Label>
                        <Input
                          id="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                          placeholder="Şirket adınızı girin"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="companySize">Şirket Büyüklüğü *</Label>
                        <Select 
                          value={formData.companySize} 
                          onValueChange={(value) => handleInputChange("companySize", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Çalışan sayısını seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 çalışan</SelectItem>
                            <SelectItem value="11-50">11-50 çalışan</SelectItem>
                            <SelectItem value="51-100">51-100 çalışan</SelectItem>
                            <SelectItem value="101-500">101-500 çalışan</SelectItem>
                            <SelectItem value="500+">500+ çalışan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* Password Fields */}
                  <div>
                    <Label htmlFor="password">Şifre *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Güçlü bir şifre oluşturun"
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Şifre Tekrarı *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Şifrenizi tekrar girin"
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm text-slate-600 leading-relaxed">
                        <Link href="/about" className="text-primary hover:underline">Kullanım Şartları</Link> ve{" "}
                        <Link href="/about" className="text-primary hover:underline">Gizlilik Politikası</Link>'nı 
                        okudum ve kabul ediyorum *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                      />
                      <Label htmlFor="subscribeNewsletter" className="text-sm text-slate-600">
                        Yeni iş fırsatları ve platform güncellemeleri hakkında e-posta almak istiyorum
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-gradient font-semibold py-3"
                  >
                    {isSubmitting ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </form>

                <Separator className="my-6" />

                <div className="text-center">
                  <p className="text-slate-600">
                    Zaten hesabınız var mı?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                      Giriş Yapın
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Benefits */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8 space-y-8">
              {/* Hero */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Laptop className="text-white w-6 h-6" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                  Uzaktan Çalışma Serüvenine Başlayın
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Dünyanın en iyi uzaktan iş fırsatlarına erişin ve kariyerinizi bir sonraki seviyeye taşıyın.
                </p>
              </div>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Platform Avantajları</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="bg-gradient-to-br from-primary to-secondary text-white">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">15,000+</div>
                      <div className="text-sm opacity-90">Aktif İş İlanı</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2,500+</div>
                      <div className="text-sm opacity-90">Şirket</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm opacity-90">Uzaktan Pozisyon</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm opacity-90">Ülke</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}