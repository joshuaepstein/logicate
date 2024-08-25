"use client";

import { Button } from "../button";
import { Input } from "../input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { cn } from "@logicate/ui";
import { Paintbrush } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const gradients: {
  [key: string]: string;
} = {
  "Blue Sky": "linear-gradient(to bottom right, #AEC6CF, #E7F0FD)",
  "Light Gray": "linear-gradient(to bottom right, #FCE883, #EEEEEC)",
  "Minty Fresh": "linear-gradient(to bottom right, #98FB98, #D5D4D0)",
  "Soft Pink": "linear-gradient(to bottom right, #F6B4D2, #FFDAB9)",
  "Pastel Purple": "linear-gradient(to bottom right, #B19CD9, #F0F0F0)",
  "Peachy Green": "linear-gradient(to bottom right, #FFDAB9, #98FB98)",
  "Slate Gray": "linear-gradient(to bottom right, #6E7B8B, #434343)",
  "Black and White": "linear-gradient(to bottom right, #000000, #F0F0F0)",
  "Blue Sky with Edge": "linear-gradient(to bottom right, #AEC6CF, #434343)",
  "Violet Blues": "linear-gradient(to bottom right, #FCE883, #7918F2, #F0F0F0)",
  "Cherry Blossoms":
    "linear-gradient(to bottom right, #F953C6, #7918F2, #F0F0F0)",
  "Sunset Orange":
    "linear-gradient(to bottom right, #EE0979, #FF6A00, #F0F0F0)",
  "Fiery Red": "linear-gradient(to bottom right, #F00000, #DC281E, #F0F0F0)",
  "Ocean Blue": "linear-gradient(to bottom right, #00C6FF, #0072FF, #F0F0F0)",
  Aquamarine: "linear-gradient(to bottom right, #4FACFE, #00F2FE, #F0F0F0)",
  "Refreshing Green":
    "linear-gradient(to bottom right, #0BA360, #3CBA92, #F0F0F0)",
};

export function PickerExample() {
  const [background, setBackground] = useState("#B4D455");

  return (
    <div
      className="preview flex size-full min-h-[350px] items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
      style={{ background: getBackground(background) }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  );
}

function getBackground(background: string) {
  var background_ = background;

  if (background_.includes("Gradient")) {
    background_ = background_
      .replaceAll(" (Gradient)", "")
      .replaceAll(" Gradient", "");
    // background_ = gradients[background_]
    var gradient = gradients[background_];
    if (gradient) background_ = gradient;
    else background_ = "linear-gradient(to bottom right, #AEC6CF, #E7F0FD)";
  }

  return background_;
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    "#70e2ff",
    "#FCE883",
    "#98FB98",
    "#F6B4D2",
    "#B19CD9",
    "#FFDAB9",
    "#5E6B7B",
    "#E6E6ED",
  ];

  const defaultTab = useMemo(() => {
    if (background.includes("gradient")) return "gradient";
    for (const gradient of Object.keys(gradients)) {
      if (background.includes(gradient)) return "gradient";
    }
    return "solid";
  }, [background]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"borders"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !background && "text-neutralgrey-700 dark:text-neutralgrey-600",
            className,
          )}
        >
          <div className="flex w-full items-center gap-2">
            {background ? (
              <div
                className="size-4 rounded !bg-cover !bg-center transition-all"
                style={{ background: getBackground(background) }}
              ></div>
            ) : (
              <Paintbrush className="size-4" />
            )}
            <div className="flex-1 truncate">
              {background || "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="size-6 cursor-pointer rounded-md active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="mb-2 flex flex-wrap gap-1">
              {Object.keys(gradients).map((g) => (
                <div
                  key={g}
                  style={{ background: gradients[g] }}
                  className="size-6 cursor-pointer rounded-md active:scale-105"
                  onClick={() => {
                    setBackground(g + " (Gradient)");
                  }}
                />
              ))}
            </div>

            <p className="text-neutralgrey-700 pb-2 text-sm">
              Feel like there should be more or a change in gradients?
            </p>
            {/* <GradientButton
              background={gradients['Slate Gray']}
              href={'https://jfstech.uk/events/suggest-gradients'}
            >
              <p className="font-medium text-base-white">Suggest A Change Here</p>
            </GradientButton> */}
          </TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 mt-4 h-8"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}

const GradientButton = ({
  background,
  children,
  href,
}: {
  background: string;
  children: React.ReactNode;
  href?: string;
}) => {
  if (href) {
    return (
      <Link
        className="relative block rounded-md !bg-cover !bg-center p-0.5 transition-all hover:scale-105 active:scale-95"
        style={{ background }}
        href={href}
      >
        <div className="p-1 text-center text-xs">{children}</div>
      </Link>
    );
  }

  return (
    <div
      className="relative rounded-md !bg-cover !bg-center p-0.5 transition-all"
      style={{ background }}
    >
      <div className="p-1 text-center text-xs">{children}</div>
    </div>
  );
};
