import { SkeletonInput, SkeletonText } from "./components/loader/styles";
import {
  checkKYCStatus,
  getOtp,
  verifyBVN,
  verifyOtp,
} from "../../../../helper/requests";
import { notifyError, notifySuccess } from "./components/notify";

import Button from "./components/button";
import InputText from "./components/inputtext";
import Loader from "../../../Loader";
import OtpInput from "./components/otp";
import React from "react";
import { ScaleLoader } from "react-spinners";
import Skeleton from "./components/loader";
import SmallText from "../../../SmallText";
import styled from "styled-components";
import { useKYCVerified } from "./hooks/useVerified";

const Container = styled.div`
  margin-top: 40px;
`;

const Label = styled.div`
  margin-bottom: 10px;
  color: var(--text-color);
  font-size: 13px;
`;

const RenderKYC = () => {
  const {
    setVerificationId,
    verificationId,
    status,
    setStatus,
    phoneNumber,
    setPhoneNumber,
    loading,
    setLoading,
    setKYCVerified,
  } = useKYCVerified();
  const [steps, setSteps] = React.useState("Step 0");
  const [bvn, setBVN] = React.useState(""); // Initial value
  const [otp, setOtp] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    const awaitResponse = async () => {
      try {
        const response = await checkKYCStatus();
        await setStatus(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    awaitResponse();
  }, [setStatus, setLoading]);

  React.useEffect(() => {
    if (loading) return;
    const verifiedKey =
      !loading && Object.keys(status).find((key) => status[key] === "Verified");
    if (verifiedKey === "sms") {
      setSteps("Step 3");
    } else {
      setSteps("Step 1");
    }
  }, [status, loading]);

  const handleOtpComplete = (otp) => {
    setOtp(otp);
  };

  const formatPhoneNumber = (number) => {
    number = number.replace(/\s+/g, ""); // Remove existing spaces
    return number;
  };

  const handlePhoneNumberChange = (number) => {
    const formattedNumber = formatPhoneNumber(number);
    setPhoneNumber(formattedNumber);
  };

  const handleStepOne = async () => {
    setShowModal(true);
    try {
      const res = await getOtp(phoneNumber);
      setVerificationId(res.data.verificationId);
      setSteps("Step 2");
      notifySuccess("Success", res.data.message);
    } catch (error) {
      notifyError(error.response.data.message);
    } finally {
      setShowModal(false);
    }
  };

  const handleStepTwo = async () => {
    setShowModal(true);
    try {
      const res = await verifyOtp({ id: verificationId, code: otp });
      setSteps("Step 3");
      notifySuccess("Success", res.data.message);
    } catch (error) {
      notifyError(error.response.data.message);
    } finally {
      setShowModal(false);
    }
  };

  const handleStepThree = async () => {
    setShowModal(true);
    try {
      const res = await verifyBVN(bvn);
      console.log(res.data);
      notifySuccess("Success", res.data.message);
      setKYCVerified(true);
    } catch (error) {
      notifyError(error.response.data.message);
    } finally {
      setShowModal(false);
    }
  };

  switch (steps) {
    case "Step 1":
      return (
        <Container>
          {showModal && (
            <Loader>
              <ScaleLoader color="var(--text-color)" />
            </Loader>
          )}

          <SmallText text="KYC" />
          <InputText
            title="Phone number"
            number
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
          />
          <Button
            onClick={() => {
              handleStepOne();
            }}
          />
        </Container>
      );
    case "Step 2":
      return (
        <Container>
          {showModal && (
            <Loader>
              <ScaleLoader color="var(--text-color)" />
            </Loader>
          )}
          <SmallText text="KYC" />
          <Label>OTP Verification</Label>
          <OtpInput length={6} onComplete={handleOtpComplete} />
          <Button onClick={handleStepTwo} />
        </Container>
      );
    case "Step 3":
      return (
        <Container>
          {showModal && (
            <Loader>
              <ScaleLoader color="var(--text-color)" />
            </Loader>
          )}
          <SmallText text="KYC" />
          <InputText
            title="BVN"
            value={bvn}
            onChange={(e) => setBVN(e.target.value)}
          />
          <Button onClick={handleStepThree} />
        </Container>
      );

    default:
      return (
        <Container>
          <SmallText text="KYC" />
          <SkeletonText>
            <Skeleton border={3} />
          </SkeletonText>
          <SkeletonInput>
            <Skeleton border={9} />
          </SkeletonInput>
        </Container>
      );
  }
};

export default RenderKYC;
