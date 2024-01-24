import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const val = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels: val.map(row => row.year),
  datasets: [
    {
      label: 'Dataset 1',
      data: val.map(row => row.count),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

function Home() {
  // return <Bar data={data} />;
  return (
    <div className={`relative w-full h-full p-3 bg-[#FAFAFA] space-y-5 `}>
      <div className='flex justify-between bg-yellow-40 h-1/2'>
        <div className='w-[59%] bg-blue-400 h-full rounded-xl'></div>
        <div className='w-[39%] bg-green-40 h-full rounded-xl flex flex-col items-center justify-between'>
          <div className='flex w-full h-[48%] justify-between'>
            <div className='w-[48%] bg-black rounded-xl'></div>
            <div className='w-[48%] bg-black rounded-xl'></div>
          </div>
          <div className='flex w-full h-[48%] justify-between'>
            <div className='w-[48%] bg-black rounded-xl'></div>
            <div className='w-[48%] bg-black rounded-xl'></div>
          </div>
        </div>
      </div>
      <div className='flex justify-between bg-yellow-40 h-[40%]'>
        <div className='w-[59%] bg-blue-400 h-full rounded-xl'></div>
        <div className='w-[39%] bg-green-400 h-full rounded-xl flex flex-col items-center justify-between'>
        </div>
      </div>

    </div>
  )
}

export default Home
