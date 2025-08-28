import { auditPackage } from "../index.js";

auditPackage("https://github.com/chrisyo-22/tappworldfilm", "D:/SelfLearning/DuyiLearningPay/AI/SecurityCheck/audit.json").then(() => {
    console.log("Audit complete");
}).catch((error) => {
    console.error("Audit failed", error);
});