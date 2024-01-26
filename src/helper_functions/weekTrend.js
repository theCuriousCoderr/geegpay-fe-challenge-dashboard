import moment from "moment";
import { analytics } from "../utils";

let arr1 = new Array(52).fill(0)
let label = Array.from({length: 52}, (_, index) => index + 1);
let val = label.map((value, id) => {
  let cur = 0
  analytics.map(items => {
    items.transactionHistory.map(items2 => {
      if ((value === moment(items2.date).isoWeek()) && (moment(items2.date).year() === 2024 )) {
        cur = arr1[id] += items2.amount
      }
    })
  })
  return cur
}

)
// label = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const weekData = {
labels: label,
datasets: [
{
  label: "Weekly",
  data: val,
  backgroundColor: "rgba(52,202,165,0.2)",
  hoverBackgroundColor: "rgba(52,202,165,1)",
  borderRadius: { topLeft: 30, topRight: 30 },
},
],
};

export default weekData;