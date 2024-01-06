"use client"
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const HumidityPage: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [apiResponse, setApiResponse] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.43.201:2000");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        setApiResponse(data);
        updateChart(data.temperature); // Update the chart with the new temperature data
      } catch (error) {
        console.error('Error fetching API response:', error);

        if (error instanceof SyntaxError) {
          console.error('Invalid JSON format in the API response.');
        }

        setApiResponse('Error fetching API response');
      }
    };

    const updateChart = (newTemperature: number) => {
      if (chartRef.current && chartInstanceRef.current) {
        const chartData = chartInstanceRef.current.data.datasets?.[0].data as number[];
        const labels = chartInstanceRef.current.data.labels as string[];

        // Add new data point and label
        chartData.push(newTemperature);
        labels.push(new Date().toLocaleTimeString());

        // Limit the number of data points to show on the chart (e.g., last 10 data points)
        const maxDataPoints = 10;
        if (chartData.length > maxDataPoints) {
          chartData.shift(); // Remove the oldest data point
          labels.shift(); // Remove the corresponding label
        }

        // Update the chart with the new data
        chartInstanceRef.current.update();
      }
    };

    fetchData(); // Initial fetch

    // Set up interval for fetching data and updating the chart
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Create the initial chart
    if (chartRef.current && !chartInstanceRef.current) {
      const ctx = chartRef.current.getContext('2d')!;
      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Temperature Over Time',
              data: [],
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      chartInstanceRef.current = chartInstance;
    }
  }, []);

  return (
    <div>
      <h1>Humidity Page</h1>
      <canvas ref={chartRef} width={400} height={200}></canvas>
    </div>
  );
};

export default HumidityPage;
