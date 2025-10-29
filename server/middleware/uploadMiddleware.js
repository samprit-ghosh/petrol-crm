import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        cb(null, `csv_${Date.now()}${path.extname(file.originalname)}`);
    },
});

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "text/csv" || file.mimetype === "application/vnd.ms-excel") cb(null, true);
        else cb(new Error("Only CSV allowed"), false);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
});
