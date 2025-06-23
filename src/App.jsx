import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const computeZ = (theta) => {
  const u1 = [1 / Math.sqrt(2), -1 / Math.sqrt(2), 0];
  const u2 = [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)];
  const x = Math.cos(theta);
  const y = Math.sin(theta);
  const z = [
    x * u1[0] + y * u2[0],
    x * u1[1] + y * u2[1],
    x * u1[2] + y * u2[2],
  ];
  return z;
};

export default function App() {
  const [theta, setTheta] = useState(0);
  const z = computeZ(theta);

  const handleThetaChange = (e) => {
    setTheta(parseFloat(e.target.value));
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', marginBottom: '24px' }}>
        Visualizing 3-Point Time Series Shapes in Z-score Space
      </h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
        <div style={{ flex: 1 }}>
          <Plot
            data={[
              {
                x: [Math.cos(theta)],
                y: [Math.sin(theta)],
                mode: 'markers',
                type: 'scatter',
                marker: { color: 'red', size: 15 },
                name: 'Current θ'
              },
              {
                x: Array.from({ length: 200 }, (_, i) => Math.cos(i * 2 * Math.PI / 200)),
                y: Array.from({ length: 200 }, (_, i) => Math.sin(i * 2 * Math.PI / 200)),
                mode: 'lines',
                type: 'scatter',
                line: { dash: 'dash', color: 'gray' },
                name: 'Unit Circle'
              }
            ]}
            layout={{
              title: `Shape Circle (θ = ${theta.toFixed(2)} rad)`,
              xaxis: { range: [-1.2, 1.2], zeroline: true, scaleanchor: 'y', scaleratio: 1 },
              yaxis: { range: [-1.2, 1.2], zeroline: true },
              height: 500,
              margin: { t: 40, l: 50, r: 20, b: 50 }
            }}
          />
          <input
            type="range"
            min="0"
            max={2 * Math.PI}
            step="0.01"
            value={theta}
            onChange={handleThetaChange}
            style={{ width: '100%', marginTop: '16px' }}
          />
          <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '0.95rem' }}>
            θ = {theta.toFixed(2)} radians
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Plot
            data={[
              {
                x: [0, 1, 2],
                y: z,
                mode: 'lines+markers',
                type: 'scatter',
                marker: { color: 'red' },
                name: 'Z-scored series'
              }
            ]}
            layout={{
              title: 'Reconstructed Time Series from θ',
              xaxis: { title: 'Time Point', dtick: 1 },
              yaxis: { title: 'Z-score', range: [-2, 2] },
              autosize: true,
              height: 500,
              margin: { t: 40, l: 50, r: 20, b: 50 }
            }}
          />
        </div>
      </div>
    </div>
  );
}

