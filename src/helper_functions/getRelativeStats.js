import moment from "moment";
import { analytics } from "../utils";

export function getRelativeStats(param) {

  let todayStats = {
    total_order: 0,
    total_refund: 0,
    average_sales: 0,
    total_income: 0,
    platforms: [],
  };
  let prevStats = {
    total_order: 0,
    total_refund: 0,
    average_sales: 0,
    total_income: 0,
    platforms: [],
  };

  if (param === "day") {
    let today = moment().dayOfYear();
    let prevDay = today - 1;
    for (let platform of analytics) {
      for (let history of platform.transactionHistory) {
        if (moment(history.date).dayOfYear() === today && (moment(history.date).year() === 2024)) {
          todayStats.platforms.push(platform.platformName);
          todayStats.total_order += 1;
          todayStats.total_income += history.amount;
          if (history.orderStatus !== "Paid") {
            todayStats.total_refund += 1;
          }
        }
        if (moment(history.date).dayOfYear() === prevDay && (moment(history.date).year() === 2024)) {
          prevStats.platforms.push(platform.platformName);
          prevStats.total_order += 1;
          prevStats.total_income += history.amount;
          if (history.orderStatus !== "Paid") {
            prevStats.total_refund += 1;
          }
        }
      }
    }
  }

  if (param === "week") {
    let thisWeek =  moment().isoWeek()
    let prevWeek = thisWeek - 1
    for (let platform of analytics) {
      for (let history of platform.transactionHistory) {
        if (moment(history.date).isoWeek() === thisWeek  && (moment(history.date).year() === 2024)) {
          todayStats.platforms.push(platform.platformName);
          todayStats.total_order += 1;
          todayStats.total_income += history.amount;
          if (history.orderStatus !== "Paid") {
            todayStats.total_refund += 1;
          }
        }
        if (moment(history.date).dayOfYear() === prevWeek && (moment(history.date).year() === 2024)) {
          prevStats.platforms.push(platform.platformName);
          prevStats.total_order += 1;
          prevStats.total_income += history.amount;
          if (history.orderStatus !== "Paid") {
            prevStats.total_refund += 1;
          }
        }
      }
    }
  }

  if (param === "month") {
    let thisMonth = moment().month()
    let prevMonth = thisMonth - 1
    for (let platform of analytics) {
      for (let history of platform.transactionHistory) {
        if (moment(history.date).month() === thisMonth  && (moment(history.date).year() === 2024)) {
          todayStats.platforms.push(platform.platformName);
          todayStats.total_order += 1;
          todayStats.total_income += history.amount;
          if (history.orderStatus !== "Paid") {
            todayStats.total_refund += 1;
          }
        }
        if (moment(history.date).month() === prevMonth && (moment(history.date).year() === 2024) ) {
          prevStats.platforms.push(platform.platformName);
          prevStats.total_order += 1;
          prevStats.total_income += history.amount;
          if (history.orderStatus !== "Paid") {
            prevStats.total_refund += 1;
          }
        }
      }
    }
  }

  if (param === "year") {
    let thisYear = moment().year()
    let prevYear = thisYear - 1
    for (let platform of analytics) {
      for (let history of platform.transactionHistory) {
        if (moment(history.date).year() === thisYear) {
          todayStats.platforms.push(platform.platformName);
          todayStats.total_order += 1;
          todayStats.total_income += history.amount;
          if (history.orderStatus !== "Paid") {
            todayStats.total_refund += 1;
          }
        }
        if (moment(history.date).year() === prevYear ) {
          prevStats.platforms.push(platform.platformName);
          prevStats.total_order += 1;
          prevStats.total_income += history.amount;
          if (history.orderStatus !== "Paid") {
            prevStats.total_refund += 1;
          }
        }
      }
    }
  }




  return {
    today: {
      ...todayStats,
      average_sales: todayStats.platforms.length !== 0 ? Math.round(
        todayStats.total_order / todayStats.platforms.length
      ) : 0, 
    },
    prev: {
      ...prevStats,
      average_sales: prevStats.platforms.length !== 0 ? Math.round(
        prevStats.total_order / prevStats.platforms.length
      ) : 0,
    },
  };
}
