import { Link } from "react-router";
import { useEffect } from "react";
import { applyDocumentSeo } from "@/lib/seoDom";

const NotFound: React.FC = () => {
  useEffect(() => {
    applyDocumentSeo({
      title: "Page Not Found | The Nairobi Hospital",
      description:
        "The page you requested could not be found on The Nairobi Hospital website.",
      canonicalPath: window.location.pathname,
      noindex: true,
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-extrabold text-gray-900 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page not found
        </h2>

        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-gray-800 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
