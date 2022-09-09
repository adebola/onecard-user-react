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

const Card = () => {
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
    if (selectedId === 1) {
      setDataPlans([]);
    }
  }, [selectedId, activeId, setDataPlans]);

  const handleSubmit = (e) => {
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
          daysOfMonth: auto.monthlyAutoRecharge,
          daysOfWeek: auto.weeklyAutoRecharge,
          endDate: convertDate(endDate),
          startDate: convertDate(startDate),
          title: auto.rechargeName,
        };
      }
    }

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

    console.log(data);

    switch (auto.rechargeType) {
      case 1:
        singleRequest(data);
        break;

      case 2:
        scheduledRequest(data);
        break;

      case 3:
        autoRechargeRequest(data);
        break;

      default:
        break;
    }
  };

  const singleRequest = async (data) => {
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

  const scheduledRequest = async (data) => {
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
  const autoRechargeRequest = async (data) => {
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
              <Button name="Submit" />
            </>
          )}
          <WalletBalance />
        </form>
      )}
    </Container>
  );
};

export default Card;
