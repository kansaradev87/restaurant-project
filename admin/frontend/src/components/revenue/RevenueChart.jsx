// RevenueChart.js
import React from 'react';
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function RevenueChart({ chartType, data, COLORS, formatXAxis, dataKey, name, isPieChart }) {
if (isPieChart) {
return (
    <ResponsiveContainer width="100%" height={300}>
    <PieChart>
        <Pie
        data={data.slice(0, 8)}
        cx="50%"
        cy="50%"
        outerRadius={80}
        dataKey="value"
        nameKey="name"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
        {data.slice(0, 8).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
    </PieChart>
    </ResponsiveContainer>
);
}

return (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" strokeOpacity={0.3} />
        <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#6366f1" strokeWidth={2} name={name} />
        </LineChart>
    </ResponsiveContainer>
);
}

export default RevenueChart;
