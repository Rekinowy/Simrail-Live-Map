export const tooltipStyle = {
  base: ["dark:before:bg-light_primary_light dark:before:dark:bg-primary_dark"],
  content: [
    "p-1.5 shadow-xl rounded-md opacity-90",
    "text-[10px] text-primary dark:text-light_gray bg-light_primary_light dark:bg-primary_dark",
  ],
};

export const tooltipDelay = 1500;

export const switchStyles = {
  thumb: "bg-primary_light dark:bg-light_gray",
  wrapper:
    "mx-2 bg-light_primary_light group-data-[selected=true]:bg-light_primary_dark dark:bg-gray-800 dark:group-data-[selected=true]:bg-gray-500",
};

export const sliderStyles = {
  base: "max-w-md gap-2",
  label: "text-base",
  value: "text-md",
  filler: "bg-primary_light dark:bg-light_gray",
  track: "bg-gray-200 border-l-primary dark:bg-gray-600/50 dark:border-l-slate-300",
  step: "data-[in-range=false]:bg-slate-300 data-[in-range=true]:bg-primary dark:data-[in-range=false]:bg-primary_dark/50 dark:data-[in-range=true]:bg-light_gray",
};

export const selectStyles = {
  base: "px-2",
  trigger:
    "border border-slate-400 dark:border-slate-800 bg-light_primary_light hover:bg-light_primary_light/80 dark:bg-primary_dark dark:hover:bg-primary_dark/70 transition",
  popoverContent: "rounded-lg text-primary bg-slate-200 dark:bg-primary_dark dark:text-light_gray",
};
