import React from "react";
import { Settings, ShieldAlert, Cpu, Layers, Info, Radio } from "lucide-react";
import { isOnlineAiConfigured, getActiveAiProvider } from "../engine/onlineAI.js";

export function SettingsPage() {
  const isOnline = isOnlineAiConfigured();
  const activeProvider = getActiveAiProvider();

  return (
    <div className="be-page-container">
      <div className="be-page-header">
        <h2>SYSTEM SETTINGS & CONFIGURATION</h2>
        <p>Telemetry preferences, AI model options, risk thresholds, and safety disclaimers.</p>
      </div>

      <div className="be-grid-span-12 be-card mb-6">
        <div className="be-card-header">
          <h3 className="be-card-title"><Radio size={16} /> DATA MODE</h3>
        </div>
        <div className="be-setting-row">
          <label className="be-radio-label active">
            <input type="radio" name="datamode" defaultChecked />
            <span>● DEMO SIMULATION MODE (Active for SIH26025 Prototype)</span>
          </label>
        </div>
        <div className="be-setting-row opacity-60">
          <label className="be-radio-label disabled">
            <input type="radio" name="datamode" disabled />
            <span>○ LIVE IOT SENSOR STREAM — <strong className="text-warning">COMING SOON (Hardware Integration Ready)</strong></span>
          </label>
        </div>
      </div>

      <div className="be-grid-span-12 be-card mb-6">
        <div className="be-card-header">
          <h3 className="be-card-title"><Cpu size={16} /> AI CONFIGURATION &amp; PRIVACY</h3>
        </div>
        <div className="be-setting-item">
          <span>Offline Explainable Geotechnical Risk Model:</span>
          <span className="text-safe font-bold">Enabled (Primary — Zero API Key Needed)</span>
        </div>
        <div className="be-setting-item">
          <span>Online LLM Synthesis Model:</span>
          <span className={isOnline ? "text-safe font-bold" : "text-muted font-bold"}>
            {isOnline ? `Enabled (${activeProvider?.provider || "Online LLM"})` : "Offline Mode (Optional LLM Key)"}
          </span>
        </div>

        <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#e2e8f0" }}>
              🔑 Optional Live LLM Key (Browser-Only Storage):
            </span>
            {activeProvider?.isCustom && (
              <span className="text-safe" style={{ fontSize: "0.75rem" }}>● Active Key in LocalStorage</span>
            )}
          </div>
          <p style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: "0.75rem", lineHeight: "1.4" }}>
            🔒 <strong>100% Secure &amp; Hidden:</strong> Keys entered here are stored <em>only in your browser's private localStorage</em>. They are <strong>never</strong> committed to GitHub, never sent to any backend, and never exposed in public build files.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <select
              id="ai-provider-select"
              defaultValue={localStorage.getItem("BLACK_EYE_USER_PROVIDER") || "NVIDIA NIM"}
              style={{ background: "#0f172a", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
            >
              <option value="NVIDIA NIM">NVIDIA NIM</option>
              <option value="Gemini">Google Gemini</option>
              <option value="OpenAI">OpenAI</option>
            </select>
            <input
              type="password"
              id="ai-key-input"
              placeholder={activeProvider?.isCustom ? "••••••••••••••••••••••••" : "Paste API key (nvapi-... / AIza... / sk-...)"}
              style={{ flex: "1", minWidth: "220px", background: "#0f172a", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
            />
            <button
              type="button"
              className="be-btn be-btn-primary"
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
              onClick={() => {
                const prov = document.getElementById("ai-provider-select")?.value;
                const key = document.getElementById("ai-key-input")?.value;
                if (key && key.trim()) {
                  localStorage.setItem("BLACK_EYE_USER_PROVIDER", prov);
                  localStorage.setItem("BLACK_EYE_USER_API_KEY", key.trim());
                  alert("API Key safely saved to your browser localStorage!");
                  window.location.reload();
                } else {
                  alert("Please enter a valid API key.");
                }
              }}
            >
              Save Key
            </button>
            {activeProvider?.isCustom && (
              <button
                type="button"
                className="be-btn be-btn-outline"
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", borderColor: "#ef4444", color: "#ef4444" }}
                onClick={() => {
                  localStorage.removeItem("BLACK_EYE_USER_API_KEY");
                  localStorage.removeItem("BLACK_EYE_USER_PROVIDER");
                  alert("Custom API Key removed from browser.");
                  window.location.reload();
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="be-grid-span-12 be-card mb-6">
        <div className="be-card-header">
          <h3 className="be-card-title"><Layers size={16} /> PROTOTYPE RISK THRESHOLDS</h3>
        </div>
        <div className="be-threshold-list">
          <div className="be-thresh-item safe">
            <span>SAFE STATUS:</span>
            <strong>0 – 29 Risk Score (&lt; 30)</strong>
          </div>
          <div className="be-thresh-item info">
            <span>ANOMALY STATUS:</span>
            <strong>30 – 44 Risk Score (≥ 30)</strong>
          </div>
          <div className="be-thresh-item warning">
            <span>WARNING STATUS:</span>
            <strong>45 – 74 Risk Score (≥ 45)</strong>
          </div>
          <div className="be-thresh-item critical">
            <span>CRITICAL STATUS:</span>
            <strong>75 – 100 Risk Score (≥ 75)</strong>
          </div>
        </div>
      </div>

      <div className="be-card be-disclaimer-card">
        <div className="be-card-header">
          <h3 className="be-card-title text-warning"><ShieldAlert size={18} /> SAFETY &amp; ACCURACY DISCLAIMER</h3>
        </div>
        <p className="be-disclaimer-text">
          BLACK EYE is a student prototype developed for SIH26025 (Mine Subsidence Monitoring &amp; Early Warning System). Risk scores and simulated sensor data are intended for demonstration and development purposes only and are not a substitute for certified mine-safety monitoring systems.
        </p>
      </div>
    </div>
  );
}
