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
import destructureRelativePlatform from "../helper_functions/destructureRelativePlatform";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import { LinearProgress } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

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
  const [viewAll, setViewAll] = useState(false);
  const [viewInvoice, setViewInvoice] = useState("");
  const [chart, setChart] = useState({
    data: "",
    options: {
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
    },
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
  const [platformStats, setPlatformStats] = useState("");
  const [client, setClient] = useState({
    x: 0,
    y: 0,
  });

  // alert()
  const muiColor = [
    "secondary",
    "primary",
    "warning",
    "success",
    "error",
    "info",
  ];

  const options = {
    responsive: true,
    legend: {
      labels: {
        fontColor: "red",
      },
    },
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
        labels: {
          fontColor: "red",
        },
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  useEffect(() => {
    // window.scrollTo(0,0)
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
          label: "Monthly",
          data: val,
          backgroundColor: "rgba(52,202,165,0.1)",
          hoverBackgroundColor: "rgba(52,202,165,1)",
          borderRadius: { topLeft: 30, topRight: 30 },
        },
      ],
    };

    let resEffect = getRelativeStats("month");

    let statResEffect = destructureRelativeStats(relativeStats, resEffect);
    let platformRes = destructureRelativePlatform(relativeStats, resEffect);
    // alert(JSON.stringify(platformRes))
    setPlatformStats(platformRes);
    setRelativeStats(statResEffect);
    setChart({ data: data, options: options });
    setTrendFilter("month");
    setSelectInput("monthly");
  }, [theme]);

  function handleTrendSort(e) {
    let res, copyStats, statRes, platformRes;
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
    platformRes = destructureRelativePlatform(relativeStats, res);

    setPlatformStats(platformRes);
    setRelativeStats(statRes);
    setSelectInput(e.target.value);
  }
  // return ;
  return (
    <div
      className={`relative w-full h-screen xs:max-lg:h-auto p-3 ${
        theme === "light" ? "bg-[#FAFAFA]" : "bg-gray-900"
      }  flex flex-col justify-between `}
    >
      {viewInvoice !== "" && (
        <div
          onClick={() => {
            setViewInvoice("");
          }}
          className="absolute z-30 xs:max-lg:fixed w-full h-full bg-gray-900 bg-opacity-90 left-0 top-0 flex justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative xs:max-lg:w-[90%] w-96 mt-20 xs:max-lg:mt-20 bg-white rounded-xl h-[32rem] xs:max-lg:h-[28rem]"
          >
            <div className="absolute bg-[#34CAA5] p-4  right-10 xs:max-lg:right-5 h-16 xs:max-lg:h-auto z-10 ">
              <p className="text-2xl xs:max-lg:text-lg font-jarkarta font-semibold">
                Shop
                <span className="text-3xl xs:max-lg:text-xl italic font-black">
                  X
                </span>{" "}
              </p>
              <p className="bg-red-40 absolute top-full font-medium text-sm xs:max-lg:text-xs">
                INVOICE #{viewInvoice.orderNumber}{" "}
              </p>
            </div>
            <div className="relative p-5 m-5 bg-red-40 border-l-2 border-t border-t-dashed rounded-xl border-l-dotted border-t-black border-l-black">
              <div className="absolute w-full rounded-full bg-red-40 bottom-0 justify-end items-center gap-2 right-5 flex">
                <p className="font-jarkarta font-medium">From: </p>
                <div className="size-10 xs:max-lg:size-8  rounded-full bg-yellow-40">
                  <img
                    src={viewInvoice.photo}
                    alt="sender image"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <p className="text-2xl font-bold xs:max-lg:text-xl">INVOICE</p>
              <p className="text-sm xs:max-lg:text-xs font-jarkarta font-semibold text-slate-500">
                BILLING TO:
              </p>
              <p className="text-sm xs:max-lg:text-xs text-slate-950 font-bold">
                {viewInvoice.orderInfo.to}
              </p>
              <p className="text-sm xs:max-lg:text-xs font-jarkarta font-semibold text-slate-500">
                DATE ISSUED:
              </p>
              <p className="text-sm xs:max-lg:text-xs text-slate-950 font-bold">
                {moment(viewInvoice.date).format("LL")}
              </p>
            </div>
            <div className="p-5">
              <p className="text-slate-800 font-bold text-lg xs:max-lg:text-base">
                Order Information:
              </p>
              <div>
                <table className="w-full">
                  <tr className="text-left bg-geeg">
                    <th>Items</th>
                    <th>Qty</th>
                    <th>Wt. </th>
                  </tr>
                  <tr>
                    <td>{viewInvoice.deliverables.desc}</td>
                    <td>{viewInvoice.deliverables.qty}</td>
                    <td>{viewInvoice.deliverables.wt}</td>
                  </tr>
                </table>
                <div className="p-5 m-1 xs:max-lg:mt-5 bg-red-40 border-r-2 border-b-2 rounded-xl border-b-dashed border-r-dotted border-b-black border-r-black">
                  <p className="text-right font-normal text-lg text-slate-500 xs:max-lg:text-sm">
                    Amount:{" "}
                    <span className="text-xl xs:max-lg:text-base ml-2 text-slate-950">
                      ${viewInvoice.amount}
                    </span>
                  </p>
                  <p className="text-right font-normal text-lg text-slate-500 xs:max-lg:text-sm">
                    Order Status:{" "}
                    <span
                      className={`text-xl xs:max-lg:text-base ml-2 ${
                        viewInvoice.orderStatus.toLowerCase() === "paid"
                          ? "text-geeg"
                          : "text-[#ED544E]"
                      }`}
                    >
                      {viewInvoice.orderStatus}
                    </span>
                  </p>
                  <p className="text-right font-normal text-lg text-slate-500 xs:max-lg:text-sm">
                    Mode of transportation:{" "}
                    <span className="text-xl xs:max-lg:text-base ml-2 text-slate-950">
                      {viewInvoice.orderType}
                    </span>
                  </p>
                  <p className="text-right font-normal text-lg text-slate-500 xs:max-lg:text-sm">
                    Mode of payment:{" "}
                    <span className="text-xl ml-2 text-slate-950 xs:max-lg:text-base">
                      {viewInvoice.paymentMode}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {viewAll && (
        <div
          className={`absolute z-20 overflow-scroll left-0 w-full h-full ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }  slideInRight flex justify-center`}
        >
          <div
            onClick={() => {
              window.scrollTo(client.x, client.y);
              setViewAll(false);
            }}
            className="fixed size-10 xs:max-md:size-8 bg-slate-200 hover:bg-red-200 rounded-md right-0 m-10 xs:max-lg:m-0 cursor-pointer"
          >
            <p className="text-3xl xs:max-md:text-2xl flex items-center justify-center">
              X
            </p>
          </div>
          <div className="w-2/3 xs:max-lg:w-full mx-auto p-5 xs:max-lg:p-3">
            <table className="w-full">
              <tr
                className={`font-jarkarta font-medium text-[#9CA4AB] text-left`}
              >
                <th className="bg-red-40 w-[30%] xs:max-md:w-[20%] py-2 xs:max-md:text-sm">
                  Name
                </th>
                <th className="bg-red-40 w-[20%] xs:max-md:text-sm ">Date</th>
                <th className="bg-red-40 w-[20%]  xs:max-md:text-sm">Amount</th>
                <th className="bg-red-40 w-[10%] md:w-[20%] xs:max-md:text-sm">
                  Status
                </th>
                <th className="bg-red-40 w-[10%] xs:max-md:text-sm">Invoice</th>
              </tr>
              {analytics.map((platforms) => {
                // let len = Array.from({length: analytics.length}, (_, index) => index + 1).reverse()
                // len.length = 5
                let chainRes = platforms.transactionHistory.map((history) => {
                  // if (len.includes(history.orderNumber)) {
                  return (
                    <tr
                      className={`bg-red-40 ${
                        theme === "light"
                          ? "hover:bg-slate-300"
                          : "hover:bg-gray-800"
                      } border-t border-[#EDF2F6]`}
                    >
                      <td
                        className={`flex xs:max-md:flex-col xs:max-md:items-start xs:max-md:justify-center gap-2 items-center py-2`}
                      >
                        <div
                          className={`size-10 xs:max-md:size-8 rounded-full bg-red-30 ${
                            theme !== "light" && "border-2 border-white"
                          } flex items-center justify-center`}
                        >
                          <img
                            src={history.photo}
                            alt="client image"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <p
                          className={`font-jarkarta font-medium text-base xs:max-md:text-left xs:max-md:text-xs ${
                            theme === "light"
                              ? "text-[#3A3F51]"
                              : "text-slate-300"
                          } `}
                        >
                          {history.orderInfo.from}
                        </p>
                      </td>
                      <td
                        className={`font-jarkarta font-normal text-base xs:max-md:text-xs   ${
                          theme === "light"
                            ? "text-[#737373]"
                            : "text-slate-400"
                        } `}
                      >
                        {moment(history.date).format("ll")}
                      </td>
                      <td
                        className={`font-jarkarta font-medium text-base xs:max-md:text-xs ${
                          theme === "light" ? "text-[#0D062D]" : "text-white"
                        } `}
                      >
                        ${history.amount}
                      </td>
                      <td
                        className={`font-jarkarta font-normal text-base xs:max-md:text-xs ${
                          history.orderStatus.toLowerCase() === "paid"
                            ? "text-[#34CAA5] "
                            : "text-[#ED544E] "
                        }`}
                      >
                        {history.orderStatus}
                      </td>
                      <td
                        onClick={() => setViewInvoice(history)}
                        className="fle items-center bg-red-40 cursor-pointer h-ful gap-1"
                      >
                        <div className="h-ful flex gap-1 items-center">
                          <div className="size-4 text-white flex items-center justify-center">
                            {theme === "light" ? (
                              <img src={view} alt="view icon" />
                            ) : (
                              <SimCardDownloadOutlinedIcon />
                            )}
                          </div>
                          <p
                            className={`font-jarkarta font-normal text-sm xs:max-md:text-left xs:max-md:text-xs ${
                              theme === "light"
                                ? "text-[#3A3F51] hover:text-geeg cursor-pointer"
                                : "text-slate-300 hover:text-geeg"
                            } `}
                          >
                            View
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                  // }
                });
                return chainRes;
              })}
            </table>
          </div>
        </div>
      )}
      <div className="xs:max-lg:flex-col flex justify-between bg-yellow-40 xs:max-lg:h-auto h-[49%]">
        <div
          className={`w-[59%] xs:max-lg:w-full md:max-lg:w-[80%] bg-red-40 md:max-lg:mx-auto ${
            theme === "light"
              ? "bg-white border-[#EDF2F7]"
              : "bg-gray-900 border-slate-700"
          } border xs:max-lg:h-auto xs:max-lg:space-y-5 md:max-lg:h-80 h-full rounded-xl p-2`}
        >
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
                    theme === "light"
                      ? "bg-transparent hover:bg-gray-200"
                      : "bg-gray-800 hover:bg-gray-700"
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
          <div className="h-[90%] xs:max-lg:flex xs:max-lg:items-center xs:max-lg:h-auto bg-red-40">
            <Bar id="trend" data={chart.data || data} options={chart.options} />
          </div>
        </div>
        <p
          className={`lg:hidden text-2xl font-semibold xs:max-md:mt-10 md:text-center ${
            theme !== "light" && "text-slate-100"
          }`}
        >
          {selectInput[0].toUpperCase() + selectInput.slice(1)} Stats{" "}
        </p>
        <div className="w-[39%] xs:max-md:gap-0 xs:max-lg:w-full bg-green-40 xs:max-lg:h-auto h-full rounded-xl flex flex-col items-center justify-between">
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
        <div
          className={`w-[59%] overflow-scroll xs:max-lg:w-full xs:max-lg:my-10 ${
            theme === "light"
              ? "bg-white border border-[#EDF2F7]"
              : "bg-gray-900 border border-slate-700"
          }  h-full xs:max-lg:h-auto md:h-auto rounded-xl px-4 py-3`}
        >
          <div className="flex justify-between">
            <p
              className={`font-jarkarta font-semibold  text-base ${
                theme === "light" ? "text-[#26282C]" : "text-slate-200"
              } `}
            >
              Last Orders (5)
            </p>
            <button
              onClick={(e) => {
                setClient({ x: e.clientX, y: e.clientY });
                window.scrollTo(0, 0);
                setViewAll(true);
              }}
              className="font-jarkarta font-medium text-[#34CAA5] text-base"
            >
              See All
            </button>
          </div>
          <table className="w-full bg-red-5 mt-3">
            <tr className={`font-jarkarta  text-[#9CA4AB] text-left`}>
              <th className="bg-red-40 w-[30%] font-medium xs:max-md:w-[20%] py-2 xs:max-md:text-sm">
                Name
              </th>
              <th className="bg-red-40 w-[20%] xs:max-md:text-sm font-medium ">
                Date
              </th>
              <th className="bg-red-40 w-[15%] font-medium xs:max-md:text-sm">
                Amount
              </th>
              <th className="bg-red-40 w-[15%] xs:max-md:text-sm font-medium">
                Status
              </th>
              <th className="bg-red-40 w-[10%] xs:max-md:text-sm font-medium">
                Invoice
              </th>
            </tr>
            {analytics.map((platforms) => {
              let len = Array.from(
                { length: 30 },
                (_, index) => index + 1
              ).reverse();
              len.length = 5;
              let chainRes = platforms.transactionHistory.map((history) => {
                if (len.includes(history.orderNumber)) {
                  return (
                    <tr
                      className={`bg-red-40 border-t ${
                        theme === "light"
                          ? "border-[#EDF2F6] hover:bg-slate-200"
                          : "border-gray-700 hover:bg-gray-800"
                      } `}
                    >
                      <td
                        className={`flex bg-yellow-40 xs:max-md:flex-col xs:max-md:items-start xs:max-md:justify-center gap-2 items-center py-2`}
                      >
                        <div
                          className={`size-10 xs:max-md:size-8 rounded-full bg-red-30 ${
                            theme !== "light" && "border-2 border-white"
                          } flex items-center justify-center`}
                        >
                          <img
                            src={history.photo}
                            alt="client image"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <p
                          className={`font-jarkarta font-medium text-base xs:max-md:text-left xs:max-md:text-xs ${
                            theme === "light"
                              ? "text-[#3A3F51]"
                              : "text-slate-300"
                          } `}
                        >
                          {history.orderInfo.from}
                        </p>
                      </td>
                      <td
                        className={`font-jarkarta font-normal text-base xs:max-md:text-xs   ${
                          theme === "light"
                            ? "text-[#737373]"
                            : "text-slate-400"
                        } `}
                      >
                        {moment(history.date).format("ll")}
                      </td>
                      <td
                        className={`font-jarkarta font-medium text-base xs:max-md:text-xs ${
                          theme === "light" ? "text-[#0D062D]" : "text-white"
                        } `}
                      >
                        ${history.amount}
                      </td>
                      <td
                        className={`font-jarkarta bg-red-60 font-normal text-base xs:max-md:text-xs ${
                          history.orderStatus.toLowerCase() === "paid"
                            ? "text-[#34CAA5] "
                            : "text-[#ED544E] "
                        }`}
                      >
                        {history.orderStatus}
                      </td>
                      <td
                        onClick={() => setViewInvoice(history)}
                        className="fle items-center bg-red-40 cursor-pointer h-ful gap-1"
                      >
                        <div className="h-ful flex gap-1 items-center">
                          <div className="size-4 text-slate-300 flex items-center justify-center">
                            {theme === "light" ? (
                              <img src={view} alt="view icon" />
                            ) : (
                              <SimCardDownloadOutlinedIcon />
                            )}
                          </div>
                          <p
                            className={`font-jarkarta font-normal text-sm xs:max-md:text-left xs:max-md:text-xs ${
                              theme === "light"
                                ? "text-[#3A3F51] hover:text-geeg cursor-pointer"
                                : "text-slate-300 hover:text-geeg"
                            } `}
                          >
                            View
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                }
              });
              return chainRes;
            })}
          </table>
        </div>
        <div
          className={`w-[39%] xs:max-lg:w-full ${
            theme === "light"
              ? "bg-white border-[#EDF2F7]"
              : "bg-gray-900 border-slate-500"
          }  overflow-scroll border px-4 py-3 h-full xs:max-lg:max-h-80 rounded-xl`}
        >
          <div className="flex justify-between bg-red-40">
            <p
              className={`font-jarkarta font-semibold  text-base ${
                theme === "light" ? "text-[#26282C]" : "text-slate-200"
              } `}
            >
              Top Platform
            </p>
            <button className="font-jarkarta accent font-medium text-[#34CAA5] text-base">
              See All
            </button>
          </div>
          <div className="bg-red-40 space-y-2 xs:max-lg:space-y-5  mt-5">
            {platformStats &&
              platformStats
                .sort((a, b) => b[Object.keys(b)[1]] - a[Object.keys(a)[1]])
                .map((items, id) => {
                  let name = items[Object.keys(items)[2]];
                  let val = items[Object.keys(items)[1]];
                  let percentage = items[Object.keys(items)[0]];
                  return (
                    <div
                      className={`space-y-1 ${
                        theme === "light"
                          ? "hover:bg-slate-200"
                          : "hover:bg-gray-800"
                      }  `}
                    >
                      <p
                        className={`font-jarkarta font-semibold ${
                          theme === "light"
                            ? "text-[#22242C]"
                            : "text-slate-200"
                        } `}
                      >
                        {name}
                      </p>
                      {/* <p> {muiColor[6%id]}</p> */}
                      <LinearProgress
                        color={id > 5 ? muiColor[6 % id] : muiColor[id]}
                        variant="determinate"
                        value={percentage}
                        sx={
                          theme === "light"
                            ? {
                                height: 10,
                                accentColor: red[600],
                                color: red[500],
                                accent: red[500],
                                backgroundColor: grey[100],
                                borderRadius: 20,
                              }
                            : {
                                height: 10,
                                accentColor: red[600],
                                color: red[500],
                                accent: red[500],
                                backgroundColor: grey[800],
                                borderRadius: 20,
                              }
                        }
                      />
                      <div
                        className={`flex justify-between font-jarkarta font-normal ${
                          theme === "light"
                            ? "text-[#525252]"
                            : "text-slate-400"
                        } `}
                      >
                        <p>
                          $
                          {val
                            .toString()
                            .split("")
                            .reverse()
                            .map((item, id) => {
                              let start = 0 === (id + 1) % 3;
                              if (start) {
                                return `,${item}`;
                              } else {
                                return item;
                              }
                            })
                            .reverse()
                            .join("")}
                        </p>

                        <p>+{percentage}%</p>
                      </div>
                    </div>
                  );
                })}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
