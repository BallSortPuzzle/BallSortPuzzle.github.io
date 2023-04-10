var YaGames;
(()=>{
    var e = {
        732: (e,t,r)=>{
            "use strict";
            r.d(t, {
                X4: ()=>o,
                Zi: ()=>getCallerName,
                fF: ()=>logSDKError,
                Ts: ()=>logSDKGameError
            });
            r(6373);
            var n = r(2861);
            const o = "YandexSDKLogError";
            function getCallerName(e) {
                var t;
                let r;
                try {
                    throw new Error
                } catch (n) {
                    const o = /(\w+)@|at (.+) \(/g
                      , a = e || n.stack || "";
                    if (a.matchAll) {
                        const e = Array.from(a.matchAll(o)) || [];
                        r = null === (t = e[e.length - 1]) || void 0 === t ? void 0 : t[2]
                    }
                }
                return r
            }
            function logError(e, t, r) {
                var o, a, i;
                const s = function getErrorData(e) {
                    var t, r;
                    const n = {
                        columnNumber: null !== (t = e.columnNumber) && void 0 !== t ? t : -1,
                        fileName: e.fileName || "",
                        lineNumber: null !== (r = e.lineNumber) && void 0 !== r ? r : -1,
                        name: e.name || "Error",
                        message: e.message || String(e),
                        stack: e.stack || ""
                    };
                    return e.additional && (n.additional = Object.assign({}, e.additional)),
                    n
                }(t);
                r.message && (s.message = r.message),
                r.prefix && (s.message = "".concat(r.prefix, " ").concat(s.message)),
                n.Z[window.YaGames ? "postToParent" : "post"]({
                    data: {
                        error: s,
                        level: null !== (o = r.level) && void 0 !== o ? o : "error",
                        source: e,
                        sourceMethod: null !== (a = r.sourceMethod) && void 0 !== a ? a : getCallerName(s.stack),
                        type: null !== (i = r.type) && void 0 !== i ? i : "error"
                    },
                    type: "error"
                }).catch(console.warn)
            }
            function logSDKError(e, t={}) {
                logError("sdk", e, t),
                console.warn(e)
            }
            function logSDKGameError(e, t={}) {
                logError("sdk-game", e, t),
                console.error(e, o)
            }
        }
        ,
        7114: (e,t,r)=>{
            "use strict";
            r.d(t, {
                Z: ()=>n
            });
            class FetchError extends Error {
                constructor({code: e, httpStatus: t, message: r}, n, o) {
                    super(r, n, o),
                    this.name = "FetchError",
                    this.code = e,
                    this.httpStatus = t,
                    Object.setPrototypeOf(this, FetchError.prototype),
                    Error.captureStackTrace && Error.captureStackTrace(this, FetchError)
                }
                toJSON() {
                    return {
                        code: this.code,
                        httpStatus: this.httpStatus,
                        message: this.message,
                        name: this.name,
                        stack: this.stack
                    }
                }
            }
            const n = FetchError
        }
        ,
        1420: (e,t,r)=>{
            "use strict";
            r.d(t, {
                Z: ()=>n
            });
            class PaymentsError extends Error {
                constructor({code: e, httpStatus: t, message: r}, n, o) {
                    super(r, n, o),
                    this.name = "PaymentsError",
                    this.code = e,
                    this.httpStatus = t,
                    Object.setPrototypeOf(this, PaymentsError.prototype),
                    Error.captureStackTrace && Error.captureStackTrace(this, PaymentsError)
                }
                toJSON() {
                    return {
                        code: this.code,
                        httpStatus: this.httpStatus,
                        message: this.message,
                        name: this.name,
                        stack: this.stack
                    }
                }
            }
            const n = PaymentsError
        }
        ,
        2861: (e,t,r)=>{
            "use strict";
            r.d(t, {
                Z: ()=>u
            });
            r(6992),
            r(3948),
            r(8674);
            var n = r(732);
            class auth_error_AuthError extends Error {
                constructor({code: e, message: t}, r, n) {
                    super(t, r, n),
                    this.name = "AuthError",
                    this.code = e,
                    Object.setPrototypeOf(this, auth_error_AuthError.prototype),
                    Error.captureStackTrace && Error.captureStackTrace(this, auth_error_AuthError)
                }
                toJSON() {
                    return {
                        code: this.code,
                        message: this.message,
                        name: this.name,
                        stack: this.stack
                    }
                }
            }
            const o = auth_error_AuthError;
            var a = r(7114)
              , i = r(1420);
            const s = {
                AuthError: o,
                FetchError: a.Z,
                PaymentsError: i.Z
            };
            r(4916),
            r(5306);
            function isUnitedPage() {
                return "object" == typeof window && !1
            }
            const c = new class Messaging {
                constructor() {
                    this._promises = Object.create(null),
                    this._externalListeners = Object.create(null),
                    this._internalListeners = Object.create(null),
                    this.receivedMessages = [],
                    this._addEventListener()
                }
                get _parentTarget() {
                    return window.parent !== window ? window.parent : void 0
                }
                get _gameFrame() {
                    const e = function getGameFrame() {
                        const e = window.YandexGamesSDK && window.YandexGamesSDK.FRAME_ID;
                        if (e && "string" == typeof e) {
                            const t = document.getElementById(e);
                            if (t)
                                return t
                        }
                    }();
                    return e || console.warn("No frame to post"),
                    e
                }
                get _gameFrameAllowedOrigin() {
                    var e;
                    return null === (e = this._gameFrame) || void 0 === e ? void 0 : e.dataset.allowedOrigin
                }
                get _childTarget() {
                    var e;
                    return null === (e = this._gameFrame) || void 0 === e ? void 0 : e.contentWindow
                }
                _addEventListener() {
                    window.addEventListener("message", (e=>{
                        const {action: t, source: r, type: o, uuid: a} = e.data || {};
                        if ("YandexGamesSDK" === r)
                            return isUnitedPage() && window !== window.parent && e.source === window.parent && e.origin === window.location.origin ? (this.post(e.data),
                            void ("messaging" === o && "confirm" === t ? this.receivedMessages.push(a) : a && c.postToParent({
                                type: "messaging",
                                action: "confirm",
                                uuid: a
                            }))) : void (window.top === window && this._gameFrameAllowedOrigin && this._gameFrameAllowedOrigin !== e.origin ? (0,
                            n.fF)(new Error('Ignore message. event.origin = "'.concat(e.origin, '" is not allowed.'))) : this._handleEvent(e))
                    }
                    ))
                }
                _handleEvent(e) {
                    const {type: t, action: r, messageId: o, originMessageId: a, payload: i, originPayload: c, data: u, error: l, errorJSON: p} = e.data || {}
                      , d = this._promises[a];
                    d && (delete this._promises[a],
                    void 0 === l ? d.resolve({
                        type: t,
                        action: r,
                        originPayload: c,
                        data: u
                    }) : d.reject(function createErrorInstance({error: e, errorJSON: t}) {
                        let r;
                        if (t)
                            try {
                                r = JSON.parse(t)
                            } catch (o) {
                                (0,
                                n.fF)(o)
                            }
                        return r && r.name in s ? new s[r.name](r) : new Error(e)
                    }({
                        error: l,
                        errorJSON: p
                    })));
                    const sendCallback = (e={})=>{
                        const n = {
                            type: e.type || t,
                            action: e.action || r,
                            originMessageId: o,
                            originPayload: i,
                            data: e.data || {}
                        };
                        !function setMessageDataError(e, t) {
                            t.error && (e.error = String(t.error.message) || null,
                            e.errorJSON = JSON.stringify(t.error) || null)
                        }(n, e),
                        this.postCallbackToChild(n)
                    }
                    ;
                    const f = this._externalListeners[t] || [];
                    for (const s of f)
                        try {
                            s(e, sendCallback)
                        } catch (h) {
                            (0,
                            n.fF)(h)
                        }
                }
                on(e, t) {
                    console.warn("Deprecated. Use `onExternalMessage` or `onInternalMessage`"),
                    this.onExternalMessage(e, t)
                }
                onAllMessages(e, t) {
                    this.onExternalMessage(e, t),
                    this.onInternalMessage(e, t)
                }
                onExternalMessage(e, t) {
                    this._onMessage(this._externalListeners, e, t)
                }
                offExternalMessage(e, t) {
                    this._offMessage(this._externalListeners, e, t)
                }
                onInternalMessage(e, t) {
                    this._onMessage(this._internalListeners, e, t)
                }
                offInternalMessage(e, t) {
                    this._offMessage(this._internalListeners, e, t)
                }
                _onMessage(e, t, r) {
                    if ("string" == typeof t && (t = [t]),
                    !Array.isArray(t))
                        throw new Error('Wrong argument "types"');
                    for (const n of t)
                        n in e || (e[n] = []),
                        e[n].push(r)
                }
                _offMessage(e, t, r) {
                    if ("string" == typeof t && (t = [t]),
                    !Array.isArray(t))
                        throw new Error('Wrong argument "types"');
                    for (const n of t)
                        n in e && (e[n] = e[n].filter((e=>e !== r)))
                }
                post(e) {
                    const {action: t, type: r} = e;
                    return new Promise((o=>{
                        const a = "".concat(Date.now(), "-").concat(Math.random())
                          , sendCallback = (e={})=>{
                            const n = {
                                action: e.action || t,
                                data: e.data || {},
                                errorInstance: e.error,
                                originMessageId: a,
                                type: e.type || r
                            };
                            o(n)
                        }
                          , i = this._internalListeners[r] || [];
                        for (const t of i)
                            try {
                                t({
                                    data: Object.assign({}, e)
                                }, sendCallback)
                            } catch (s) {
                                (0,
                                n.fF)(s)
                            }
                    }
                    ))
                }
                postToParent(e) {
                    // return false;
                    // const t = this._parentTarget;
                    const t = null;
                    // console.log("--fx--", t);
                    return t ? (!isUnitedPage() || "messaging" === e.type && "confirm" === e.action || (e.uuid = Math.random().toString(36).substring(2, 15),
                    setTimeout((()=>{
                        e.uuid && !this.receivedMessages.includes(e.uuid) && this.postToParent(e)
                    }
                    ), 500)),
                    this._post(t, e)) : Promise.reject(new Error("No parent to post message"))
                }
                hasChild() {
                    return Boolean(this._childTarget)
                }
                postToChild(e) {
                    const t = this._childTarget;
                    return t ? this._post(t, e) : Promise.reject(new Error("No child to post message"))
                }
                postCallbackToChild(e) {
                    const t = this._childTarget;
                    return t ? this._post(t, e) : Promise.reject(new Error("No child to post message"))
                }
                _post(e, t) {
                    const r = Date.now()
                      , n = "".concat(r, "-").concat(Math.random());
                    t = Object.assign({}, t, {
                        source: "YandexGamesSDK",
                        messageId: n
                    });
                    let resolve = e=>{}
                      , reject = e=>{}
                    ;
                    const o = new Promise(((e,t)=>{
                        resolve = e,
                        reject = t
                    }
                    ));
                    this._promises[n] = {
                        promise: o,
                        resolve,
                        reject,
                        time: r
                    };
                    try {
                        e.postMessage(t, "*")
                    } catch (a) {
                        return delete this._promises[n],
                        Promise.reject(a)
                    }
                    return o
                }
            }
              , u = c
        }
        ,
        6085: (e,t,r)=>{
            "use strict";
            r.d(t, {
                $g: ()=>appendApplicationIdParam,
                rh: ()=>getAppId,
                mv: ()=>isDraft
            });
            r(4916),
            r(6992),
            r(3948),
            r(285);
            var n = r(208)
              , o = r(8059);
            r(6373);
            Object.create;
            Object.create;
            const isRumAvailable = ()=>{
                var e;
                return Boolean("undefined" != typeof window && (null === (e = null === window || void 0 === window ? void 0 : window.Ya) || void 0 === e ? void 0 : e.Rum))
            }
              , isRumErrorAvailable = ()=>{
                var e, t;
                return Boolean(isRumAvailable() && (null === (t = null === (e = window.Ya) || void 0 === e ? void 0 : e.Rum) || void 0 === t ? void 0 : t.logError))
            }
            ;
            function getCallerName() {
                var e, t, r;
                try {
                    throw new Error
                } catch (n) {
                    const o = /(\w+)@|at (.+) \(/g
                      , a = n.stack || "";
                    if (a.matchAll) {
                        const n = Array.from(a.matchAll(o)) || [];
                        return (null === (e = n[2]) || void 0 === e ? void 0 : e[2]) || (null === (t = n[1]) || void 0 === t ? void 0 : t[2]) || (null === (r = n[0]) || void 0 === r ? void 0 : r[2])
                    }
                    return
                }
            }
            const logError = function(e, t) {
                var r, n, o, a;
                if (!isRumErrorAvailable())
                    return;
                let {additional: i, message: s, level: c, sourceMethod: u} = e
                  , l = function __rest(e, t) {
                    var r = {};
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
                    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                        var o = 0;
                        for (n = Object.getOwnPropertySymbols(e); o < n.length; o++)
                            t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]])
                    }
                    return r
                }(e, ["additional", "message", "level", "sourceMethod"]);
                s = s || (null == t ? void 0 : t.message) || String(e),
                c = c || (null === (n = null === (r = window.Ya) || void 0 === r ? void 0 : r.Rum) || void 0 === n ? void 0 : n.ERROR_LEVEL.ERROR) || "error",
                t = t || e;
                const p = Object.assign({
                    additional: i,
                    ignoreErrorMessage: !0,
                    level: c,
                    message: s,
                    source: "catalog",
                    sourceMethod: u || getCallerName()
                }, l);
                null === (a = null === (o = window.Ya) || void 0 === o ? void 0 : o.Rum) || void 0 === a || a.logError(p, t)
            };
            const a = /^(?:https:\/\/app-([^.]+)\.games\.s3\.yandex\.net\/|https:\/\/games\.s3\.mdst\.yandex\.net\/([^/]+)\/|https:\/\/(?:.+\.)*yandex\.(?:ru|by|kz|ua|uz|com|com\.tr|az|co\.il|com\.am|com\.ge|ee|fi|fr|lt|lv|md|pl|tj|tm)\/games\/play\/([^/?&#]+))/;
            function appendApplicationIdParam(e) {
                const t = {};
                isDraft() && (t.draft = "true");
                const r = getAppId();
                return r && (t["app-id"] = r),
                (0,
                n.Z)({
                    url: e,
                    params: t
                })
            }
            function getAppId() {
                var e, t;
                if (window.YandexGamesSDK && window.YandexGamesSDK.environment)
                    return window.YandexGamesSDK.environment.app.id;
                if (window.YandexGamesSDKEnvironment)
                    return window.YandexGamesSDKEnvironment.app.id;
                console.warn("Can't get app id from `window.YandexGamesSDKEnvironment`"),
                logError({
                    level: null === (t = null === (e = window.Ya) || void 0 === e ? void 0 : e.Rum) || void 0 === t ? void 0 : t.ERROR_LEVEL.WARN
                }, new Error("Old way: get app id from location"));
                const r = String(window.location).match(a);
                if (r)
                    return r[1] || r[2] || r[3];
                return (0,
                o.Z)(window.location)["app-id"] || ""
            }
            function isDraft() {
                return "true" === (0,
                o.Z)(window.location).draft
            }
        }
        ,
        4089: (e,t,r)=>{
            "use strict";
            r.r(t),
            r.d(t, {
                default: ()=>s
            });
            var n = r(732)
              , o = r(2861)
              , a = r(6085);
            const i = Object.create(null)
              , s = {
                init() {},
                sendOnceDeprecatedUsage(e) {
                    e in i || (i[e] = 1,
                    this.params({
                        borrowParams: {
                            sdkDeprecatedUsage: {
                                key: e,
                                appId: (0,
                                a.rh)()
                            }
                        }
                    }))
                },
                params(e) {
                    o.Z.postToParent({
                        type: "metrika",
                        action: "params",
                        data: e
                    }).catch((e=>{
                        (0,
                        n.fF)(e)
                    }
                    ))
                },
                reachGoal(e, t) {
                    o.Z.postToParent({
                        type: "metrika",
                        action: "reachGoal",
                        data: {
                            data: t,
                            goal: e
                        }
                    }).catch((e=>{
                        (0,
                        n.fF)(e)
                    }
                    ))
                }
            }
        }
        ,
        208: (e,t,r)=>{
            "use strict";
            r.d(t, {
                Z: ()=>addGetParams
            });
            r(4916),
            r(6992),
            r(3948);
            function addGetParams(e) {
                const {url: t, params: r={}, hash: n={}, removed: o=[], encoded: a=!0} = e;
                if (!t)
                    throw new Error("addGetParams: function has no url");
                const i = t.split("#")
                  , s = i[0].split("?");
                let c = getParamStr(s, r, a, o)
                  , u = getParamStr(i, n, a, o);
                return c && (c = "?".concat(c)),
                u && (u = "#".concat(u)),
                "".concat(s[0]).concat(c).concat(u)
            }
            function getParamStr(e, t, r, n) {
                return e.length > 1 && e[1].length && e[1].split("&").forEach((e=>{
                    const [r,n] = e.split("=");
                    t[r] || (t[r] = n)
                }
                )),
                Object.keys(t).filter((e=>!n.includes(e))).map((e=>"".concat(e, "=").concat(r ? encodeURIComponent(t[e]) : t[e]))).join("&")
            }
        }
        ,
        8059: (e,t,r)=>{
            "use strict";
            r.d(t, {
                Z: ()=>parseLocation
            });
            r(4916),
            r(5306),
            r(6992),
            r(3948);
            function parseLocation(e, t=!0) {
                const r = Object.create(null);
                return [e.hash.replace(/^#/, ""), e.search.replace(/^\?/, "")].join("&").split("&").forEach((e=>{
                    const [n,o] = e.split("=");
                    try {
                        r[n] = t ? decodeURIComponent(o) : o
                    } catch (a) {
                        console.warn(a)
                    }
                }
                )),
                r
            }
        }
        ,
        3099: e=>{
            e.exports = function(e) {
                if ("function" != typeof e)
                    throw TypeError(String(e) + " is not a function");
                return e
            }
        }
        ,
        6077: (e,t,r)=>{
            var n = r(111);
            e.exports = function(e) {
                if (!n(e) && null !== e)
                    throw TypeError("Can't set " + String(e) + " as a prototype");
                return e
            }
        }
        ,
        1223: (e,t,r)=>{
            var n = r(5112)
              , o = r(30)
              , a = r(3070)
              , i = n("unscopables")
              , s = Array.prototype;
            null == s[i] && a.f(s, i, {
                configurable: !0,
                value: o(null)
            }),
            e.exports = function(e) {
                s[i][e] = !0
            }
        }
        ,
        1530: (e,t,r)=>{
            "use strict";
            var n = r(8710).charAt;
            e.exports = function(e, t, r) {
                return t + (r ? n(e, t).length : 1)
            }
        }
        ,
        5787: e=>{
            e.exports = function(e, t, r) {
                if (!(e instanceof t))
                    throw TypeError("Incorrect " + (r ? r + " " : "") + "invocation");
                return e
            }
        }
        ,
        9670: (e,t,r)=>{
            var n = r(111);
            e.exports = function(e) {
                if (!n(e))
                    throw TypeError(String(e) + " is not an object");
                return e
            }
        }
        ,
        4019: e=>{
            e.exports = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView
        }
        ,
        260: (e,t,r)=>{
            "use strict";
            var n, o = r(4019), a = r(9781), i = r(7854), s = r(111), c = r(6656), u = r(648), l = r(8880), p = r(1320), d = r(3070).f, f = r(9518), h = r(7674), g = r(5112), _ = r(9711), v = i.Int8Array, m = v && v.prototype, y = i.Uint8ClampedArray, b = y && y.prototype, w = v && f(v), E = m && f(m), A = Object.prototype, S = A.isPrototypeOf, P = g("toStringTag"), O = _("TYPED_ARRAY_TAG"), x = o && !!h && "Opera" !== u(i.opera), T = !1, k = {
                Int8Array: 1,
                Uint8Array: 1,
                Uint8ClampedArray: 1,
                Int16Array: 2,
                Uint16Array: 2,
                Int32Array: 4,
                Uint32Array: 4,
                Float32Array: 4,
                Float64Array: 8
            }, C = {
                BigInt64Array: 8,
                BigUint64Array: 8
            }, isTypedArray = function(e) {
                if (!s(e))
                    return !1;
                var t = u(e);
                return c(k, t) || c(C, t)
            };
            for (n in k)
                i[n] || (x = !1);
            if ((!x || "function" != typeof w || w === Function.prototype) && (w = function TypedArray() {
                throw TypeError("Incorrect invocation")
            }
            ,
            x))
                for (n in k)
                    i[n] && h(i[n], w);
            if ((!x || !E || E === A) && (E = w.prototype,
            x))
                for (n in k)
                    i[n] && h(i[n].prototype, E);
            if (x && f(b) !== E && h(b, E),
            a && !c(E, P))
                for (n in T = !0,
                d(E, P, {
                    get: function() {
                        return s(this) ? this[O] : void 0
                    }
                }),
                k)
                    i[n] && l(i[n], O, n);
            e.exports = {
                NATIVE_ARRAY_BUFFER_VIEWS: x,
                TYPED_ARRAY_TAG: T && O,
                aTypedArray: function(e) {
                    if (isTypedArray(e))
                        return e;
                    throw TypeError("Target is not a typed array")
                },
                aTypedArrayConstructor: function(e) {
                    if (h) {
                        if (S.call(w, e))
                            return e
                    } else
                        for (var t in k)
                            if (c(k, n)) {
                                var r = i[t];
                                if (r && (e === r || S.call(r, e)))
                                    return e
                            }
                    throw TypeError("Target is not a typed array constructor")
                },
                exportTypedArrayMethod: function(e, t, r) {
                    if (a) {
                        if (r)
                            for (var n in k) {
                                var o = i[n];
                                o && c(o.prototype, e) && delete o.prototype[e]
                            }
                        E[e] && !r || p(E, e, r ? t : x && m[e] || t)
                    }
                },
                exportTypedArrayStaticMethod: function(e, t, r) {
                    var n, o;
                    if (a) {
                        if (h) {
                            if (r)
                                for (n in k)
                                    (o = i[n]) && c(o, e) && delete o[e];
                            if (w[e] && !r)
                                return;
                            try {
                                return p(w, e, r ? t : x && v[e] || t)
                            } catch (s) {}
                        }
                        for (n in k)
                            !(o = i[n]) || o[e] && !r || p(o, e, t)
                    }
                },
                isView: function isView(e) {
                    if (!s(e))
                        return !1;
                    var t = u(e);
                    return "DataView" === t || c(k, t) || c(C, t)
                },
                isTypedArray,
                TypedArray: w,
                TypedArrayPrototype: E
            }
        }
        ,
        3331: (e,t,r)=>{
            "use strict";
            var n = r(7854)
              , o = r(9781)
              , a = r(4019)
              , i = r(8880)
              , s = r(2248)
              , c = r(7293)
              , u = r(5787)
              , l = r(9958)
              , p = r(7466)
              , d = r(7067)
              , f = r(1179)
              , h = r(9518)
              , g = r(7674)
              , _ = r(8006).f
              , v = r(3070).f
              , m = r(6493)
              , y = r(8003)
              , b = r(9909)
              , w = b.get
              , E = b.set
              , A = "ArrayBuffer"
              , S = "DataView"
              , P = "Wrong index"
              , O = n.ArrayBuffer
              , x = O
              , T = n.DataView
              , k = T && T.prototype
              , C = Object.prototype
              , L = n.RangeError
              , I = f.pack
              , R = f.unpack
              , packInt8 = function(e) {
                return [255 & e]
            }
              , packInt16 = function(e) {
                return [255 & e, e >> 8 & 255]
            }
              , packInt32 = function(e) {
                return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
            }
              , unpackInt32 = function(e) {
                return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
            }
              , packFloat32 = function(e) {
                return I(e, 23, 4)
            }
              , packFloat64 = function(e) {
                return I(e, 52, 8)
            }
              , addGetter = function(e, t) {
                v(e.prototype, t, {
                    get: function() {
                        return w(this)[t]
                    }
                })
            }
              , get = function(e, t, r, n) {
                var o = d(r)
                  , a = w(e);
                if (o + t > a.byteLength)
                    throw L(P);
                var i = w(a.buffer).bytes
                  , s = o + a.byteOffset
                  , c = i.slice(s, s + t);
                return n ? c : c.reverse()
            }
              , set = function(e, t, r, n, o, a) {
                var i = d(r)
                  , s = w(e);
                if (i + t > s.byteLength)
                    throw L(P);
                for (var c = w(s.buffer).bytes, u = i + s.byteOffset, l = n(+o), p = 0; p < t; p++)
                    c[u + p] = l[a ? p : t - p - 1]
            };
            if (a) {
                if (!c((function() {
                    O(1)
                }
                )) || !c((function() {
                    new O(-1)
                }
                )) || c((function() {
                    return new O,
                    new O(1.5),
                    new O(NaN),
                    O.name != A
                }
                ))) {
                    for (var D, M = (x = function ArrayBuffer(e) {
                        return u(this, x),
                        new O(d(e))
                    }
                    ).prototype = O.prototype, U = _(O), j = 0; U.length > j; )
                        (D = U[j++])in x || i(x, D, O[D]);
                    M.constructor = x
                }
                g && h(k) !== C && g(k, C);
                var N = new T(new x(2))
                  , G = k.setInt8;
                N.setInt8(0, 2147483648),
                N.setInt8(1, 2147483649),
                !N.getInt8(0) && N.getInt8(1) || s(k, {
                    setInt8: function setInt8(e, t) {
                        G.call(this, e, t << 24 >> 24)
                    },
                    setUint8: function setUint8(e, t) {
                        G.call(this, e, t << 24 >> 24)
                    }
                }, {
                    unsafe: !0
                })
            } else
                x = function ArrayBuffer(e) {
                    u(this, x, A);
                    var t = d(e);
                    E(this, {
                        bytes: m.call(new Array(t), 0),
                        byteLength: t
                    }),
                    o || (this.byteLength = t)
                }
                ,
                T = function DataView(e, t, r) {
                    u(this, T, S),
                    u(e, x, S);
                    var n = w(e).byteLength
                      , a = l(t);
                    if (a < 0 || a > n)
                        throw L("Wrong offset");
                    if (a + (r = void 0 === r ? n - a : p(r)) > n)
                        throw L("Wrong length");
                    E(this, {
                        buffer: e,
                        byteLength: r,
                        byteOffset: a
                    }),
                    o || (this.buffer = e,
                    this.byteLength = r,
                    this.byteOffset = a)
                }
                ,
                o && (addGetter(x, "byteLength"),
                addGetter(T, "buffer"),
                addGetter(T, "byteLength"),
                addGetter(T, "byteOffset")),
                s(T.prototype, {
                    getInt8: function getInt8(e) {
                        return get(this, 1, e)[0] << 24 >> 24
                    },
                    getUint8: function getUint8(e) {
                        return get(this, 1, e)[0]
                    },
                    getInt16: function getInt16(e) {
                        var t = get(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
                        return (t[1] << 8 | t[0]) << 16 >> 16
                    },
                    getUint16: function getUint16(e) {
                        var t = get(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
                        return t[1] << 8 | t[0]
                    },
                    getInt32: function getInt32(e) {
                        return unpackInt32(get(this, 4, e, arguments.length > 1 ? arguments[1] : void 0))
                    },
                    getUint32: function getUint32(e) {
                        return unpackInt32(get(this, 4, e, arguments.length > 1 ? arguments[1] : void 0)) >>> 0
                    },
                    getFloat32: function getFloat32(e) {
                        return R(get(this, 4, e, arguments.length > 1 ? arguments[1] : void 0), 23)
                    },
                    getFloat64: function getFloat64(e) {
                        return R(get(this, 8, e, arguments.length > 1 ? arguments[1] : void 0), 52)
                    },
                    setInt8: function setInt8(e, t) {
                        set(this, 1, e, packInt8, t)
                    },
                    setUint8: function setUint8(e, t) {
                        set(this, 1, e, packInt8, t)
                    },
                    setInt16: function setInt16(e, t) {
                        set(this, 2, e, packInt16, t, arguments.length > 2 ? arguments[2] : void 0)
                    },
                    setUint16: function setUint16(e, t) {
                        set(this, 2, e, packInt16, t, arguments.length > 2 ? arguments[2] : void 0)
                    },
                    setInt32: function setInt32(e, t) {
                        set(this, 4, e, packInt32, t, arguments.length > 2 ? arguments[2] : void 0)
                    },
                    setUint32: function setUint32(e, t) {
                        set(this, 4, e, packInt32, t, arguments.length > 2 ? arguments[2] : void 0)
                    },
                    setFloat32: function setFloat32(e, t) {
                        set(this, 4, e, packFloat32, t, arguments.length > 2 ? arguments[2] : void 0)
                    },
                    setFloat64: function setFloat64(e, t) {
                        set(this, 8, e, packFloat64, t, arguments.length > 2 ? arguments[2] : void 0)
                    }
                });
            y(x, A),
            y(T, S),
            e.exports = {
                ArrayBuffer: x,
                DataView: T
            }
        }
        ,
        6493: (e,t,r)=>{
            "use strict";
            var n = r(7908)
              , o = r(1400)
              , a = r(7466);
            e.exports = function fill(e) {
                for (var t = n(this), r = a(t.length), i = arguments.length, s = o(i > 1 ? arguments[1] : void 0, r), c = i > 2 ? arguments[2] : void 0, u = void 0 === c ? r : o(c, r); u > s; )
                    t[s++] = e;
                return t
            }
        }
        ,
        8457: (e,t,r)=>{
            "use strict";
            var n = r(9974)
              , o = r(7908)
              , a = r(3411)
              , i = r(7659)
              , s = r(7466)
              , c = r(6135)
              , u = r(1246);
            e.exports = function from(e) {
                var t, r, l, p, d, f, h = o(e), g = "function" == typeof this ? this : Array, _ = arguments.length, v = _ > 1 ? arguments[1] : void 0, m = void 0 !== v, y = u(h), b = 0;
                if (m && (v = n(v, _ > 2 ? arguments[2] : void 0, 2)),
                null == y || g == Array && i(y))
                    for (r = new g(t = s(h.length)); t > b; b++)
                        f = m ? v(h[b], b) : h[b],
                        c(r, b, f);
                else
                    for (d = (p = y.call(h)).next,
                    r = new g; !(l = d.call(p)).done; b++)
                        f = m ? a(p, v, [l.value, b], !0) : l.value,
                        c(r, b, f);
                return r.length = b,
                r
            }
        }
        ,
        1318: (e,t,r)=>{
            var n = r(5656)
              , o = r(7466)
              , a = r(1400)
              , createMethod = function(e) {
                return function(t, r, i) {
                    var s, c = n(t), u = o(c.length), l = a(i, u);
                    if (e && r != r) {
                        for (; u > l; )
                            if ((s = c[l++]) != s)
                                return !0
                    } else
                        for (; u > l; l++)
                            if ((e || l in c) && c[l] === r)
                                return e || l || 0;
                    return !e && -1
                }
            };
            e.exports = {
                includes: createMethod(!0),
                indexOf: createMethod(!1)
            }
        }
        ,
        2092: (e,t,r)=>{
            var n = r(9974)
              , o = r(8361)
              , a = r(7908)
              , i = r(7466)
              , s = r(5417)
              , c = [].push
              , createMethod = function(e) {
                var t = 1 == e
                  , r = 2 == e
                  , u = 3 == e
                  , l = 4 == e
                  , p = 6 == e
                  , d = 7 == e
                  , f = 5 == e || p;
                return function(h, g, _, v) {
                    for (var m, y, b = a(h), w = o(b), E = n(g, _, 3), A = i(w.length), S = 0, P = v || s, O = t ? P(h, A) : r || d ? P(h, 0) : void 0; A > S; S++)
                        if ((f || S in w) && (y = E(m = w[S], S, b),
                        e))
                            if (t)
                                O[S] = y;
                            else if (y)
                                switch (e) {
                                case 3:
                                    return !0;
                                case 5:
                                    return m;
                                case 6:
                                    return S;
                                case 2:
                                    c.call(O, m)
                                }
                            else
                                switch (e) {
                                case 4:
                                    return !1;
                                case 7:
                                    c.call(O, m)
                                }
                    return p ? -1 : u || l ? l : O
                }
            };
            e.exports = {
                forEach: createMethod(0),
                map: createMethod(1),
                filter: createMethod(2),
                some: createMethod(3),
                every: createMethod(4),
                find: createMethod(5),
                findIndex: createMethod(6),
                filterOut: createMethod(7)
            }
        }
        ,
        9341: (e,t,r)=>{
            "use strict";
            var n = r(7293);
            e.exports = function(e, t) {
                var r = [][e];
                return !!r && n((function() {
                    r.call(null, t || function() {
                        throw 1
                    }
                    , 1)
                }
                ))
            }
        }
        ,
        3671: (e,t,r)=>{
            var n = r(3099)
              , o = r(7908)
              , a = r(8361)
              , i = r(7466)
              , createMethod = function(e) {
                return function(t, r, s, c) {
                    n(r);
                    var u = o(t)
                      , l = a(u)
                      , p = i(u.length)
                      , d = e ? p - 1 : 0
                      , f = e ? -1 : 1;
                    if (s < 2)
                        for (; ; ) {
                            if (d in l) {
                                c = l[d],
                                d += f;
                                break
                            }
                            if (d += f,
                            e ? d < 0 : p <= d)
                                throw TypeError("Reduce of empty array with no initial value")
                        }
                    for (; e ? d >= 0 : p > d; d += f)
                        d in l && (c = r(c, l[d], d, u));
                    return c
                }
            };
            e.exports = {
                left: createMethod(!1),
                right: createMethod(!0)
            }
        }
        ,
        5417: (e,t,r)=>{
            var n = r(111)
              , o = r(3157)
              , a = r(5112)("species");
            e.exports = function(e, t) {
                var r;
                return o(e) && ("function" != typeof (r = e.constructor) || r !== Array && !o(r.prototype) ? n(r) && null === (r = r[a]) && (r = void 0) : r = void 0),
                new (void 0 === r ? Array : r)(0 === t ? 0 : t)
            }
        }
        ,
        3411: (e,t,r)=>{
            var n = r(9670)
              , o = r(9212);
            e.exports = function(e, t, r, a) {
                try {
                    return a ? t(n(r)[0], r[1]) : t(r)
                } catch (i) {
                    throw o(e),
                    i
                }
            }
        }
        ,
        7072: (e,t,r)=>{
            var n = r(5112)("iterator")
              , o = !1;
            try {
                var a = 0
                  , i = {
                    next: function() {
                        return {
                            done: !!a++
                        }
                    },
                    return: function() {
                        o = !0
                    }
                };
                i[n] = function() {
                    return this
                }
                ,
                Array.from(i, (function() {
                    throw 2
                }
                ))
            } catch (s) {}
            e.exports = function(e, t) {
                if (!t && !o)
                    return !1;
                var r = !1;
                try {
                    var a = {};
                    a[n] = function() {
                        return {
                            next: function() {
                                return {
                                    done: r = !0
                                }
                            }
                        }
                    }
                    ,
                    e(a)
                } catch (s) {}
                return r
            }
        }
        ,
        4326: e=>{
            var t = {}.toString;
            e.exports = function(e) {
                return t.call(e).slice(8, -1)
            }
        }
        ,
        648: (e,t,r)=>{
            var n = r(1694)
              , o = r(4326)
              , a = r(5112)("toStringTag")
              , i = "Arguments" == o(function() {
                return arguments
            }());
            e.exports = n ? o : function(e) {
                var t, r, n;
                return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (r = function(e, t) {
                    try {
                        return e[t]
                    } catch (r) {}
                }(t = Object(e), a)) ? r : i ? o(t) : "Object" == (n = o(t)) && "function" == typeof t.callee ? "Arguments" : n
            }
        }
        ,
        9920: (e,t,r)=>{
            var n = r(6656)
              , o = r(3887)
              , a = r(1236)
              , i = r(3070);
            e.exports = function(e, t) {
                for (var r = o(t), s = i.f, c = a.f, u = 0; u < r.length; u++) {
                    var l = r[u];
                    n(e, l) || s(e, l, c(t, l))
                }
            }
        }
        ,
        8544: (e,t,r)=>{
            var n = r(7293);
            e.exports = !n((function() {
                function F() {}
                return F.prototype.constructor = null,
                Object.getPrototypeOf(new F) !== F.prototype
            }
            ))
        }
        ,
        4994: (e,t,r)=>{
            "use strict";
            var n = r(3383).IteratorPrototype
              , o = r(30)
              , a = r(9114)
              , i = r(8003)
              , s = r(7497)
              , returnThis = function() {
                return this
            };
            e.exports = function(e, t, r) {
                var c = t + " Iterator";
                return e.prototype = o(n, {
                    next: a(1, r)
                }),
                i(e, c, !1, !0),
                s[c] = returnThis,
                e
            }
        }
        ,
        8880: (e,t,r)=>{
            var n = r(9781)
              , o = r(3070)
              , a = r(9114);
            e.exports = n ? function(e, t, r) {
                return o.f(e, t, a(1, r))
            }
            : function(e, t, r) {
                return e[t] = r,
                e
            }
        }
        ,
        9114: e=>{
            e.exports = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            }
        }
        ,
        6135: (e,t,r)=>{
            "use strict";
            var n = r(7593)
              , o = r(3070)
              , a = r(9114);
            e.exports = function(e, t, r) {
                var i = n(t);
                i in e ? o.f(e, i, a(0, r)) : e[i] = r
            }
        }
        ,
        654: (e,t,r)=>{
            "use strict";
            var n = r(2109)
              , o = r(4994)
              , a = r(9518)
              , i = r(7674)
              , s = r(8003)
              , c = r(8880)
              , u = r(1320)
              , l = r(5112)
              , p = r(1913)
              , d = r(7497)
              , f = r(3383)
              , h = f.IteratorPrototype
              , g = f.BUGGY_SAFARI_ITERATORS
              , _ = l("iterator")
              , v = "keys"
              , m = "values"
              , y = "entries"
              , returnThis = function() {
                return this
            };
            e.exports = function(e, t, r, l, f, b, w) {
                o(r, t, l);
                var E, A, S, getIterationMethod = function(e) {
                    if (e === f && k)
                        return k;
                    if (!g && e in x)
                        return x[e];
                    switch (e) {
                    case v:
                        return function keys() {
                            return new r(this,e)
                        }
                        ;
                    case m:
                        return function values() {
                            return new r(this,e)
                        }
                        ;
                    case y:
                        return function entries() {
                            return new r(this,e)
                        }
                    }
                    return function() {
                        return new r(this)
                    }
                }, P = t + " Iterator", O = !1, x = e.prototype, T = x[_] || x["@@iterator"] || f && x[f], k = !g && T || getIterationMethod(f), C = "Array" == t && x.entries || T;
                if (C && (E = a(C.call(new e)),
                h !== Object.prototype && E.next && (p || a(E) === h || (i ? i(E, h) : "function" != typeof E[_] && c(E, _, returnThis)),
                s(E, P, !0, !0),
                p && (d[P] = returnThis))),
                f == m && T && T.name !== m && (O = !0,
                k = function values() {
                    return T.call(this)
                }
                ),
                p && !w || x[_] === k || c(x, _, k),
                d[t] = k,
                f)
                    if (A = {
                        values: getIterationMethod(m),
                        keys: b ? k : getIterationMethod(v),
                        entries: getIterationMethod(y)
                    },
                    w)
                        for (S in A)
                            (g || O || !(S in x)) && u(x, S, A[S]);
                    else
                        n({
                            target: t,
                            proto: !0,
                            forced: g || O
                        }, A);
                return A
            }
        }
        ,
        9781: (e,t,r)=>{
            var n = r(7293);
            e.exports = !n((function() {
                return 7 != Object.defineProperty({}, 1, {
                    get: function() {
                        return 7
                    }
                })[1]
            }
            ))
        }
        ,
        317: (e,t,r)=>{
            var n = r(7854)
              , o = r(111)
              , a = n.document
              , i = o(a) && o(a.createElement);
            e.exports = function(e) {
                return i ? a.createElement(e) : {}
            }
        }
        ,
        8324: e=>{
            e.exports = {
                CSSRuleList: 0,
                CSSStyleDeclaration: 0,
                CSSValueList: 0,
                ClientRectList: 0,
                DOMRectList: 0,
                DOMStringList: 0,
                DOMTokenList: 1,
                DataTransferItemList: 0,
                FileList: 0,
                HTMLAllCollection: 0,
                HTMLCollection: 0,
                HTMLFormElement: 0,
                HTMLSelectElement: 0,
                MediaList: 0,
                MimeTypeArray: 0,
                NamedNodeMap: 0,
                NodeList: 1,
                PaintRequestList: 0,
                Plugin: 0,
                PluginArray: 0,
                SVGLengthList: 0,
                SVGNumberList: 0,
                SVGPathSegList: 0,
                SVGPointList: 0,
                SVGStringList: 0,
                SVGTransformList: 0,
                SourceBufferList: 0,
                StyleSheetList: 0,
                TextTrackCueList: 0,
                TextTrackList: 0,
                TouchList: 0
            }
        }
        ,
        6833: (e,t,r)=>{
            var n = r(8113);
            e.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(n)
        }
        ,
        5268: (e,t,r)=>{
            var n = r(4326)
              , o = r(7854);
            e.exports = "process" == n(o.process)
        }
        ,
        1036: (e,t,r)=>{
            var n = r(8113);
            e.exports = /web0s(?!.*chrome)/i.test(n)
        }
        ,
        8113: (e,t,r)=>{
            var n = r(5005);
            e.exports = n("navigator", "userAgent") || ""
        }
        ,
        7392: (e,t,r)=>{
            var n, o, a = r(7854), i = r(8113), s = a.process, c = s && s.versions, u = c && c.v8;
            u ? o = (n = u.split("."))[0] + n[1] : i && (!(n = i.match(/Edge\/(\d+)/)) || n[1] >= 74) && (n = i.match(/Chrome\/(\d+)/)) && (o = n[1]),
            e.exports = o && +o
        }
        ,
        748: e=>{
            e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
        }
        ,
        2109: (e,t,r)=>{
            var n = r(7854)
              , o = r(1236).f
              , a = r(8880)
              , i = r(1320)
              , s = r(3505)
              , c = r(9920)
              , u = r(4705);
            e.exports = function(e, t) {
                var r, l, p, d, f, h = e.target, g = e.global, _ = e.stat;
                if (r = g ? n : _ ? n[h] || s(h, {}) : (n[h] || {}).prototype)
                    for (l in t) {
                        if (d = t[l],
                        p = e.noTargetGet ? (f = o(r, l)) && f.value : r[l],
                        !u(g ? l : h + (_ ? "." : "#") + l, e.forced) && void 0 !== p) {
                            if (typeof d == typeof p)
                                continue;
                            c(d, p)
                        }
                        (e.sham || p && p.sham) && a(d, "sham", !0),
                        i(r, l, d, e)
                    }
            }
        }
        ,
        7293: e=>{
            e.exports = function(e) {
                try {
                    return !!e()
                } catch (t) {
                    return !0
                }
            }
        }
        ,
        7007: (e,t,r)=>{
            "use strict";
            r(4916);
            var n = r(1320)
              , o = r(7293)
              , a = r(5112)
              , i = r(8880)
              , s = a("species")
              , c = !o((function() {
                var e = /./;
                return e.exec = function() {
                    var e = [];
                    return e.groups = {
                        a: "7"
                    },
                    e
                }
                ,
                "7" !== "".replace(e, "$<a>")
            }
            ))
              , u = "$0" === "a".replace(/./, "$0")
              , l = a("replace")
              , p = !!/./[l] && "" === /./[l]("a", "$0")
              , d = !o((function() {
                var e = /(?:)/
                  , t = e.exec;
                e.exec = function() {
                    return t.apply(this, arguments)
                }
                ;
                var r = "ab".split(e);
                return 2 !== r.length || "a" !== r[0] || "b" !== r[1]
            }
            ));
            e.exports = function(e, t, r, l) {
                var f = a(e)
                  , h = !o((function() {
                    var t = {};
                    return t[f] = function() {
                        return 7
                    }
                    ,
                    7 != ""[e](t)
                }
                ))
                  , g = h && !o((function() {
                    var t = !1
                      , r = /a/;
                    return "split" === e && ((r = {}).constructor = {},
                    r.constructor[s] = function() {
                        return r
                    }
                    ,
                    r.flags = "",
                    r[f] = /./[f]),
                    r.exec = function() {
                        return t = !0,
                        null
                    }
                    ,
                    r[f](""),
                    !t
                }
                ));
                if (!h || !g || "replace" === e && (!c || !u || p) || "split" === e && !d) {
                    var _ = /./[f]
                      , v = r(f, ""[e], (function(e, t, r, n, o) {
                        return t.exec === RegExp.prototype.exec ? h && !o ? {
                            done: !0,
                            value: _.call(t, r, n)
                        } : {
                            done: !0,
                            value: e.call(r, t, n)
                        } : {
                            done: !1
                        }
                    }
                    ), {
                        REPLACE_KEEPS_$0: u,
                        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: p
                    })
                      , m = v[0]
                      , y = v[1];
                    n(String.prototype, e, m),
                    n(RegExp.prototype, f, 2 == t ? function(e, t) {
                        return y.call(e, this, t)
                    }
                    : function(e) {
                        return y.call(e, this)
                    }
                    )
                }
                l && i(RegExp.prototype[f], "sham", !0)
            }
        }
        ,
        9974: (e,t,r)=>{
            var n = r(3099);
            e.exports = function(e, t, r) {
                if (n(e),
                void 0 === t)
                    return e;
                switch (r) {
                case 0:
                    return function() {
                        return e.call(t)
                    }
                    ;
                case 1:
                    return function(r) {
                        return e.call(t, r)
                    }
                    ;
                case 2:
                    return function(r, n) {
                        return e.call(t, r, n)
                    }
                    ;
                case 3:
                    return function(r, n, o) {
                        return e.call(t, r, n, o)
                    }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            }
        }
        ,
        5005: (e,t,r)=>{
            var n = r(857)
              , o = r(7854)
              , aFunction = function(e) {
                return "function" == typeof e ? e : void 0
            };
            e.exports = function(e, t) {
                return arguments.length < 2 ? aFunction(n[e]) || aFunction(o[e]) : n[e] && n[e][t] || o[e] && o[e][t]
            }
        }
        ,
        1246: (e,t,r)=>{
            var n = r(648)
              , o = r(7497)
              , a = r(5112)("iterator");
            e.exports = function(e) {
                if (null != e)
                    return e[a] || e["@@iterator"] || o[n(e)]
            }
        }
        ,
        8554: (e,t,r)=>{
            var n = r(9670)
              , o = r(1246);
            e.exports = function(e) {
                var t = o(e);
                if ("function" != typeof t)
                    throw TypeError(String(e) + " is not iterable");
                return n(t.call(e))
            }
        }
        ,
        647: (e,t,r)=>{
            var n = r(7908)
              , o = Math.floor
              , a = "".replace
              , i = /\$([$&'`]|\d{1,2}|<[^>]*>)/g
              , s = /\$([$&'`]|\d{1,2})/g;
            e.exports = function(e, t, r, c, u, l) {
                var p = r + e.length
                  , d = c.length
                  , f = s;
                return void 0 !== u && (u = n(u),
                f = i),
                a.call(l, f, (function(n, a) {
                    var i;
                    switch (a.charAt(0)) {
                    case "$":
                        return "$";
                    case "&":
                        return e;
                    case "`":
                        return t.slice(0, r);
                    case "'":
                        return t.slice(p);
                    case "<":
                        i = u[a.slice(1, -1)];
                        break;
                    default:
                        var s = +a;
                        if (0 === s)
                            return n;
                        if (s > d) {
                            var l = o(s / 10);
                            return 0 === l ? n : l <= d ? void 0 === c[l - 1] ? a.charAt(1) : c[l - 1] + a.charAt(1) : n
                        }
                        i = c[s - 1]
                    }
                    return void 0 === i ? "" : i
                }
                ))
            }
        }
        ,
        7854: (e,t,r)=>{
            var check = function(e) {
                return e && e.Math == Math && e
            };
            e.exports = check("object" == typeof globalThis && globalThis) || check("object" == typeof window && window) || check("object" == typeof self && self) || check("object" == typeof r.g && r.g) || function() {
                return this
            }() || Function("return this")()
        }
        ,
        6656: e=>{
            var t = {}.hasOwnProperty;
            e.exports = function(e, r) {
                return t.call(e, r)
            }
        }
        ,
        3501: e=>{
            e.exports = {}
        }
        ,
        842: (e,t,r)=>{
            var n = r(7854);
            e.exports = function(e, t) {
                var r = n.console;
                r && r.error && (1 === arguments.length ? r.error(e) : r.error(e, t))
            }
        }
        ,
        490: (e,t,r)=>{
            var n = r(5005);
            e.exports = n("document", "documentElement")
        }
        ,
        4664: (e,t,r)=>{
            var n = r(9781)
              , o = r(7293)
              , a = r(317);
            e.exports = !n && !o((function() {
                return 7 != Object.defineProperty(a("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            }
            ))
        }
        ,
        1179: e=>{
            var t = Math.abs
              , r = Math.pow
              , n = Math.floor
              , o = Math.log
              , a = Math.LN2;
            e.exports = {
                pack: function(e, i, s) {
                    var c, u, l, p = new Array(s), d = 8 * s - i - 1, f = (1 << d) - 1, h = f >> 1, g = 23 === i ? r(2, -24) - r(2, -77) : 0, _ = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0, v = 0;
                    for ((e = t(e)) != e || e === 1 / 0 ? (u = e != e ? 1 : 0,
                    c = f) : (c = n(o(e) / a),
                    e * (l = r(2, -c)) < 1 && (c--,
                    l *= 2),
                    (e += c + h >= 1 ? g / l : g * r(2, 1 - h)) * l >= 2 && (c++,
                    l /= 2),
                    c + h >= f ? (u = 0,
                    c = f) : c + h >= 1 ? (u = (e * l - 1) * r(2, i),
                    c += h) : (u = e * r(2, h - 1) * r(2, i),
                    c = 0)); i >= 8; p[v++] = 255 & u,
                    u /= 256,
                    i -= 8)
                        ;
                    for (c = c << i | u,
                    d += i; d > 0; p[v++] = 255 & c,
                    c /= 256,
                    d -= 8)
                        ;
                    return p[--v] |= 128 * _,
                    p
                },
                unpack: function(e, t) {
                    var n, o = e.length, a = 8 * o - t - 1, i = (1 << a) - 1, s = i >> 1, c = a - 7, u = o - 1, l = e[u--], p = 127 & l;
                    for (l >>= 7; c > 0; p = 256 * p + e[u],
                    u--,
                    c -= 8)
                        ;
                    for (n = p & (1 << -c) - 1,
                    p >>= -c,
                    c += t; c > 0; n = 256 * n + e[u],
                    u--,
                    c -= 8)
                        ;
                    if (0 === p)
                        p = 1 - s;
                    else {
                        if (p === i)
                            return n ? NaN : l ? -1 / 0 : 1 / 0;
                        n += r(2, t),
                        p -= s
                    }
                    return (l ? -1 : 1) * n * r(2, p - t)
                }
            }
        }
        ,
        8361: (e,t,r)=>{
            var n = r(7293)
              , o = r(4326)
              , a = "".split;
            e.exports = n((function() {
                return !Object("z").propertyIsEnumerable(0)
            }
            )) ? function(e) {
                return "String" == o(e) ? a.call(e, "") : Object(e)
            }
            : Object
        }
        ,
        9587: (e,t,r)=>{
            var n = r(111)
              , o = r(7674);
            e.exports = function(e, t, r) {
                var a, i;
                return o && "function" == typeof (a = t.constructor) && a !== r && n(i = a.prototype) && i !== r.prototype && o(e, i),
                e
            }
        }
        ,
        2788: (e,t,r)=>{
            var n = r(5465)
              , o = Function.toString;
            "function" != typeof n.inspectSource && (n.inspectSource = function(e) {
                return o.call(e)
            }
            ),
            e.exports = n.inspectSource
        }
        ,
        9909: (e,t,r)=>{
            var n, o, a, i = r(8536), s = r(7854), c = r(111), u = r(8880), l = r(6656), p = r(5465), d = r(6200), f = r(3501), h = s.WeakMap;
            if (i) {
                var g = p.state || (p.state = new h)
                  , _ = g.get
                  , v = g.has
                  , m = g.set;
                n = function(e, t) {
                    return t.facade = e,
                    m.call(g, e, t),
                    t
                }
                ,
                o = function(e) {
                    return _.call(g, e) || {}
                }
                ,
                a = function(e) {
                    return v.call(g, e)
                }
            } else {
                var y = d("state");
                f[y] = !0,
                n = function(e, t) {
                    return t.facade = e,
                    u(e, y, t),
                    t
                }
                ,
                o = function(e) {
                    return l(e, y) ? e[y] : {}
                }
                ,
                a = function(e) {
                    return l(e, y)
                }
            }
            e.exports = {
                set: n,
                get: o,
                has: a,
                enforce: function(e) {
                    return a(e) ? o(e) : n(e, {})
                },
                getterFor: function(e) {
                    return function(t) {
                        var r;
                        if (!c(t) || (r = o(t)).type !== e)
                            throw TypeError("Incompatible receiver, " + e + " required");
                        return r
                    }
                }
            }
        }
        ,
        7659: (e,t,r)=>{
            var n = r(5112)
              , o = r(7497)
              , a = n("iterator")
              , i = Array.prototype;
            e.exports = function(e) {
                return void 0 !== e && (o.Array === e || i[a] === e)
            }
        }
        ,
        3157: (e,t,r)=>{
            var n = r(4326);
            e.exports = Array.isArray || function isArray(e) {
                return "Array" == n(e)
            }
        }
        ,
        4705: (e,t,r)=>{
            var n = r(7293)
              , o = /#|\.prototype\./
              , isForced = function(e, t) {
                var r = i[a(e)];
                return r == c || r != s && ("function" == typeof t ? n(t) : !!t)
            }
              , a = isForced.normalize = function(e) {
                return String(e).replace(o, ".").toLowerCase()
            }
              , i = isForced.data = {}
              , s = isForced.NATIVE = "N"
              , c = isForced.POLYFILL = "P";
            e.exports = isForced
        }
        ,
        111: e=>{
            e.exports = function(e) {
                return "object" == typeof e ? null !== e : "function" == typeof e
            }
        }
        ,
        1913: e=>{
            e.exports = !1
        }
        ,
        7850: (e,t,r)=>{
            var n = r(111)
              , o = r(4326)
              , a = r(5112)("match");
            e.exports = function(e) {
                var t;
                return n(e) && (void 0 !== (t = e[a]) ? !!t : "RegExp" == o(e))
            }
        }
        ,
        408: (e,t,r)=>{
            var n = r(9670)
              , o = r(7659)
              , a = r(7466)
              , i = r(9974)
              , s = r(1246)
              , c = r(9212)
              , Result = function(e, t) {
                this.stopped = e,
                this.result = t
            };
            e.exports = function(e, t, r) {
                var u, l, p, d, f, h, g, _ = r && r.that, v = !(!r || !r.AS_ENTRIES), m = !(!r || !r.IS_ITERATOR), y = !(!r || !r.INTERRUPTED), b = i(t, _, 1 + v + y), stop = function(e) {
                    return u && c(u),
                    new Result(!0,e)
                }, callFn = function(e) {
                    return v ? (n(e),
                    y ? b(e[0], e[1], stop) : b(e[0], e[1])) : y ? b(e, stop) : b(e)
                };
                if (m)
                    u = e;
                else {
                    if ("function" != typeof (l = s(e)))
                        throw TypeError("Target is not iterable");
                    if (o(l)) {
                        for (p = 0,
                        d = a(e.length); d > p; p++)
                            if ((f = callFn(e[p])) && f instanceof Result)
                                return f;
                        return new Result(!1)
                    }
                    u = l.call(e)
                }
                for (h = u.next; !(g = h.call(u)).done; ) {
                    try {
                        f = callFn(g.value)
                    } catch (w) {
                        throw c(u),
                        w
                    }
                    if ("object" == typeof f && f && f instanceof Result)
                        return f
                }
                return new Result(!1)
            }
        }
        ,
        9212: (e,t,r)=>{
            var n = r(9670);
            e.exports = function(e) {
                var t = e.return;
                if (void 0 !== t)
                    return n(t.call(e)).value
            }
        }
        ,
        3383: (e,t,r)=>{
            "use strict";
            var n, o, a, i = r(7293), s = r(9518), c = r(8880), u = r(6656), l = r(5112), p = r(1913), d = l("iterator"), f = !1;
            [].keys && ("next"in (a = [].keys()) ? (o = s(s(a))) !== Object.prototype && (n = o) : f = !0);
            var h = null == n || i((function() {
                var e = {};
                return n[d].call(e) !== e
            }
            ));
            h && (n = {}),
            p && !h || u(n, d) || c(n, d, (function() {
                return this
            }
            )),
            e.exports = {
                IteratorPrototype: n,
                BUGGY_SAFARI_ITERATORS: f
            }
        }
        ,
        7497: e=>{
            e.exports = {}
        }
        ,
        5948: (e,t,r)=>{
            var n, o, a, i, s, c, u, l, p = r(7854), d = r(1236).f, f = r(261).set, h = r(6833), g = r(1036), _ = r(5268), v = p.MutationObserver || p.WebKitMutationObserver, m = p.document, y = p.process, b = p.Promise, w = d(p, "queueMicrotask"), E = w && w.value;
            E || (n = function() {
                var e, t;
                for (_ && (e = y.domain) && e.exit(); o; ) {
                    t = o.fn,
                    o = o.next;
                    try {
                        t()
                    } catch (r) {
                        throw o ? i() : a = void 0,
                        r
                    }
                }
                a = void 0,
                e && e.enter()
            }
            ,
            h || _ || g || !v || !m ? b && b.resolve ? (u = b.resolve(void 0),
            l = u.then,
            i = function() {
                l.call(u, n)
            }
            ) : i = _ ? function() {
                y.nextTick(n)
            }
            : function() {
                f.call(p, n)
            }
            : (s = !0,
            c = m.createTextNode(""),
            new v(n).observe(c, {
                characterData: !0
            }),
            i = function() {
                c.data = s = !s
            }
            )),
            e.exports = E || function(e) {
                var t = {
                    fn: e,
                    next: void 0
                };
                a && (a.next = t),
                o || (o = t,
                i()),
                a = t
            }
        }
        ,
        3366: (e,t,r)=>{
            var n = r(7854);
            e.exports = n.Promise
        }
        ,
        133: (e,t,r)=>{
            var n = r(5268)
              , o = r(7392)
              , a = r(7293);
            e.exports = !!Object.getOwnPropertySymbols && !a((function() {
                return !Symbol.sham && (n ? 38 === o : o > 37 && o < 41)
            }
            ))
        }
        ,
        590: (e,t,r)=>{
            var n = r(7293)
              , o = r(5112)
              , a = r(1913)
              , i = o("iterator");
            e.exports = !n((function() {
                var e = new URL("b?a=1&b=2&c=3","http://a")
                  , t = e.searchParams
                  , r = "";
                return e.pathname = "c%20d",
                t.forEach((function(e, n) {
                    t.delete("b"),
                    r += n + e
                }
                )),
                a && !e.toJSON || !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[i] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://тест").host || "#%D0%B1" !== new URL("http://a#б").hash || "a1c3" !== r || "x" !== new URL("http://x",void 0).host
            }
            ))
        }
        ,
        8536: (e,t,r)=>{
            var n = r(7854)
              , o = r(2788)
              , a = n.WeakMap;
            e.exports = "function" == typeof a && /native code/.test(o(a))
        }
        ,
        8523: (e,t,r)=>{
            "use strict";
            var n = r(3099)
              , PromiseCapability = function(e) {
                var t, r;
                this.promise = new e((function(e, n) {
                    if (void 0 !== t || void 0 !== r)
                        throw TypeError("Bad Promise constructor");
                    t = e,
                    r = n
                }
                )),
                this.resolve = n(t),
                this.reject = n(r)
            };
            e.exports.f = function(e) {
                return new PromiseCapability(e)
            }
        }
        ,
        1574: (e,t,r)=>{
            "use strict";
            var n = r(9781)
              , o = r(7293)
              , a = r(1956)
              , i = r(5181)
              , s = r(5296)
              , c = r(7908)
              , u = r(8361)
              , l = Object.assign
              , p = Object.defineProperty;
            e.exports = !l || o((function() {
                if (n && 1 !== l({
                    b: 1
                }, l(p({}, "a", {
                    enumerable: !0,
                    get: function() {
                        p(this, "b", {
                            value: 3,
                            enumerable: !1
                        })
                    }
                }), {
                    b: 2
                })).b)
                    return !0;
                var e = {}
                  , t = {}
                  , r = Symbol()
                  , o = "abcdefghijklmnopqrst";
                return e[r] = 7,
                o.split("").forEach((function(e) {
                    t[e] = e
                }
                )),
                7 != l({}, e)[r] || a(l({}, t)).join("") != o
            }
            )) ? function assign(e, t) {
                for (var r = c(e), o = arguments.length, l = 1, p = i.f, d = s.f; o > l; )
                    for (var f, h = u(arguments[l++]), g = p ? a(h).concat(p(h)) : a(h), _ = g.length, v = 0; _ > v; )
                        f = g[v++],
                        n && !d.call(h, f) || (r[f] = h[f]);
                return r
            }
            : l
        }
        ,
        30: (e,t,r)=>{
            var n, o = r(9670), a = r(6048), i = r(748), s = r(3501), c = r(490), u = r(317), l = r(6200), p = l("IE_PROTO"), EmptyConstructor = function() {}, scriptTag = function(e) {
                return "<script>" + e + "</" + "script>"
            }, NullProtoObject = function() {
                try {
                    n = document.domain && new ActiveXObject("htmlfile")
                } catch (o) {}
                var e, t;
                NullProtoObject = n ? function(e) {
                    e.write(scriptTag("")),
                    e.close();
                    var t = e.parentWindow.Object;
                    return e = null,
                    t
                }(n) : ((t = u("iframe")).style.display = "none",
                c.appendChild(t),
                t.src = String("javascript:"),
                (e = t.contentWindow.document).open(),
                e.write(scriptTag("document.F=Object")),
                e.close(),
                e.F);
                for (var r = i.length; r--; )
                    delete NullProtoObject.prototype[i[r]];
                return NullProtoObject()
            };
            s[p] = !0,
            e.exports = Object.create || function create(e, t) {
                var r;
                return null !== e ? (EmptyConstructor.prototype = o(e),
                r = new EmptyConstructor,
                EmptyConstructor.prototype = null,
                r[p] = e) : r = NullProtoObject(),
                void 0 === t ? r : a(r, t)
            }
        }
        ,
        6048: (e,t,r)=>{
            var n = r(9781)
              , o = r(3070)
              , a = r(9670)
              , i = r(1956);
            e.exports = n ? Object.defineProperties : function defineProperties(e, t) {
                a(e);
                for (var r, n = i(t), s = n.length, c = 0; s > c; )
                    o.f(e, r = n[c++], t[r]);
                return e
            }
        }
        ,
        3070: (e,t,r)=>{
            var n = r(9781)
              , o = r(4664)
              , a = r(9670)
              , i = r(7593)
              , s = Object.defineProperty;
            t.f = n ? s : function defineProperty(e, t, r) {
                if (a(e),
                t = i(t, !0),
                a(r),
                o)
                    try {
                        return s(e, t, r)
                    } catch (n) {}
                if ("get"in r || "set"in r)
                    throw TypeError("Accessors not supported");
                return "value"in r && (e[t] = r.value),
                e
            }
        }
        ,
        1236: (e,t,r)=>{
            var n = r(9781)
              , o = r(5296)
              , a = r(9114)
              , i = r(5656)
              , s = r(7593)
              , c = r(6656)
              , u = r(4664)
              , l = Object.getOwnPropertyDescriptor;
            t.f = n ? l : function getOwnPropertyDescriptor(e, t) {
                if (e = i(e),
                t = s(t, !0),
                u)
                    try {
                        return l(e, t)
                    } catch (r) {}
                if (c(e, t))
                    return a(!o.f.call(e, t), e[t])
            }
        }
        ,
        8006: (e,t,r)=>{
            var n = r(6324)
              , o = r(748).concat("length", "prototype");
            t.f = Object.getOwnPropertyNames || function getOwnPropertyNames(e) {
                return n(e, o)
            }
        }
        ,
        5181: (e,t)=>{
            t.f = Object.getOwnPropertySymbols
        }
        ,
        9518: (e,t,r)=>{
            var n = r(6656)
              , o = r(7908)
              , a = r(6200)
              , i = r(8544)
              , s = a("IE_PROTO")
              , c = Object.prototype;
            e.exports = i ? Object.getPrototypeOf : function(e) {
                return e = o(e),
                n(e, s) ? e[s] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? c : null
            }
        }
        ,
        6324: (e,t,r)=>{
            var n = r(6656)
              , o = r(5656)
              , a = r(1318).indexOf
              , i = r(3501);
            e.exports = function(e, t) {
                var r, s = o(e), c = 0, u = [];
                for (r in s)
                    !n(i, r) && n(s, r) && u.push(r);
                for (; t.length > c; )
                    n(s, r = t[c++]) && (~a(u, r) || u.push(r));
                return u
            }
        }
        ,
        1956: (e,t,r)=>{
            var n = r(6324)
              , o = r(748);
            e.exports = Object.keys || function keys(e) {
                return n(e, o)
            }
        }
        ,
        5296: (e,t)=>{
            "use strict";
            var r = {}.propertyIsEnumerable
              , n = Object.getOwnPropertyDescriptor
              , o = n && !r.call({
                1: 2
            }, 1);
            t.f = o ? function propertyIsEnumerable(e) {
                var t = n(this, e);
                return !!t && t.enumerable
            }
            : r
        }
        ,
        7674: (e,t,r)=>{
            var n = r(9670)
              , o = r(6077);
            e.exports = Object.setPrototypeOf || ("__proto__"in {} ? function() {
                var e, t = !1, r = {};
                try {
                    (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(r, []),
                    t = r instanceof Array
                } catch (a) {}
                return function setPrototypeOf(r, a) {
                    return n(r),
                    o(a),
                    t ? e.call(r, a) : r.__proto__ = a,
                    r
                }
            }() : void 0)
        }
        ,
        3887: (e,t,r)=>{
            var n = r(5005)
              , o = r(8006)
              , a = r(5181)
              , i = r(9670);
            e.exports = n("Reflect", "ownKeys") || function ownKeys(e) {
                var t = o.f(i(e))
                  , r = a.f;
                return r ? t.concat(r(e)) : t
            }
        }
        ,
        857: (e,t,r)=>{
            var n = r(7854);
            e.exports = n
        }
        ,
        2534: e=>{
            e.exports = function(e) {
                try {
                    return {
                        error: !1,
                        value: e()
                    }
                } catch (t) {
                    return {
                        error: !0,
                        value: t
                    }
                }
            }
        }
        ,
        9478: (e,t,r)=>{
            var n = r(9670)
              , o = r(111)
              , a = r(8523);
            e.exports = function(e, t) {
                if (n(e),
                o(t) && t.constructor === e)
                    return t;
                var r = a.f(e);
                return (0,
                r.resolve)(t),
                r.promise
            }
        }
        ,
        2248: (e,t,r)=>{
            var n = r(1320);
            e.exports = function(e, t, r) {
                for (var o in t)
                    n(e, o, t[o], r);
                return e
            }
        }
        ,
        1320: (e,t,r)=>{
            var n = r(7854)
              , o = r(8880)
              , a = r(6656)
              , i = r(3505)
              , s = r(2788)
              , c = r(9909)
              , u = c.get
              , l = c.enforce
              , p = String(String).split("String");
            (e.exports = function(e, t, r, s) {
                var c, u = !!s && !!s.unsafe, d = !!s && !!s.enumerable, f = !!s && !!s.noTargetGet;
                "function" == typeof r && ("string" != typeof t || a(r, "name") || o(r, "name", t),
                (c = l(r)).source || (c.source = p.join("string" == typeof t ? t : ""))),
                e !== n ? (u ? !f && e[t] && (d = !0) : delete e[t],
                d ? e[t] = r : o(e, t, r)) : d ? e[t] = r : i(t, r)
            }
            )(Function.prototype, "toString", (function toString() {
                return "function" == typeof this && u(this).source || s(this)
            }
            ))
        }
        ,
        7651: (e,t,r)=>{
            var n = r(4326)
              , o = r(2261);
            e.exports = function(e, t) {
                var r = e.exec;
                if ("function" == typeof r) {
                    var a = r.call(e, t);
                    if ("object" != typeof a)
                        throw TypeError("RegExp exec method returned something other than an Object or null");
                    return a
                }
                if ("RegExp" !== n(e))
                    throw TypeError("RegExp#exec called on incompatible receiver");
                return o.call(e, t)
            }
        }
        ,
        2261: (e,t,r)=>{
            "use strict";
            var n, o, a = r(7066), i = r(2999), s = r(2309), c = RegExp.prototype.exec, u = s("native-string-replace", String.prototype.replace), l = c, p = (n = /a/,
            o = /b*/g,
            c.call(n, "a"),
            c.call(o, "a"),
            0 !== n.lastIndex || 0 !== o.lastIndex), d = i.UNSUPPORTED_Y || i.BROKEN_CARET, f = void 0 !== /()??/.exec("")[1];
            (p || f || d) && (l = function exec(e) {
                var t, r, n, o, i = this, s = d && i.sticky, l = a.call(i), h = i.source, g = 0, _ = e;
                return s && (-1 === (l = l.replace("y", "")).indexOf("g") && (l += "g"),
                _ = String(e).slice(i.lastIndex),
                i.lastIndex > 0 && (!i.multiline || i.multiline && "\n" !== e[i.lastIndex - 1]) && (h = "(?: " + h + ")",
                _ = " " + _,
                g++),
                r = new RegExp("^(?:" + h + ")",l)),
                f && (r = new RegExp("^" + h + "$(?!\\s)",l)),
                p && (t = i.lastIndex),
                n = c.call(s ? r : i, _),
                s ? n ? (n.input = n.input.slice(g),
                n[0] = n[0].slice(g),
                n.index = i.lastIndex,
                i.lastIndex += n[0].length) : i.lastIndex = 0 : p && n && (i.lastIndex = i.global ? n.index + n[0].length : t),
                f && n && n.length > 1 && u.call(n[0], r, (function() {
                    for (o = 1; o < arguments.length - 2; o++)
                        void 0 === arguments[o] && (n[o] = void 0)
                }
                )),
                n
            }
            ),
            e.exports = l
        }
        ,
        7066: (e,t,r)=>{
            "use strict";
            var n = r(9670);
            e.exports = function() {
                var e = n(this)
                  , t = "";
                return e.global && (t += "g"),
                e.ignoreCase && (t += "i"),
                e.multiline && (t += "m"),
                e.dotAll && (t += "s"),
                e.unicode && (t += "u"),
                e.sticky && (t += "y"),
                t
            }
        }
        ,
        2999: (e,t,r)=>{
            "use strict";
            var n = r(7293);
            function RE(e, t) {
                return RegExp(e, t)
            }
            t.UNSUPPORTED_Y = n((function() {
                var e = RE("a", "y");
                return e.lastIndex = 2,
                null != e.exec("abcd")
            }
            )),
            t.BROKEN_CARET = n((function() {
                var e = RE("^r", "gy");
                return e.lastIndex = 2,
                null != e.exec("str")
            }
            ))
        }
        ,
        4488: e=>{
            e.exports = function(e) {
                if (null == e)
                    throw TypeError("Can't call method on " + e);
                return e
            }
        }
        ,
        3505: (e,t,r)=>{
            var n = r(7854)
              , o = r(8880);
            e.exports = function(e, t) {
                try {
                    o(n, e, t)
                } catch (r) {
                    n[e] = t
                }
                return t
            }
        }
        ,
        6340: (e,t,r)=>{
            "use strict";
            var n = r(5005)
              , o = r(3070)
              , a = r(5112)
              , i = r(9781)
              , s = a("species");
            e.exports = function(e) {
                var t = n(e)
                  , r = o.f;
                i && t && !t[s] && r(t, s, {
                    configurable: !0,
                    get: function() {
                        return this
                    }
                })
            }
        }
        ,
        8003: (e,t,r)=>{
            var n = r(3070).f
              , o = r(6656)
              , a = r(5112)("toStringTag");
            e.exports = function(e, t, r) {
                e && !o(e = r ? e : e.prototype, a) && n(e, a, {
                    configurable: !0,
                    value: t
                })
            }
        }
        ,
        6200: (e,t,r)=>{
            var n = r(2309)
              , o = r(9711)
              , a = n("keys");
            e.exports = function(e) {
                return a[e] || (a[e] = o(e))
            }
        }
        ,
        5465: (e,t,r)=>{
            var n = r(7854)
              , o = r(3505)
              , a = "__core-js_shared__"
              , i = n[a] || o(a, {});
            e.exports = i
        }
        ,
        2309: (e,t,r)=>{
            var n = r(1913)
              , o = r(5465);
            (e.exports = function(e, t) {
                return o[e] || (o[e] = void 0 !== t ? t : {})
            }
            )("versions", []).push({
                version: "3.10.1",
                mode: n ? "pure" : "global",
                copyright: "© 2021 Denis Pushkarev (zloirock.ru)"
            })
        }
        ,
        6707: (e,t,r)=>{
            var n = r(9670)
              , o = r(3099)
              , a = r(5112)("species");
            e.exports = function(e, t) {
                var r, i = n(e).constructor;
                return void 0 === i || null == (r = n(i)[a]) ? t : o(r)
            }
        }
        ,
        8710: (e,t,r)=>{
            var n = r(9958)
              , o = r(4488)
              , createMethod = function(e) {
                return function(t, r) {
                    var a, i, s = String(o(t)), c = n(r), u = s.length;
                    return c < 0 || c >= u ? e ? "" : void 0 : (a = s.charCodeAt(c)) < 55296 || a > 56319 || c + 1 === u || (i = s.charCodeAt(c + 1)) < 56320 || i > 57343 ? e ? s.charAt(c) : a : e ? s.slice(c, c + 2) : i - 56320 + (a - 55296 << 10) + 65536
                }
            };
            e.exports = {
                codeAt: createMethod(!1),
                charAt: createMethod(!0)
            }
        }
        ,
        3197: e=>{
            "use strict";
            var t = 2147483647
              , r = /[^\0-\u007E]/
              , n = /[.\u3002\uFF0E\uFF61]/g
              , o = "Overflow: input needs wider integers to process"
              , a = Math.floor
              , i = String.fromCharCode
              , digitToBasic = function(e) {
                return e + 22 + 75 * (e < 26)
            }
              , adapt = function(e, t, r) {
                var n = 0;
                for (e = r ? a(e / 700) : e >> 1,
                e += a(e / t); e > 455; n += 36)
                    e = a(e / 35);
                return a(n + 36 * e / (e + 38))
            }
              , encode = function(e) {
                var r = [];
                e = function(e) {
                    for (var t = [], r = 0, n = e.length; r < n; ) {
                        var o = e.charCodeAt(r++);
                        if (o >= 55296 && o <= 56319 && r < n) {
                            var a = e.charCodeAt(r++);
                            56320 == (64512 & a) ? t.push(((1023 & o) << 10) + (1023 & a) + 65536) : (t.push(o),
                            r--)
                        } else
                            t.push(o)
                    }
                    return t
                }(e);
                var n, s, c = e.length, u = 128, l = 0, p = 72;
                for (n = 0; n < e.length; n++)
                    (s = e[n]) < 128 && r.push(i(s));
                var d = r.length
                  , f = d;
                for (d && r.push("-"); f < c; ) {
                    var h = t;
                    for (n = 0; n < e.length; n++)
                        (s = e[n]) >= u && s < h && (h = s);
                    var g = f + 1;
                    if (h - u > a((t - l) / g))
                        throw RangeError(o);
                    for (l += (h - u) * g,
                    u = h,
                    n = 0; n < e.length; n++) {
                        if ((s = e[n]) < u && ++l > t)
                            throw RangeError(o);
                        if (s == u) {
                            for (var _ = l, v = 36; ; v += 36) {
                                var m = v <= p ? 1 : v >= p + 26 ? 26 : v - p;
                                if (_ < m)
                                    break;
                                var y = _ - m
                                  , b = 36 - m;
                                r.push(i(digitToBasic(m + y % b))),
                                _ = a(y / b)
                            }
                            r.push(i(digitToBasic(_))),
                            p = adapt(l, g, f == d),
                            l = 0,
                            ++f
                        }
                    }
                    ++l,
                    ++u
                }
                return r.join("")
            };
            e.exports = function(e) {
                var t, o, a = [], i = e.toLowerCase().replace(n, ".").split(".");
                for (t = 0; t < i.length; t++)
                    o = i[t],
                    a.push(r.test(o) ? "xn--" + encode(o) : o);
                return a.join(".")
            }
        }
        ,
        261: (e,t,r)=>{
            var n, o, a, i = r(7854), s = r(7293), c = r(9974), u = r(490), l = r(317), p = r(6833), d = r(5268), f = i.location, h = i.setImmediate, g = i.clearImmediate, _ = i.process, v = i.MessageChannel, m = i.Dispatch, y = 0, b = {}, w = "onreadystatechange", run = function(e) {
                if (b.hasOwnProperty(e)) {
                    var t = b[e];
                    delete b[e],
                    t()
                }
            }, runner = function(e) {
                return function() {
                    run(e)
                }
            }, listener = function(e) {
                run(e.data)
            }, post = function(e) {
                i.postMessage(e + "", f.protocol + "//" + f.host)
            };
            h && g || (h = function setImmediate(e) {
                for (var t = [], r = 1; arguments.length > r; )
                    t.push(arguments[r++]);
                return b[++y] = function() {
                    ("function" == typeof e ? e : Function(e)).apply(void 0, t)
                }
                ,
                n(y),
                y
            }
            ,
            g = function clearImmediate(e) {
                delete b[e]
            }
            ,
            d ? n = function(e) {
                _.nextTick(runner(e))
            }
            : m && m.now ? n = function(e) {
                m.now(runner(e))
            }
            : v && !p ? (a = (o = new v).port2,
            o.port1.onmessage = listener,
            n = c(a.postMessage, a, 1)) : i.addEventListener && "function" == typeof postMessage && !i.importScripts && f && "file:" !== f.protocol && !s(post) ? (n = post,
            i.addEventListener("message", listener, !1)) : n = w in l("script") ? function(e) {
                u.appendChild(l("script")).onreadystatechange = function() {
                    u.removeChild(this),
                    run(e)
                }
            }
            : function(e) {
                setTimeout(runner(e), 0)
            }
            ),
            e.exports = {
                set: h,
                clear: g
            }
        }
        ,
        1400: (e,t,r)=>{
            var n = r(9958)
              , o = Math.max
              , a = Math.min;
            e.exports = function(e, t) {
                var r = n(e);
                return r < 0 ? o(r + t, 0) : a(r, t)
            }
        }
        ,
        7067: (e,t,r)=>{
            var n = r(9958)
              , o = r(7466);
            e.exports = function(e) {
                if (void 0 === e)
                    return 0;
                var t = n(e)
                  , r = o(t);
                if (t !== r)
                    throw RangeError("Wrong length or index");
                return r
            }
        }
        ,
        5656: (e,t,r)=>{
            var n = r(8361)
              , o = r(4488);
            e.exports = function(e) {
                return n(o(e))
            }
        }
        ,
        9958: e=>{
            var t = Math.ceil
              , r = Math.floor;
            e.exports = function(e) {
                return isNaN(e = +e) ? 0 : (e > 0 ? r : t)(e)
            }
        }
        ,
        7466: (e,t,r)=>{
            var n = r(9958)
              , o = Math.min;
            e.exports = function(e) {
                return e > 0 ? o(n(e), 9007199254740991) : 0
            }
        }
        ,
        7908: (e,t,r)=>{
            var n = r(4488);
            e.exports = function(e) {
                return Object(n(e))
            }
        }
        ,
        4590: (e,t,r)=>{
            var n = r(3002);
            e.exports = function(e, t) {
                var r = n(e);
                if (r % t)
                    throw RangeError("Wrong offset");
                return r
            }
        }
        ,
        3002: (e,t,r)=>{
            var n = r(9958);
            e.exports = function(e) {
                var t = n(e);
                if (t < 0)
                    throw RangeError("The argument can't be less than 0");
                return t
            }
        }
        ,
        7593: (e,t,r)=>{
            var n = r(111);
            e.exports = function(e, t) {
                if (!n(e))
                    return e;
                var r, o;
                if (t && "function" == typeof (r = e.toString) && !n(o = r.call(e)))
                    return o;
                if ("function" == typeof (r = e.valueOf) && !n(o = r.call(e)))
                    return o;
                if (!t && "function" == typeof (r = e.toString) && !n(o = r.call(e)))
                    return o;
                throw TypeError("Can't convert object to primitive value")
            }
        }
        ,
        1694: (e,t,r)=>{
            var n = {};
            n[r(5112)("toStringTag")] = "z",
            e.exports = "[object z]" === String(n)
        }
        ,
        9843: (e,t,r)=>{
            "use strict";
            var n = r(2109)
              , o = r(7854)
              , a = r(9781)
              , i = r(3832)
              , s = r(260)
              , c = r(3331)
              , u = r(5787)
              , l = r(9114)
              , p = r(8880)
              , d = r(7466)
              , f = r(7067)
              , h = r(4590)
              , g = r(7593)
              , _ = r(6656)
              , v = r(648)
              , m = r(111)
              , y = r(30)
              , b = r(7674)
              , w = r(8006).f
              , E = r(7321)
              , A = r(2092).forEach
              , S = r(6340)
              , P = r(3070)
              , O = r(1236)
              , x = r(9909)
              , T = r(9587)
              , k = x.get
              , C = x.set
              , L = P.f
              , I = O.f
              , R = Math.round
              , D = o.RangeError
              , M = c.ArrayBuffer
              , U = c.DataView
              , j = s.NATIVE_ARRAY_BUFFER_VIEWS
              , N = s.TYPED_ARRAY_TAG
              , G = s.TypedArray
              , B = s.TypedArrayPrototype
              , H = s.aTypedArrayConstructor
              , Y = s.isTypedArray
              , q = "BYTES_PER_ELEMENT"
              , K = "Wrong length"
              , fromList = function(e, t) {
                for (var r = 0, n = t.length, o = new (H(e))(n); n > r; )
                    o[r] = t[r++];
                return o
            }
              , addGetter = function(e, t) {
                L(e, t, {
                    get: function() {
                        return k(this)[t]
                    }
                })
            }
              , isArrayBuffer = function(e) {
                var t;
                return e instanceof M || "ArrayBuffer" == (t = v(e)) || "SharedArrayBuffer" == t
            }
              , isTypedArrayIndex = function(e, t) {
                return Y(e) && "symbol" != typeof t && t in e && String(+t) == String(t)
            }
              , W = function getOwnPropertyDescriptor(e, t) {
                return isTypedArrayIndex(e, t = g(t, !0)) ? l(2, e[t]) : I(e, t)
            }
              , V = function defineProperty(e, t, r) {
                return !(isTypedArrayIndex(e, t = g(t, !0)) && m(r) && _(r, "value")) || _(r, "get") || _(r, "set") || r.configurable || _(r, "writable") && !r.writable || _(r, "enumerable") && !r.enumerable ? L(e, t, r) : (e[t] = r.value,
                e)
            };
            a ? (j || (O.f = W,
            P.f = V,
            addGetter(B, "buffer"),
            addGetter(B, "byteOffset"),
            addGetter(B, "byteLength"),
            addGetter(B, "length")),
            n({
                target: "Object",
                stat: !0,
                forced: !j
            }, {
                getOwnPropertyDescriptor: W,
                defineProperty: V
            }),
            e.exports = function(e, t, r) {
                var a = e.match(/\d+$/)[0] / 8
                  , s = e + (r ? "Clamped" : "") + "Array"
                  , c = "get" + e
                  , l = "set" + e
                  , g = o[s]
                  , _ = g
                  , v = _ && _.prototype
                  , P = {}
                  , addElement = function(e, t) {
                    L(e, t, {
                        get: function() {
                            return function(e, t) {
                                var r = k(e);
                                return r.view[c](t * a + r.byteOffset, !0)
                            }(this, t)
                        },
                        set: function(e) {
                            return function(e, t, n) {
                                var o = k(e);
                                r && (n = (n = R(n)) < 0 ? 0 : n > 255 ? 255 : 255 & n),
                                o.view[l](t * a + o.byteOffset, n, !0)
                            }(this, t, e)
                        },
                        enumerable: !0
                    })
                };
                j ? i && (_ = t((function(e, t, r, n) {
                    return u(e, _, s),
                    T(m(t) ? isArrayBuffer(t) ? void 0 !== n ? new g(t,h(r, a),n) : void 0 !== r ? new g(t,h(r, a)) : new g(t) : Y(t) ? fromList(_, t) : E.call(_, t) : new g(f(t)), e, _)
                }
                )),
                b && b(_, G),
                A(w(g), (function(e) {
                    e in _ || p(_, e, g[e])
                }
                )),
                _.prototype = v) : (_ = t((function(e, t, r, n) {
                    u(e, _, s);
                    var o, i, c, l = 0, p = 0;
                    if (m(t)) {
                        if (!isArrayBuffer(t))
                            return Y(t) ? fromList(_, t) : E.call(_, t);
                        o = t,
                        p = h(r, a);
                        var g = t.byteLength;
                        if (void 0 === n) {
                            if (g % a)
                                throw D(K);
                            if ((i = g - p) < 0)
                                throw D(K)
                        } else if ((i = d(n) * a) + p > g)
                            throw D(K);
                        c = i / a
                    } else
                        c = f(t),
                        o = new M(i = c * a);
                    for (C(e, {
                        buffer: o,
                        byteOffset: p,
                        byteLength: i,
                        length: c,
                        view: new U(o)
                    }); l < c; )
                        addElement(e, l++)
                }
                )),
                b && b(_, G),
                v = _.prototype = y(B)),
                v.constructor !== _ && p(v, "constructor", _),
                N && p(v, N, s),
                P[s] = _,
                n({
                    global: !0,
                    forced: _ != g,
                    sham: !j
                }, P),
                q in _ || p(_, q, a),
                q in v || p(v, q, a),
                S(s)
            }
            ) : e.exports = function() {}
        }
        ,
        3832: (e,t,r)=>{
            var n = r(7854)
              , o = r(7293)
              , a = r(7072)
              , i = r(260).NATIVE_ARRAY_BUFFER_VIEWS
              , s = n.ArrayBuffer
              , c = n.Int8Array;
            e.exports = !i || !o((function() {
                c(1)
            }
            )) || !o((function() {
                new c(-1)
            }
            )) || !a((function(e) {
                new c,
                new c(null),
                new c(1.5),
                new c(e)
            }
            ), !0) || o((function() {
                return 1 !== new c(new s(2),1,void 0).length
            }
            ))
        }
        ,
        7321: (e,t,r)=>{
            var n = r(7908)
              , o = r(7466)
              , a = r(1246)
              , i = r(7659)
              , s = r(9974)
              , c = r(260).aTypedArrayConstructor;
            e.exports = function from(e) {
                var t, r, u, l, p, d, f = n(e), h = arguments.length, g = h > 1 ? arguments[1] : void 0, _ = void 0 !== g, v = a(f);
                if (null != v && !i(v))
                    for (d = (p = v.call(f)).next,
                    f = []; !(l = d.call(p)).done; )
                        f.push(l.value);
                for (_ && h > 2 && (g = s(g, arguments[2], 2)),
                r = o(f.length),
                u = new (c(this))(r),
                t = 0; r > t; t++)
                    u[t] = _ ? g(f[t], t) : f[t];
                return u
            }
        }
        ,
        9711: e=>{
            var t = 0
              , r = Math.random();
            e.exports = function(e) {
                return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++t + r).toString(36)
            }
        }
        ,
        3307: (e,t,r)=>{
            var n = r(133);
            e.exports = n && !Symbol.sham && "symbol" == typeof Symbol.iterator
        }
        ,
        5112: (e,t,r)=>{
            var n = r(7854)
              , o = r(2309)
              , a = r(6656)
              , i = r(9711)
              , s = r(133)
              , c = r(3307)
              , u = o("wks")
              , l = n.Symbol
              , p = c ? l : l && l.withoutSetter || i;
            e.exports = function(e) {
                return a(u, e) && (s || "string" == typeof u[e]) || (s && a(l, e) ? u[e] = l[e] : u[e] = p("Symbol." + e)),
                u[e]
            }
        }
        ,
        6992: (e,t,r)=>{
            "use strict";
            var n = r(5656)
              , o = r(1223)
              , a = r(7497)
              , i = r(9909)
              , s = r(654)
              , c = "Array Iterator"
              , u = i.set
              , l = i.getterFor(c);
            e.exports = s(Array, "Array", (function(e, t) {
                u(this, {
                    type: c,
                    target: n(e),
                    index: 0,
                    kind: t
                })
            }
            ), (function() {
                var e = l(this)
                  , t = e.target
                  , r = e.kind
                  , n = e.index++;
                return !t || n >= t.length ? (e.target = void 0,
                {
                    value: void 0,
                    done: !0
                }) : "keys" == r ? {
                    value: n,
                    done: !1
                } : "values" == r ? {
                    value: t[n],
                    done: !1
                } : {
                    value: [n, t[n]],
                    done: !1
                }
            }
            ), "values"),
            a.Arguments = a.Array,
            o("keys"),
            o("values"),
            o("entries")
        }
        ,
        5827: (e,t,r)=>{
            "use strict";
            var n = r(2109)
              , o = r(3671).left
              , a = r(9341)
              , i = r(7392)
              , s = r(5268);
            n({
                target: "Array",
                proto: !0,
                forced: !a("reduce") || !s && i > 79 && i < 83
            }, {
                reduce: function reduce(e) {
                    return o(this, e, arguments.length, arguments.length > 1 ? arguments[1] : void 0)
                }
            })
        }
        ,
        8674: (e,t,r)=>{
            "use strict";
            var n, o, a, i, s = r(2109), c = r(1913), u = r(7854), l = r(5005), p = r(3366), d = r(1320), f = r(2248), h = r(8003), g = r(6340), _ = r(111), v = r(3099), m = r(5787), y = r(2788), b = r(408), w = r(7072), E = r(6707), A = r(261).set, S = r(5948), P = r(9478), O = r(842), x = r(8523), T = r(2534), k = r(9909), C = r(4705), L = r(5112), I = r(5268), R = r(7392), D = L("species"), M = "Promise", U = k.get, j = k.set, N = k.getterFor(M), G = p, B = u.TypeError, H = u.document, Y = u.process, q = l("fetch"), K = x.f, W = K, V = !!(H && H.createEvent && u.dispatchEvent), Z = "function" == typeof PromiseRejectionEvent, z = "unhandledrejection", $ = C(M, (function() {
                if (!(y(G) !== String(G))) {
                    if (66 === R)
                        return !0;
                    if (!I && !Z)
                        return !0
                }
                if (c && !G.prototype.finally)
                    return !0;
                if (R >= 51 && /native code/.test(G))
                    return !1;
                var e = G.resolve(1)
                  , FakePromise = function(e) {
                    e((function() {}
                    ), (function() {}
                    ))
                };
                return (e.constructor = {})[D] = FakePromise,
                !(e.then((function() {}
                ))instanceof FakePromise)
            }
            )), X = $ || !w((function(e) {
                G.all(e).catch((function() {}
                ))
            }
            )), isThenable = function(e) {
                var t;
                return !(!_(e) || "function" != typeof (t = e.then)) && t
            }, notify = function(e, t) {
                if (!e.notified) {
                    e.notified = !0;
                    var r = e.reactions;
                    S((function() {
                        for (var n = e.value, o = 1 == e.state, a = 0; r.length > a; ) {
                            var i, s, c, u = r[a++], l = o ? u.ok : u.fail, p = u.resolve, d = u.reject, f = u.domain;
                            try {
                                l ? (o || (2 === e.rejection && onHandleUnhandled(e),
                                e.rejection = 1),
                                !0 === l ? i = n : (f && f.enter(),
                                i = l(n),
                                f && (f.exit(),
                                c = !0)),
                                i === u.promise ? d(B("Promise-chain cycle")) : (s = isThenable(i)) ? s.call(i, p, d) : p(i)) : d(n)
                            } catch (h) {
                                f && !c && f.exit(),
                                d(h)
                            }
                        }
                        e.reactions = [],
                        e.notified = !1,
                        t && !e.rejection && onUnhandled(e)
                    }
                    ))
                }
            }, dispatchEvent = function(e, t, r) {
                var n, o;
                V ? ((n = H.createEvent("Event")).promise = t,
                n.reason = r,
                n.initEvent(e, !1, !0),
                u.dispatchEvent(n)) : n = {
                    promise: t,
                    reason: r
                },
                !Z && (o = u["on" + e]) ? o(n) : e === z && O("Unhandled promise rejection", r)
            }, onUnhandled = function(e) {
                A.call(u, (function() {
                    var t, r = e.facade, n = e.value;
                    if (isUnhandled(e) && (t = T((function() {
                        I ? Y.emit("unhandledRejection", n, r) : dispatchEvent(z, r, n)
                    }
                    )),
                    e.rejection = I || isUnhandled(e) ? 2 : 1,
                    t.error))
                        throw t.value
                }
                ))
            }, isUnhandled = function(e) {
                return 1 !== e.rejection && !e.parent
            }, onHandleUnhandled = function(e) {
                A.call(u, (function() {
                    var t = e.facade;
                    I ? Y.emit("rejectionHandled", t) : dispatchEvent("rejectionhandled", t, e.value)
                }
                ))
            }, bind = function(e, t, r) {
                return function(n) {
                    e(t, n, r)
                }
            }, internalReject = function(e, t, r) {
                e.done || (e.done = !0,
                r && (e = r),
                e.value = t,
                e.state = 2,
                notify(e, !0))
            }, internalResolve = function(e, t, r) {
                if (!e.done) {
                    e.done = !0,
                    r && (e = r);
                    try {
                        if (e.facade === t)
                            throw B("Promise can't be resolved itself");
                        var n = isThenable(t);
                        n ? S((function() {
                            var r = {
                                done: !1
                            };
                            try {
                                n.call(t, bind(internalResolve, r, e), bind(internalReject, r, e))
                            } catch (o) {
                                internalReject(r, o, e)
                            }
                        }
                        )) : (e.value = t,
                        e.state = 1,
                        notify(e, !1))
                    } catch (o) {
                        internalReject({
                            done: !1
                        }, o, e)
                    }
                }
            };
            $ && (G = function Promise(e) {
                m(this, G, M),
                v(e),
                n.call(this);
                var t = U(this);
                try {
                    e(bind(internalResolve, t), bind(internalReject, t))
                } catch (r) {
                    internalReject(t, r)
                }
            }
            ,
            (n = function Promise(e) {
                j(this, {
                    type: M,
                    done: !1,
                    notified: !1,
                    parent: !1,
                    reactions: [],
                    rejection: !1,
                    state: 0,
                    value: void 0
                })
            }
            ).prototype = f(G.prototype, {
                then: function then(e, t) {
                    var r = N(this)
                      , n = K(E(this, G));
                    return n.ok = "function" != typeof e || e,
                    n.fail = "function" == typeof t && t,
                    n.domain = I ? Y.domain : void 0,
                    r.parent = !0,
                    r.reactions.push(n),
                    0 != r.state && notify(r, !1),
                    n.promise
                },
                catch: function(e) {
                    return this.then(void 0, e)
                }
            }),
            o = function() {
                var e = new n
                  , t = U(e);
                this.promise = e,
                this.resolve = bind(internalResolve, t),
                this.reject = bind(internalReject, t)
            }
            ,
            x.f = K = function(e) {
                return e === G || e === a ? new o(e) : W(e)
            }
            ,
            c || "function" != typeof p || (i = p.prototype.then,
            d(p.prototype, "then", (function then(e, t) {
                var r = this;
                return new G((function(e, t) {
                    i.call(r, e, t)
                }
                )).then(e, t)
            }
            ), {
                unsafe: !0
            }),
            "function" == typeof q && s({
                global: !0,
                enumerable: !0,
                forced: !0
            }, {
                fetch: function fetch(e) {
                    return P(G, q.apply(u, arguments))
                }
            }))),
            s({
                global: !0,
                wrap: !0,
                forced: $
            }, {
                Promise: G
            }),
            h(G, M, !1, !0),
            g(M),
            a = l(M),
            s({
                target: M,
                stat: !0,
                forced: $
            }, {
                reject: function reject(e) {
                    var t = K(this);
                    return t.reject.call(void 0, e),
                    t.promise
                }
            }),
            s({
                target: M,
                stat: !0,
                forced: c || $
            }, {
                resolve: function resolve(e) {
                    return P(c && this === a ? G : this, e)
                }
            }),
            s({
                target: M,
                stat: !0,
                forced: X
            }, {
                all: function all(e) {
                    var t = this
                      , r = K(t)
                      , n = r.resolve
                      , o = r.reject
                      , a = T((function() {
                        var r = v(t.resolve)
                          , a = []
                          , i = 0
                          , s = 1;
                        b(e, (function(e) {
                            var c = i++
                              , u = !1;
                            a.push(void 0),
                            s++,
                            r.call(t, e).then((function(e) {
                                u || (u = !0,
                                a[c] = e,
                                --s || n(a))
                            }
                            ), o)
                        }
                        )),
                        --s || n(a)
                    }
                    ));
                    return a.error && o(a.value),
                    r.promise
                },
                race: function race(e) {
                    var t = this
                      , r = K(t)
                      , n = r.reject
                      , o = T((function() {
                        var o = v(t.resolve);
                        b(e, (function(e) {
                            o.call(t, e).then(r.resolve, n)
                        }
                        ))
                    }
                    ));
                    return o.error && n(o.value),
                    r.promise
                }
            })
        }
        ,
        4603: (e,t,r)=>{
            var n = r(9781)
              , o = r(7854)
              , a = r(4705)
              , i = r(9587)
              , s = r(3070).f
              , c = r(8006).f
              , u = r(7850)
              , l = r(7066)
              , p = r(2999)
              , d = r(1320)
              , f = r(7293)
              , h = r(9909).set
              , g = r(6340)
              , _ = r(5112)("match")
              , v = o.RegExp
              , m = v.prototype
              , y = /a/g
              , b = /a/g
              , w = new v(y) !== y
              , E = p.UNSUPPORTED_Y;
            if (n && a("RegExp", !w || E || f((function() {
                return b[_] = !1,
                v(y) != y || v(b) == b || "/a/i" != v(y, "i")
            }
            )))) {
                for (var A = function RegExp(e, t) {
                    var r, n = this instanceof A, o = u(e), a = void 0 === t;
                    if (!n && o && e.constructor === A && a)
                        return e;
                    w ? o && !a && (e = e.source) : e instanceof A && (a && (t = l.call(e)),
                    e = e.source),
                    E && (r = !!t && t.indexOf("y") > -1) && (t = t.replace(/y/g, ""));
                    var s = i(w ? new v(e,t) : v(e, t), n ? this : m, A);
                    return E && r && h(s, {
                        sticky: r
                    }),
                    s
                }, proxy = function(e) {
                    e in A || s(A, e, {
                        configurable: !0,
                        get: function() {
                            return v[e]
                        },
                        set: function(t) {
                            v[e] = t
                        }
                    })
                }, S = c(v), P = 0; S.length > P; )
                    proxy(S[P++]);
                m.constructor = A,
                A.prototype = m,
                d(o, "RegExp", A)
            }
            g("RegExp")
        }
        ,
        4916: (e,t,r)=>{
            "use strict";
            var n = r(2109)
              , o = r(2261);
            n({
                target: "RegExp",
                proto: !0,
                forced: /./.exec !== o
            }, {
                exec: o
            })
        }
        ,
        8783: (e,t,r)=>{
            "use strict";
            var n = r(8710).charAt
              , o = r(9909)
              , a = r(654)
              , i = "String Iterator"
              , s = o.set
              , c = o.getterFor(i);
            a(String, "String", (function(e) {
                s(this, {
                    type: i,
                    string: String(e),
                    index: 0
                })
            }
            ), (function next() {
                var e, t = c(this), r = t.string, o = t.index;
                return o >= r.length ? {
                    value: void 0,
                    done: !0
                } : (e = n(r, o),
                t.index += e.length,
                {
                    value: e,
                    done: !1
                })
            }
            ))
        }
        ,
        6373: (e,t,r)=>{
            "use strict";
            var n = r(2109)
              , o = r(4994)
              , a = r(4488)
              , i = r(7466)
              , s = r(3099)
              , c = r(9670)
              , u = r(4326)
              , l = r(7850)
              , p = r(7066)
              , d = r(8880)
              , f = r(7293)
              , h = r(5112)
              , g = r(6707)
              , _ = r(1530)
              , v = r(9909)
              , m = r(1913)
              , y = h("matchAll")
              , b = "RegExp String"
              , w = "RegExp String Iterator"
              , E = v.set
              , A = v.getterFor(w)
              , S = RegExp.prototype
              , P = S.exec
              , O = "".matchAll
              , x = !!O && !f((function() {
                "a".matchAll(/./)
            }
            ))
              , T = o((function RegExpStringIterator(e, t, r, n) {
                E(this, {
                    type: w,
                    regexp: e,
                    string: t,
                    global: r,
                    unicode: n,
                    done: !1
                })
            }
            ), b, (function next() {
                var e = A(this);
                if (e.done)
                    return {
                        value: void 0,
                        done: !0
                    };
                var t = e.regexp
                  , r = e.string
                  , n = function(e, t) {
                    var r, n = e.exec;
                    if ("function" == typeof n) {
                        if ("object" != typeof (r = n.call(e, t)))
                            throw TypeError("Incorrect exec result");
                        return r
                    }
                    return P.call(e, t)
                }(t, r);
                return null === n ? {
                    value: void 0,
                    done: e.done = !0
                } : e.global ? ("" == String(n[0]) && (t.lastIndex = _(r, i(t.lastIndex), e.unicode)),
                {
                    value: n,
                    done: !1
                }) : (e.done = !0,
                {
                    value: n,
                    done: !1
                })
            }
            ))
              , $matchAll = function(e) {
                var t, r, n, o, a, s, u = c(this), l = String(e);
                return t = g(u, RegExp),
                void 0 === (r = u.flags) && u instanceof RegExp && !("flags"in S) && (r = p.call(u)),
                n = void 0 === r ? "" : String(r),
                o = new t(t === RegExp ? u.source : u,n),
                a = !!~n.indexOf("g"),
                s = !!~n.indexOf("u"),
                o.lastIndex = i(u.lastIndex),
                new T(o,l,a,s)
            };
            n({
                target: "String",
                proto: !0,
                forced: x
            }, {
                matchAll: function matchAll(e) {
                    var t, r, n, o = a(this);
                    if (null != e) {
                        if (l(e) && !~String(a("flags"in S ? e.flags : p.call(e))).indexOf("g"))
                            throw TypeError("`.matchAll` does not allow non-global regexes");
                        if (x)
                            return O.apply(o, arguments);
                        if (void 0 === (r = e[y]) && m && "RegExp" == u(e) && (r = $matchAll),
                        null != r)
                            return s(r).call(e, o)
                    } else if (x)
                        return O.apply(o, arguments);
                    return t = String(o),
                    n = new RegExp(e,"g"),
                    m ? $matchAll.call(n, t) : n[y](t)
                }
            }),
            m || y in S || d(S, y, $matchAll)
        }
        ,
        5306: (e,t,r)=>{
            "use strict";
            var n = r(7007)
              , o = r(9670)
              , a = r(7466)
              , i = r(9958)
              , s = r(4488)
              , c = r(1530)
              , u = r(647)
              , l = r(7651)
              , p = Math.max
              , d = Math.min;
            n("replace", 2, (function(e, t, r, n) {
                var f = n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
                  , h = n.REPLACE_KEEPS_$0
                  , g = f ? "$" : "$0";
                return [function replace(r, n) {
                    var o = s(this)
                      , a = null == r ? void 0 : r[e];
                    return void 0 !== a ? a.call(r, o, n) : t.call(String(o), r, n)
                }
                , function(e, n) {
                    if (!f && h || "string" == typeof n && -1 === n.indexOf(g)) {
                        var s = r(t, e, this, n);
                        if (s.done)
                            return s.value
                    }
                    var _ = o(e)
                      , v = String(this)
                      , m = "function" == typeof n;
                    m || (n = String(n));
                    var y = _.global;
                    if (y) {
                        var b = _.unicode;
                        _.lastIndex = 0
                    }
                    for (var w = []; ; ) {
                        var E = l(_, v);
                        if (null === E)
                            break;
                        if (w.push(E),
                        !y)
                            break;
                        "" === String(E[0]) && (_.lastIndex = c(v, a(_.lastIndex), b))
                    }
                    for (var A, S = "", P = 0, O = 0; O < w.length; O++) {
                        E = w[O];
                        for (var x = String(E[0]), T = p(d(i(E.index), v.length), 0), k = [], C = 1; C < E.length; C++)
                            k.push(void 0 === (A = E[C]) ? A : String(A));
                        var L = E.groups;
                        if (m) {
                            var I = [x].concat(k, T, v);
                            void 0 !== L && I.push(L);
                            var R = String(n.apply(void 0, I))
                        } else
                            R = u(x, v, T, k, L, n);
                        T >= P && (S += v.slice(P, T) + R,
                        P = T + x.length)
                    }
                    return S + v.slice(P)
                }
                ]
            }
            ))
        }
        ,
        1817: (e,t,r)=>{
            "use strict";
            var n = r(2109)
              , o = r(9781)
              , a = r(7854)
              , i = r(6656)
              , s = r(111)
              , c = r(3070).f
              , u = r(9920)
              , l = a.Symbol;
            if (o && "function" == typeof l && (!("description"in l.prototype) || void 0 !== l().description)) {
                var p = {}
                  , d = function Symbol() {
                    var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0])
                      , t = this instanceof d ? new l(e) : void 0 === e ? l() : l(e);
                    return "" === e && (p[t] = !0),
                    t
                };
                u(d, l);
                var f = d.prototype = l.prototype;
                f.constructor = d;
                var h = f.toString
                  , g = "Symbol(test)" == String(l("test"))
                  , _ = /^Symbol\((.*)\)[^)]+$/;
                c(f, "description", {
                    configurable: !0,
                    get: function description() {
                        var e = s(this) ? this.valueOf() : this
                          , t = h.call(e);
                        if (i(p, e))
                            return "";
                        var r = g ? t.slice(7, -1) : t.replace(_, "$1");
                        return "" === r ? void 0 : r
                    }
                }),
                n({
                    global: !0,
                    forced: !0
                }, {
                    Symbol: d
                })
            }
        }
        ,
        3824: (e,t,r)=>{
            "use strict";
            var n = r(260)
              , o = n.aTypedArray
              , a = n.exportTypedArrayMethod
              , i = [].sort;
            a("sort", (function sort(e) {
                return i.call(o(this), e)
            }
            ))
        }
        ,
        2472: (e,t,r)=>{
            r(9843)("Uint8", (function(e) {
                return function Uint8Array(t, r, n) {
                    return e(this, t, r, n)
                }
            }
            ))
        }
        ,
        3948: (e,t,r)=>{
            var n = r(7854)
              , o = r(8324)
              , a = r(6992)
              , i = r(8880)
              , s = r(5112)
              , c = s("iterator")
              , u = s("toStringTag")
              , l = a.values;
            for (var p in o) {
                var d = n[p]
                  , f = d && d.prototype;
                if (f) {
                    if (f[c] !== l)
                        try {
                            i(f, c, l)
                        } catch (g) {
                            f[c] = l
                        }
                    if (f[u] || i(f, u, p),
                    o[p])
                        for (var h in a)
                            if (f[h] !== a[h])
                                try {
                                    i(f, h, a[h])
                                } catch (g) {
                                    f[h] = a[h]
                                }
                }
            }
        }
        ,
        1637: (e,t,r)=>{
            "use strict";
            r(6992);
            var n = r(2109)
              , o = r(5005)
              , a = r(590)
              , i = r(1320)
              , s = r(2248)
              , c = r(8003)
              , u = r(4994)
              , l = r(9909)
              , p = r(5787)
              , d = r(6656)
              , f = r(9974)
              , h = r(648)
              , g = r(9670)
              , _ = r(111)
              , v = r(30)
              , m = r(9114)
              , y = r(8554)
              , b = r(1246)
              , w = r(5112)
              , E = o("fetch")
              , A = o("Headers")
              , S = w("iterator")
              , P = "URLSearchParams"
              , O = "URLSearchParamsIterator"
              , x = l.set
              , T = l.getterFor(P)
              , k = l.getterFor(O)
              , C = /\+/g
              , L = Array(4)
              , percentSequence = function(e) {
                return L[e - 1] || (L[e - 1] = RegExp("((?:%[\\da-f]{2}){" + e + "})", "gi"))
            }
              , percentDecode = function(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return e
                }
            }
              , deserialize = function(e) {
                var t = e.replace(C, " ")
                  , r = 4;
                try {
                    return decodeURIComponent(t)
                } catch (n) {
                    for (; r; )
                        t = t.replace(percentSequence(r--), percentDecode);
                    return t
                }
            }
              , I = /[!'()~]|%20/g
              , R = {
                "!": "%21",
                "'": "%27",
                "(": "%28",
                ")": "%29",
                "~": "%7E",
                "%20": "+"
            }
              , replacer = function(e) {
                return R[e]
            }
              , serialize = function(e) {
                return encodeURIComponent(e).replace(I, replacer)
            }
              , parseSearchParams = function(e, t) {
                if (t)
                    for (var r, n, o = t.split("&"), a = 0; a < o.length; )
                        (r = o[a++]).length && (n = r.split("="),
                        e.push({
                            key: deserialize(n.shift()),
                            value: deserialize(n.join("="))
                        }))
            }
              , updateSearchParams = function(e) {
                this.entries.length = 0,
                parseSearchParams(this.entries, e)
            }
              , validateArgumentsLength = function(e, t) {
                if (e < t)
                    throw TypeError("Not enough arguments")
            }
              , D = u((function Iterator(e, t) {
                x(this, {
                    type: O,
                    iterator: y(T(e).entries),
                    kind: t
                })
            }
            ), "Iterator", (function next() {
                var e = k(this)
                  , t = e.kind
                  , r = e.iterator.next()
                  , n = r.value;
                return r.done || (r.value = "keys" === t ? n.key : "values" === t ? n.value : [n.key, n.value]),
                r
            }
            ))
              , M = function URLSearchParams() {
                p(this, M, P);
                var e, t, r, n, o, a, i, s, c, u = arguments.length > 0 ? arguments[0] : void 0, l = this, f = [];
                if (x(l, {
                    type: P,
                    entries: f,
                    updateURL: function() {},
                    updateSearchParams
                }),
                void 0 !== u)
                    if (_(u))
                        if ("function" == typeof (e = b(u)))
                            for (r = (t = e.call(u)).next; !(n = r.call(t)).done; ) {
                                if ((i = (a = (o = y(g(n.value))).next).call(o)).done || (s = a.call(o)).done || !a.call(o).done)
                                    throw TypeError("Expected sequence with length 2");
                                f.push({
                                    key: i.value + "",
                                    value: s.value + ""
                                })
                            }
                        else
                            for (c in u)
                                d(u, c) && f.push({
                                    key: c,
                                    value: u[c] + ""
                                });
                    else
                        parseSearchParams(f, "string" == typeof u ? "?" === u.charAt(0) ? u.slice(1) : u : u + "")
            }
              , U = M.prototype;
            s(U, {
                append: function append(e, t) {
                    validateArgumentsLength(arguments.length, 2);
                    var r = T(this);
                    r.entries.push({
                        key: e + "",
                        value: t + ""
                    }),
                    r.updateURL()
                },
                delete: function(e) {
                    validateArgumentsLength(arguments.length, 1);
                    for (var t = T(this), r = t.entries, n = e + "", o = 0; o < r.length; )
                        r[o].key === n ? r.splice(o, 1) : o++;
                    t.updateURL()
                },
                get: function get(e) {
                    validateArgumentsLength(arguments.length, 1);
                    for (var t = T(this).entries, r = e + "", n = 0; n < t.length; n++)
                        if (t[n].key === r)
                            return t[n].value;
                    return null
                },
                getAll: function getAll(e) {
                    validateArgumentsLength(arguments.length, 1);
                    for (var t = T(this).entries, r = e + "", n = [], o = 0; o < t.length; o++)
                        t[o].key === r && n.push(t[o].value);
                    return n
                },
                has: function has(e) {
                    validateArgumentsLength(arguments.length, 1);
                    for (var t = T(this).entries, r = e + "", n = 0; n < t.length; )
                        if (t[n++].key === r)
                            return !0;
                    return !1
                },
                set: function set(e, t) {
                    validateArgumentsLength(arguments.length, 1);
                    for (var r, n = T(this), o = n.entries, a = !1, i = e + "", s = t + "", c = 0; c < o.length; c++)
                        (r = o[c]).key === i && (a ? o.splice(c--, 1) : (a = !0,
                        r.value = s));
                    a || o.push({
                        key: i,
                        value: s
                    }),
                    n.updateURL()
                },
                sort: function sort() {
                    var e, t, r, n = T(this), o = n.entries, a = o.slice();
                    for (o.length = 0,
                    r = 0; r < a.length; r++) {
                        for (e = a[r],
                        t = 0; t < r; t++)
                            if (o[t].key > e.key) {
                                o.splice(t, 0, e);
                                break
                            }
                        t === r && o.push(e)
                    }
                    n.updateURL()
                },
                forEach: function forEach(e) {
                    for (var t, r = T(this).entries, n = f(e, arguments.length > 1 ? arguments[1] : void 0, 3), o = 0; o < r.length; )
                        n((t = r[o++]).value, t.key, this)
                },
                keys: function keys() {
                    return new D(this,"keys")
                },
                values: function values() {
                    return new D(this,"values")
                },
                entries: function entries() {
                    return new D(this,"entries")
                }
            }, {
                enumerable: !0
            }),
            i(U, S, U.entries),
            i(U, "toString", (function toString() {
                for (var e, t = T(this).entries, r = [], n = 0; n < t.length; )
                    e = t[n++],
                    r.push(serialize(e.key) + "=" + serialize(e.value));
                return r.join("&")
            }
            ), {
                enumerable: !0
            }),
            c(M, P),
            n({
                global: !0,
                forced: !a
            }, {
                URLSearchParams: M
            }),
            a || "function" != typeof E || "function" != typeof A || n({
                global: !0,
                enumerable: !0,
                forced: !0
            }, {
                fetch: function fetch(e) {
                    var t, r, n, o = [e];
                    return arguments.length > 1 && (_(t = arguments[1]) && (r = t.body,
                    h(r) === P && ((n = t.headers ? new A(t.headers) : new A).has("content-type") || n.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"),
                    t = v(t, {
                        body: m(0, String(r)),
                        headers: m(0, n)
                    }))),
                    o.push(t)),
                    E.apply(this, o)
                }
            }),
            e.exports = {
                URLSearchParams: M,
                getState: T
            }
        }
        ,
        285: (e,t,r)=>{
            "use strict";
            r(8783);
            var n, o = r(2109), a = r(9781), i = r(590), s = r(7854), c = r(6048), u = r(1320), l = r(5787), p = r(6656), d = r(1574), f = r(8457), h = r(8710).codeAt, g = r(3197), _ = r(8003), v = r(1637), m = r(9909), y = s.URL, b = v.URLSearchParams, w = v.getState, E = m.set, A = m.getterFor("URL"), S = Math.floor, P = Math.pow, O = "Invalid scheme", x = "Invalid host", T = "Invalid port", k = /[A-Za-z]/, C = /[\d+-.A-Za-z]/, L = /\d/, I = /^(0x|0X)/, R = /^[0-7]+$/, D = /^\d+$/, M = /^[\dA-Fa-f]+$/, U = /[\u0000\t\u000A\u000D #%/:?@[\\]]/, j = /[\u0000\t\u000A\u000D #/:?@[\\]]/, N = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g, G = /[\t\u000A\u000D]/g, parseHost = function(e, t) {
                var r, n, o;
                if ("[" == t.charAt(0)) {
                    if ("]" != t.charAt(t.length - 1))
                        return x;
                    if (!(r = parseIPv6(t.slice(1, -1))))
                        return x;
                    e.host = r
                } else if (isSpecial(e)) {
                    if (t = g(t),
                    U.test(t))
                        return x;
                    if (null === (r = parseIPv4(t)))
                        return x;
                    e.host = r
                } else {
                    if (j.test(t))
                        return x;
                    for (r = "",
                    n = f(t),
                    o = 0; o < n.length; o++)
                        r += percentEncode(n[o], B);
                    e.host = r
                }
            }, parseIPv4 = function(e) {
                var t, r, n, o, a, i, s, c = e.split(".");
                if (c.length && "" == c[c.length - 1] && c.pop(),
                (t = c.length) > 4)
                    return e;
                for (r = [],
                n = 0; n < t; n++) {
                    if ("" == (o = c[n]))
                        return e;
                    if (a = 10,
                    o.length > 1 && "0" == o.charAt(0) && (a = I.test(o) ? 16 : 8,
                    o = o.slice(8 == a ? 1 : 2)),
                    "" === o)
                        i = 0;
                    else {
                        if (!(10 == a ? D : 8 == a ? R : M).test(o))
                            return e;
                        i = parseInt(o, a)
                    }
                    r.push(i)
                }
                for (n = 0; n < t; n++)
                    if (i = r[n],
                    n == t - 1) {
                        if (i >= P(256, 5 - t))
                            return null
                    } else if (i > 255)
                        return null;
                for (s = r.pop(),
                n = 0; n < r.length; n++)
                    s += r[n] * P(256, 3 - n);
                return s
            }, parseIPv6 = function(e) {
                var t, r, n, o, a, i, s, c = [0, 0, 0, 0, 0, 0, 0, 0], u = 0, l = null, p = 0, char = function() {
                    return e.charAt(p)
                };
                if (":" == char()) {
                    if (":" != e.charAt(1))
                        return;
                    p += 2,
                    l = ++u
                }
                for (; char(); ) {
                    if (8 == u)
                        return;
                    if (":" != char()) {
                        for (t = r = 0; r < 4 && M.test(char()); )
                            t = 16 * t + parseInt(char(), 16),
                            p++,
                            r++;
                        if ("." == char()) {
                            if (0 == r)
                                return;
                            if (p -= r,
                            u > 6)
                                return;
                            for (n = 0; char(); ) {
                                if (o = null,
                                n > 0) {
                                    if (!("." == char() && n < 4))
                                        return;
                                    p++
                                }
                                if (!L.test(char()))
                                    return;
                                for (; L.test(char()); ) {
                                    if (a = parseInt(char(), 10),
                                    null === o)
                                        o = a;
                                    else {
                                        if (0 == o)
                                            return;
                                        o = 10 * o + a
                                    }
                                    if (o > 255)
                                        return;
                                    p++
                                }
                                c[u] = 256 * c[u] + o,
                                2 != ++n && 4 != n || u++
                            }
                            if (4 != n)
                                return;
                            break
                        }
                        if (":" == char()) {
                            if (p++,
                            !char())
                                return
                        } else if (char())
                            return;
                        c[u++] = t
                    } else {
                        if (null !== l)
                            return;
                        p++,
                        l = ++u
                    }
                }
                if (null !== l)
                    for (i = u - l,
                    u = 7; 0 != u && i > 0; )
                        s = c[u],
                        c[u--] = c[l + i - 1],
                        c[l + --i] = s;
                else if (8 != u)
                    return;
                return c
            }, serializeHost = function(e) {
                var t, r, n, o;
                if ("number" == typeof e) {
                    for (t = [],
                    r = 0; r < 4; r++)
                        t.unshift(e % 256),
                        e = S(e / 256);
                    return t.join(".")
                }
                if ("object" == typeof e) {
                    for (t = "",
                    n = function(e) {
                        for (var t = null, r = 1, n = null, o = 0, a = 0; a < 8; a++)
                            0 !== e[a] ? (o > r && (t = n,
                            r = o),
                            n = null,
                            o = 0) : (null === n && (n = a),
                            ++o);
                        return o > r && (t = n,
                        r = o),
                        t
                    }(e),
                    r = 0; r < 8; r++)
                        o && 0 === e[r] || (o && (o = !1),
                        n === r ? (t += r ? ":" : "::",
                        o = !0) : (t += e[r].toString(16),
                        r < 7 && (t += ":")));
                    return "[" + t + "]"
                }
                return e
            }, B = {}, H = d({}, B, {
                " ": 1,
                '"': 1,
                "<": 1,
                ">": 1,
                "`": 1
            }), Y = d({}, H, {
                "#": 1,
                "?": 1,
                "{": 1,
                "}": 1
            }), q = d({}, Y, {
                "/": 1,
                ":": 1,
                ";": 1,
                "=": 1,
                "@": 1,
                "[": 1,
                "\\": 1,
                "]": 1,
                "^": 1,
                "|": 1
            }), percentEncode = function(e, t) {
                var r = h(e, 0);
                return r > 32 && r < 127 && !p(t, e) ? e : encodeURIComponent(e)
            }, K = {
                ftp: 21,
                file: null,
                http: 80,
                https: 443,
                ws: 80,
                wss: 443
            }, isSpecial = function(e) {
                return p(K, e.scheme)
            }, includesCredentials = function(e) {
                return "" != e.username || "" != e.password
            }, cannotHaveUsernamePasswordPort = function(e) {
                return !e.host || e.cannotBeABaseURL || "file" == e.scheme
            }, isWindowsDriveLetter = function(e, t) {
                var r;
                return 2 == e.length && k.test(e.charAt(0)) && (":" == (r = e.charAt(1)) || !t && "|" == r)
            }, startsWithWindowsDriveLetter = function(e) {
                var t;
                return e.length > 1 && isWindowsDriveLetter(e.slice(0, 2)) && (2 == e.length || "/" === (t = e.charAt(2)) || "\\" === t || "?" === t || "#" === t)
            }, shortenURLsPath = function(e) {
                var t = e.path
                  , r = t.length;
                !r || "file" == e.scheme && 1 == r && isWindowsDriveLetter(t[0], !0) || t.pop()
            }, isSingleDot = function(e) {
                return "." === e || "%2e" === e.toLowerCase()
            }, W = {}, V = {}, Z = {}, z = {}, $ = {}, X = {}, J = {}, Q = {}, ee = {}, te = {}, re = {}, ne = {}, oe = {}, ae = {}, ie = {}, se = {}, ce = {}, ue = {}, le = {}, pe = {}, de = {}, parseURL = function(e, t, r, o) {
                var a, i, s, c, u, l = r || W, d = 0, h = "", g = !1, _ = !1, v = !1;
                for (r || (e.scheme = "",
                e.username = "",
                e.password = "",
                e.host = null,
                e.port = null,
                e.path = [],
                e.query = null,
                e.fragment = null,
                e.cannotBeABaseURL = !1,
                t = t.replace(N, "")),
                t = t.replace(G, ""),
                a = f(t); d <= a.length; ) {
                    switch (i = a[d],
                    l) {
                    case W:
                        if (!i || !k.test(i)) {
                            if (r)
                                return O;
                            l = Z;
                            continue
                        }
                        h += i.toLowerCase(),
                        l = V;
                        break;
                    case V:
                        if (i && (C.test(i) || "+" == i || "-" == i || "." == i))
                            h += i.toLowerCase();
                        else {
                            if (":" != i) {
                                if (r)
                                    return O;
                                h = "",
                                l = Z,
                                d = 0;
                                continue
                            }
                            if (r && (isSpecial(e) != p(K, h) || "file" == h && (includesCredentials(e) || null !== e.port) || "file" == e.scheme && !e.host))
                                return;
                            if (e.scheme = h,
                            r)
                                return void (isSpecial(e) && K[e.scheme] == e.port && (e.port = null));
                            h = "",
                            "file" == e.scheme ? l = ae : isSpecial(e) && o && o.scheme == e.scheme ? l = z : isSpecial(e) ? l = Q : "/" == a[d + 1] ? (l = $,
                            d++) : (e.cannotBeABaseURL = !0,
                            e.path.push(""),
                            l = le)
                        }
                        break;
                    case Z:
                        if (!o || o.cannotBeABaseURL && "#" != i)
                            return O;
                        if (o.cannotBeABaseURL && "#" == i) {
                            e.scheme = o.scheme,
                            e.path = o.path.slice(),
                            e.query = o.query,
                            e.fragment = "",
                            e.cannotBeABaseURL = !0,
                            l = de;
                            break
                        }
                        l = "file" == o.scheme ? ae : X;
                        continue;
                    case z:
                        if ("/" != i || "/" != a[d + 1]) {
                            l = X;
                            continue
                        }
                        l = ee,
                        d++;
                        break;
                    case $:
                        if ("/" == i) {
                            l = te;
                            break
                        }
                        l = ue;
                        continue;
                    case X:
                        if (e.scheme = o.scheme,
                        i == n)
                            e.username = o.username,
                            e.password = o.password,
                            e.host = o.host,
                            e.port = o.port,
                            e.path = o.path.slice(),
                            e.query = o.query;
                        else if ("/" == i || "\\" == i && isSpecial(e))
                            l = J;
                        else if ("?" == i)
                            e.username = o.username,
                            e.password = o.password,
                            e.host = o.host,
                            e.port = o.port,
                            e.path = o.path.slice(),
                            e.query = "",
                            l = pe;
                        else {
                            if ("#" != i) {
                                e.username = o.username,
                                e.password = o.password,
                                e.host = o.host,
                                e.port = o.port,
                                e.path = o.path.slice(),
                                e.path.pop(),
                                l = ue;
                                continue
                            }
                            e.username = o.username,
                            e.password = o.password,
                            e.host = o.host,
                            e.port = o.port,
                            e.path = o.path.slice(),
                            e.query = o.query,
                            e.fragment = "",
                            l = de
                        }
                        break;
                    case J:
                        if (!isSpecial(e) || "/" != i && "\\" != i) {
                            if ("/" != i) {
                                e.username = o.username,
                                e.password = o.password,
                                e.host = o.host,
                                e.port = o.port,
                                l = ue;
                                continue
                            }
                            l = te
                        } else
                            l = ee;
                        break;
                    case Q:
                        if (l = ee,
                        "/" != i || "/" != h.charAt(d + 1))
                            continue;
                        d++;
                        break;
                    case ee:
                        if ("/" != i && "\\" != i) {
                            l = te;
                            continue
                        }
                        break;
                    case te:
                        if ("@" == i) {
                            g && (h = "%40" + h),
                            g = !0,
                            s = f(h);
                            for (var m = 0; m < s.length; m++) {
                                var y = s[m];
                                if (":" != y || v) {
                                    var b = percentEncode(y, q);
                                    v ? e.password += b : e.username += b
                                } else
                                    v = !0
                            }
                            h = ""
                        } else if (i == n || "/" == i || "?" == i || "#" == i || "\\" == i && isSpecial(e)) {
                            if (g && "" == h)
                                return "Invalid authority";
                            d -= f(h).length + 1,
                            h = "",
                            l = re
                        } else
                            h += i;
                        break;
                    case re:
                    case ne:
                        if (r && "file" == e.scheme) {
                            l = se;
                            continue
                        }
                        if (":" != i || _) {
                            if (i == n || "/" == i || "?" == i || "#" == i || "\\" == i && isSpecial(e)) {
                                if (isSpecial(e) && "" == h)
                                    return x;
                                if (r && "" == h && (includesCredentials(e) || null !== e.port))
                                    return;
                                if (c = parseHost(e, h))
                                    return c;
                                if (h = "",
                                l = ce,
                                r)
                                    return;
                                continue
                            }
                            "[" == i ? _ = !0 : "]" == i && (_ = !1),
                            h += i
                        } else {
                            if ("" == h)
                                return x;
                            if (c = parseHost(e, h))
                                return c;
                            if (h = "",
                            l = oe,
                            r == ne)
                                return
                        }
                        break;
                    case oe:
                        if (!L.test(i)) {
                            if (i == n || "/" == i || "?" == i || "#" == i || "\\" == i && isSpecial(e) || r) {
                                if ("" != h) {
                                    var w = parseInt(h, 10);
                                    if (w > 65535)
                                        return T;
                                    e.port = isSpecial(e) && w === K[e.scheme] ? null : w,
                                    h = ""
                                }
                                if (r)
                                    return;
                                l = ce;
                                continue
                            }
                            return T
                        }
                        h += i;
                        break;
                    case ae:
                        if (e.scheme = "file",
                        "/" == i || "\\" == i)
                            l = ie;
                        else {
                            if (!o || "file" != o.scheme) {
                                l = ue;
                                continue
                            }
                            if (i == n)
                                e.host = o.host,
                                e.path = o.path.slice(),
                                e.query = o.query;
                            else if ("?" == i)
                                e.host = o.host,
                                e.path = o.path.slice(),
                                e.query = "",
                                l = pe;
                            else {
                                if ("#" != i) {
                                    startsWithWindowsDriveLetter(a.slice(d).join("")) || (e.host = o.host,
                                    e.path = o.path.slice(),
                                    shortenURLsPath(e)),
                                    l = ue;
                                    continue
                                }
                                e.host = o.host,
                                e.path = o.path.slice(),
                                e.query = o.query,
                                e.fragment = "",
                                l = de
                            }
                        }
                        break;
                    case ie:
                        if ("/" == i || "\\" == i) {
                            l = se;
                            break
                        }
                        o && "file" == o.scheme && !startsWithWindowsDriveLetter(a.slice(d).join("")) && (isWindowsDriveLetter(o.path[0], !0) ? e.path.push(o.path[0]) : e.host = o.host),
                        l = ue;
                        continue;
                    case se:
                        if (i == n || "/" == i || "\\" == i || "?" == i || "#" == i) {
                            if (!r && isWindowsDriveLetter(h))
                                l = ue;
                            else if ("" == h) {
                                if (e.host = "",
                                r)
                                    return;
                                l = ce
                            } else {
                                if (c = parseHost(e, h))
                                    return c;
                                if ("localhost" == e.host && (e.host = ""),
                                r)
                                    return;
                                h = "",
                                l = ce
                            }
                            continue
                        }
                        h += i;
                        break;
                    case ce:
                        if (isSpecial(e)) {
                            if (l = ue,
                            "/" != i && "\\" != i)
                                continue
                        } else if (r || "?" != i)
                            if (r || "#" != i) {
                                if (i != n && (l = ue,
                                "/" != i))
                                    continue
                            } else
                                e.fragment = "",
                                l = de;
                        else
                            e.query = "",
                            l = pe;
                        break;
                    case ue:
                        if (i == n || "/" == i || "\\" == i && isSpecial(e) || !r && ("?" == i || "#" == i)) {
                            if (".." === (u = (u = h).toLowerCase()) || "%2e." === u || ".%2e" === u || "%2e%2e" === u ? (shortenURLsPath(e),
                            "/" == i || "\\" == i && isSpecial(e) || e.path.push("")) : isSingleDot(h) ? "/" == i || "\\" == i && isSpecial(e) || e.path.push("") : ("file" == e.scheme && !e.path.length && isWindowsDriveLetter(h) && (e.host && (e.host = ""),
                            h = h.charAt(0) + ":"),
                            e.path.push(h)),
                            h = "",
                            "file" == e.scheme && (i == n || "?" == i || "#" == i))
                                for (; e.path.length > 1 && "" === e.path[0]; )
                                    e.path.shift();
                            "?" == i ? (e.query = "",
                            l = pe) : "#" == i && (e.fragment = "",
                            l = de)
                        } else
                            h += percentEncode(i, Y);
                        break;
                    case le:
                        "?" == i ? (e.query = "",
                        l = pe) : "#" == i ? (e.fragment = "",
                        l = de) : i != n && (e.path[0] += percentEncode(i, B));
                        break;
                    case pe:
                        r || "#" != i ? i != n && ("'" == i && isSpecial(e) ? e.query += "%27" : e.query += "#" == i ? "%23" : percentEncode(i, B)) : (e.fragment = "",
                        l = de);
                        break;
                    case de:
                        i != n && (e.fragment += percentEncode(i, H))
                    }
                    d++
                }
            }, fe = function URL(e) {
                var t, r, n = l(this, fe, "URL"), o = arguments.length > 1 ? arguments[1] : void 0, i = String(e), s = E(n, {
                    type: "URL"
                });
                if (void 0 !== o)
                    if (o instanceof fe)
                        t = A(o);
                    else if (r = parseURL(t = {}, String(o)))
                        throw TypeError(r);
                if (r = parseURL(s, i, null, t))
                    throw TypeError(r);
                var c = s.searchParams = new b
                  , u = w(c);
                u.updateSearchParams(s.query),
                u.updateURL = function() {
                    s.query = String(c) || null
                }
                ,
                a || (n.href = serializeURL.call(n),
                n.origin = getOrigin.call(n),
                n.protocol = getProtocol.call(n),
                n.username = getUsername.call(n),
                n.password = getPassword.call(n),
                n.host = getHost.call(n),
                n.hostname = getHostname.call(n),
                n.port = getPort.call(n),
                n.pathname = getPathname.call(n),
                n.search = getSearch.call(n),
                n.searchParams = getSearchParams.call(n),
                n.hash = getHash.call(n))
            }, he = fe.prototype, serializeURL = function() {
                var e = A(this)
                  , t = e.scheme
                  , r = e.username
                  , n = e.password
                  , o = e.host
                  , a = e.port
                  , i = e.path
                  , s = e.query
                  , c = e.fragment
                  , u = t + ":";
                return null !== o ? (u += "//",
                includesCredentials(e) && (u += r + (n ? ":" + n : "") + "@"),
                u += serializeHost(o),
                null !== a && (u += ":" + a)) : "file" == t && (u += "//"),
                u += e.cannotBeABaseURL ? i[0] : i.length ? "/" + i.join("/") : "",
                null !== s && (u += "?" + s),
                null !== c && (u += "#" + c),
                u
            }, getOrigin = function() {
                var e = A(this)
                  , t = e.scheme
                  , r = e.port;
                if ("blob" == t)
                    try {
                        return new URL(t.path[0]).origin
                    } catch (n) {
                        return "null"
                    }
                return "file" != t && isSpecial(e) ? t + "://" + serializeHost(e.host) + (null !== r ? ":" + r : "") : "null"
            }, getProtocol = function() {
                return A(this).scheme + ":"
            }, getUsername = function() {
                return A(this).username
            }, getPassword = function() {
                return A(this).password
            }, getHost = function() {
                var e = A(this)
                  , t = e.host
                  , r = e.port;
                return null === t ? "" : null === r ? serializeHost(t) : serializeHost(t) + ":" + r
            }, getHostname = function() {
                var e = A(this).host;
                return null === e ? "" : serializeHost(e)
            }, getPort = function() {
                var e = A(this).port;
                return null === e ? "" : String(e)
            }, getPathname = function() {
                var e = A(this)
                  , t = e.path;
                return e.cannotBeABaseURL ? t[0] : t.length ? "/" + t.join("/") : ""
            }, getSearch = function() {
                var e = A(this).query;
                return e ? "?" + e : ""
            }, getSearchParams = function() {
                return A(this).searchParams
            }, getHash = function() {
                var e = A(this).fragment;
                return e ? "#" + e : ""
            }, accessorDescriptor = function(e, t) {
                return {
                    get: e,
                    set: t,
                    configurable: !0,
                    enumerable: !0
                }
            };
            if (a && c(he, {
                href: accessorDescriptor(serializeURL, (function(e) {
                    var t = A(this)
                      , r = String(e)
                      , n = parseURL(t, r);
                    if (n)
                        throw TypeError(n);
                    w(t.searchParams).updateSearchParams(t.query)
                }
                )),
                origin: accessorDescriptor(getOrigin),
                protocol: accessorDescriptor(getProtocol, (function(e) {
                    var t = A(this);
                    parseURL(t, String(e) + ":", W)
                }
                )),
                username: accessorDescriptor(getUsername, (function(e) {
                    var t = A(this)
                      , r = f(String(e));
                    if (!cannotHaveUsernamePasswordPort(t)) {
                        t.username = "";
                        for (var n = 0; n < r.length; n++)
                            t.username += percentEncode(r[n], q)
                    }
                }
                )),
                password: accessorDescriptor(getPassword, (function(e) {
                    var t = A(this)
                      , r = f(String(e));
                    if (!cannotHaveUsernamePasswordPort(t)) {
                        t.password = "";
                        for (var n = 0; n < r.length; n++)
                            t.password += percentEncode(r[n], q)
                    }
                }
                )),
                host: accessorDescriptor(getHost, (function(e) {
                    var t = A(this);
                    t.cannotBeABaseURL || parseURL(t, String(e), re)
                }
                )),
                hostname: accessorDescriptor(getHostname, (function(e) {
                    var t = A(this);
                    t.cannotBeABaseURL || parseURL(t, String(e), ne)
                }
                )),
                port: accessorDescriptor(getPort, (function(e) {
                    var t = A(this);
                    cannotHaveUsernamePasswordPort(t) || ("" == (e = String(e)) ? t.port = null : parseURL(t, e, oe))
                }
                )),
                pathname: accessorDescriptor(getPathname, (function(e) {
                    var t = A(this);
                    t.cannotBeABaseURL || (t.path = [],
                    parseURL(t, e + "", ce))
                }
                )),
                search: accessorDescriptor(getSearch, (function(e) {
                    var t = A(this);
                    "" == (e = String(e)) ? t.query = null : ("?" == e.charAt(0) && (e = e.slice(1)),
                    t.query = "",
                    parseURL(t, e, pe)),
                    w(t.searchParams).updateSearchParams(t.query)
                }
                )),
                searchParams: accessorDescriptor(getSearchParams),
                hash: accessorDescriptor(getHash, (function(e) {
                    var t = A(this);
                    "" != (e = String(e)) ? ("#" == e.charAt(0) && (e = e.slice(1)),
                    t.fragment = "",
                    parseURL(t, e, de)) : t.fragment = null
                }
                ))
            }),
            u(he, "toJSON", (function toJSON() {
                return serializeURL.call(this)
            }
            ), {
                enumerable: !0
            }),
            u(he, "toString", (function toString() {
                return serializeURL.call(this)
            }
            ), {
                enumerable: !0
            }),
            y) {
                var ge = y.createObjectURL
                  , _e = y.revokeObjectURL;
                ge && u(fe, "createObjectURL", (function createObjectURL(e) {
                    return ge.apply(y, arguments)
                }
                )),
                _e && u(fe, "revokeObjectURL", (function revokeObjectURL(e) {
                    return _e.apply(y, arguments)
                }
                ))
            }
            _(fe, "URL"),
            o({
                global: !0,
                forced: !i,
                sham: !a
            }, {
                URL: fe
            })
        }
        ,
        1989: (e,t,r)=>{
            var n = r(1789)
              , o = r(401)
              , a = r(7667)
              , i = r(1327)
              , s = r(1866);
            function Hash(e) {
                var t = -1
                  , r = null == e ? 0 : e.length;
                for (this.clear(); ++t < r; ) {
                    var n = e[t];
                    this.set(n[0], n[1])
                }
            }
            Hash.prototype.clear = n,
            Hash.prototype.delete = o,
            Hash.prototype.get = a,
            Hash.prototype.has = i,
            Hash.prototype.set = s,
            e.exports = Hash
        }
        ,
        8407: (e,t,r)=>{
            var n = r(7040)
              , o = r(4125)
              , a = r(2117)
              , i = r(7518)
              , s = r(3399);
            function ListCache(e) {
                var t = -1
                  , r = null == e ? 0 : e.length;
                for (this.clear(); ++t < r; ) {
                    var n = e[t];
                    this.set(n[0], n[1])
                }
            }
            ListCache.prototype.clear = n,
            ListCache.prototype.delete = o,
            ListCache.prototype.get = a,
            ListCache.prototype.has = i,
            ListCache.prototype.set = s,
            e.exports = ListCache
        }
        ,
        7071: (e,t,r)=>{
            var n = r(852)(r(5639), "Map");
            e.exports = n
        }
        ,
        3369: (e,t,r)=>{
            var n = r(4785)
              , o = r(1285)
              , a = r(6e3)
              , i = r(9916)
              , s = r(5265);
            function MapCache(e) {
                var t = -1
                  , r = null == e ? 0 : e.length;
                for (this.clear(); ++t < r; ) {
                    var n = e[t];
                    this.set(n[0], n[1])
                }
            }
            MapCache.prototype.clear = n,
            MapCache.prototype.delete = o,
            MapCache.prototype.get = a,
            MapCache.prototype.has = i,
            MapCache.prototype.set = s,
            e.exports = MapCache
        }
        ,
        6384: (e,t,r)=>{
            var n = r(8407)
              , o = r(7465)
              , a = r(3779)
              , i = r(7599)
              , s = r(4758)
              , c = r(4309);
            function Stack(e) {
                var t = this.__data__ = new n(e);
                this.size = t.size
            }
            Stack.prototype.clear = o,
            Stack.prototype.delete = a,
            Stack.prototype.get = i,
            Stack.prototype.has = s,
            Stack.prototype.set = c,
            e.exports = Stack
        }
        ,
        2705: (e,t,r)=>{
            var n = r(5639).Symbol;
            e.exports = n
        }
        ,
        1149: (e,t,r)=>{
            var n = r(5639).Uint8Array;
            e.exports = n
        }
        ,
        6874: e=>{
            e.exports = function apply(e, t, r) {
                switch (r.length) {
                case 0:
                    return e.call(t);
                case 1:
                    return e.call(t, r[0]);
                case 2:
                    return e.call(t, r[0], r[1]);
                case 3:
                    return e.call(t, r[0], r[1], r[2])
                }
                return e.apply(t, r)
            }
        }
        ,
        4636: (e,t,r)=>{
            var n = r(2545)
              , o = r(5694)
              , a = r(1469)
              , i = r(4144)
              , s = r(5776)
              , c = r(6719)
              , u = Object.prototype.hasOwnProperty;
            e.exports = function arrayLikeKeys(e, t) {
                var r = a(e)
                  , l = !r && o(e)
                  , p = !r && !l && i(e)
                  , d = !r && !l && !p && c(e)
                  , f = r || l || p || d
                  , h = f ? n(e.length, String) : []
                  , g = h.length;
                for (var _ in e)
                    !t && !u.call(e, _) || f && ("length" == _ || p && ("offset" == _ || "parent" == _) || d && ("buffer" == _ || "byteLength" == _ || "byteOffset" == _) || s(_, g)) || h.push(_);
                return h
            }
        }
        ,
        6556: (e,t,r)=>{
            var n = r(9465)
              , o = r(7813);
            e.exports = function assignMergeValue(e, t, r) {
                (void 0 !== r && !o(e[t], r) || void 0 === r && !(t in e)) && n(e, t, r)
            }
        }
        ,
        4865: (e,t,r)=>{
            var n = r(9465)
              , o = r(7813)
              , a = Object.prototype.hasOwnProperty;
            e.exports = function assignValue(e, t, r) {
                var i = e[t];
                a.call(e, t) && o(i, r) && (void 0 !== r || t in e) || n(e, t, r)
            }
        }
        ,
        8470: (e,t,r)=>{
            var n = r(7813);
            e.exports = function assocIndexOf(e, t) {
                for (var r = e.length; r--; )
                    if (n(e[r][0], t))
                        return r;
                return -1
            }
        }
        ,
        9465: (e,t,r)=>{
            var n = r(8777);
            e.exports = function baseAssignValue(e, t, r) {
                "__proto__" == t && n ? n(e, t, {
                    configurable: !0,
                    enumerable: !0,
                    value: r,
                    writable: !0
                }) : e[t] = r
            }
        }
        ,
        3118: (e,t,r)=>{
            var n = r(3218)
              , o = Object.create
              , a = function() {
                function object() {}
                return function(e) {
                    if (!n(e))
                        return {};
                    if (o)
                        return o(e);
                    object.prototype = e;
                    var t = new object;
                    return object.prototype = void 0,
                    t
                }
            }();
            e.exports = a
        }
        ,
        8483: (e,t,r)=>{
            var n = r(5063)();
            e.exports = n
        }
        ,
        4239: (e,t,r)=>{
            var n = r(2705)
              , o = r(9607)
              , a = r(2333)
              , i = n ? n.toStringTag : void 0;
            e.exports = function baseGetTag(e) {
                return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : i && i in Object(e) ? o(e) : a(e)
            }
        }
        ,
        9454: (e,t,r)=>{
            var n = r(4239)
              , o = r(7005);
            e.exports = function baseIsArguments(e) {
                return o(e) && "[object Arguments]" == n(e)
            }
        }
        ,
        8458: (e,t,r)=>{
            var n = r(3560)
              , o = r(5346)
              , a = r(3218)
              , i = r(346)
              , s = /^\[object .+?Constructor\]$/
              , c = Function.prototype
              , u = Object.prototype
              , l = c.toString
              , p = u.hasOwnProperty
              , d = RegExp("^" + l.call(p).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
            e.exports = function baseIsNative(e) {
                return !(!a(e) || o(e)) && (n(e) ? d : s).test(i(e))
            }
        }
        ,
        8749: (e,t,r)=>{
            var n = r(4239)
              , o = r(1780)
              , a = r(7005)
              , i = {};
            i["[object Float32Array]"] = i["[object Float64Array]"] = i["[object Int8Array]"] = i["[object Int16Array]"] = i["[object Int32Array]"] = i["[object Uint8Array]"] = i["[object Uint8ClampedArray]"] = i["[object Uint16Array]"] = i["[object Uint32Array]"] = !0,
            i["[object Arguments]"] = i["[object Array]"] = i["[object ArrayBuffer]"] = i["[object Boolean]"] = i["[object DataView]"] = i["[object Date]"] = i["[object Error]"] = i["[object Function]"] = i["[object Map]"] = i["[object Number]"] = i["[object Object]"] = i["[object RegExp]"] = i["[object Set]"] = i["[object String]"] = i["[object WeakMap]"] = !1,
            e.exports = function baseIsTypedArray(e) {
                return a(e) && o(e.length) && !!i[n(e)]
            }
        }
        ,
        313: (e,t,r)=>{
            var n = r(3218)
              , o = r(5726)
              , a = r(3498)
              , i = Object.prototype.hasOwnProperty;
            e.exports = function baseKeysIn(e) {
                if (!n(e))
                    return a(e);
                var t = o(e)
                  , r = [];
                for (var s in e)
                    ("constructor" != s || !t && i.call(e, s)) && r.push(s);
                return r
            }
        }
        ,
        2980: (e,t,r)=>{
            var n = r(6384)
              , o = r(6556)
              , a = r(8483)
              , i = r(9783)
              , s = r(3218)
              , c = r(1704)
              , u = r(6390);
            e.exports = function baseMerge(e, t, r, l, p) {
                e !== t && a(t, (function(a, c) {
                    if (p || (p = new n),
                    s(a))
                        i(e, t, c, r, baseMerge, l, p);
                    else {
                        var d = l ? l(u(e, c), a, c + "", e, t, p) : void 0;
                        void 0 === d && (d = a),
                        o(e, c, d)
                    }
                }
                ), c)
            }
        }
        ,
        9783: (e,t,r)=>{
            var n = r(6556)
              , o = r(4626)
              , a = r(7133)
              , i = r(278)
              , s = r(8517)
              , c = r(5694)
              , u = r(1469)
              , l = r(9246)
              , p = r(4144)
              , d = r(3560)
              , f = r(3218)
              , h = r(8630)
              , g = r(6719)
              , _ = r(6390)
              , v = r(9881);
            e.exports = function baseMergeDeep(e, t, r, m, y, b, w) {
                var E = _(e, r)
                  , A = _(t, r)
                  , S = w.get(A);
                if (S)
                    n(e, r, S);
                else {
                    var P = b ? b(E, A, r + "", e, t, w) : void 0
                      , O = void 0 === P;
                    if (O) {
                        var x = u(A)
                          , T = !x && p(A)
                          , k = !x && !T && g(A);
                        P = A,
                        x || T || k ? u(E) ? P = E : l(E) ? P = i(E) : T ? (O = !1,
                        P = o(A, !0)) : k ? (O = !1,
                        P = a(A, !0)) : P = [] : h(A) || c(A) ? (P = E,
                        c(E) ? P = v(E) : f(E) && !d(E) || (P = s(A))) : O = !1
                    }
                    O && (w.set(A, P),
                    y(P, A, m, b, w),
                    w.delete(A)),
                    n(e, r, P)
                }
            }
        }
        ,
        5976: (e,t,r)=>{
            var n = r(6557)
              , o = r(5357)
              , a = r(61);
            e.exports = function baseRest(e, t) {
                return a(o(e, t, n), e + "")
            }
        }
        ,
        6560: (e,t,r)=>{
            var n = r(5703)
              , o = r(8777)
              , a = r(6557)
              , i = o ? function(e, t) {
                return o(e, "toString", {
                    configurable: !0,
                    enumerable: !1,
                    value: n(t),
                    writable: !0
                })
            }
            : a;
            e.exports = i
        }
        ,
        2545: e=>{
            e.exports = function baseTimes(e, t) {
                for (var r = -1, n = Array(e); ++r < e; )
                    n[r] = t(r);
                return n
            }
        }
        ,
        1717: e=>{
            e.exports = function baseUnary(e) {
                return function(t) {
                    return e(t)
                }
            }
        }
        ,
        4318: (e,t,r)=>{
            var n = r(1149);
            e.exports = function cloneArrayBuffer(e) {
                var t = new e.constructor(e.byteLength);
                return new n(t).set(new n(e)),
                t
            }
        }
        ,
        4626: (e,t,r)=>{
            e = r.nmd(e);
            var n = r(5639)
              , o = t && !t.nodeType && t
              , a = o && e && !e.nodeType && e
              , i = a && a.exports === o ? n.Buffer : void 0
              , s = i ? i.allocUnsafe : void 0;
            e.exports = function cloneBuffer(e, t) {
                if (t)
                    return e.slice();
                var r = e.length
                  , n = s ? s(r) : new e.constructor(r);
                return e.copy(n),
                n
            }
        }
        ,
        7133: (e,t,r)=>{
            var n = r(4318);
            e.exports = function cloneTypedArray(e, t) {
                var r = t ? n(e.buffer) : e.buffer;
                return new e.constructor(r,e.byteOffset,e.length)
            }
        }
        ,
        278: e=>{
            e.exports = function copyArray(e, t) {
                var r = -1
                  , n = e.length;
                for (t || (t = Array(n)); ++r < n; )
                    t[r] = e[r];
                return t
            }
        }
        ,
        8363: (e,t,r)=>{
            var n = r(4865)
              , o = r(9465);
            e.exports = function copyObject(e, t, r, a) {
                var i = !r;
                r || (r = {});
                for (var s = -1, c = t.length; ++s < c; ) {
                    var u = t[s]
                      , l = a ? a(r[u], e[u], u, r, e) : void 0;
                    void 0 === l && (l = e[u]),
                    i ? o(r, u, l) : n(r, u, l)
                }
                return r
            }
        }
        ,
        4429: (e,t,r)=>{
            var n = r(5639)["__core-js_shared__"];
            e.exports = n
        }
        ,
        1463: (e,t,r)=>{
            var n = r(5976)
              , o = r(6612);
            e.exports = function createAssigner(e) {
                return n((function(t, r) {
                    var n = -1
                      , a = r.length
                      , i = a > 1 ? r[a - 1] : void 0
                      , s = a > 2 ? r[2] : void 0;
                    for (i = e.length > 3 && "function" == typeof i ? (a--,
                    i) : void 0,
                    s && o(r[0], r[1], s) && (i = a < 3 ? void 0 : i,
                    a = 1),
                    t = Object(t); ++n < a; ) {
                        var c = r[n];
                        c && e(t, c, n, i)
                    }
                    return t
                }
                ))
            }
        }
        ,
        5063: e=>{
            e.exports = function createBaseFor(e) {
                return function(t, r, n) {
                    for (var o = -1, a = Object(t), i = n(t), s = i.length; s--; ) {
                        var c = i[e ? s : ++o];
                        if (!1 === r(a[c], c, a))
                            break
                    }
                    return t
                }
            }
        }
        ,
        8777: (e,t,r)=>{
            var n = r(852)
              , o = function() {
                try {
                    var e = n(Object, "defineProperty");
                    return e({}, "", {}),
                    e
                } catch (t) {}
            }();
            e.exports = o
        }
        ,
        1957: (e,t,r)=>{
            var n = "object" == typeof r.g && r.g && r.g.Object === Object && r.g;
            e.exports = n
        }
        ,
        5050: (e,t,r)=>{
            var n = r(7019);
            e.exports = function getMapData(e, t) {
                var r = e.__data__;
                return n(t) ? r["string" == typeof t ? "string" : "hash"] : r.map
            }
        }
        ,
        852: (e,t,r)=>{
            var n = r(8458)
              , o = r(7801);
            e.exports = function getNative(e, t) {
                var r = o(e, t);
                return n(r) ? r : void 0
            }
        }
        ,
        5924: (e,t,r)=>{
            var n = r(5569)(Object.getPrototypeOf, Object);
            e.exports = n
        }
        ,
        9607: (e,t,r)=>{
            var n = r(2705)
              , o = Object.prototype
              , a = o.hasOwnProperty
              , i = o.toString
              , s = n ? n.toStringTag : void 0;
            e.exports = function getRawTag(e) {
                var t = a.call(e, s)
                  , r = e[s];
                try {
                    e[s] = void 0;
                    var n = !0
                } catch (c) {}
                var o = i.call(e);
                return n && (t ? e[s] = r : delete e[s]),
                o
            }
        }
        ,
        7801: e=>{
            e.exports = function getValue(e, t) {
                return null == e ? void 0 : e[t]
            }
        }
        ,
        1789: (e,t,r)=>{
            var n = r(4536);
            e.exports = function hashClear() {
                this.__data__ = n ? n(null) : {},
                this.size = 0
            }
        }
        ,
        401: e=>{
            e.exports = function hashDelete(e) {
                var t = this.has(e) && delete this.__data__[e];
                return this.size -= t ? 1 : 0,
                t
            }
        }
        ,
        7667: (e,t,r)=>{
            var n = r(4536)
              , o = Object.prototype.hasOwnProperty;
            e.exports = function hashGet(e) {
                var t = this.__data__;
                if (n) {
                    var r = t[e];
                    return "__lodash_hash_undefined__" === r ? void 0 : r
                }
                return o.call(t, e) ? t[e] : void 0
            }
        }
        ,
        1327: (e,t,r)=>{
            var n = r(4536)
              , o = Object.prototype.hasOwnProperty;
            e.exports = function hashHas(e) {
                var t = this.__data__;
                return n ? void 0 !== t[e] : o.call(t, e)
            }
        }
        ,
        1866: (e,t,r)=>{
            var n = r(4536);
            e.exports = function hashSet(e, t) {
                var r = this.__data__;
                return this.size += this.has(e) ? 0 : 1,
                r[e] = n && void 0 === t ? "__lodash_hash_undefined__" : t,
                this
            }
        }
        ,
        8517: (e,t,r)=>{
            var n = r(3118)
              , o = r(5924)
              , a = r(5726);
            e.exports = function initCloneObject(e) {
                return "function" != typeof e.constructor || a(e) ? {} : n(o(e))
            }
        }
        ,
        5776: e=>{
            var t = /^(?:0|[1-9]\d*)$/;
            e.exports = function isIndex(e, r) {
                var n = typeof e;
                return !!(r = null == r ? 9007199254740991 : r) && ("number" == n || "symbol" != n && t.test(e)) && e > -1 && e % 1 == 0 && e < r
            }
        }
        ,
        6612: (e,t,r)=>{
            var n = r(7813)
              , o = r(8612)
              , a = r(5776)
              , i = r(3218);
            e.exports = function isIterateeCall(e, t, r) {
                if (!i(r))
                    return !1;
                var s = typeof t;
                return !!("number" == s ? o(r) && a(t, r.length) : "string" == s && t in r) && n(r[t], e)
            }
        }
        ,
        7019: e=>{
            e.exports = function isKeyable(e) {
                var t = typeof e;
                return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
            }
        }
        ,
        5346: (e,t,r)=>{
            var n, o = r(4429), a = (n = /[^.]+$/.exec(o && o.keys && o.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "";
            e.exports = function isMasked(e) {
                return !!a && a in e
            }
        }
        ,
        5726: e=>{
            var t = Object.prototype;
            e.exports = function isPrototype(e) {
                var r = e && e.constructor;
                return e === ("function" == typeof r && r.prototype || t)
            }
        }
        ,
        7040: e=>{
            e.exports = function listCacheClear() {
                this.__data__ = [],
                this.size = 0
            }
        }
        ,
        4125: (e,t,r)=>{
            var n = r(8470)
              , o = Array.prototype.splice;
            e.exports = function listCacheDelete(e) {
                var t = this.__data__
                  , r = n(t, e);
                return !(r < 0) && (r == t.length - 1 ? t.pop() : o.call(t, r, 1),
                --this.size,
                !0)
            }
        }
        ,
        2117: (e,t,r)=>{
            var n = r(8470);
            e.exports = function listCacheGet(e) {
                var t = this.__data__
                  , r = n(t, e);
                return r < 0 ? void 0 : t[r][1]
            }
        }
        ,
        7518: (e,t,r)=>{
            var n = r(8470);
            e.exports = function listCacheHas(e) {
                return n(this.__data__, e) > -1
            }
        }
        ,
        3399: (e,t,r)=>{
            var n = r(8470);
            e.exports = function listCacheSet(e, t) {
                var r = this.__data__
                  , o = n(r, e);
                return o < 0 ? (++this.size,
                r.push([e, t])) : r[o][1] = t,
                this
            }
        }
        ,
        4785: (e,t,r)=>{
            var n = r(1989)
              , o = r(8407)
              , a = r(7071);
            e.exports = function mapCacheClear() {
                this.size = 0,
                this.__data__ = {
                    hash: new n,
                    map: new (a || o),
                    string: new n
                }
            }
        }
        ,
        1285: (e,t,r)=>{
            var n = r(5050);
            e.exports = function mapCacheDelete(e) {
                var t = n(this, e).delete(e);
                return this.size -= t ? 1 : 0,
                t
            }
        }
        ,
        6e3: (e,t,r)=>{
            var n = r(5050);
            e.exports = function mapCacheGet(e) {
                return n(this, e).get(e)
            }
        }
        ,
        9916: (e,t,r)=>{
            var n = r(5050);
            e.exports = function mapCacheHas(e) {
                return n(this, e).has(e)
            }
        }
        ,
        5265: (e,t,r)=>{
            var n = r(5050);
            e.exports = function mapCacheSet(e, t) {
                var r = n(this, e)
                  , o = r.size;
                return r.set(e, t),
                this.size += r.size == o ? 0 : 1,
                this
            }
        }
        ,
        4536: (e,t,r)=>{
            var n = r(852)(Object, "create");
            e.exports = n
        }
        ,
        3498: e=>{
            e.exports = function nativeKeysIn(e) {
                var t = [];
                if (null != e)
                    for (var r in Object(e))
                        t.push(r);
                return t
            }
        }
        ,
        1167: (e,t,r)=>{
            e = r.nmd(e);
            var n = r(1957)
              , o = t && !t.nodeType && t
              , a = o && e && !e.nodeType && e
              , i = a && a.exports === o && n.process
              , s = function() {
                try {
                    var e = a && a.require && a.require("util").types;
                    return e || i && i.binding && i.binding("util")
                } catch (t) {}
            }();
            e.exports = s
        }
        ,
        2333: e=>{
            var t = Object.prototype.toString;
            e.exports = function objectToString(e) {
                return t.call(e)
            }
        }
        ,
        5569: e=>{
            e.exports = function overArg(e, t) {
                return function(r) {
                    return e(t(r))
                }
            }
        }
        ,
        5357: (e,t,r)=>{
            var n = r(6874)
              , o = Math.max;
            e.exports = function overRest(e, t, r) {
                return t = o(void 0 === t ? e.length - 1 : t, 0),
                function() {
                    for (var a = arguments, i = -1, s = o(a.length - t, 0), c = Array(s); ++i < s; )
                        c[i] = a[t + i];
                    i = -1;
                    for (var u = Array(t + 1); ++i < t; )
                        u[i] = a[i];
                    return u[t] = r(c),
                    n(e, this, u)
                }
            }
        }
        ,
        5639: (e,t,r)=>{
            var n = r(1957)
              , o = "object" == typeof self && self && self.Object === Object && self
              , a = n || o || Function("return this")();
            e.exports = a
        }
        ,
        6390: e=>{
            e.exports = function safeGet(e, t) {
                if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                    return e[t]
            }
        }
        ,
        61: (e,t,r)=>{
            var n = r(6560)
              , o = r(1275)(n);
            e.exports = o
        }
        ,
        1275: e=>{
            var t = Date.now;
            e.exports = function shortOut(e) {
                var r = 0
                  , n = 0;
                return function() {
                    var o = t()
                      , a = 16 - (o - n);
                    if (n = o,
                    a > 0) {
                        if (++r >= 800)
                            return arguments[0]
                    } else
                        r = 0;
                    return e.apply(void 0, arguments)
                }
            }
        }
        ,
        7465: (e,t,r)=>{
            var n = r(8407);
            e.exports = function stackClear() {
                this.__data__ = new n,
                this.size = 0
            }
        }
        ,
        3779: e=>{
            e.exports = function stackDelete(e) {
                var t = this.__data__
                  , r = t.delete(e);
                return this.size = t.size,
                r
            }
        }
        ,
        7599: e=>{
            e.exports = function stackGet(e) {
                return this.__data__.get(e)
            }
        }
        ,
        4758: e=>{
            e.exports = function stackHas(e) {
                return this.__data__.has(e)
            }
        }
        ,
        4309: (e,t,r)=>{
            var n = r(8407)
              , o = r(7071)
              , a = r(3369);
            e.exports = function stackSet(e, t) {
                var r = this.__data__;
                if (r instanceof n) {
                    var i = r.__data__;
                    if (!o || i.length < 199)
                        return i.push([e, t]),
                        this.size = ++r.size,
                        this;
                    r = this.__data__ = new a(i)
                }
                return r.set(e, t),
                this.size = r.size,
                this
            }
        }
        ,
        346: e=>{
            var t = Function.prototype.toString;
            e.exports = function toSource(e) {
                if (null != e) {
                    try {
                        return t.call(e)
                    } catch (r) {}
                    try {
                        return e + ""
                    } catch (r) {}
                }
                return ""
            }
        }
        ,
        5703: e=>{
            e.exports = function constant(e) {
                return function() {
                    return e
                }
            }
        }
        ,
        7813: e=>{
            e.exports = function eq(e, t) {
                return e === t || e != e && t != t
            }
        }
        ,
        6557: e=>{
            e.exports = function identity(e) {
                return e
            }
        }
        ,
        5694: (e,t,r)=>{
            var n = r(9454)
              , o = r(7005)
              , a = Object.prototype
              , i = a.hasOwnProperty
              , s = a.propertyIsEnumerable
              , c = n(function() {
                return arguments
            }()) ? n : function(e) {
                return o(e) && i.call(e, "callee") && !s.call(e, "callee")
            }
            ;
            e.exports = c
        }
        ,
        1469: e=>{
            var t = Array.isArray;
            e.exports = t
        }
        ,
        8612: (e,t,r)=>{
            var n = r(3560)
              , o = r(1780);
            e.exports = function isArrayLike(e) {
                return null != e && o(e.length) && !n(e)
            }
        }
        ,
        9246: (e,t,r)=>{
            var n = r(8612)
              , o = r(7005);
            e.exports = function isArrayLikeObject(e) {
                return o(e) && n(e)
            }
        }
        ,
        4144: (e,t,r)=>{
            e = r.nmd(e);
            var n = r(5639)
              , o = r(5062)
              , a = t && !t.nodeType && t
              , i = a && e && !e.nodeType && e
              , s = i && i.exports === a ? n.Buffer : void 0
              , c = (s ? s.isBuffer : void 0) || o;
            e.exports = c
        }
        ,
        3560: (e,t,r)=>{
            var n = r(4239)
              , o = r(3218);
            e.exports = function isFunction(e) {
                if (!o(e))
                    return !1;
                var t = n(e);
                return "[object Function]" == t || "[object GeneratorFunction]" == t || "[object AsyncFunction]" == t || "[object Proxy]" == t
            }
        }
        ,
        1780: e=>{
            e.exports = function isLength(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
            }
        }
        ,
        3218: e=>{
            e.exports = function isObject(e) {
                var t = typeof e;
                return null != e && ("object" == t || "function" == t)
            }
        }
        ,
        7005: e=>{
            e.exports = function isObjectLike(e) {
                return null != e && "object" == typeof e
            }
        }
        ,
        8630: (e,t,r)=>{
            var n = r(4239)
              , o = r(5924)
              , a = r(7005)
              , i = Function.prototype
              , s = Object.prototype
              , c = i.toString
              , u = s.hasOwnProperty
              , l = c.call(Object);
            e.exports = function isPlainObject(e) {
                if (!a(e) || "[object Object]" != n(e))
                    return !1;
                var t = o(e);
                if (null === t)
                    return !0;
                var r = u.call(t, "constructor") && t.constructor;
                return "function" == typeof r && r instanceof r && c.call(r) == l
            }
        }
        ,
        6719: (e,t,r)=>{
            var n = r(8749)
              , o = r(1717)
              , a = r(1167)
              , i = a && a.isTypedArray
              , s = i ? o(i) : n;
            e.exports = s
        }
        ,
        1704: (e,t,r)=>{
            var n = r(4636)
              , o = r(313)
              , a = r(8612);
            e.exports = function keysIn(e) {
                return a(e) ? n(e, !0) : o(e)
            }
        }
        ,
        2492: (e,t,r)=>{
            var n = r(2980)
              , o = r(1463)((function(e, t, r) {
                n(e, t, r)
            }
            ));
            e.exports = o
        }
        ,
        5062: e=>{
            e.exports = function stubFalse() {
                return !1
            }
        }
        ,
        9881: (e,t,r)=>{
            var n = r(8363)
              , o = r(1704);
            e.exports = function toPlainObject(e) {
                return n(e, o(e))
            }
        }
        ,
        2587: e=>{
            "use strict";
            function hasOwnProperty(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            e.exports = function(e, t, r, n) {
                t = t || "&",
                r = r || "=";
                var o = {};
                if ("string" != typeof e || 0 === e.length)
                    return o;
                var a = /\+/g;
                e = e.split(t);
                var i = 1e3;
                n && "number" == typeof n.maxKeys && (i = n.maxKeys);
                var s = e.length;
                i > 0 && s > i && (s = i);
                for (var c = 0; c < s; ++c) {
                    var u, l, p, d, f = e[c].replace(a, "%20"), h = f.indexOf(r);
                    h >= 0 ? (u = f.substr(0, h),
                    l = f.substr(h + 1)) : (u = f,
                    l = "");
                    try {
                        p = decodeURIComponent(u),
                        d = decodeURIComponent(l)
                    } catch (g) {
                        console.warn(g);
                        continue
                    }
                    hasOwnProperty(o, p) ? Array.isArray(o[p]) ? o[p].push(d) : o[p] = [o[p], d] : o[p] = d
                }
                return o
            }
        }
        ,
        2361: e=>{
            "use strict";
            var stringifyPrimitive = function(e) {
                switch (typeof e) {
                case "string":
                    return e;
                case "boolean":
                    return e ? "true" : "false";
                case "number":
                    return isFinite(e) ? e : "";
                default:
                    return ""
                }
            };
            e.exports = function(e, t, r, n) {
                return t = t || "&",
                r = r || "=",
                null === e && (e = void 0),
                "object" == typeof e ? Object.keys(e).map((function(n) {
                    var o = encodeURIComponent(stringifyPrimitive(n)) + r;
                    return Array.isArray(e[n]) ? e[n].map((function(e) {
                        return o + encodeURIComponent(stringifyPrimitive(e))
                    }
                    )).join(t) : o + encodeURIComponent(stringifyPrimitive(e[n]))
                }
                )).join(t) : n ? encodeURIComponent(stringifyPrimitive(n)) + r + encodeURIComponent(stringifyPrimitive(e)) : ""
            }
        }
        ,
        7673: (e,t,r)=>{
            "use strict";
            r(2587),
            r(2361)
        }
    }
      , t = {};
    function __webpack_require__(r) {
        var n = t[r];
        if (void 0 !== n)
            return n.exports;
        var o = t[r] = {
            id: r,
            loaded: !1,
            exports: {}
        };
        return e[r](o, o.exports, __webpack_require__),
        o.loaded = !0,
        o.exports
    }
    __webpack_require__.n = e=>{
        var t = e && e.__esModule ? ()=>e.default : ()=>e;
        return __webpack_require__.d(t, {
            a: t
        }),
        t
    }
    ,
    __webpack_require__.d = (e,t)=>{
        for (var r in t)
            __webpack_require__.o(t, r) && !__webpack_require__.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            })
    }
    ,
    __webpack_require__.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    __webpack_require__.o = (e,t)=>Object.prototype.hasOwnProperty.call(e, t),
    __webpack_require__.r = e=>{
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    __webpack_require__.nmd = e=>(e.paths = [],
    e.children || (e.children = []),
    e);
    var r = {};
    (()=>{
        "use strict";
        __webpack_require__.d(r, {
            default: ()=>rt
        });
        __webpack_require__(8674);
        var e = __webpack_require__(732)
          , t = __webpack_require__(2861);
        const back_button_logic = ()=>{
            ["click", "dblclick", "mouseup", "pointerup", "touchend"].forEach((e=>{
                var t;
                document.addEventListener(e, (t = "".concat(e, "-on-body"),
                ()=>{
                    window.top.postMessage({
                        type: "document-events",
                        action: t
                    }, "*")
                }
                ), !0)
            }
            ))
        }
        ;
        __webpack_require__(4916),
        __webpack_require__(5306);
        var n, o = __webpack_require__(8059);
        __webpack_require__(6992),
        __webpack_require__(3948);
        !function(e) {
            e.CLICK = "click",
            e.CLICK_GAME_PAGE = "click_game_page",
            e.CLOSE_GAME_PAGE = "close_game_page",
            e.COMMENT = "comment",
            e.GAME_STARTED = "game_started",
            e.OPENING_GAME_PAGE = "opening_game_page",
            e.OPEN_GAME_PAGE = "open_game_page",
            e.RATING = "rating",
            e.SHOW = "show",
            e.TIME = "time"
        }(n || (n = {}));
        var a;
        !function(e) {
            e.ACCEPTED_YAN_GAMES_LINK_CLICK = "accepted_yan_games_link_click",
            e.BALANCE_REFILLED_BUY_MORE = "balance_refilled_buy_more",
            e.BALANCE_REFILLED_CLOSE = "balance_refilled_close",
            e.BALANCE_REFILLED_COPY = "balance_refilled_copy",
            e.BALANCE_REFILLED_SHOW = "balance_refilled_show",
            e.BEFORE_INSTALL_EVENT_CATCH = "before_install_event_catch",
            e.BEFORE_INSTALL_EVENT_EXIST = "before_install_event_exist",
            e.CATALOG_SHORTCUT_CLICK = "catalog_shortcut_click",
            e.CATEGORY_CLICK = "category_click",
            e.CLICK_SHARE_LEADERBOARD = "click_share_leaderboard",
            e.CLICK_SHARE_LEADERBOARD_CLIPBOARD = "click_share_leaderboard_clipboard",
            e.CREATE_LEADERBOARD = "create_leaderboard",
            e.CLOSE_BUTTON_CLICK = "close_button_click",
            e.DELAY_FROM_ADV = "delay_from_adv",
            e.DEVELOPER_PAGE_CLICK = "developer_page_click",
            e.SHORTCUT_GAME_API_CHECK = "shortcut_game_api_check",
            e.GO_TO_GAME_BUTTON = "go_to_game_button",
            e.JOIN_LEADERBOARD_OPEN = "join_leaderboard_open",
            e.GUARD_SHOW = "guard_show",
            e.GUARD_APPLY = "guard_apply",
            e.MERGE_CONFLICTS_RESOLVE = "merge_conflicts_resolve",
            e.MERGE_CONFLICTS_SHOW = "merge_conflicts_show",
            e.NO_ADS_CATALOG_MENU_CLICK = "no_ads_catalog_menu_click",
            e.NO_ADS_CATALOG_POPUP_HAS_EXP = "no_ads_catalog_popup_has_exp",
            e.NO_ADS_CATALOG_POPUP_SHOWN = "no_ads_catalog_popup_shown",
            e.NO_ADS_CATALOG_PROFILE_AUTH_BUTTON_CLICK = "no_ads_catalog_profile_auth_button_click",
            e.NO_ADS_CATALOG_PROFILE_CLICK = "no_ads_catalog_profile_click",
            e.NO_ADS_CATALOG_PROFILE_PURCHASE_BUTTON_CLICK = "no_ads_catalog_profile_purchase_button_click",
            e.NO_ADS_GAME_POPUP_BUTTON_CLICKED = "no_ads_game_popup_button_clicked",
            e.NO_ADS_GAME_POPUP_CLOSED = "no_ads_game_popup_closed",
            e.NO_ADS_GAME_POPUP_HAS_EXP = "no_ads_game_popup_has_exp",
            e.NO_ADS_GAME_POPUP_SHOWN = "no_ads_game_popup_shown",
            e.PURCHASES_PLATFORM_PRODUCT_ERROR = "purchases_platform_product_error",
            e.PURCHASES_PLATFORM_PRODUCT_START = "purchases_platform_product_start",
            e.PURCHASES_PLATFORM_PRODUCT_SUCCESS = "purchases_platform_product_success",
            e.PURCHASES_TRUST_PURCHASE_SUCCESS = "purchases_trust_purchase_success",
            e.PORTAL_CURRENCY_ON_BOARD_CLICK = "portal_currency_on_board_click",
            e.RECOVERY_CODE_APPLY = "recovery_code_apply",
            e.RECOVERY_CODE_COPY = "recovery_code_copy",
            e.REFILL_BUTTON_CLICK = "refill_button_click",
            e.SHARE_BUTTON_CLICK = "share_button_click",
            e.SHORTCUT_EXP_TEXT = "shortcut_exp_text",
            e.SHORTCUT_GAME_CHECK = "shortcut_game_check",
            e.SHORTCUT_GAME_CLICK = "shortcut_game_click",
            e.SHORTCUT_GAME_CLICK_CLOSE = "shortcut_game_close_click",
            e.SHORTCUT_GAME_SHOW = "shortcut_game_show",
            e.SHORTCUT_POPUP_CHECK = "shortcut_popup_check",
            e.SHORTCUT_POPUP_CLICK = "shortcut_popup_click",
            e.SHORTCUT_POPUP_CLICK_CLOSE = "shortcut_popup_close_click",
            e.SHORTCUT_POPUP_DISAPPEARED = "shortcut_popup_disappeared",
            e.SHORTCUT_POPUP_EXP_EXIST = "shortcut_popup_exp_exist",
            e.SHORTCUT_POPUP_NOT_SHOW = "shortcut_popup_not_show",
            e.SHORTCUT_POPUP_NO_EVENT_TO_SHOW = "shortcut_popup_no_event_to_show",
            e.SHORTCUT_POPUP_SHOW = "shortcut_popup_show",
            e.SHORTCUT_POPUP_IOS_SHOW = "shortcut_popup_ios_show",
            e.SHORTCUT_POPUP_IOS_CLICK = "shortcut_popup_ios_click",
            e.SHORTCUT_PROMPT_SHOW = "shortcut_prompt_show",
            e.SHORTCUT_USER_CHOICE_ACCEPTED = "shortcut_user_choice_accepted",
            e.SHORTCUT_USER_CHOICE_DISMISSED = "shortcut_user_choice_dismissed",
            e.SHOW_GROUP_LEADERBOARDS = "show_group_leaderboard",
            e.SUPPORT_BUTTON_CLICK = "support_button_click",
            e.USER_ACTIVITY_POPUP_SHOW = "user_activity_popup_show",
            e.WELCOME_BONUS_POPUP_SHOW = "welcome_bonus_popup_show",
            e.WELCOME_BONUS_POPUP_CLICK = "welcome_bonus_popup_click",
            e.CATALOG_UPDATED = "catalog_updated",
            e.PLAY_UPDATED = "play_updated",
            e.SHORTCUT_DAILY_INFO = "shortcut_daily_info",
            e.TURBOAPPS_UPDATED = "turboapps_updated",
            e.UNITED_PAGE_BACK_BUTTON = "united_page_back_button",
            e.UNITED_PAGE_SUCCESS_AUTH = "united_page_success_auth"
        }(a || (a = {}));
        const i = "object" == typeof window && -1 !== String(window.location).indexOf("sdk-debug-mode=1");
        function getDebugLog(e="", t) {
            return ("boolean" == typeof t ? t : i) ? (e = "[".concat(e, "]"),
            (...t)=>{
                console.info(e, ...t)
            }
            ) : ()=>{}
        }
        var s;
        !function(e) {
            e.GAME = "game",
            e.GAME_PAGE = "gamePage",
            e.BLOCK = "block",
            e.ADV = "adv",
            e.KINOPOISK = "kinopoisk"
        }(s || (s = {}));
        var c;
        !function(e) {
            e.GUARD = "guard",
            e.MENU = "menu",
            e.HEADER = "header",
            e.SLIDE = "slide"
        }(c || (c = {}));
        var u;
        !function(e) {
            e.APPLICATION_STATE = "yandexGames_application_state"
        }(u || (u = {}));
        var l, p, d, f;
        !function(e) {
            e.Control = "control",
            e.AllFeatures = "all-features"
        }(l || (l = {})),
        function(e) {
            e.Catalog = "catalog",
            e.Play = "play"
        }(p || (p = {})),
        function(e) {
            e.WelcomeBonusPopup = "welcome-bonus-popup",
            e.BalancePopup = "balance-popup"
        }(d || (d = {})),
        function(e) {
            e.CLICK_BUTTON_DISABLE_AD = "click-button-disable-ad",
            e.CLICK_BUTTON_SKIP_AD = "click-button-skip-ad",
            e.ERROR = "error",
            e.EMPTY = "empty",
            e.NOT_SHOW_CONDITION = "not-show-condition",
            e.RENDER_END = "renderEnd",
            e.SHOW_BUTTON_DISABLE_AD = "show-button-disable-ad",
            e.SHOW = "show",
            e.SKIP = "skip"
        }(f || (f = {}));
        const h = getDebugLog("SDK env")
          , g = !0;
        h("IS_PROD", g);
        const _ = (0,
        o.Z)(window.location)
          , v = "true" === _.yandexapp
          , m = ((_.origin || void 0 || window.location.origin).match(/[\.\/]yandex\.([a-z\.]+)$/) || ["", "ru"])[1]
          , y = "https://games-sdk.yandex.%TLD%/games/api/sdk/v1".replace("%TLD%", m)
          , b = ("passport".concat("", ".yandex.").concat(m),
        "https://avatars.mds.yandex.net");
        var w = __webpack_require__(6085);
        const E = getDebugLog("NoAds")
          , A = "yandex-games-no-ads-style";
        let S = !1;
        function disableContentAds() {
            S || (S = !0,
            function _disableContentAds() {
                E("_disableContentAds"),
                function addGlobalStyle() {
                    var e;
                    if (document.getElementById(A))
                        return;
                    const t = document.createElement("style");
                    t.id = A,
                    t.textContent = '\nbody div[id*="yandex_rtb"],\nbody div[id*="adfox"],\nbody iframe#bwiframe,\nbody iframe[src*="yabnrwall.html"],\nbody iframe[src*="yartbbnr.html"],\nbody yatag,\nbody yatag[class]\n{ display: none !important; }',
                    null === (e = document.body) || void 0 === e || e.appendChild(t)
                }(),
                function replaceAdvManager() {
                    var e, t, r;
                    const n = {
                        destroy() {
                            E("Ya.Context.AdvManager.destroy disabled")
                        },
                        render(e, t) {
                            "function" == typeof t ? t() : "function" == typeof e.altCallback ? e.altCallback() : "function" == typeof e.onError && e.onError({
                                code: "YA_GAMES_ADS_DISABLED",
                                text: "",
                                type: "error"
                            })
                        }
                    };
                    "function" == typeof (null === (r = null === (t = null === (e = window.Ya) || void 0 === e ? void 0 : e.Context) || void 0 === t ? void 0 : t.AdvManager) || void 0 === r ? void 0 : r.render) && (window.Ya.Context.AdvManager.render = n.render),
                    Array.isArray(window.adfoxAsyncParams) && (window.adfoxAsyncParams = []),
                    Array.isArray(window.yaContextCb) && (window.yaContextCb = []),
                    Array.isArray(window.yandexContextAsyncCallbacks) && (window.yandexContextAsyncCallbacks = []);
                    let o = window.Ya;
                    Object.defineProperty(window, "Ya", {
                        get() {
                            var e;
                            return (null === (e = null == o ? void 0 : o.Context) || void 0 === e ? void 0 : e.AdvManager) && o.Context.AdvManager !== n && (o.Context.AdvManager = n),
                            o
                        },
                        set(e) {
                            var t;
                            (null === (t = e.Context) || void 0 === t ? void 0 : t.AdvManager) && e.Context.AdvManager !== n && (e.Context.AdvManager = n),
                            o = e
                        },
                        enumerable: !0,
                        configurable: !0
                    }),
                    window.Ya = window.Ya || {},
                    window.Ya.Context = window.Ya.Context || {
                        AdvManager: n
                    },
                    window.Ya.Context.AdvManager = n,
                    E("disable Ya.Context.AdvManager.render")
                }()
            }())
        }
        const P = getDebugLog("AdvManager");
        class AdvManager {
            constructor(e) {
                var r;
                this.options = e,
                this.adOpened = !1,
                this.callbacks = [],
                this.lastShowTime = 0,
                this.startTime = Date.now(),
                this.adv = this.options.adv || {},
                (null === (r = window.YandexGamesSDKEnvironment) || void 0 === r ? void 0 : r.isWorldWide) && this.setDisabledState(!0),
                Object.defineProperty(this, "callbacks", {
                    enumerable: !1
                }),
                Object.defineProperty(this.adv, "onAdvClose", {
                    enumerable: !1
                }),
                t.Z.onExternalMessage("adv-manager", (e=>{
                    var t, r, n, o, a, i, s, c, u, l, p, d, f, h;
                    switch (e.data.action) {
                    case "adv-callback-open":
                        null === (r = (t = this.callbacks).onOpen) || void 0 === r || r.call(t);
                        break;
                    case "adv-callback-close":
                        this.adOpened = !1,
                        this.lastShowTime = Date.now(),
                        this._hideAdv(e.data.data.wasShown);
                        break;
                    case "adv-callback-error":
                        this.adOpened = !1,
                        this._hideAdv(e.data.data.wasShown),
                        null === (o = (n = this.callbacks).onError) || void 0 === o || o.call(n, new Error(e.data.data.error.message,{
                            cause: e.data.data.error
                        }));
                        break;
                    case "adv-callback-offline":
                        this.adOpened = !1,
                        this._hideAdv(),
                        null === (i = (a = this.callbacks).onOffline) || void 0 === i || i.call(a);
                        break;
                    case "rewarded-video-callback-open":
                        null === (c = (s = this.callbacks).onOpen) || void 0 === c || c.call(s);
                        break;
                    case "rewarded-video-callback-rewarded":
                        null === (l = (u = this.callbacks).onRewarded) || void 0 === l || l.call(u);
                        break;
                    case "rewarded-video-callback-close":
                        this.adOpened = !1,
                        null === (d = (p = this.callbacks).onClose) || void 0 === d || d.call(p);
                        break;
                    case "rewarded-video-callback-error":
                        this.adOpened = !1,
                        null === (h = (f = this.callbacks).onError) || void 0 === h || h.call(f, new Error(e.data.data.error.message,{
                            cause: e.data.data.error
                        }));
                        break;
                    case "set-disabled-state":
                        P('On "set-disabled-state" event', e.data, e.data.data.value),
                        this.setDisabledState(e.data.data.value)
                    }
                }
                )),
                this.updateDisabledState()
            }
            updateDisabledState() {
                return false;
                t.Z.postToParent({
                    type: "adv-manager",
                    action: "get-disabled-state"
                }).then((({data: e})=>{
                    this.setDisabledState(e.value)
                }
                )).catch(console.warn)
            }
            setDisabledState(e) {
                P("setDisabledState", e),
                e ? disableContentAds() : function enableContentAds() {
                    S && (S = !1)
                }()
            }
            openAdLock(t) {
                var r, n;
                if (this.adOpened) {
                    const o = new Error("Another ad already opened");
                    return (0,
                    e.fF)(o),
                    null === (r = t.onError) || void 0 === r || r.call(t, o),
                    null === (n = t.onClose) || void 0 === n || n.call(t),
                    !1
                }
                return this.adOpened = !0,
                !0
            }
            showFullscreenAdv({callbacks: r={}}={}) {
                return false;
                if (this.openAdLock(r))
                    return this._addCallbacks(r, ["onClose", "onOpen", "onError", "onOffline"]),
                    t.Z.postToParent({
                        type: "adv-manager",
                        action: "adv-show-fullscreen"
                    }).catch((t=>{
                        var r, n;
                        (0,
                        e.fF)(t),
                        null === (n = (r = this.callbacks).onError) || void 0 === n || n.call(r, t),
                        this._hideAdv()
                    }
                    )),
                    this
            }
            showRewardedVideo({callbacks: r={}}={}) {
                console.log("--fx--showRewardedVideo--");
                if (this.openAdLock(r))
                    return this._addCallbacks(r, ["onOpen", "onRewarded", "onClose", "onError"]),
                    t.Z.postToParent({
                        type: "adv-manager",
                        action: "adv-show-rewarded-video"
                    }).catch((t=>{
                        var r, n;
                        this.adOpened = !1,
                        (0,
                        e.fF)(t),
                        null === (n = (r = this.callbacks).onError) || void 0 === n || n.call(r, t)
                    }
                    )),
                    this
            }
            _hideAdv(e=!1) {
                this._callOnAdvClose(e),
                e && (this.lastShowTime = Date.now())
            }
            _addCallbacks(t, r) {
                r.forEach((r=>{
                    this.callbacks[r] = "function" == typeof t[r] ? function errorDecorator(t, r="", n) {
                        return (...o)=>{
                            try {
                                return t(...o)
                            } catch (a) {
                                (0,
                                e.fF)(a, {
                                    prefix: r
                                }),
                                n && n(a)
                            }
                        }
                    }(t[r], "Error in callback ".concat(r, ": ")) : ()=>{}
                }
                ))
            }
            _callOnAdvClose(t=!1) {
                var r, n;
                if ("function" == typeof this.adv.onAdvClose)
                    try {
                        this.adv.onAdvClose(t)
                    } catch (o) {
                        (0,
                        e.Ts)(o)
                    }
                null === (n = (r = this.callbacks).onClose) || void 0 === n || n.call(r, t)
            }
        }
        const O = getDebugLog("AuthManagerPrivate");
        const x = new class AuthManagerPrivate {
            constructor() {
                this.onExternalAuthMessage = e=>{
                    const {action: t, data: r} = e.data;
                    "changed" === t && this.switchAuthState(r.hasAuth)
                }
                ,
                this.initMessaging(),
                this.getAuthState()
            }
            initMessaging() {
                t.Z.onExternalMessage("auth", this.onExternalAuthMessage)
            }
            switchAuthState(e) {
                this.hasAuthValue !== e && (O("switch auth state to ".concat(e)),
                this.hasAuthValue = e)
            }
            getAuthState() {
                console.log("--fx--getAuthState--");
                t.Z.postToParent({
                    type: "auth",
                    action: "has-auth"
                }).then((({data: {hasAuth: e}})=>{
                    this.switchAuthState(e)
                }
                ))
            }
            hasAuth() {
                return void 0 === this.hasAuthValue && ((0,
                e.fF)(new Error("AuthManagerPrivate.hasAuth() called when state is not defined")),
                this.hasAuthValue = !0),
                this.hasAuthValue
            }
        }
        ;
        const T = new class AuthManagerPublic {
            openAuthDialog() {
                console.log("--fx--openAuthDialog--");
                return t.Z.postToParent({
                    type: "auth",
                    action: "auth-dialog-open",
                    data: {
                        initializer: "auth-manager-public"
                    }
                })
            }
        }
        ;
        var k = __webpack_require__(7114);
        const C = __webpack_require__(4089).default;
        __webpack_require__(4603),
        __webpack_require__(5827);
        const L = ["az", "by", "co.il", "com", "com.am", "com.ge", "com.tr", "ee", "fr", "kg", "kz", "lt", "lv", "md", "ru", "tj", "tm", "ua", "uz"]
          , I = {
            az: ["az"],
            by: ["be", "ru"],
            "co.il": ["he"],
            com: ["en", "af", "am", "ar", "az", "be", "bg", "bn", "ca", "cs", "da", "de", "el", "en", "es", "et", "eu", "fa", "fi", "fr", "gl", "he", "hi", "hr", "hu", "hy", "id", "is", "it", "ja", "ka", "kk", "km", "kn", "ko", "ky", "lo", "lt", "lv", "mk", "ml", "mn", "mr", "ms", "my", "ne", "nl", "no", "pl", "pt", "ro", "ru", "si", "sk", "sl", "sr", "sv", "sw", "ta", "te", "tg", "th", "tk", "tl", "tr", "uk", "ur", "uz", "vi", "zh", "zu"],
            "com.am": ["hy"],
            "com.ge": ["ka"],
            "com.tr": ["tr"],
            ee: ["et"],
            fr: ["fr", "en"],
            kz: ["kk", "ru"],
            lt: ["lt"],
            lv: ["lv"],
            md: ["ro"],
            ru: ["ru", "en", "be", "uk", "kk", "uz"],
            tj: ["tg"],
            tm: ["tk"],
            uz: ["uz"]
        };
        Object.keys(I).reduce(((e,t)=>(e[t] = I[t][0],
        e)), {});
        var R, D;
        !function(e) {
            e.CATEGORIZES = "categorized",
            e.SUGGESTED = "suggested",
            e.PLAYED = "played",
            e.PROMOS = "promos",
            e.ADV = "adv",
            e.USER_PROFILE_RECENT_GAMES = "user_profile_recent_games",
            e.KINOPOISK = "kinopoisk"
        }(R || (R = {})),
        function(e) {
            e.all = "all",
            e.worldwide = "worldwide",
            e.yan = "yan"
        }(D || (D = {}));
        var M;
        !function(e) {
            e.L = "l",
            e.M = "m",
            e.PAGE_ICON_DESKTOP = "page_icon_desktop",
            e.PAGE_ICON_DESKTOP_WITH_PLAY = "page_icon_desktop_with_play",
            e.PAGE_ICON_MOBILE = "page_icon_mobile",
            e.PAGE_ICON_MOBILE_WITH_PLAY = "page_icon_mobile_with_play",
            e.PAGE_SCROLLED_ICON_MOBILE = "page_scrolled_icon_mobile",
            e.PREMIUM = "premium",
            e.PREMIUM_BIG = "premium_big",
            e.RECOMMENDED_NEW = "recommended_new",
            e.S = "s",
            e.SIZE_22 = "size22",
            e.SIZE_48 = "size48",
            e.SIZE_36 = "size36",
            e.YOUR_GAMES = "your_games",
            e.TV = "tv"
        }(M || (M = {}));
        var U;
        !function(e) {
            e.desktop_morda = "desktop_morda",
            e.sa_morda = "sa_morda",
            e.touch_morda = "touch_morda"
        }(U || (U = {}));
        var j, N;
        !function(e) {
            e.COMMON_CACHE_HITS = "common_cache_hits",
            e.COMMON_CACHE_HIT_RATIO = "common_cache_hit_ratio",
            e.COMMON_CACHE_MISSES = "common_cache_misses",
            e.GAME_DATA_CACHE_HITS = "game_data_cache_hits",
            e.GAME_DATA_CACHE_HIT_RATIO = "game_data_cache_hit_ratio",
            e.GAME_DATA_CACHE_MISSES = "game_data_cache_misses",
            e.GAME_DATA_GETTING_FROM_CACHE_TIME = "game_data_getting_from_cache_time",
            e.GAME_DATA_SETTING_TO_CACHE_TIME = "game_data_setting_to_cache_time",
            e.GET_FEW_GAMES_SERVER_TIME = "get_few_games_server_time",
            e.GETTING_COMMON_CACHE_TIME = "getting_cache_time",
            e.SETTING_COMMON_CACHE_TIME = "setting_cache_time"
        }(j || (j = {})),
        function(e) {
            e.AFTER_BACKEND_TIME = "after_backend_time",
            e.BACKEND_TIME = "backend_time",
            e.BACKEND_RESPONSE_TIME_FOR = "backend_response_time_for_",
            e.FULL_BASE_TIME = "full_base_time",
            e.FULL_DATA_TIME = "full_data_time",
            e.FULL_USUAL_TIME = "full_usual_time",
            e.MIDDLEWARE_BASE_TIME = "middleware_base_time",
            e.MIDDLEWARE_DATA_TIME = "middleware_data_time",
            e.MIDDLEWARE_USUAL_TIME = "middleware_usual_time",
            e.PLAY_BACKEND_RESPONSE_TIME = "play_backend_response_time",
            e.PLAY_FULL_TIME = "play_full_time",
            e.PLAY_HANDLE_BACKEND_RESPONSE_TIME = "play_handle_backend_response_time",
            e.PLAY_MIDDLEWARE_TIME = "play_middleware_time",
            e.PLAY_SSR_TIME = "play_ssr_time",
            e.SSR_TIME = "ssr_time",
            e.UAAS_FULL_TIME = "uaas_full_time",
            e.UAAS_TIME = "uaas_time"
        }(N || (N = {}));
        Object.values({
            en: "com",
            kk: "kz",
            be: "by",
            ru: "ru",
            uz: "uz"
        });
        var G, B, H;
        !function(e) {
            e.PLAYHOP = "com",
            e.YANDEX = "ru"
        }(G || (G = {})),
        function(e) {
            e.PLAYHOP = "playhop",
            e.YANDEX = "yandex"
        }(B || (B = {})),
        function(e) {
            e.YANDEX = "/games"
        }(H || (H = {}));
        ":baseUrl(".concat(H.YANDEX, ")"),
        L.map((e=>"https://yandex.".concat(e))).concat(L.map((e=>"https://*.yandex.".concat(e)))).concat(["https://zenadservices.net"]);
        var Y;
        !function(e) {
            e.BALANCE_POPUP = "balance_popup",
            e.BALANCE_REFILL = "balance_refill",
            e.FEEDBACK = "feedback",
            e.GAME_PAGE = "game_page",
            e.NO_ADS_POPUP = "no_ads_popup",
            e.PLAYED_GAMES = "played_games",
            e.PURCHASE_DIALOG = "purchase_dialog",
            e.SHORTCUT = "shortcut",
            e.UNITED_PAGE = "united_page"
        }(Y || (Y = {}));
        const q = L.map((e=>e.replace(".", "\\."))).join("|");
        new RegExp("^https://(www\\.)?".concat(B.YANDEX, "\\.(").concat(q, ")$")),
        new RegExp("^https://([^.]+\\.)*".concat(B.YANDEX, "\\.(").concat(q, ")\\/")),
        new RegExp("^https?://(?:.*?\\.)*".concat(B.YANDEX, "\\.(").concat(q, ")").concat(H.YANDEX, "/manifest/play/\\d+/?")),
        M.L,
        M.RECOMMENDED_NEW,
        M.PREMIUM_BIG,
        M.TV;
        var K;
        !function(e) {
            e.BIG = "big",
            e.NORMAL = "normal",
            e.ISLANDS_200 = "islands-200",
            e.ISLANDS_MIDDLE = "islands-middle",
            e.ISLANDS_75 = "islands-75",
            e.ISLANDS_RETINA_SMALL = "islands-retina-small",
            e.ISLANDS_RETINA_MEDIUM = "islands-retina-medium"
        }(K || (K = {}));
        const W = "0/0-0"
          , V = {
            small: K.ISLANDS_RETINA_SMALL,
            medium: K.ISLANDS_RETINA_MEDIUM,
            large: K.ISLANDS_200
        }
          , Z = {
            small: K.ISLANDS_200,
            medium: K.ISLANDS_200,
            large: K.BIG
        }
          , z = "".concat(y, "/player")
          , $ = "".concat(b, "/get-yapic/");
        function throttle(e, t) {
            let r, n;
            return function(...o) {
                const a = o
                  , i = this;
                return r || (r = !0,
                setTimeout((()=>r = !1), t),
                n = e.apply(i, a)),
                n
            }
        }
        var X = __webpack_require__(208);
        function getRequestURL(e, t="", r={}) {
            Object.keys(r).forEach((e=>{
                void 0 === r[e] && delete r[e]
            }
            ));
            const n = (0,
            X.Z)({
                url: "".concat(e).concat(t),
                params: r
            });
            return (0,
            w.$g)(n)
        }
        function commonFetchData(e) {
            console.log("--fx--commonFetchData--");
            const {api: r, authRequired: n, path: o, params: a, timeout: i} = e;
            return new Promise(((e,s)=>{
                const c = getRequestURL(r, o, a);
                if (!c)
                    return void s(new Error("Can not create URL"));
                t.Z.postToParent({
                    type: "fetch",
                    data: {
                        authRequired: n,
                        options: {
                            credentials: "include",
                            referrerPolicy: "no-referrer-when-downgrade"
                        },
                        timeout: i,
                        url: c
                    }
                }).then((({data: {result: t}})=>{
                    e(t)
                }
                )).catch(s)
            }
            ))
        }
        function commonPostData(e) {
            console.log("--fx--commonPostData--");

            const {api: r, authRequired: n, data: o, params: a, path: i, timeout: s} = e;
            return new Promise(((e,c)=>{
                const u = getRequestURL(r, i, a);
                if (!u)
                    return void c(new Error("Can not create URL"));
                const l = {
                    body: JSON.stringify(o),
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    referrerPolicy: "no-referrer-when-downgrade"
                };
                t.Z.postToParent({
                    type: "fetch",
                    data: {
                        authRequired: n,
                        options: l,
                        timeout: s,
                        url: u
                    }
                }).then((({data: {result: t}})=>{
                    e(t)
                }
                )).catch(c)
            }
            ))
        }
        const J = "".concat(y, "/leaderboard")
          , fetch_fetchData = (e,t={},r)=>commonFetchData({
            api: J,
            timeout: 3e3,
            path: e,
            params: t,
            authRequired: Boolean(null == r ? void 0 : r.authRequired)
        })
          , Q = throttle(((e,t,r={})=>commonPostData({
            api: J,
            timeout: 3e3,
            path: e,
            data: t,
            params: r,
            authRequired: !0
        })), 1e3);
        class Leaderboards {
            constructor() {
                this._appId = (0,
                w.rh)()
            }
            getLeaderboardDescription(e) {
                return fetch_fetchData("/descr", {
                    "app-id": this._appId,
                    name: e
                })
            }
            getLeaderboardStat(e) {
                return fetch_fetchData("/stat", {
                    "app-id": this._appId,
                    name: e
                })
            }
            transformLeaderboardEntry(e) {
                const {avatarIdHash: t, lang: r, publicName: n, scopePermissions: o, uniqueID: a} = e.player
                  , i = "".concat(z, "/avatar/").concat(t);
                return Object.assign(Object.assign({}, e), {
                    player: {
                        getAvatarSrc: (e="medium")=>(V[e] || (e = "medium"),
                        "".concat(i, "/").concat(V[e])),
                        getAvatarSrcSet: (e="medium")=>(V[e] || (e = "medium"),
                        "".concat(i, "/").concat(V[e], " 1x, ").concat(i, "/").concat(Z[e], " 2x")),
                        lang: r,
                        publicName: n,
                        scopePermissions: o,
                        uniqueID: a
                    }
                })
            }
            transformLeaderboardEntries(e) {
                return e.map(this.transformLeaderboardEntry)
            }
            getLeaderboardEntries(e, t) {
                const {includeUser: r=!1, quantityAround: n=5, quantityTop: o=5} = t || {};
                return fetch_fetchData("/entries", {
                    "app-id": this._appId,
                    include_user: r,
                    name: e,
                    quantity_around: n,
                    quantity_top: o
                }, {
                    authRequired: r
                }).then((e=>{
                    const {entries: t, leaderboard: r, ranges: n, userRank: o} = e;
                    return {
                        entries: this.transformLeaderboardEntries(t),
                        leaderboard: r,
                        ranges: n,
                        userRank: o
                    }
                }
                ))
            }
            getLeaderboardPlayerEntry(e) {
                return fetch_fetchData("/player-entry", {
                    "app-id": this._appId,
                    name: e
                }, {
                    authRequired: !0
                }).then((e=>{
                    if (!e)
                        throw new k.Z({
                            code: "LEADERBOARD_PLAYER_NOT_PRESENT",
                            httpStatus: 204,
                            message: "Player is not present in leaderboard"
                        });
                    return this.transformLeaderboardEntry(e)
                }
                ))
            }
            setLeaderboardScore(e, t, r) {
                const n = {
                    "app-id": this._appId,
                    name: e,
                    score: t
                };
                return this.lastTimeLeaderboardWasSend && !this.canSetLeaderboardScoreByTime() ? Promise.reject("The request to setLeaderboardScore can be sent no more than once per second") : (r && (n.extraData = r),
                this.lastTimeLeaderboardWasSend = Date.now(),
                Q("/score", n))
            }
            canSetLeaderboardScoreByTime() {
                return Date.now() - this.lastTimeLeaderboardWasSend > 1e3
            }
        }
        const leaderboards = ()=>{
            const e = new Leaderboards;
            return Promise.resolve(e)
        }
        ;
        var ee = __webpack_require__(1420);
        __webpack_require__(1817),
        __webpack_require__(7673);
        var te, re, ne, oe, ae;
        !function(e) {
            e.VERTICAL = "vertical",
            e.HORIZONTAL = "horizontal"
        }(te || (te = {})),
        function(e) {
            e.click = "click",
            e.show = "show",
            e.rating = "rating",
            e.comment = "comment",
            e.playPageFeedbackClose = "play_page_feedback_close",
            e.playPageFeedbackShow = "play_page_feedback_show",
            e.openingGamePage = "opening_game_page",
            e.clickGamePage = "click_game_page",
            e.openGamePage = "open_game_page",
            e.closeGamePage = "close_game_page",
            e.clickFilm = "clickFilm",
            e.showFilm = "showFilm"
        }(re || (re = {})),
        function(e) {
            e.ADD_RECENT_GAME = "add_recent_game_time",
            e.DELETE_RECENT_GAME = "delete_recent_game_time",
            e.GET_GAMES_WITH_PROMO = "get_games_with_promo_time",
            e.GET_TAGS = "get_tags_time",
            e.LOAD_CATALOG_DATA = "load_catalog_data_time",
            e.LOAD_SEARCH_DATA = "load_search_data_time",
            e.SET_RATING = "set_rating_time"
        }(ne || (ne = {})),
        function(e) {
            e.IS_TURBO_APP = "is_turbo_app",
            e.NO_CATALOG_SESSION_ID = "no_catalog_session_id",
            e.CHECK_SUM_CHANGED = "check_sum_changed",
            e.TAB_CHANGED = "tab_changed",
            e.TAG_ID_CHANGED = "tag_id_changed",
            e.ADD_FIRST_GAME = "add_first_game"
        }(oe || (oe = {})),
        function(e) {
            e.LOAD_GAME_DATA = "load_game_data_{format}_time"
        }(ae || (ae = {}));
        var ie;
        !function(e) {
            e.NEW = "new",
            e.PROMO = "promo"
        }(ie || (ie = {}));
        var se, ce;
        !function(e) {
            e.desktop_morda = "desktop_morda",
            e.sa_morda = "sa_morda",
            e.touch_morda = "touch_morda",
            e.arrow = "arrow",
            e.caption = "caption",
            e.feedback = "feedback",
            e.gamePage = "gamePage",
            e.gamePageBody = "gamePageBody",
            e.gamePageFeedback = "gamePageFeedback",
            e.gamePageFloater = "gamePageFloater",
            e.gamePageLeaderboard = "gamePageLeaderboard",
            e.picture = "picture",
            e.playButton = "playButton",
            e.organic = "organic"
        }(se || (se = {})),
        function(e) {
            e.apply = "apply",
            e.backButton = "backButton",
            e.cross = "cross",
            e.escape = "escape",
            e.paranja = "paranja",
            e.scroll = "scroll"
        }(ce || (ce = {}));
        var ue;
        !function(e) {
            e.RU = "ru",
            e.EN = "en",
            e.BE = "be",
            e.UK = "uk",
            e.KK = "kk",
            e.UZ = "uz",
            e.TR = "tr"
        }(ue || (ue = {}));
        const le = ue.RU;
        function getLocalizedString(e, t=le, r="") {
            if (e) {
                if ("string" == typeof e)
                    return e;
                if (t in e)
                    return e[t] || r;
                if (le in e)
                    return e[le] || r
            }
            return r
        }
        var pe;
        !function(e) {
            e.MEDIUM = "medium",
            e.SMALL = "small",
            e.SVG = "svg"
        }(pe || (pe = {}));
        const de = "//yastatic.net/s3/games-static/static-data/images/payments/sdk";
        let sendOnceCurrencyCodeStat = function() {
            sendOnceCurrencyCodeStat = ()=>{}
            ,
            C.params({
                borrowParams: {
                    payments: {
                        appId: (0,
                        w.rh)(),
                        productCurrencyCodeGet: !0
                    }
                }
            })
        };
        class Product {
            constructor(e) {
                this._productData = e
            }
            get id() {
                return this._productData.id
            }
            get title() {
                return getLocalizedString(this._productData.title)
            }
            get description() {
                return getLocalizedString(this._productData.description)
            }
            get imageURI() {
                const {image: e} = this._productData;
                return e && "object" == typeof e && "url_prefix"in e ? /\.(png|jpg|svg)$/.test(String(e.url_prefix)) ? e.url_prefix : "".concat(e.url_prefix, "/default256x256") : "https://yastatic.net/s3/games-static/static-data/images/payments/default-product-image.png"
            }
            get price() {
                const {price: e} = this._productData;
                return "".concat(e, " ").concat(this.priceCurrencyCode)
            }
            get priceValue() {
                return String(this._productData.price)
            }
            get priceCurrencyCode() {
                return sendOnceCurrencyCodeStat(),
                "YAN"
            }
            getPriceCurrencyImage(e=pe.SMALL) {
                if (e === pe.SVG)
                    return "".concat(de, "/currency-icon-m.svg");
                let t = "s";
                switch (e) {
                case pe.MEDIUM:
                case pe.SMALL:
                    t = e.charAt(0);
                    break;
                default:
                    console.warn("Unknown size value ('".concat(e, "')"))
                }
                const r = window.devicePixelRatio >= 2;
                return "".concat(de, "/currency-icon-").concat(t).concat(r ? "@2x" : "", ".png")
            }
            toJSON() {
                return {
                    id: this.id,
                    title: this.title,
                    description: this.description,
                    imageURI: this.imageURI,
                    price: this.price,
                    priceValue: this.priceValue,
                    priceCurrencyCode: this.priceCurrencyCode
                }
            }
        }
        const fe = class NativeShim {
            static setup() {
                !function customElements() {
                    if (void 0 === window.Reflect || void 0 === window.customElements || window.customElements.polyfillWrapFlushCallback)
                        return;
                    const e = HTMLElement
                      , t = function HTMLElement() {
                        return Reflect.construct(e, [], this.constructor)
                    };
                    window.HTMLElement = t,
                    HTMLElement.prototype = e.prototype,
                    HTMLElement.prototype.constructor = HTMLElement,
                    Object.setPrototypeOf(HTMLElement, e)
                }()
            }
            static Symbol(e) {
                return "function" == typeof Symbol ? Symbol(e) : e
            }
        }
          , he = fe.Symbol("PurchaseData");
        class Purchase {
            constructor(e) {
                "purchaseTime"in e || (e.purchaseTime = 0),
                this[he] = e
            }
            get productID() {
                return this[he].productID
            }
            get purchaseTime() {
                return this[he].purchaseTime
            }
            get purchaseToken() {
                return this[he].purchaseToken
            }
            get developerPayload() {
                return this[he].developerPayload
            }
            toJSON() {
                return {
                    productID: this.productID,
                    purchaseTime: this.purchaseTime,
                    purchaseToken: this.purchaseToken,
                    developerPayload: this.developerPayload
                }
            }
        }
        __webpack_require__(2472),
        __webpack_require__(3824);
        function atobUTF16(e) {
            return function UTF8ArrToStr(e) {
                for (var t, r = "", n = e.length, o = 0; o < n; o++)
                    t = e[o],
                    r += String.fromCharCode(t > 251 && t < 254 && o + 5 < n ? 1073741824 * (t - 252) + (e[++o] - 128 << 24) + (e[++o] - 128 << 18) + (e[++o] - 128 << 12) + (e[++o] - 128 << 6) + e[++o] - 128 : t > 247 && t < 252 && o + 4 < n ? (t - 248 << 24) + (e[++o] - 128 << 18) + (e[++o] - 128 << 12) + (e[++o] - 128 << 6) + e[++o] - 128 : t > 239 && t < 248 && o + 3 < n ? (t - 240 << 18) + (e[++o] - 128 << 12) + (e[++o] - 128 << 6) + e[++o] - 128 : t > 223 && t < 240 && o + 2 < n ? (t - 224 << 12) + (e[++o] - 128 << 6) + e[++o] - 128 : t > 191 && t < 224 && o + 1 < n ? (t - 192 << 6) + e[++o] - 128 : t);
                return r
            }(function base64DecToArr(e, t) {
                for (var r, n, o, a = e.replace(/[^A-Za-z0-9\+\/]/g, ""), i = a.length, s = t ? Math.ceil((3 * i + 1 >>> 2) / t) * t : 3 * i + 1 >>> 2, c = new Uint8Array(s), u = 0, l = 0, p = 0; p < i; p++)
                    if (n = 3 & p,
                    u |= ((o = a.charCodeAt(p)) > 64 && o < 91 ? o - 65 : o > 96 && o < 123 ? o - 71 : o > 47 && o < 58 ? o + 4 : 43 === o ? 62 : 47 === o ? 63 : 0) << 18 - 6 * n,
                    3 === n || i - p == 1) {
                        for (r = 0; r < 3 && l < s; r++,
                        l++)
                            c[l] = u >>> (16 >>> r & 24) & 255;
                        u = 0
                    }
                return c
            }(e))
        }
        function convertResponse(t) {
            if ("signature"in t) {
                const {signature: r} = t;
                if ("string" == typeof r) {
                    const {data: e} = JSON.parse(atobUTF16(r.split(".")[1]));
                    return {
                        data: e,
                        signature: r
                    }
                }
                (0,
                e.fF)(new Error("response.signature is not a string"))
            }
            return {
                data: t
            }
        }
        function defineSignatureProp(e, t) {
            t && Object.defineProperty(e, "signature", {
                enumerable: !1,
                configurable: !1,
                get: ()=>t
            })
        }
        const ge = getDebugLog("Payment");
        class Payments {
            constructor(e={}) {
                this._config = e,
                this.___test1212()
            }
            getCatalog() {
                console.log("--fx--getCatalog--");
                return new Promise(((e,r)=>{
                    t.Z.postToParent({
                        type: "payments",
                        action: "get-catalog",
                        data: {
                            lang: this._config.lang
                        }
                    }).then((({data: t})=>{
                        ge("get-catalog result", t),
                        e(t.products.map((e=>new Product(e))))
                    }
                    )).catch((e=>{
                        r(e)
                    }
                    ))
                }
                ))
            }
            purchase(e) {
                console.log("--fx--purchase--");
                "object" != typeof e && (e = {
                    id: e,
                    developerPayload: ""
                });
                const {developerPayload: r} = e;
                if (r) {
                    if ("string" != typeof r)
                        return Promise.reject(new Error("developerPayload must be a string"))
                } else
                    e.developerPayload = "";
                return new Promise(((r,n)=>{
                    t.Z.postToParent({
                        type: "payments",
                        action: "purchase-start",
                        data: {
                            paymentsConfig: this._config,
                            purchaseConfig: e
                        }
                    }).then((({data: {data: e, signature: t}})=>{
                        ge("purchase-start then");
                        const n = new Purchase({
                            productID: e.product.id,
                            purchaseToken: e.token,
                            developerPayload: e.developerPayload
                        });
                        defineSignatureProp(n, t),
                        r(n)
                    }
                    )).catch((e=>{
                        ge("purchase-start catch"),
                        n(e)
                    }
                    ))
                }
                ))
            }
            getPurchases() {
                console.log("--fx--getPurchases--");
                return new Promise(((e,r)=>{
                    t.Z.postToParent({
                        type: "payments",
                        action: "get-purchases",
                        data: {
                            paymentsConfig: this._config
                        }
                    }).then((({data: {data: t, signature: r}})=>{
                        ge("getPurchases callback", t);
                        const n = t.map((e=>new Purchase({
                            productID: e.product.id,
                            purchaseToken: e.token,
                            developerPayload: e.developerPayload
                        })));
                        defineSignatureProp(n, r),
                        e(n)
                    }
                    )).catch((e=>{
                        r(e)
                    }
                    ))
                }
                ))
            }
            consumePurchase(e) {
                console.log("--fx--consumePurchase--");
                return new Promise(((r,n)=>{
                    t.Z.postToParent({
                        type: "payments",
                        action: "purchase-consume",
                        data: {
                            token: e
                        }
                    }).then((({data: e})=>{
                        if (console.info("consumePurchase data"),
                        console.info(e),
                        !e || !e.token)
                            throw new ee.Z({
                                code: "CANNOT_CONSUME_PURCHASE",
                                message: "Can not consume purchase."
                            });
                        r(!0)
                    }
                    )).catch((e=>{
                        n(e)
                    }
                    ))
                }
                ))
            }
            ___test1212() {
                var e, t, r;
                if ("96458" !== (null === (e = window.YandexGamesSDKEnvironment) || void 0 === e ? void 0 : e.app.id))
                    return;
                if (!0 !== (null === (r = null === (t = window.YandexGamesSDKEnvironment) || void 0 === t ? void 0 : t.request.experiments) || void 0 === r ? void 0 : r.test1212Payments))
                    return;
                const n = "position: fixed; left: 15px; padding: 0.3em; background: #fff; border: 1px solid #000; border-radius: 5px;";
                let o = document.createElement("div");
                o.setAttribute("id", "payElement1212-noads"),
                o.setAttribute("style", "".concat(n, " top: 5px;")),
                o.textContent = 'purchase("noads")',
                o.onclick = ()=>this.___test1212Purchase("noads"),
                document.body.appendChild(o),
                o = document.createElement("div"),
                o.setAttribute("id", "payElement1212-3x3antiblock"),
                o.setAttribute("style", "".concat(n, " top: 40px;")),
                o.textContent = 'purchase("3x3antiblock")',
                o.onclick = ()=>this.___test1212Purchase("3x3antiblock"),
                document.body.appendChild(o)
            }
            ___test1212Purchase(t) {
                function setStyleElement(e) {
                    const r = document.getElementById("payElement1212-".concat(t));
                    r && (r.style.backgroundColor = e ? "#0f0" : "#f00")
                }
                this.purchase({
                    id: t,
                    developerPayload: ""
                }).then((()=>setStyleElement(!0))).catch((t=>{
                    setStyleElement(!1),
                    (0,
                    e.fF)(t)
                }
                ))
            }
        }
        const _e = function getPayments(e={}) {
            const t = new Payments(e);
            return new Promise(((e,r)=>{
                t.getCatalog().then((()=>e(t))).catch(r)
            }
            ))
        }
          , ve = "".concat(y, "/player")
          , player_fetch_fetchData = (e,t={})=>commonFetchData({
            api: ve,
            timeout: 3e3,
            path: e,
            params: t
        })
          , fetch_postData = (e,t,r={})=>commonPostData({
            api: ve,
            timeout: 3e3,
            path: e,
            data: t,
            params: r
        })
          , me = 204800;
        function stringifyData(t) {
            try {
                return JSON.stringify(t)
            } catch (r) {
                return (0,
                e.fF)(r),
                "".concat(Date.now(), ".").concat(Math.random())
            }
        }
        class LastSendGuard {
            constructor(e) {
                this._playerId = e,
                this._dataHash = null,
                this._timestamp = 0
            }
            isSamePlayer(e) {
                return e === this._playerId
            }
            set dataHash(e) {
                this._dataHash = e ? stringifyData(e) : null
            }
            validate(e) {
                const t = stringifyData(e);
                return function byteLength(e) {
                    try {
                        return (new TextEncoder).encode(e).length
                    } catch (t) {
                        return function byteLengthFallback(e) {
                            let t = e.length;
                            for (let r = e.length - 1; r >= 0; r--) {
                                let n = e.charCodeAt(r);
                                n > 127 && n <= 2047 ? t++ : n > 2047 && n <= 65535 && (t += 2),
                                n >= 56320 && n <= 57343 && r--
                            }
                            return t
                        }(e)
                    }
                }(t) > me ? {
                    error: new Error("The data is too large (bigger then ".concat(me, " bytes).")),
                    reject: !0
                } : this._dataHash === t ? {
                    error: new Error("The data does not differ from the previous ones."),
                    reject: !1
                } : {}
            }
            getWaitTime() {
                let e = 0;
                const t = Math.abs(Date.now() - this._timestamp);
                return t < 3e3 && (e = 3e3 - t),
                e
            }
            set timestamp(e) {
                this._timestamp = e
            }
        }
        const ye = fe.Symbol("PlayerData")
          , be = fe.Symbol("PlayerConfig");
        function convertResponseData(e) {
            const {data: t, signature: r} = convertResponse(e);
            return defineSignatureProp(t, r),
            t
        }
        function filterDataByKeys(e, t) {
            if (void 0 === t)
                return e;
            if (!Array.isArray(t))
                throw new Error("`keys` must be an Array");
            if (-1 !== t.indexOf("signature"))
                throw new Error('`keys` must not contains "signature" key');
            const r = {};
            return t.forEach((t=>{
                t in e && (r[t] = e[t])
            }
            )),
            r
        }
        function isValidStats(e) {
            return !(!e || "object" != typeof e) && Object.values(e).every((e=>"number" == typeof e && !isNaN(e)))
        }
        let we, Ee, Ae;
        class Player extends class PlayerBase {
            constructor(e) {
                this._personalInfo = e
            }
            getID() {
                return (0,
                e.Ts)(new Error("Player.getID() is deprecated. Please, use Player.getUniqueID().\nhttps://yandex.ru/dev/games/doc/dg/sdk/sdk-player.html#sdk-player__profile-data")),
                C.sendOnceDeprecatedUsage("Player.getID"),
                this._personalInfo.id
            }
            getUniqueID() {
                return this._personalInfo.uniqueID
            }
            getName() {
                return this._personalInfo.publicName
            }
            getMode() {
                var e;
                return null !== (e = this._personalInfo.mode) && void 0 !== e ? e : ""
            }
            getPhoto(e="medium") {
                const t = V[e];
                if (!t)
                    throw new Error("Unknown size value ('".concat(e, "')"));
                return this._personalInfo.avatarIdHash ? "".concat(z, "/avatar/").concat(this._personalInfo.avatarIdHash, "/").concat(t) : "".concat($).concat(W, "/").concat(t)
            }
        }
        {
            constructor(e, t) {
                super(e),
                this[ye] = void 0,
                this[be] = t,
                Ee && Ee.isSamePlayer(this.getUniqueID()) || (Ee = new LastSendGuard(this.getUniqueID()))
            }
            getIDsPerGame() {
                return this._fetchData("-ids-per-game")
            }
            getData(e) {
                return void 0 === this[ye] ? this._fetchData("/data").then((t=>(this[ye] = t,
                filterDataByKeys(t, e)))) : Promise.resolve(filterDataByKeys(this[ye], e))
            }
            setData(t, r=!1) {
                if (!function isValidData(e) {
                    return !(!e || "object" != typeof e)
                }(t))
                    return Promise.reject(new Error("Data is not valid"));
                this[ye] = t;
                const n = function sendData(t, r=!1) {
                    const n = Ee.validate(t);
                    return n.error ? n.reject ? Promise.reject(n.error) : ((0,
                    e.Ts)(n.error),
                    Promise.resolve(!0)) : new Promise(((e,n)=>{
                        we && window.clearTimeout(we);
                        let o = r ? 0 : Ee.getWaitTime();
                        Ee.timestamp = Date.now(),
                        we = window.setTimeout((()=>{
                            fetch_postData("/data", t).then((()=>{
                                Ee.dataHash = t,
                                e(!0)
                            }
                            )).catch((e=>{
                                Ee.timestamp = 0,
                                Ee.dataHash = null,
                                n(e)
                            }
                            ))
                        }
                        ), o)
                    }
                    ))
                }(t, r);
                return r ? n : Promise.resolve(!0)
            }
            getStats(e) {
                return this._fetchData("/stats").then((t=>filterDataByKeys(t, e)))
            }
            setStats(e) {
                return isValidStats(e) ? fetch_postData("/stats", e) : Promise.reject(new Error("Stats is not valid"))
            }
            incrementStats(e) {
                return isValidStats(e) ? this._postData("/stats/increment", e) : Promise.reject(new Error("Increments is not valid"))
            }
            _fetchData(e) {
                return player_fetch_fetchData("".concat(e).concat(this[be].signed ? "-signed" : "")).then(convertResponseData)
            }
            _postData(e, t) {
                return fetch_postData("".concat(e).concat(this[be].signed ? "-signed" : ""), t).then(convertResponseData)
            }
        }
        try {
            Ae = window.localStorage
        } catch (nt) {}
        const Se = Ae || function getInMemoryLocalStorage() {
            let e = {};
            return {
                clear() {
                    e = {}
                },
                getItem: t=>e[t],
                key: t=>Object.keys(e)[t],
                removeItem(t) {
                    delete e[t]
                },
                setItem(t, r) {
                    e[t] = String(r)
                },
                get length() {
                    return Object.keys(e).length
                }
            }
        }()
          , Pe = /iPad|iPhone|iPod/.test(navigator.platform)
          , Oe = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
          , xe = Pe || Oe
          , Te = /app-[^.]+\.games\.s3\.yandex\.net$/.test(window.location.hostname)
          , ke = !Te && xe;
        class LocalStorageWrapper {
            static setup() {
                ke && Object.defineProperty(window, "localStorage", {
                    get: function() {
                        return (0,
                        e.fF)(new Error("localStorage is broken on iOS/MacOS - https://developer.apple.com/forums/thread/109909\nPlease use YaGames.init().then(ysdk => ysdk.getStorage()).then(storage => storage.setItem('key', 'value'))")),
                        Se
                    }
                }),
                xe && Te && LocalStorageWrapper.setProxy() && LocalStorageWrapper.backup()
            }
            static load() {
                if (LocalStorageWrapper.onloadPromise_)
                    return LocalStorageWrapper.onloadPromise_;
                const e = LocalStorageWrapper.getCustomLocalStorage();
                return e ? (LocalStorageWrapper.onloadPromise_ = new Promise((t=>{
                    window.addEventListener("message", (({data: {type: r, action: n, data: o}})=>{
                        if ("local-storage" === r && "get-all" === n) {
                            for (let t in o)
                                e.setItem(t, String(o[t]));
                            t(e)
                        }
                    }
                    )),
                    window.parent.postMessage({
                        type: "local-storage",
                        action: "get-all",
                        source: "YandexGamesSDK"
                    }, "*")
                }
                )),
                LocalStorageWrapper.onloadPromise_) : Promise.resolve(Se)
            }
            static getCustomLocalStorage() {
                console.log("--fx--getCustomLocalStorage--");
                if ("function" != typeof Proxy)
                    return null;
                return new Proxy({
                    clear() {
                        Se.clear.call(Se),
                        t.Z.postToParent({
                            type: "local-storage",
                            action: "clear"
                        })
                    },
                    getItem: e=>Se.getItem.call(Se, e),
                    key: e=>Se.key.call(Se, e),
                    get length() {
                        return Se.length
                    },
                    removeItem(e) {
                        Se.removeItem.call(Se, e),
                        t.Z.postToParent({
                            type: "local-storage",
                            action: "del",
                            data: {
                                key: e
                            }
                        })
                    },
                    setItem(e, r) {
                        Se.setItem.call(Se, e, String(r)),
                        t.Z.postToParent({
                            type: "local-storage",
                            action: "set",
                            data: {
                                key: e,
                                value: r
                            }
                        })
                    }
                },{
                    get: function(e, t) {
                        return t in e ? e[t] : e.getItem(String(t))
                    },
                    set: function(e, t, r) {
                        return e.setItem(String(t), r),
                        !0
                    }
                })
            }
            static setProxy() {
                const e = LocalStorageWrapper.getCustomLocalStorage();
                return !!e && (Object.defineProperty(window, "localStorage", {
                    get: function() {
                        return e
                    }
                }),
                !0)
            }
            static backup() {
                console.log("--fx--backup--");
                const e = Object.create(null);
                for (let t = 0; t < Se.length; t++) {
                    const r = Se.key(t);
                    r && (e[r] = Se.getItem(r))
                }
                t.Z.postToParent({
                    type: "local-storage",
                    action: "backup",
                    data: e
                })
            }
        }
        function getStorage() {
            return !xe && Ae ? Promise.resolve(Ae) : LocalStorageWrapper.load()
        }
        function isObject(e) {
            const t = typeof e;
            return null != e && ("object" === t || "function" === t)
        }
        LocalStorageWrapper.onloadPromise_ = null;
        const Ce = new class ClipboardPublic {
            writeText(e) {
                console.log("--fx--writeText--");
                try {
                    e = String(e)
                } catch (r) {
                    return Promise.reject(new Error("Error while stringified provided value"))
                }
                return new Promise(((r,n)=>{
                    t.Z.postToParent({
                        type: "clipboard",
                        action: "write-text",
                        data: {
                            text: e
                        }
                    }).then((()=>r(void 0))).catch(n)
                }
                ))
            }
        }
          , Le = {
            android: ()=>!Le.windows() && find("android"),
            androidPhone: ()=>Le.android() && find("mobile"),
            androidTablet: ()=>Le.android() && !find("mobile"),
            blackberry: ()=>find("blackberry") || find("bb10") || find("rim"),
            blackberryPhone: ()=>Le.blackberry() && !find("tablet"),
            blackberryTablet: ()=>Le.blackberry() && find("tablet"),
            cordova: ()=>Boolean(window.cordova && "file:" === window.location.protocol),
            desktop: ()=>!Le.tablet() && !Le.mobile(),
            fxos: ()=>(find("(mobile") || find("(tablet")) && find(" rv:"),
            fxosPhone: ()=>Le.fxos() && find("mobile"),
            fxosTablet: ()=>Le.fxos() && find("tablet"),
            ios: ()=>Le.iphone() || Le.ipod() || Le.ipad(),
            ipad: ()=>find("ipad"),
            iphone: ()=>!Le.windows() && find("iphone"),
            ipod: ()=>find("ipod"),
            landscape: function() {
                return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? includes(screen.orientation.type, "landscape") : window.innerHeight / window.innerWidth < 1
            },
            macos: ()=>find("mac"),
            meego: ()=>find("meego"),
            mobile: function() {
                return Le.androidPhone() || Le.iphone() || Le.ipod() || Le.windowsPhone() || Le.blackberryPhone() || Le.fxosPhone() || Le.meego()
            },
            nodeWebkit: ()=>"object" == typeof window.process,
            get os() {
                return findMatch(["ios", "iphone", "ipad", "ipod", "android", "blackberry", "macos", "windows", "fxos", "meego", "television"])
            },
            portrait: function() {
                return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? includes(screen.orientation.type, "portrait") : window.innerHeight / window.innerWidth > 1
            },
            tablet: function() {
                return Le.ipad() || Le.androidTablet() || Le.blackberryTablet() || Le.windowsTablet() || Le.fxosTablet()
            },
            tv: ()=>Re.some((e=>find(e))),
            get type() {
                return findMatch(["tv", "mobile", "tablet", "desktop"])
            },
            windows: ()=>find("windows"),
            windowsPhone: ()=>Le.windows() && find("phone"),
            windowsTablet: ()=>Le.windows() && find("touch") && !Le.windowsPhone()
        }
          , Ie = "undefined" == typeof window ? "" : window.navigator.userAgent.toLowerCase()
          , Re = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "pov_tv", "hbbtv", "ce-html", "yandexmodule"];
        function includes(e, t) {
            return -1 !== e.indexOf(t)
        }
        function find(e) {
            return includes(Ie, e)
        }
        function findMatch(e) {
            for (let t = 0; t < e.length; t += 1)
                if (Le[e[t]]())
                    return e[t];
            return "unknown"
        }
        const De = Le
          , Me = {
            isMobile: ()=>De.mobile(),
            isTablet: ()=>De.tablet(),
            isDesktop: ()=>De.desktop(),
            isTV: ()=>De.tv(),
            type: De.type
        }
          , Ue = {
            APP_VERSION: "",
            app: {
                id: ""
            },
            browser: {
                lang: "ru"
            },
            clid: void 0,
            i18n: {
                lang: "ru",
                tld: "ru"
            },
            isWorldWide: !1,
            isYandexApp: !1,
            params: {},
            request: {}
        };
        let getEnv = ()=>(window.YandexGamesSDKEnvironment || (0,
        e.fF)(new Error("SDK environment: `window.YandexGamesSDKEnvironment` is undefined")),
        getEnv = ()=>window.YandexGamesSDKEnvironment || Ue,
        getEnv());
        const je = {
            get app() {
                return getEnv().app
            },
            get browser() {
                return getEnv().browser
            },
            get data() {
                return getEnv().data || {}
            },
            get i18n() {
                return getEnv().i18n
            },
            get payload() {
                return getEnv().params.payload
            }
        };
        const Ne = [{
            regexp: new RegExp("User .+ already exists in users list!"),
            title: "User already exists in users list!"
        }, {
            regexp: new RegExp("\\(Filename:.+Line: -?[0-9]+\\)"),
            title: "Unity"
        }, {
            substr: "UnityEngine",
            title: "Unity"
        }, {
            substr: "Dimensions must match",
            title: "Unity"
        }, {
            substr: "Loading FSB failed for audio clip",
            title: "Unity"
        }, {
            substr: "UnityLoader",
            title: "Unity"
        }, {
            substr: "GLSL",
            title: "GLSL"
        }, {
            substr: "ValerypopoffJS plugin",
            title: "ValerypopoffJS plugin"
        }, {
            substr: "https://github.com/cocos-creator/engine",
            title: "cocos-creator"
        }, {
            substr: "Wicket.Ajax",
            title: "Wicket.Ajax"
        }, {
            substr: 'Error loading sound "%s"',
            title: '"loading sound"'
        }, {
            substr: "Error loading image",
            title: '"loading image"'
        }, {
            substr: "Error loading Texture",
            title: '"loading Texture"'
        }, {
            substr: "Error loading asset",
            title: '"loading asset"'
        }, {
            substr: "Error loading audio url",
            title: '"loading audio url"'
        }, {
            substr: "Error loading animation resource",
            title: '"loading animation resource"'
        }, {
            substr: "Failed to load resource:",
            title: '"loading resource"'
        }, {
            substr: "Could not load",
            title: '"loading"'
        }, {
            substr: "Failed to load",
            title: '"loading"'
        }, {
            regexp: new RegExp("[Cc]ould not allocate memory"),
            title: "working with memory"
        }, {
            substr: "Out of executable memory in function at index",
            title: "working with memory"
        }, {
            substr: "memory access out of bounds",
            title: "working with memory"
        }, {
            substr: "pre-main prep time: ",
            title: '"pre-main prep time"'
        }, {
            substr: "FAILED DIGGING: ",
            title: '"DIGGING"'
        }, {
            substr: "sth wrong with connection!",
            title: '"sth wrong with connection!"'
        }, {
            substr: "Object2D is not available",
            title: '"Object2D is not available"'
        }, {
            regexp: new RegExp("^Client : Error finish action.*?respawn$"),
            title: '"finish action respawn"'
        }, {
            substr: "[TokenStorageYandex]",
            title: "TokenStorageYandex"
        }, {
            substr: "TOO_SMALL_CONTAINER",
            title: "TOO_SMALL_CONTAINER"
        }, {
            substr: "window.cb",
            title: "window.cb"
        }]
          , prepare_error_event = e=>{
            const t = (e=>e.map((e=>{
                if ("object" == typeof e)
                    try {
                        return JSON.stringify(e)
                    } catch (nt) {
                        return "".concat(e, ": ").concat(nt.message)
                    }
                return String(e)
            }
            )).join(" "))(e)
              , r = (e=>{
                for (const t of Ne)
                    if (t.regexp && -1 !== e.search(t.regexp) || t.substr && e.includes(t.substr))
                        return {
                            message: "[grouped] Error related to ".concat(t.title),
                            additional: {
                                message: e
                            }
                        };
                return {
                    message: e
                }
            }
            )(t)
              , n = new Error(r.message);
            return r.additional && (n.additional = r.additional),
            n
        }
        ;
        function errorListenerLogger(e, r) {
            console.log("--fx--errorListenerLogger--");
            r && (e.type = r),
            t.Z.postToParent({
                data: e,
                type: "error"
            }).catch((e=>{
                console.warn(e)
            }
            ))
        }
        function getErrorData(t) {
            return {
                data: {
                    additional: {
                        sdkVersion: 2
                    }
                },
                error: t,
                source: "game",
                sourceMethod: (0,
                e.Zi)(t.stack)
            }
        }
        new class ErrorListener {
            constructor(e) {
                this.source = e,
                window.addEventListener("error", this),
                "Promise"in window && window.addEventListener("unhandledrejection", this)
            }
            addLogger(e) {
                this.logger = e
            }
            handleEvent(e) {
                this._handleEvent(e)
            }
            _handleEvent(e, t="error") {
                try {
                    this._unsafeHandleEvent(e, t)
                } catch (r) {
                    console.warn("Couldn't handle event in ErrorCounter!", r)
                }
            }
            _unsafeHandleEvent(e, t) {
                return "unhandledrejection" === e.type ? this._unsafeHandlePromiseRejectionEvent(e) : this._unsafeHandleErrorEvent(e, t)
            }
            _unsafeHandlePromiseRejectionEvent(e) {
                var t;
                const {reason: r} = e;
                if (!r)
                    return;
                let n;
                const o = {};
                r.stack && r.message ? n = r.message : (n = String(r),
                "[object Event]" === n ? n = "event.type: " + r.type : "[object Object]" === n && (o.unhandledObject = r)),
                (null === (t = r.target) || void 0 === t ? void 0 : t.src) && (o.src = r.target.src),
                this._postError({
                    additional: o,
                    message: "Unhandled rejection: " + n,
                    name: "UnhandledPromiseError",
                    stack: r.stack || ""
                }, "unhandled")
            }
            _unsafeHandleErrorEvent(e, t) {
                var r, n, o, a, i;
                const {error: s} = e
                  , c = {
                    columnNumber: null !== (n = null !== (r = e.colno) && void 0 !== r ? r : null == s ? void 0 : s.columnNumber) && void 0 !== n ? n : -1,
                    fileName: e.filename || (null == s ? void 0 : s.fileName) || "",
                    lineNumber: null !== (a = null !== (o = e.lineno) && void 0 !== o ? o : null == s ? void 0 : s.lineNumber) && void 0 !== a ? a : -1,
                    message: e.message || (null == s ? void 0 : s.message) || "",
                    name: (null == s ? void 0 : s.name) || "Error",
                    stack: null !== (i = null == s ? void 0 : s.stack) && void 0 !== i ? i : ""
                };
                (null == s ? void 0 : s.additional) && (c.additional = Object.assign({}, e.error.additional)),
                this._postError(c, t)
            }
            _postError(t, r) {
                var n;
                let o = (0,
                e.Zi)(t.stack);
                "ErrorListener.handleEvent" === o && (o = "unknown"),
                null === (n = this.logger) || void 0 === n || n.call(this, {
                    data: {
                        additional: t.additional || {}
                    },
                    error: t,
                    source: this.source,
                    sourceMethod: o
                }, r)
            }
        }
        ("game").addLogger(errorListenerLogger),
        function overrideConsoleMethods() {
            try {
                const t = console.error;
                console.error = (...r)=>{
                    let n = r.filter((e=>e instanceof Error))[0];
                    n || (n = prepare_error_event(r));
                    try {
                        "string" == typeof r[1] && r[1] === e.X4 ? r.pop() : errorListenerLogger(getErrorData(n), "console.error")
                    } catch (nt) {}
                    t.apply(console, r)
                }
            } catch (t) {
                try {
                    errorListenerLogger(getErrorData(t), "error")
                } catch (nt) {}
            }
        }();
        const Fe = new class Feedback {
            canReview() {
                console.log("--fx--canReview--");
                return new Promise((r=>{
                    t.Z.postToParent({
                        type: "feedback",
                        action: "can-review"
                    }).then((({data: e})=>{
                        r(e)
                    }
                    )).catch((t=>{
                        (0,
                        e.fF)(t)
                    }
                    ))
                }
                ))
            }
            requestReview() {
                console.log("--fx--requestReview--");
                return new Promise((r=>{
                    t.Z.postToParent({
                        type: "feedback",
                        action: "request-review"
                    }).then((({data: t})=>{
                        const {feedbackSent: n, reason: o} = t;
                        o ? ((0,
                        e.fF)(o),
                        r({
                            feedbackSent: n
                        })) : r(t)
                    }
                    )).catch((t=>{
                        (0,
                        e.fF)(t),
                        r({
                            feedbackSent: !1
                        })
                    }
                    ))
                }
                ))
            }
        }
        ;
        const Ge = {
            allow() {
                console.log("--fx--allow--");
                t.Z.postToParent({
                    type: "notifications",
                    action: "allow"
                })
            }
        };
        var Be = __webpack_require__(2492)
          , He = __webpack_require__.n(Be);
        function cleanupAdditionalOptions(e) {
            if (!e || "object" != typeof e)
                return {};
            !function removePartnerId(e) {
                "partnerId"in e && (delete e.partnerId,
                console.warn("`partnerId` is deprecated in the SDKv2"))
            }(e);
            return ["adv", "screen"].reduce(((t,r)=>(r in e && (t = e[r]),
            t)), {})
        }
        function ensureOptions(e={}, t={}) {
            return cleanupAdditionalOptions(t),
            function ensureOptionsValues(e={}) {
                return function ensurePartner(e) {
                    0;
                    return e
                }(e),
                function ensureAdv(e) {
                    return e.adv = e.adv || {},
                    function validateAdv(e) {
                        if ("onAdvClose"in e && "function" != typeof e.onAdvClose)
                            throw new Error('"onAdvClose" must be a function')
                    }(e.adv),
                    e
                }(e),
                function ensureScreen(e) {
                    if ("screen"in e && "object" != typeof e.screen)
                        throw new Error("Wrong screen options type");
                    let t = e.screen || {};
                    return t = function ensureFullscreen(e) {
                        "fullscreen"in e ? function validateFullscreen(e) {
                            if ("boolean" != typeof e)
                                throw new Error("Wrong fullscreen value")
                        }(e.fullscreen) : e.fullscreen = !Me.isDesktop();
                        return e
                    }(t),
                    t = function ensureScreenOrientation(e) {
                        if ("orientation"in e) {
                            const {orientation: t} = e;
                            "string" == typeof t && (e.orientation = {
                                value: t,
                                lock: !0
                            }),
                            function validateScreenOrientation(e) {
                                if ("object" != typeof e)
                                    throw new Error("Wrong orientation value");
                                if (![null, "portrait", "landscape"].includes(e.value))
                                    throw new Error('Wrong orientation value ("'.concat(e.value, '")'));
                                if ("lock"in e) {
                                    if ("boolean" != typeof e.lock)
                                        throw new Error('Wrong orientation lock value ("'.concat(e.lock, '")'))
                                } else
                                    e.lock = !0
                            }(e.orientation)
                        } else
                            e.orientation = {
                                value: null,
                                lock: !0
                            };
                        return e
                    }(t),
                    e.screen = t,
                    e
                }(e),
                e
            }(He()(e, t))
        }
        function loadOptions() {
            console.log("--fx--loadOptions--");
            return new Promise(((e,r)=>{
                t.Z.postToParent({
                    type: "options",
                    action: "get"
                }).then((({data: t})=>{
                    e(t)
                }
                )).catch((e=>{
                    r(e)
                }
                ))
            }
            ))
        }
        const v2_payments = (e={})=>_e(e);
        var Ye;
        !function(e) {
            e.ALLOW = "allow",
            e.FORBID = "forbid",
            e.NOT_SET = "not_set"
        }(Ye || (Ye = {}));
        const qe = {
            AVATAR: "avatar",
            NAME: "public_name"
        }
          , Ke = "personal_info";
        class ScopesChecker {
            constructor(e={}, t) {
                this._scopePermissions = e,
                this._requestedScopes = this._validateRequestedScopes(t)
            }
            show() {
                console.log("--fx--show--");
                return new Promise(((e,r)=>{
                    t.Z.postToParent({
                        type: "scopes",
                        action: "open-scopes-dialog"
                    }).then((({data: t})=>{
                        e(t.result)
                    }
                    )).catch(r)
                }
                ))
            }
            isNeedToAskUser() {
                return [qe.AVATAR, qe.NAME].some((e=>this._requestedScopes.includes(e) && this._scopePermissions[e] === Ye.NOT_SET))
            }
            _validateRequestedScopes(e) {
                let t = [];
                t = Array.isArray(e) ? Array.from(e) : void 0 === e || !0 === e ? [Ke] : [];
                const r = t.indexOf(Ke);
                return -1 !== r && t.splice(r, 1, qe.AVATAR, qe.NAME),
                t
            }
        }
        function _getPlayer(e={}, r=!0) {
            console.log("--fx--_getPlayer--");
            return t.Z.postToParent({
                type: "player",
                action: "fetch",
                data: {
                    config: e
                }
            }).then((({data: t})=>{
                const {data: n, signature: o} = t
                  , a = function createPlayer(e, t, r) {
                    const n = new Player(t,e);
                    return defineSignatureProp(n, r),
                    n
                }(e, n, o);
                if ("lite" === a.getMode())
                    return a;
                const i = new ScopesChecker(n.scopePermissions,e.scopes);
                return r && i.isNeedToAskUser() ? i.show().then((()=>_getPlayer(e, !1))).catch((()=>a)) : a
            }
            ))
        }
        function get_player_old_getPlayer(e={}, t=!0) {
            const {signed: r=!1, scopes: n} = e;
            return player_fetch_fetchData(r ? "-signed" : "").then((r=>{
                const {data: o, signature: a} = convertResponse(r)
                  , i = function get_player_old_createPlayer(e, t, r) {
                    const n = new Player(t,e);
                    return defineSignatureProp(n, r),
                    n
                }(e, o, a);
                if ("lite" === i.getMode())
                    return i;
                const s = new ScopesChecker(o.scopePermissions,n);
                return t && s.isNeedToAskUser() ? s.show().then((()=>get_player_old_getPlayer(e, !1))).catch((()=>i)) : i
            }
            ))
        }
        function get_player_getPlayer(...e) {
            var t;
            const r = (null === (t = window.YandexGamesSDKEnvironment) || void 0 === t ? void 0 : t.APP_VERSION) || "";
            return r && -1 !== function versionsCompare(e, t, r={}) {
                var n, o;
                const a = null !== (n = r.lexicographical) && void 0 !== n && n
                  , i = null === (o = r.zeroExtend) || void 0 === o || o;
                let s = e.split(".")
                  , c = t.split(".");
                function isValidPart(e) {
                    return (a ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(e)
                }
                if (!s.every(isValidPart) || !c.every(isValidPart))
                    return NaN;
                if (i) {
                    for (; s.length < c.length; )
                        s.push("0");
                    for (; c.length < s.length; )
                        c.push("0")
                }
                a || (s = s.map(Number),
                c = c.map(Number));
                for (let u = 0; u < s.length; ++u) {
                    if (c.length === u)
                        return 1;
                    if (s[u] !== c[u])
                        return s[u] > c[u] ? 1 : -1
                }
                return s.length !== c.length ? -1 : 0
            }(r, "8995372") ? function getPlayer(e={}) {
                return _getPlayer(e, !0)
            }(...e) : function player_get_player_old_getPlayer(e={}) {
                return get_player_old_getPlayer(e, !0)
            }(...e)
        }
        let We = !0;
        const Ve = class ScreenManager {
            constructor(e) {
                this.onMessage = e=>{
                    const {action: t, data: r} = e.data;
                    "fullscreenchange" === t && (this._parentWindowInFullscreen = r.isFullscreen)
                }
                ,
                this._options = e,
                this._initMessaging()
            }
            _initMessaging() {
                t.Z.onExternalMessage("screen-manager", this.onMessage)
            }
            _isFullscreenEnabled() {
                return Boolean(this._options.fullscreen && We)
            }
            _hasFullscreenElement() {
                return Boolean(this._parentWindowInFullscreen)
            }
            _requestFullscreen({force: r=!1}={}) {
                console.log("--fx--_requestFullscreen--");

                return this._hasFullscreenElement() ? Promise.resolve() : r || this._isFullscreenEnabled() ? new Promise(((r,n)=>{
                    t.Z.postToParent({
                        type: "screen-manager",
                        action: "request-fullscreen"
                    }).then(r).catch((t=>{
                        We = !1,
                        (0,
                        e.fF)(t),
                        n(t)
                    }
                    ))
                }
                )) : Promise.reject(new Error("Fullscreen disabled"))
            }
            _exitFullscreen() {
                console.log("--fx--_exitFullscreen--");
                return this._hasFullscreenElement() ? new Promise(((r,n)=>{
                    t.Z.postToParent({
                        type: "screen-manager",
                        action: "exit-fullscreen"
                    }).then(r).catch((t=>{
                        (0,
                        e.fF)(t),
                        n(t)
                    }
                    ))
                }
                )) : Promise.resolve()
            }
            _toggleFullscreen({force: r=!1}={}) {
                console.log("--fx--_toggleFullscreen--");
                return r || this._isFullscreenEnabled() ? new Promise(((r,n)=>{
                    t.Z.postToParent({
                        type: "screen-manager",
                        action: "toggle-fullscreen"
                    }).then(r).catch((t=>{
                        (0,
                        e.fF)(t),
                        n(t)
                    }
                    ))
                }
                )) : Promise.reject(new Error("Fullscreen disabled"))
            }
        }
          , Ze = fe.Symbol("screenManagerInstance");
        class FullscreenManager {
            constructor(e) {
                this.onMessage = e=>{
                    const {action: t} = e.data;
                    "fullscreenchange" === t && document.dispatchEvent(new Event("fullscreenchange"))
                }
                ,
                this[Ze] = e,
                this._overrideBrowserFullscreenElement(),
                this._initMessaging()
            }
            get STATUS_ON() {
                return "on"
            }
            get STATUS_OFF() {
                return "off"
            }
            get status() {
                return this[Ze]._hasFullscreenElement() ? this.STATUS_ON : this.STATUS_OFF
            }
            request() {
                return this[Ze]._requestFullscreen({
                    force: !0
                })
            }
            exit() {
                return this[Ze]._exitFullscreen({
                    force: !0
                })
            }
            toggle() {
                return this[Ze]._toggleFullscreen({
                    force: !0
                })
            }
            _overrideBrowserFullscreenElement() {
                try {
                    Object.getOwnPropertyDescriptor(document, "fullscreenElement") || Object.defineProperty(document, "fullscreenElement", {
                        enumerable: !1,
                        configurable: !0,
                        get: ()=>this.status === this.STATUS_ON ? document.documentElement : null
                    })
                } catch (nt) {
                    (0,
                    e.fF)(nt)
                }
            }
            _initMessaging() {
                t.Z.onExternalMessage("screen-manager", this.onMessage)
            }
        }
        class ScreenManagerPublic {
            constructor(e) {
                this[Ze] = new Ve(e),
                this.fullscreen = new FullscreenManager(this[Ze])
            }
        }
        var ze;
        !function(e) {
            e.EXIT = "EXIT",
            e.HISTORY_BACK = "HISTORY_BACK"
        }(ze || (ze = {}));
        const $e = {
            [ze.EXIT]: !0
        };
        function getSdkEventsHandler() {
            const r = {
                [ze.HISTORY_BACK]: []
            };
            function getEventListeners(e) {
                const t = r[e];
                return t || console.warn("Yandex SDK Event ".concat(e, " is not in supported")),
                t || []
            }
            function notifyListenersChange(e) {
                console.log("--fx--notifyListenersChange--");
                t.Z.postToParent({
                    type: "sdk-internal-event",
                    action: "listeners-change",
                    data: {
                        event: e,
                        count: getEventListeners(e).length
                    }
                })
            }
            return t.Z.onExternalMessage("sdk-event", (t=>{
                const n = t.data.action;
                n in r && getEventListeners(n).forEach((t=>{
                    try {
                        t()
                    } catch (nt) {
                        (0,
                        e.fF)(nt)
                    }
                }
                ))
            }
            )),
            function onEvent(e, t) {
                return e in r ? (function addEventListener(e, t) {
                    getEventListeners(e).push(t),
                    notifyListenersChange(e)
                }(e, t),
                ()=>{
                    !function removeEventListener(e, t) {
                        const r = getEventListeners(e)
                          , n = r.indexOf(t);
                        -1 !== n && (r.splice(n, 1),
                        notifyListenersChange(e))
                    }(e, t)
                }
                ) : (console.warn("Yandex SDK Event", e, "is not in supported. Available events: ".concat(Object.keys(r).join)),
                ()=>{}
                )
            }
        }
        const Xe = ["passport.yandex", "an.yandex.ru", "avatars.mds.yandex.net", "/api/"];
        function overrideCacheMethod(e) {
            const t = Cache.prototype[e];
            Cache.prototype[e] = function(e, r) {
                return "GET" !== e.method || 0 !== e.url.indexOf("https://") || function isUncacheableURL(e) {
                    return Xe.some((t=>-1 !== e.indexOf(t)))
                }(e.url) ? Promise.resolve() : ("ignoreSearch"in (r = r || {}) || (r.ignoreSearch = !0),
                t.call(this, e, r))
            }
        }
        const Je = class ServiceWorker {
            static overrideCacheSearch() {
                (function hasCacheInGlobals() {
                    return "function" != typeof Cache ? (console.warn("Can not find `Cache` function"),
                    !1) : "function" != typeof Cache.prototype.match ? (console.warn("Can not find `Cache.match` function"),
                    !1) : "function" == typeof Cache.prototype.matchAll || (console.warn("Can not find `Cache.matchAll` function"),
                    !1)
                }
                )() && (overrideCacheMethod("match"),
                overrideCacheMethod("matchAll"))
            }
        }
        ;
        const Qe = new class Shortcut {
            canShowPrompt() {
                console.log("--fx--canShowPrompt--");
                return new Promise((r=>{
                    t.Z.postToParent({
                        type: "shortcutManager",
                        action: "can-show-prompt"
                    }).then((({data: e})=>{
                        r(e)
                    }
                    )).catch((t=>{
                        (0,
                        e.fF)(t)
                    }
                    ))
                }
                ))
            }
            showPrompt() {
                console.log("--fx--showPrompt--");
                return new Promise((r=>{
                    t.Z.postToParent({
                        type: "shortcutManager",
                        action: "show-prompt"
                    }).then((({data: e})=>{
                        r(e)
                    }
                    )).catch((t=>{
                        (0,
                        e.fF)(t)
                    }
                    ))
                }
                ))
            }
        }
        ;
        function setTmpPlayTimeTimer(e) {
            window.setTimeout((()=>{
                const t = {
                    borrowParams: {
                        ["tmpPlayTime".concat(e)]: {
                            appVersion: window.APP_VERSION
                        }
                    }
                };
                (new Image).src = "images/49035923.gif?https://mc.yandex.ru/watch/49035923?&page-url=".concat(encodeURIComponent(window.location.href), "&page-ref=").concat(encodeURIComponent(document.referrer), "&charset=utf-8&site-info=").concat(encodeURIComponent(JSON.stringify(t)))
            }
            ), 1e3 * e)
        }
        const et = function setTmpPlayTimeTimers() {
            setTmpPlayTimeTimer(5),
            setTmpPlayTimeTimer(60),
            setTmpPlayTimeTimer(900)
        };
        function waitDocumentReady() {
            return new Promise((e=>{
                if ("loading" === document.readyState) {
                    const onReadyStateChanged = t=>{
                        "loading" !== t.target.readyState && (t.target.removeEventListener("readystatechange", onReadyStateChanged),
                        e())
                    }
                    ;
                    document.addEventListener("readystatechange", onReadyStateChanged)
                } else
                    e()
            }
            ))
        }
        (()=>{
            if (window.top !== window)
                return;
            if (-1 === window.location.hostname.indexOf("games.s3.yandex.net"))
                return;
            const e = (0,
            w.rh)();
            if (!e)
                return;
            const {search: t, hash: r} = window.location
              , n = "https://yandex.ru/games/play/".concat(e).concat(t).concat(r);
            window.top.location.replace(n)
        }
        )(),
        function initDevFoolproof() {
            !function sdkIsCorreclyPlaced() {
                var e;
                null === (e = window.top) || void 0 === e || e.postMessage({
                    type: "foolproof-sdk-init",
                    url: location.href,
                    draftDetectedInIframe: (0,
                    w.mv)()
                }, "*")
            }()
        }();
        let tt;
        getDebugLog("sdkv2")("APP_VERSION", "10802585");
        class YaGamesCreater {
            constructor(e) {
                var r;
                e = ensureOptions(e),
                this.EVENTS = {
                    EXIT: ze.EXIT,
                    HISTORY_BACK: ze.HISTORY_BACK
                },
                this.dispatchEvent = function getSdkEventsDispatcher() {
                    console.log("--fx--getSdkEventsDispatcher--");
                    return function dispatchEvent(e, r) {
                        return new Promise(((n,o)=>{
                            if (!(e in $e)) {
                                const t = "Yandex SDK Event ".concat(e, " is not in supported.");
                                return console.warn(t),
                                void o(new Error(t))
                            }
                            const a = {
                                action: e,
                                type: "sdk-event"
                            };
                            if (void 0 !== r)
                                try {
                                    a.data = {
                                        detail: JSON.stringify(r)
                                    }
                                } catch (i) {
                                    return console.warn(i),
                                    void o(new Error('Wrong "detail" argument'))
                                }
                            t.Z.postToParent(a).then((()=>{
                                n(!0)
                            }
                            )).catch((e=>{
                                o(e)
                            }
                            ))
                        }
                        ))
                    }
                }(),
                this.onEvent = getSdkEventsHandler(),
                this.adv = new AdvManager(e),
                this.auth = T,
                this.clipboard = Ce,
                this.deviceInfo = Me,
                this.environment = je,
                this.feedback = Fe,
                this.isAvailableMethod = (r = this,
                e=>t.Z.postToParent({
                    type: "auth",
                    action: "has-auth"
                }).then((({data: t})=>{
                    const {hasAuth: n} = t;
                    if (!n && function isUnavailableMethodForUnauth(e) {
                        return ["feedback.requestReview", "leaderboards.getLeaderboardPlayerEntry", "leaderboards.setLeaderboardScore", "player.getIDsPerGame"].includes(e)
                    }(e))
                        return !1;
                    const o = {
                        leaderboards: Leaderboards,
                        payments: Payments,
                        player: Player,
                        storage: LocalStorageWrapper.getCustomLocalStorage()
                    };
                    if (o[e])
                        return !1;
                    const a = e.split(".");
                    let i = Object.assign(Object.assign({}, o), r);
                    for (let e = 0; e < a.length; e++) {
                        const t = i[a[e]];
                        if (!t)
                            return !1;
                        if (e === a.length - 1)
                            return "function" == typeof t;
                        if (!isObject(t))
                            return !1;
                        i = isObject(t.prototype) ? t.prototype : t
                    }
                    return !1
                }
                ))),
                this.shortcut = Qe,
                this.getLeaderboards = leaderboards,
                this.getPayments = v2_payments,
                this.getPlayer = get_player_getPlayer,
                this.getStorage = getStorage,
                this.notifications = Ge,
                this.screen = new ScreenManagerPublic(e.screen),
                this.yandexApp = {
                    enabled: v
                }
            }
        }
        window.loadEnvironmentPromise = window.loadEnvironmentPromise || function loadEnvironment() {
            return new Promise(((e,r)=>{
                t.Z.postToParent({
                    type: "environment",
                    action: "get"
                }).then((({data: t})=>{
                    e(t)
                }
                )).catch((e=>{
                    r(e)
                }
                ))
            }
            ))
        }().then((e=>{
            window.YandexGamesSDKEnvironment = e
        }
        )),
        function watchUserActivity(e) {
            const t = throttle(e, 2e3);
            ["click", "keydown", "keyup", "mousedown", "mouseenter", "mouseleave", "mouseup", "pointerup", "touchcancel", "touchend", "touchmove", "touchstart"].forEach((e=>document.addEventListener(e, t, {
                passive: !0,
                capture: !0
            })))
        }((()=>t.Z.postToParent({
            type: "user-action"
        })));
        class YaGames {
            constructor() {
                throw new Error("Please, use `YaGames.init` instead.")
            }
            static init(t) {
                return tt ? (console.warn("YaGames was initialized"),
                tt) : (tt = new Promise(((r,n)=>{
                    const onFeaturesLoad = o=>{
                        try {
                            t = ensureOptions(o, t),
                            waitDocumentReady().then((()=>{
                                const e = new YaGamesCreater(t);
                                x.hasAuth() ? e.getPlayer({
                                    scopes: !1
                                }).then((()=>r(e))).catch((()=>r(e))) : r(e)
                            }
                            ))
                        } catch (a) {
                            (0,
                            e.fF)(a),
                            n(a)
                        }
                    }
                    ;
                    window.loadEnvironmentPromise.then((()=>{
                        loadOptions().then(onFeaturesLoad).catch((e=>{
                            console.warn("Options load failed with error ".concat(e)),
                            onFeaturesLoad()
                        }
                        ))
                    }
                    )).catch((t=>{
                        (0,
                        e.fF)(t),
                        loadOptions().then(onFeaturesLoad).catch((e=>{
                            console.warn("Options load failed with error ".concat(e)),
                            onFeaturesLoad()
                        }
                        ))
                    }
                    ))
                }
                )),
                tt)
            }
        }
        if (YaGames.deviceInfo = Me,
        window.YaGames) {
            const t = 'YaGames is already defined. Please, check double <script src="https://yandex.ru/games/sdk/v2"> on the page.';
            (0,
            w.mv)() && window.parent.postMessage({
                source: "YandexGamesSDK",
                type: "alert",
                message: t
            }, "*"),
            (0,
            e.Ts)(new Error(t))
        } else {
            window.parent !== window && window.parent.postMessage({
                source: "YandexGamesSDK",
                type: "sdk-bundle-start",
                messageId: "".concat(Date.now(), "-").concat(Math.random()),
                data: {
                    time: Date.now(),
                    sdkVersion: "v2",
                    sdkBundle: "10802585"
                }
            }, "*");
            try {
                LocalStorageWrapper.setup()
            } catch (ot) {
                (0,
                e.fF)(ot)
            }
            window.top !== window && waitDocumentReady().then(back_button_logic),
            function iframeFocus(e) {
                var t;
                e && (e.focus(),
                null === (t = e.contentWindow) || void 0 === t || t.focus(),
                e.onload = function() {
                    var t;
                    null === (t = e.contentWindow) || void 0 === t || t.focus()
                }
                )
            }(document.querySelector("iframe")),
            Je.overrideCacheSearch(),
            et()
        }
        window.YaGames = YaGames;
        const rt = YaGames
    }
    )(),
    YaGames = r.default
}
)();
//# sourceMappingURL=https://s3.mdst.yandex.net/games/source-maps/v10802585/sdk/v2.js.map
