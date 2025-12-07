import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 55 },
  { name: 'Mar', value: 86 }, // Current
  { name: 'Apr', value: 95 }, // Forecast
  { name: 'May', value: 110 }, // Forecast
];

const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-[#18181b] border border-zinc-800/60 rounded-2xl p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-zinc-400 text-sm font-medium mb-1">Revenue Forecast (Q1-Q2)</h3>
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-white">86%</span>
          <span className="text-xs font-medium text-green-500 mb-1.5">+15% vs Target</span>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#71717a', fontSize: 12 }} 
              dy={10}
            />
            <Tooltip 
              cursor={{ fill: '#27272a' }}
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index > 2 ? '#3b82f6' : index === 2 ? '#ffffff' : '#3f3f46'} 
                  className="hover:opacity-80 transition-opacity"
                  fillOpacity={index > 2 ? 0.5 : 1} // Lower opacity for forecast
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-4 text-xs text-zinc-500 font-medium">
         <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-zinc-600"></div> Actual
         </div>
         <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-white"></div> Current
         </div>
         <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-blue-500/50"></div> Forecast
         </div>
      </div>
    </div>
  );
};

export default PerformanceChart;