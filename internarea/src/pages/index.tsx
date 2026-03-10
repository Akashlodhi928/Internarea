import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowUpRight,
  Banknote,
  Calendar,
  ChevronRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function SvgSlider() {
  const categories = [
    "Big Brands",
    "Work From Home",
    "Part-time",
    "MBA",
    "Engineering",
    "Media",
    "Design",
    "Data Science",
  ];

  const slides = [
    {
      pattern: "pattern-1",
      title: "Start Your Career Journey",
      bgColor: "bg-indigo-600",
    },
    {
      pattern: "pattern-2",
      title: "Learn From The Best",
      bgColor: "bg-blue-600",
    },
    {
      pattern: "pattern-3",
      title: "Grow Your Skills",
      bgColor: "bg-purple-600",
    },
    {
      pattern: "pattern-4",
      title: "Connect With Top Companies",
      bgColor: "bg-teal-600",
    },
  ];

  const stats = [
    { number: "300K+", label: "companies hiring" },
    { number: "10K+", label: "new openings everyday" },
    { number: "21Mn+", label: "active students" },
    { number: "600K+", label: "learners" },
  ];

  const [internships, setinternship] = useState<any>([]);
  const [jobs, setjob] = useState<any>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const [internshipres, jobres] = await Promise.all([
          axios.get("https://internarea-jxck.onrender.com/api/internship"),
          axios.get("https://internarea-jxck.onrender.com/api/job"),
        ]);
        setinternship(internshipres.data);
        setjob(jobres.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  // http://localhost:5000
  // http://localhost:5000
  
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredInternships = internships.filter(
    (item: any) => !selectedCategory || item.category === selectedCategory
  );

  const filteredJobs = jobs.filter(
    (item: any) => !selectedCategory || item.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* hero section */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Make your dream career a reality
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Trending on InternArea 🔥
        </p>
      </div>

      {/* Swiper section */}
      <div className="mb-12 sm:mb-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] ${slide.bgColor}`}
              >
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {slide.pattern === "pattern-1" && (
                      <pattern
                        id="pattern-1"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="10" cy="10" r="3" fill="white" />
                      </pattern>
                    )}

                    {slide.pattern === "pattern-2" && (
                      <pattern
                        id="pattern-2"
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect x="15" y="15" width="10" height="10" fill="white" />
                      </pattern>
                    )}

                    {slide.pattern === "pattern-3" && (
                      <pattern
                        id="pattern-3"
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="white" />
                      </pattern>
                    )}

                    {slide.pattern === "pattern-4" && (
                      <pattern
                        id="pattern-4"
                        x="0"
                        y="0"
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M30 5 L55 30 L30 55 L5 30 Z" fill="white" />
                      </pattern>
                    )}

                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill={`url(#${slide.pattern})`}
                    />
                  </svg>
                </div>

                <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {slide.title}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Category section */}
      <div className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
          Latest internships on Intern Area
        </h2>

        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
          <span className="text-gray-700 font-medium w-full sm:w-auto">
            POPULAR CATEGORIES:
          </span>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Internship grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14 sm:mb-16">
        {filteredInternships.map((internship: any, index: any) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-5 sm:p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <ArrowUpRight size={20} />
              <span className="font-medium">Actively Hiring</span>
            </div>

            <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
              {internship.title}
            </h3>

            <p className="text-gray-500 mb-4">{internship.company}</p>

            <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{internship.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Banknote size={18} />
                <span>{internship.stipend}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{internship.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm">
                Internship
              </span>

              <Link
                href={`/detailiternship/${internship._id}`}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm sm:text-base"
              >
                View details
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Jobs grid */}
      <div className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Latest Jobs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14 sm:mb-16">
          {filteredJobs.map((job: any, index: any) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-5 sm:p-6 transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <ArrowUpRight size={20} />
                <span className="font-medium">Actively Hiring</span>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
                {job.title}
              </h3>

              <p className="text-gray-500 mb-4">{job.company}</p>

              <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Banknote size={18} />
                  <span>{job.CTC}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{job.Experience}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm">
                  Jobs
                </span>

                <Link
                  href={`/detailInternship?q=${job._id}`}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm sm:text-base"
                >
                  View details
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stat Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-10 sm:mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}