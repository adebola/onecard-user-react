import React, { useContext, useEffect } from "react";
import { SingleRechargeContext } from "../../context/SingleRechargeContext";
import { Container, Grid, GridItem, GridText, Image } from "./styles";
import { data } from "../../data";
import Form from "../Form";

import PaymentMode from "../../components/PaymentMode";
import Button from "../Button/normal";
import WalletBalance from "../WalletBalance";
import {
  getDataPlans,
  makeAutoRechargeRequest,
  makeScheduleRecharge,
  makeSingleRecharge,
} from "../../helper/requests";
import Loader from "../Loader";
import Swal from "sweetalert2";
import { convertDate } from "../../utils/dateformat";
import { ModalContext } from "../../context/ModalProvider";
import { GlobalContext } from "../../context/GlobalProvider";
import { v4 } from "uuid";
import { BulkRechargeContext } from "../../context/BulkRecharge";

const Card = ({ bulk }) => {
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
  } = useContext(SingleRechargeContext);

  const { bulkRecharges, setBulkRecharges, bulkData, setBulkData } =
    useContext(BulkRechargeContext);

  const { startDate, endDate } = useContext(GlobalContext);
  const auto = useContext(ModalContext);

  const scheduledDate = convertDate(startDate);

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
      ({ recipient, serviceCode, type, serviceCost, productId }) => {
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
          recipients: _recipients,
          paymentMode,
          rechargeType: "bulk",
          daysOfMonth: auto.monthlyAutoRecharge,
          daysOfWeek: auto.weeklyAutoRecharge,
          endDate: endDate && convertDate(endDate),
          startDate: startDate && convertDate(startDate),
          title: auto.rechargeName,
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
        paymentMode,
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
        };
      } else {
        data = {
          recipient,
          serviceCode,
          serviceCost,
          telephone,
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
      //Auto airtime Recharge
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

  const instantRecharge = async (data) => {
    setShowModal(true);
    try {
      const response = await makeSingleRecharge(data);
      if (response.status === 200) {
        if (response.data.authorizationUrl) {
          window.location = response.data.authorizationUrl;
        } else {
          Swal.fire({
            icon: "success",
            title: "SUCCESS",
            text: `Your ${serviceCode} recharge of ₦${serviceCost} to ${recipient} was completed successfully.`,
            confirmButtonColor: "var(--btn-color)",
          }).then(() => {
            setShowModal(false);
            resetForm();
            setActiveId(0);
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        iconColor: "#F27474",
        title: "Error",
        text: error.response.data.message,
        confirmButtonColor: "var(--btn-color)",
      }).then(() => {
        setShowModal(false);
      });
    }
  };

  const scheduleRecharge = async (data) => {
    setShowModal(true);
    try {
      await makeScheduleRecharge(data);
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: `Your ${serviceCode}  scheduled recharge of ₦${serviceCost} to ${recipient} was submitted successfully.`,
        confirmButtonColor: "var(--btn-color)",
      }).then(() => {
        setShowModal(false);
        resetForm();
        setActiveId(0);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        iconColor: "#F27474",
        title: "Error",
        text: error.response.data.message,
        confirmButtonColor: "var(--btn-color)",
      }).then(() => {
        setShowModal(false);
      });
    }
  };

  //TODO:
  const autoRecharge = async (data) => {
    setShowModal(true);
    try {
      await makeAutoRechargeRequest(data);
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: `Your ${serviceCode} auto recharge of ₦${serviceCost} to ${recipient} was submitted successfully.`,
        confirmButtonColor: "var(--btn-color)",
      }).then(() => {
        setShowModal(false);
        resetForm();
        setActiveId(0);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        iconColor: "#F27474",
        title: "Error",
        text: error.response.data.message,
        confirmButtonColor: "var(--btn-color)",
      }).then(() => {
        setShowModal(false);
      });
    }
  };

  //Handle Bulk Recharges
  const handleBulkRequest = (data) => {
    let newData;
    const price = dataPlans.find((each) => {
      return data.productId === each.id;
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
              daysOfMonth: auto.monthlyAutoRecharge,
              daysOfWeek: auto.weeklyAutoRecharge,
              endDate: convertDate(endDate),
              startDate: convertDate(startDate),
              title: auto.rechargeName,
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
      default:
        break;
    }

    console.log(newData);

    setBulkRecharges([newData, ...bulkRecharges]);

    let dataToSend = {
      paymentMode,
      rechargeType: "bulk",
      redirectUrl:
        paymentMode === "paystack"
          ? `${window.origin}${window.location.pathname}`
          : "",
    };

    switch (auto.rechargeType) {
      case 2:
        dataToSend = {
          ...bulkData,
          scheduledDate,
        };
        break;
      case 3:
        dataToSend = {
          ...bulkData,
          endDate: convertDate(endDate),
          startDate: convertDate(startDate),
          daysOfMonth: auto.monthlyAutoRecharge,
          daysOfWeek: auto.weeklyAutoRecharge,
          title: auto.rechargeName,
        };
        break;
      default:
        break;
    }
    setBulkData({ ...bulkData, ...dataToSend });
  };

  return (
    <Container>
      {showModal && <Loader />}
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
                      } Data ${each.allowance} ${each.price.split(".")[0]}`,
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
    </Container>
  );
};

export default Card;
