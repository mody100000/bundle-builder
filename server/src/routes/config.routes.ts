import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

const getConfigFilePath = (systemId: any): string | null => {
  if (!systemId || typeof systemId !== "string") {
    return null;
  }
  // Sanitize to only alphanumeric characters and hyphens to prevent directory traversal
  const cleanId = systemId.replace(/[^a-zA-Z0-9-]/g, "");
  if (!cleanId) {
    return null;
  }
  return path.join(__dirname, `../data/config_${cleanId}.json`);
};

router.get("/", (req, res) => {
  const { systemId } = req.query;
  const configFilePath = getConfigFilePath(systemId);

  if (!configFilePath) {
    return res.status(400).json({ error: "Missing or invalid systemId parameter." });
  }

  if (fs.existsSync(configFilePath)) {
    try {
      const data = fs.readFileSync(configFilePath, "utf-8");
      return res.json(JSON.parse(data));
    } catch (error) {
      console.error(`Error reading config_${systemId}.json:`, error);
      return res.status(500).json({ error: "Failed to read configuration." });
    }
  } else {
    // Return empty configuration if it doesn't exist yet
    return res.json({});
  }
});

router.post("/", (req, res) => {
  const { systemId } = req.query;
  const configFilePath = getConfigFilePath(systemId);

  if (!configFilePath) {
    return res.status(400).json({ error: "Missing or invalid systemId parameter." });
  }

  try {
    const configData = req.body;
    fs.writeFileSync(configFilePath, JSON.stringify(configData, null, 2), "utf-8");
    return res.json({ success: true });
  } catch (error) {
    console.error(`Error writing config_${systemId}.json:`, error);
    return res.status(500).json({ error: "Failed to save configuration." });
  }
});

export default router;
