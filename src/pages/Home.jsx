import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { analytics } from "../utils";
import total_order from "../images/total_order.png";
import total_refund from "../images/total_refund.png";
import average_sales from "../images/average_sales.png";
import total_income from "../images/total_income.png";
import up from "../images/up.png";
import down from "../images/down.png";
import rise from "../images/rise.png";
import fall from "../images/fall.png";
import { getRelativeStats } from "../helper_functions/getRelativeStats";
import StatsSect from "../components/StatsSect";
import dayData from "../helper_functions/dayTrend";
import monthData from "../helper_functions/monthTrend";
import weekData from "../helper_functions/weekTrend";
import yearData from "../helper_functions/yearTrend";
import destructureRelativeStats from "../helper_functions/destructureRelativeStats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



let test = moment().year();

let arr1 = new Array(12).fill(0);
let label = Array.from({ length: 12 }, (_, index) => index + 1);
let val = label.map((value, id) => {
  let cur = 0;
  analytics.map((items) => {
    items.transactionHistory.map((items2) => {
      if (
        value === moment(items2.date).month() &&
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

const data = {
  labels: label,
  datasets: [
    {
      label: "Sales",
      data: val,
      backgroundColor: "rgba(52,202,165,0.1)",
      hoverBackgroundColor: "rgba(52,202,165,1)",
      borderRadius: { topLeft: 30, topRight: 30 },
    },
  ],
};

function Home({ theme }) {
  const [trendFilter, setTrendFilter] = useState("month");
  const [selectInput, setSelectInput] = useState("monthly");
  const [chart, setChart] = useState({
    data: "",
    options: "",
  });
  const [relativeStats, setRelativeStats] = useState({
    order: {
      today: 0,
      diff: 0,
    },
    refund: {
      today: 0,
      diff: 0,
    },
    avg: {
      today: 0,
      diff: 0,
    },
    income: {
      today: 0,
      diff: 0,
    },
  });


  const options = {
    responsive: true,
    scales: {
      y: theme === "light" ? { 
        border: { dash: [2, 4] },
      } : {
        grid: {color: "rgba(0,255,0,1)"},
        ticks: { color: "white"}, 
        border: { dash: [2, 4] },
      } ,
      x: theme === "light" ? { 
        border: { dash: [2, 4] },
      } : {
        ticks: { color: "white"}, 
        border: { dash: [2, 4] },
      } ,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  useEffect(() => {
    let arr1 = new Array(12).fill(0);
    let label = Array.from({ length: 12 }, (_, index) => index + 1);
    let val = label.map((value, id) => {
      let cur = 0;
      analytics.map((items) => {
        items.transactionHistory.map((items2) => {
          if (
            value === moment(items2.date).month() &&
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

    const data = {
      labels: label,
      datasets: [
        {
          label: "Sales",
          data: val,
          backgroundColor: "rgba(52,202,165,0.1)",
          hoverBackgroundColor: "rgba(52,202,165,1)",
          borderRadius: { topLeft: 30, topRight: 30 },
        },
      ],
    };

    let resEffect = getRelativeStats("month");

    let statResEffect = destructureRelativeStats(relativeStats, resEffect);
    setRelativeStats(statResEffect);

    setChart({ data: data, options: options });
    setTrendFilter("month");
    setSelectInput("monthly");
  }, []);

  function handleTrendSort(e) {
    let res, copyStats, statRes;
    switch (e.target.value) {
      case "daily":
        res = getRelativeStats("day");
        setChart({ data: dayData, options: options });
        setTrendFilter("day");
        break;
      case "weekly":
        res = getRelativeStats("week");
        setChart({ data: weekData, options: options });
        setTrendFilter("week");
        break;
      case "monthly":
        res = getRelativeStats("month");
        setChart({ data: monthData, options: options });
        setTrendFilter("month");
        break;
      case "yearly":
        res = getRelativeStats("year");
        setChart({ data: yearData, options: options });
        setTrendFilter("year");
        break;
      default:
        break;
    }
    statRes = destructureRelativeStats(relativeStats, res);
    setRelativeStats(statRes);
    setSelectInput(e.target.value);
  }
  // return ;
  return (
    <div
      className={`relative w-full h-screen xs:max-lg:h-auto p-3 bg-red-40 flex flex-col justify-between `}
    >
      <div className="xs:max-lg:flex-col flex justify-between bg-yellow-40 xs:max-lg:h-auto h-[49%]">
        <div className="w-[59%] xs:max-lg:w-full bg-blue-40 xs:max-lg:h-72 h-full rounded-xl p-2">
          <div className="flex justify-between items-center bg-red-30">
            <p className={`font-jarkarta font-semibold  text-base ${theme === "light" ? " text-[#26282C]" : "text-slate-100" }`}>
              Sales Trends
            </p>
            <div className="flex items-center bg-red-40 w-40 gap-2">
              <p className={`font-jarkarta font-medium ${theme === "light" ? "text-[#3A3F51]" : "text-slate-50" }  text-sm`}>
                Sort by:{" "}
              </p>
              <div>
                <select
                  onChange={handleTrendSort}
                  name="trendSort"
                  value={selectInput}
                  className={`border rounded-full text-slate-400 text-sm p-1 ${theme !== "light" && "bg-gray-800" }`}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="h-[90%]">
            <Bar
              id="trend"
              data={chart.data || data}
              options={chart.options || options}
            />
          </div>
        </div>
        <div className="w-[39%] xs:max-lg:w-full bg-green-40 xs:max-lg:h-auto h-full rounded-xl flex flex-col items-center justify-between">
          <div className="flex flex-wrap xs:max-lg:h-auto w-full h-[48%] justify-between  ">
            <StatsSect
            theme={theme}
              icon={total_order}
              text="Total Order"
              data={relativeStats.order}
              rise={rise}
              fall={fall}
              up={up}
              down={down}
              trend={trendFilter}
            />
            <StatsSect
            theme={theme}
              icon={total_refund}
              text="Total Refund"
              data={relativeStats.refund}
              rise={rise}
              fall={fall}
              up={up}
              down={down}
              trend={trendFilter}
            />
          </div>

          {/* <StatsSect icon={total_order} text="Total Order" data={relativeStats} rise={rise} fall={fall} up={up} down={down} trend={trendFilter} /> */}
          <div className="flex flex-wrap xs:max-lg:h-auto w-full h-[48%] justify-between">
            <StatsSect
            theme={theme}
              icon={average_sales}
              text="Average Sales"
              data={relativeStats.avg}
              rise={rise}
              fall={fall}
              up={up}
              down={down}
              trend={trendFilter}
            />
            <StatsSect
            theme={theme}
              icon={total_income}
              text="Total Income"
              data={relativeStats.income}
              rise={rise}
              fall={fall}
              up={up}
              down={down}
              trend={trendFilter}
            />
          </div>
        </div>
      </div>
      <div className="flex xs:max-lg:flex-col justify-between bg-yellow-40 xs:max-lg:h-auto h-[49%]">
        <div className="w-[59%] xs:max-lg:w-full bg-blue-400 h-full xs:max-lg:h-52 rounded-xl p-2"></div>
        <div className="w-[39%] xs:max-lg:w-full bg-green-400 h-full xs:max-lg:h-52 rounded-xl flex flex-col items-center justify-between"></div>
      </div>
    </div>
  );
}

export default Home;
