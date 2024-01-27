import moment from "moment";
import { analytics } from "../utils";

let arr1 = new Array(5).fill(0);
let label = [2020, 2021, 2022, 2023, 2024];
let val = label.map((value, id) => {
  let cur = 0;
  analytics.map((items) => {
    items.transactionHistory.map((items2) => {
      if (value === moment(items2.date).year()) {
        cur = arr1[id] += items2.amount;
      }
    });
  });
  return cur;
});
// label = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const yearData = {
  labels: label,
  datasets: [
    {
      label: "Yearly",
      data: val,
      backgroundColor: "rgba(52,202,165,0.2)",
      hoverBackgroundColor: "rgba(52,202,165,1)",
      borderRadius: { topLeft: 30, topRight: 30 },
    },
  ],
};

export default yearData;
