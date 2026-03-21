/**
 * Button Component
 * ----------------
 * Reusable UI button component used across the entire application.
 *
 * Supports:
 * - Size variations (small, medium, large)
 * - Style variations (primary, secondary, danger, ghost)
 *
 * This component centralizes styling to ensure visual consistency.
 *
 * If new variations are needed, update the "variations" object below.
 */

const base =
  "inline-flex items-center justify-center rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const sizes = {
  small: "text-xs px-3 py-1.5 uppercase font-semibold",
  medium: "text-sm px-4 py-3 font-medium",
  large: "text-base px-6 py-3 font-medium",
};

const variations = {
  primary:
    "bg-action-primary text-white enabled:hover:bg-action-hover disabled:cursor-not-allowed focus:ring-action-light",
  secondary:
    "bg-surface text-text-primary border border-border enabled:hover:bg-bg focus:ring-action-light",
  danger: "bg-error text-white enabled:hover:brightness-90 focus:ring-error ",
  ghost:
    "bg-transparent text-text-secondary p-0 border-none shadow-none hover:bg-bg focus:ring-action-light",
};

export default function Button({
  children,
  size = "medium",
  variation = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const classes =
    `${base} ${sizes[size]} ${variations[variation]} ${className}`.trim();

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
