'use babel';

export default {
    activate() {
        atom.workspace.observeTextEditors(editor => {
            editor.onDidChangeSelectionRange(() => {
                this.calculateTimeDiff();
            });
        });
    },

    calculateTimeDiff() {

        const editor = atom.workspace.getActiveTextEditor()
        if (editor) {

            // получаем выделенный текст
            let selection = editor.getLastSelection();

            // ищем регуляркой все времена
            let arrayOfTimes = selection.getText().match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}/gm);

            // если не нашли двух дат то выходим
            if (arrayOfTimes === null || arrayOfTimes.length < 2) {
                this.showInBottomPanel('')
                return
            }

            // получаем верхние и нижнее время (строки)
            let firstTime = arrayOfTimes[0]
            let lastTime = arrayOfTimes[arrayOfTimes.length - 1]

            let time = this.format(this.diff(firstTime, lastTime))
            this.showInBottomPanel(time)
        }
    },

    diff(start, end) {
        // преобразуем строки в объекты Date
        const d1 = new Date(start);
        const d2 = new Date(end);


        // вычисляем разницу в миллисекундах
        const diffMs = Math.abs(d1 - d2);

        // переводим миллисекунды в читаемый формат
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        return {
            days: diffDays,
            hours: diffHours % 24,
            minutes: diffMinutes % 60,
            seconds: diffSeconds % 60
        };
    },

    format(diff) {
        const {days, hours, minutes, seconds} = diff;

        const parts = [];

        // добавляем только ненулевые значения или промежуточные нули
        if (days > 0) {
            parts.push(`${days}d`);
        }
        if (hours > 0 || days > 0) {
            parts.push(`${hours}h`);
        }
        if (minutes > 0 || hours > 0 || days > 0) {
            parts.push(`${minutes}m`);
        }

        // секунды добавляем в любом случае
        parts.push(`${seconds}s`);

        // объединяем части в строку
        return parts.join(" ");
    },

    showInBottomPanel(text) {
        let element = document.querySelector('atom-panel>status-bar>.flexbox-repaint-hack>.status-bar-left>status-bar-time-diff')
        if (element === null) {
            element = document.createElement('status-bar-time-diff');
            let panel = document.querySelector('atom-panel>status-bar>.flexbox-repaint-hack>.status-bar-left');
            panel.appendChild(element)
        }

        element.textContent = text
    }
};
