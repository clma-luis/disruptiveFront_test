"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { DrawerMenuContent } from "./components/DrawerMenuContent";
import { SidebarMenu } from "./components/sidebar";
import GenericContainer from "./containers/GenericContainer";

import { useDebounce } from "@/shared/hooks/useDebounse";
import useSheet from "@/shared/hooks/useSheet";
import { Anchor } from "@/shared/interfaces/general";

const HomeModule = () => {
  const isDesktop = useMediaQuery("( max-width: 1023px )");
  const { setOpenSheet } = useSheet();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    handleSearchProduct();
  }, [debouncedSearchTerm]);

  const handleSearchProduct = () => {};

  const handleResponsiveHomeMenu = () => {};

  const navigateToSection = (value: string) => {
    setSearchTerm("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  return (
    <div
      className={"max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-4 max-[1023px]:border-none border rounded mb-6"}
    >
      <div className="w-full">
        <div className="bg-background">
          <div className={"grid lg:grid-cols-5"}>
            <SidebarMenu className="hidden lg:block" currentValue={""} navigateToSection={navigateToSection} />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full pt-6 pb-4 lg:px-8">
                <div className=" px-4 space-center lg:space-between flex flex-col lg:flex-row items-center">
                  <div className="w-full flex  justify-between items-center">
                    

                    <div className="block lg:hidden">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setOpenSheet({
                            anchor: Anchor.right,
                            children: <DrawerMenuContent currentValue={""} navigateToSection={navigateToSection} />,
                          });
                        }}
                      >
                        Opciones
                      </Button>
                    </div>
                  </div>

                  <div className="hidden lg:flex px-4 w-full  justify-center lg:justify-end mt-4 lg:mt-0 ml-auto ">
                    <Button>
                      <PlusCircledIcon className="mr-2 h-4 w-4" />
                      Crear una temática
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="w-full flex justify-start p-4">
                    <Input
                      value={searchTerm}
                      placeholder="Buscar..."
                      className="h-10 w-full lg:w-[250px]"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                {<GenericContainer typeProduct={""} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModule;
