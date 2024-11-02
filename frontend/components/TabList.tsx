"use client"

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
    (child): child is ReactElement<TabItemProps> => {
      // Проверяем, является ли child элементом React
      if (React.isValidElement(child)) {
        console.log("Child type:", child.type); // Логируем тип дочернего элемента
        return child.type === TabItem; // Проверяем, является ли тип TabItem
      }
      return false; // Возвращаем false, если не React элемент
    }
  );

  return (
    <div className="tabs">
      <nav className="tab-list-wrapper">
        <ul className="tab-list" role="tablist">
          {tabs.map((tab, index) => (
            <li key={`tab-${index}`}>
              <button
                role="tab"
                onClick={() => handleTabClick(index)}
                className={`tab-btn ${activeTab === index ? 'tab-btn--active' : ''}`}
              >
                {tab.props.label} {/* Отображение label */}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {tabs[activeTab]} {/* Отображение контента активного таба */}
      </div>
    </div>
  );
};