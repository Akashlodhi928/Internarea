import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 sm:py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 sm:gap-8">
          <FooterSection title="Internship by places" items={["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Seattle"]} />
          <FooterSection title="Internship by stream" items={["About us", "Careers", "Press", "News", "Media kit", "Contact"]} />
          <FooterSection title="Job Places" items={["Blog", "Newsletter", "Events", "Help center", "Tutorials", "Supports"]} links />
          <FooterSection title="Jobs by streams" items={["Startups", "Enterprise", "Government", "SaaS", "Marketplaces", "Ecommerce"]} links />
        </div>

        <hr className="my-8 sm:my-10 border-gray-600" />

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 sm:gap-8">
          <FooterSection title="About us" items={["Startups", "Enterprise"]} links />
          <FooterSection title="Team diary" items={["Startups", "Enterprise"]} links />
          <FooterSection title="Terms and conditions" items={["Startups", "Enterprise"]} links />
          <FooterSection title="Sitemap" items={["Startups"]} links />
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="flex items-center gap-2 border border-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 text-sm sm:text-base transition">
            <i className="bi bi-google-play"></i> Get Android App
          </p>

          <div className="flex items-center gap-4">
            <Facebook className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-400 cursor-pointer transition" />
            <Twitter className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-400 cursor-pointer transition" />
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6 hover:text-pink-400 cursor-pointer transition" />
          </div>

          <p className="text-xs sm:text-sm text-gray-400 text-center md:text-right">
            © Copyright 2026. All Rights Reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}

function FooterSection({ title, items, links }: any) {
  return (
    <div className="w-full">
      <h3 className="text-sm sm:text-base font-semibold text-gray-300">
        {title}
      </h3>

      <div className="flex flex-col items-start mt-3 sm:mt-4 space-y-2 sm:space-y-3">
        {items.map((item: any, index: any) =>
          links ? (
            <a
              key={index}
              href="/"
              className="text-gray-400 text-sm sm:text-base hover:text-blue-400 hover:underline transition"
            >
              {item}
            </a>
          ) : (
            <p
              key={index}
              className="text-gray-400 text-sm sm:text-base hover:text-blue-400 hover:underline cursor-pointer transition"
            >
              {item}
            </p>
          )
        )}
      </div>
    </div>
  );
}