import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import csv_stringify from 'csv-stringify';
import Logger from '../_config/logger';

const stringify = csv_stringify.stringify;
const router = express();

router.post('/create', (req: Request, res: Response) => {
    const data = req.body.data;

    if (!data || !data.length) {
        return res.status(400).json({
            success: false,
            message: 'Please enter at least 1 row',
        });
    }

    stringify(data, {
        header: true,
    }, (err, str) => {
        const path = './files/' + Date.now() + '.csv'
        if (err) {
            Logger.error(err.message)
            return res.status(400).json({
                success: false,
                message: `${err.message}`
            })
        }
        if (!fs.existsSync('./files'))  {
            fs.mkdirSync('./files')
        }
        fs.writeFile(path, str, (err) => {
            if (err) {
                Logger.error(err.message);
                return res.status(400).json({
                    success: false,
                    message: `An error occurred: ${err.message}`
                })
            }

            res.download(path, 'file.csv')
        })
    })
})

export default router;



