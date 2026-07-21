# SIMRS Production Deploy

Deployment target: `https://simrs.bisadibicarakan.com/`

The GitHub Actions workflow `.github/workflows/deploy-main.yml` deploys every push to `main`.

Required GitHub repository secrets:

- `SIMRS_VPS_HOST`
- `SIMRS_VPS_USER`
- `SIMRS_VPS_PASSWORD` or `SIMRS_VPS_SSH_KEY`
- `SIMRS_VPS_PORT`, optional. Defaults to `22`.

Runtime behavior:

- App directory on VPS: `/opt/simrs-bisadibicarakan`
- Container name: `simrs-bisadibicarakan-web`
- Local host port: `127.0.0.1:3009`
- Nginx vhost: `/etc/nginx/conf.d/simrs.bisadibicarakan.com.conf`

The workflow runs tests, lint, and production build before deploying. The VPS step only creates or updates the SIMRS app container and does not remove existing unrelated containers.
