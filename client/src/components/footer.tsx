import { Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Laptop className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold">RemoteWork Pro</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
              Dünyanın en iyi uzaktan iş fırsatlarını bir araya getiren platform. Modern teknoloji şirketlerinde kariyerinizi ilerletin.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: "twitter", href: "#" },
                { icon: "linkedin", href: "#" },
                { icon: "instagram", href: "#" },
                { icon: "github", href: "#" },
              ].map((social) => (
                <Button
                  key={social.icon}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg text-white"
                  asChild
                >
                  <a href={social.href}>
                    <i className={`fab fa-${social.icon}`}></i>
                  </a>
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#jobs" className="hover:text-white transition-colors">İş İlanları</a></li>
              <li><a href="#companies" className="hover:text-white transition-colors">Şirketler</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kategoriler</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kayıtlı İşler</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Destek</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Yardım Merkezi</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">İletişim</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gizlilik</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Şartlar</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400">© 2024 RemoteWork Pro. Tüm hakları saklıdır.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-slate-400">Türkçe</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
