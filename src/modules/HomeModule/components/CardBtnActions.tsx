"use client";

import { Button } from "@/components/ui/Button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export interface ProductBtnActionsProps {
    btn: {text: string, onClick: () => void, disabled: boolean, styles: string}
}

const ProductBtnActions = (props: ProductBtnActionsProps) => {
    const { btn } = props;
  return (
    <div className="grid grid-cols-2 gap-4 justify-between items-center mt-2">
      <div className="w-full flex justify-between items-center">
        <Button variant="outline" size="icon" className="h-6 w-6 md:h-8 md:w-8 shrink-0 rounded-full" onClick={() => {}} disabled={false}>
          <MinusIcon className="h-2 w-2 md:h-4 md:w-4" />
          <span className="sr-only">Restar</span>
        </Button>
        <div className="">
          <div className=" font-bold tracking-tighter">1</div>
        </div>
        <Button variant="outline" size="icon" className="h-6 w-6 md:h-8 md:w-8 shrink-0 rounded-full" onClick={() => {}} disabled={false}>
          <PlusIcon className="h-2 w-2 md:h-4 md:w-4" />
          <span className="sr-only">Sumar</span>
        </Button>
      </div>

      <Button className={`h-8 ${ btn.styles as string}`} disabled={false}>
        {btn.text}
      </Button>
    </div>
  );
};

export default ProductBtnActions;
