import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { motion } from "framer-motion";
import { UsersPaginationProps } from "../types";

export const UsersPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: UsersPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={`
                transition-all duration-200
                ${currentPage <= 1 
                  ? "pointer-events-none opacity-50" 
                  : "hover:bg-gray-100"
                }
              `}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page);
                    }}
                    isActive={currentPage === page}
                    className={`
                      transition-all duration-200
                      ${currentPage === page 
                        ? "bg-[#4263EB] text-white hover:bg-[#3451c7]" 
                        : "hover:bg-gray-100"
                      }
                    `}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={`
                transition-all duration-200
                ${currentPage >= totalPages 
                  ? "pointer-events-none opacity-50" 
                  : "hover:bg-gray-100"
                }
              `}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};