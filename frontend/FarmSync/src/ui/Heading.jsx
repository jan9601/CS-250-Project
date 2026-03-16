/**
 * Heading Component
 * -----------------
 * Centralized typography component for page and section titles.
 *
 * Ensures consistent font sizes and weights across the application.
 *
 * Available types:
 * - h1 → Main page title
 * - h2 → Section title
 * - h3 → Subsection title
 *
 * If design system changes, update sizes here.
 */

function Heading({type = "h1", children, className = ""}) {
  const variants = {
    h1: "text-3xl font-semibold",
    h2: "text-2xl font-semibold",
    h3: "text-xl font-medium",
  };

  if (type === "h1")
    return <h1 className={`${variants.h1} ${className}`}>{children}</h1>;

  if (type === "h2")
    return <h2 className={`${variants.h2} ${className}`}>{children}</h2>;

  return <h3 className={`${variants.h3} ${className}`}>{children}</h3>;
}

export default Heading;
