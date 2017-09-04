/**
 * @file app启动前准备
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'

import * as Stores from './common/stores';

window.addEventListener('resize', () => Stores.view.updateDimensions());
