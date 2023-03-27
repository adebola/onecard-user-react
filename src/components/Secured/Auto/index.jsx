import { Link, useNavigate } from "react-router-dom";
import { MdAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import {
  deleteSingleAutoRechargePlan,
  editSingleAutoRechargePlan,
  getAutoRechargePlans,
  getSingleAutoRechargePlan,
} from "../../../helper/requests";
import { monthly, weekly } from "./data";

import AutoModal from "./Modal";
import Container from "../../Container";
import DatePicker from "react-datepicker";
import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";
import { ModalContext } from "../../../context/ModalProvider";
import Select from "./Select";
import { SingleContext } from "../../../context/SingleRecharge";
import SmallText from "../../SmallText";
import TopHeader from "../../TopNav";
import Wrapper from "../../Wrapper";
import { convertDate } from "../../../utils/dateformat";
import { convertNewDate } from "../../../utils/format.start.end";
import styled from "styled-components";

const One = styled.div`
  width: 50%;
  @media (max-width: 769px) {
    width: 100%;
  }
`;
const Two = styled.div`
  flex: 1;
`;

const ContainerPlans = styled.div``;

const ListContainer = styled.div`
  width: 100%;
`;

const Each = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--light-background);
  margin: 10px 0;
  padding: 5px 0;
`;

const MonthlyDetails = styled.div`
  border: 1.5px solid var(--light-background);
  border-radius: 3px;
  padding: 10px;
  display: flex;
  align-items: center;
  color: var(--text-color);
  font-size: 14px;
  justify-content: space-between;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.4;
  }

  .icon:hover {
    opacity: 1;
  }
`;

const EachDetails = styled.div`
  border: 1.5px solid var(--light-background);
  border-radius: 3px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
  font-size: 14px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.4;
  }

  .icon:hover {
    opacity: 1;
  }
`;

const Detail = styled.div`
  border: 1.5px solid var(--light-background);
  border-radius: 3px;
  padding: 10px;

  div {
    display: flex;
    margin-bottom: 1px;
  }

  p {
    font-size: 12px;
    margin-right: 6px;
    color: var(--text-color);
  }
`;

const EachInput = styled.input`
  outline: none;
  border: 1.5px solid var(--light-background);
  border-radius: 3px;
  padding: 10px;
  display: flex;
  width: 100%;
  color: var(--text-color);
  font-size: 14px;

  &.active {
    border: 1px solid var(--btn-color);
  }
`;

const Item = styled.div``;

const EachItem = styled.div`
  font-size: 15px;
  cursor: pointer;
  color: #222;
  display: flex;
  flex-wrap: wrap;
`;

const EachAction = styled.div`
  display: flex;
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    border-radius: 50%;
    background: var(--btn-color);
    color: var(--white);
  }
`;

const DetailsContainer = styled.div``;

const BoldText = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: var(--btn-color);
  margin: 10px 0;
`;

const Weekly = styled.form``;

const EachText = styled.div`
  margin: 0 5px 0px 5px;
  font-size: 14px;
  color: ${({ color }) => color && color};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2px;
  display: flex;
  margin: 2px;
  padding: 7px 7px;
  background: ${({ bg }) => bg && bg};
  color: white;
`;

const ButtonContainer = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Button = styled.button`
  width: 150px;
  cursor: pointer;
  padding: 17px 10px;
  margin-top: 20px;
  background: var(--btn-color);
  outline: none;
  border: none;
  color: var(--white);
  border-radius: 6px;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const NoAutoText = styled.div`
  color: var(--text-color);
  font-size: 12px;
  font-style: italic;
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255, 0.7);
`;

const CreateButton = styled(Link)`
  width: 150px;
  cursor: pointer;
  padding: 17px 10px;
  text-decoration: none;
  margin-top: 20px;
  background: var(--btn-color);
  outline: none;
  border: none;
  color: var(--white);
  border-radius: 6px;
  margin-bottom: 30px;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const AddRechargeModal = styled(Modal)`
  background: rgb(0, 0, 0, 0.6);
  height: 100vh;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 20;
  justify-content: center;
`;

const Blank = styled.div`
  width: 20px;
  cursor: pointer;
`;

