import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface Props {
  className?: string;
  to: string;
  children: string;
}

export const Link = ({ className, to, children }: Props) => (
  <ReactRouterLink className={className} to={to}>
    {children}
  </ReactRouterLink>
);
