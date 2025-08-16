// src/components/SkillsHeatmap.jsx
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SkillsHeatmap({ skills = [] }) {
  // skills: array of strings. We'll map to pseudo scores based on familiarity (random/placeholder)
  const labels = skills;
  const data = {
    labels,
    datasets: [
      {
        label: 'Proficiency',
        data: skills.map((s, i) => 6 + ((i * 3) % 4)), // placeholder scoring (6-9)
        backgroundColor: 'rgba(100,255,218,0.15)',
        borderColor: 'rgba(100,255,218,0.9)',
        pointBackgroundColor: 'rgba(100,255,218,1)',
        pointBorderColor: '#fff',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.05)' },
        grid: { color: 'rgba(255,255,255,0.03)' },
        suggestedMin: 0,
        suggestedMax: 12,
        ticks: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  };

  return (
    <section className="py-16 px-8 md:px-20 bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
      <div style={{ maxWidth: 680, margin: '0 auto', height: 360 }}>
        <Radar data={data} options={options} />
      </div>
    </section>
  );
}
