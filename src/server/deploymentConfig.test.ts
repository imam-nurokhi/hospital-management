import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { join } from "node:path";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("production deployment uses Next standalone output", () => {
  const nextConfig = read("next.config.ts");
  const dockerfile = read("Dockerfile");

  assert.match(nextConfig, /output:\s*"standalone"/);
  assert.match(dockerfile, /\/app\/\.next\/standalone/);
  assert.match(dockerfile, /USER nextjs/);
});

test("simrs compose creates an isolated app container on localhost port 3009", () => {
  const compose = read("deploy/docker-compose.simrs.yml");

  assert.match(compose, /simrs-bisadibicarakan-web:/);
  assert.match(compose, /container_name:\s*simrs-bisadibicarakan-web/);
  assert.match(compose, /"127\.0\.0\.1:3009:3000"/);
  assert.match(compose, /NEXT_PUBLIC_SITE_URL:\s*https:\/\/simrs\.bisadibicarakan\.com/);
});

test("main branch workflow verifies before deploying without hardcoded secrets", () => {
  const workflow = read(".github/workflows/deploy-main.yml");

  assert.match(workflow, /branches:\s*\n\s*- main/);
  assert.match(workflow, /needs:\s*verify/);
  assert.match(workflow, /secrets\.SIMRS_VPS_HOST/);
  assert.match(workflow, /secrets\.SIMRS_VPS_PASSWORD/);
  assert.doesNotMatch(workflow, /SIMRS_VPS_PASSWORD:\s*["'][^"']+["']/);
  assert.doesNotMatch(workflow, /SIMRS_VPS_HOST:\s*["'][^"']+["']/);
});

test("nginx vhost proxies simrs domain to the new local app port", () => {
  const nginx = read("deploy/nginx.simrs.bisadibicarakan.com.conf");

  assert.match(nginx, /server_name simrs\.bisadibicarakan\.com/);
  assert.match(nginx, /proxy_pass http:\/\/127\.0\.0\.1:3009/);
});
