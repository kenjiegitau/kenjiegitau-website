const canvas = document.getElementById("cloud-canvas");
const ctx = canvas.getContext("2d");

const columns = 16;
const rows = 6;
let requestStartedAt = null;

const sendRequestButton = document.getElementById("send-request");

sendRequestButton.addEventListener("click", function () {
    requestStartedAt = performance.now();
});
function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {

        const x = 30 + col * 55;
        const y = 40 + row * 55;

// Draw connections between neighbouring nodes
ctx.shadowBlur = 0;
ctx.strokeStyle = "rgba(0, 229, 255, 0.25)";
ctx.lineWidth = 1;

// Connect to the node on the right
if (col < columns - 1) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 55, y);
    ctx.stroke();
}
    
// Connect to the node below
if (row < rows - 1) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 55);
    ctx.stroke();
}
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);

        ctx.fillStyle = "#00E5FF";
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 12;

        ctx.fill();
    }
}

}

function animate(time) {
    drawNetwork();

    const distance = (columns - 1) * 55;

    const pulseX = 30 + (time * 0.08) % distance;
    const pulseY = 40 + 2 * 55;

    ctx.beginPath();
    ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);

    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "#00E5FF";
    ctx.shadowBlur = 24;

    ctx.fill();
    ctx.shadowBlur = 0;

if (requestStartedAt !== null) {
    const elapsed = time - requestStartedAt;
    const duration = 2500;

    if (elapsed >= duration) {
        requestStartedAt = null;
    } else {
        const progress = elapsed / duration;

        const requestX = 30 + progress * distance;
        const requestY = 40 + 3 * 55;

        ctx.beginPath();
        ctx.arc(requestX, requestY, 6, 0, Math.PI * 2);

        ctx.fillStyle = "#00E5FF";
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 25;

        ctx.fill();
        ctx.shadowBlur = 0;
    }
}
    requestAnimationFrame(animate);
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    drawNetwork();
} else {
    requestAnimationFrame(animate);
}

async function loadProjects() {
    const response = await fetch("/api/projects");
    const projects = await response.json();

   
const container = document.getElementById("projects-container");

container.replaceChildren();

projects.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const technologies = document.createElement("p");
    technologies.textContent = project.technologies.join(" · ");

    const link = document.createElement("a");
    link.href = project.github;
    link.textContent = "View on GitHub";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    card.append(title, description, technologies, link);
    container.appendChild(card);
});

}

loadProjects();
