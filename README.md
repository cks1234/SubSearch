# CI/CD Deployment with HTTPS and Nginx Reverse Proxy

## Overview
This project deploys a full-stack application (React frontend + Flask backend) to AWS EC2 using Docker Compose and Nginx as a reverse proxy.  
GitHub Actions automates the pipeline so that any push to the `main` branch rebuilds and redeploys the application.  
The service is secured with HTTPS using Let’s Encrypt certificates.

## Stack
- AWS EC2 (Ubuntu)
- Docker & Docker Compose
- Nginx (reverse proxy + SSL termination)
- GitHub Actions (CI/CD)
- Let’s Encrypt (HTTPS)

## How It Works
1. **Reverse Proxy with Nginx**  
   - Nginx listens on ports 80/443.  
   - Routes `/api` requests to the Flask backend (port 5000).  
   - Routes other requests to the React frontend (port 3000).  
   - Handles HTTPS termination with Let’s Encrypt certificates.

2. **CI/CD with GitHub Actions**  
   - On push to `main`, GitHub Actions connects to EC2 via SSH.  
   - Pulls the latest code and runs `docker-compose up -d --build`.  
   - Containers are rebuilt and restarted automatically.  

3. **HTTPS Security**  
   - HTTP requests are redirected to HTTPS.  
   - Certificates are issued and renewed automatically with Certbot.  
   - Ensures encrypted traffic between users and the server.

## Result
- Live application accessible via: https://mrbeastsubtitlesearch.click
- Code changes on GitHub are deployed automatically without manual steps.

## Portfolio Value
This project demonstrates:
- Reverse proxy setup with Nginx  
- HTTPS configuration with Let’s Encrypt  
- Automated deployment using GitHub Actions  
- Running a containerized full-stack app on AWS EC2
