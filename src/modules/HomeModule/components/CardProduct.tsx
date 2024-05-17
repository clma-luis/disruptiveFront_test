"use client";
import { ImageComponent } from "@/components/ImageComponent";
import { SkeletonCard } from "@/components/Skeletons/SkeletonCard";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/ContextMenu/context-menu";



import ProductBtnActions from "./CardBtnActions";
import { cn } from "@/lib/utils";

interface CardProductProps extends React.HTMLAttributes<HTMLDivElement> {
  hideBtnActions?: boolean;
  menu: {};
  state: {};
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  handleAction: (id: string) => void;
}

export const CardProduct = (carProductProps: CardProductProps) => {
  const {
    state,
    menu,
    aspectRatio = "portrait",
    hideBtnActions = false,
    width,
    height,
    handleAction,
    className,
    ...props
  } = carProductProps;

  const handleCurrentAction = (id: string) => {
    handleAction && handleAction(id);
  };

  if (false) return  <SkeletonCard />;

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md" onClick={() => handleCurrentAction("")}>
            <ImageComponent
              className={cn(
                " h-auto w-full object-cover transition-all hover:scale-105 rounded-md",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
              src={""}
              name={""}
              width={width as number}
              height={height as number}
              verticalPosition="-16px"
            />
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-bold leading-none">{"menu.name"}</h3>
        <div className="flex justify-between pb-2">
          <h3 className="font-medium leading-none">Disp: 20</h3>
          <h3 className="font-medium leading-none">hola</h3>
        </div>

        {!hideBtnActions && <ProductBtnActions btn={{ text: "Agregar", styles: "", disabled: false, onClick: () => {} }} />}
      </div>
    </div>
  );
};
