import { FaDatabase } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { GiElectric } from "react-icons/gi";
import { MdLiveTv, MdOutlineAddCircleOutline } from "react-icons/md";
import * as images from "./images";

const data = [
  {
    id: 1,
    name: "Data",
    repeat: "6",
    img: <FaDatabase />,
    tabDetails: [
      {
        id: 1,
        name: "MTN",
        type: "MTN-DATA",
        img: images.mtn,
        select: true,
      },
      {
        id: 2,
        name: "GLO",
        type: "GLO-DATA",
        img: images.glo,
        select: true,
      },
      {
        id: 3,
        name: "AIRTEL",
        type: "AIRTEL-DATA",
        img: images.airtel,
        select: true,
      },
      {
        id: 4,
        name: "9MOB",
        type: "9MOBILE-DATA",
        img: images.mobile,
        select: true,
      },
      {
        id: 5,
        name: "SPEC",
        type: "SPECTRANET-DATA",
        img: images.spectranet,
        select: true,
      },
      {
        id: 6,
        name: "SMILE",
        type: "SMILE-DATA",
        img: images.smile,
        select: true,
      },
    ],
    errors: [
      {
        id: 1,
        message: "Please select a provider",
      },
      {
        id: 2,
        message: "Please select a data plan",
      },
      {
        id: 3,
        message: "Please enter a phone number",
      },
      {
        id: 4,
        message: "Enter a valid phone number",
      },
    ],
  },
  {
    id: 2,
    name: "Airtime",
    repeat: "4",
    img: <BiPhoneCall />,
    tabDetails: [
      {
        id: 1,
        name: "MTN",
        type: "MTN-AIRTIME",
        img: images.mtn,
      },
      {
        id: 2,
        name: "GLO",
        type: "GLO-AIRTIME",
        img: images.glo,
      },
      {
        id: 3,
        name: "AIRTEL",
        type: "AIRTEL-AIRTIME",
        img: images.airtel,
      },
      {
        id: 4,
        name: "9MOB",
        type: "9MOBILE-AIRTIME",
        img: images.mobile,
      },
    ],
    errors: [
      {
        id: 1,
        message: "Select a service product",
      },
      {
        id: 2,
        message: "Amount is required!",
      },
      {
        id: 3,
        message: "Phone number is required!",
      },
      {
        id: 4,
        message: "Enter a valid phone number!",
      },
      {
        id: 5,
        message: "Enter a valid amount!",
      },
    ],
  },
  {
    id: 3,
    name: "Electricity",
    repeat: "2",
    img: <GiElectric />,
    tabDetails: [
      {
        id: 1,
        name: "EKO",
        type: "EKEDP",
        img: images.eko,
        select: true,
      },
      {
        id: 2,
        name: "JOS",
        type: "JED",
        img: images.jos,
      },
    ],
    errors: [
      {
        id: 1,
        message: "Select a type",
      },
      {
        id: 2,
        message: "Plan is required!",
      },
      {
        id: 3,
        message: "Account is required!",
      },
      {
        id: 4,
        message: "Amount is required!",
      },
      {
        id: 5,
        message: "Telephone is required!",
      },
    ],
  },
  {
    id: 4,
    name: "Cable TV",
    repeat: "3",
    img: <MdLiveTv />,
    tabDetails: [
      {
        id: 1,
        name: "GOTV",
        img: images.gotv,
        type: "GOTV",
      },
      {
        id: 2,
        name: "DSTV",
        img: images.dstv,
        type: "DSTV",
      },
      {
        id: 3,
        name: "STARTIMES",
        img: images.startimes,
        type: "STARTIMES",
      },
    ],
    errors: [
      {
        id: 1,
        message: "Select a type",
      },
      {
        id: 2,
        message: "Plan is required!",
      },
      {
        id: 3,
        message: "Account is required!",
      },
      {
        id: 4,
        message: "Amount is required!",
      },
      {
        id: 5,
        message: "Telephone is required!",
      },
    ],
  },
  {
    id: 5,
    name: "Others",
    repeat: "1",
    img: <MdOutlineAddCircleOutline />,
    tabDetails: [
      {
        id: 1,
        name: "Others",
      },
    ],
  },
];

export { data };
