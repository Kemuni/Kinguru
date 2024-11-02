import {ReactNode} from "react";

export interface TabItemProps {
  label: string;
  children: ReactNode;
}

export const TabItem: React.FC<TabItemProps> = ({label, children}) => (
  <div>
    {children}
  </div>
);

TabItem.displayName = "TabItem";