import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin } from "lucide-react";
import { getSkillColor } from "@/lib/utils";
import type { CompanyWithJobCount } from "@shared/schema";

interface CompanyCardProps {
  company: CompanyWithJobCount;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="group card-hover bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-primary/20 transition-all duration-300">
      <CardContent className="p-8 text-center">
        <img 
          src={company.logo} 
          alt={`${company.name} logo`}
          className="w-20 h-20 rounded-2xl mx-auto mb-6 object-cover shadow-lg"
        />
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
          {company.name}
        </h3>
        <p className="text-slate-600 mb-4">{company.industry}</p>
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 mb-6">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {company.size}
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {company.location}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {company.technologies.slice(0, 3).map((tech, index) => {
            const color = getSkillColor(tech);
            return (
              <Badge 
                key={index}
                variant="outline" 
                className={`bg-${color}-50 text-${color}-700 border-${color}-200 text-sm`}
              >
                {tech}
              </Badge>
            );
          })}
        </div>
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-primary">{company.jobCount}</span>
          <span className="text-slate-600 ml-1">açık pozisyon</span>
        </div>
        <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all duration-200">
          Şirket Profilini Gör
        </Button>
      </CardContent>
    </Card>
  );
}
