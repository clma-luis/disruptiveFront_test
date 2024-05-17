"use client";

import { SheetHeader, SheetTitle } from "@/components/ui/Sheet";
import { GET_ALL_VALUE } from "@/shared/constants/defaultConsts";
import useSheet from "@/shared/hooks/useSheet";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { sidebarData } from "../config";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";

interface SheetMenuChildProps extends React.HTMLAttributes<HTMLDivElement> {
  currentValue: string;
  navigateToSection: (value: string) => void;
}

export const DrawerMenuContent = (props: SheetMenuChildProps) => {
  const { currentValue, navigateToSection } = props;
  const { setOpenSheet } = useSheet();

  const handleOnClickAllProducts = () => {
    navigateToSection(GET_ALL_VALUE);
    setOpenSheet((prev) => {
      return { ...prev, anchor: "" };
    });
  };

  const handleClickRestProduct = (value: string) => {
    navigateToSection(value);
    setOpenSheet((prev) => {
      return { ...prev, anchor: "" };
    });
  };

  return (
    <div className="h-full relative">
      <SheetHeader>
        <SheetTitle>Opciones del Menú</SheetTitle>
      </SheetHeader>
      <Separator className="my-4" />
      <div>
        {sidebarData.map((item) => (
          <div key={item.categoryName}>
            <>
              <Button
                variant={currentValue === GET_ALL_VALUE ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={handleOnClickAllProducts}
              >
                Todas
              </Button>
              {item.categories.map((category) => (
                <Button
                  key={category.id}
                  variant={currentValue === category.name ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleClickRestProduct(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </>
          </div>
        ))}
      </div>
      <Button className="absolute bottom-0 w-full">
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        Crear una temática
      </Button>
    </div>
  );
};
