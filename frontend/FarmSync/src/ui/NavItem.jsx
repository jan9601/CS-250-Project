/**
 * NavItem Component
 * -----------------
 * Reusable navigation link for the sidebar.
 *
 * Handles:
 * - Base layout styling
 * - Hover state
 * - Active state (via React Router NavLink)
 *
 * This prevents repeating Tailwind classes across every sidebar item.
 *
 *
 * Active state uses 15% opacity of brand-primary
 * Hover state uses 20% opacity of brand-light
 * These values are standardized across the app.
 */

import {NavLink} from "react-router-dom";

function NavItem({to, icon, children}) {
  return (
    <li>
      <NavLink
        to={to}
        className={({isActive}) =>
          `
          flex items-center gap-3 px-4 py-3 rounded-md
          text-base transition-colors
          ${
            isActive
              ? "bg-brand-primary/15 text-brand-primary"
              : "text-text-secondary hover:bg-brand-light/20 hover:text-text-primary"
          }
        `
        }
      >
        {icon}
        <span>{children}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;
