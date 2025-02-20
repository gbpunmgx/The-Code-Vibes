class FileService {
    static API_URL = "/image_api/upload"; // API endpoint
    static CONTENT_TYPE = "application/json"; // Corrected CONTENT_TYPE

    /**
     * Upload files to the server
     * @param {FileList | File[]} files - The files to upload
     * @param {string} category - The category for file organization
     * @returns {Promise<Object>} - Response from server
     */
    static async uploadFiles(files, category = "default") {
        const formData = new FormData();
        files.forEach(file => formData.append("image", file));
        formData.append("category", category);

        const response = await fetch(FileService.API_URL, {
            method: "POST",
            body: formData
        });

        return response.json();
    }

    /**
     * Rename a file
     * @param {string} oldFileName - Current file name
     * @param {string} newFileName - New file name
     * @param {string} category - Category where file exists
     * @returns {Promise<Object>} - Response from server
     */
    static async renameFile(oldFileName, newFileName, category) {
        const response = await fetch(FileService.API_URL, {
            method: "PATCH",
            headers: { "Content-Type": FileService.CONTENT_TYPE },
            body: JSON.stringify({ oldFileName, newFileName, category })
        });

        return response.json();
    }

    /**
     * Delete a single file
     * @param {string} fileName - Name of the file to delete
     * @param {string} category - Category where the file exists
     * @returns {Promise<Object>} - Response from server
     */
    static async deleteFile(fileName, category) {
        const response = await fetch(FileService.API_URL, {
            method: "DELETE",
            headers: { "Content-Type": FileService.CONTENT_TYPE },
            body: JSON.stringify({ fileName, category })
        });

        return response.json();
    }

    /**
     * Delete multiple files
     * @param {string[]} fileNames - List of file names to delete
     * @param {string} category - Category where the files exist
     * @returns {Promise<Object>} - Response from server
     */
    static async deleteMultipleFiles(fileNames, category) {
        const response = await fetch(FileService.API_URL, {
            method: "DELETE",
            headers: { "Content-Type": FileService.CONTENT_TYPE },
            body: JSON.stringify({ fileNames, category })
        });

        return response.json();
    }
}

export default FileService;
