import fs from 'fs'
import path from 'path'

export interface Replace {
    value: string,
    toBeReplacedWith: string
}

export const writeHTML = (filename: string, content: string): void => {
    fs.writeFile(filename, content, (err) => {
        if (err) {
            throw new Error('an error occurred writing file')
            console.error(err)
        } else {
            console.log('saved successfully');
        }
    })
}

export const replaceContent = (replaceArray: Replace[], defaultHtml: string) => {
    let newHtml = replaceArray.reduce((a: string, b: Replace) => {
        let regExp = new RegExp(b.value, "g")
        let next = a.replace(regExp, `${b.toBeReplacedWith}`)
        return next

    }, defaultHtml)
    return newHtml
}

export const allHtmlFiles = async (directory: string) => {
    try {
        const result = await fs.promises.readdir(directory)
        if (!result) {
            throw new Error('an error occurred')
        }
        return result;
    } catch (err) {
        console.error(err)
    }
}

export const createFileName = (allFiles: string[]): string => {
    let num: number;
    if (allFiles.length === 0) {
        num = 0
    } else {
        const lastFile: string = allFiles[allFiles.length - 1]
        const splitChar = lastFile.split('.')[0]
        const newChar = splitChar.split(/[a-z]/g)
        console.log(splitChar, newChar)
        num = parseInt(newChar[newChar.length - 1])
    }
    return `index${num + 1}.html`

}