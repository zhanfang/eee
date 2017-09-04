import * as Action from '../actions';
import { project, fileBuffer } from '../stores';

let fileTreeHandler = null;

/**
 * Takes an instance of the file tree as input and use it to handle the file creation actions.
 * @param {object} ref - file tree component instance
 * @return {void}
 */
export const setFileTreeHandler = (ref) => fileTreeHandler = ref;

export const loadFile = ({ path }) => (fileBuffer.exists(path)) ?
    Action.viewCode(path) : Writer.readFile({ path });

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

export const createNewFile = (path) => Writer.createFile({ path });

export const deleteFile = (file) => Writer.deleteFile(file);

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

export const createNewDirectory = (path) => Writer.createDirectory({ path });

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

export const deleteDirectory = (directory) => Writer.deleteDirectory(directory);

export const saveFile = () => {
    const activeFile = fileBuffer.activeFile;
    if (!activeFile) return;
    const content = Action.getCode();
    Writer.updateFile({ ...activeFile, content });
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