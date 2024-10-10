import { Link as RouterLink, LinkProps } from 'react-router-dom';

import { cn } from '@/utils/cn';

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={cn('text-link hover:text-link/90 underline mx-auto text-center block', className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
