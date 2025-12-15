# Recogito Config

Recogito Config is a web-based configuration management application designed for administering and customizing Recogito Studio deployments. It provides a graphical interface for managing platform-wide settings that control roles, security policies, branding, authentication, and more.

## Usage

### Requirements

- Node.js (v18 or later) and NPM
- A running instance of [recogito-server](https://github.com/recogito/recogito-server) (Supabase)

### Installation

Clone the repo and install the package:

```bash
git clone https://github.com/recogito/recogito-config.git
cd recogito-config
npm install
```

Copy `.env.example` to create a `.env` file:
```bash
cp .env.example .env
```

and fill out the required values from your Supabase instance (can be local or remote):
```bash
VITE_SUPABASE_API_URL=http://127.0.0.1:54321
VITE_SUPABASE_SERVICE_KEY=sb_secret_...
```

### Creating a configuration

Start the configuration tool:

```bash
npm run dev
```

Then open http://localhost:5173 in your browser. If configured correctly, the Policies tab will be auto-populated from your Supabase database.

Click Load Config and upload the provided `default-config.json` from the repo root.

Review and customize all configuration options. For more information, view the [Configuration reference](https://recogitostudio.org/reference/config-tool-architecture/) on the Recogito Studio documentation website.

When finished, click "Save Config," enter metadata (project name, author, version), and download the generated `config.json` file. This `config.json` can now be used by [recogito-server](https://github.com/recogito/recogito-server) and [recogito-client](https://github.com/recogito/recogito-client).
