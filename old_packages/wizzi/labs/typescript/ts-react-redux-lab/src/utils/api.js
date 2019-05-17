import * as tslib_1 from "tslib";
export function callApi(method, url, path, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(url + "/api/" + path, {
                        method: method,
                        headers: {
                            Accept: 'application/json',
                        },
                        body: JSON.stringify(data),
                    })];
                case 1:
                    res = _a.sent();
                    return [4, res.json()];
                case 2: return [2, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=api.js.map