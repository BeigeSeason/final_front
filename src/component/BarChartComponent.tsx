import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart = ({ title, chartData }: { title: string; chartData: any }) => {
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
        label: title,
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // 1월 - 빨강
          "rgba(54, 162, 235, 0.2)", // 2월 - 파랑
          "rgba(255, 206, 86, 0.2)", // 3월 - 노랑
          "rgba(75, 192, 192, 0.2)", // 4월 - 청록
          "rgba(153, 102, 255, 0.2)", // 5월 - 보라
          "rgba(255, 159, 64, 0.2)", // 6월 - 주황
          "rgba(0, 204, 102, 0.2)", // 7월 - 초록
          "rgba(255, 140, 0, 0.2)", // 8월 - 진한 주황
          "rgba(204, 102, 255, 0.2)", // 9월 - 연보라
          "rgba(102, 178, 255, 0.2)", // 10월 - 연파랑
          "rgba(255, 102, 178, 0.2)", // 11월 - 핑크
          "rgba(128, 128, 128, 0.2)", // 12월 - 회색
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // 1월 - 빨강
          "rgba(54, 162, 235, 1)", // 2월 - 파랑
          "rgba(255, 206, 86, 1)", // 3월 - 노랑
          "rgba(75, 192, 192, 1)", // 4월 - 청록
          "rgba(153, 102, 255, 1)", // 5월 - 보라
          "rgba(255, 159, 64, 1)", // 6월 - 주황
          "rgba(0, 204, 102, 1)", // 7월 - 초록
          "rgba(255, 140, 0, 1)", // 8월 - 진한 주황
          "rgba(204, 102, 255, 1)", // 9월 - 연보라
          "rgba(102, 178, 255, 1)", // 10월 - 연파랑
          "rgba(255, 102, 178, 1)", // 11월 - 핑크
          "rgba(128, 128, 128, 1)", // 12월 - 회색
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
