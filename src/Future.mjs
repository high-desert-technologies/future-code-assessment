class Future {
    static States = Object.freeze({
        PENDING: Symbol('pending'),
        RESOLVED: Symbol('resolved'),
        REJECTED: Symbol('rejected'),
    });
    #_promise;
    #_resolveFn;
    #_rejectFn;
    #_futureState = Future.States.PENDING;
    constructor() {
        this.#_promise = new Promise((resolve, reject) => {
            this.#_resolveFn = resolve;
            this.#_rejectFn = reject;
        });
    }
    get promise() {
        return this.#_promise;
    }
    /**
     * TODO CHANGE THIS METHOD SO TESTS PASS!
     */
    finally(callback, thisContext) {
        this.#_promise
            .finally(async () => {
                await callback.call(thisContext);
            });
    }
    resolve(value) {
        if (this.isPending()) {
            this.#_futureState = Future.States.RESOLVED;
            this.#_resolveFn(value);
        }
        else {
            throw new Error(`Cannot resolve a previously ${this.#_futureState.description} future.`);
        }
    }
    reject(error) {
        if (this.isPending()) {
            this.#_futureState = Future.States.REJECTED;
            this.#_rejectFn(error);
        }
        else {
            throw new Error(`Cannot reject a previously ${this.#_futureState.description} future.`);
        }
    }
    isPending() {
        if (this.#_futureState === Future.States.PENDING) {
            return true;
        }
        else {
            return false;
        }
    }
    isResolved() {
        if (this.#_futureState === Future.States.RESOLVED) {
            return true;
        }
        else {
            return false;
        }
    }
    isRejected() {
        if (this.#_futureState === Future.States.REJECTED) {
            return true;
        }
        else {
            return false;
        }
    }
}
export { Future };
export default Future;