import assert from "node:assert/strict";
import test from "node:test";
import {
  getFoundationDashboard,
  getMasterDataSnapshot,
  getPatientRegistry,
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
