import { readFile } from 'mz/fs';
import { CLIEngine as ESLinter } from 'eslint';

export default class JSLinter {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the linter
     *
     * @return {JSLinter}
     */
    constructor() {
        this.options = {};
        this.eslint = new ESLinter(this.options);
    }

    /* --- protected --- */

    /* --- eventhandler --- */

    /* --- public --- */

    /**
     * Lints the given js file using eslint
     *
     * @param {String} filename
     * @return {Object}
     */
    async lintFile(filename) {
        const contents = await readFile(filename, 'utf8');

        // lint the file
        const { results } = this.eslint.executeOnText(contents);

        // return the results
        return {
            warningCount: results[0].warningCount,
            errorCount: results[0].errorCount,
            filePath: filename,
            messages: results[0].messages
        };
    }
}
