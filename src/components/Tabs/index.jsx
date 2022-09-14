import { Tab } from "@headlessui/react";
import styled from "styled-components";
import { useState } from "react";

const StyledTab = styled(Tab)`
  padding: 0.5rem 0;
  margin-right: 0.5rem;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  &.active {
    margin-top: 3px;
    color: var(--text-color);
    font-weight: bold;
    border-bottom: 1px solid var(--text-color);
  }
`;

const Line = styled.div`
  height: 1px;
  background: #e4e7eb;
  width: 100%;
`;

const MyTabs = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const tabs = [
    { id: 1, name: "Manual Entry" },
    { id: 2, name: "File upload" },
  ];
  return (
    <Tab.Group selectedIndex={currentTabIndex} onChange={setCurrentTabIndex}>
      <div>
        <Tab.List>
          {tabs.map((each, index) => {
            return (
              <StyledTab
                key={each.id}
                className={currentTabIndex === index && "active"}
              >
                {each.name}
              </StyledTab>
            );
          })}
          <Line />
        </Tab.List>
      </div>

      <Tab.Panels>
        <Tab.Panel>
          <p>1</p>
        </Tab.Panel>
        <Tab.Panel>2</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default MyTabs;
