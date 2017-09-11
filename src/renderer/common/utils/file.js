/**
 * @file 读取文件及文件夹相关操作
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'
import fs from 'fs';
import mime from 'mime';
import rimraf from 'rimraf';
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

const readProjectFilesServer = (srcPath) => {
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
        logger(e);
    }
};

const createFile = (payload) => {
    try {
        const path = payload.path;
        if (fs.existsSync(path)) throw new Error('A file with this name already exists.');
        const content = ' ';
        fs.appendFileSync(path, content);
        const result = {
            name: path.split('/').pop(),
            path,
            content,
            type: mime.lookup(path)
        };

        logger("createFile", path, result);
        
        return result;
    } catch (e) {
        logger(e);
    }
};

const updateFileServer = (payload) => {
    try {
        const { content, path } = payload.file;
        
        if (!checkPath(path).isFile()) throw new Error('The given path is not a file.');
        
        fs.writeFileSync(path, content);

        logger('updteFileServer', path);
        
        return path;
    } catch(e) {
        logger(e);
    }
};

const deleteFileServer = (payload) => {
    try {
        const { path } = payload;
        if (!checkPath(path).isFile()) throw new Error('The given path does not exist.');
        fs.unlinkSync(path);

        logger('deleteFileServer', path);
        return path;
    } catch (e) {
        logger(e);
    }
};

const createDirectoryServer = (payload) => {
    try {
        const { path } = payload.directory;

        if (fs.existsSync(path)) throw new Error('A directory with this name already exists.');
        fs.mkdirSync(path);

        const result = {
            name: path.split('/').pop(),
            path,
            files: [],
            folders: []
        };

        logger('createDirectoryServer', result);
        return result;
    } catch (e) {
        logger(e)
    }
};

const updateDirectoryServer = (payload) => {
    try {
        const { content, path } = payload.directory;
        
        if (!checkPath(path).isDirectory()) throw new Error('The given path is not a directory.');
        
        throw new Error('Operation not implemented.');
    } catch(e) {
        logger(e);
    }
};

const deleteDirectoryServer = (payload) => {
    try {
        const { path } = payload.directory;
        
        if (!checkPath(path).isDirectory()) throw new Error('The given path does not exist or is not a directory.');
        
        rimraf(path, () => {
            logger('deleteDirectoryServer', path);
            return path;
        });
    } catch (e) {
        logger(e);
    }
};

export {
    readProjectFilesServer
    , readFile
    , createFile
    , updateFileServer
    , deleteFileServer
    , createDirectoryServer
    , updateDirectoryServer
    , deleteDirectoryServer
};
