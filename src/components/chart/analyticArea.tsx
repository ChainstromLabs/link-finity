import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';

interface ChartData {
  categories: string[];
  series: { name: string; data: number[] }[];
}

const MultipleAreaChart = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '1m' | 'all'>('7d');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const currentData = data[timeRange];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.categories
    .map((category, index) => ({
      date: category,
      click: currentData.series[0].data[index],
      visitors: currentData.series[1].data[index],
    }))
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(currentData.categories.length / itemsPerPage);

  useEffect(() => {
    const options = {
      chart: {
        height: 300,
        type: 'area',
        toolbar: { show: true },
        zoom: { enabled: true },
      },
      series: currentData.series,
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { curve: 'straight', width: 5 },
      grid: { strokeDashArray: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0.8,
        },
      },
      tooltip: {
        style: {
          colors: '#9ca3af',
          fontSize: '18px',
          fontFamily: 'Poppins',
          fontWeight: 400,
        },
        y: { formatter: (value: number) => `${value >= 1000 ? `${value / 1000}k` : value}` },
      },
      xaxis: {
        type: 'category',
        tickPlacement: 'on',
        categories: currentData.categories,
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '14px',
            fontFamily: 'Poppins',
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => (value >= 1000 ? `${value / 1000}k` : value),
          style: {
            colors: '#9ca3af',
            fontSize: '14px',
            fontFamily: 'Poppins',
            fontWeight: 400,
          },
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#chartarea'), options);
    chart.render();

    return () => chart.destroy();
  }, [timeRange]);

  return (
    <div>
      <div className="flex flex-col items-center gap-4 mb-6 p-4 rounded-lg">
        <div className="flex gap-3">
          <button
            onClick={() => setTimeRange('7d')}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            7 Day
          </button>
          <button
            onClick={() => setTimeRange('1m')}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            1 Month
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            All Time
          </button>
        </div>
      </div>

      <div id="chartarea"></div>
      <div className="w-full overflow-x-auto mt-7 shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse bg-white rounded-lg">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white ">
            <tr>
              <th className="px-4 py-3 text-center text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-center text-sm font-medium">Total Click</th>
              <th className="px-4 py-3 text-center text-sm font-medium">Total Visitors</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-3 text-center text-sm border-b border-gray-200 text-gray-700">
                  {item.date}
                </td>
                <td className="px-4 py-3 text-center text-sm border-b border-gray-200 text-indigo-600 font-semibold">
                  {item.click.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center text-sm border-b border-gray-200 text-purple-600 font-semibold">
                  {item.visitors.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>


      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-indigo-500 text-white hover:bg-indigo-600'} transition-all`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-indigo-500 text-white hover:bg-indigo-600'} transition-all`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>


    </div>
  );
};

export default MultipleAreaChart;
