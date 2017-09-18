import { readFile } from 'mz/fs';
import sasslint from 'sass-lint';

export default class SassLinter {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the linter.
     *
     * @returns {SassLinter}
     */
    constructor() {
        this.options = {};
    }

    /* --- protected --- */

    /* --- eventhandler --- */

    /* --- public --- */

    /**
     * Lints the given sass file using sass-lint.
     *
     * @param {string} filename -
     * @returns {Object}
     */
    async lintFile(filename) {
        const contents = await readFile(filename, 'utf8');
        const file = {
            text: contents,
            format: 'scss',
            filename: filename
        };

        // lint the file
        const results = sasslint.lintText(file, this.options);

        // return the results
        return {
            warningCount: results.warningCount,
            errorCount: results.errorCount,
            filePath: filename,
            messages: results.messages
        };
    }
}
