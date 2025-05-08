// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "frontend",
        cwd: "./apps/frontend",
        script: "npm",
        args: "run dev"
      },
      {
        name: "backend",
        cwd: "./apps/backend",
        script: "node",
        args: "app.js"
      }
    ]
  }