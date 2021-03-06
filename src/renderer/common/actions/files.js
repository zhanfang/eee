/**
 * @file 文件及文件夹相关操作
 * @author zhanfang(fzhanxd@gmail.com)
 */

import * as Action from '../actions';
import {project, fileBuffer} from '../stores';
import {
    readProjectFilesServer
    , readFile
    , createFile
    , deleteFileServer
    , updateFileServer
    , createDirectoryServer
    , updateDirectoryServer
    , deleteDirectoryServer
} from '../utils';

let fileTreeHandler = null;

/**
 * Takes an instance of the file tree as input and use it to handle the file creation actions.
 * @param {object} ref - file tree component instance
 * @return {void}
 */
export const setFileTreeHandler = (ref) => fileTreeHandler = ref;

export const readProjectFiles = () => {
    const rootPath = project.rootPath;
    const files = readProjectFilesServer(rootPath);
    project.load(files);
}

export const loadFile = ({ path }) => {
    if (fileBuffer.exists(path)) {
        Action.viewCode(path)
    } else {
        const file = readFile(path);;
        fileBuffer.addToBuffer(file);
        Action.viewCode(file.path);
    }
}

export const closeFile = (filePath) => {
    if (fileBuffer.activeFilePath === filePath) {
        const lastOpenedFile = fileBuffer.lastOpenedFile();
        if (lastOpenedFile) Action.viewCode(lastOpenedFile);
        else Action.cleanCode();
    }
    fileBuffer.close(filePath);
};

export const closeCurrentFile = () => {
    const currentFilePath = fileBuffer.activeFilePath;
    closeFile(currentFilePath);
};

export const closeAllFiles = () => fileBuffer.fileStates.map(({ path }) => closeFile(path));

export const createNewFile = (path) => {
    const file = createFile({ path });
    Action.readProjectFiles();
    fileBuffer.addToBuffer(file);
    Action.viewCode(file.path);
}

export const deleteFile = (file) => {
    const path = deleteFileServer(file);
    fileBuffer.close(path);
    Action.readProjectFiles();
}

export const triggerNewFile = (path = '') => {
    if (!path) {
        path = project.path;
        if (fileBuffer.activeFilePath) {
            path = fileBuffer.activeFilePath.split('/');
            path.pop();
            path = path.join('/');
        }
    }
    fileTreeHandler.createNewElement(path);
};

export const createNewDirectory = (path) => {
    createDirectoryServer({directory: path});
    Action.readProjectFiles();
}

export const triggerNewDirectory = (path = '') => {
    if (!path) {
        path = project.path;
        if (fileBuffer.activeFilePath) {
            path = fileBuffer.activeFilePath.split('/');
            path.pop();
            path = path.join('/');
        }
    }
    fileTreeHandler.createNewElement(path, 'newdirectory');
};

export const deleteDirectory = (directory) => {
    deleteDirectoryServer(directory);
    Action.readProjectFiles();
}

export const saveFile = () => {
    const activeFile = fileBuffer.activeFile;
    if (!activeFile) return;
    const content = Action.getCode();
    updateFileServer({ ...activeFile, content });
};

export const saveAllFiles = () => fileBuffer.openedFiles.map(file => saveFile(file));

export const viewNextFile = () => {
    const nextFile = fileBuffer.nextFile;
    loadFile(nextFile);
};

export const viewPreviousFile = () => {
    const previousFile = fileBuffer.previousFile;
    loadFile(previousFile);
};