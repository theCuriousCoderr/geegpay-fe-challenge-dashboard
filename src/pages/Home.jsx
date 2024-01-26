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
import view from "../images/view.png";
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
  const [viewAll, setViewAll] = useState(false)
  const [viewInvoice, setViewInvoice] = useState("")
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
      y:
        theme === "light"
          ? {
            ticks: { color: "#525252" },
              border: { dash: [2, 4] },
            }
          : {
              grid: { color: "rgba(255,255,255,0.4)" },
              ticks: { color: "white" },
              border: { dash: [2, 4] },
            },
      x:
        theme === "light"
          ? {
            ticks: { color: "#525252" },
              border: { dash: [2, 4] },
            }
          : {
              ticks: { color: "white" },
              border: { dash: [2, 4] },
            },
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
    window.scrollTo(0,0)
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
      className={`relative w-full h-screen xs:max-lg:h-auto p-3 ${theme === "light" ? "bg-[#FAFAFA]" : "bg-gray-900"}  flex flex-col justify-between `}
    >
      {viewInvoice !== "" && <div onClick={()=> {setViewInvoice("")}} className="absolute w-full h-full bg-red-500 left-0 top-0">
        {/* <div>

        </div> */}

      </div>}
      {viewAll && <div className={`absolute overflow-scroll left-0 w-full h-full ${theme === "light" ? "bg-white" : "bg-gray-900" }  slideInRight flex justify-center`}>
        <div onClick={()=> setViewAll(false)} className="fixed size-10 xs:max-md:size-8 bg-slate-200 hover:bg-red-200 rounded-md right-0 m-10 xs:max-lg:m-0 cursor-pointer">
          <p className="text-3xl xs:max-md:text-2xl flex items-center justify-center">X</p>
        </div>
        <div className="w-2/3 xs:max-lg:w-full mx-auto p-5">
        <table className="w-full">
            <tr className={`font-jarkarta font-medium text-[#9CA4AB] text-left`}>
              <th className="bg-red-40 w-[30%] xs:max-md:w-[20%] py-2 xs:max-md:text-sm">Name</th>
              <th className="bg-red-40 w-[20%] xs:max-md:text-sm ">Date</th>
              <th className="bg-red-40 w-[20%]  xs:max-md:text-sm">Amount</th>
              <th className="bg-red-40 w-[10%] md:w-[20%] xs:max-md:text-sm">Status</th>
              <th className="bg-red-40 w-[10%] xs:max-md:text-sm">Invoice</th>
            </tr>
            {analytics.map(platforms => {
              // let len = Array.from({length: analytics.length}, (_, index) => index + 1).reverse()
              // len.length = 5
              let chainRes = platforms.transactionHistory.map(history => {
                // if (len.includes(history.orderNumber)) {
                  return (
                    <tr className={`bg-red-40 border-t border-[#EDF2F6]`}>
                      <td className={`flex xs:max-md:flex-col xs:max-md:items-start xs:max-md:justify-center gap-2 items-center py-2`}>
                        <div className={`size-10 xs:max-md:size-8 rounded-full bg-red-30 ${theme !== "light" && "border-2 border-white"} flex items-center justify-center`}>
                          <img src={history.photo} alt="client image" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <p className={`font-jarkarta font-medium text-base xs:max-md:text-left xs:max-md:text-xs ${theme === "light" ? "text-[#3A3F51]" : "text-slate-300" } `}>{history.orderInfo.from}</p>
                        
                        </td>
                      <td className={`font-jarkarta font-normal text-base xs:max-md:text-xs   ${theme === "light" ? "text-[#737373]" : "text-slate-400" } `}>{moment(history.date).format("ll")}</td>
                      <td className={`font-jarkarta font-medium text-base xs:max-md:text-xs ${theme === "light" ? "text-[#0D062D]" : "text-white" } `}>${history.amount}</td>
                      <td className={`font-jarkarta font-normal text-base xs:max-md:text-xs ${history.orderStatus.toLowerCase() === "paid" ? "text-[#34CAA5] " : "text-[#ED544E] " }`}>{history.orderStatus}</td>
                      <td>View</td>
                    </tr>
                  )
                // }
              })
              return chainRes
            }) }
          </table>
        </div>

      </div> }
      <div className="xs:max-lg:flex-col flex justify-between bg-yellow-40 xs:max-lg:h-auto h-[49%]">
        <div className={`w-[59%] xs:max-lg:w-full md:max-lg:w-[80%] bg-red-40 md:max-lg:mx-auto ${theme === "light" ? "bg-white border-[#EDF2F7]" : "bg-gray-900 border-slate-700" } border xs:max-lg:h-72 md:max-lg:h-80 h-full rounded-xl p-2`}>
          <div className="flex justify-between items-center bg-red-30">
            <p
              className={`font-jarkarta font-semibold  text-base ${
                theme === "light" ? " text-[#26282C]" : "text-slate-100"
              }`}
            >
              Sales Trends
            </p>
            <div className="flex items-center justify-end bg-red-40 w-40 gap-2">
              <p
                className={`font-jarkarta font-medium ${
                  theme === "light" ? "text-[#3A3F51]" : "text-slate-50"
                }  text-sm`}
              >
                Sort by:{" "}
              </p>
              <div>
                <select
                  onChange={handleTrendSort}
                  name="trendSort"
                  value={selectInput}
                  className={`border rounded-full text-slate-400 text-sm p-1 ${
                    theme !== "light" && "bg-gray-800"
                  }`}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="h-[90%] xs:max-lg:flex xs:max-lg:items-center ">
            <Bar
              id="trend"
              data={chart.data || data}
              options={chart.options || options}
            />
          </div>
        </div>
        <p
          className={`lg:hidden text-2xl font-semibold xs:max-md:mt-10 md:text-center ${
            theme !== "light" && "text-slate-100"
          }`}
        >
          {selectInput[0].toUpperCase() + selectInput.slice(1)} Stats{" "}
        </p>
        <div className="w-[39%] xs:max-lg:w-full bg-green-40 xs:max-lg:h-auto h-full rounded-xl flex flex-col items-center justify-between">
          <div className="flex flex-wrap xs:max-lg:h-auto w-full h-[48%] justify-between ">
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
        <div className={`w-[59%] overflow-scroll xs:max-lg:w-full xs:max-lg:my-10 ${theme === "light" ? "bg-white" : "bg-gray-900 border border-slate-700" }  h-full xs:max-lg:h-auto md:h-auto rounded-xl px-4 py-3`}>
          <div className="flex justify-between">
            <p className={`font-jarkarta font-semibold  text-base ${theme === "light" ? "text-[#26282C]" : "text-slate-200" } `}>Last Orders (5)</p>
            <button onClick={() => {setViewAll(true)}} className="font-jarkarta font-medium text-[#34CAA5] text-base">See All</button>
          </div>
          <table className="w-full">
            <tr className={`font-jarkarta font-medium text-[#9CA4AB] text-left`}>
              <th className="bg-red-40 w-[30%] xs:max-md:w-[20%] py-2 xs:max-md:text-sm">Name</th>
              <th className="bg-red-40 w-[20%] xs:max-md:text-sm ">Date</th>
              <th className="bg-red-40 w-[20%] xs:max-md:text-sm">Amount</th>
              <th className="bg-red-40 w-[10%] xs:max-md:text-sm">Status</th>
              <th className="bg-red-40 w-[10%] xs:max-md:text-sm">Invoice</th>
            </tr>
            {analytics.map(platforms => {
              let len = Array.from({length: 30}, (_, index) => index + 1).reverse()
              len.length = 5
              let chainRes = platforms.transactionHistory.map(history => {
                if (len.includes(history.orderNumber)) {
                  return (
                    <tr className={`bg-red-40 border-t border-[#EDF2F6]`}>
                      <td className={`flex bg-yellow-40 xs:max-md:flex-col xs:max-md:items-start xs:max-md:justify-center gap-2 items-center py-2`}>
                        <div className={`size-10 xs:max-md:size-8 rounded-full bg-red-30 ${theme !== "light" && "border-2 border-white"} flex items-center justify-center`}>
                          <img src={history.photo} alt="client image" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <p className={`font-jarkarta font-medium text-base xs:max-md:text-left xs:max-md:text-xs ${theme === "light" ? "text-[#3A3F51]" : "text-slate-300" } `}>{history.orderInfo.from}</p>
                        
                        </td>
                      <td className={`font-jarkarta font-normal text-base xs:max-md:text-xs   ${theme === "light" ? "text-[#737373]" : "text-slate-400" } `}>{moment(history.date).format("ll")}</td>
                      <td className={`font-jarkarta font-medium text-base xs:max-md:text-xs ${theme === "light" ? "text-[#0D062D]" : "text-white" } `}>${history.amount}</td>
                      <td className={`font-jarkarta bg-red-60 font-normal text-base xs:max-md:text-xs ${history.orderStatus.toLowerCase() === "paid" ? "text-[#34CAA5] " : "text-[#ED544E] " }`}>{history.orderStatus}</td>
                      <td onClick={() => setViewInvoice(history)} className="fle items-center hover:bg-red-500 bg-red-40 h-ful gap-1">
                        <div className="h-ful flex gap-1 items-center">
                        <div className="size-4 ">
                          <img src={view} alt="view icon" />
                        </div>
                        <p className={`font-jarkarta font-normal text-sm xs:max-md:text-left xs:max-md:text-xs ${theme === "light" ? "text-[#3A3F51]" : "text-slate-300" } `}>View</p>
                        </div>
                       
                      </td>
                    </tr>
                  )
                }
              })
              return chainRes
            }) }
          </table>
        </div>
        <div className="w-[39%] xs:max-lg:w-full bg-green-400 h-full xs:max-lg:h-52 rounded-xl flex flex-col items-center justify-between"></div>
      </div>
    </div>
  );
}

export default Home;
