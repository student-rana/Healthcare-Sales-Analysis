from flask import Flask, render_template, request, redirect, url_for
from data import get_dashboard_stats, get_recent_orders, get_clients, update_client, get_sales_performance_data, get_region_analysis_data, get_product_analysis_data, get_hospital_analysis_data, get_operational_analysis_data, get_profit_analysis_data, get_reports_insights_data

app = Flask(__name__)

@app.route('/')
def dashboard():
    stats = get_dashboard_stats()
    orders = get_recent_orders()
    clients = get_clients()
    return render_template('dashboard.html', stats=stats, orders=orders, clients=clients)

@app.route('/hospital-analysis')
def hospital_analysis():
    data = get_hospital_analysis_data()
    return render_template('hospital_analysis.html', data=data)

@app.route('/sales-performance')
def sales_performance():
    data = get_sales_performance_data()
    return render_template('sales_performance.html', data=data)

@app.route('/region-analysis')
def region_analysis():
    data = get_region_analysis_data()
    return render_template('region_analysis.html', data=data)

@app.route('/product-analysis')
def product_analysis():
    data = get_product_analysis_data()
    return render_template('product_analysis.html', data=data)

@app.route('/operational-analysis')
def operational_analysis():
    data = get_operational_analysis_data()
    return render_template('operational_analysis.html', data=data)

@app.route('/profit-analysis')
def profit_analysis():
    data = get_profit_analysis_data()
    return render_template('profit_analysis.html', data=data)

@app.route('/team')
def team():
    role_filter = request.args.get('role', 'All')
    # Hardcoded team data for now
    all_members = [
        {"id": 1, "name": "Ananya Sharma", "role": "Sales Director", "email": "ananya.sharma@healthsales.com", "phone": "+91 98765 12340"},
        {"id": 2, "name": "Rahul Mehta", "role": "Account Executive", "email": "rahul.mehta@healthsales.com", "phone": "+91 98765 23451"},
        {"id": 3, "name": "Priya Nair", "role": "Product Specialist", "email": "priya.nair@healthsales.com", "phone": "+91 98765 34562"},
        {"id": 4, "name": "Arjun Reddy", "role": "Account Executive", "email": "arjun.reddy@healthsales.com", "phone": "+91 98765 45673"},
        {"id": 5, "name": "Neha Iyer", "role": "Customer Success", "email": "neha.iyer@healthsales.com", "phone": "+91 98765 56784"}
    ]
    
    if role_filter != 'All':
        members = [m for m in all_members if m['role'] == role_filter]
    else:
        members = all_members
        
    return render_template('team.html', members=members, current_filter=role_filter)

@app.route('/settings')
def settings():
    tab = request.args.get('tab', 'Profile Details')
    return render_template('settings.html', active_tab=tab)

@app.route('/reports-insights')
def reports_insights():
    data = get_reports_insights_data()
    return render_template('reports_insights.html', data=data)

@app.route('/power-bi')
def power_bi():
    return render_template('powerbi.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
