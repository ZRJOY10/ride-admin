import React from "react";
import { Link } from "react-router";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* Background texture using CSS gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-0"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)",
                opacity: 0.15,
              }}
            />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                {/* Text logo for cholBhai */}
                <span className="font-extrabold text-4xl tracking-wide text-white drop-shadow-lg">
                  <span className="text-yellow-400">chol</span>
                  <span className="text-white">Bhai</span>
                </span>
              </Link>
              <p className="text-center text-white/80 font-medium">
                Welcome to{" "}
                <span className="text-yellow-400 font-bold">cholBhai</span>{" "}
                Admin Dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
