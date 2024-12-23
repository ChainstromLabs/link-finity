import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import Flag from 'react-world-flags'
import countries from "world-countries";

interface ChartData {
    countries: string[];
    series: { name: string; data: number[] }[];
}

const CountryPieChart = () => {
    const [timeRange, setTimeRange] = useState<'7d' | '1m' | 'all'>('7d');

    const getCountryName = (code: string) => {
        const country = countries.find((c) => c.cca2 === code || c.cca3 === code);
        return country ? country.name.common : "Unknown Country";
    };

    useEffect(() => {
        const options = {
            chart: {
                height: 300,
                type: 'pie',
            },
            series: data[timeRange].series[0].data,
            labels: data[timeRange].countries.map((countryCode) => getCountryName(countryCode)),
            legend: { show: true },
            dataLabels: { enabled: true },
            tooltip: {
                style: {
                    colors: '#9ca3af',
                    fontSize: '18px',
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                },
                y: { formatter: (value: number) => `${value >= 1000 ? `${value / 1000}k` : value}` },
            },
        };

        const chart = new ApexCharts(document.querySelector('#chartpie'), options);
        chart.render();

        return () => chart.destroy();
    }, [timeRange]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCountries = data[timeRange].countries
        .map((country, index) => ({
            country,
            clicks: data[timeRange].series[0].data[index],
            visitors: data[timeRange].series[1].data[index],
        }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(data[timeRange].countries.length / itemsPerPage);


    return (
        <div>
            <div className="flex flex-col items-center gap-4 mb-6 p-4 rounded-lg">
                <div className="flex gap-3">
                    <button
                        onClick={() => setTimeRange('7d')}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                        7 Day
                    </button>
                    <button
                        onClick={() => setTimeRange('1m')}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                        1 Month
                    </button>
                    <button
                        onClick={() => setTimeRange('all')}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                        All Time
                    </button>
                </div>
            </div>

            <div id="chartpie"></div>


            <div className="w-full overflow-x-auto mt-[2.55rem] shadow-md rounded-lg">
                <table className="table-auto w-full border-collapse bg-white rounded-lg">
                    <thead className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white">
                        <tr>
                            <th className="px-4 py-3 text-center text-sm font-medium">Country</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">Total Clicks</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">Total Visitors</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedCountries.map((item, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-gray-100 transition-colors`}
                            >
                                <td className="px-4 py-3 text-center text-sm border-b border-gray-200 text-gray-700">

                                    <div className="flex items-center space-x-2">
                                        <Flag
                                            code={item.country}
                                            className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 rounded-full object-cover"
                                        />
                                        <span className="hidden sm:inline-block">{getCountryName(item.country)}</span>
                                    </div>


                                </td>
                                <td className="px-4 py-3 text-center text-sm border-b border-gray-200 text-blue-600 font-semibold">
                                    {item.clicks.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-center text-sm border-b border-gray-200 text-green-600 font-semibold">
                                    {item.visitors.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="flex justify-center gap-2 mt-4">
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

export default CountryPieChart;
