# Cloud Posture Scanner

A lightweight **Cloud Posture Scanner** that connects to an AWS account, discovers cloud resources, and evaluates them against **CIS AWS Benchmark security checks**. The application provides a backend service for resource discovery and security analysis and a frontend dashboard to visualize results.

---

## Overview

This project scans AWS resources such as **EC2 instances and S3 buckets**, performs **CIS benchmark checks**, and displays the results in a dashboard. Each check returns a **PASS/FAIL status along with evidence**, helping identify potential security misconfigurations in the cloud environment.

---

## Features

### Resource Discovery
- Discover **EC2 instances**
  - Instance ID
  - Instance type
  - Public IP
  - Security groups

- Discover **S3 buckets**
  - Bucket name
  - Region
  - Encryption status
  - Public access status

### CIS Benchmark Checks Implemented
- Ensure **S3 buckets are not publicly accessible**
- Ensure **S3 bucket encryption is enabled**
- Ensure **root account has MFA enabled**
- Ensure **CloudTrail logging is enabled**
- Detect **security groups open to SSH (0.0.0.0/0)**

Each check returns:
- Check name
- Resource affected
- Status (**PASS / FAIL**)
- Evidence explaining the configuration

### Storage of Results
Scan results are stored in **AWS S3** as a JSON report.

### Dashboard
The frontend dashboard displays:

- EC2 instances table
- S3 buckets table
- CIS security check results with evidence

---

## Architecture
Frontend (React Dashboard)
↓
REST API Requests
↓
Backend (Node.js + Express)
↓
Controllers
↓
Service Layer
↓
AWS SDK
↓
AWS Resources (EC2, S3, IAM, CloudTrail)

---

The backend follows a **modular architecture**:

backend/
├── routes
├── controllers
├── services
│ ├── ec2Service.js
│ ├── s3Service.js
│ ├── iamService.js
│ ├── cloudTrailService.js
│ └── storageService.js
├── config
│ └── awsConfig.js

This separation improves **readability, maintainability, and scalability**.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- AWS SDK v3

### Frontend
- React.js
- Tailwind CSS

### Cloud Services
- AWS EC2
- AWS S3
- AWS IAM
- AWS CloudTrail

---

## API Endpoints

| Endpoint | Description |
|--------|-------------|
| `/instances` | Retrieve EC2 instances |
| `/buckets` | Retrieve S3 buckets |
| `/cis-results` | Run CIS checks and return results |

---

## Setup Instructions

### 1. Clone the repository

``` bash
git clone https://github.com/your-username/cloud-posture-scanner.git
```

### 2. Install dependencies

Backend:
``` bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

### 3. Configure AWS credentials

Create a `.env` file in the backend directory:

AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
AWS_REGION=ap-south-1


### 4. Run the backend
```bash
npm start
```

---

### 5. Run the frontend
```bash
npm start
```

---

## Example CIS Check Result

Check: Security group open to SSH (0.0.0.0/0)
Resource: sg-123456
Status: FAIL
Evidence: Port 22 open to 0.0.0.0/0

---

## Possible Improvements

- Support **multi-region scanning**
- Add **more CIS benchmark checks**
- Implement **scheduled scans**
- Maintain **scan history**
- Add **authentication for dashboard access**

---

## Author
**Anjali Rathi**
