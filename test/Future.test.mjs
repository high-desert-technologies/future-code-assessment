import { strict as assert } from "node:assert";
import { Future } from "../index.mjs";

describe("Future", async function () {
    it("should pass", async function () {
        const future = new Future();
        let unhandledRejectionListener;
        process.on('unhandledRejection', unhandledRejectionListener = (err) => {
            throw err;
        });
        future.finally(() => {
            assert.deepEqual(future.isRejected(), true);
        });
        assert.rejects(
            function () {
                future.reject(new Error('error 32'));
                return future.promise;
            },
            {
                name: 'Error',
                message: 'error 32'
            }
        );
        setTimeout(() => {
            process.off('unhandledRejection', unhandledRejectionListener)
        }, 0);
    });
});
