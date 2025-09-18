from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Allow requests from any origin (for development)
    allow_credentials=True,
    allow_methods=["*"],          # Allow all HTTP methods
    allow_headers=["*"],          # Allow all headers
)

# Load datasets globally
byproducts_df = pd.read_csv('indian_crops_byproducts_with_domains.csv')
companies_df = pd.read_csv('corrected_companies_with_district.csv')

class RecommendationRequest(BaseModel):
    crop_name: str
    district: str

@app.post("/recommendations")
def get_recommendations(request: RecommendationRequest):
    crop_name = request.crop_name.lower()
    district = request.district.lower()

    crop_data = byproducts_df[byproducts_df['Crop'].str.lower() == crop_name]
    if crop_data.empty:
        return {"error": f"No data available for crop: {crop_name}"}

    useful_domains = [d.strip() for d in crop_data.iloc[0]['Useful Domains'].split(',')]

    filtered_companies = companies_df[
        (companies_df['District'].str.lower() == district) &
        (companies_df['CompanyIndustrialClassification'].isin(useful_domains))
    ]

    top_companies = filtered_companies.head(10)

    recommendations = []
    for _, row in top_companies.iterrows():
        recommendations.append({
            "company_name": row['CompanyName'],
            "address": row['Registered_Office_Address'],
            "status": row['CompanyStatus'] if 'CompanyStatus' in row else "Unknown",
            "domain": row['CompanyIndustrialClassification'],
            "distance": row['Distance'] if 'Distance' in row else 80,
            "rating": row['StarRating'] if 'StarRating' in row else 4.5
        })

    if not recommendations:
        return {"message": f"No companies found in district {district} for crop {crop_name} by-products"}

    return {"recommendations": recommendations}
