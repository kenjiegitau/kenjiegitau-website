from flask import Flask, jsonify

app = Flask(
    __name__,
    static_folder="../frontend",
    static_url_path=""
)
@app.get("/api/health")
def health_check():
    return jsonify({
        "status": "ok",
        "service": "kenjie-portfolio-api"
    })

@app.get("/api/projects")
def get_projects():

    projects = [
        {
            "id": "azure-automation",
            "title": "Azure Cloud Automation & Deployment",
            "description": "Python-based cloud automation using Azure Functions and Azurite.",
            "technologies": [
                "Python",
                "Azure Functions",
                "Azurite",
                "pytest",
                "Git",
                "Github Actions",
            ],
            "github": "https://github.com/kenjiegitau/azure-cloud-automation"
        },
        {
            "id": "aws-solutions-architecture",
            "title": "AWS Solutions Architecture",
            "description": "AWS serverless architecture case study covering IAM, scalability, security, resilience and cost optimisation.",
            "technologies": [
                "AWS Lambda",
                "API Gateway",
                "DynamoDB",
                "Cognito",
                "IAM",
                "CloudFront",
            ],
            "github": "https://github.com/kenjiegitau/aws-solutions-architecture"
        },
        {
            "id": "cross-border-technology-consulting",
            "title": "Cross-Border Technology Strategy & Security Architecture",
            "description": "Anonymised UK-Kenya SME consulting case study covering cloud architecture, cybersecurity, data protection and technology strategy.",
            "technologies": [
                "Technical Consulting",
                "Cloud Solution Architecture",
                "IAM",
                "EntraID",
                "Microsoft 365",
            ],
            "github": "https://github.com/kenjiegitau/cross-border-technology-consulting"
        },
        {
            "id": "defence-network-traffic-research",
            "title": "Network Traffic Obfuscation Research",
            "description": "Evaluation of encrypted network traffic metadata, traffic obfuscation and security trade-offs in simulated defence-oriented environments.",
            "technologies": [
                "Encrypted Traffic Analysis",
                "Linux",
                "Wireshark",
                "Traffic Obfuscation",
                "Python",
                "Packet Analysis",
            ],
            "github": "https://github.com/kenjiegitau/defence-network-traffic-research"
        },
    ]
    
    return jsonify(projects)

@app.get("/")
def home():
    return app.send_static_file("index.html")