const IconBlank = styled(Blank)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 9px;
`;

const AutoRecharge = () => {
  const navigate = useNavigate();

  const { monthlyAutoRecharge, weeklyAutoRecharge, setRechargeType } =
    useContext(ModalContext);

  const {
    name,
    setName,
    startDate,
    setStartDate,
    setAutoRecharge,
    setBoldText,
    endDate,
    setEndDate,
    boldText,
    autoRecharge,
  } = useContext(SingleContext);

  const [showOutline, setShowOutline] = useState(false);

  const [nameEdit, setNameEdit] = useState(false);
  const [rechargeEdit, setRechargeEdit] = useState(false);
  const [startDateEdit, setStartDateEdit] = useState(false);
  const [endDateEdit, setEndDateEdit] = useState(false);

  const [details, setDetails] = useState([]);
  const [singleDetail, setSingleDetail] = useState("");

  const [id, setId] = useState(0);
  const [editId, setEditId] = useState(1);

  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState(false);
  const [reload, setReload] = useState(false);

  const [done, setDone] = useState(false);
  const [recharge, setRecharge] = useState([]);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const response = await getAutoRechargePlans();
        if (response.data.list.length === 0) {
          setText(true);
        } else {
          setDetails(response.data.list);
        }
      } catch (error) {
        const message = error.response.data.message;
        console.log(message);
      }
    };

    awaitResponse();
  }, []);

  useEffect(() => {
    if (reload || !done) {
      const awaitResponse = async () => {
        try {
          const response = await getAutoRechargePlans();

          if (response.data.list.length === 0) {
            setText(true);
            setDetails([]);
          } else {
            setDetails(response.data.list);
          }
        } catch (error) {
          const message = error.response.data.message;
          console.log(message);
        }
      };

      awaitResponse();
    }
    setReload(false);
  }, [reload, text, done]);

  const handleClick = async (e, title) => {
    setId(e);
    setSingleDetail(title);
    navigate({
      pathname: "/auto",
      search: `?id=${e}`,
    });

    try {
      const response = await getSingleAutoRechargePlan(e);
      setName(response.data.title);
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
      setRecharge(response.data.recipients);

      if (response.data.daysOfWeek) {
        setBoldText("Weekly");
        setAutoRecharge(response.data.daysOfWeek);
      } else {
        setAutoRecharge(response.data.daysOfMonth);
        setBoldText("Monthly");
      }
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setModal(true);
    setDone(true);
    let splitStartDate = startDate.toString().split(" ")[0];

    let isNum = isNaN(splitStartDate.charAt(0));

    const checkEndDate = (str) => {
      if (str === null) {
        return null;
      } else {
        let splitStartDate = str.toString().split(" ")[0];
        let isNum = isNaN(splitStartDate.charAt(0));
        if (isNum) {
          return convertDate(str);
        } else {
          return str;
        }
      }
    };

    const data = {
      title: name,
      startDate: isNum ? convertDate(startDate) : startDate,
      endDate: checkEndDate(endDate),
      daysOfWeek:
        boldText === "Weekly" && weeklyAutoRecharge.length === 0
          ? autoRecharge
          : weeklyAutoRecharge,
      daysOfMonth:
        boldText === "Monthly" && monthlyAutoRecharge.length === 0
          ? autoRecharge
          : monthlyAutoRecharge,
      recipients: recharge.map((e) => {
        if (e.id) {
          delete e.id;
        }
        return e;
      }),
    };

    try {
      const response = await editSingleAutoRechargePlan(id, data);
      if (response.status === 204) {
        setDone(false);
        setId(0);
        setRechargeEdit(false);
        setStartDateEdit(false);
        setEndDateEdit(false);
      }
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
      setDone(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteSingleAutoRechargePlan(id);
      if (response.status === 204) {
        setReload(true);
        setId(0);
      }
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const renderRecharge = () => {
    return (
      <ContainerPlans>
        <ListContainer>
          {text && details.length === 0 && (
            <NoAutoText>You don't have any recharge yet</NoAutoText>
          )}

          {details.map(({ id, title }) => (
            <Item>
              <Each key={id}>
                <EachItem onClick={() => handleClick(id, title)}>
                  {title}
                </EachItem>
                <EachAction>
                  <Icon onClick={() => handleDelete(id)}>
                    <MdDeleteOutline />
                  </Icon>
                </EachAction>
              </Each>
            </Item>
          ))}
        </ListContainer>
      </ContainerPlans>
    );
  };

  const renderDetails = () => {
    return (
      <DetailsContainer>
        <Weekly onSubmit={handleSubmit}>
          <div>
            <BoldText>Name</BoldText>
            {editId === 1 && nameEdit ? (
              <EachInput
                className={nameEdit && showOutline && "active"}
                onBlur={() => {
                  setShowOutline(false);
                  setNameEdit(false);
                  setEditId(0);
                }}
                onChange={({ target }) => setName(target.value)}
                placeholder={"Name"}
                value={name}
              />
            ) : (
              <EachDetails>
                <div>
                  <p>{name !== "" ? name : singleDetail}</p>
                </div>
                <div
                  onClick={() => {
                    setNameEdit(true);
                    setShowOutline(true);
                    setEditId(1);
                  }}
                  className="icon"
                >
                  <MdEdit />
                </div>
              </EachDetails>
            )}
          </div>
          <div>
            <BoldText>{boldText}</BoldText>

            <div>
              {!rechargeEdit ? (
                <MonthlyDetails>
                  <EachItem>
                    {boldText === "Monthly" &&
                      monthly
                        .filter((item) => autoRecharge.includes(item.id))
                        .map(({ id, background, color, value }) => (
                          <Inner key={id} bg={background}>
                            <EachText color={color}>{value}</EachText>
                          </Inner>
                        ))}

                    {boldText === "Weekly" &&
                      weekly
                        .filter((item) => autoRecharge.includes(item.id))
                        .map(({ id, background, color, value }) => (
                          <Inner key={id} bg={background}>
                            <EachText color={color}>{value}</EachText>
                          </Inner>
                        ))}
                  </EachItem>
                  <div
                    onClick={() => {
                      setRechargeEdit(true);
                    }}
                  >
                    <MdEdit className="icon" />
                  </div>
                </MonthlyDetails>
              ) : (
                <Select
                  text={boldText}
                  data={boldText === "Weekly" ? weekly : monthly}
                />
              )}
            </div>
          </div>
          <div>
            <BoldText>Start Date</BoldText>

            {editId === 2 && startDateEdit ? (
              <DatePicker
                selected={new Date(startDate)}
                onChange={(date) => setStartDate(date)}
                showTimeSelect={true}
                dateFormat={"MMMM d, yyyy h:mm aa"}
              />
            ) : (
              <EachDetails>
                <div>
                  <p>{startDate && convertNewDate(startDate)}</p>
                </div>
                <div
                  onClick={() => {
                    setEditId(2);
                    setStartDateEdit(true);
                    setShowOutline(true);
                  }}
                  className="icon"
                >
                  <MdEdit />
                </div>
              </EachDetails>
            )}
          </div>

          <div>
            <BoldText>End Date</BoldText>
            {editId === 3 && endDateEdit ? (
              <DatePicker
                selected={!endDate ? new Date() : new Date(endDate)}
                onChange={(date) => setEndDate(date)}
                showTimeSelect={true}
                dateFormat={"MMMM d, yyyy h:mm aa"}
              />
            ) : (
              <EachDetails>
                <div>
                  <p>{endDate && convertNewDate(endDate)}</p>
                </div>
                <div
                  onClick={() => {
                    setEditId(3);
                    setEndDateEdit(true);
                    setShowOutline(true);
                  }}
                  className="icon"
                >
                  <MdEdit />
                </div>
              </EachDetails>
            )}
          </div>

          <div>
            <div style={{ display: "flex" }}>
              <BoldText>Recipient</BoldText>
              <IconBlank>
                <MdAdd color="#114A80" onClick={() => setModal(true)} />
              </IconBlank>
            </div>
            <Detail>
              {recharge.map((each, i) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={each.id}
                  >
                    <div>
                      <p>{each.recipient}</p>
                      <p>{each.serviceCode}</p>
                      <p>{each.serviceCost}</p>
                    </div>
                  </div>
                );
              })}
            </Detail>
          </div>

          <ButtonContainer>
            <Button>Save Changes</Button>
          </ButtonContainer>
        </Weekly>
      </DetailsContainer>
    );
  };

  const renderModal = () => {
    return <Modal></Modal>;
  };

  const renderAddRecharge = () => {
    return (
      <AddRechargeModal>
        <AutoModal setModal={setModal} />
      </AddRechargeModal>
    );
  };

  return (
    <>
      <>
        <HamburgerMenu toggle={toggle} setToggle={setToggle} />
        <MenuList toggle={toggle} setToggle={setToggle} />
        <Wrapper>
          <TopHeader header="Auto Recharge" />
          <Container>
            <One>
              <SmallText text="Recharges" />
              {renderRecharge()}

              <div
                style={{
                  marginTop: "40px",
                  marginBottom: "30px",
                }}
              >
                {(text || details.length !== 0) && (
                  <CreateButton
                    to="/bulk"
                    onClick={() => {
                      setRechargeType(3);
                    }}
                  >
                    Create AutoRecharge
                  </CreateButton>
                )}
              </div>
            </One>
            {id !== 0 && recharge.length > 0 && (
              <Two>
                <SmallText
                  text={`${name ? name : singleDetail}'s Recharge Details`}
                />
                {id !== 0 && renderDetails()}
              </Two>
            )}
          </Container>

          {done && renderModal()}
          {modal && renderAddRecharge()}
        </Wrapper>
      </>
    </>
  );
};

export default AutoRecharge;
