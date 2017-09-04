/**
 * @file 文件夹管理
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'

import { action, observable } from 'mobx';

class ProjectStore {
    
    @observable loading = false;
    
    @observable name = '';
    
    @observable path = '';
    
    @observable content = {};

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