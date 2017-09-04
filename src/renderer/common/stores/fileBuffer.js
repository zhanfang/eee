/**
 * @file 文件信息状态管理
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'

import * as mobx from 'mobx';

mobx.useStrict(true);

const { action, computed, observable } = mobx;

let indexes = {};

class FileBufferStore {
    @observable loading = false;
    @observable openedFiles = [];
    @observable activeFilePath = '';

    previousFilePaths = [];

    @computed get activeFile() {
        const position = indexes[this.activeFilePath];
        return this.openedFiles[position];
    }

    @computed get fileStates() {
        return this.openedFiles.map(
            ({ name, path }) => ({ name, path, active: path === this.activeFilePath }));
    }

    @action isLoading(state) {
        this.loading = Boolean(state);
    }

    @action selectFile(filePath) {
        if (this.activeFilePath) {
            this.previousFilePaths.push(this.activeFilePath);
        }
        this.activeFile = filePath;
    }

    @action addToBuffer(file) {
        const position = this.openedFiles.length;
        this.openedFiles.push(file);
        indexes[file.path] = position;
    }

    @action close(filePath) {
        this.previousFilePaths = this.previousFilePaths.filter(item => item !== filePath);
        if (this.activeFilePath === filePath) this.activeFilePath = '';
        const position = indexes[filePath];
        this.openedFiles.splice(position, 1);
        delete indexes[filePath];
        updateIndexes(this.openedFiles);
    }

    exists (filePath) {
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
