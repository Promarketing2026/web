const rawDeploymentEnvironment = process.env.VERCEL_ENV ?? "local";

export const deploymentEnvironment = rawDeploymentEnvironment.replace(
  /[^a-zA-Z0-9_-]/g,
  "-",
);

// La indexación falla de forma segura: solo Vercel Production se considera
// público. Preview, Development, local y valores desconocidos quedan noindex.
export const isProductionDeployment =
  rawDeploymentEnvironment === "production";
