import { Tab } from "@headlessui/react";
import styled from "styled-components";
import { useState } from "react";
import SingleTransaction from "../transactions/single";
import BulkTransaction from "../transactions/bulk";
import ScheduleTransaction from "../transactions/schedule";
import AutoTransaction from "../transactions/auto";
import WalletTransaction from "../transactions/wallet";

const StyledTab = styled(Tab)`
  padding: 0.5rem 0;
  margin-right: 0.5rem;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  width: 200px;
  &.active {
    margin-top: 3px;
    color: var(--btn-color);
    font-weight: bold;
    border-bottom: 1px solid var(--btn-color);
  }
`;

const Line = styled.div`
  height: 1px;
  background: #e4e7eb;
  width: 100%;
`;

const Padding = styled.div`
  padding: 30px 0;
`;

const MyTabs = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const tabs = [
    { id: 1, name: "Single Requests" },
    { id: 2, name: "Bulk Requests" },
    { id: 3, name: "Scheduled Requests" },
    { id: 4, name: "Auto Requests" },
    { id: 5, name: "Wallet Funding" },
  ];

  const renderNothings = () => {
    return (
      <div>
        <p>Working on it </p>
        <p>Contact Admin.</p>
      </div>
    );
  };

  return (
    <div>
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
            <Padding>
              <SingleTransaction />
            </Padding>
          </Tab.Panel>
          <Tab.Panel>
            <Padding>
              <BulkTransaction />
            </Padding>
          </Tab.Panel>
          <Tab.Panel>
            <Padding>
              <ScheduleTransaction />
            </Padding>
          </Tab.Panel>
          <Tab.Panel>
            <Padding>
              <AutoTransaction />
            </Padding>
          </Tab.Panel>
          <Tab.Panel>
            <Padding>
              <WalletTransaction />

              {/* <History value="wallet" header={_walletHeader} /> */}
            </Padding>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default MyTabs;
