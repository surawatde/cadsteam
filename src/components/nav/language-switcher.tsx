"use client";

import { useLocale } from "next-intl";
import { GlobeIcon } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const locales = [
  { value: "en", label: "English" },
  { value: "th", label: "ไทย" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "km", label: "ខ្មែរ" },
  { value: "lo", label: "ລາວ" },
  { value: "my", label: "မြန်မာ" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLabel =
    locales.find((item) => item.value === locale)?.label ?? locale.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          "px-3 gap-2"
        )}
      >
        <GlobeIcon className="size-4 opacity-80" />
        <span className="text-sm">{currentLabel}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 border-white/20 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B132B]/85"
      >
        {locales.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => {
              router.replace(pathname, { locale: item.value });
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

