import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layout2';
import './monthlyReport.css';

function MonthlyReportPage() {
    const [reportData, setReportData] = useState(null);
    const [formData, setFormData] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        electricityBill: '',
        maintenanceBill: '',
        salariesPaid: '' // Manual salary input
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/api/v2/monthly-report', formData);
            setReportData(response.data);
        } catch (err) {
            console.error('Error generating report:', err);
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount || 0);
    };

    return (
        <Layout>
            <div className="monthly-report-container">
                <h1>Monthly Financial Report</h1>
                
                <form onSubmit={handleSubmit} className="report-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Year:</label>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                required
                            >
                                {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Month:</label>
                            <select
                                name="month"
                                value={formData.month}
                                onChange={handleInputChange}
                                required
                            >
                                {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                                    <option key={month} value={month}>
                                        {new Date(0, month - 1).toLocaleString('default', {month: 'long'})}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Electricity Bill:</label>
                            <input
                                type="number"
                                name="electricityBill"
                                value={formData.electricityBill}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Maintenance Bill:</label>
                            <input
                                type="number"
                                name="maintenanceBill"
                                value={formData.maintenanceBill}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Salaries Paid:</label>
                            <input
                                type="number"
                                name="salariesPaid"
                                value={formData.salariesPaid}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="generate-btn" disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Report'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {reportData && (
                    <div className="report-results">
                        <h2>Financial Report for {reportData.reportPeriod}</h2>
                        
                        <div className="report-section">
                            <h3>Income</h3>
                            <div className="report-item">
                                <span>Total Sales:</span>
                                <span>{formatCurrency(reportData.totalSales)}</span>
                            </div>
                            <div className="report-item">
                                <span>Total Discounts:</span>
                                <span>-{formatCurrency(reportData.totalDiscounts)}</span>
                            </div>
                            <div className="report-item total-income">
                                <span>Net Income:</span>
                                <span>{formatCurrency(reportData.totalSales - reportData.totalDiscounts)}</span>
                            </div>
                        </div>
                        
                        <div className="report-section">
                            <h3>Expenses</h3>
                            <div className="report-item">
                                <span>Ingredient Costs:</span>
                                <span>{formatCurrency(reportData.ingredientCost)}</span>
                            </div>
                            <div className="report-item">
                                <span>Salaries Paid:</span>
                                <span>{formatCurrency(reportData.salariesPaid)}</span>
                            </div>
                            <div className="report-item">
                                <span>Electricity Bill:</span>
                                <span>{formatCurrency(reportData.electricityBill)}</span>
                            </div>
                            <div className="report-item">
                                <span>Maintenance Bill:</span>
                                <span>{formatCurrency(reportData.maintenanceBill)}</span>
                            </div>
                        </div>
                        
                        <div className="report-totals">
                            <div className="report-item total-expenses">
                                <span>Total Expenses:</span>
                                <span>{formatCurrency(reportData.totalExpenses)}</span>
                            </div>
                            <div className={`report-item net-profit ${reportData.netProfit >= 0 ? 'positive' : 'negative'}`}>
                                <span>Net {reportData.netProfit >= 0 ? 'Profit' : 'Loss'}:</span>
                                <span>{formatCurrency(Math.abs(reportData.netProfit))}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default MonthlyReportPage;