import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min?: number | null, max?: number | null, currency = "USD") {
  if (!min && !max) return "Salary not specified";
  
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toString();
  };

  const symbol = currency === "USD" ? "$" : currency;
  
  if (min && max) {
    return `${symbol}${formatNumber(min)} - ${symbol}${formatNumber(max)}`;
  } else if (min) {
    return `${symbol}${formatNumber(min)}+`;
  } else if (max) {
    return `Up to ${symbol}${formatNumber(max)}`;
  }
  
  return "Salary not specified";
}

export function formatDate(date: Date | string) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInHours = Math.floor((now.getTime() - targetDate.getTime()) / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) {
    return "Just now";
  } else if (diffInHours < 24) {
    return `${diffInHours} saat önce`;
  } else if (diffInDays === 1) {
    return "1 gün önce";
  } else if (diffInDays < 7) {
    return `${diffInDays} gün önce`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} hafta önce`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `${months} ay önce`;
  }
}

export function formatJobType(type: string) {
  const types: Record<string, string> = {
    "full-time": "Tam Zamanlı",
    "part-time": "Yarı Zamanlı",
    "freelance": "Freelance",
    "contract": "Sözleşmeli",
    "internship": "Staj"
  };
  
  return types[type] || type;
}

export function formatExperienceLevel(level: string) {
  const levels: Record<string, string> = {
    "entry": "Giriş Seviyesi",
    "mid": "Orta Seviye",
    "senior": "Üst Seviye",
    "lead": "Lider",
    "executive": "Yönetici"
  };
  
  return levels[level] || level;
}

export function formatRemoteType(type: string) {
  const types: Record<string, string> = {
    "fully-remote": "Tamamen Uzaktan",
    "hybrid": "Hibrit",
    "timezone-specific": "Belirli Saat Dilimi",
    "office": "Ofis"
  };
  
  return types[type] || type;
}

export function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    "Yazılım Geliştirme": "fas fa-code",
    "UI/UX Tasarım": "fas fa-palette",
    "Pazarlama": "fas fa-chart-line",
    "İnsan Kaynakları": "fas fa-users",
    "Satış": "fas fa-bullhorn",
    "Müşteri Hizmetleri": "fas fa-headset",
    "Veri Bilimi": "fas fa-database",
    "DevOps": "fas fa-server",
    "Mobil Geliştirme": "fas fa-mobile-alt",
    "Proje Yönetimi": "fas fa-tasks"
  };
  
  return icons[category] || "fas fa-briefcase";
}

export function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    "Yazılım Geliştirme": "blue",
    "UI/UX Tasarım": "purple",
    "Pazarlama": "green",
    "İnsan Kaynakları": "orange",
    "Satış": "cyan",
    "Müşteri Hizmetleri": "indigo",
    "Veri Bilimi": "pink",
    "DevOps": "yellow",
    "Mobil Geliştirme": "red",
    "Proje Yönetimi": "gray"
  };
  
  return colors[category] || "gray";
}

export function getSkillColor(skill: string) {
  const colors = [
    "blue", "purple", "green", "orange", "cyan", "indigo", 
    "pink", "yellow", "red", "gray"
  ];
  
  // Simple hash function to assign consistent colors
  let hash = 0;
  for (let i = 0; i < skill.length; i++) {
    hash = skill.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
