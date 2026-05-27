import json
import time
import urllib.request
from urllib.parse import urlencode

CMS_HOSPITAL_API = "https://data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0"
_cms_cache = {"expires_at": 0, "payload": None}

fallback_cms_hospitals = [
    {
        "facility_id": "010001",
        "facility_name": "SOUTHEAST HEALTH MEDICAL CENTER",
        "address": "1108 ROSS CLARK CIRCLE",
        "citytown": "DOTHAN",
        "state": "AL",
        "zip_code": "36301",
        "telephone_number": "(334) 793-8701",
        "hospital_type": "Acute Care Hospitals",
        "hospital_ownership": "Government - Hospital District or Authority",
        "emergency_services": "Yes",
        "hospital_overall_rating": "4",
        "count_of_facility_safety_measures": "7",
        "count_of_safety_measures_better": "3",
    },
    {
        "facility_id": "010005",
        "facility_name": "MARSHALL MEDICAL CENTERS",
        "address": "2505 U S HIGHWAY 431 NORTH",
        "citytown": "BOAZ",
        "state": "AL",
        "zip_code": "35957",
        "telephone_number": "(256) 593-8310",
        "hospital_type": "Acute Care Hospitals",
        "hospital_ownership": "Government - Hospital District or Authority",
        "emergency_services": "Yes",
        "hospital_overall_rating": "3",
        "count_of_facility_safety_measures": "7",
        "count_of_safety_measures_better": "0",
    },
    {
        "facility_id": "010006",
        "facility_name": "NORTH ALABAMA MEDICAL CENTER",
        "address": "1701 VETERANS DRIVE",
        "citytown": "FLORENCE",
        "state": "AL",
        "zip_code": "35630",
        "telephone_number": "(256) 768-8400",
        "hospital_type": "Acute Care Hospitals",
        "hospital_ownership": "Proprietary",
        "emergency_services": "Yes",
        "hospital_overall_rating": "2",
        "count_of_facility_safety_measures": "8",
        "count_of_safety_measures_better": "4",
    },
]

punjab_hospitals = [
    {
        "id": "PB-001",
        "name": "Dayanand Medical College & Hospital",
        "location": "Ludhiana, Punjab",
        "address": "Civil Lines, Ludhiana, Punjab",
        "phone": "Not available",
        "type": "Medical College & Tertiary Care Hospital",
        "ownership": "Charitable Trust / Private",
        "emergency": "Yes",
        "rating": 4,
        "rating_pct": 80,
        "status": "Platinum",
        "safety_measures": 8,
        "safety_better": 3,
    },
    {
        "id": "PB-002",
        "name": "Christian Medical College & Hospital",
        "location": "Ludhiana, Punjab",
        "address": "Brown Road, Ludhiana, Punjab",
        "phone": "Not available",
        "type": "Medical College & Multi-specialty Hospital",
        "ownership": "Charitable Trust",
        "emergency": "Yes",
        "rating": 4,
        "rating_pct": 80,
        "status": "Platinum",
        "safety_measures": 8,
        "safety_better": 3,
    },
    {
        "id": "PB-003",
        "name": "Fortis Hospital Mohali",
        "location": "Mohali, Punjab",
        "address": "Sector 62, Mohali, Punjab",
        "phone": "Not available",
        "type": "Multi-specialty Hospital",
        "ownership": "Private",
        "emergency": "Yes",
        "rating": 4,
        "rating_pct": 80,
        "status": "Platinum",
        "safety_measures": 7,
        "safety_better": 2,
    },
    {
        "id": "PB-004",
        "name": "Max Super Speciality Hospital Mohali",
        "location": "Mohali, Punjab",
        "address": "Phase 6, Mohali, Punjab",
        "phone": "Not available",
        "type": "Super-specialty Hospital",
        "ownership": "Private",
        "emergency": "Yes",
        "rating": 4,
        "rating_pct": 80,
        "status": "Platinum",
        "safety_measures": 7,
        "safety_better": 2,
    },
    {
        "id": "PB-005",
        "name": "Government Medical College Amritsar",
        "location": "Amritsar, Punjab",
        "address": "Circular Road, Amritsar, Punjab",
        "phone": "Not available",
        "type": "Government Medical College Hospital",
        "ownership": "Government",
        "emergency": "Yes",
        "rating": 3,
        "rating_pct": 60,
        "status": "Gold",
        "safety_measures": 6,
        "safety_better": 1,
    },
    {
        "id": "PB-006",
        "name": "Guru Gobind Singh Medical College & Hospital",
        "location": "Faridkot, Punjab",
        "address": "Sadiq Road, Faridkot, Punjab",
        "phone": "Not available",
        "type": "Government Medical College Hospital",
        "ownership": "Government",
        "emergency": "Yes",
        "rating": 3,
        "rating_pct": 60,
        "status": "Gold",
        "safety_measures": 6,
        "safety_better": 1,
    },
    {
        "id": "PB-007",
        "name": "Amandeep Hospital",
        "location": "Amritsar, Punjab",
        "address": "Model Town, Amritsar, Punjab",
        "phone": "Not available",
        "type": "Multi-specialty Hospital",
        "ownership": "Private",
        "emergency": "Yes",
        "rating": 3,
        "rating_pct": 60,
        "status": "Gold",
        "safety_measures": 6,
        "safety_better": 1,
    },
    {
        "id": "PB-008",
        "name": "SPS Hospitals",
        "location": "Ludhiana, Punjab",
        "address": "Sherpur Chowk, Ludhiana, Punjab",
        "phone": "Not available",
        "type": "Multi-specialty Hospital",
        "ownership": "Private",
        "emergency": "Yes",
        "rating": 3,
        "rating_pct": 60,
        "status": "Gold",
        "safety_measures": 6,
        "safety_better": 1,
    },
]

