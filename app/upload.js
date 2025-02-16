import path from "path";
import formidable from "formidable";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public/uploads");
    form.keepExtensions = true;

    await form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({error: err.message});

        const file = files.image;
        if (!file) return res.status(400).json({error: "No file uploaded"});

        return res.status(200).json({filePath: `/uploads/${path.basename(file.filepath)}`});
    });
}
