import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const yLabels = {
    0: "😞", 
    1: "😊"
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(val, index) {
            return yLabels[val]
          }
        }
      }
    }
  };
  
  const createDatesArr = () => {
    const currentDate = new Date();
    const datesArr = [];

    const formatDate = (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }

    datesArr.push(formatDate(currentDate));

    for(let i=1; i<31; i++) {
      const prevDate = new Date(new Date().setDate(currentDate.getDate() - i));

      datesArr.push(formatDate(prevDate))
    }

    return datesArr;
  }

  const labels = createDatesArr().reverse();

  
  const MoodChart = ({moods}) => {
    const data = {
      labels,
      datasets: [
        {
          label: 'Recent Mood',
          data: moods.slice(0, 31).map(mood => mood === "GOOD" ? 1 : 0),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    return <Line options={options} data={data} />;
  }

  export default MoodChart;