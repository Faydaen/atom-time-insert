'use babel';

import { CompositeDisposable } from 'atom';

export default {

    moment: null,

    activate(state) {
        this.moment = require('moment')
        this.moment.locale('ru');


        this.subscriptions = new CompositeDisposable()
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-log:insert': () => this.insert(),
            'atom-log:insert-date': () => this.insertDate()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    insert() {
        const editor = atom.workspace.getActiveTextEditor()
        if (editor) {
            let time = this.moment().format("HH:mm:ss")
            editor.insertText(time);
        }
    },

    insertDate() {
        const editor = atom.workspace.getActiveTextEditor()
        if (editor) {
            let time = this.moment().format("D MMMM Y года (dddd)")
            editor.insertText(time);
        }
    }
};
