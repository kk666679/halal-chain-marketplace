'use client';

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({
  data,
  labels,
  title = '',
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#8b5cf6'],
  height = 300,
  doughnut = false,
  showLegend = true,
  cutout = '50%',
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
    
    // Ensure we have enough colors
    const extendedColors = [...colors];
    while (extendedColors.length < data.length) {
      extendedColors.push(...colors);
    }
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: doughnut ? 'doughnut' : 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: extendedColors.slice(0, data.length),
          borderColor: '#ffffff',
          borderWidth: 2,
        }],
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
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.formattedValue;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((context.raw / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          },
        },
        cutout: doughnut ? cutout : 0,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels, title, colors, height, doughnut, showLegend, cutout]);

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;