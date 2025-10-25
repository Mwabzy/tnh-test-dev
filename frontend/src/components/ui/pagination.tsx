import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-full text-sm ${
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        ← Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full border text-sm font-medium transition ${
            page === currentPage
              ? "bg-red-900 text-white border-red-900"
              : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-full text-sm ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