def _fetch_cms_hospital_payload(limit=25):
    now = time.time()
    if _cms_cache["payload"] and _cms_cache["expires_at"] > now:
        cached = dict(_cms_cache["payload"])
        cached["results"] = cached.get("results", [])[:limit]
        return cached

    query = urlencode({"limit": limit})
    try:
        with urllib.request.urlopen(f"{CMS_HOSPITAL_API}?{query}", timeout=5) as response:
            payload = json.loads(response.read().decode("utf-8"))
            _cms_cache["payload"] = payload
            _cms_cache["expires_at"] = now + 600
            return payload
    except Exception:
        return {"results": fallback_cms_hospitals, "count": len(fallback_cms_hospitals), "source": "fallback"}

def _safe_int(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default

def _rating_status(rating):
    if rating >= 4:
        return "Platinum"
    if rating == 3:
        return "Gold"
    return "Silver"

def _format_hospital(row):
    rating = _safe_int(row.get("hospital_overall_rating"))
    safety_measures = _safe_int(row.get("count_of_facility_safety_measures"))
    safety_better = _safe_int(row.get("count_of_safety_measures_better"))
    return {
        "id": row.get("facility_id", ""),
        "name": row.get("facility_name", "Unknown Facility").title(),
        "location": f"{row.get('citytown', '').title()}, {row.get('state', '')}",
        "address": f"{row.get('address', '').title()}, {row.get('citytown', '').title()}, {row.get('state', '')} {row.get('zip_code', '')}",
        "phone": row.get("telephone_number", "Not available"),
        "type": row.get("hospital_type", "Not available"),
        "ownership": row.get("hospital_ownership", "Not available"),
        "emergency": row.get("emergency_services", "Not available"),
        "rating": rating if rating else "Not rated",
        "rating_pct": rating * 20 if rating else 0,
        "status": _rating_status(rating),
        "safety_measures": safety_measures,
        "safety_better": safety_better,
    }

dashboard_stats = [
    { 'title': 'Total Revenue', 'value': '$245,600', 'trend': '+12.5%', 'isPositive': True },
    { 'title': 'New Contracts', 'value': '45', 'trend': '+8.2%', 'isPositive': True },
    { 'title': 'Active Hospitals', 'value': '1,240', 'trend': '+2.4%', 'isPositive': True },
    { 'title': 'Churn Rate', 'value': '1.2%', 'trend': '-0.4%', 'isPositive': False }
]

recent_orders = [
    { 'id': 'ORD-001', 'hospital': 'General Hospital', 'product': 'MRI Machine', 'date': '2026-04-20', 'status': 'Delivered', 'amount': '$150,000' },
    { 'id': 'ORD-002', 'hospital': 'City Clinic', 'product': 'Defibrillator Kit', 'date': '2026-04-21', 'status': 'Processing', 'amount': '$12,500' },
    { 'id': 'ORD-003', 'hospital': 'St. Jude Medical', 'product': 'X-Ray System', 'date': '2026-04-22', 'status': 'Pending', 'amount': '$85,000' },
    { 'id': 'ORD-004', 'hospital': 'Mercy Care', 'product': 'Ultrasound Scanner', 'date': '2026-04-22', 'status': 'Processing', 'amount': '$45,000' }
]

clients = [
    { 
        'id': 1, 
        'name': 'General Hospital', 
        'location': 'New York, NY', 
        'contact': 'Dr. Smith',
        'email': 'admin@generalhospital.ny',
        'established': 1985,
        'totalOrders': 142,
        'revenue': '$2.4M',
        'status': 'Active Partner',
        'description': 'A leading tertiary care hospital in downtown New York, specializing in cardiology and neurology. They have been a partner since 2018.'
    },
    { 
        'id': 2, 
        'name': 'City Clinic', 
        'location': 'Chicago, IL', 
        'contact': 'Jane Doe',
        'email': 'purchasing@cityclinic.il',
        'established': 2002,
        'totalOrders': 56,
        'revenue': '$850K',
        'status': 'Active Partner',
        'description': 'A growing network of outpatient clinics providing primary care and specialized diagnostics across the Chicago metropolitan area.'
    },
    { 
        'id': 3, 
        'name': 'St. Jude Medical', 
        'location': 'Los Angeles, CA', 
        'contact': 'Dr. Brown',
        'email': 'procurement@stjude.ca',
        'established': 1990,
        'totalOrders': 89,
        'revenue': '$1.2M',
        'status': 'Active Partner',
        'description': 'A premium healthcare facility renowned for its advanced surgical units and pediatric care centers in Southern California.'
    }
]

def get_dashboard_stats():
    hospitals = punjab_hospitals
    total_hospitals = len(hospitals)
    rated = [h["rating"] for h in hospitals if isinstance(h["rating"], int)]
    avg_rating = round(sum(rated) / len(rated), 1) if rated else "N/A"
    emergency_count = sum(1 for h in hospitals if h["emergency"] == "Yes")
    return [
        {"title": "Punjab Hospitals", "value": f"{total_hospitals:,}", "trend": "Punjab facility records", "isPositive": True},
        {"title": "Sampled Facilities", "value": str(len(hospitals)), "trend": "Loaded from Punjab data", "isPositive": True},
        {"title": "Avg Hospital Rating", "value": str(avg_rating), "trend": "Out of 5 stars", "isPositive": True},
        {"title": "Emergency Services", "value": str(emergency_count), "trend": "In current sample", "isPositive": True}
    ]

def get_recent_orders():
    return [
        {
            "id": hospital["id"],
            "hospital": hospital["name"],
            "product": hospital["type"],
            "date": hospital["location"],
            "status": hospital["status"],
            "amount": f"{hospital['rating']}/5" if isinstance(hospital["rating"], int) else "Not rated"
        }
        for hospital in punjab_hospitals[:5]
    ]

def get_clients():
    return [
        {
            "id": idx + 1,
            "name": hospital["name"],
            "location": hospital["location"],
            "contact": hospital["type"],
            "email": "Public CMS record",
            "established": "N/A",
            "totalOrders": hospital["safety_measures"],
            "revenue": f"{hospital['rating']}/5" if isinstance(hospital["rating"], int) else "Not rated",
            "status": f"{hospital['status']} CMS Rating",
            "description": f"{hospital['ownership']} facility at {hospital['address']}. Emergency services: {hospital['emergency']}. Phone: {hospital['phone']}."
        }
        for idx, hospital in enumerate(punjab_hospitals[:5])
    ]

def update_client(client_id, updated_data):
    for idx, client in enumerate(clients):
        if client['id'] == int(client_id):
            # Only update keys that exist in the original client dict
            for k, v in updated_data.items():
                if k in clients[idx]:
                    clients[idx][k] = v
            return clients[idx]
    return None

def get_sales_performance_data():
    return {
        "kpis": [
            {"title": "Gross Sales", "value": "$1.2M", "trend": "+15.4%", "isPositive": True},
            {"title": "Net Profit", "value": "$450K", "trend": "+12.1%", "isPositive": True},
            {"title": "Avg Order Value", "value": "$12,450", "trend": "-2.3%", "isPositive": False},
            {"title": "Conversion Rate", "value": "3.8%", "trend": "+0.5%", "isPositive": True}
        ],
        "monthly_trend": [
            {"month": "Jan", "sales": 85000, "profit": 32000},
            {"month": "Feb", "sales": 92000, "profit": 35000},
            {"month": "Mar", "sales": 78000, "profit": 28000},
            {"month": "Apr", "sales": 105000, "profit": 42000},
            {"month": "May", "sales": 115000, "profit": 48000},
            {"month": "Jun", "sales": 125000, "profit": 52000}
        ],
        "sales_vs_profit": [
            {"name": "Medical Imaging", "sales": 450000, "profit": 180000},
            {"name": "Surgical Tools", "sales": 320000, "profit": 110000},
            {"name": "Patient Monitoring", "sales": 280000, "profit": 95000},
            {"name": "Diagnostics", "sales": 150000, "profit": 65000}
        ]
    }

def get_region_analysis_data():
    return {
        "regions": [
            {"name": "Ludhiana", "sales": 520000, "profit": 208000, "growth": "+12.4%"},
            {"name": "Mohali", "sales": 460000, "profit": 184000, "growth": "+15.8%"},
            {"name": "Amritsar", "sales": 310000, "profit": 108500, "growth": "+8.2%"},
            {"name": "Faridkot", "sales": 180000, "profit": 54000, "growth": "+5.4%"},
            {"name": "Jalandhar", "sales": 150000, "profit": 42000, "growth": "-2.1%"}
        ],
        "kpis": [
            {"title": "Top District", "value": "Ludhiana", "detail": "32% of Punjab sales"},
            {"title": "Highest Growth", "value": "Mohali", "detail": "15.8% YoY growth"},
            {"title": "Punjab Profit Margin", "value": "37.4%", "detail": "+2.1% from Q1"}
        ]
    }

def get_product_analysis_data():
    return {
        "categories": {
            "medicines": {"sales": 850000, "profit": 340000, "margin": "40%"},
            "equipment": {"sales": 1200000, "profit": 420000, "margin": "35%"}
        },
        "top_products": [
            {"name": "MRI Machine X1", "category": "Equipment", "sales": 450000, "profit": 135000, "margin": "30%"},
            {"name": "Surgical Robotics Unit", "category": "Equipment", "sales": 380000, "profit": 114000, "margin": "30%"},
            {"name": "Advanced Insulin Kit", "category": "Medicines", "sales": 250000, "profit": 125000, "margin": "50%"},
            {"name": "Ventilator Pro", "category": "Equipment", "sales": 220000, "profit": 77000, "margin": "35%"},
            {"name": "Oncology Meds - Pack A", "category": "Medicines", "sales": 180000, "profit": 99000, "margin": "55%"}
        ],
        "kpis": [
            {"title": "Highest Margin", "value": "Medicines", "detail": "40% avg margin"},
            {"title": "Top Seller", "value": "Equipment", "detail": "$1.2M total sales"},
            {"title": "Inventory Value", "value": "$4.5M", "detail": "Across 12 warehouses"}
        ]
    }

def get_hospital_analysis_data():
    hospitals = punjab_hospitals
    rated = [h["rating"] for h in hospitals if isinstance(h["rating"], int)]
    emergency_count = sum(1 for h in hospitals if h["emergency"] == "Yes")
    avg_rating = round(sum(rated) / len(rated), 1) if rated else "N/A"

    return {
        "hospitals": hospitals,
        "source": "Punjab hospital directory data",
        "kpis": [
            {"title": "Punjab Hospitals", "value": str(len(hospitals)), "detail": "Punjab facility records"},
            {"title": "Avg Hospital Rating", "value": str(avg_rating), "detail": "Current sample, out of 5"},
            {"title": "Emergency Services", "value": str(emergency_count), "detail": "Facilities marked Yes"}
        ]
    }

def get_operational_analysis_data():
    return {
        "departments": [
            {"name": "Cardiology", "patients": 1240, "avg_cost": "$4,500", "performance": 94},
            {"name": "Neurology", "patients": 850, "avg_cost": "$6,200", "performance": 88},
            {"name": "Oncology", "patients": 620, "avg_cost": "$12,800", "performance": 96},
            {"name": "Pediatrics", "patients": 2100, "avg_cost": "$1,200", "performance": 92},
            {"name": "Emergency", "patients": 4500, "avg_cost": "$2,800", "performance": 85}
        ],
        "kpis": [
            {
                "title": "Total Patients",
                "value": "9,310",
                "detail": "+12% YoY",
                "breakdown": [
                    {"label": "Cardiology", "value": "1,240", "pct": 13},
                    {"label": "Neurology", "value": "850", "pct": 9},
                    {"label": "Oncology", "value": "620", "pct": 7},
                    {"label": "Pediatrics", "value": "2,100", "pct": 23},
                    {"label": "Emergency", "value": "4,500", "pct": 48}
                ],
                "trend_data": [720, 810, 750, 940, 1050, 1180],
                "trend_labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                "insight": "Emergency and Pediatrics account for 71% of total patient volume. Cardiology grew 18% this quarter."
            },
            {
                "title": "Avg Treatment Cost",
                "value": "$5,450",
                "detail": "-3.2% optimization",
                "breakdown": [
                    {"label": "Cardiology", "value": "$4,500", "pct": 35},
                    {"label": "Neurology", "value": "$6,200", "pct": 48},
                    {"label": "Oncology", "value": "$12,800", "pct": 100},
                    {"label": "Pediatrics", "value": "$1,200", "pct": 9},
                    {"label": "Emergency", "value": "$2,800", "pct": 22}
                ],
                "trend_data": [5800, 5720, 5650, 5580, 5500, 5450],
                "trend_labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                "insight": "Costs declining steadily due to optimized supply chains. Oncology remains highest at $12,800 per case."
            },
            {
                "title": "Operational Score",
                "value": "91/100",
                "detail": "Based on throughput",
                "breakdown": [
                    {"label": "Cardiology", "value": "94%", "pct": 94},
                    {"label": "Neurology", "value": "88%", "pct": 88},
                    {"label": "Oncology", "value": "96%", "pct": 96},
                    {"label": "Pediatrics", "value": "92%", "pct": 92},
                    {"label": "Emergency", "value": "85%", "pct": 85}
                ],
                "trend_data": [86, 87, 88, 89, 90, 91],
                "trend_labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                "insight": "Consistent monthly improvement. Emergency dept at 85% — staffing increase planned to boost throughput."
            }
        ],
        "monthly_patients": [
            {"month": "Jan", "count": 720},
            {"month": "Feb", "count": 810},
            {"month": "Mar", "count": 750},
            {"month": "Apr", "count": 940},
            {"month": "May", "count": 1050},
            {"month": "Jun", "count": 1180}
        ]
    }

def get_profit_analysis_data():
    return {
        "profit_trend": [
            {"month": "Jan", "profit": 32000},
            {"month": "Feb", "profit": 35000},
            {"month": "Mar", "profit": 28000},
            {"month": "Apr", "profit": 42000},
            {"month": "May", "profit": 48000},
            {"month": "Jun", "profit": 52000}
        ],
        "loss_making_products": [
            {"name": "Legacy Thermometer X", "loss": "-$1,200", "reason": "High storage cost"},
            {"name": "Generic Bandage Bulk", "loss": "-$450", "reason": "Overstocked"},
            {"name": "Old Gen Stethoscope", "loss": "-$800", "reason": "Low demand"}
        ],
        "kpis": [
            {"title": "Net Profit", "value": "$237,000", "detail": "+15.4% vs last period"},
            {"title": "Profit Margin", "value": "38.5%", "detail": "Target: 40%"},
            {"title": "Cost Efficiency", "value": "92%", "detail": "+2% improvement"}
        ],
        "kpi_details": {
            "Net Profit": {
                "title": "Net Profit Breakdown",
                "summary": "Net profit increased by $31,600 this period, supported by higher pharmaceutical sales and better inventory rotation.",
                "items": ["Revenue lift: +18.2%", "Operating costs: -4.1%", "Loss-making products impact: -$2,450"]
            },
            "Profit Margin": {
                "title": "Profit Margin Status",
                "summary": "Current margin is 38.5%, slightly below the 40% target. The fastest gain is reducing legacy equipment cost leakage.",
                "items": ["Current margin: 38.5%", "Target gap: 1.5%", "High-margin category: pharmaceuticals"]
            },
            "Cost Efficiency": {
                "title": "Cost Efficiency Drivers",
                "summary": "Cost efficiency improved to 92% due to better supplier pricing and reduced overstock, with more savings still available.",
                "items": ["Supplier savings: +3.4%", "Inventory waste: -2.8%", "Logistics efficiency: +1.6%"]
            }
        }
    }

def get_reports_insights_data():
    return {
        "key_insights": [
            {"title": "High Margin Opportunity", "desc": "Medicines in APAC region show 55% margin, 15% above global average.", "action": "Increase medicine inventory allocation in APAC and prioritize premium hospital accounts."},
            {"title": "Cost Leakage", "desc": "Legacy equipment in North America is incurring 12% higher maintenance costs.", "action": "Review maintenance contracts and reduce low-margin legacy equipment exposure."},
            {"title": "Growth Driver", "desc": "Cardiology department expansion led to 22% revenue increase in Platinum facilities.", "action": "Replicate cardiology-focused sales bundles across other Platinum facilities."}
        ],
        "available_reports": [
            {"name": "Global Sales Summary Q1", "type": "PDF", "date": "2026-04-01"},
            {"name": "Regional Profitability Detail", "type": "Excel", "date": "2026-04-15"},
            {"name": "Operational Efficiency Audit", "type": "CSV", "date": "2026-04-20"}
        ]
    }
