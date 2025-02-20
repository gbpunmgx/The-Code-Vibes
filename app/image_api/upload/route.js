import {NextResponse} from "next/server";
import path from "path";
import {writeFile, mkdir, rename, unlink} from "fs/promises";
import {randomUUID} from "crypto";

const UPLOADS_DIR = path.join(process.cwd(), "public/product_images");

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("image");  // Get the first file (only one file upload)
        const category = formData.get("category") || "default";

        if (!file) {
            return NextResponse.json({error: "No file uploaded"}, {status: 400});
        }

        const ext = path.extname(file.name);
        const newFileName = `${randomUUID()}${ext}`;
        const uploadPath = path.join(UPLOADS_DIR, category);

        // Ensure the category folder exists
        await mkdir(uploadPath, {recursive: true});

        // Read the file and write it to the specified path
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadPath, newFileName);

        await writeFile(filePath, buffer);

        // Return the file path
        return NextResponse.json({
            filePath: `/product_images/${category}/${newFileName}`
        }, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PATCH(req) {
    try {
        const {oldFileName, newFileName, category} = await req.json();

        if (!oldFileName || !newFileName || !category) {
            return NextResponse.json({error: "Missing parameters"}, {status: 400});
        }

        const oldFilePath = path.join(UPLOADS_DIR, category, oldFileName);
        const newFilePath = path.join(UPLOADS_DIR, category, newFileName);

        await rename(oldFilePath, newFilePath);

        return NextResponse.json({
            message: "File updated successfully",
            newFilePath: `/product_images/${category}/${newFileName}`
        }, {status: 200});

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function DELETE(req) {
    try {
        const {fileName, fileNames, category} = await req.json();

        if (!category) {
            return NextResponse.json({error: "Category is required"}, {status: 400});
        }

        if (fileName) {
            // Single file deletion
            const filePath = path.join(UPLOADS_DIR, category, fileName);
            await unlink(filePath);
            return NextResponse.json({message: "File deleted successfully"}, {status: 200});
        }

        if (Array.isArray(fileNames) && fileNames.length > 0) {
            // Multiple file deletion
            const deletedFiles = [];
            const failedFiles = [];

            for (const file of fileNames) {
                const filePath = path.join(UPLOADS_DIR, category, file);
                try {
                    await unlink(filePath);
                    deletedFiles.push(file);
                } catch (error) {
                    failedFiles.push({file, error: error.message});
                }
            }

            return NextResponse.json({
                message: "File deletion process completed",
                deletedFiles,
                failedFiles
            }, {status: 200});
        }

        return NextResponse.json({error: "No valid files provided for deletion"}, {status: 400});

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
