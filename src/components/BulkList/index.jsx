import React, { useContext } from "react";
import { formatBalance } from "../../utils/formatBalance";
import { MdClose } from "react-icons/md";
import { BulkRechargeContext } from "../../context/BulkRecharge";
import Badge from "../../components/Badge";
import { Inner, Price, Send } from "./styles";
import { makeAutoRechargeRequest } from "../../helper/requests";
import { SingleRechargeContext } from "../../context/SingleRechargeContext";
import Swal from "sweetalert2";

const BulkList = () => {
  const { bulkRecharges, setBulkRecharges, bulkData } =
    useContext(BulkRechargeContext);

  const { setShowModal, setClicked, setDetails, details } = useContext(
    SingleRechargeContext
  );

  // console.log(bulkData);
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
              return (
                <div key={each.id} className="item">
                  <p>
                    {each.serviceCode} {each.recipient} - #
                    {each?.serviceCost || each?.price}
                  </p>
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
                try {
                  const response = await makeAutoRechargeRequest(bulkData);
                  console.log(response);
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
