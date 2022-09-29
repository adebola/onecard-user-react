import React, { useContext, useEffect, useState } from "react";
import { SingleRechargeContext } from "../../context/SingleRechargeContext";
import {
  Container,
  Grid,
  GridItem,
  GridText,
  Image,
  SmallText,
  StyledTab,
  Line,
  LoginContainer,
  Text,
  LoginButton,
} from "./styles";
import { data } from "../../data";
import Form from "../Form";

import PaymentMode from "../../components/PaymentMode";
import Button from "../Button/normal";
import WalletBalance from "../WalletBalance";
import {
  getDataPlans,
  getSingleRechargeResponse,
  makeAutoRechargeRequest,
  makeScheduleRecharge,
  makeSingleRecharge,
} from "../../helper/requests";
import Loader from "../Loader";
import { convertDate } from "../../utils/dateformat";
import { ModalContext } from "../../context/ModalProvider";
import { GlobalContext } from "../../context/GlobalProvider";
import { v4 } from "uuid";
import { BulkRechargeContext } from "../../context/BulkRecharge";
import {
  getAuthId,
  getIdDetails,
  removeAuthId,
  removeIdDetails,
  setAuthId,
  setIdDetails,
} from "../../helper";
import { getMessage, getPayStackMessage } from "../../utils/messages.response";
import { Tab } from "@headlessui/react";
import ExcelFileUpload from "../Secured/Bulk/RechargeDetails/ExcelFileUpload";
import UserServices from "../../services/UserServices";

