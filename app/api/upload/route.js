import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { randomUUID } from "crypto";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("image");
        const category = formData.get("category") || "default";
        const allowedCategories = ["default", "profile", "products", "banners"];
        if (!allowedCategories.includes(category)) {
            return NextResponse.json({ error: "Invalid category" }, { status: 400 });
        }
        if (files.length === 0) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }
        const filePaths = [];
        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const ext = path.extname(file.name);
            const newFileName = `${randomUUID()}${ext}`;
            const uploadPath = path.join(process.cwd(), "public/uploads", category);
            await mkdir(uploadPath, { recursive: true });
            const filePath = path.join(uploadPath, newFileName);
            await writeFile(filePath, buffer);
            filePaths.push(`localhost:3000/uploads/${category}/${newFileName}`);
        }
        return NextResponse.json({ filePaths }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
