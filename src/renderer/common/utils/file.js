/**
 * @file 读取文件及文件夹相关操作
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'
import fs from 'fs';
import mime from 'mime';
import {resolve} from 'path';
import {logger} from './logger';

/**
 * 检测文件是否存在及文件类型
 * 
 * @param {any} srcPath 
 */
const checkPath = srcPath => fs.lstatSync(srcPath);

const readDir = (srcPath, folders = []) => {
    const dirName = srcPath.split('/').pop();
    const directory = fs.readdirSync(srcPath);
    const files = [];
    directory.forEach(name => {
        const path = `${srcPath}/${name}`;
        const stat = checkPath(path);
        if (stat.isFile()) files.push({ name, path, type: mime.lookup(path) });
        else if (stat.isDirectory()) folders.push(readDir(path));
    });
    return { name: dirName, path: srcPath, files, folders };
}

const readProjectFilesServer = (srcPath = '/Users/zhan/Documents/code/vscode/wcode') => {
    try {
        const path = resolve(srcPath);
        if (!checkPath(path).isDirectory()) {
            throw new Error('The given path is not a directory.');
        }

        const result = readDir(path);
        logger('readProjectFiles', path, result);
        return result;
    } catch (e) {
        logger(e);
    }
};

const readFile = (path) => {
    try {
        if (!checkPath(path).isFile()) throw new Error('The given path is not a file.');
        const result = {
            name: path.split('/').pop(),
            path,
            content: fs.readFileSync(path).toString('utf-8'),
            type: mime.lookup(path)
        };
        
        logger("readFile", path, result);
        
        return result;
    } catch(e) {
        onError(ws, e.message);
    }
};


export {readProjectFilesServer, readFile};
