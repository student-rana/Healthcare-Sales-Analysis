from flask import Flask, render_template, request
from data import (
    get_dashboard_stats,
    get_recent_orders,
    get_clients,
    get_sales_performance_data,
    get_region_analysis_data,
    get_product_analysis_data,
    get_hospital_analysis_data,
    get_operational_analysis_data,
    get_profit_analysis_data,
    get_reports_insights_data
)

app = Flask(__name__)


# ---------------- Dashboard ---------------- #

@app.route('/')
def dashboard():
    try:
        stats = get_dashboard_stats()
        orders = get_recent_orders()
        clients = get_clients()

        return render_template(
            'dashboard.html',
            stats=stats,
            orders=orders,
            clients=clients
        )

    except Exception as e:
        return f"Dashboard Error: {str(e)}"


# ---------------- Hospital Analysis ---------------- #

@app.route('/hospital-analysis')
def hospital_analysis():
    try:
        data = get_hospital_analysis_data()
        return render_template('hospital_analysis.html', data=data)

    except Exception as e:
        return f"Hospital Analysis Error: {str(e)}"


# ---------------- Sales Performance ---------------- #

@app.route('/sales-performance')
def sales_performance():
    try:
        data = get_sales_performance_data()
        return render_template('sales_performance.html', data=data)

    except Exception as e:
        return f"Sales Performance Error: {str(e)}"


# ---------------- Region Analysis ---------------- #

@app.route('/region-analysis')
def region_analysis():
    try:
        data = get_region_analysis_data()
        return render_template('region_analysis.html', data=data)

    except Exception as e:
        return f"Region Analysis Error: {str(e)}"


# ---------------- Product Analysis ---------------- #

@app.route('/product-analysis')
def product_analysis():
    try:
        data = get_product_analysis_data()
        return render_template('product_analysis.html', data=data)

    except Exception as e:
        return f"Product Analysis Error: {str(e)}"


# ---------------- Operational Analysis ---------------- #

@app.route('/operational-analysis')
def operational_analysis():
    try:
        data = get_operational_analysis_data()
        return render_template('operational_analysis.html', data=data)

    except Exception as e:
        return f"Operational Analysis Error: {str(e)}"


# ---------------- Profit Analysis ---------------- #

@app.route('/profit-analysis')
def profit_analysis():
    try:
        data = get_profit_analysis_data()
        return render_template('profit_analysis.html', data=data)

    except Exception as e:
        return f"Profit Analysis Error: {str(e)}"


# ---------------- Team ---------------- #

@app.route('/team')
def team():

    role_filter = request.args.get('role', 'All')

    all_members = [
        {
            "id": 1,
            "name": "Ananya Sharma",
            "role": "Sales Director",
            "email": "ananya.sharma@healthsales.com",
            "phone": "+91 98765 12340"
        },
        {
            "id": 2,
            "name": "Rahul Mehta",
            "role": "Account Executive",
            "email": "rahul.mehta@healthsales.com",
            "phone": "+91 98765 23451"
        },
        {
            "id": 3,
            "name": "Priya Nair",
            "role": "Product Specialist",
            "email": "priya.nair@healthsales.com",
            "phone": "+91 98765 34562"
        },
        {
            "id": 4,
            "name": "Arjun Reddy",
            "role": "Account Executive",
            "email": "arjun.reddy@healthsales.com",
            "phone": "+91 98765 45673"
        },
        {
            "id": 5,
            "name": "Neha Iyer",
            "role": "Customer Success",
            "email": "neha.iyer@healthsales.com",
            "phone": "+91 98765 56784"
        }
    ]

    if role_filter != 'All':
        members = [m for m in all_members if m['role'] == role_filter]
    else:
        members = all_members

    return render_template(
        'team.html',
        members=members,
        current_filter=role_filter
    )


# ---------------- Settings ---------------- #

@app.route('/settings')
def settings():

    tab = request.args.get('tab', 'Profile Details')

    return render_template(
        'settings.html',
        active_tab=tab
    )


# ---------------- Reports & Insights ---------------- #

@app.route('/reports-insights')
def reports_insights():
    try:
        data = get_reports_insights_data()

        return render_template(
            'reports_insights.html',
            data=data
        )

    except Exception as e:
        return f"Reports Error: {str(e)}"


# ---------------- Power BI ---------------- #

@app.route('/power-bi')
def power_bi():
    return render_template('powerbi.html')


# ---------------- Run App ---------------- #

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)