"use client";

import { SlidersHorizontal, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SORT_OPTIONS } from "@/constants/shop";
import type { SortOption } from "@/types/product";

interface ShopToolbarProps {
  resultCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  activeFilterCount: number;
  filtersSlot: React.ReactNode;
}

function ShopToolbar({
  resultCount,
  search,
  onSearchChange,
  sort,
  onSortChange,
  activeFilterCount,
  filtersSlot,
}: ShopToolbarProps) {
  const [searchDraft, setSearchDraft] = useState(search);

  // Sync the draft when `search` changes from outside this component (e.g.
  // browser back/forward or "Clear all filters"), without remounting the
  // input — that would drop focus/caret position while the user is typing.
  const [lastExternalSearch, setLastExternalSearch] = useState(search);
  if (search !== lastExternalSearch) {
    setLastExternalSearch(search);
    if (searchDraft !== search) {
      setSearchDraft(search);
    }
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchDraft !== search) {
        onSearchChange(searchDraft);
      }
    }, 400);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" className="lg:hidden" />}>
              <SlidersHorizontal className="size-4" />
              Filters
              {activeFilterCount > 0 ? (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              ) : null}
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto p-6">
              <SheetHeader className="p-0">
                <SheetTitle className="font-heading text-lg">Filters</SheetTitle>
              </SheetHeader>
              {filtersSlot}
            </SheetContent>
          </Sheet>

          <Select
            items={SORT_OPTIONS}
            value={sort}
            onValueChange={(value) => onSortChange(value as SortOption)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {resultCount} {resultCount === 1 ? "product" : "products"}
      </p>
    </div>
  );
}

export { ShopToolbar };
