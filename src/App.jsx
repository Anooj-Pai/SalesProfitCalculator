import { useState } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [markup, setMarkup] = useState(0);
  const [profit, setProfit] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [visualizations, setVisualizations] = useState(false);

  const handleCostChange = (e) => setCost(Number(e.target.value));
  const handlePriceChange = (e) => setPrice(Number(e.target.value));
  const handleMarkupChange = (e) => setMarkup(Number(e.target.value));
  const handleProfitChange = (e) => setProfit(Number(e.target.value));
  const handleGrossProfitChange = (e) => setGrossProfit(Number(e.target.value));

  const handleCalculate = () => {
    let calculatedCost = cost;
    let calculatedPrice = price;
    let calculatedMarkup = markup;
    let calculatedProfit = profit;
    let calculatedGrossProfit = grossProfit;

    if (calculatedCost && calculatedGrossProfit) {
      calculatedPrice = (calculatedCost / (1 - calculatedGrossProfit / 100)).toFixed(2);
      calculatedProfit = (calculatedPrice - calculatedCost).toFixed(2);
      calculatedMarkup = ((calculatedProfit / calculatedCost) * 100).toFixed(2);
    } else if (calculatedPrice && calculatedGrossProfit) {
      calculatedCost = (calculatedPrice * (1 - calculatedGrossProfit / 100)).toFixed(2);
      calculatedProfit = (calculatedPrice - calculatedCost).toFixed(2);
      calculatedMarkup = ((calculatedProfit / calculatedCost) * 100).toFixed(2);
    } else if (calculatedCost && calculatedPrice) {
      calculatedProfit = (calculatedPrice - calculatedCost).toFixed(2);
      calculatedGrossProfit = (((calculatedPrice - calculatedCost) / calculatedPrice) * 100).toFixed(2);
      calculatedMarkup = ((calculatedProfit / calculatedCost) * 100).toFixed(2);
    } else {
      alert('Please provide at least two values to calculate');
    }

    setCost(Number(calculatedCost));
    setPrice(Number(calculatedPrice));
    setMarkup(Number(calculatedMarkup));
    setProfit(Number(calculatedProfit));
    setGrossProfit(Number(calculatedGrossProfit));
  };

  const handleClear = () => {
    setCost(0);
    setMarkup(0);
    setPrice(0);
    setProfit(0);
    setGrossProfit(0);
  };

  // Data for bar graphs
  const profitData = {
    labels: ['Cost Price', 'Selling Price'],
    datasets: [
      {
        label: 'Profit',
        data: [cost, price],
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(75,192,192,0.8)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(75,192,192,1)'],
        borderWidth: 1,
      },
    ],
  };

  const markupData = {
    labels: ['Cost Price', 'Markup (%)'],
    datasets: [
      {
        label: 'Markup',
        data: [cost, markup],
        backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(255,99,132,0.8)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(255,99,132,1)'],
        borderWidth: 1,
      },
    ],
  };

  const grossProfitData = {
    labels: ['Selling Price', 'Gross Profit (%)'],
    datasets: [
      {
        label: 'Gross Profit',
        data: [price, grossProfit],
        backgroundColor: ['rgba(54,162,235,0.6)', 'rgba(54,162,235,0.8)'],
        borderColor: ['rgba(54,162,235,1)', 'rgba(54,162,235,1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h1>Sales Profit Calculator</h1>
      <div className="card">
        <div className='container'>
          <div className="input">
            <label>Cost Price</label>
            <br />
            <input type="number" value={cost || ''} onChange={handleCostChange} />
          </div>
          <div className="input">
            <label>Selling Price:</label>
            <br />
            <input type="number" value={price || ''} onChange={handlePriceChange} />
          </div>
          <div className="input">
            <label>Markup (%):</label>
            <br />
            <input type="number" value={markup || ''} onChange={handleMarkupChange} />
          </div>
          <div className="input">
            <label>Gross Profit (%):</label>
            <br />
            <input type="number" value={grossProfit || ''} onChange={handleGrossProfitChange} />
          </div>
          <div className="input">
            <label>Profit:</label>
            <br />
            <input type="number" value={profit || ''} onChange={handleProfitChange} />
          </div>
          <button style={{ marginBottom: '1%' }} onClick={handleCalculate}>Calculate</button>
          <button style={{ marginBottom: '1%' }} onClick={handleClear}>Clear All</button>
          <button onClick={() => setVisualizations(!visualizations)}>{visualizations ? "Hide Visualizations" : 'Show Visualizations'}</button>
        </div>

        {
          visualizations && (
            <div className="visualizations">
              <div className="graphs">
                <div className="graph">
                  <h3>Profit vs. Selling Price</h3>
                  <Bar data={profitData} />
                </div>
                <div className="graph">
                  <h3>Markup % vs. Cost Price</h3>
                  <Bar data={markupData} />
                </div>
                <div className="graph">
                  <h3>Gross Profit % vs. Selling Price</h3>
                  <Bar data={grossProfitData} />
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}

export default App;
