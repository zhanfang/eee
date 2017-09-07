/**
 * @file 文件信息状态管理
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict';

import {
    action,
    computed,
    observable,
    useStrict
} from 'mobx';

useStrict(true);

let indexes = {};

const updateIndexes = (files) => indexes = files.reduce((prev, next, i) => {
    prev[next.path] = i;
    return prev;
}, {});

class FileBufferStore {

    @observable loading = false;

    @observable openedFiles = [];

    @observable activeFilePath = '';

    previousFilePaths = [];

    @computed
    get activeFile() {
        const position = indexes[this.activeFilePath];
        return this.openedFiles[position];
    }

    @computed
    get nextFile() {
        const position = (indexes[this.activeFilePath] + 1) % this.openedFiles.length;
        return this.openedFiles[position];
    }

    @computed
    get previousFile() {
        const position = indexes[this.activeFilePath] - 1;
        return (position > -1) ? this.openedFiles[position] : this.openedFiles[this.openedFiles.length - 1];
    }

    @computed
    get fileStates() {
        return this.openedFiles.map(({name, path}) => ({name, path, active: path === this.activeFilePath}));
    }

    @action
    isLoading(state) {
        this.loading = Boolean(state);
    }

    @action
    selectFile(filePath) {
        if (this.activeFilePath) {
            this.previousFilePaths.push(this.activeFilePath);
        }

        this.activeFilePath = filePath;
    }

    @action
    addToBuffer(file) {
        const position = this.openedFiles.length;
        this.openedFiles.push(file);
        indexes[file.path] = position;
    }

    @action
    close(filePath) {
        this.previousFilePaths = this.previousFilePaths.filter(item => item !== filePath);
        if (this.activeFilePath === filePath) {
            this.activeFilePath = '';
        }

        const position = indexes[filePath];
        this.openedFiles.splice(position, 1);
        delete indexes[filePath];
        updateIndexes(this.openedFiles);
    }

    exists(filePath) {
        return !isNaN(indexes[filePath]);
    }

    lastOpenedFile() {
        return this.previousFilePaths.pop();
    }

    updateCode(filePath, code) {
        const position = indexes[filePath];
        this.openedFiles[position].content = code;
    }

}
export default new FileBufferStore();
