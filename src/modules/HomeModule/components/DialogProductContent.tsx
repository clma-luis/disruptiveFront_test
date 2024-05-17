"use client";
import { ImageComponent } from "@/components/ImageComponent";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";

import ProductBtnActions from "./CardBtnActions";

interface DialogProductContentProps {
  data: {
    description: string;
    image: string;
    ingredients: string[];
    name: string;
    price: number;  
  };
}

const DialogProductContent = (props: DialogProductContentProps) => {
  const { data } = props;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <DialogHeader>
        <DialogTitle className="text-center">{data.name}</DialogTitle>
        <DialogDescription className="text-start">{data.description}</DialogDescription>
      </DialogHeader>

      <ImageComponent src={data.image} name={data.name} width={375} height={239} className="rounded-md" />

      <div className="w-full grid grid-cols-1 gap-1 mt-12">
        <p className="text-start text-[14px]">
          <strong>Ingredientes:</strong> {data.ingredients.join(", ")}.
        </p>
        <p className="text-start text-[14px]">
          <strong>Cantidad disponible:</strong> 20 unidades.
        </p>
      </div>

      <div className="w-full mt-6">
        <ProductBtnActions btn={{ text: "Agregar", styles: "h-10", disabled: false, onClick: () => {} }} />
      </div>
    </div>
  );
};

export default DialogProductContent;
