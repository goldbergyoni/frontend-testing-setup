import { Button } from "@chakra-ui/react";
import { useState } from "react";

import { useProductsFilter } from "@/features/products/application/use-products-filter";
import { useProductsQuery } from "@/features/products/infrastructure/productsQuery";
import { ProductsFilter } from "@/features/products/presentation/ProductsFilter";
import { ProductsList } from "@/features/products/presentation/ProductsList";
import { Page } from "@/lib/components/Layout/Page";
import { PageHeader } from "@/lib/components/Layout/PageHeader";
import { ErrorPageStrategy } from "@/lib/components/Result/ErrorPageStrategy";
import { useTranslations } from "@/lib/i18n/useTransations";
import type { IQueryParams } from "@/types/IQueryParams";

const defaultParams: IQueryParams = { limit: 10, sort: "asc" };

const ProductsPage = () => {
  const t = useTranslations("pages.products");

  const [params, setParams] = useState<IQueryParams>(defaultParams);
  const { data, isFetching } = useProductsQuery(params, {
    keepPreviousData: true,
  });

  const { filters, setFilters, filteredProducts, resetFilters, hasActiveFilters } =
    useProductsFilter(data.products);

  const noMoreProducts = data.meta.total <= params.limit;

  return (
    <Page>
      <PageHeader title={t("title")} description={t("description")}>
        <ProductsFilter
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </PageHeader>
      <ProductsList products={filteredProducts} />
      {data.products.length > 0 && (
        <Button
          w="100%"
          onClick={() =>
            setParams((params) => ({
              ...params,
              limit: (params?.limit ?? 10) + 10,
            }))
          }
          isLoading={isFetching}
          isDisabled={noMoreProducts}
        >
          {noMoreProducts ? t("load-more.no-more") : t("load-more.show-more")}
        </Button>
      )}
    </Page>
  );
};

export const Component = ProductsPage;

export const ErrorBoundary = ErrorPageStrategy;
