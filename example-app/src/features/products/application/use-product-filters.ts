import { useState, useCallback, useMemo } from "react";

import type { IProduct } from "@/features/products/types/IProduct";
import type { IProductFilters } from "@/features/products/types/IProductFilters";

const initialFilters: IProductFilters = {
  name: "",
  minPrice: undefined,
  maxPrice: undefined,
};

export const useProductFilters = () => {
  const [filters, setFilters] = useState<IProductFilters>(initialFilters);

  const setName = useCallback((name: string) => {
    setFilters((prev) => ({ ...prev, name }));
  }, []);

  const setMinPrice = useCallback((minPrice: number | undefined) => {
    setFilters((prev) => ({ ...prev, minPrice }));
  }, []);

  const setMaxPrice = useCallback((maxPrice: number | undefined) => {
    setFilters((prev) => ({ ...prev, maxPrice }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.name !== "" ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined
    );
  }, [filters]);

  const filterProducts = useCallback(
    (products: IProduct[]): IProduct[] => {
      return products.filter((product) => {
        const matchesName =
          !filters.name ||
          product.title.toLowerCase().includes(filters.name.toLowerCase());

        const matchesMinPrice =
          filters.minPrice === undefined || product.price >= filters.minPrice;

        const matchesMaxPrice =
          filters.maxPrice === undefined || product.price <= filters.maxPrice;

        return matchesName && matchesMinPrice && matchesMaxPrice;
      });
    },
    [filters]
  );

  return {
    filters,
    setName,
    setMinPrice,
    setMaxPrice,
    resetFilters,
    hasActiveFilters,
    filterProducts,
  };
};
