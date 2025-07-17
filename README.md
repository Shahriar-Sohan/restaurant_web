# restaurant_web — Enterprise-Grade Food Ordering Platform

This is a full-featured, production-ready **Next.js** project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
Built with modern best practices for frontend performance, backend integration, and scalable deployment.

---

## 🚀 Project Overview

- **Enterprise-grade** food ordering, delivery, and reservation platform.
- Built using **Next.js** with optimized fonts and server-side rendering.
- Containerized with **Docker** for easy local development and cloud deployment.
- Fully automated **CI/CD pipeline** deploying to AWS EC2 using Docker and GitHub Actions.
- Integrated with a backend API and supports PostgreSQL database (can be extended).
- Production-ready with HTTPS support via Nginx and Let’s Encrypt.

---

## 📦 Tech Stack

| Technology            | Purpose                                 |
|-----------------------|-----------------------------------------|
| Next.js               | React framework with SSR and static generation |
| Docker                | Containerization for consistent builds and deployments |
| AWS EC2 + ECR         | Cloud hosting and Docker image registry  |
| GitHub Actions        | Continuous Integration and Deployment    |
| Nginx                 | Reverse proxy and SSL termination (HTTPS) |
| PostgreSQL            | Database backend (optional extension)   |

---

## 🛠️ Getting Started

### Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your app locally.

---

### Docker Local Development

Build and run locally in a container:

```bash
docker build -t restaurant-web .
docker run -p 3000:3000 restaurant-web
```

---

## 🚀 Deployment

### AWS Deployment with CI/CD

- Push to GitHub `main` branch triggers GitHub Actions pipeline.
- Pipeline builds Docker image, pushes to AWS ECR, then deploys to EC2.
- Uses multi-stage Dockerfile for optimized production images.
- Supports zero-downtime deployment with container restart policies.

### HTTPS with Nginx & Let’s Encrypt

- Nginx configured as reverse proxy for SSL termination.
- Automated HTTPS certificates via Let’s Encrypt.

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Docker Docs](https://docs.docker.com)
- [AWS ECR Docs](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

## 📄 License

This project is open source and free to use.

---

## 💼 About Me

This project showcases my ability to build **scalable**, **production-ready** full-stack web applications with modern tooling, cloud deployment, and automated CI/CD — skills I bring to any software engineering role.
