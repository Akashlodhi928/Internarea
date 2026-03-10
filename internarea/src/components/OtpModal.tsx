import React, { useState } from "react";
import axios from "axios";

const OtpModal = ({ email, onVerified, onClose }) => {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await axios.post("https://internarea-jxck.onrender.com/api/otp/verify-otp", {
        email,
        otp
      });

      if (res.data.success) {
        onVerified();
      }
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-semibold mb-3">Enter OTP</h2>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full mb-3"
          placeholder="Enter OTP"
        />

        <button
          onClick={verifyOtp}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Verify OTP
        </button>

        <button
          onClick={onClose}
          className="text-red-500 mt-2 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpModal;