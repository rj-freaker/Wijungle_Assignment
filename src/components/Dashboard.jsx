import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';
import eveData from './eve.json';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setData(eveData);
    } catch (error) {
      console.error('Error setting data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const alertCategoriesData = data.reduce((acc, alert) => {
    const category = alert.alert?.category ?? 'Unknown';
    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  const alertsOverTime = {
    labels: data.map(item => new Date(item.timestamp).toLocaleString()),
    datasets: [{
      label: 'Number of Alerts',
      data: data.map((_, index) => index + 1),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const alertCategories = {
    labels: Object.keys(alertCategoriesData),
    datasets: [{
      label: 'Alert Categories',
      data: Object.values(alertCategoriesData),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  const topSourceIPsData = data.reduce((acc, alert) => {
    const ip = alert.src_ip ?? 'Unknown';
    if (acc[ip]) {
      acc[ip]++;
    } else {
      acc[ip] = 1;
    }
    return acc;
  }, {});

  const topSourceIPs = {
    labels: Object.keys(topSourceIPsData),
    datasets: [{
      label: 'Top Source IPs',
      data: Object.values(topSourceIPsData),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  const topDestPortsData = data.reduce((acc, alert) => {
    const port = alert.dest_port ?? 'Unknown';
    if (acc[port]) {
      acc[port]++;
    } else {
      acc[port] = 1;
    }
    return acc;
  }, {});

  const topDestPorts = {
    labels: Object.keys(topDestPortsData),
    datasets: [{
      label: 'Top Destination Ports',
      data: Object.values(topDestPortsData),
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div className="dashboard">
      <h1>Network Alerts Dashboard</h1>
      <div className='indiv'>
        <div className='indiv1'>
            <div className="chart-container">
                <Line data={alertsOverTime} />
            </div>
            <div className="chart-container">
                <Pie data={alertCategories} />
            </div>
        </div>
        <div className='indiv2'>
            <div className="chart-container">
                <Bar data={topSourceIPs} />
            </div>
            <div className="chart-container">
                <Bar data={topDestPorts} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
