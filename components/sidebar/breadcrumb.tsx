"use client";
import React, { ReactElement } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

export const Breadcrumbs = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const path = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    const segments = path.split("/").filter((segment) => segment !== "");

    return segments.map((segment, index) => ({
      href: `/${segments.slice(0, index + 1).join("/")}`,
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
    }));
  };

  const toReadable = (str: string) => {
    return str
      .replace(/-/g, " ")
      .split(" ")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <Separator orientation="vertical" className="mr-2 h-4" />
        {breadcrumbs
          .filter((breadcrumb) => breadcrumb.label !== "Dashboard")
          .map((breadcrumb, index) =>
            index === breadcrumbs.length - 2 ? (
              <BreadcrumbItem key={breadcrumb.href}>
                <BreadcrumbPage>{toReadable(breadcrumb.label)}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <React.Fragment key={breadcrumb.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={breadcrumb.href}>
                    {toReadable(breadcrumb.label)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            )
          )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
