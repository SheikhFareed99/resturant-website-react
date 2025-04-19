import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layout2';
import './DailySalesReport.css';

function SalesReportPage() {
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:3000/api/v2/report', {
                params: {
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate
                }
            });
            setReport(response.data);
        } catch (err) {
            console.error('Error fetching sales report:', err);
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PKR'
        }).format(amount);
    };

    return (
        <Layout>
            <div className="sales-report-container">
                <h1>Sales Report</h1>
                
                {/* Date Range Filter Form */}
                <div className="filter-section">
                    <h2>Generate Report</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={dateRange.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>End Date:</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={dateRange.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate Report'}
                        </button>
                    </form>
                </div>

                {/* Error Message */}
                {error && <div className="error-message">{error}</div>}

                {/* Summary Section */}
                {report && (
                    <div className="summary-section">
                        <h2>Sales Summary</h2>
                        <div className="summary-cards">
                            <div className="summary-card">
                                <h3>Total Sales</h3>
                                <p>{formatCurrency(report.summary.totalSales)}</p>
                            </div>
                            <div className="summary-card">
                                <h3>Total Discount</h3>
                                <p>{formatCurrency(report.summary.totalDiscount)}</p>
                            </div>
                            <div className="summary-card">
                                <h3>Total Tax</h3>
                                <p>{formatCurrency(report.summary.totalTax)}</p>
                            </div>
                            <div className="summary-card">
                                <h3>Grand Total</h3>
                                <p>{formatCurrency(report.summary.grandTotal)}</p>
                            </div>
                        </div>

                        <div className="summary-details">
                            <div className="payment-methods">
                                <h3>Payment Methods</h3>
                                <ul>
                                    {Object.entries(report.summary.paymentMethods).map(([method, count]) => (
                                        <li key={method}>
                                            <span>{method}:</span> 
                                            <span>{count} transactions</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="order-types">
                                <h3>Order Types</h3>
                                <ul>
                                    {Object.entries(report.summary.orderTypes).map(([type, count]) => (
                                        <li key={type}>
                                            <span>{type}:</span> 
                                            <span>{count} orders</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sales Details Table */}
                {report && report.sales.length > 0 && (
                    <div className="sales-details">
                        <h2>Detailed Sales</h2>
                        <table className="sales-table">
                            <thead>
                                <tr>
                                    <th>Invoice ID</th>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Discount</th>
                                    <th>Tax</th>
                                    <th>Net</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.sales.map(sale => (
                                    <tr key={sale.InvoiceID}>
                                        <td>{sale.InvoiceID}</td>
                                        <td>{sale.OrderID}</td>
                                        <td>{new Date(sale.OrderDate).toLocaleDateString()}</td>
                                        <td>{sale.CustomerName || 'Guest'}</td>
                                        <td>{sale.OrderType}</td>
                                        <td>{formatCurrency(sale.TotalAmount)}</td>
                                        <td>{formatCurrency(sale.DiscountApplied)}</td>
                                        <td>{formatCurrency(sale.TaxAmount)} ({sale.Tax}%)</td>
                                        <td>{formatCurrency(sale.NetAmount)}</td>
                                        <td>{sale.PaymentMethod}</td>
                                        <td>
                                            <span className={`status-badge ${sale.PaidStatus.toLowerCase()}`}>
                                                {sale.PaidStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {report && report.sales.length === 0 && (
                    <p className="no-data">No sales found for the selected date range</p>
                )}
            </div>
        </Layout>
    );
}

export default SalesReportPage;