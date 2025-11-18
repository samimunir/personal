export const health = async (_req, res) => {
  return res.status(200).json({ service: "CATALOG", ok: true });
};

export const adminHealth = async (_req, res) => {
  return res.status(200).json({ service: "CATALOG-ADMIN", ok: true });
};
