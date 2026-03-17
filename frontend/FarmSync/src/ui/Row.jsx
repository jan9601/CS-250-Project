/**
 * Row Component
 * -------------
 * Reusable layout utility component used to structure content in rows.
 *
 * It supports two layout types:
 * - "vertical" (default)-> flex column with spacing
 * - "horizontal" -> flex row with space-between alignment
 *
 * This component helps maintain consistent spacing and alignment
 * across dashboard sections and feature blocks.
 *
 * If more layout variations are needed, extend the "variants" object below.
 */

function Row({
  type = "vertical",
  children,
  className = "", // Allows additional custom styles when needed
}) {
  const variants = {
    vertical: "flex flex-col gap-6",
    horizontal: "flex justify-between items-center",
  };

  return (
    <div className={`${variants[type] ?? variants.vertical} ${className}`}>
      {children}
    </div>
  );
}

export default Row;
