'use client';

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ 
  data, 
  labels, 
  title = '', 
  xAxisLabel = '', 
  yAxisLabel = '',
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
  height = 300,
  horizontal = false,
  stacked = false,
  showLegend = true,
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
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length],
          borderWidth: 1,
        }))
      : [{
          label: title,
          data: data,
          backgroundColor: colors,
          borderColor: colors.map(color => color),
          borderWidth: 1,
        }];

    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: horizontal ? 'horizontalBar' : 'bar',
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
            stacked: stacked,
          },
          y: {
            title: {
              display: !!yAxisLabel,
              text: yAxisLabel,
            },
            stacked: stacked,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels, title, xAxisLabel, yAxisLabel, colors, horizontal, stacked, showLegend]);

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;