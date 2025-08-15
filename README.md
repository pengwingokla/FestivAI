# FestivAI

![architecture](frontend/public/uml-diagram.png)

## Overview

FestivAI leverages artificial intelligence to generate customized festival greetings, cards, and celebratory content. The application is built using Google Cloud services and provides a scalable solution for personalized content generation.

## Demo Video
Watch the complete demo and walkthrough of FestivAI:
[![FestivAI Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

## Architecture

The project utilizes several Google Cloud Platform services:

- **AI Platform**: For machine learning model deployment and inference
- **Cloud Run**: Serverless container deployment for scalable web services
- **Cloud Build**: Automated CI/CD pipeline for building and deploying applications
- **Container Registry**: Docker image storage and management

## Prerequisites

Before setting up the project, ensure you have:

- Google Cloud SDK installed and configured
- Docker installed (for containerized deployment)
- Python 3.8+ (if running locally)
- A Google Cloud Project with billing enabled

## Setup Instructions

### 1. Google Cloud Configuration

First, configure your Google Cloud environment:

```bash
# List available projects
gcloud projects list

# Set the project ID
gcloud config set project festivai-466417

# Enable required APIs
gcloud services enable aiplatform.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Authentication

Set up authentication for your local environment:

```bash
# Authenticate with Google Cloud
gcloud auth login

# Set up application default credentials
gcloud auth application-default login
```

### 3. Environment Setup

Create a virtual environment and install dependencies:

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Deployment

### Local Development

To run the application locally:

```bash
# Set environment variables
export GOOGLE_CLOUD_PROJECT=festivai-466417

# Run the application
python main.py
```

### Cloud Deployment

Deploy to Google Cloud Run:

```bash
# Build and deploy using Cloud Build
gcloud builds submit --tag gcr.io/festivai-466417/festivai

# Deploy to Cloud Run
gcloud run deploy festivai \
    --image gcr.io/festivai-466417/festivai \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated
```

## Features

- **AI-Powered Content Generation**: Create personalized festival greetings using advanced AI models
- **Multi-Format Support**: Generate content in various formats (text, images, cards)
- **Scalable Architecture**: Built on Google Cloud for automatic scaling
- **Real-time Processing**: Fast content generation and delivery
- **Customizable Templates**: Support for various festival themes and occasions

## API Endpoints

The application provides RESTful API endpoints for:

- `/generate` - Generate personalized festival content
- `/health` - Health check endpoint
- `/templates` - List available templates
- `/customize` - Customize existing templates

## Configuration

Key configuration parameters:

- `PROJECT_ID`: Google Cloud Project ID
- `REGION`: Deployment region (default: us-central1)
- `MODEL_NAME`: AI model identifier
- `MAX_CONTENT_LENGTH`: Maximum content length for generation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Variables

Required environment variables:

```env
GOOGLE_CLOUD_PROJECT=festivai-466417
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
MODEL_ENDPOINT=your-model-endpoint
API_KEY=your-api-key
```

## Monitoring and Logging

The application includes:

- Cloud Monitoring integration for performance metrics
- Cloud Logging for application logs
- Error tracking and alerting
- Custom metrics for content generation statistics

## Security

- All API endpoints are secured with authentication
- Data encryption in transit and at rest
- Regular security updates and vulnerability scanning
- Compliance with data protection regulations

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Ensure you're logged in: `gcloud auth login`
   - Check project configuration: `gcloud config get-value project`

2. **Deployment Failures**
   - Verify all required APIs are enabled
   - Check IAM permissions for Cloud Build and Cloud Run

3. **Model Errors**
   - Ensure AI Platform models are properly deployed
   - Check model endpoint configuration

## Support

For support and questions:

- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review Google Cloud documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Cloud Platform for infrastructure
- Open source AI
