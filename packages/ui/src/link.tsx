import { LinkProps, default as NextLink } from "next/link";
import React, { forwardRef } from "react";

type JFSTechLink = React.ForwardRefExoticComponent<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps & {
      children?: React.ReactNode;
    } & React.RefAttributes<HTMLAnchorElement>
>;

// export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, ...props }, ref) => {
//   const isExternal = href ? href.toString().startsWith('http') || href.toString().startsWith('//') : false;
//   const newTarget = isExternal ? '_blank' : undefined;
//   const newHref = isExternal ? '/external?href=' + encodeURIComponent(href as string) : href;
//   const url = new URL(href as string);
//   return <NextLink {...props} children={children} href={href} target={newTarget} ref={ref} />;
// });

export const Link: JFSTechLink = forwardRef<
  HTMLAnchorElement,
  LinkProps & { children?: React.ReactNode }
>(({ href, children, ...props }, ref) => {
  const isExternal = href
    ? href.toString().startsWith("http") || href.toString().startsWith("//")
    : false;
  const newTarget = isExternal ? "_blank" : undefined;
  const newHref = isExternal
    ? "/external/" + encodeURIComponent(href as string)
    : href;
  return (
    <NextLink
      {...props}
      children={children}
      href={newHref}
      target={newTarget}
      ref={ref}
    />
  );
});

export default Link;
