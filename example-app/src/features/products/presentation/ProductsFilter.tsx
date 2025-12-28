import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import { useTranslations } from "@/lib/i18n/useTransations";

import type { IProductFilters } from "../application/use-products-filter";

interface IProps {
  filters: IProductFilters;
  setFilters: (filters: IProductFilters) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export const ProductsFilter = ({ filters, setFilters, resetFilters, hasActiveFilters }: IProps) => {
  const t = useTranslations("pages.products.filters");
  const popoverBg = useColorModeValue("white", "gray.800");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleMinPriceChange = (_: string, valueAsNumber: number) => {
    setFilters({ ...filters, minPrice: isNaN(valueAsNumber) ? null : valueAsNumber });
  };

  const handleMaxPriceChange = (_: string, valueAsNumber: number) => {
    setFilters({ ...filters, maxPrice: isNaN(valueAsNumber) ? null : valueAsNumber });
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button colorScheme={hasActiveFilters ? "orange" : "gray"} aria-label={t("button")}>
          {t("button")}
        </Button>
      </PopoverTrigger>
      <PopoverContent bg={popoverBg} minW="300px">
        <PopoverHeader fontWeight="semibold">{t("header")}</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>{t("name")}</FormLabel>
              <Input
                placeholder={t("name-placeholder")}
                value={filters.name}
                onChange={handleNameChange}
                aria-label={t("name")}
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>{t("min-price")}</FormLabel>
                <NumberInput
                  min={0}
                  value={filters.minPrice ?? ""}
                  onChange={handleMinPriceChange}
                  aria-label={t("min-price")}
                >
                  <NumberInputField placeholder="0" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>{t("max-price")}</FormLabel>
                <NumberInput
                  min={0}
                  value={filters.maxPrice ?? ""}
                  onChange={handleMaxPriceChange}
                  aria-label={t("max-price")}
                >
                  <NumberInputField placeholder="1000" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
          </VStack>
        </PopoverBody>
        <PopoverFooter>
          <HStack justify="flex-end" spacing={2}>
            <Button variant="ghost" onClick={resetFilters} aria-label={t("reset")}>
              {t("reset")}
            </Button>
          </HStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
