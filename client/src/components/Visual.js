import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement);

function App() {
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [heatmapData, setHeatmapData] = useState({});
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Malad East');
  const [futureData, setFutureData] = useState([]);
  const [startYear, setStartYear] = useState(2025);
  const [endYear, setEndYear] = useState(2030);

  const API_BASE = 'http://localhost:5007/api';

  useEffect(() => {
    const staticLocations = [
      "Malad East", "Ambernath West", "Borivali West", "Andheri East", "Ambernath East", "Kalamboli", "Diva", "Dahisar",
      "Santacruz East", "Palghar", "Thane West", "Borivali East", "Airoli", "Virar", "Thane East", "Kandivali East",
      "Panvel", "Kandivali West", "Khopoli", "Taloja", "Kalyan West", "Malad West", "Kharghar", "Kalyan East",
      "Goregaon West", "Umroli", "Goregaon East", "Ulwe", "Titwala", "Rasayani", "Badlapur West", "Dronagiri",
      "Chembur", "Kamothe", "Dombivli", "Jogeshwari West", "Vangani", "Shahapur", "Mulund West", "Karjat",
      "Badlapur East", "Bhiwandi", "Andheri West", "Kurla", "Vichumbe", "Kewale", "Koper Khairane", "Dombivli East",
      "Nerul", "Virar East", "Ganga Nagar", "Nala Sopara", "Vashi", "Goregaon Karjat Road", "Dombivli (West)",
      "Jogeshwari East", "Powai", "Seawoods", "Greater Khanda", "Girgaon", "Vasai West", "Vasai", "Bandra West",
      "Neral", "Mira Road East", "Mahim", "Pisarve", "Kalwa", "Virar West", "Ghatkopar West", "Haranwali",
      "Usarghar Gaon", "Mulund East", "Rohinjan", "Owale", "Navade", "Hendre Pada", "Ambivali", "Tardeo",
      "Diva Gaon", "Khar West", "Bhandup East", "Sanpada", "Dadar West", "Saphale", "Khar", "Santacruz West",
      "Wada", "Nalasopara West", "Dadar East", "Vevoor", "Kumbharkhan Pada", "Kanjurmarg", "Anjurdive", "Belapur",
      "Kurla East", "Matunga East", "Worli", "Marine Lines", "Dahisar West", "Malabar Hill", "Atgaon", "Taloje",
      "Dombivli (West)", "Dundare", "Pale Bk.", "Dharamveer Nagar", "Juna Palghar", "New Balaji Nagar",
      "Navapada", "Kasaradavali Thane West", "Hiranandani Estates", "Juinagar West", "Santosh Nagar",
      "Sector 16 A", "Parel", "Cuffe Parade", "Kamathipura", "Bhangarwadi", "Karanjade", "Mandvi", "Bhayandar East",
      "Bhayandar West", "Vikhroli West", "Agripada", "Sewri", "Byculla", "Mumbai Central", "Palava", "Deonar",
      "Nilje Gaon", "Prabhadevi", "Vasind", "Naigaon East", "Mazagaon", "Ghansoli", "Sion", "Bandra Kurla Complex",
      "Juhu Scheme", "Mahalaxmi", "Napeansea Road", "Ghodbander", "Vishnu Nagar", "Koproli", "Ulhasnagar",
      "Mumbra", "Mankhurd", "Wadala", "Rohinjan", "Tardeo", "Anjurdive", "Kasheli", "Vasai East"
    ];
    setLocations(staticLocations);

    axios.get(`${API_BASE}/line-chart`).then(res => {
      setLineData(res.data);
    });
    axios.get(`${API_BASE}/bar-chart`).then(res => setBarData(res.data));
    axios.get(`${API_BASE}/heatmap`).then(res => setHeatmapData(res.data));
  }, []);

  const handlePrediction = async () => {
    try {
      const res = await axios.post(`${API_BASE}/predict-future`, {
        location: selectedLocation,
        start_year: startYear,
        end_year: endYear
      });
      setFutureData(res.data.predictions);
    } catch (error) {
      alert('Prediction failed. Try again.');
    }
  };

  const formatLineChart = () => {
    const grouped = {};
    lineData.forEach(({ Year, Location, Price_per_sqft }) => {
      if (!grouped[Location]) grouped[Location] = [];
      grouped[Location].push({ x: Year, y: Price_per_sqft });
    });

    return {
      datasets: Object.entries(grouped).map(([loc, values]) => ({
        label: loc,
        data: values,
        fill: false,
        borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
        tension: 0.4,
      }))
    };
  };

  const formatBarChart = () => {
    const labels = [...new Set(barData.map(d => d.Year))];
    const avgByYear = labels.map(year => {
      const values = barData.filter(d => d.Year === year).map(d => d['Rate_of_Change_%']);
      return values.reduce((a, b) => a + b, 0) / values.length;
    });

    return {
      labels,
      datasets: [{
        label: "Avg Rate of Change %",
        data: avgByYear,
        backgroundColor: avgByYear.map(value => value >= 0 ? 'green' : 'red')
      }]
    };
  };

  const renderHeatmap = () => {
    const rows = Object.keys(heatmapData);
    const years = Object.keys(heatmapData[rows[0]] || {});

    return (
      <table style={styles.heatmap}>
        <thead>
          <tr><th style={styles.th}>Location</th>{years.map(year => <th key={year} style={styles.th}>{year}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(loc => (
            <tr key={loc}>
              <td style={styles.td}>{loc}</td>
              {years.map(year => {
                const value = heatmapData[loc][year];
                const bgColor = value > 0
                  ? `rgba(0, 200, 0, ${Math.min(value / 20, 1)})`
                  : `rgba(200, 0, 0, ${Math.min(Math.abs(value) / 20, 1)})`;
                return (
                  <td key={year} style={{ ...styles.td, backgroundColor: bgColor }}>
                    {value.toFixed(2)}%
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={styles.app}>
      <nav style={styles.navbar}>
        <h2>🏘️ AI Real Estate Predictor</h2>
      </nav>

      <div style={styles.container}>
        <section style={styles.section}>
          <h2>1. Comparative Line Chart (Price per Sqft)</h2>
          <Line data={formatLineChart()} />
        </section>

        <section style={styles.section}>
          <h2>2. Rate of Change (%) Bar Chart</h2>
          <Bar data={formatBarChart()} />
        </section>

        <section style={styles.section}>
          <h2>3. Growth % Heatmap</h2>
          {renderHeatmap()}
        </section>

        <section style={styles.section}>
          <h2>4. 🔮 Predict Future Property Prices</h2>
          <div style={styles.predictForm}>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              style={styles.select}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <input type="number" value={startYear} onChange={e => setStartYear(e.target.value)} placeholder="Start Year" style={styles.input} />
            <input type="number" value={endYear} onChange={e => setEndYear(e.target.value)} placeholder="End Year" style={styles.input} />
            <button onClick={handlePrediction} style={styles.button}>Predict</button>
          </div>
          <div style={styles.predictionOutput}>
            {futureData.map((item, i) => (
              <div key={i} style={styles.predictedItem}>
                {item.year} ➡️ ₹{item.predicted_price_per_sqft} /sqft
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  app: {
    backgroundImage: 'url("https://images.pexels.com/photos/28738504/pexels-photo-28738504/free-photo-of-colorful-model-houses-on-financial-charts.jpeg?auto=compress&cs=tinysrgb&w=800")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    paddingBottom: '50px',
    color: '#333'
  },
  navbar: {
    backgroundColor: '#ffffffcc',
    padding: '10px 20px',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    borderBottom: '2px solid #ccc',
    textAlign: 'center'
  },
  container: {
    padding: '30px',
    backgroundColor: '#ffffffee',
    margin: '30px auto',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '1200px',
    boxShadow: '0 0 15px rgba(0,0,0,0.15)'
  },
  section: {
    marginBottom: '50px'
  },
  heatmap: {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '1rem'
  },
  th: {
    border: '1px solid #ccc',
    backgroundColor: '#eee',
    padding: '10px',
    textAlign: 'center'
  },
  td: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  predictForm: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '15px',
    marginBottom: '20px'
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    flex: 1,
    minWidth: '150px'
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    flex: 1,
    minWidth: '100px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  predictionOutput: {
    fontSize: '1.1rem',
    fontWeight: 'bold'
  },
  predictedItem: {
    marginTop: '5px'
  }
};

export default App;