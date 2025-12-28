import { useMemo, useState } from "react";

import type { IProduct } from "@/features/products/types/IProduct";

export interface IProductFilters {
  name: string;
  minPrice: number | null;
  maxPrice: number | null;
}

const defaultFilters: IProductFilters = {
  name: "",
  minPrice: null,
  maxPrice: null,
};

export const useProductsFilter = (products: IProduct[]) => {
  const [filters, setFilters] = useState<IProductFilters>(defaultFilters);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.name && !product.title.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }

      if (filters.minPrice !== null && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice !== null && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const resetFilters = () => setFilters(defaultFilters);

  const hasActiveFilters =
    filters.name !== "" || filters.minPrice !== null || filters.maxPrice !== null;

  return {
    filters,
    setFilters,
    filteredProducts,
    resetFilters,
    hasActiveFilters,
  };
};
