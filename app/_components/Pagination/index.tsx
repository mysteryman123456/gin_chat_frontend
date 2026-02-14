"use client";

import { Button } from "@/components/ui/button";

interface Props {
  onPageChange: (number: number) => void;
  total_pages: number;
  current_page: number;
}

export default function Pagination({
  total_pages,
  current_page,
  onPageChange,
}: Props) {
  if (total_pages <= 1) return null;

  return (
    <div className="flex justify-end mt-4 items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        disabled={current_page === 1}
        onClick={() => onPageChange(current_page - 1)}
      >
        Prev
      </Button>

      {Array.from({ length: total_pages }).map((_, i) => {
        const pageNumber = i + 1;

        return (
          <Button
            key={i}
            size="icon-sm"
            variant={current_page === pageNumber ? "default" : "outline"}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        size="sm"
        variant="outline"
        disabled={current_page === total_pages}
        onClick={() => onPageChange(current_page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
