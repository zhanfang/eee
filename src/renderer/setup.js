/**
 * @file app启动前准备
 * @author zhanfang(fzhanxd@gmail.com)
 */
'use strict'

import * as Stores from './common/stores';
import {registerKeyboardBindings} from './common/utils';

window.addEventListener('resize', () => Stores.view.updateDimensions());
registerKeyboardBindings();
