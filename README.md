# Next.js GitHub Actions Lab 🧪🚀

A hands-on testing ground and laboratory for learning, building, and refining CI/CD pipelines with **GitHub Actions** using a Next.js application.

---

## 🎯 Lab Objectives

- [ ] **Continuous Integration (CI):** Run automated linting (`npm run lint`) and type checks on Pull Requests.
- [ ] **Production Build Check:** Verify that `npm run build` succeeds across different Node.js environments.
- [ ] **Dependency & Security Audits:** Run scheduled or PR security audits (`npm audit --omit=dev`).
- [ ] **Automated Release / Deployment:** Explore automated deployments and release management workflows.

---

## 🛠️ Project Scripts

These are the primary commands executed locally and within GitHub Actions workflow runners:

| Command | Description | Used in CI |
| :--- | :--- | :---: |
| `npm run dev` | Starts the Next.js development server | Local |
| `npm run lint` | Runs ESLint flat config checks | ✅ CI |
| `npm run build` | Compiles and builds the production Next.js bundle | ✅ CI |
| `npm audit --omit=dev` | Audits production dependencies for vulnerabilities | ✅ CI |

---

## 📁 Repository Structure

```text
.
├── .github/
│   └── workflows/          # GitHub Actions workflow YAML files
├── app/                    # Next.js App Router source files
├── public/                 # Static assets
└── package.json            # Project dependencies and scripts
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local dev server:**
   ```bash
   npm run dev
   ```

3. **Validate before pushing:**
   ```bash
   npm run lint
   npm run build
   ```
