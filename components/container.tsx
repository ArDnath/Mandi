import {cn} from "@/lib/utils";
import React, { Children, ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    className,
}) => {
    return <div className={cn("max-w-7xl mx-auto px-4 ", className)}>{children}</div>

};