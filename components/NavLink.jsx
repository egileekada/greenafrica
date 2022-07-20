import { cloneElement } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export function NavLink({ children, activeClassName, ...rest }) {
  const { asPath } = useRouter();
  const childClassName = rest.className ?? "";
  const newClassName = `${childClassName} ${activeClassName ?? ""}`;
  const className = asPath === rest.href ? newClassName.trim() : childClassName;

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}
