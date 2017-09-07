/**
 * @file 文件夹管理
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'

import { action, observable, useStrict } from 'mobx';

useStrict(true);

class ProjectStore {

    // 文件夹的根路径
    @observable rootPath = ''
    
    @observable loading = false;
    
    @observable name = '';
    
    @observable path = '';
    
    @observable content = {};

    @action setRootPath(path) {
        this.rootPath = path;
    }

    @action isLoading(state) {
        this.loading = Boolean(state);
    }

    @action load({ name, path, files, folders }) {
        this.name = name;
        this.path = path;
        this.content = { files, folders };
    }
    
    @action unload() {
        this.name = '';
        this.path = '';
        this.content = {};
    }

}
export default new ProjectStore();