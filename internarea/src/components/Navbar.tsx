import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { auth, provider } from "../firebase/firebase";
import { Search, Menu, X } from "lucide-react";
import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectuser } from "@/Feature/Userslice";

const Navbar = () => {

  const user = useSelector(selectuser);

  const [language, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingLanguage, setPendingLanguage] = useState("");

  const email = user?.email;

  const handlelogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in successfully");
    } catch {
      toast.error("Login failed");
    }
  };

  const handlelogout = () => {
    signOut(auth);
    toast.success("Logged out");
    setIsMenuOpen(false);
  };

  useEffect(() => {

    const script = document.createElement("script");

    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

    script.async = true;

    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

  }, []);

  const translate = (lang) => {

    const select = document.querySelector(".goog-te-combo");

    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }

  };

  const changeLanguage = async (lang) => {

    if (lang === "fr") {

      try {

        await axios.post(
          "https://internarea-jxck.onrender.com/api/otp/send-otp",
          { email }
        );

        toast.success("OTP sent to your email");

        setPendingLanguage(lang);
        setShowOtpModal(true);

      } catch {

        toast.error("Failed to send OTP");

      }

      return;
    }

    setLanguage(lang);
    translate(lang);

  };

  const verifyOtp = async () => {

    try {

      const res = await axios.post(
        "https://internarea-jxck.onrender.com/api/otp/verify-otp",
        { email, otp }
      );

      if (res.data.success) {

        toast.success("OTP verified");

        setShowOtpModal(false);

        setLanguage(pendingLanguage);

        translate(pendingLanguage);

      }

    } catch {

      toast.error("Invalid OTP");

    }

  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 notranslate" translate="no">

      <div id="google_translate_element" style={{ display: "none" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* LEFT */}
          <div className="flex items-center gap-8">

            <Link href="/">
              <img src="/logo.png" className="h-10 md:h-12 lg:h-14" />
            </Link>

            <div className="hidden lg:flex items-center gap-6 text-gray-600 font-medium">

              <Link href="/internship" className="hover:text-blue-600">
                Internships
              </Link>

              <Link href="/job" className="hover:text-blue-600">
                Jobs
              </Link>

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 md:gap-4">

            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent outline-none text-sm w-32 lg:w-48"
              />
            </div>

            {/* Language */}
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border px-2 py-1 rounded-md text-gray-700 text-xs sm:text-sm"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="pt">Portuguese</option>
              <option value="zh-CN">Chinese</option>
              <option value="fr">French</option>
            </select>

            {/* Auth */}
            {!user ? (
              <>
                <button
                  onClick={handlelogin}
                  className="border px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-900"
                >
                  Continue with Google
                </button>

                <Link href="/adminlogin">Admin</Link>
              </>
            ) : (
              <>
                <Link href="/profile">
                  <img
                    src={user.photo}
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                </Link>

                <button
                  onClick={handlelogout}
                  className="text-red-500"
                >
                  Logout
                </button>
              </>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </div>

      {/* OTP MODAL */}
      {showOtpModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 notranslate" translate="no">

          <div className="bg-white p-6 rounded-lg w-80">

            <h2 className="text-lg font-semibold mb-3">
              Enter OTP
            </h2>

            <input
              type="text"
              value={otp}
              translate="no"
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full mb-3 notranslate"
              placeholder="Enter OTP"
            />

            <button
              onClick={verifyOtp}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Verify OTP
            </button>

            <button
              onClick={() => setShowOtpModal(false)}
              className="text-red-500 mt-2 w-full"
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;