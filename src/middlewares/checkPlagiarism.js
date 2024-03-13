import path from "path";
import fs from "fs/promises";
import PdfParse from "pdf-parse";
import axios from "axios";

export default async function checkPlagiarism(req, res, next){
    try{
        const filePath = path.join(path.resolve(), "uploads", req.file.filename);
        const data = await fs.readFile(filePath);
        const fileData = await PdfParse(data);
        // console.log(fileData.text);
        const response = await axios.post(`https://www.prepostseo.com/apis/checkPlag?key=b2c71130f87d4c2b606116278c8ee2e0&data=${fileData.text}`);
        console.log(response.data);
        next();
    }catch(err){
        console.log(err.message);
        return res.status(500).send("Internal server error");
    }
}