import { TabItem, TabItemProps } from "@/components/TabItem";
import React, { ReactElement, useState } from "react";


export interface TabListProps {
  activeTabIndex?: number; // Сделаем это свойство необязательным
  children: ReactElement<TabItemProps>[]; // Дочерние элементы
}

export const TabList: React.FC<TabListProps> = ({ children, activeTabIndex = 0 }) => {
  const [activeTab, setActiveTab] = useState(activeTabIndex);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabs = React.Children.toArray(children).filter(
    (child): child is ReactElement<TabItemProps> =>
      React.isValidElement(child) && child.type === TabItem
  );

  return (
    <div className="w-full h-full flex flex-col">
      <nav className="mb-2">
        <ul className="flex justify-center" role="tablist">
          {tabs.map((tab, index) => (
            <li key={`tab-${index}`}>
              <button
                role="tab"
                onClick={() => handleTabClick(index)}
                className={`flex flex-row justify-center gap-2 mb-1 text-lg px-4 py-1 rounded-full 
                ${activeTab === index ? 'bg-[var(--additional-hint-fill)]' : 'text-[var(--native-hint-color)]'} `}
              >
                {tab.props.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full h-full">
        {tabs[activeTab]} {/* Отображение контента активного таба */}
      </div>
    </div>
  );
};


