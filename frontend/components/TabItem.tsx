import React, {ReactNode} from "react";

export interface TabItemProps extends React.ComponentProps<"div"> {
  label: string;
  children: ReactNode;
}

export const TabItem: React.FC<TabItemProps> = ({label, children, className, ...props}) => (
  <div key={label} className={className ?? "w-full min-h-full"} {...props}>
    {children}
  </div>
);

export default TabItem;