"use client";
import { SkeletonCard } from "@/components/Skeletons/SkeletonCard";
import { PaginationComponent } from "@/components/PaginationComponent";

import { GET_ALL_VALUE } from "@/shared/constants/defaultConsts";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CardProduct } from "../../components/CardProduct";
import DialogProductContent from "../../components/DialogProductContent";
import useDialogModal from "@/shared/hooks/useDialogModal";

interface GenericContainerProps {
  typeProduct: string;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export enum BtnActions {
  firtPage = "firtPage",
  prevPage = "prevPage",
  nextPage = "nextPage",
  lastPage = "lastPage",
}

export interface ProductItem {
  data: any[];
  page: number;
  total: number;
  totalPages: number;
}
export const initialMenuItem = {
  data: [],
  page: 0,
  total: 0,
  totalPages: 0,
};

const GenericContainer = (props: GenericContainerProps) => {
  const { typeProduct } = props;
  const { setDialogModal } = useDialogModal();

  const [size, setSize] = useState<string>("10");
  const currentObject = ({} as ProductItem) ? ({} as ProductItem) : initialMenuItem
  const currentArrayValue = [] ? [] : ([] as any[]);
  const firtPage = "1";
  const currentTerm = "" as string;

  useEffect(() => {
    if (typeProduct && currentTerm === "") {
      handleExecuteThunk({ page: firtPage, size, typeProduct });
      return;
    }
  }, [typeProduct]);

  useEffect(() => {
    if ( false) {
      handleExecuteThunk({ page: firtPage, size, typeProduct, term: currentTerm });
      return;
    }
  }, [currentTerm]);

  const handleSize = (value: string) => {
    if (!value) return;
    setSize(value);
    handleExecuteThunk({ page: firtPage, size: value, typeProduct, term: currentTerm });
  };

  const actionsBtns: Record<BtnActions, any> = {
    firtPage: 1,
    prevPage: currentObject.page - 1,
    nextPage: currentObject.page + 1,
    lastPage: currentObject.totalPages,
  };

  const handleBtnActions = (action: BtnActions) => {
    const page = `${actionsBtns[action]}`;

    handleExecuteThunk({ page, size, typeProduct, term: currentTerm });
  };

  const handleExecuteThunk = (pagination: any) => {
    const { page, size, typeProduct, term } = pagination;

    
  };

  const handleModal = (id: string) => {
    
  };

  if (false)
    return (
      <div className="w-full">
        <div className="w-full grid max-[480px]:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 justify-center px-4">
          <SkeletonCard length={10} />
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full ">
        <div className="w-full grid max-[480px]:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 justify-center px-4">
          {currentArrayValue.map((item, index) => (
            <CardProduct
              state={({} as Record<string, any>).oneProduct}
              key={`${index}${item.name}`}
              menu={item}
              className="w-[100%]"
              aspectRatio="square"
              width={200}
              height={200}
              handleAction={handleModal}
            />
          ))}
        </div>
        <div className="mt-6">
          <PaginationComponent
            hideFirstBox
            currentPage={currentObject.page}
            totalPages={currentObject.totalPages}
            handleBtnActions={handleBtnActions}
            size={size}
            handleSize={handleSize}
          />
        </div>
      </div>
    </>
  );
};

export default GenericContainer;
