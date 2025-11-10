module.exports = {
  apps: [
    {
      name: "project-management",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
