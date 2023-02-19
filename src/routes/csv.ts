import csv_parse, { Options } from 'csv-parse';
import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import os from 'os';

import Logger from '../_config/logger';

const parse = csv_parse.parse;
const upload = multer({ dest: os.tmpdir() });

const router = express();

const parserOptions: Options = {
    relax_quotes: true,
}

router.post('/read', upload.single('file'), (req: Request, res: Response) => {
    const file = req.file;
    const useColumn: boolean = req.body.columnSwitch === "true" ? true : false;
    parserOptions.columns = useColumn;

    const data = fs.readFileSync(file!.path)
    parse(data, parserOptions, (err, records) => {
        if (err) {
            Logger.error(err)
            return res.status(400).json({success: false, message: `An error occurred reading the file: ${err.message}`})
        }

        return res.status(200).json({data: records})
    })
})

export default router;



