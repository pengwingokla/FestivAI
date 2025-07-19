gcloud projects list
gcloud config set project festivai-466417

# FestivAI# Enable Vertex AI (for Gemini models)
gcloud services enable aiplatform.googleapis.com

# Enable Cloud Run (if you plan to deploy)
gcloud services enable run.googleapis.com

# Enable Cloud Build (for container builds)
gcloud services enable cloudbuild.googleapis.com

# Enable Container Registry
gcloud services enable containerregistry.googleapis.com