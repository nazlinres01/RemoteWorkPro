import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import JobCategories from "@/components/job-categories";
import JobListings from "@/components/job-listings";
import FeaturedCompanies from "@/components/featured-companies";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <JobCategories />
      <JobListings />
      <FeaturedCompanies />
      <Newsletter />
      <Footer />
    </div>
  );
}
