import { from, of } from 'rxjs';
import { delay, concatMap, pairwise } from 'rxjs/operators';

const INTERVAL = 1000;

class MoverService {
    _path = null;

    constructor(path) {
        this._path = path;
    }

    getCurrentPositionObservable() {
        return from(this._path).pipe(
            concatMap(val => of(val).pipe(delay(INTERVAL))),
            pairwise()
        );
    }
}

export default MoverService;
