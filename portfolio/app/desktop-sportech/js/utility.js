
(function() {
    var n = this,
        t = n._,
        r = Array.prototype,
        e = Object.prototype,
        u = Function.prototype,
        i = r.push,
        a = r.slice,
        o = r.concat,
        l = e.toString,
        c = e.hasOwnProperty,
        f = Array.isArray,
        s = Object.keys,
        p = u.bind,
        h = function(n) {
            return n instanceof h ? n : this instanceof h ? void(this._wrapped = n) : new h(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = h), exports._ = h) : n._ = h, h.VERSION = "1.7.0";
    var g = function(n, t, r) {
        if (t === void 0) return n;
        switch (null == r ? 3 : r) {
            case 1:
                return function(r) {
                    return n.call(t, r)
                };
            case 2:
                return function(r, e) {
                    return n.call(t, r, e)
                };
            case 3:
                return function(r, e, u) {
                    return n.call(t, r, e, u)
                };
            case 4:
                return function(r, e, u, i) {
                    return n.call(t, r, e, u, i)
                }
        }
        return function() {
            return n.apply(t, arguments)
        }
    };
    h.iteratee = function(n, t, r) {
        return null == n ? h.identity : h.isFunction(n) ? g(n, t, r) : h.isObject(n) ? h.matches(n) : h.property(n)
    }, h.each = h.forEach = function(n, t, r) {
        if (null == n) return n;
        t = g(t, r);
        var e, u = n.length;
        if (u === +u)
            for (e = 0; u > e; e++) t(n[e], e, n);
        else {
            var i = h.keys(n);
            for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
        }
        return n
    }, h.map = h.collect = function(n, t, r) {
        if (null == n) return [];
        t = h.iteratee(t, r);
        for (var e, u = n.length !== +n.length && h.keys(n), i = (u || n).length, a = Array(i), o = 0; i > o; o++) e = u ? u[o] : o, a[o] = t(n[e], e, n);
        return a
    };
    var v = "Reduce of empty array with no initial value";
    h.reduce = h.foldl = h.inject = function(n, t, r, e) {
        null == n && (n = []), t = g(t, e, 4);
        var u, i = n.length !== +n.length && h.keys(n),
            a = (i || n).length,
            o = 0;
        if (arguments.length < 3) {
            if (!a) throw new TypeError(v);
            r = n[i ? i[o++] : o++]
        }
        for (; a > o; o++) u = i ? i[o] : o, r = t(r, n[u], u, n);
        return r
    }, h.reduceRight = h.foldr = function(n, t, r, e) {
        null == n && (n = []), t = g(t, e, 4);
        var u, i = n.length !== +n.length && h.keys(n),
            a = (i || n).length;
        if (arguments.length < 3) {
            if (!a) throw new TypeError(v);
            r = n[i ? i[--a] : --a]
        }
        for (; a--;) u = i ? i[a] : a, r = t(r, n[u], u, n);
        return r
    }, h.find = h.detect = function(n, t, r) {
        var e;
        return t = h.iteratee(t, r), h.some(n, function(n, r, u) {
            return t(n, r, u) ? (e = n, !0) : void 0
        }), e
    }, h.filter = h.select = function(n, t, r) {
        var e = [];
        return null == n ? e : (t = h.iteratee(t, r), h.each(n, function(n, r, u) {
            t(n, r, u) && e.push(n)
        }), e)
    }, h.reject = function(n, t, r) {
        return h.filter(n, h.negate(h.iteratee(t)), r)
    }, h.every = h.all = function(n, t, r) {
        if (null == n) return !0;
        t = h.iteratee(t, r);
        var e, u, i = n.length !== +n.length && h.keys(n),
            a = (i || n).length;
        for (e = 0; a > e; e++)
            if (u = i ? i[e] : e, !t(n[u], u, n)) return !1;
        return !0
    }, h.some = h.any = function(n, t, r) {
        if (null == n) return !1;
        t = h.iteratee(t, r);
        var e, u, i = n.length !== +n.length && h.keys(n),
            a = (i || n).length;
        for (e = 0; a > e; e++)
            if (u = i ? i[e] : e, t(n[u], u, n)) return !0;
        return !1
    }, h.contains = h.include = function(n, t) {
        return null == n ? !1 : (n.length !== +n.length && (n = h.values(n)), h.indexOf(n, t) >= 0)
    }, h.invoke = function(n, t) {
        var r = a.call(arguments, 2),
            e = h.isFunction(t);
        return h.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r)
        })
    }, h.pluck = function(n, t) {
        return h.map(n, h.property(t))
    }, h.where = function(n, t) {
        return h.filter(n, h.matches(t))
    }, h.findWhere = function(n, t) {
        return h.find(n, h.matches(t))
    }, h.max = function(n, t, r) {
        var e, u, i = -1 / 0,
            a = -1 / 0;
        if (null == t && null != n) {
            n = n.length === +n.length ? n : h.values(n);
            for (var o = 0, l = n.length; l > o; o++) e = n[o], e > i && (i = e)
        } else t = h.iteratee(t, r), h.each(n, function(n, r, e) {
            u = t(n, r, e), (u > a || u === -1 / 0 && i === -1 / 0) && (i = n, a = u)
        });
        return i
    }, h.min = function(n, t, r) {
        var e, u, i = 1 / 0,
            a = 1 / 0;
        if (null == t && null != n) {
            n = n.length === +n.length ? n : h.values(n);
            for (var o = 0, l = n.length; l > o; o++) e = n[o], i > e && (i = e)
        } else t = h.iteratee(t, r), h.each(n, function(n, r, e) {
            u = t(n, r, e), (a > u || 1 / 0 === u && 1 / 0 === i) && (i = n, a = u)
        });
        return i
    }, h.shuffle = function(n) {
        for (var t, r = n && n.length === +n.length ? n : h.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = h.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, h.sample = function(n, t, r) {
        return null == t || r ? (n.length !== +n.length && (n = h.values(n)), n[h.random(n.length - 1)]) : h.shuffle(n).slice(0, Math.max(0, t))
    }, h.sortBy = function(n, t, r) {
        return t = h.iteratee(t, r), h.pluck(h.map(n, function(n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1
            }
            return n.index - t.index
        }), "value")
    };
    var m = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = h.iteratee(r, e), h.each(t, function(e, i) {
                var a = r(e, i, t);
                n(u, e, a)
            }), u
        }
    };
    h.groupBy = m(function(n, t, r) {
        h.has(n, r) ? n[r].push(t) : n[r] = [t]
    }), h.indexBy = m(function(n, t, r) {
        n[r] = t
    }), h.countBy = m(function(n, t, r) {
        h.has(n, r) ? n[r] ++ : n[r] = 1
    }), h.sortedIndex = function(n, t, r, e) {
        r = h.iteratee(r, e, 1);
        for (var u = r(t), i = 0, a = n.length; a > i;) {
            var o = i + a >>> 1;
            r(n[o]) < u ? i = o + 1 : a = o
        }
        return i
    }, h.toArray = function(n) {
        return n ? h.isArray(n) ? a.call(n) : n.length === +n.length ? h.map(n, h.identity) : h.values(n) : []
    }, h.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : h.keys(n).length
    }, h.partition = function(n, t, r) {
        t = h.iteratee(t, r);
        var e = [],
            u = [];
        return h.each(n, function(n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }), [e, u]
    }, h.first = h.head = h.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : a.call(n, 0, t)
    }, h.initial = function(n, t, r) {
        return a.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }, h.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : a.call(n, Math.max(n.length - t, 0))
    }, h.rest = h.tail = h.drop = function(n, t, r) {
        return a.call(n, null == t || r ? 1 : t)
    }, h.compact = function(n) {
        return h.filter(n, h.identity)
    };
    var y = function(n, t, r, e) {
        if (t && h.every(n, h.isArray)) return o.apply(e, n);
        for (var u = 0, a = n.length; a > u; u++) {
            var l = n[u];
            h.isArray(l) || h.isArguments(l) ? t ? i.apply(e, l) : y(l, t, r, e) : r || e.push(l)
        }
        return e
    };
    h.flatten = function(n, t) {
        return y(n, t, !1, [])
    }, h.without = function(n) {
        return h.difference(n, a.call(arguments, 1))
    }, h.uniq = h.unique = function(n, t, r, e) {
        if (null == n) return [];
        h.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = h.iteratee(r, e));
        for (var u = [], i = [], a = 0, o = n.length; o > a; a++) {
            var l = n[a];
            if (t) a && i === l || u.push(l), i = l;
            else if (r) {
                var c = r(l, a, n);
                h.indexOf(i, c) < 0 && (i.push(c), u.push(l))
            } else h.indexOf(u, l) < 0 && u.push(l)
        }
        return u
    }, h.union = function() {
        return h.uniq(y(arguments, !0, !0, []))
    }, h.intersection = function(n) {
        if (null == n) return [];
        for (var t = [], r = arguments.length, e = 0, u = n.length; u > e; e++) {
            var i = n[e];
            if (!h.contains(t, i)) {
                for (var a = 1; r > a && h.contains(arguments[a], i); a++);
                a === r && t.push(i)
            }
        }
        return t
    }, h.difference = function(n) {
        var t = y(a.call(arguments, 1), !0, !0, []);
        return h.filter(n, function(n) {
            return !h.contains(t, n)
        })
    }, h.zip = function(n) {
        if (null == n) return [];
        for (var t = h.max(arguments, "length").length, r = Array(t), e = 0; t > e; e++) r[e] = h.pluck(arguments, e);
        return r
    }, h.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, h.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0,
            u = n.length;
        if (r) {
            if ("number" != typeof r) return e = h.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r
        }
        for (; u > e; e++)
            if (n[e] === t) return e;
        return -1
    }, h.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = n.length;
        for ("number" == typeof r && (e = 0 > r ? e + r + 1 : Math.min(e, r + 1)); --e >= 0;)
            if (n[e] === t) return e;
        return -1
    }, h.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;
        return u
    };
    var d = function() {};
    h.bind = function(n, t) {
        var r, e;
        if (p && n.bind === p) return p.apply(n, a.call(arguments, 1));
        if (!h.isFunction(n)) throw new TypeError("Bind must be called on a function");
        return r = a.call(arguments, 2), e = function() {
            if (!(this instanceof e)) return n.apply(t, r.concat(a.call(arguments)));
            d.prototype = n.prototype;
            var u = new d;
            d.prototype = null;
            var i = n.apply(u, r.concat(a.call(arguments)));
            return h.isObject(i) ? i : u
        }
    }, h.partial = function(n) {
        var t = a.call(arguments, 1);
        return function() {
            for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++) e[u] === h && (e[u] = arguments[r++]);
            for (; r < arguments.length;) e.push(arguments[r++]);
            return n.apply(this, e)
        }
    }, h.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (1 >= e) throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++) r = arguments[t], n[r] = h.bind(n[r], n);
        return n
    }, h.memoize = function(n, t) {
        var r = function(e) {
            var u = r.cache,
                i = t ? t.apply(this, arguments) : e;
            return h.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, h.delay = function(n, t) {
        var r = a.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, h.defer = function(n) {
        return h.delay.apply(h, [n, 1].concat(a.call(arguments, 1)))
    }, h.throttle = function(n, t, r) {
        var e, u, i, a = null,
            o = 0;
        r || (r = {});
        var l = function() {
            o = r.leading === !1 ? 0 : h.now(), a = null, i = n.apply(e, u), a || (e = u = null)
        };
        return function() {
            var c = h.now();
            o || r.leading !== !1 || (o = c);
            var f = t - (c - o);
            return e = this, u = arguments, 0 >= f || f > t ? (clearTimeout(a), a = null, o = c, i = n.apply(e, u), a || (e = u = null)) : a || r.trailing === !1 || (a = setTimeout(l, f)), i
        }
    }, h.debounce = function(n, t, r) {
        var e, u, i, a, o, l = function() {
            var c = h.now() - a;
            t > c && c > 0 ? e = setTimeout(l, t - c) : (e = null, r || (o = n.apply(i, u), e || (i = u = null)))
        };
        return function() {
            i = this, u = arguments, a = h.now();
            var c = r && !e;
            return e || (e = setTimeout(l, t)), c && (o = n.apply(i, u), i = u = null), o
        }
    };
}).call(this);
