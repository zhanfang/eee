
import keyboardJS from 'keyboardjs';
import * as Action from '../actions';

const bind = (commands, fn) => keyboardJS.on(commands, (event) => {
    event.preventDefault() || fn();
})

export const registerKeyboardBindings = () => {
    bind(['ctrl + s', 'command + s'], Action.saveFile);
    bind(['ctrl + w'], Action.closeCurrentFile);
    bind(['alt + right'], Action.viewNextFile);
    bind(['alt + left'], Action.viewPreviousFile);
};
