import { from, of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

const INTERVAL = 1000;

class MoverService {
    _path = null;

    constructor(path) {
        this._path = path;
    }

    getCurrentPositionObservable() {
        return from(this._path).pipe(concatMap(val => of(val).pipe(delay(INTERVAL))));
    }
}

export default MoverService;
