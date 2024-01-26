import moment from "moment";
import { analytics } from "../utils";

let arr1 = new Array(12).fill(0);
let label = Array.from({ length: 12 }, (_, index) => index + 1);
let val = label.map((value, id) => {
  let cur = 0;
  analytics.map((items) => {
    items.transactionHistory.map((items2) => {
      if (
        value === (moment(items2.date).month() + 1) &&
        moment(items2.date).year() === 2024
      ) {
        cur = arr1[id] += items2.amount;
      }
    });
  });
  return cur;
});
label = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthData = {
    labels: label,
    datasets: [
    {
      label: "Monthly",
      data: val,
      backgroundColor: "rgba(52,202,165,0.2)",
      hoverBackgroundColor: "rgba(52,202,165,1)",
      borderRadius: { topLeft: 30, topRight: 30 },
    },
    ],
    };
    
    export default monthData;