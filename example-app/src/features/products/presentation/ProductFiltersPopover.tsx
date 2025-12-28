import { SettingsIcon } from "@chakra-ui/icons";
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
  PopoverHeader,
  PopoverTrigger,
  VStack,
} from "@chakra-ui/react";

import { useTranslations } from "@/lib/i18n/useTransations";

interface IProps {
  name: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  hasActiveFilters: boolean;
  onNameChange: (name: string) => void;
  onMinPriceChange: (price: number | undefined) => void;
  onMaxPriceChange: (price: number | undefined) => void;
  onReset: () => void;
}

export const ProductFiltersPopover = ({
  name,
  minPrice,
  maxPrice,
  hasActiveFilters,
  onNameChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: IProps) => {
  const t = useTranslations("pages.products.filters");

  const handleMinPriceChange = (_: string, valueAsNumber: number) => {
    onMinPriceChange(isNaN(valueAsNumber) ? undefined : valueAsNumber);
  };

  const handleMaxPriceChange = (_: string, valueAsNumber: number) => {
    onMaxPriceChange(isNaN(valueAsNumber) ? undefined : valueAsNumber);
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          leftIcon={<SettingsIcon />}
          colorScheme={hasActiveFilters ? "orange" : undefined}
          aria-label={t("title")}
        >
          {t("title")}
        </Button>
      </PopoverTrigger>
      <PopoverContent w="sm">
        <PopoverCloseButton />
        <PopoverHeader fontWeight="semibold">{t("title")}</PopoverHeader>
        <PopoverBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>{t("name")}</FormLabel>
              <Input
                placeholder={t("name-placeholder")}
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                aria-label={t("name")}
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>{t("min-price")}</FormLabel>
                <NumberInput
                  min={0}
                  value={minPrice ?? ""}
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
                  value={maxPrice ?? ""}
                  onChange={handleMaxPriceChange}
                  aria-label={t("max-price")}
                >
                  <NumberInputField placeholder="999" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>

            <Button
              variant="outline"
              onClick={onReset}
              isDisabled={!hasActiveFilters}
            >
              {t("reset")}
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
