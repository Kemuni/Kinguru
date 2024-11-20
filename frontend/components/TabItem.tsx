import {ReactNode} from "react";

export interface TabItemProps {
  label: string;
  children: ReactNode;
}

export const TabItem: React.FC<TabItemProps> = ({label, children}) => (
  <div key={label} className="w-full h-full">
    {children}
  </div>
);

export default TabItem;