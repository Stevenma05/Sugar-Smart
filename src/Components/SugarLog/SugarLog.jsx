import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './SugarLog.css';

// Register Chart.js modules
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function SugarLog({ username }) {
  const [glucose, setGlucose] = useState('');
  const [time, setTime] = useState('');
  const [readings, setReadings] = useState([]);

  // Load logs from localStorage on mount and when username changes
  useEffect(() => {
    if (username) {
      const storedLogs = JSON.parse(localStorage.getItem(`logs-${username}`)) || [];
      console.log(`Loaded logs for ${username}:`, storedLogs); // Debugging log
      setReadings(storedLogs);
    }
  }, [username]);

  // Save logs to localStorage whenever readings change
  useEffect(() => {
    if (username && readings.length > 0) {
      console.log(`Saving logs for ${username}:`, readings); // Debugging log
      localStorage.setItem(`logs-${username}`, JSON.stringify(readings));
    }
  }, [readings, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReading = { glucose: parseInt(glucose), time };

    const updatedReadings = [...readings, newReading];
    setReadings(updatedReadings); // Update state and save to localStorage
    setGlucose('');
    setTime('');
  };

  const handleDelete = (index) => {
    const updatedReadings = readings.filter((_, i) => i !== index);
    setReadings(updatedReadings); // Update state and trigger saving effect
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`${username}'s Glucose Logs`, 10, 10);
    doc.autoTable({
      head: [['Glucose (mg/dL)', 'Time']],
      body: readings.map((reading) => [
        reading.glucose,
        new Date(reading.time).toLocaleString(),
      ]),
    });
    doc.save(`${username}_glucose_logs.pdf`);
  };

  const graphData = {
    labels: readings.map((reading) => new Date(reading.time).toLocaleTimeString()),
    datasets: [
      {
        label: 'Glucose Levels (mg/dL)',
        data: readings.map((reading) => reading.glucose),
        borderColor: '#4caf50',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="sugar-log">
      <form onSubmit={handleSubmit} className="sugar-log-form">
        <h2>{username}'s Glucose Logs</h2>
        <input
          type="number"
          placeholder="Glucose Level (mg/dL)"
          value={glucose}
          onChange={(e) => setGlucose(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Add Reading</button>
      </form>

      <div className="export-buttons">
        <CSVLink
          data={readings}
          filename={`${username}_glucose_logs.csv`}
          className="export-button"
        >
          Export as CSV
        </CSVLink>
        <button onClick={generatePDF} className="export-button">
          Export as PDF
        </button>
      </div>

      <div className="logs-list">
        <h3>Your Glucose Logs</h3>
        {readings.length > 0 ? (
          <ul>
            {readings.map((reading, index) => (
              <li key={index}>
                <span>
                  {reading.glucose} mg/dL at {new Date(reading.time).toLocaleString()}
                </span>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No logs yet. Add a new reading above!</p>
        )}
      </div>

      {readings.length > 0 && (
        <div className="chart-container">
          <h3>Glucose Levels Over Time</h3>
          <Line data={graphData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
}

export default SugarLog;
