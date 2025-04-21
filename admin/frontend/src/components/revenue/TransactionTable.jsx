import React from 'react';

function TransactionTable({ revenues, loading, formatDate }) {
return (
    <div className="border p-4 rounded-xl mb-4 bg-white dark:bg-darkmode-components shadow-md">
    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-lightmode">
        Transaction Details
    </h2>

    {/* Scrollable table wrapper */}
    <div className="overflow-x-auto max-h-[400px] overflow-y-auto rounded-lg">
        <table className="min-w-full text-sm">
        <thead className="bg-gray-100 dark:bg-darkmode-hover dark:text-gray-300 sticky top-0 z-10">
            <tr>
            <th className="p-3 text-left font-semibold">Table</th>
            <th className="p-3 text-left font-semibold">Amount</th>
            <th className="p-3 text-left font-semibold">Date</th>
            <th className="p-3 text-left font-semibold">Status</th>
            </tr>
        </thead>
        <tbody>
            {revenues.map((rev, i) => (
            <tr key={i} className="border-t dark:text-lightmode hover:bg-gray-50 dark:hover:bg-darkmode-hover">
                <td className="p-3">{rev.tableName || 'Unknown'}</td>
                <td className="p-3 text-green-700 dark:text-green-200">
                ₹{(rev.total || 0).toFixed(2)}
                </td>
                <td className="p-3">{formatDate(rev.paymentDate)}</td>
                <td className="p-3">
                <span className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100 text-xs px-2 py-1 rounded-full">
                    Paid
                </span>
                </td>
            </tr>
            ))}
            {revenues.length === 0 && !loading && (
            <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500 dark:text-gray-400">
                No transactions found.
                </td>
            </tr>
            )}
            {loading && (
            <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500 dark:text-gray-400">
                Loading data...
                </td>
            </tr>
            )}
        </tbody>
        </table>
    </div>
    </div>
);
}

export default TransactionTable;
