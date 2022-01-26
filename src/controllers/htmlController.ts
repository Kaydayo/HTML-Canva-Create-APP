import express, { Request, Response, NextFunction } from 'express'
import createHTML from 'create-html';
import fs from 'fs'
import { writeHTML, replaceContent, allHtmlFiles, createFileName } from '../utils/utils';
import path from 'path'


export const createHtml = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //get values from request body
        const html_content = req.params.html
        const { Html_content, Replace } = req.body

        // create html with key from req body
        const html = createHTML({
            title: 'HTML CREATOR',
            body: html_content,
        })


        //set directory to output files

        const directory = path.join(__dirname, `../output`)
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        let filesInOutput: any = await allHtmlFiles(directory)
        console.log(filesInOutput)
        const filename = createFileName(filesInOutput)
        const id = filename.split('.')[0]
        const file = directory + `/${filename}`


        // replace selected characters
        let newHtmlContent = replaceContent(Replace, html)

        writeHTML(file, newHtmlContent)


        res.status(201).json({ message: "successfull", id })
    } catch (error) {
        console.error(error)
    }

}

export const getHtml = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const directory = path.join(__dirname, `../output` + `/${id}.html`)
    console.log(directory)
    fs.readFile(directory, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json({ message: 'Contents you are looking cannot Found' });
        } else {
            res.sendFile(directory)

        }
    })
}

