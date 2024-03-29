import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import React, { ReactNode } from 'react';

interface CustomNavLinkProps {
  to: string;
  children: ReactNode;
  // Include any other props you might need, for instance, 'className' if you plan to allow custom classes
}

export const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink
      to={to}
      {...props}
      className={() =>
        `header text-textPrimary hover:border-b hover:border-primary py-2 transition-all duration-500 px-2 ${
          match ? 'border-b-2 border-primary' : ''
        }`
      }
    >
      {children}
    </NavLink>
  );
};