const Card = ({ bulk, landing }) => {
  const tabs = [
    { id: 1, name: "Manual Entry" },
    { id: 2, name: "File upload" },
  ];

  const {
    setTabDetails,
    tabDetails,
    activeId,
    details,
    selectedId,
    setSelectedId,
    setErrors,
    setActiveId,
    setDetails,
    setIsSelect,
    setClicked,
    success,
    setLoading,
    setDataPlans,
    setShowModal,
    showModal,
    setSuccess,
    dataPlans,
    cardDetails,
  } = useContext(SingleRechargeContext);

  const { bulkRecharges, setBulkRecharges, setBulkData } =
    useContext(BulkRechargeContext);

  const [id, setId] = useState(getAuthId() ? getAuthId() : null);
  const [authUrl, setAuthUrl] = useState("");
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const { startDate, endDate } = useContext(GlobalContext);
  const auto = useContext(ModalContext);

  const scheduledDate = convertDate(startDate);

  useEffect(() => {
    if (authUrl !== "") {
      window.location = authUrl;
    }
  }, [authUrl]);

  const removeFromLocalStorage = () => {
    removeAuthId();
    removeIdDetails();
    setId(null);
  };

  useEffect(() => {
    if (id !== null) {
      getSingleRechargeResponse(id)
        .then((response) => {
          const data = getIdDetails();

          const msg = response.data.message;
          getPayStackMessage(
            msg,
            false,
            removeFromLocalStorage,
            data,
            data.r_type
          );
        })
        .catch((error) => {
          const msg = error.response.data.message;

          setTimeout(
            () => getPayStackMessage(msg, true, removeFromLocalStorage),
            1000
          );
        });
    }
  }, [id]);

  const {
    productId,
    recipient,
    serviceCode,
    serviceCost,
    paymentMode,
    accountType,
    telephone,
  } = details;

  //reset all values
  const resetForm = (type) => {
    setClicked(false);
    setDetails({
      ...details,
      productId: "",
      recipient: "",
      serviceCost: "",
      accountNumber: "",
      accountType: "",
      telephone: "",
      serviceCode: type ? type : "",
    });
  };

  useEffect(() => {
    setActiveId(0);
  }, [selectedId, setActiveId]);

  useEffect(() => {
    const _recipients = bulkRecharges.map(
      ({ recipient, serviceCode, type, serviceCost, name, productId }) => {
        let data;
        switch (type) {
          case "DATA":
            data = {
              recipient,
              serviceCode,
              productId,
            };
            break;
          case "AIRTIME":
            data = {
              recipient,
              serviceCode,
              serviceCost,
            };

            break;
          case "CABLE":
            data = {
              recipient,
              serviceCode,
              productId,
              name,
            };
            break;
          case "ELECTRICITY":
            data = {
              name,
              recipient,
              serviceCode,
              serviceCost,
            };
            break;
          default:
            break;
        }
        return data;
      }
    );

    switch (auto.rechargeType) {
      case 1:
        setBulkData({
          recipients: _recipients,
          paymentMode,
          rechargeType: "bulk",
          redirectUrl:
            paymentMode === "paystack"
              ? `${window.origin}${window.location.pathname}`
              : "",
        });
        break;
      case 2:
        setBulkData({
          recipients: _recipients,
          paymentMode,
          scheduledDate,
          rechargeType: "bulk",
          redirectUrl:
            paymentMode === "paystack"
              ? `${window.origin}${window.location.pathname}`
              : "",
        });
        break;
      case 3:
        setBulkData({
          title: auto.rechargeName,
          recipients: _recipients,
          paymentMode,
          rechargeType: "bulk",
          daysOfMonth: auto.monthlyAutoRecharge,
          daysOfWeek: auto.weeklyAutoRecharge,
          endDate: endDate && convertDate(endDate),
          startDate: startDate && convertDate(startDate),
          redirectUrl: `${window.origin}${window.location.pathname}`,
        });
        break;

      default:
        break;
    }
  }, [
    bulkRecharges,
    setBulkData,
    paymentMode,
    scheduledDate,
    bulk,
    auto,
    endDate,
    startDate,
  ]);

  useEffect(() => {
    if (selectedId === 1) {
      setDataPlans([]);
    }
  }, [selectedId, activeId, setDataPlans]);

  const handleSubmit = (e) => {
    ///TODO: handle paystack redirect
    e.preventDefault();
    setClicked(true);
    let data;

    // error handling
    if (selectedId === 1 && (productId === "" || recipient === "")) {
      return;
    }

    if (selectedId === 2 && (serviceCost === "" || recipient === "")) {
      return;
    }

    if (selectedId === 3 && (telephone === "" || serviceCost === "")) {
      return;
    }

    if (selectedId === 3 && (telephone === "" || serviceCost === "")) {
      return;
    }

    if (selectedId === 3 && (telephone === "" || serviceCost === "")) {
      return;
    }
    if (selectedId === 4 && productId === "") {
      return;
    }
    //DATA RECHARGE
    if (selectedId === 1) {
      ////////
      ////////////////////////////////
      //Instant Recharge
      data = {
        recipient,
        serviceCode,
        productId,
        paymentMode: landing ? "paystack" : paymentMode,
        redirectUrl:
          paymentMode === "paystack"
            ? `${window.origin}${window.location.pathname}`
            : "",
      };

      //Schedule data Recharge
      if (auto.rechargeType === 2) {
        data = {
          recipients: [
            {
              recipient,
              serviceCode,
              productId,
            },
          ],
          scheduledDate,
          rechargeType: "single",
          paymentMode,
          productId,
        };
      }

      //Auto data Recharge
      if (auto.rechargeType === 3) {
        data = {
          recipients: [
            {
              recipient,
              serviceCode,
              productId,
            },
          ],
          paymentMode,
          productId,
          daysOfMonth: auto.monthlyAutoRecharge,
          daysOfWeek: auto.weeklyAutoRecharge,
          endDate: convertDate(endDate),
          startDate: convertDate(startDate),
          title: auto.rechargeName,
        };
      }
    }
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    //AIRTIME RECHARGE
    if (selectedId === 2) {
      data = {
        recipient,
        serviceCode,
        serviceCost,
        paymentMode,
        redirectUrl:
          paymentMode === "paystack"
            ? `${window.origin}${window.location.pathname}`
            : "",
      };
      //
      //
      //Schedule airtime Recharge
      if (auto.rechargeType === 2) {
        data = {
          recipients: [
            {
              recipient,
              serviceCode,
              serviceCost,
            },
          ],
          scheduledDate,
          rechargeType: "single",
          paymentMode,
        };
      }
      //
      //
      //Auto airtime Recharge
      if (auto.rechargeType === 3) {
        data = {
          recipients: [
            {
              recipient,
              serviceCode,
              serviceCost,
            },
          ],
          paymentMode,
          daysOfMonth: auto.monthlyAutoRecharge,
          daysOfWeek: auto.weeklyAutoRecharge,
          endDate: convertDate(endDate),
          startDate: convertDate(startDate),
          title: auto.rechargeName,
        };
      }
    }

    // ELECTRICITY
    if (selectedId === 3) {
      if (activeId === 1) {
        data = {
          recipient,
          serviceCode,
          serviceCost,
          accountType,
          telephone,
          paymentMode,
          name: cardDetails.customerName,
        };
      } else {
        data = {
          recipient,
          serviceCode,
          serviceCost,
          telephone,
          paymentMode,
          name: cardDetails.customerName,
        };
      }
      //
      //schedule Electricity
      if (auto.rechargeType === 2) {
        if (activeId === 1) {
          data = {
            recipients: [
              recipient,
              serviceCode,
              serviceCost,
              accountType,
              telephone,
            ],
            scheduledDate,
            rechargeType: "single",
            paymentMode,
          };
        } else {
          data = {
            recipients: [
              {
                recipient,
                serviceCode,
                serviceCost,
                telephone,
              },
            ],
            scheduledDate,
            rechargeType: "single",
            paymentMode,
          };
        }
      }

      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      //Auto recharge
      if (auto.rechargeType === 3) {
        if (activeId === 1) {
          data = {
            recipients: [
              {
                recipient,
                serviceCode,
                serviceCost,
                accountType,
                telephone,
              },
            ],
            paymentMode,
            daysOfMonth: auto.monthlyAutoRecharge,
            daysOfWeek: auto.weeklyAutoRecharge,
            endDate: convertDate(endDate),
            startDate: convertDate(startDate),
            title: auto.rechargeName,
          };
        } else {
          data = {
            recipients: [
              {
                recipient,
                serviceCode,
                serviceCost,
                telephone,
              },
            ],
            paymentMode,
            daysOfMonth: auto.monthlyAutoRecharge,
            daysOfWeek: auto.weeklyAutoRecharge,
            endDate: convertDate(endDate),
            startDate: convertDate(startDate),
            title: auto.rechargeName,
          };
        }
      }
    }

    ////////////////////////////////////////////
    ////////////////////////////////////////////
    // CABLE
    if (selectedId === 4) {
      const name = dataPlans.find((each) => productId === each.code).name;
      data = {
        recipient,
        name,
        serviceCode,
        productId,
        paymentMode,
        redirectUrl:
          paymentMode === "paystack"
            ? `${window.origin}${window.location.pathname}`
            : "",
      };

      ////////////////////////////////
      ////////////////////////////////
      //Schedule Cable Recharge
      if (auto.rechargeType === 2) {
        data = {
          recipients: [
            {
              recipient,
              serviceCode,
              productId,
            },
          ],
          scheduledDate,
          rechargeType: "single",
          paymentMode,
        };
      }

      ////////////////////////////////
      ////////////////////////////////
      //Auto Cable Recharge
      if (auto.rechargeType === 3) {
        data = {
          recipients: [
            {
              recipient,
              serviceCode,
              productId,
            },
          ],
          paymentMode,
          daysOfMonth: auto.monthlyAutoRecharge,
          daysOfWeek: auto.weeklyAutoRecharge,
          endDate: convertDate(endDate),
          startDate: convertDate(startDate),
          title: auto.rechargeName,
        };
      }
    }

    // return;

    switch (auto.rechargeType) {
      ////////////////////////////////
      case 1:
        bulk ? handleBulkRequest(data) : instantRecharge(data);
        break;

      case 2:
        bulk ? handleBulkRequest(data) : scheduleRecharge(data);
        break;

      case 3:
        bulk ? handleBulkRequest(data) : autoRecharge(data);
        break;

      default:
        break;
    }
  };

  const rm = () => {
    setShowModal(false);
    resetForm();
    setActiveId(0);
  };

  const instantRecharge = async (data) => {
    let price;
    setShowModal(true);
    if (data.productId && data.serviceCode.includes("-DATA")) {
      price = dataPlans.find((each) => each.id === data.productId).price;
    }

    try {
      const response = await makeSingleRecharge(data);
      if (response.status === 200) {
        if (response.data.authorizationUrl) {
          setAuthUrl(response.data.authorizationUrl);
          setAuthId(response.data.id);
          setId(response.data.id);
          setShowModal(false);
          setIdDetails({
            serviceCode,
            serviceCost,
            recipient,
            r_type: auto.rechargeType,
          });
        } else {
          getMessage(
            "Instant Successful",
            false,
            rm,
            price,
            data,
            auto.rechargeType
          );
        }
      }
    } catch (error) {
      const msg = error.response.data.message;
      getMessage(msg, true, () => setShowModal(false));
    }
  };

  const scheduleRecharge = async (data) => {
    setShowModal(true);
    try {
      const response = await makeScheduleRecharge(data);
      if (response.data.authorizationUrl) {
        setAuthUrl(response.data.authorizationUrl);
        setAuthId(response.data.id);
        setId(response.data.id);
        setShowModal(false);
        setIdDetails({
          serviceCode,
          serviceCost,
          recipient,
          r_type: auto.rechargeType,
        });
      } else {
        getMessage(
          "Schedule Successful",
          false,
          rm,
          null,
          data,
          auto.rechargeType
        );
      }
    } catch (error) {
      const msg = error.response.data.message;
      getMessage(msg, true, () => setShowModal(false));
    }
  };

  const autoRecharge = async (data) => {
    setShowModal(true);
    try {
      const response = await makeAutoRechargeRequest(data);

      if (response.data.authorizationUrl) {
        setAuthUrl(response.data.authorizationUrl);
        setAuthId(response.data.id);
        setId(response.data.id);
        setShowModal(false);
        setIdDetails({
          serviceCode,
          serviceCost,
          recipient,
          r_type: auto.rechargeType,
        });
      } else {
        getMessage(
          "Autorecharge Successful",
          false,
          rm,
          null,
          data,
          auto.rechargeType
        );
      }
    } catch (error) {
      const msg = error.response.data.message;
      getMessage(msg, true, () => setShowModal(false));
    }
  };

  //Handle Bulk Recharges
  const handleBulkRequest = (data) => {
    let newData;

    const price = dataPlans.find((each) => {
      return data.productId === each.id || each.code;
    })?.price;

    newData = {
      id: v4(),
      type: serviceCode.split("-")[1],
    };

    switch (selectedId) {
      ////////AIRTIME
      case 1:
        auto.rechargeType === 1
          ? (newData = {
              ...newData,
              recipient: data.recipient,
              productId: data.productId,
              price,
              serviceCode: data.serviceCode,
            })
          : auto.rechargeType === 2
          ? (newData = {
              ...newData,
              recipient: data.recipients[0].recipient,
              productId: data.recipients[0].productId,
              price,
              serviceCode: data.recipients[0].serviceCode,
            })
          : (newData = {
              ...newData,
              recipient: data.recipients[0].recipient,
              productId: data.recipients[0].productId,
              price,
              serviceCode: data.recipients[0].serviceCode,
            });
        break;
      case 2:
        auto.rechargeType === 1
          ? (newData = {
              ...newData,
              recipient: data.recipient,
              serviceCost: data.serviceCost,
              serviceCode: data.serviceCode,
            })
          : auto.rechargeType === 2
          ? (newData = {
              ...newData,
              recipient: data.recipients[0].recipient,
              serviceCost: data.recipients[0].serviceCost,
              serviceCode: data.recipients[0].serviceCode,
            })
          : (newData = {
              ...newData,
              recipient: data.recipients[0].recipient,
              serviceCost: data.recipients[0].serviceCost,
              serviceCode: data.recipients[0].serviceCode,
            });

        break;
      case 3:
        auto.rechargeType === 1
          ? (newData = {
              ...newData,
              recipient,
              serviceCode,
              serviceCost,
              type: "ELECTRICITY",
              name: data.name,
            })
          : auto.rechargeType === 2
          ? (newData = {
              ...newData,
              recipient: data.recipients[0].recipient,
              serviceCode: data.recipients[0].serviceCode,
              serviceCost: data.recipients[0].serviceCost,
              name: data.name,
            })
          : (newData = {
              ...newData,
              recipient: data.recipients[0].recipient,
              serviceCode: data.recipients[0].serviceCode,
              serviceCost: data.recipients[0].serviceCost,
              name: data.name,
            });
        break;
      case 4:
        auto.rechargeType === 1
          ? (newData = {
              ...newData,
              recipient: data.recipient,
              productId: data.productId,
              serviceCode: data.serviceCode,
              price,
              name: data.name,
              type: "CABLE",
            })
          : auto.rechargeType === 2
          ? (newData = {
              ...newData,
              recipient: data.recipients[0].recipient,
              productId: data.recipients[0].productId,
              price,
              serviceCode: data.recipients[0].serviceCode,
              name: data.name,
              type: "CABLE",
            })
          : (newData = {
              ...newData,
              recipient: data.recipients[0].recipient,
              productId: data.recipients[0].productId,
              serviceCode: data.recipients[0].serviceCode,
              price,
              name: data.name,
              type: "CABLE",
            });
        break;
      default:
        break;
    }
    setBulkRecharges([newData, ...bulkRecharges]);
  };

  return (
    <Container>
      <SmallText>What will you like to do ?</SmallText>
      {showModal && <Loader />}

      {bulk && (
        <Tab.Group
          selectedIndex={currentTabIndex}
          onChange={setCurrentTabIndex}
        >
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

          <Tab.Panels>
            <Tab.Panel>
              <Grid repeat="5">
                {data.map(({ name, id, img, tabDetails, errors }) => {
                  return (
                    <GridItem
                      className={id === selectedId && "active"}
                      onClick={() => {
                        setTabDetails(tabDetails);
                        setSelectedId(id);
                        setErrors(errors);
                      }}
                      key={id}
                    >
                      {img}
                      <GridText>{name}</GridText>
                    </GridItem>
                  );
                })}
              </Grid>
              <Grid repeat="6">
                {tabDetails.map(({ id, img, type, select }) => {
                  return (
                    <GridItem
                      onClick={async () => {
                        setActiveId(id);
                        setIsSelect(select);

                        if (id === 3 || id === 4) {
                          setLoading(true);
                          setSuccess(false);
                          setClicked(false);
                        }
                        if (id === activeId) return;
                        resetForm(type);
                        if (type.includes("-DATA")) {
                          //get plans
                          const plans = await getDataPlans(type);
                          const data = plans.data.map((each) => {
                            return {
                              id: each.product_id,
                              value: each.product_id,
                              price: each.price.split(".")[0],
                              label: `${each.network} ${
                                each.category === null ? "" : each.category
                              } Data ${each.allowance} ${
                                each.price.split(".")[0]
                              }`,
                            };
                          });

                          setDataPlans(data);
                        }
                      }}
                      className={activeId === id && "active"}
                      key={id}
                    >
                      <Image src={img} />
                    </GridItem>
                  );
                })}
              </Grid>

              {activeId !== 0 && (
                <form onSubmit={handleSubmit}>
                  <Form />
                  {(selectedId === 3 || selectedId === 4) && !success ? null : (
                    <>
                      <PaymentMode />
                      {bulk ? <Button name="Add" /> : <Button name="Submit" />}
                    </>
                  )}
                  <WalletBalance />
                </form>
              )}
            </Tab.Panel>
            <Tab.Panel>
              <ExcelFileUpload />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}

      {!bulk && (
        <>
          <Grid repeat="5">
            {data.map(({ name, id, img, tabDetails, errors }) => {
              if (landing && id === 5) return null;
              return (
                <GridItem
                  className={id === selectedId && "active"}
                  onClick={() => {
                    setTabDetails(tabDetails);
                    setSelectedId(id);
                    setErrors(errors);
                  }}
                  key={id}
                >
                  {img}
                  <GridText>{name}</GridText>
                </GridItem>
              );
            })}
          </Grid>
          {landing && selectedId === 3 ? (
            <LoginContainer>
              <Text>You have to login to continue with the transaction.</Text>
              <LoginButton onClick={UserServices.doLogin}>Log in</LoginButton>
            </LoginContainer>
          ) : (
            <Grid repeat="6">
              {tabDetails.map(({ id, img, type, select }) => {
                return (
                  <GridItem
                    onClick={async () => {
                      setActiveId(id);
                      setIsSelect(select);

                      if (id === 3 || id === 4) {
                        setLoading(true);
                        setSuccess(false);
                        setClicked(false);
                      }
                      if (id === activeId) return;
                      resetForm(type);
                      if (type.includes("-DATA")) {
                        //get plans
                        const plans = await getDataPlans(type);
                        const data = plans.data.map((each) => {
                          return {
                            id: each.product_id,
                            value: each.product_id,
                            price: each.price.split(".")[0],
                            label: `${each.network} ${
                              each.category === null ? "" : each.category
                            } Data ${each.allowance} ${
                              each.price.split(".")[0]
                            }`,
                          };
                        });

                        setDataPlans(data);
                      }
                    }}
                    className={activeId === id && "active"}
                    key={id}
                  >
                    <Image src={img} />
                  </GridItem>
                );
              })}
            </Grid>
          )}

          {activeId !== 0 && (
            <form onSubmit={handleSubmit}>
              <Form landing={landing} />
              {(selectedId === 3 || selectedId === 4) && !success ? null : (
                <>
                  {!landing && <PaymentMode />}
                  {bulk ? (
                    <Button name="Add" />
                  ) : (
                    <Button
                      myStyle={{
                        margin: "20px 0",
                      }}
                      name="Submit"
                    />
                  )}
                </>
              )}
              {!landing && <WalletBalance />}
            </form>
          )}
        </>
      )}
    </Container>
  );
};

export default Card;
