import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart = ({ title1, chartData1 }: { title1: string; chartData1: any; }) => {
  const data = {
    labels: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    datasets: [
      {
        label: title1,
        data: chartData1,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)", // 2월 - 파랑
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // 2월 - 파랑
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
