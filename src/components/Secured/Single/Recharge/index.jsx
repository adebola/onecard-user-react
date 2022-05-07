import React, { useContext, useEffect } from "react";
import ScheduleDatePicker from "../../../DatePicker";

import {
  RechargeBox,
  RechargeContainer,
  RechargeInner,
  SmallText,
} from "./styles";
import { ModalContext } from "../../../../context/ModalProvider";
import Auto from "./Auto";

const Recharge = () => {
  const { rechargeType, setRechargeType } = useContext(ModalContext);

  useEffect(() => {
    setRechargeType(1);
  }, [setRechargeType]);

  const rechargeOptions = [
    {
      id: 1,
      text: "Instant Recharge",
    },
    {
      id: 2,
      text: "Schedule Recharge",
    },
    {
      id: 3,
      text: "Auto Recharge",
    },
  ];

  return (
    <RechargeContainer>
      <SmallText>Select recharge type</SmallText>

      <RechargeInner>
        {rechargeOptions.map((each) => {
          return (
            <div key={each.id}>
              <RechargeBox
                onClick={() => {
                  setRechargeType(each.id);
                }}
                className={each.id === rechargeType && "active"}
              >
                {each.text}
              </RechargeBox>
              {each.id === 2 && rechargeType === 2 && <ScheduleDatePicker />}
              {each.id === 3 && rechargeType === 3 && <Auto />}
            </div>
          );
        })}
      </RechargeInner>
    </RechargeContainer>
  );
};

export default Recharge;
