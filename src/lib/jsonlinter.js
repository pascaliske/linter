import { readFile } from 'mz/fs';
import jsonlint from 'jsonlint';

export default class JsonLinter {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the linter
     *
     * @return {JsonLinter}
     */
    constructor() {
        this.options = {};
    }

    /* --- protected --- */

    /* --- eventhandler --- */

    /* --- public --- */

    /**
     * Lints the given json file using jsonlint
     *
     * @param {String} filename
     * @return {Object}
     */
    async lintFile(filename) {
        let error = false;
        const contents = await readFile(filename, 'utf8');

        // lint the file and return results
        try {
            jsonlint.parse(contents);
        } catch(err) {
            error = err;
        }

        // return the results
        if (!error) {
            return { warningCount: 0, errorCount: 0 }
        }

        return {
            warningCount: 1,
            errorCount: 1,
            filePath: filename,
            messages: [
                {
                    line: new Number(error.message.match('.+?line\\s(\\d+)')[1]),
                    message: error.message.split('\n').pop()
                }
            ]
        };
    }
}
