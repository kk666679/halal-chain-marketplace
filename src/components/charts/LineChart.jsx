'use client';

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({
  data,
  labels,
  title = '',
  xAxisLabel = '',
  yAxisLabel = '',
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
  height = 300,
  fill = false,
  tension = 0.4,
  showLegend = true,
  showPoints = true,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    
    // Prepare datasets
    const datasets = Array.isArray(data[0]) 
      ? data.map((dataset, index) => ({
          label: Array.isArray(labels) && labels[index] ? labels[index] : `Dataset ${index + 1}`,
          data: dataset,
          backgroundColor: fill ? colors[index % colors.length] : 'transparent',
          borderColor: colors[index % colors.length],
          borderWidth: 2,
          fill: fill,
          tension: tension,
          pointRadius: showPoints ? 3 : 0,
          pointHoverRadius: showPoints ? 5 : 0,
        }))
      : [{
          label: title,
          data: data,
          backgroundColor: fill ? colors[0] : 'transparent',
          borderColor: colors[0],
          borderWidth: 2,
          fill: fill,
          tension: tension,
          pointRadius: showPoints ? 3 : 0,
          pointHoverRadius: showPoints ? 5 : 0,
        }];

    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.isArray(data[0]) ? (labels[0] || []) : labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: showLegend,
            position: 'top',
          },
          title: {
            display: !!title,
            text: title,
            font: {
              size: 16,
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            title: {
              display: !!xAxisLabel,
              text: xAxisLabel,
            },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: true,
            },
          },
          y: {
            title: {
              display: !!yAxisLabel,
              text: yAxisLabel,
            },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: true,
            },
            beginAtZero: true,
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels, title, xAxisLabel, yAxisLabel, colors, height, fill, tension, showLegend, showPoints]);

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;