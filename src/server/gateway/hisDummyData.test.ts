import assert from "node:assert/strict";
import test from "node:test";
import {
  getFoundationDashboard,
  getMasterDataSnapshot,
  getModuleShortcuts,
  getPatientRegistry,
  getPrototypeModuleLandscape,
  getPublicWebsiteFallback,
  getRegistrationQueueSnapshot,
  validateDummyAdminLogin,
} from "./hisDummyData";

test("foundation dashboard exposes phase 1 readiness metrics", () => {
  const dashboard = getFoundationDashboard();

  assert.equal(dashboard.metrics.activeUsers, 18);
  assert.equal(dashboard.metrics.rolesConfigured, 6);
  assert.equal(dashboard.metrics.masterDataCompletion, 84);
  assert.equal(dashboard.workstreams[0].status, "Ready");
});

test("patient registry flags likely duplicates from dummy data", () => {
  const registry = getPatientRegistry();

  assert.equal(registry.patients.length, 5);
  assert.equal(registry.duplicateWarnings.length, 2);
  assert.deepEqual(
    registry.duplicateWarnings.map((warning) => warning.patientName),
    ["Nadia Prameswari", "Rafi Mahendra"],
  );
});

test("master data snapshot groups service catalog by unit", () => {
  const snapshot = getMasterDataSnapshot();

  assert.equal(snapshot.units.length, 5);
  assert.equal(snapshot.catalogByUnit.Laboratorium.length, 3);
  assert.equal(snapshot.catalogByUnit["Medical Check Up"].length, 4);
});

test("dummy admin login accepts review credentials only", () => {
  assert.equal(validateDummyAdminLogin("admin@rsbisadibicarakan.com", "admin123456")?.name, "Admin Review");
  assert.equal(validateDummyAdminLogin("admin@rsbisadibicarakan.com", "wrong"), null);
});

test("module shortcuts include every phase review target", () => {
  const shortcuts = getModuleShortcuts();

  assert.equal(shortcuts.length, 19);
  assert.ok(shortcuts.some((shortcut) => shortcut.href === "/admin/master-data"));
  assert.ok(shortcuts.some((shortcut) => shortcut.href === "/admin/registration"));
  assert.ok(shortcuts.some((shortcut) => shortcut.href === "/admin/queue"));
});

test("registration and queue dummy snapshot exposes next FE phase", () => {
  const snapshot = getRegistrationQueueSnapshot();

  assert.equal(snapshot.registrations.length, 4);
  assert.equal(snapshot.queueCounters.waiting, 9);
  assert.equal(snapshot.queueCounters.serving, 5);
  assert.equal(snapshot.queueDisplays.length, 4);
});

test("public website fallback keeps homepage sections populated without database", () => {
  const fallback = getPublicWebsiteFallback();

  assert.equal(fallback.departments.length, 6);
  assert.equal(fallback.doctors.length, 4);
  assert.equal(fallback.news.length, 3);
  assert.equal(fallback.stats.doctors, 85);
});

test("prototype module landscape covers every static prototype module", () => {
  const landscape = getPrototypeModuleLandscape();

  assert.equal(landscape.length, 8);
  assert.deepEqual(
    landscape.map((module) => module.slug),
    ["dashboard", "core-mcu", "front-office", "inpatient", "billing-finance", "back-office", "internal-integration", "patient-portal"],
  );
});
