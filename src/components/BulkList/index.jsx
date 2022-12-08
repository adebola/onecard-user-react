import React, { useContext } from "react";
import { formatBalance } from "../../utils/formatBalance";
import { MdClose } from "react-icons/md";
import { BulkRechargeContext } from "../../context/BulkRecharge";
import Badge from "../../components/Badge";
import { Inner, Price, Send } from "./styles";
import {
  makeAutoRechargeRequest,
  makeBulkRecharge,
  makeScheduleRecharge,
} from "../../helper/requests";
import { SingleRechargeContext } from "../../context/SingleRechargeContext";
import Swal from "sweetalert2";
import * as images from "../../data/images";
import styled from "styled-components";
import { ModalContext } from "../../context/ModalProvider";

const ImageContainer = styled.div`
  height: 18px;
  width: 18px;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const SmallImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const Type = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  color: #000;
  margin-right: 5px;
`;

const BulkList = () => {
  ////////////////////
  ////////////////////
  const image = [
    { id: 1, type: "MTN", img: images.mtn },
    { id: 2, type: "AIRTEL", img: images.airtel },
    { id: 3, type: "GLO", img: images.glo },
    { id: 4, type: "9MOBILE", img: images.mobile },
    { id: 5, type: "SPECTRANET", img: images.spectranet },
    { id: 6, type: "SMILE", img: images.smile },
    { id: 7, type: "GOTV", img: images.gotv },
    { id: 8, type: "DSTV", img: images.dstv },
    { id: 9, type: "STARTIMES", img: images.startimes },
    { id: 10, type: "EKEDP", img: images.eko },
    { id: 11, type: "JED", img: images.jos },
  ];
  const { bulkRecharges, setBulkRecharges, bulkData } =
    useContext(BulkRechargeContext);

  const { setShowModal, setClicked, setDetails, details } = useContext(
    SingleRechargeContext
  );
  const auto = useContext(ModalContext);

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
  const totalPrice = bulkRecharges.reduce(
    (acc, curr) => acc + Number(curr.serviceCost || curr.price),
    0
  );
  return (
    <div>
      {bulkRecharges.length > 0 && (
        <Inner>
          <div className="inner">
            <Badge />
            {bulkRecharges.map((each) => {
              const img = image.find(
                (e) => e.type === each.serviceCode?.split("-")[0]
              );
              return (
                <div key={each.id} className="item">
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ImageContainer>
                        <SmallImage src={img?.img} />
                      </ImageContainer>
                      <Type>{each.recipient}</Type>
                      <Type>
                        {each?.serviceCode.split("-")[1]
                          ? each.serviceCode.split("-")[1]
                          : each.serviceCode}
                      </Type>
                      <Type>&#8358;{each?.serviceCost || each?.price}</Type>
                    </div>
                  </>
                  <div className="icon">
                    <MdClose
                      size={18}
                      color="#eb6a2b"
                      onClick={() => {
                        const filter = bulkRecharges.filter(
                          (bulk) => each.id !== bulk.id
                        );
                        setBulkRecharges(filter);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <Price>
            <div>Total - #{formatBalance(totalPrice)}</div>
            <Send
              onClick={async () => {
                setShowModal(true);
                switch (auto.rechargeType) {
                  case 1:
                    try {
                      await makeBulkRecharge(bulkData);
                      Swal.fire({
                        icon: "success",
                        title: "SUCCESS",
                        text: `Your auto bulk request was submitted successfully.`,
                        confirmButtonColor: "var(--btn-color)",
                      }).then(() => {
                        setShowModal(false);
                        resetForm();
                        setBulkRecharges([]);
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
                    break;
                  case 2:
                    try {
                      await makeScheduleRecharge(bulkData);
                      Swal.fire({
                        icon: "success",
                        title: "SUCCESS",
                        text: `Your scheduled bulk request was submitted successfully.`,
                        confirmButtonColor: "var(--btn-color)",
                      }).then(() => {
                        setShowModal(false);
                        resetForm();
                        setBulkRecharges([]);
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
                    break;
                  case 3:
                    try {
                      await makeAutoRechargeRequest(bulkData);
                      Swal.fire({
                        icon: "success",
                        title: "SUCCESS",
                        text: `Your auto bulk request was submitted successfully.`,
                        confirmButtonColor: "var(--btn-color)",
                      }).then(() => {
                        setShowModal(false);
                        resetForm();
                        setBulkRecharges([]);
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

                    break;

                  default:
                    break;
                }
              }}
            >
              Submit
            </Send>
          </Price>
        </Inner>
      )}
    </div>
  );
};

export default BulkList;
