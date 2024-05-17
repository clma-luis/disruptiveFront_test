import { Button } from "@/components/ui/Button";
import { GET_ALL_VALUE } from "@/shared/constants/defaultConsts";

import { cn } from "@/lib/utils";
import { sidebarData } from "../config";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentValue: string;
  navigateToSection: (value: string) => void;
}

export function SidebarMenu(props: SidebarProps) {
  const { className, currentValue, navigateToSection } = props;

  const handleNavigateToSection = (value: string) => {
    navigateToSection && navigateToSection(value);
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {sidebarData.map((item) => (
            <div key={item.categoryName}>
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{item.categoryName}</h2>
              <div className="space-y-1">
                <Button
                  variant={currentValue === GET_ALL_VALUE ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleNavigateToSection(GET_ALL_VALUE)}
                >
                  Todas
                </Button>
                {item.categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={currentValue === category.name ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleNavigateToSection(category.name)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
