import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "Unknown IP";

    const userAgent = req.headers["user-agent"] || "Unknown Device";
    const time = new Date().toISOString();

    const logLine = `${time} | IP: ${ip} | Device: ${userAgent}\n`;

    // Simpan file di root project (sementara di Vercel)
    const filePath = path.join(process.cwd(), "visitor.txt");

    fs.appendFileSync(filePath, logLine);

    res.status(200).json({ status: "logged" });
  } catch (err) {
    res.status(500).json({ error: "failed to log visitor" });
  }
}
