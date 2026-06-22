import clsx from "clsx";

export const stepIcons = {
  1: "/icons/camera.svg",
  2: "/icons/sensors.svg",
  3: "/icons/protection.svg",
  4: "/icons/plan.svg",
} as const;

export function StepIcon({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  return (
    <img
      src={stepIcons[id as keyof typeof stepIcons]}
      alt=""
      aria-hidden="true"
      className={clsx("w-6 h-6", className)}
    />
  );
}
