!
function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ScrollMagic = t()
} (this,
function() {
    "use strict";
    var e = function() {};
    e.version = "2.0.5",
    window.addEventListener("mousewheel",
    function() {});
    var t = "data-scrollmagic-pin-spacer";
    e.Controller = function(r) {
        var s, a, o = "REVERSE",
        l = "PAUSED",
        h = i.defaults,
        d = this,
        c = n.extend({},
        h, r),
        u = [],
        p = !1,
        f = 0,
        m = l,
        g = !0,
        v = 0,
        _ = !0,
        y = function() {
            c.refreshInterval > 0 && (a = window.setTimeout(E, c.refreshInterval))
        },
        w = function() {
            return c.vertical ? n.get.scrollTop(c.container) : n.get.scrollLeft(c.container)
        },
        b = function() {
            return c.vertical ? n.get.height(c.container) : n.get.width(c.container)
        },
        x = this._setScrollPos = function(e) {
            c.vertical ? g ? window.scrollTo(n.get.scrollLeft(), e) : c.container.scrollTop = e: g ? window.scrollTo(e, n.get.scrollTop()) : c.container.scrollLeft = e
        },
        T = function() {
            if (_ && p) {
                var e = n.type.Array(p) ? p: u.slice(0);
                p = !1;
                var t = f,
                i = (f = d.scrollPos()) - t;
                0 !== i && (m = i > 0 ? "FORWARD": o),
                m === o && e.reverse(),
                e.forEach(function(e) {
                    e.update(!0)
                })
            }
        },
        S = function() {
            s = n.rAF(T)
        },
        C = function(e) {
            "resize" == e.type && (v = b(), m = l),
            !0 !== p && (p = !0, S())
        },
        E = function() {
            if (!g && v != b()) {
                var e;
                try {
                    e = new Event("resize", {
                        bubbles: !1,
                        cancelable: !1
                    })
                } catch(t) { (e = document.createEvent("Event")).initEvent("resize", !1, !1)
                }
                c.container.dispatchEvent(e)
            }
            u.forEach(function(e) {
                e.refresh()
            }),
            y()
        };
        this._options = c;
        var P = function(e) {
            if (e.length <= 1) return e;
            var t = e.slice(0);
            return t.sort(function(e, t) {
                return e.scrollOffset() > t.scrollOffset() ? 1 : -1
            }),
            t
        };
        return this.addScene = function(t) {
            if (n.type.Array(t)) t.forEach(function(e) {
                d.addScene(e)
            });
            else if (t instanceof e.Scene) if (t.controller() !== d) t.addTo(d);
            else if (u.indexOf(t) < 0) {
                u.push(t),
                u = P(u),
                t.on("shift.controller_sort",
                function() {
                    u = P(u)
                });
                for (var i in c.globalSceneOptions) t[i] && t[i].call(t, c.globalSceneOptions[i])
            }
            return d
        },
        this.removeScene = function(e) {
            if (n.type.Array(e)) e.forEach(function(e) {
                d.removeScene(e)
            });
            else {
                var t = u.indexOf(e);
                t > -1 && (e.off("shift.controller_sort"), u.splice(t, 1), e.remove())
            }
            return d
        },
        this.updateScene = function(t, i) {
            return n.type.Array(t) ? t.forEach(function(e) {
                d.updateScene(e, i)
            }) : i ? t.update(!0) : !0 !== p && t instanceof e.Scene && ( - 1 == (p = p || []).indexOf(t) && p.push(t), p = P(p), S()),
            d
        },
        this.update = function(e) {
            return C({
                type: "resize"
            }),
            e && T(),
            d
        },
        this.scrollTo = function(i, r) {
            if (n.type.Number(i)) x.call(c.container, i, r);
            else if (i instanceof e.Scene) i.controller() === d && d.scrollTo(i.scrollOffset(), r);
            else if (n.type.Function(i)) x = i;
            else {
                var s = n.get.elements(i)[0];
                if (s) {
                    for (; s.parentNode.hasAttribute(t);) s = s.parentNode;
                    var a = c.vertical ? "top": "left",
                    o = n.get.offset(c.container),
                    l = n.get.offset(s);
                    g || (o[a] -= d.scrollPos()),
                    d.scrollTo(l[a] - o[a], r)
                }
            }
            return d
        },
        this.scrollPos = function(e) {
            return arguments.length ? (n.type.Function(e) && (w = e), d) : w.call(d)
        },
        this.info = function(e) {
            var t = {
                size: v,
                vertical: c.vertical,
                scrollPos: f,
                scrollDirection: m,
                container: c.container,
                isDocument: g
            };
            return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t
        },
        this.loglevel = function() {
            return d
        },
        this.enabled = function(e) {
            return arguments.length ? (_ != e && (_ = !!e, d.updateScene(u, !0)), d) : _
        },
        this.destroy = function(e) {
            window.clearTimeout(a);
            for (var t = u.length; t--;) u[t].destroy(e);
            return c.container.removeEventListener("resize", C),
            c.container.removeEventListener("scroll", C),
            n.cAF(s),
            null
        },
        function() {
            for (var e in c) h.hasOwnProperty(e) || delete c[e];
            if (c.container = n.get.elements(c.container)[0], !c.container) throw "ScrollMagic.Controller init failed."; (g = c.container === window || c.container === document.body || !document.body.contains(c.container)) && (c.container = window),
            v = b(),
            c.container.addEventListener("resize", C),
            c.container.addEventListener("scroll", C),
            c.refreshInterval = parseInt(c.refreshInterval) || h.refreshInterval,
            y()
        } (),
        d
    };
    var i = {
        defaults: {
            container: window,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }
    };
    e.Controller.addOption = function(e, t) {
        i.defaults[e] = t
    },
    e.Controller.extend = function(t) {
        var i = this;
        e.Controller = function() {
            return i.apply(this, arguments),
            this.$super = n.extend({},
            this),
            t.apply(this, arguments) || this
        },
        n.extend(e.Controller, i),
        e.Controller.prototype = i.prototype,
        e.Controller.prototype.constructor = e.Controller
    },
    e.Scene = function(i) {
        var s, a, o = "BEFORE",
        l = "DURING",
        h = "AFTER",
        d = r.defaults,
        c = this,
        u = n.extend({},
        d, i),
        p = o,
        f = 0,
        m = {
            start: 0,
            end: 0
        },
        g = 0,
        v = !0,
        _ = {};
        this.on = function(e, t) {
            return n.type.Function(t) && (e = e.trim().split(" ")).forEach(function(e) {
                var i = e.split("."),
                r = i[0],
                n = i[1];
                "*" != r && (_[r] || (_[r] = []), _[r].push({
                    namespace: n || "",
                    callback: t
                }))
            }),
            c
        },
        this.off = function(e, t) {
            return e ? ((e = e.trim().split(" ")).forEach(function(e) {
                var i = e.split("."),
                r = i[0],
                n = i[1] || ""; ("*" === r ? Object.keys(_) : [r]).forEach(function(e) {
                    for (var i = _[e] || [], r = i.length; r--;) {
                        var s = i[r]; ! s || n !== s.namespace && "*" !== n || t && t != s.callback || i.splice(r, 1)
                    }
                    i.length || delete _[e]
                })
            }), c) : c
        },
        this.trigger = function(t, i) {
            if (t) {
                var r = t.trim().split("."),
                n = r[0],
                s = r[1],
                a = _[n];
                a && a.forEach(function(t) {
                    s && s !== t.namespace || t.callback.call(c, new e.Event(n, t.namespace, c, i))
                })
            }
            return c
        },
        c.on("change.internal",
        function(e) {
            "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? b() : "reverse" === e.what && c.update())
        }).on("shift.internal",
        function() {
            y(),
            c.update()
        }),
        this.addTo = function(t) {
            return t instanceof e.Controller && a != t && (a && a.removeScene(c), a = t, S(), w(!0), b(!0), y(), a.info("container").addEventListener("resize", x), t.addScene(c), c.trigger("add", {
                controller: a
            }), c.update()),
            c
        },
        this.enabled = function(e) {
            return arguments.length ? (v != e && (v = !!e, c.update(!0)), c) : v
        },
        this.remove = function() {
            if (a) {
                a.info("container").removeEventListener("resize", x);
                var e = a;
                a = void 0,
                e.removeScene(c),
                c.trigger("remove")
            }
            return c
        },
        this.destroy = function(e) {
            return c.trigger("destroy", {
                reset: e
            }),
            c.remove(),
            c.off("*.*"),
            null
        },
        this.update = function(e) {
            if (a) if (e) if (a.enabled() && v) {
                var t, i = a.info("scrollPos");
                t = u.duration > 0 ? (i - m.start) / (m.end - m.start) : i >= m.start ? 1 : 0,
                c.trigger("update", {
                    startPos: m.start,
                    endPos: m.end,
                    scrollPos: i
                }),
                c.progress(t)
            } else P && p === l && M(!0);
            else a.updateScene(c, !1);
            return c
        },
        this.refresh = function() {
            return w(),
            b(),
            c
        },
        this.progress = function(e) {
            if (arguments.length) {
                var t = !1,
                i = p,
                r = a ? a.info("scrollDirection") : "PAUSED",
                n = u.reverse || e >= f;
                if (0 === u.duration ? (t = f != e, f = 1 > e && n ? 0 : 1, p = 0 === f ? o: l) : 0 > e && p !== o && n ? (f = 0, p = o, t = !0) : e >= 0 && 1 > e && n ? (f = e, p = l, t = !0) : e >= 1 && p !== h ? (f = 1, p = h, t = !0) : p !== l || n || M(), t) {
                    var s = {
                        progress: f,
                        state: p,
                        scrollDirection: r
                    },
                    d = p != i,
                    m = function(e) {
                        c.trigger(e, s)
                    };
                    d && i !== l && (m("enter"), m(i === o ? "start": "end")),
                    m("progress"),
                    d && p !== l && (m(p === o ? "start": "end"), m("leave"))
                }
                return c
            }
            return f
        };
        var y = function() {
            m = {
                start: g + u.offset
            },
            a && u.triggerElement && (m.start -= a.info("size") * u.triggerHook),
            m.end = m.start + u.duration
        },
        w = function(e) {
            if (s) {
                var t = "duration";
                C(t, s.call(c)) && !e && (c.trigger("change", {
                    what: t,
                    newval: u[t]
                }), c.trigger("shift", {
                    reason: t
                }))
            }
        },
        b = function(e) {
            var i = 0,
            r = u.triggerElement;
            if (a && r) {
                for (var s = a.info(), o = n.get.offset(s.container), l = s.vertical ? "top": "left"; r.parentNode.hasAttribute(t);) r = r.parentNode;
                var h = n.get.offset(r);
                s.isDocument || (o[l] -= a.scrollPos()),
                i = h[l] - o[l]
            }
            var d = i != g;
            g = i,
            d && !e && c.trigger("shift", {
                reason: "triggerElementPosition"
            })
        },
        x = function() {
            u.triggerHook > 0 && c.trigger("shift", {
                reason: "containerResize"
            })
        },
        T = n.extend(r.validate, {
            duration: function(e) {
                if (n.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
                    var t = parseFloat(e) / 100;
                    e = function() {
                        return a ? a.info("size") * t: 0
                    }
                }
                if (n.type.Function(e)) {
                    s = e;
                    try {
                        e = parseFloat(s())
                    } catch(t) {
                        e = -1
                    }
                }
                if (e = parseFloat(e), !n.type.Number(e) || 0 > e) throw s ? (s = void 0, 0) : 0;
                return e
            }
        }),
        S = function(e) { (e = arguments.length ? [e] : Object.keys(T)).forEach(function(e) {
                var t;
                if (T[e]) try {
                    t = T[e](u[e])
                } catch(i) {
                    t = d[e]
                } finally {
                    u[e] = t
                }
            })
        },
        C = function(e, t) {
            var i = !1,
            r = u[e];
            return u[e] != t && (u[e] = t, S(e), i = r != u[e]),
            i
        },
        E = function(e) {
            c[e] || (c[e] = function(t) {
                return arguments.length ? ("duration" === e && (s = void 0), C(e, t) && (c.trigger("change", {
                    what: e,
                    newval: u[e]
                }), r.shifts.indexOf(e) > -1 && c.trigger("shift", {
                    reason: e
                })), c) : u[e]
            })
        };
        this.controller = function() {
            return a
        },
        this.state = function() {
            return p
        },
        this.scrollOffset = function() {
            return m.start
        },
        this.triggerPosition = function() {
            var e = u.offset;
            return a && (e += u.triggerElement ? g: a.info("size") * c.triggerHook()),
            e
        };
        var P, k;
        c.on("shift.internal",
        function(e) {
            var t = "duration" === e.reason; (p === h && t || p === l && 0 === u.duration) && M(),
            t && O()
        }).on("progress.internal",
        function() {
            M()
        }).on("add.internal",
        function() {
            O()
        }).on("destroy.internal",
        function(e) {
            c.removePin(e.reset)
        });
        var M = function(e) {
            if (P && a) {
                var t = a.info(),
                i = k.spacer.firstChild;
                if (e || p !== l) {
                    var r = {
                        position: k.inFlow ? "relative": "absolute",
                        top: 0,
                        left: 0
                    },
                    s = n.css(i, "position") != r.position;
                    k.pushFollowers ? u.duration > 0 && (p === h && 0 === parseFloat(n.css(k.spacer, "padding-top")) ? s = !0 : p === o && 0 === parseFloat(n.css(k.spacer, "padding-bottom")) && (s = !0)) : r[t.vertical ? "top": "left"] = u.duration * f,
                    n.css(i, r),
                    s && O()
                } else {
                    "fixed" != n.css(i, "position") && (n.css(i, {
                        position: "fixed"
                    }), O());
                    var d = n.get.offset(k.spacer, !0),
                    c = u.reverse || 0 === u.duration ? t.scrollPos - m.start: Math.round(f * u.duration * 10) / 10;
                    d[t.vertical ? "top": "left"] += c,
                    n.css(k.spacer.firstChild, {
                        top: d.top,
                        left: d.left
                    })
                }
            }
        },
        O = function() {
            if (P && a && k.inFlow) {
                var e = p === l,
                t = a.info("vertical"),
                i = k.spacer.firstChild,
                r = n.isMarginCollapseType(n.css(k.spacer, "display")),
                s = {};
                k.relSize.width || k.relSize.autoFullWidth ? e ? n.css(P, {
                    width: n.get.width(k.spacer)
                }) : n.css(P, {
                    width: "100%"
                }) : (s["min-width"] = n.get.width(t ? P: i, !0, !0), s.width = e ? s["min-width"] : "auto"),
                k.relSize.height ? e ? n.css(P, {
                    height: n.get.height(k.spacer) - (k.pushFollowers ? u.duration: 0)
                }) : n.css(P, {
                    height: "100%"
                }) : (s["min-height"] = n.get.height(t ? i: P, !0, !r), s.height = e ? s["min-height"] : "auto"),
                k.pushFollowers && (s["padding" + (t ? "Top": "Left")] = u.duration * f, s["padding" + (t ? "Bottom": "Right")] = u.duration * (1 - f)),
                n.css(k.spacer, s)
            }
        },
        z = function() {
            a && P && p === l && !a.info("isDocument") && M()
        },
        A = function() {
            a && P && p === l && ((k.relSize.width || k.relSize.autoFullWidth) && n.get.width(window) != n.get.width(k.spacer.parentNode) || k.relSize.height && n.get.height(window) != n.get.height(k.spacer.parentNode)) && O()
        },
        L = function(e) {
            a && P && p === l && !a.info("isDocument") && (e.preventDefault(), a._setScrollPos(a.info("scrollPos") - ((e.wheelDelta || e[a.info("vertical") ? "wheelDeltaY": "wheelDeltaX"]) / 3 || 30 * -e.detail)))
        };
        this.setPin = function(e, i) {
            if (i = n.extend({},
            {
                pushFollowers: !0,
                spacerClass: "scrollmagic-pin-spacer"
            },
            i), !(e = n.get.elements(e)[0])) return c;
            if ("fixed" === n.css(e, "position")) return c;
            if (P) {
                if (P === e) return c;
                c.removePin()
            }
            var r = (P = e).parentNode.style.display,
            s = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            P.parentNode.style.display = "none";
            var a = "absolute" != n.css(P, "position"),
            o = n.css(P, s.concat(["display"])),
            l = n.css(P, ["width", "height"]);
            P.parentNode.style.display = r,
            !a && i.pushFollowers && (i.pushFollowers = !1);
            var h = P.parentNode.insertBefore(document.createElement("div"), P),
            d = n.extend(o, {
                position: a ? "relative": "absolute",
                boxSizing: "content-box",
                mozBoxSizing: "content-box",
                webkitBoxSizing: "content-box"
            });
            if (a || n.extend(d, n.css(P, ["width", "height"])), n.css(h, d), h.setAttribute(t, ""), n.addClass(h, i.spacerClass), k = {
                spacer: h,
                relSize: {
                    width: "%" === l.width.slice( - 1),
                    height: "%" === l.height.slice( - 1),
                    autoFullWidth: "auto" === l.width && a && n.isMarginCollapseType(o.display)
                },
                pushFollowers: i.pushFollowers,
                inFlow: a
            },
            !P.___origStyle) {
                P.___origStyle = {};
                var u = P.style;
                s.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]).forEach(function(e) {
                    P.___origStyle[e] = u[e] || ""
                })
            }
            return k.relSize.width && n.css(h, {
                width: l.width
            }),
            k.relSize.height && n.css(h, {
                height: l.height
            }),
            h.appendChild(P),
            n.css(P, {
                position: a ? "relative": "absolute",
                margin: "auto",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }),
            (k.relSize.width || k.relSize.autoFullWidth) && n.css(P, {
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            }),
            window.addEventListener("scroll", z),
            window.addEventListener("resize", z),
            window.addEventListener("resize", A),
            P.addEventListener("mousewheel", L),
            P.addEventListener("DOMMouseScroll", L),
            M(),
            c
        },
        this.removePin = function(e) {
            if (P) {
                if (p === l && M(!0), e || !a) {
                    var i = k.spacer.firstChild;
                    if (i.hasAttribute(t)) {
                        var r = k.spacer.style;
                        margins = {},
                        ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"].forEach(function(e) {
                            margins[e] = r[e] || ""
                        }),
                        n.css(i, margins)
                    }
                    k.spacer.parentNode.insertBefore(i, k.spacer),
                    k.spacer.parentNode.removeChild(k.spacer),
                    P.parentNode.hasAttribute(t) || (n.css(P, P.___origStyle), delete P.___origStyle)
                }
                window.removeEventListener("scroll", z),
                window.removeEventListener("resize", z),
                window.removeEventListener("resize", A),
                P.removeEventListener("mousewheel", L),
                P.removeEventListener("DOMMouseScroll", L),
                P = void 0
            }
            return c
        };
        var D, R = [];
        return c.on("destroy.internal",
        function(e) {
            c.removeClassToggle(e.reset)
        }),
        this.setClassToggle = function(e, t) {
            var i = n.get.elements(e);
            return 0 !== i.length && n.type.String(t) ? (R.length > 0 && c.removeClassToggle(), D = t, R = i, c.on("enter.internal_class leave.internal_class",
            function(e) {
                var t = "enter" === e.type ? n.addClass: n.removeClass;
                R.forEach(function(e) {
                    t(e, D)
                })
            }), c) : c
        },
        this.removeClassToggle = function(e) {
            return e && R.forEach(function(e) {
                n.removeClass(e, D)
            }),
            c.off("start.internal_class end.internal_class"),
            D = void 0,
            R = [],
            c
        },
        function() {
            for (var e in u) d.hasOwnProperty(e) || delete u[e];
            for (var t in d) E(t);
            S()
        } (),
        c
    };
    var r = {
        defaults: {
            duration: 0,
            offset: 0,
            triggerElement: void 0,
            triggerHook: .5,
            reverse: !0,
            loglevel: 2
        },
        validate: {
            offset: function(e) {
                if (e = parseFloat(e), !n.type.Number(e)) throw 0;
                return e
            },
            triggerElement: function(e) {
                if (e = e || void 0) {
                    var t = n.get.elements(e)[0];
                    if (!t) throw 0;
                    e = t
                }
                return e
            },
            triggerHook: function(e) {
                var t = {
                    onCenter: .5,
                    onEnter: 1,
                    onLeave: 0
                };
                if (n.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
                else {
                    if (! (e in t)) throw 0;
                    e = t[e]
                }
                return e
            },
            reverse: function(e) {
                return !! e
            }
        },
        shifts: ["duration", "offset", "triggerHook"]
    };
    e.Scene.addOption = function(e, t, i, n) {
        e in r.defaults || (r.defaults[e] = t, r.validate[e] = i, n && r.shifts.push(e))
    },
    e.Scene.extend = function(t) {
        var i = this;
        e.Scene = function() {
            return i.apply(this, arguments),
            this.$super = n.extend({},
            this),
            t.apply(this, arguments) || this
        },
        n.extend(e.Scene, i),
        e.Scene.prototype = i.prototype,
        e.Scene.prototype.constructor = e.Scene
    },
    e.Event = function(e, t, i, r) {
        r = r || {};
        for (var n in r) this[n] = r[n];
        return this.type = e,
        this.target = this.currentTarget = i,
        this.namespace = t || "",
        this.timeStamp = this.timestamp = Date.now(),
        this
    };
    var n = e._util = function(e) {
        var t, i = {},
        r = function(e) {
            return parseFloat(e) || 0
        },
        n = function(t) {
            return t.currentStyle ? t.currentStyle: e.getComputedStyle(t)
        },
        s = function(t, i, s, a) {
            if ((i = i === document ? e: i) === e) a = !1;
            else if (!c.DomElement(i)) return 0;
            t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
            var o = (s ? i["offset" + t] || i["outer" + t] : i["client" + t] || i["inner" + t]) || 0;
            if (s && a) {
                var l = n(i);
                o += "Height" === t ? r(l.marginTop) + r(l.marginBottom) : r(l.marginLeft) + r(l.marginRight)
            }
            return o
        },
        a = function(e) {
            return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g,
            function(e) {
                return e[1].toUpperCase()
            })
        };
        i.extend = function(e) {
            for (e = e || {},
            t = 1; t < arguments.length; t++) if (arguments[t]) for (var i in arguments[t]) arguments[t].hasOwnProperty(i) && (e[i] = arguments[t][i]);
            return e
        },
        i.isMarginCollapseType = function(e) {
            return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
        };
        var o = 0,
        l = ["ms", "moz", "webkit", "o"],
        h = e.requestAnimationFrame,
        d = e.cancelAnimationFrame;
        for (t = 0; ! h && t < l.length; ++t) h = e[l[t] + "RequestAnimationFrame"],
        d = e[l[t] + "CancelAnimationFrame"] || e[l[t] + "CancelRequestAnimationFrame"];
        h || (h = function(t) {
            var i = (new Date).getTime(),
            r = Math.max(0, 16 - (i - o)),
            n = e.setTimeout(function() {
                t(i + r)
            },
            r);
            return o = i + r,
            n
        }),
        d || (d = function(t) {
            e.clearTimeout(t)
        }),
        i.rAF = h.bind(e),
        i.cAF = d.bind(e);
        var c = i.type = function(e) {
            return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
        };
        c.String = function(e) {
            return "string" === c(e)
        },
        c.Function = function(e) {
            return "function" === c(e)
        },
        c.Array = function(e) {
            return Array.isArray(e)
        },
        c.Number = function(e) {
            return ! c.Array(e) && e - parseFloat(e) + 1 >= 0
        },
        c.DomElement = function(e) {
            return "object" == typeof HTMLElement ? e instanceof HTMLElement: e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
        };
        var u = i.get = {};
        return u.elements = function(t) {
            var i = [];
            if (c.String(t)) try {
                t = document.querySelectorAll(t)
            } catch(e) {
                return i
            }
            if ("nodelist" === c(t) || c.Array(t)) for (var r = 0,
            n = i.length = t.length; n > r; r++) {
                var s = t[r];
                i[r] = c.DomElement(s) ? s: u.elements(s)
            } else(c.DomElement(t) || t === document || t === e) && (i = [t]);
            return i
        },
        u.scrollTop = function(t) {
            return t && "number" == typeof t.scrollTop ? t.scrollTop: e.pageYOffset || 0
        },
        u.scrollLeft = function(t) {
            return t && "number" == typeof t.scrollLeft ? t.scrollLeft: e.pageXOffset || 0
        },
        u.width = function(e, t, i) {
            return s("width", e, t, i)
        },
        u.height = function(e, t, i) {
            return s("height", e, t, i)
        },
        u.offset = function(e, t) {
            var i = {
                top: 0,
                left: 0
            };
            if (e && e.getBoundingClientRect) {
                var r = e.getBoundingClientRect();
                i.top = r.top,
                i.left = r.left,
                t || (i.top += u.scrollTop(), i.left += u.scrollLeft())
            }
            return i
        },
        i.addClass = function(e, t) {
            t && (e.classList ? e.classList.add(t) : e.className += " " + t)
        },
        i.removeClass = function(e, t) {
            t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "))
        },
        i.css = function(e, t) {
            if (c.String(t)) return n(e)[a(t)];
            if (c.Array(t)) {
                var i = {},
                r = n(e);
                return t.forEach(function(e) {
                    i[e] = r[a(e)]
                }),
                i
            }
            for (var s in t) {
                var o = t[s];
                o == parseFloat(o) && (o += "px"),
                e.style[a(s)] = o
            }
        },
        i
    } (window || {});
    return e
});
_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global: this || window; (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var e = (_gsScope.document || {}).documentElement,
    t = _gsScope,
    i = function(i, r) {
        var n = "x" === r ? "Width": "Height",
        s = "scroll" + n,
        a = "client" + n,
        o = document.body;
        return i === t || i === e || i === o ? Math.max(e[s], o[s]) - (t["inner" + n] || e[a] || o[a]) : i[s] - i["offset" + n]
    },
    r = function(i, r) {
        var n = "scroll" + ("x" === r ? "Left": "Top");
        return i === t && (null != i.pageXOffset ? n = "page" + r.toUpperCase() + "Offset": i = null != e[n] ? e: document.body),
        function() {
            return i[n]
        }
    },
    n = function(i, n) {
        var s = function(e) {
            return "string" == typeof e && (e = TweenLite.selector(e)),
            e.length && e !== t && e[0] && e[0].style && !e.nodeType && (e = e[0]),
            e === t || e.nodeType && e.style ? e: null
        } (i).getBoundingClientRect(),
        a = !n || n === t || n === document.body,
        o = (a ? e: n).getBoundingClientRect(),
        l = {
            x: s.left - o.left,
            y: s.top - o.top
        };
        return ! a && n && (l.x += r(n, "x")(), l.y += r(n, "y")()),
        l
    },
    s = function(e, t, r) {
        var s = typeof e;
        return isNaN(e) ? "number" === s || "string" === s && "=" === e.charAt(1) ? e: "max" === e ? i(t, r) : Math.min(i(t, r), n(e, t)[r]) : parseFloat(e)
    },
    a = _gsScope._gsDefine.plugin({
        propName: "scrollTo",
        API: 2,
        global: !0,
        version: "1.9.0",
        init: function(e, i, n) {
            return this._wdw = e === t,
            this._target = e,
            this._tween = n,
            "object" != typeof i ? "string" == typeof(i = {
                y: i
            }).y && "max" !== i.y && "=" !== i.y.charAt(1) && (i.x = i.y) : i.nodeType && (i = {
                y: i,
                x: i
            }),
            this.vars = i,
            this._autoKill = !1 !== i.autoKill,
            this.getX = r(e, "x"),
            this.getY = r(e, "y"),
            this.x = this.xPrev = this.getX(),
            this.y = this.yPrev = this.getY(),
            null != i.x ? (this._addTween(this, "x", this.x, s(i.x, e, "x") - (i.offsetX || 0), "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0,
            null != i.y ? (this._addTween(this, "y", this.y, s(i.y, e, "y") - (i.offsetY || 0), "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0,
            !0
        },
        set: function(e) {
            this._super.setRatio.call(this, e);
            var r = this._wdw || !this.skipX ? this.getX() : this.xPrev,
            n = this._wdw || !this.skipY ? this.getY() : this.yPrev,
            s = n - this.yPrev,
            o = r - this.xPrev,
            l = a.autoKillThreshold;
            this.x < 0 && (this.x = 0),
            this.y < 0 && (this.y = 0),
            this._autoKill && (!this.skipX && (o > l || o < -l) && r < i(this._target, "x") && (this.skipX = !0), !this.skipY && (s > l || s < -l) && n < i(this._target, "y") && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))),
            this._wdw ? t.scrollTo(this.skipX ? r: this.x, this.skipY ? n: this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)),
            this.xPrev = this.x,
            this.yPrev = this.y
        }
    }),
    o = a.prototype;
    a.max = i,
    a.getOffset = n,
    a.buildGetter = r,
    a.autoKillThreshold = 7,
    o._kill = function(e) {
        return e.scrollTo_x && (this.skipX = !0),
        e.scrollTo_y && (this.skipY = !0),
        this._super._kill.call(this, e)
    }
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(e) {
    "use strict";
    var t = function() {
        return (_gsScope.GreenSockGlobals || _gsScope).ScrollToPlugin
    };
    "undefined" != typeof module && module.exports ? (require("../TweenLite.js"), module.exports = t()) : "function" == typeof define && define.amd && define(["TweenLite"], t)
} ();
var _gsScope; ((_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global: this || window)._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function(e, t, i) {
        var r = function(e) {
            var t, i = [],
            r = e.length;
            for (t = 0; t !== r; i.push(e[t++]));
            return i
        },
        n = function(e, t, i) {
            var r, n, s = e.cycle;
            for (r in s) n = s[r],
            e[r] = "function" == typeof n ? n(i, t[i]) : n[i % n.length];
            delete e.cycle
        },
        s = function(e, t, r) {
            i.call(this, e, t, r),
            this._cycle = 0,
            this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._repeat && this._uncache(!0),
            this.render = s.prototype.render
        },
        a = i._internals,
        o = a.isSelector,
        l = a.isArray,
        h = s.prototype = i.to({},
        .1, {}),
        d = [];
        s.version = "1.20.3",
        h.constructor = s,
        h.kill()._gc = !1,
        s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf,
        s.getTweensOf = i.getTweensOf,
        s.lagSmoothing = i.lagSmoothing,
        s.ticker = i.ticker,
        s.render = i.render,
        h.invalidate = function() {
            return this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._yoyoEase = null,
            this._uncache(!0),
            i.prototype.invalidate.call(this)
        },
        h.updateTo = function(e, t) {
            var r, n = this.ratio,
            s = this.vars.immediateRender || e.immediateRender;
            t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (r in e) this.vars[r] = e[r];
            if (this._initted || s) if (t) this._initted = !1,
            s && this.render(0, !0, !0);
            else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                var a = this._totalTime;
                this.render(0, !0, !1),
                this._initted = !1,
                this.render(a, !0, !1)
            } else if (this._initted = !1, this._init(), this._time > 0 || s) for (var o, l = 1 / (1 - n), h = this._firstPT; h;) o = h.s + h.c,
            h.c *= l,
            h.s = o - h.c,
            h = h._next;
            return this
        },
        h.render = function(e, t, r) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var n, s, o, l, h, d, c, u, p, f = this._dirty ? this.totalDuration() : this._totalDuration,
            m = this._time,
            g = this._totalTime,
            v = this._cycle,
            _ = this._duration,
            y = this._rawPrevTime;
            if (e >= f - 1e-7 && e >= 0 ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = _, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, s = "onComplete", r = r || this._timeline.autoRemoveChildren), 0 === _ && (this._initted || !this.vars.lazy || r) && (this._startTime === this._timeline._duration && (e = 0), (y < 0 || e <= 0 && e >= -1e-7 || 1e-10 === y && "isPause" !== this.data) && y !== e && (r = !0, y > 1e-10 && (s = "onReverseComplete")), this._rawPrevTime = u = !t || e || y === e ? e: 1e-10)) : e < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== g || 0 === _ && y > 0) && (s = "onReverseComplete", n = this._reversed), e < 0 && (this._active = !1, 0 === _ && (this._initted || !this.vars.lazy || r) && (y >= 0 && (r = !0), this._rawPrevTime = u = !t || e || y === e ? e: 1e-10)), this._initted || (r = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (l = _ + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && g <= e && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 != (1 & this._cycle) && (this._time = _ - this._time, (p = this._yoyoEase || this.vars.yoyoEase) && (this._yoyoEase || (!0 !== p || this._initted ? this._yoyoEase = p = !0 === p ? this._ease: p instanceof Ease ? p: Ease.map[p] : (p = this.vars.ease, this._yoyoEase = p = p ? p instanceof Ease ? p: "function" == typeof p ? new Ease(p, this.vars.easeParams) : Ease.map[p] || i.defaultEase: i.defaultEase)), this.ratio = p ? 1 - p.getRatio((_ - this._time) / _) : 0)), this._time > _ ? this._time = _: this._time < 0 && (this._time = 0)), this._easeType && !p ? (h = this._time / _, d = this._easeType, c = this._easePower, (1 === d || 3 === d && h >= .5) && (h = 1 - h), 3 === d && (h *= 2), 1 === c ? h *= h: 2 === c ? h *= h * h: 3 === c ? h *= h * h * h: 4 === c && (h *= h * h * h * h), 1 === d ? this.ratio = 1 - h: 2 === d ? this.ratio = h: this._time / _ < .5 ? this.ratio = h / 2 : this.ratio = 1 - h / 2) : p || (this.ratio = this._ease.getRatio(this._time / _))), m !== this._time || r || v !== this._cycle) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!r && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = m,
                    this._totalTime = g,
                    this._rawPrevTime = y,
                    this._cycle = v,
                    a.lazyTweens.push(this),
                    void(this._lazy = [e, t]); ! this._time || n || p ? n && this._ease._calcEnd && !p && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / _)
                }
                for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== m && e >= 0 && (this._active = !0), 0 === g && (2 === this._initted && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, !0, r) : s || (s = "_dummyGS")), this.vars.onStart && (0 === this._totalTime && 0 !== _ || t || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s,
                o = o._next;
                this._onUpdate && (e < 0 && this._startAt && this._startTime && this._startAt.render(e, !0, r), t || (this._totalTime !== g || s) && this._callback("onUpdate")),
                this._cycle !== v && (t || this._gc || this.vars.onRepeat && this._callback("onRepeat")),
                s && (this._gc && !r || (e < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, !0, r), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[s] && this._callback(s), 0 === _ && 1e-10 === this._rawPrevTime && 1e-10 !== u && (this._rawPrevTime = 0)))
            } else g !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate"))
        },
        s.to = function(e, t, i) {
            return new s(e, t, i)
        },
        s.from = function(e, t, i) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            new s(e, t, i)
        },
        s.fromTo = function(e, t, i, r) {
            return r.startAt = i,
            r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender,
            new s(e, t, r)
        },
        s.staggerTo = s.allTo = function(e, t, a, h, c, u, p) {
            h = h || 0;
            var f, m, g, v, _ = 0,
            y = [],
            w = function() {
                a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments),
                c.apply(p || a.callbackScope || this, u || d)
            },
            b = a.cycle,
            x = a.startAt && a.startAt.cycle;
            for (l(e) || ("string" == typeof e && (e = i.selector(e) || e), o(e) && (e = r(e))), e = e || [], h < 0 && ((e = r(e)).reverse(), h *= -1), f = e.length - 1, g = 0; g <= f; g++) {
                m = {};
                for (v in a) m[v] = a[v];
                if (b && (n(m, e, g), null != m.duration && (t = m.duration, delete m.duration)), x) {
                    x = m.startAt = {};
                    for (v in a.startAt) x[v] = a.startAt[v];
                    n(m.startAt, e, g)
                }
                m.delay = _ + (m.delay || 0),
                g === f && c && (m.onComplete = w),
                y[g] = new s(e[g], t, m),
                _ += h
            }
            return y
        },
        s.staggerFrom = s.allFrom = function(e, t, i, r, n, a, o) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            s.staggerTo(e, t, i, r, n, a, o)
        },
        s.staggerFromTo = s.allFromTo = function(e, t, i, r, n, a, o, l) {
            return r.startAt = i,
            r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender,
            s.staggerTo(e, t, r, n, a, o, l)
        },
        s.delayedCall = function(e, t, i, r, n) {
            return new s(t, 0, {
                delay: e,
                onComplete: t,
                onCompleteParams: i,
                callbackScope: r,
                onReverseComplete: t,
                onReverseCompleteParams: i,
                immediateRender: !1,
                useFrames: n,
                overwrite: 0
            })
        },
        s.set = function(e, t) {
            return new s(e, 0, t)
        },
        s.isTweening = function(e) {
            return i.getTweensOf(e, !0).length > 0
        };
        var c = function(e, t) {
            for (var r = [], n = 0, s = e._first; s;) s instanceof i ? r[n++] = s: (t && (r[n++] = s), n = (r = r.concat(c(s, t))).length),
            s = s._next;
            return r
        },
        u = s.getAllTweens = function(t) {
            return c(e._rootTimeline, t).concat(c(e._rootFramesTimeline, t))
        };
        s.killAll = function(e, i, r, n) {
            null == i && (i = !0),
            null == r && (r = !0);
            var s, a, o, l = u(0 != n),
            h = l.length,
            d = i && r && n;
            for (o = 0; o < h; o++) a = l[o],
            (d || a instanceof t || (s = a.target === a.vars.onComplete) && r || i && !s) && (e ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
        },
        s.killChildTweensOf = function(e, t) {
            if (null != e) {
                var n, h, d, c, u, p = a.tweenLookup;
                if ("string" == typeof e && (e = i.selector(e) || e), o(e) && (e = r(e)), l(e)) for (c = e.length; --c > -1;) s.killChildTweensOf(e[c], t);
                else {
                    n = [];
                    for (d in p) for (h = p[d].target.parentNode; h;) h === e && (n = n.concat(p[d].tweens)),
                    h = h.parentNode;
                    for (u = n.length, c = 0; c < u; c++) t && n[c].totalTime(n[c].totalDuration()),
                    n[c]._enabled(!1, !1)
                }
            }
        };
        var p = function(e, i, r, n) {
            i = !1 !== i,
            r = !1 !== r;
            for (var s, a, o = u(n = !1 !== n), l = i && r && n, h = o.length; --h > -1;) a = o[h],
            (l || a instanceof t || (s = a.target === a.vars.onComplete) && r || i && !s) && a.paused(e)
        };
        return s.pauseAll = function(e, t, i) {
            p(!0, e, t, i)
        },
        s.resumeAll = function(e, t, i) {
            p(!1, e, t, i)
        },
        s.globalTimeScale = function(t) {
            var r = e._rootTimeline,
            n = i.ticker.time;
            return arguments.length ? (t = t || 1e-10, r._startTime = n - (n - r._startTime) * r._timeScale / t, r = e._rootFramesTimeline, n = i.ticker.frame, r._startTime = n - (n - r._startTime) * r._timeScale / t, r._timeScale = e._rootTimeline._timeScale = t, t) : r._timeScale
        },
        h.progress = function(e, t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - e: e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
        },
        h.totalProgress = function(e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
        },
        h.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 != (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
        },
        h.duration = function(t) {
            return arguments.length ? e.prototype.duration.call(this, t) : this._duration
        },
        h.totalDuration = function(e) {
            return arguments.length ? -1 === this._repeat ? this: this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        },
        h.repeat = function(e) {
            return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
        },
        h.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
        },
        h.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e, this) : this._yoyo
        },
        s
    },
    !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function(e, t, i) {
        var r = function(e) {
            t.call(this, e),
            this._labels = {},
            this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren,
            this.smoothChildTiming = !0 === this.vars.smoothChildTiming,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var i, r, n = this.vars;
            for (r in n) i = n[r],
            o(i) && -1 !== i.join("").indexOf("{self}") && (n[r] = this._swapSelfInParams(i));
            o(n.tweens) && this.add(n.tweens, 0, n.align, n.stagger)
        },
        n = i._internals,
        s = r._internals = {},
        a = n.isSelector,
        o = n.isArray,
        l = n.lazyTweens,
        h = n.lazyRender,
        d = _gsScope._gsDefine.globals,
        c = function(e) {
            var t, i = {};
            for (t in e) i[t] = e[t];
            return i
        },
        u = function(e, t, i) {
            var r, n, s = e.cycle;
            for (r in s) n = s[r],
            e[r] = "function" == typeof n ? n(i, t[i]) : n[i % n.length];
            delete e.cycle
        },
        p = s.pauseCallback = function() {},
        f = function(e) {
            var t, i = [],
            r = e.length;
            for (t = 0; t !== r; i.push(e[t++]));
            return i
        },
        m = r.prototype = new t;
        return r.version = "1.20.3",
        m.constructor = r,
        m.kill()._gc = m._forcingPlayhead = m._hasPause = !1,
        m.to = function(e, t, r, n) {
            var s = r.repeat && d.TweenMax || i;
            return t ? this.add(new s(e, t, r), n) : this.set(e, r, n)
        },
        m.from = function(e, t, r, n) {
            return this.add((r.repeat && d.TweenMax || i).from(e, t, r), n)
        },
        m.fromTo = function(e, t, r, n, s) {
            var a = n.repeat && d.TweenMax || i;
            return t ? this.add(a.fromTo(e, t, r, n), s) : this.set(e, n, s)
        },
        m.staggerTo = function(e, t, n, s, o, l, h, d) {
            var p, m, g = new r({
                onComplete: l,
                onCompleteParams: h,
                callbackScope: d,
                smoothChildTiming: this.smoothChildTiming
            }),
            v = n.cycle;
            for ("string" == typeof e && (e = i.selector(e) || e), a(e = e || []) && (e = f(e)), (s = s || 0) < 0 && ((e = f(e)).reverse(), s *= -1), m = 0; m < e.length; m++)(p = c(n)).startAt && (p.startAt = c(p.startAt), p.startAt.cycle && u(p.startAt, e, m)),
            v && (u(p, e, m), null != p.duration && (t = p.duration, delete p.duration)),
            g.to(e[m], t, p, m * s);
            return this.add(g, o)
        },
        m.staggerFrom = function(e, t, i, r, n, s, a, o) {
            return i.immediateRender = 0 != i.immediateRender,
            i.runBackwards = !0,
            this.staggerTo(e, t, i, r, n, s, a, o)
        },
        m.staggerFromTo = function(e, t, i, r, n, s, a, o, l) {
            return r.startAt = i,
            r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender,
            this.staggerTo(e, t, r, n, s, a, o, l)
        },
        m.call = function(e, t, r, n) {
            return this.add(i.delayedCall(0, e, t, r), n)
        },
        m.set = function(e, t, r) {
            return r = this._parseTimeOrLabel(r, 0, !0),
            null == t.immediateRender && (t.immediateRender = r === this._time && !this._paused),
            this.add(new i(e, 0, t), r)
        },
        r.exportRoot = function(e, t) {
            null == (e = e || {}).smoothChildTiming && (e.smoothChildTiming = !0);
            var n, s, a, o, l = new r(e),
            h = l._timeline;
            for (null == t && (t = !0), h._remove(l, !0), l._startTime = 0, l._rawPrevTime = l._time = l._totalTime = h._time, a = h._first; a;) o = a._next,
            t && a instanceof i && a.target === a.vars.onComplete || ((s = a._startTime - a._delay) < 0 && (n = 1), l.add(a, s)),
            a = o;
            return h.add(l, 0),
            n && l.totalDuration(),
            l
        },
        m.add = function(n, s, a, l) {
            var h, d, c, u, p, f;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, n)), !(n instanceof e)) {
                if (n instanceof Array || n && n.push && o(n)) {
                    for (a = a || "normal", l = l || 0, h = s, d = n.length, c = 0; c < d; c++) o(u = n[c]) && (u = new r({
                        tweens: u
                    })),
                    this.add(u, h),
                    "string" != typeof u && "function" != typeof u && ("sequence" === a ? h = u._startTime + u.totalDuration() / u._timeScale: "start" === a && (u._startTime -= u.delay())),
                    h += l;
                    return this._uncache(!0)
                }
                if ("string" == typeof n) return this.addLabel(n, s);
                if ("function" != typeof n) throw "Cannot add " + n + " into the timeline; it is not a tween, timeline, function, or string.";
                n = i.delayedCall(0, n)
            }
            if (t.prototype.add.call(this, n, s), n._time && n.render((this.rawTime() - n._startTime) * n._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (f = (p = this).rawTime() > n._startTime; p._timeline;) f && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1),
            p = p._timeline;
            return this
        },
        m.remove = function(t) {
            if (t instanceof e) {
                this._remove(t, !1);
                var i = t._timeline = t.vars.useFrames ? e._rootFramesTimeline: e._rootTimeline;
                return t._startTime = (t._paused ? t._pauseTime: i._time) - (t._reversed ? t.totalDuration() - t._totalTime: t._totalTime) / t._timeScale,
                this
            }
            if (t instanceof Array || t && t.push && o(t)) {
                for (var r = t.length; --r > -1;) this.remove(t[r]);
                return this
            }
            return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
        },
        m._remove = function(e, i) {
            t.prototype._remove.call(this, e, i);
            return this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        },
        m.append = function(e, t) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
        },
        m.insert = m.insertMultiple = function(e, t, i, r) {
            return this.add(e, t || 0, i, r)
        },
        m.appendMultiple = function(e, t, i, r) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e), i, r)
        },
        m.addLabel = function(e, t) {
            return this._labels[e] = this._parseTimeOrLabel(t),
            this
        },
        m.addPause = function(e, t, r, n) {
            var s = i.delayedCall(0, p, r, n || this);
            return s.vars.onComplete = s.vars.onReverseComplete = t,
            s.data = "isPause",
            this._hasPause = !0,
            this.add(s, e)
        },
        m.removeLabel = function(e) {
            return delete this._labels[e],
            this
        },
        m.getLabelTime = function(e) {
            return null != this._labels[e] ? this._labels[e] : -1
        },
        m._parseTimeOrLabel = function(t, i, r, n) {
            var s, a;
            if (n instanceof e && n.timeline === this) this.remove(n);
            else if (n && (n instanceof Array || n.push && o(n))) for (a = n.length; --a > -1;) n[a] instanceof e && n[a].timeline === this && this.remove(n[a]);
            if (s = "number" != typeof t || i ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration: 0, "string" == typeof i) return this._parseTimeOrLabel(i, r && "number" == typeof t && null == this._labels[i] ? t - s: 0, r);
            if (i = i || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = s);
            else {
                if ( - 1 === (a = t.indexOf("="))) return null == this._labels[t] ? r ? this._labels[t] = s + i: i: this._labels[t] + i;
                i = parseInt(t.charAt(a - 1) + "1", 10) * Number(t.substr(a + 1)),
                t = a > 1 ? this._parseTimeOrLabel(t.substr(0, a - 1), 0, r) : s
            }
            return Number(t) + i
        },
        m.seek = function(e, t) {
            return this.totalTime("number" == typeof e ? e: this._parseTimeOrLabel(e), !1 !== t)
        },
        m.stop = function() {
            return this.paused(!0)
        },
        m.gotoAndPlay = function(e, t) {
            return this.play(e, t)
        },
        m.gotoAndStop = function(e, t) {
            return this.pause(e, t)
        },
        m.render = function(e, t, i) {
            this._gc && this._enabled(!0, !1);
            var r, n, s, a, o, d, c, u = this._time,
            p = this._dirty ? this.totalDuration() : this._totalDuration,
            f = this._startTime,
            m = this._timeScale,
            g = this._paused;
            if (u !== this._time && (e += this._time - u), e >= p - 1e-7 && e >= 0) this._totalTime = this._time = p,
            this._reversed || this._hasPausedChild() || (n = !0, a = "onComplete", o = !!this._timeline.autoRemoveChildren, 0 === this._duration && (e <= 0 && e >= -1e-7 || this._rawPrevTime < 0 || 1e-10 === this._rawPrevTime) && this._rawPrevTime !== e && this._first && (o = !0, this._rawPrevTime > 1e-10 && (a = "onReverseComplete"))),
            this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e: 1e-10,
            e = p + 1e-4;
            else if (e < 1e-7) if (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && 1e-10 !== this._rawPrevTime && (this._rawPrevTime > 0 || e < 0 && this._rawPrevTime >= 0)) && (a = "onReverseComplete", n = this._reversed), e < 0) this._active = !1,
            this._timeline.autoRemoveChildren && this._reversed ? (o = n = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (o = !0),
            this._rawPrevTime = e;
            else {
                if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e: 1e-10, 0 === e && n) for (r = this._first; r && 0 === r._startTime;) r._duration || (n = !1),
                r = r._next;
                e = 0,
                this._initted || (o = !0)
            } else {
                if (this._hasPause && !this._forcingPlayhead && !t) {
                    if (e >= u) for (r = this._first; r && r._startTime <= e && !d;) r._duration || "isPause" !== r.data || r.ratio || 0 === r._startTime && 0 === this._rawPrevTime || (d = r),
                    r = r._next;
                    else for (r = this._last; r && r._startTime >= e && !d;) r._duration || "isPause" === r.data && r._rawPrevTime > 0 && (d = r),
                    r = r._prev;
                    d && (this._time = e = d._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = e
            }
            if (this._time !== u && this._first || i || o || d) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && e > 0 && (this._active = !0), 0 === u && this.vars.onStart && (0 === this._time && this._duration || t || this._callback("onStart")), (c = this._time) >= u) for (r = this._first; r && (s = r._next, c === this._time && (!this._paused || g));)(r._active || r._startTime <= c && !r._paused && !r._gc) && (d === r && this.pause(), r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)),
                r = s;
                else for (r = this._last; r && (s = r._prev, c === this._time && (!this._paused || g));) {
                    if (r._active || r._startTime <= u && !r._paused && !r._gc) {
                        if (d === r) {
                            for (d = r._prev; d && d.endTime() > this._time;) d.render(d._reversed ? d.totalDuration() - (e - d._startTime) * d._timeScale: (e - d._startTime) * d._timeScale, t, i),
                            d = d._prev;
                            d = null,
                            this.pause()
                        }
                        r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)
                    }
                    r = s
                }
                this._onUpdate && (t || (l.length && h(), this._callback("onUpdate"))),
                a && (this._gc || f !== this._startTime && m === this._timeScale || (0 === this._time || p >= this.totalDuration()) && (n && (l.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[a] && this._callback(a)))
            }
        },
        m._hasPausedChild = function() {
            for (var e = this._first; e;) {
                if (e._paused || e instanceof r && e._hasPausedChild()) return ! 0;
                e = e._next
            }
            return ! 1
        },
        m.getChildren = function(e, t, r, n) {
            n = n || -9999999999;
            for (var s = [], a = this._first, o = 0; a;) a._startTime < n || (a instanceof i ? !1 !== t && (s[o++] = a) : (!1 !== r && (s[o++] = a), !1 !== e && (o = (s = s.concat(a.getChildren(!0, t, r))).length))),
            a = a._next;
            return s
        },
        m.getTweensOf = function(e, t) {
            var r, n, s = this._gc,
            a = [],
            o = 0;
            for (s && this._enabled(!0, !0), n = (r = i.getTweensOf(e)).length; --n > -1;)(r[n].timeline === this || t && this._contains(r[n])) && (a[o++] = r[n]);
            return s && this._enabled(!1, !0),
            a
        },
        m.recent = function() {
            return this._recent
        },
        m._contains = function(e) {
            for (var t = e.timeline; t;) {
                if (t === this) return ! 0;
                t = t.timeline
            }
            return ! 1
        },
        m.shiftChildren = function(e, t, i) {
            i = i || 0;
            for (var r, n = this._first,
            s = this._labels; n;) n._startTime >= i && (n._startTime += e),
            n = n._next;
            if (t) for (r in s) s[r] >= i && (s[r] += e);
            return this._uncache(!0)
        },
        m._kill = function(e, t) {
            if (!e && !t) return this._enabled(!1, !1);
            for (var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), r = i.length, n = !1; --r > -1;) i[r]._kill(e, t) && (n = !0);
            return n
        },
        m.clear = function(e) {
            var t = this.getChildren(!1, !0, !0),
            i = t.length;
            for (this._time = this._totalTime = 0; --i > -1;) t[i]._enabled(!1, !1);
            return ! 1 !== e && (this._labels = {}),
            this._uncache(!0)
        },
        m.invalidate = function() {
            for (var t = this._first; t;) t.invalidate(),
            t = t._next;
            return e.prototype.invalidate.call(this)
        },
        m._enabled = function(e, i) {
            if (e === this._gc) for (var r = this._first; r;) r._enabled(e, !0),
            r = r._next;
            return t.prototype._enabled.call(this, e, i)
        },
        m.totalTime = function(t, i, r) {
            this._forcingPlayhead = !0;
            var n = e.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            n
        },
        m.duration = function(e) {
            return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
        },
        m.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var t, i, r = 0,
                    n = this._last,
                    s = 999999999999; n;) t = n._prev,
                    n._dirty && n.totalDuration(),
                    n._startTime > s && this._sortChildren && !n._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(n, n._startTime - n._delay), this._calculatingDuration = 0) : s = n._startTime,
                    n._startTime < 0 && !n._paused && (r -= n._startTime, this._timeline.smoothChildTiming && (this._startTime += n._startTime / this._timeScale, this._time -= n._startTime, this._totalTime -= n._startTime, this._rawPrevTime -= n._startTime), this.shiftChildren( - n._startTime, !1, -9999999999), s = 0),
                    (i = n._startTime + n._totalDuration / n._timeScale) > r && (r = i),
                    n = t;
                    this._duration = this._totalDuration = r,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
        },
        m.paused = function(t) {
            if (!t) for (var i = this._first,
            r = this._time; i;) i._startTime === r && "isPause" === i.data && (i._rawPrevTime = 0),
            i = i._next;
            return e.prototype.paused.apply(this, arguments)
        },
        m.usesFrames = function() {
            for (var t = this._timeline; t._timeline;) t = t._timeline;
            return t === e._rootFramesTimeline
        },
        m.rawTime = function(e) {
            return e && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime: (this._timeline.rawTime(e) - this._startTime) * this._timeScale
        },
        r
    },
    !0),
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"],
    function(e, t, i) {
        var r = function(t) {
            e.call(this, t),
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._cycle = 0,
            this._yoyo = !0 === this.vars.yoyo,
            this._dirty = !0
        },
        n = t._internals,
        s = n.lazyTweens,
        a = n.lazyRender,
        o = _gsScope._gsDefine.globals,
        l = new i(null, null, 1, 0),
        h = r.prototype = new e;
        return h.constructor = r,
        h.kill()._gc = !1,
        r.version = "1.20.3",
        h.invalidate = function() {
            return this._yoyo = !0 === this.vars.yoyo,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            e.prototype.invalidate.call(this)
        },
        h.addCallback = function(e, i, r, n) {
            return this.add(t.delayedCall(0, e, r, n), i)
        },
        h.removeCallback = function(e, t) {
            if (e) if (null == t) this._kill(null, e);
            else for (var i = this.getTweensOf(e, !1), r = i.length, n = this._parseTimeOrLabel(t); --r > -1;) i[r]._startTime === n && i[r]._enabled(!1, !1);
            return this
        },
        h.removePause = function(t) {
            return this.removeCallback(e._internals.pauseCallback, t)
        },
        h.tweenTo = function(e, i) {
            i = i || {};
            var r, n, s, a = {
                ease: l,
                useFrames: this.usesFrames(),
                immediateRender: !1
            },
            h = i.repeat && o.TweenMax || t;
            for (n in i) a[n] = i[n];
            return a.time = this._parseTimeOrLabel(e),
            r = Math.abs(Number(a.time) - this._time) / this._timeScale || .001,
            s = new h(this, r, a),
            a.onStart = function() {
                s.target.paused(!0),
                s.vars.time !== s.target.time() && r === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale),
                i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
            },
            s
        },
        h.tweenFromTo = function(e, t, i) {
            i = i || {},
            e = this._parseTimeOrLabel(e),
            i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [e],
                callbackScope: this
            },
            i.immediateRender = !1 !== i.immediateRender;
            var r = this.tweenTo(t, i);
            return r.duration(Math.abs(r.vars.time - e) / this._timeScale || .001)
        },
        h.render = function(e, t, i) {
            this._gc && this._enabled(!0, !1);
            var r, n, o, l, h, d, c, u, p = this._time,
            f = this._dirty ? this.totalDuration() : this._totalDuration,
            m = this._duration,
            g = this._totalTime,
            v = this._startTime,
            _ = this._timeScale,
            y = this._rawPrevTime,
            w = this._paused,
            b = this._cycle;
            if (p !== this._time && (e += this._time - p), e >= f - 1e-7 && e >= 0) this._locked || (this._totalTime = f, this._cycle = this._repeat),
            this._reversed || this._hasPausedChild() || (n = !0, l = "onComplete", h = !!this._timeline.autoRemoveChildren, 0 === this._duration && (e <= 0 && e >= -1e-7 || y < 0 || 1e-10 === y) && y !== e && this._first && (h = !0, y > 1e-10 && (l = "onReverseComplete"))),
            this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e: 1e-10,
            this._yoyo && 0 != (1 & this._cycle) ? this._time = e = 0 : (this._time = m, e = m + 1e-4);
            else if (e < 1e-7) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== p || 0 === m && 1e-10 !== y && (y > 0 || e < 0 && y >= 0) && !this._locked) && (l = "onReverseComplete", n = this._reversed), e < 0) this._active = !1,
            this._timeline.autoRemoveChildren && this._reversed ? (h = n = !0, l = "onReverseComplete") : y >= 0 && this._first && (h = !0),
            this._rawPrevTime = e;
            else {
                if (this._rawPrevTime = m || !t || e || this._rawPrevTime === e ? e: 1e-10, 0 === e && n) for (r = this._first; r && 0 === r._startTime;) r._duration || (n = !1),
                r = r._next;
                e = 0,
                this._initted || (h = !0)
            } else if (0 === m && y < 0 && (h = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (d = m + this._repeatDelay, this._cycle = this._totalTime / d >> 0, 0 !== this._cycle && this._cycle === this._totalTime / d && g <= e && this._cycle--, this._time = this._totalTime - this._cycle * d, this._yoyo && 0 != (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, e = m + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time)), this._hasPause && !this._forcingPlayhead && !t) {
                if ((e = this._time) >= p || this._repeat && b !== this._cycle) for (r = this._first; r && r._startTime <= e && !c;) r._duration || "isPause" !== r.data || r.ratio || 0 === r._startTime && 0 === this._rawPrevTime || (c = r),
                r = r._next;
                else for (r = this._last; r && r._startTime >= e && !c;) r._duration || "isPause" === r.data && r._rawPrevTime > 0 && (c = r),
                r = r._prev;
                c && c._startTime < m && (this._time = e = c._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== b && !this._locked) {
                var x = this._yoyo && 0 != (1 & b),
                T = x === (this._yoyo && 0 != (1 & this._cycle)),
                S = this._totalTime,
                C = this._cycle,
                E = this._rawPrevTime,
                P = this._time;
                if (this._totalTime = b * m, this._cycle < b ? x = !x: this._totalTime += m, this._time = p, this._rawPrevTime = 0 === m ? y - 1e-4: y, this._cycle = b, this._locked = !0, p = x ? 0 : m, this.render(p, t, 0 === m), t || this._gc || this.vars.onRepeat && (this._cycle = C, this._locked = !1, this._callback("onRepeat")), p !== this._time) return;
                if (T && (this._cycle = b, this._locked = !0, p = x ? m + 1e-4: -1e-4, this.render(p, !0, !1)), this._locked = !1, this._paused && !w) return;
                this._time = P,
                this._totalTime = S,
                this._cycle = C,
                this._rawPrevTime = E
            }
            if (this._time !== p && this._first || i || h || c) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && e > 0 && (this._active = !0), 0 === g && this.vars.onStart && (0 === this._totalTime && this._totalDuration || t || this._callback("onStart")), (u = this._time) >= p) for (r = this._first; r && (o = r._next, u === this._time && (!this._paused || w));)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (c === r && this.pause(), r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)),
                r = o;
                else for (r = this._last; r && (o = r._prev, u === this._time && (!this._paused || w));) {
                    if (r._active || r._startTime <= p && !r._paused && !r._gc) {
                        if (c === r) {
                            for (c = r._prev; c && c.endTime() > this._time;) c.render(c._reversed ? c.totalDuration() - (e - c._startTime) * c._timeScale: (e - c._startTime) * c._timeScale, t, i),
                            c = c._prev;
                            c = null,
                            this.pause()
                        }
                        r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)
                    }
                    r = o
                }
                this._onUpdate && (t || (s.length && a(), this._callback("onUpdate"))),
                l && (this._locked || this._gc || v !== this._startTime && _ === this._timeScale || (0 === this._time || f >= this.totalDuration()) && (n && (s.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[l] && this._callback(l)))
            } else g !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate"))
        },
        h.getActive = function(e, t, i) {
            null == e && (e = !0),
            null == t && (t = !0),
            null == i && (i = !1);
            var r, n, s = [],
            a = this.getChildren(e, t, i),
            o = 0,
            l = a.length;
            for (r = 0; r < l; r++)(n = a[r]).isActive() && (s[o++] = n);
            return s
        },
        h.getLabelAfter = function(e) {
            e || 0 !== e && (e = this._time);
            var t, i = this.getLabelsArray(),
            r = i.length;
            for (t = 0; t < r; t++) if (i[t].time > e) return i[t].name;
            return null
        },
        h.getLabelBefore = function(e) {
            null == e && (e = this._time);
            for (var t = this.getLabelsArray(), i = t.length; --i > -1;) if (t[i].time < e) return t[i].name;
            return null
        },
        h.getLabelsArray = function() {
            var e, t = [],
            i = 0;
            for (e in this._labels) t[i++] = {
                time: this._labels[e],
                name: e
            };
            return t.sort(function(e, t) {
                return e.time - t.time
            }),
            t
        },
        h.invalidate = function() {
            return this._locked = !1,
            e.prototype.invalidate.call(this)
        },
        h.progress = function(e, t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - e: e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration() || 0
        },
        h.totalProgress = function(e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration() || 0
        },
        h.totalDuration = function(t) {
            return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this: (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        },
        h.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 != (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
        },
        h.repeat = function(e) {
            return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
        },
        h.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
        },
        h.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e, this) : this._yoyo
        },
        h.currentLabel = function(e) {
            return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
        },
        r
    },
    !0),
    function() {
        var e = 180 / Math.PI,
        t = [],
        i = [],
        r = [],
        n = {},
        s = _gsScope._gsDefine.globals,
        a = function(e, t, i, r) {
            i === r && (i = r - (r - t) / 1e6),
            e === t && (t = e + (i - e) / 1e6),
            this.a = e,
            this.b = t,
            this.c = i,
            this.d = r,
            this.da = r - e,
            this.ca = i - e,
            this.ba = t - e
        },
        o = function(e, t, i, r) {
            var n = {
                a: e
            },
            s = {},
            a = {},
            o = {
                c: r
            },
            l = (e + t) / 2,
            h = (t + i) / 2,
            d = (i + r) / 2,
            c = (l + h) / 2,
            u = (h + d) / 2,
            p = (u - c) / 8;
            return n.b = l + (e - l) / 4,
            s.b = c + p,
            n.c = s.a = (n.b + s.b) / 2,
            s.c = a.a = (c + u) / 2,
            a.b = u - p,
            o.b = d + (r - d) / 4,
            a.c = o.a = (a.b + o.b) / 2,
            [n, s, a, o]
        },
        l = function(e, n, s, a, l) {
            var h, d, c, u, p, f, m, g, v, _, y, w, b, x = e.length - 1,
            T = 0,
            S = e[0].a;
            for (h = 0; h < x; h++) d = (p = e[T]).a,
            c = p.d,
            u = e[T + 1].d,
            l ? (y = t[h], b = ((w = i[h]) + y) * n * .25 / (a ? .5 : r[h] || .5), g = c - ((f = c - (c - d) * (a ? .5 * n: 0 !== y ? b / y: 0)) + (((m = c + (u - c) * (a ? .5 * n: 0 !== w ? b / w: 0)) - f) * (3 * y / (y + w) + .5) / 4 || 0))) : g = c - ((f = c - (c - d) * n * .5) + (m = c + (u - c) * n * .5)) / 2,
            f += g,
            m += g,
            p.c = v = f,
            p.b = 0 !== h ? S: S = p.a + .6 * (p.c - p.a),
            p.da = c - d,
            p.ca = v - d,
            p.ba = S - d,
            s ? (_ = o(d, S, v, c), e.splice(T, 1, _[0], _[1], _[2], _[3]), T += 4) : T++,
            S = m; (p = e[T]).b = S,
            p.c = S + .4 * (p.d - S),
            p.da = p.d - p.a,
            p.ca = p.c - p.a,
            p.ba = S - p.a,
            s && (_ = o(p.a, S, p.c, p.d), e.splice(T, 1, _[0], _[1], _[2], _[3]))
        },
        h = function(e, r, n, s) {
            var o, l, h, d, c, u, p = [];
            if (s) for (l = (e = [s].concat(e)).length; --l > -1;)"string" == typeof(u = e[l][r]) && "=" === u.charAt(1) && (e[l][r] = s[r] + Number(u.charAt(0) + u.substr(2)));
            if ((o = e.length - 2) < 0) return p[0] = new a(e[0][r], 0, 0, e[0][r]),
            p;
            for (l = 0; l < o; l++) h = e[l][r],
            d = e[l + 1][r],
            p[l] = new a(h, 0, 0, d),
            n && (c = e[l + 2][r], t[l] = (t[l] || 0) + (d - h) * (d - h), i[l] = (i[l] || 0) + (c - d) * (c - d));
            return p[l] = new a(e[l][r], 0, 0, e[l + 1][r]),
            p
        },
        d = function(e, s, a, o, d, c) {
            var u, p, f, m, g, v, _, y, w = {},
            b = [],
            x = c || e[0];
            d = "string" == typeof d ? "," + d + ",": ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            null == s && (s = 1);
            for (p in e[0]) b.push(p);
            if (e.length > 1) {
                for (y = e[e.length - 1], _ = !0, u = b.length; --u > -1;) if (p = b[u], Math.abs(x[p] - y[p]) > .05) {
                    _ = !1;
                    break
                }
                _ && (e = e.concat(), c && e.unshift(c), e.push(e[1]), c = e[e.length - 3])
            }
            for (t.length = i.length = r.length = 0, u = b.length; --u > -1;) p = b[u],
            n[p] = -1 !== d.indexOf("," + p + ","),
            w[p] = h(e, p, n[p], c);
            for (u = t.length; --u > -1;) t[u] = Math.sqrt(t[u]),
            i[u] = Math.sqrt(i[u]);
            if (!o) {
                for (u = b.length; --u > -1;) if (n[p]) for (v = (f = w[b[u]]).length - 1, m = 0; m < v; m++) g = f[m + 1].da / i[m] + f[m].da / t[m] || 0,
                r[m] = (r[m] || 0) + g * g;
                for (u = r.length; --u > -1;) r[u] = Math.sqrt(r[u])
            }
            for (u = b.length, m = a ? 4 : 1; --u > -1;) f = w[p = b[u]],
            l(f, s, a, o, n[p]),
            _ && (f.splice(0, m), f.splice(f.length - m, m));
            return w
        },
        c = function(e, t, i) {
            for (var r, n, s, a, o, l, h, d, c, u, p, f = 1 / i,
            m = e.length; --m > -1;) for (s = (u = e[m]).a, a = u.d - s, o = u.c - s, l = u.b - s, r = n = 0, d = 1; d <= i; d++) r = n - (n = ((h = f * d) * h * a + 3 * (c = 1 - h) * (h * o + c * l)) * h),
            t[p = m * i + d - 1] = (t[p] || 0) + r * r
        },
        u = _gsScope._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.8",
            API: 2,
            global: !0,
            init: function(e, t, i) {
                this._target = e,
                t instanceof Array && (t = {
                    values: t
                }),
                this._func = {},
                this._mod = {},
                this._props = [],
                this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
                var r, n, s, o, l, h = t.values || [],
                u = {},
                p = h[0],
                f = t.autoRotate || i.vars.orientToBezier;
                this._autoRotate = f ? f instanceof Array ? f: [["x", "y", "rotation", !0 === f ? 0 : Number(f) || 0]] : null;
                for (r in p) this._props.push(r);
                for (s = this._props.length; --s > -1;) r = this._props[s],
                this._overwriteProps.push(r),
                n = this._func[r] = "function" == typeof e[r],
                u[r] = n ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r: "get" + r.substr(3)]() : parseFloat(e[r]),
                l || u[r] !== h[0][r] && (l = u);
                if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? d(h, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, l) : function(e, t, i) {
                    var r, n, s, o, l, h, d, c, u, p, f, m = {},
                    g = "cubic" === (t = t || "soft") ? 3 : 2,
                    v = "soft" === t,
                    _ = [];
                    if (v && i && (e = [i].concat(e)), null == e || e.length < g + 1) throw "invalid Bezier data";
                    for (u in e[0]) _.push(u);
                    for (h = _.length; --h > -1;) {
                        for (m[u = _[h]] = l = [], p = 0, c = e.length, d = 0; d < c; d++) r = null == i ? e[d][u] : "string" == typeof(f = e[d][u]) && "=" === f.charAt(1) ? i[u] + Number(f.charAt(0) + f.substr(2)) : Number(f),
                        v && d > 1 && d < c - 1 && (l[p++] = (r + l[p - 2]) / 2),
                        l[p++] = r;
                        for (c = p - g + 1, p = 0, d = 0; d < c; d += g) r = l[d],
                        n = l[d + 1],
                        s = l[d + 2],
                        o = 2 === g ? 0 : l[d + 3],
                        l[p++] = f = 3 === g ? new a(r, n, s, o) : new a(r, (2 * n + r) / 3, (2 * n + s) / 3, s);
                        l.length = p
                    }
                    return m
                } (h, t.type, u), this._segCount = this._beziers[r].length, this._timeRes) {
                    var m = function(e, t) {
                        var i, r, n, s, a = [],
                        o = [],
                        l = 0,
                        h = 0,
                        d = (t = t >> 0 || 6) - 1,
                        u = [],
                        p = [];
                        for (i in e) c(e[i], a, t);
                        for (n = a.length, r = 0; r < n; r++) l += Math.sqrt(a[r]),
                        p[s = r % t] = l,
                        s === d && (h += l, u[s = r / t >> 0] = p, o[s] = h, l = 0, p = []);
                        return {
                            length: h,
                            lengths: o,
                            segments: u
                        }
                    } (this._beziers, this._timeRes);
                    this._length = m.length,
                    this._lengths = m.lengths,
                    this._segments = m.segments,
                    this._l1 = this._li = this._s1 = this._si = 0,
                    this._l2 = this._lengths[0],
                    this._curSeg = this._segments[0],
                    this._s2 = this._curSeg[0],
                    this._prec = 1 / this._curSeg.length
                }
                if (f = this._autoRotate) for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), s = f.length; --s > -1;) {
                    for (o = 0; o < 3; o++) r = f[s][o],
                    this._func[r] = "function" == typeof e[r] && e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r: "get" + r.substr(3)];
                    r = f[s][2],
                    this._initialRotations[s] = (this._func[r] ? this._func[r].call(this._target) : this._target[r]) || 0,
                    this._overwriteProps.push(r)
                }
                return this._startRatio = i.vars.runBackwards ? 1 : 0,
                !0
            },
            set: function(t) {
                var i, r, n, s, a, o, l, h, d, c, u = this._segCount,
                p = this._func,
                f = this._target,
                m = t !== this._startRatio;
                if (this._timeRes) {
                    if (d = this._lengths, c = this._curSeg, t *= this._length, n = this._li, t > this._l2 && n < u - 1) {
                        for (h = u - 1; n < h && (this._l2 = d[++n]) <= t;);
                        this._l1 = d[n - 1],
                        this._li = n,
                        this._curSeg = c = this._segments[n],
                        this._s2 = c[this._s1 = this._si = 0]
                    } else if (t < this._l1 && n > 0) {
                        for (; n > 0 && (this._l1 = d[--n]) >= t;);
                        0 === n && t < this._l1 ? this._l1 = 0 : n++,
                        this._l2 = d[n],
                        this._li = n,
                        this._curSeg = c = this._segments[n],
                        this._s1 = c[(this._si = c.length - 1) - 1] || 0,
                        this._s2 = c[this._si]
                    }
                    if (i = n, t -= this._l1, n = this._si, t > this._s2 && n < c.length - 1) {
                        for (h = c.length - 1; n < h && (this._s2 = c[++n]) <= t;);
                        this._s1 = c[n - 1],
                        this._si = n
                    } else if (t < this._s1 && n > 0) {
                        for (; n > 0 && (this._s1 = c[--n]) >= t;);
                        0 === n && t < this._s1 ? this._s1 = 0 : n++,
                        this._s2 = c[n],
                        this._si = n
                    }
                    o = (n + (t - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                } else o = (t - (i = t < 0 ? 0 : t >= 1 ? u - 1 : u * t >> 0) * (1 / u)) * u;
                for (r = 1 - o, n = this._props.length; --n > -1;) s = this._props[n],
                l = (o * o * (a = this._beziers[s][i]).da + 3 * r * (o * a.ca + r * a.ba)) * o + a.a,
                this._mod[s] && (l = this._mod[s](l, f)),
                p[s] ? f[s](l) : f[s] = l;
                if (this._autoRotate) {
                    var g, v, _, y, w, b, x, T = this._autoRotate;
                    for (n = T.length; --n > -1;) s = T[n][2],
                    b = T[n][3] || 0,
                    x = !0 === T[n][4] ? 1 : e,
                    a = this._beziers[T[n][0]],
                    g = this._beziers[T[n][1]],
                    a && g && (a = a[i], g = g[i], v = a.a + (a.b - a.a) * o, v += ((y = a.b + (a.c - a.b) * o) - v) * o, y += (a.c + (a.d - a.c) * o - y) * o, _ = g.a + (g.b - g.a) * o, _ += ((w = g.b + (g.c - g.b) * o) - _) * o, w += (g.c + (g.d - g.c) * o - w) * o, l = m ? Math.atan2(w - _, y - v) * x + b: this._initialRotations[n], this._mod[s] && (l = this._mod[s](l, f)), p[s] ? f[s](l) : f[s] = l)
                }
            }
        }),
        p = u.prototype;
        u.bezierThrough = d,
        u.cubicToQuadratic = o,
        u._autoCSS = !0,
        u.quadraticToCubic = function(e, t, i) {
            return new a(e, (2 * t + e) / 3, (2 * t + i) / 3, i)
        },
        u._cssRegister = function() {
            var e = s.CSSPlugin;
            if (e) {
                var t = e._internals,
                i = t._parseToProxy,
                r = t._setPluginRatio,
                n = t.CSSPropTween;
                t._registerComplexSpecialProp("bezier", {
                    parser: function(e, t, s, a, o, l) {
                        t instanceof Array && (t = {
                            values: t
                        }),
                        l = new u;
                        var h, d, c, p = t.values,
                        f = p.length - 1,
                        m = [],
                        g = {};
                        if (f < 0) return o;
                        for (h = 0; h <= f; h++) c = i(e, p[h], a, o, l, f !== h),
                        m[h] = c.end;
                        for (d in t) g[d] = t[d];
                        return g.values = m,
                        o = new n(e, "bezier", 0, 0, c.pt, 2),
                        o.data = c,
                        o.plugin = l,
                        o.setRatio = r,
                        0 === g.autoRotate && (g.autoRotate = !0),
                        !g.autoRotate || g.autoRotate instanceof Array || (h = !0 === g.autoRotate ? 0 : Number(g.autoRotate), g.autoRotate = null != c.end.left ? [["left", "top", "rotation", h, !1]] : null != c.end.x && [["x", "y", "rotation", h, !1]]),
                        g.autoRotate && (a._transform || a._enableTransforms(!1), c.autoRotate = a._target._gsTransform, c.proxy.rotation = c.autoRotate.rotation || 0, a._overwriteProps.push("rotation")),
                        l._onInitTween(c.proxy, g, a._tween),
                        o
                    }
                })
            }
        },
        p._mod = function(e) {
            for (var t, i = this._overwriteProps,
            r = i.length; --r > -1;)(t = e[i[r]]) && "function" == typeof t && (this._mod[i[r]] = t)
        },
        p._kill = function(e) {
            var t, i, r = this._props;
            for (t in this._beziers) if (t in e) for (delete this._beziers[t], delete this._func[t], i = r.length; --i > -1;) r[i] === t && r.splice(i, 1);
            if (r = this._autoRotate) for (i = r.length; --i > -1;) e[r[i][2]] && r.splice(i, 1);
            return this._super._kill.call(this, e)
        }
    } (),
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"],
    function(e, t) {
        var i, r, n, s, a = function() {
            e.call(this, "css"),
            this._overwriteProps.length = 0,
            this.setRatio = a.prototype.setRatio
        },
        o = _gsScope._gsDefine.globals,
        l = {},
        h = a.prototype = new e("css");
        h.constructor = a,
        a.version = "1.20.3",
        a.API = 2,
        a.defaultTransformPerspective = 0,
        a.defaultSkewType = "compensated",
        a.defaultSmoothOrigin = !0,
        h = "px",
        a.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: ""
        };
        var d, c, u, p, f, m, g, v, _ = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
        y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        w = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        x = /(?:\d|\-|\+|=|#|\.)*/g,
        T = /opacity *= *([^)]*)/i,
        S = /opacity:([^;]*)/i,
        C = /alpha\(opacity *=.+?\)/i,
        E = /^(rgb|hsl)/,
        P = /([A-Z])/g,
        k = /-([a-z])/gi,
        M = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        O = function(e, t) {
            return t.toUpperCase()
        },
        z = /(?:Left|Right|Width)/i,
        A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        L = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        D = /,(?=[^\)]*(?:\(|$))/gi,
        R = /[\s,\(]/i,
        I = Math.PI / 180,
        X = 180 / Math.PI,
        N = {},
        $ = {
            style: {}
        },
        F = _gsScope.document || {
            createElement: function() {
                return $
            }
        },
        B = function(e, t) {
            return F.createElementNS ? F.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : F.createElement(e)
        },
        Y = B("div"),
        H = B("img"),
        G = a._internals = {
            _specialProps: l
        },
        j = (_gsScope.navigator || {}).userAgent || "",
        V = function() {
            var e = j.indexOf("Android"),
            t = B("a");
            return u = -1 !== j.indexOf("Safari") && -1 === j.indexOf("Chrome") && ( - 1 === e || parseFloat(j.substr(e + 8, 2)) > 3),
            f = u && parseFloat(j.substr(j.indexOf("Version/") + 8, 2)) < 6,
            p = -1 !== j.indexOf("Firefox"),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(j) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(j)) && (m = parseFloat(RegExp.$1)),
            !!t && (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity))
        } (),
        q = function(e) {
            return T.test("string" == typeof e ? e: (e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        },
        W = function(e) {
            _gsScope.console && console.log(e)
        },
        U = "",
        K = "",
        Z = function(e, t) {
            var i, r, n = (t = t || Y).style;
            if (void 0 !== n[e]) return e;
            for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === n[i[r] + e];);
            return r >= 0 ? (K = 3 === r ? "ms": i[r], U = "-" + K.toLowerCase() + "-", K + e) : null
        },
        Q = F.defaultView ? F.defaultView.getComputedStyle: function() {},
        J = a.getStyle = function(e, t, i, r, n) {
            var s;
            return V || "opacity" !== t ? (!r && e.style[t] ? s = e.style[t] : (i = i || Q(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(P, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == n || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s: n) : q(e)
        },
        ee = G.convertToPixels = function(e, i, r, n, s) {
            if ("px" === n || !n && "lineHeight" !== i) return r;
            if ("auto" === n || !r) return 0;
            var o, l, h, d = z.test(i),
            c = e,
            u = Y.style,
            p = r < 0,
            f = 1 === r;
            if (p && (r = -r), f && (r *= 100), "lineHeight" !== i || n) if ("%" === n && -1 !== i.indexOf("border")) o = r / 100 * (d ? e.clientWidth: e.clientHeight);
            else {
                if (u.cssText = "border:0 solid red;position:" + J(e, "position") + ";line-height:0;", "%" !== n && c.appendChild && "v" !== n.charAt(0) && "rem" !== n) u[d ? "borderLeftWidth": "borderTopWidth"] = r + n;
                else {
                    if (c = e.parentNode || F.body, -1 !== J(c, "display").indexOf("flex") && (u.position = "absolute"), l = c._gsCache, h = t.ticker.frame, l && d && l.time === h) return l.width * r / 100;
                    u[d ? "width": "height"] = r + n
                }
                c.appendChild(Y),
                o = parseFloat(Y[d ? "offsetWidth": "offsetHeight"]),
                c.removeChild(Y),
                d && "%" === n && !1 !== a.cacheWidths && ((l = c._gsCache = c._gsCache || {}).time = h, l.width = o / r * 100),
                0 !== o || s || (o = ee(e, i, r, n, !0))
            } else l = Q(e).lineHeight,
            e.style.lineHeight = r,
            o = parseFloat(Q(e).lineHeight),
            e.style.lineHeight = l;
            return f && (o /= 100),
            p ? -o: o
        },
        te = G.calculateOffset = function(e, t, i) {
            if ("absolute" !== J(e, "position", i)) return 0;
            var r = "left" === t ? "Left": "Top",
            n = J(e, "margin" + r, i);
            return e["offset" + r] - (ee(e, t, parseFloat(n), n.replace(x, "")) || 0)
        },
        ie = function(e, t) {
            var i, r, n, s = {};
            if (t = t || Q(e, null)) if (i = t.length) for (; --i > -1;) - 1 !== (n = t[i]).indexOf("-transform") && Me !== n || (s[n.replace(k, O)] = t.getPropertyValue(n));
            else for (i in t) - 1 !== i.indexOf("Transform") && ke !== i || (s[i] = t[i]);
            else if (t = e.currentStyle || e.style) for (i in t)"string" == typeof i && void 0 === s[i] && (s[i.replace(k, O)] = t[i]);
            return V || (s.opacity = q(e)),
            r = Ye(e, t, !1),
            s.rotation = r.rotation,
            s.skewX = r.skewX,
            s.scaleX = r.scaleX,
            s.scaleY = r.scaleY,
            s.x = r.x,
            s.y = r.y,
            ze && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ),
            s.filters && delete s.filters,
            s
        },
        re = function(e, t, i, r, n) {
            var s, a, o, l = {},
            h = e.style;
            for (a in i)"cssText" !== a && "length" !== a && isNaN(a) && (t[a] !== (s = i[a]) || n && n[a]) && -1 === a.indexOf("Origin") && ("number" != typeof s && "string" != typeof s || (l[a] = "auto" !== s || "left" !== a && "top" !== a ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[a] || "" === t[a].replace(b, "") ? s: 0 : te(e, a), void 0 !== h[a] && (o = new _e(h, a, h[a], o))));
            if (r) for (a in r)"className" !== a && (l[a] = r[a]);
            return {
                difs: l,
                firstMPT: o
            }
        },
        ne = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        },
        se = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        ae = function(e, t, i) {
            if ("svg" === (e.nodeName + "").toLowerCase()) return (i || Q(e))[t] || 0;
            if (e.getCTM && $e(e)) return e.getBBox()[t] || 0;
            var r = parseFloat("width" === t ? e.offsetWidth: e.offsetHeight),
            n = ne[t],
            s = n.length;
            for (i = i || Q(e, null); --s > -1;) r -= parseFloat(J(e, "padding" + n[s], i, !0)) || 0,
            r -= parseFloat(J(e, "border" + n[s] + "Width", i, !0)) || 0;
            return r
        },
        oe = function(e, t) {
            if ("contain" === e || "auto" === e || "auto auto" === e) return e + " ";
            null != e && "" !== e || (e = "0 0");
            var i, r = e.split(" "),
            n = -1 !== e.indexOf("left") ? "0%": -1 !== e.indexOf("right") ? "100%": r[0],
            s = -1 !== e.indexOf("top") ? "0%": -1 !== e.indexOf("bottom") ? "100%": r[1];
            if (r.length > 3 && !t) {
                for (r = e.split(", ").join(",").split(","), e = [], i = 0; i < r.length; i++) e.push(oe(r[i]));
                return e.join(",")
            }
            return null == s ? s = "center" === n ? "50%": "0": "center" === s && (s = "50%"),
            ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"),
            e = n + " " + s + (r.length > 2 ? " " + r[2] : ""),
            t && (t.oxp = -1 !== n.indexOf("%"), t.oyp = -1 !== s.indexOf("%"), t.oxr = "=" === n.charAt(1), t.oyr = "=" === s.charAt(1), t.ox = parseFloat(n.replace(b, "")), t.oy = parseFloat(s.replace(b, "")), t.v = e),
            t || e
        },
        le = function(e, t) {
            return "function" == typeof e && (e = e(v, g)),
            "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t) || 0
        },
        he = function(e, t) {
            return "function" == typeof e && (e = e(v, g)),
            null == e ? t: "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t: parseFloat(e) || 0
        },
        de = function(e, t, i, r) {
            var n, s, a, o, l;
            return "function" == typeof e && (e = e(v, g)),
            null == e ? o = t: "number" == typeof e ? o = e: (n = 360, s = e.split("_"), a = ((l = "=" === e.charAt(1)) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * ( - 1 === e.indexOf("rad") ? 1 : X) - (l ? 0 : t), s.length && (r && (r[i] = t + a), -1 !== e.indexOf("short") && (a %= n) !== a % (n / 2) && (a = a < 0 ? a + n: a - n), -1 !== e.indexOf("_cw") && a < 0 ? a = (a + 9999999999 * n) % n - (a / n | 0) * n: -1 !== e.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * n) % n - (a / n | 0) * n)), o = t + a),
            o < 1e-6 && o > -1e-6 && (o = 0),
            o
        },
        ce = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        },
        ue = function(e, t, i) {
            return 255 * (6 * (e = e < 0 ? e + 1 : e > 1 ? e - 1 : e) < 1 ? t + (i - t) * e * 6 : e < .5 ? i: 3 * e < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) + .5 | 0
        },
        pe = a.parseColor = function(e, t) {
            var i, r, n, s, a, o, l, h, d, c, u;
            if (e) if ("number" == typeof e) i = [e >> 16, e >> 8 & 255, 255 & e];
            else {
                if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), ce[e]) i = ce[e];
                else if ("#" === e.charAt(0)) 4 === e.length && (e = "#" + (r = e.charAt(1)) + r + (n = e.charAt(2)) + n + (s = e.charAt(3)) + s),
                i = [(e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & 255, 255 & e];
                else if ("hsl" === e.substr(0, 3)) if (i = u = e.match(_), t) {
                    if ( - 1 !== e.indexOf("=")) return e.match(y)
                } else a = Number(i[0]) % 360 / 360,
                o = Number(i[1]) / 100,
                r = 2 * (l = Number(i[2]) / 100) - (n = l <= .5 ? l * (o + 1) : l + o - l * o),
                i.length > 3 && (i[3] = Number(i[3])),
                i[0] = ue(a + 1 / 3, r, n),
                i[1] = ue(a, r, n),
                i[2] = ue(a - 1 / 3, r, n);
                else i = e.match(_) || ce.transparent;
                i[0] = Number(i[0]),
                i[1] = Number(i[1]),
                i[2] = Number(i[2]),
                i.length > 3 && (i[3] = Number(i[3]))
            } else i = ce.black;
            return t && !u && (r = i[0] / 255, n = i[1] / 255, s = i[2] / 255, l = ((h = Math.max(r, n, s)) + (d = Math.min(r, n, s))) / 2, h === d ? a = o = 0 : (c = h - d, o = l > .5 ? c / (2 - h - d) : c / (h + d), a = h === r ? (n - s) / c + (n < s ? 6 : 0) : h === n ? (s - r) / c + 2 : (r - n) / c + 4, a *= 60), i[0] = a + .5 | 0, i[1] = 100 * o + .5 | 0, i[2] = 100 * l + .5 | 0),
            i
        },
        fe = function(e, t) {
            var i, r, n, s = e.match(me) || [],
            a = 0,
            o = "";
            if (!s.length) return e;
            for (i = 0; i < s.length; i++) r = s[i],
            a += (n = e.substr(a, e.indexOf(r, a) - a)).length + r.length,
            3 === (r = pe(r, t)).length && r.push(1),
            o += n + (t ? "hsla(" + r[0] + "," + r[1] + "%," + r[2] + "%," + r[3] : "rgba(" + r.join(",")) + ")";
            return o + e.substr(a)
        },
        me = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (h in ce) me += "|" + h + "\\b";
        me = new RegExp(me + ")", "gi"),
        a.colorStringFilter = function(e) {
            var t, i = e[0] + " " + e[1];
            me.test(i) && (t = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), e[0] = fe(e[0], t), e[1] = fe(e[1], t)),
            me.lastIndex = 0
        },
        t.defaultStringFilter || (t.defaultStringFilter = a.colorStringFilter);
        var ge = function(e, t, i, r) {
            if (null == e) return function(e) {
                return e
            };
            var n, s = t ? (e.match(me) || [""])[0] : "",
            a = e.split(s).join("").match(w) || [],
            o = e.substr(0, e.indexOf(a[0])),
            l = ")" === e.charAt(e.length - 1) ? ")": "",
            h = -1 !== e.indexOf(" ") ? " ": ",",
            d = a.length,
            c = d > 0 ? a[0].replace(_, "") : "";
            return d ? n = t ?
            function(e) {
                var t, u, p, f;
                if ("number" == typeof e) e += c;
                else if (r && D.test(e)) {
                    for (f = e.replace(D, "|").split("|"), p = 0; p < f.length; p++) f[p] = n(f[p]);
                    return f.join(",")
                }
                if (t = (e.match(me) || [s])[0], u = e.split(t).join("").match(w) || [], p = u.length, d > p--) for (; ++p < d;) u[p] = i ? u[(p - 1) / 2 | 0] : a[p];
                return o + u.join(h) + h + t + l + ( - 1 !== e.indexOf("inset") ? " inset": "")
            }: function(e) {
                var t, s, u;
                if ("number" == typeof e) e += c;
                else if (r && D.test(e)) {
                    for (s = e.replace(D, "|").split("|"), u = 0; u < s.length; u++) s[u] = n(s[u]);
                    return s.join(",")
                }
                if (t = e.match(w) || [], u = t.length, d > u--) for (; ++u < d;) t[u] = i ? t[(u - 1) / 2 | 0] : a[u];
                return o + t.join(h) + l
            }: function(e) {
                return e
            }
        },
        ve = function(e) {
            return e = e.split(","),
            function(t, i, r, n, s, a, o) {
                var l, h = (i + "").split(" ");
                for (o = {},
                l = 0; l < 4; l++) o[e[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                return n.parse(t, o, s, a)
            }
        },
        _e = (G._setPluginRatio = function(e) {
            this.plugin.setRatio(e);
            for (var t, i, r, n, s, a = this.data,
            o = a.proxy,
            l = a.firstMPT; l;) t = o[l.v],
            l.r ? t = Math.round(t) : t < 1e-6 && t > -1e-6 && (t = 0),
            l.t[l.p] = t,
            l = l._next;
            if (a.autoRotate && (a.autoRotate.rotation = a.mod ? a.mod(o.rotation, this.t) : o.rotation), 1 === e || 0 === e) for (l = a.firstMPT, s = 1 === e ? "e": "b"; l;) {
                if ((i = l.t).type) {
                    if (1 === i.type) {
                        for (n = i.xs0 + i.s + i.xs1, r = 1; r < i.l; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                        i[s] = n
                    }
                } else i[s] = i.s + i.xs0;
                l = l._next
            }
        },
        function(e, t, i, r, n) {
            this.t = e,
            this.p = t,
            this.v = i,
            this.r = n,
            r && (r._prev = this, this._next = r)
        }),
        ye = (G._parseToProxy = function(e, t, i, r, n, s) {
            var a, o, l, h, d, c = r,
            u = {},
            p = {},
            f = i._transform,
            m = N;
            for (i._transform = null, N = t, r = d = i.parse(e, t, r, n), N = m, s && (i._transform = f, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c;) {
                if (r.type <= 1 && (o = r.p, p[o] = r.s + r.c, u[o] = r.s, s || (h = new _e(r, "s", o, h, r.r), r.c = 0), 1 === r.type)) for (a = r.l; --a > 0;) l = "xn" + a,
                p[o = r.p + "_" + l] = r.data[l],
                u[o] = r[l],
                s || (h = new _e(r, l, o, h, r.rxp[l]));
                r = r._next
            }
            return {
                proxy: u,
                end: p,
                firstMPT: h,
                pt: d
            }
        },
        G.CSSPropTween = function(e, t, r, n, a, o, l, h, d, c, u) {
            this.t = e,
            this.p = t,
            this.s = r,
            this.c = n,
            this.n = l || t,
            e instanceof ye || s.push(this.n),
            this.r = h,
            this.type = o || 0,
            d && (this.pr = d, i = !0),
            this.b = void 0 === c ? r: c,
            this.e = void 0 === u ? r + n: u,
            a && (this._next = a, a._prev = this)
        }),
        we = function(e, t, i, r, n, s) {
            var a = new ye(e, t, i, r - i, n, -1, s);
            return a.b = i,
            a.e = a.xs0 = r,
            a
        },
        be = a.parseComplex = function(e, t, i, r, n, s, o, l, h, c) {
            i = i || s || "",
            "function" == typeof r && (r = r(v, g)),
            o = new ye(e, t, 0, 0, o, c ? 2 : 1, null, !1, l, i, r),
            r += "",
            n && me.test(r + i) && (r = [i, r], a.colorStringFilter(r), i = r[0], r = r[1]);
            var u, p, f, m, w, b, x, T, S, C, E, P, k, M = i.split(", ").join(",").split(" "),
            O = r.split(", ").join(",").split(" "),
            z = M.length,
            A = !1 !== d;
            for ( - 1 === r.indexOf(",") && -1 === i.indexOf(",") || ( - 1 !== (r + i).indexOf("rgb") || -1 !== (r + i).indexOf("hsl") ? (M = M.join(" ").replace(D, ", ").split(" "), O = O.join(" ").replace(D, ", ").split(" ")) : (M = M.join(" ").split(",").join(", ").split(" "), O = O.join(" ").split(",").join(", ").split(" ")), z = M.length), z !== O.length && (z = (M = (s || "").split(" ")).length), o.plugin = h, o.setRatio = c, me.lastIndex = 0, u = 0; u < z; u++) if (m = M[u], w = O[u], (T = parseFloat(m)) || 0 === T) o.appendXtra("", T, le(w, T), w.replace(y, ""), A && -1 !== w.indexOf("px"), !0);
            else if (n && me.test(m)) P = ")" + ((P = w.indexOf(")") + 1) ? w.substr(P) : ""),
            k = -1 !== w.indexOf("hsl") && V,
            C = w,
            m = pe(m, k),
            w = pe(w, k),
            (S = m.length + w.length > 6) && !V && 0 === w[3] ? (o["xs" + o.l] += o.l ? " transparent": "transparent", o.e = o.e.split(O[u]).join("transparent")) : (V || (S = !1), k ? o.appendXtra(C.substr(0, C.indexOf("hsl")) + (S ? "hsla(": "hsl("), m[0], le(w[0], m[0]), ",", !1, !0).appendXtra("", m[1], le(w[1], m[1]), "%,", !1).appendXtra("", m[2], le(w[2], m[2]), S ? "%,": "%" + P, !1) : o.appendXtra(C.substr(0, C.indexOf("rgb")) + (S ? "rgba(": "rgb("), m[0], w[0] - m[0], ",", !0, !0).appendXtra("", m[1], w[1] - m[1], ",", !0).appendXtra("", m[2], w[2] - m[2], S ? ",": P, !0), S && (m = m.length < 4 ? 1 : m[3], o.appendXtra("", m, (w.length < 4 ? 1 : w[3]) - m, P, !1))),
            me.lastIndex = 0;
            else if (b = m.match(_)) {
                if (! (x = w.match(y)) || x.length !== b.length) return o;
                for (f = 0, p = 0; p < b.length; p++) E = b[p],
                C = m.indexOf(E, f),
                o.appendXtra(m.substr(f, C - f), Number(E), le(x[p], E), "", A && "px" === m.substr(C + E.length, 2), 0 === p),
                f = C + E.length;
                o["xs" + o.l] += m.substr(f)
            } else o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + w: w;
            if ( - 1 !== r.indexOf("=") && o.data) {
                for (P = o.xs0 + o.data.s, u = 1; u < o.l; u++) P += o["xs" + u] + o.data["xn" + u];
                o.e = P + o["xs" + u]
            }
            return o.l || (o.type = -1, o.xs0 = o.e),
            o.xfirst || o
        },
        xe = 9;
        for ((h = ye.prototype).l = h.pr = 0; --xe > 0;) h["xn" + xe] = 0,
        h["xs" + xe] = "";
        h.xs0 = "",
        h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null,
        h.appendXtra = function(e, t, i, r, n, s) {
            var a = this,
            o = a.l;
            return a["xs" + o] += s && (o || a["xs" + o]) ? " " + e: e || "",
            i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = r || "", o > 0 ? (a.data["xn" + o] = t + i, a.rxp["xn" + o] = n, a["xn" + o] = t, a.plugin || (a.xfirst = new ye(a, "xn" + o, t, i, a.xfirst || a, 0, a.n, n, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                s: t + i
            },
            a.rxp = {},
            a.s = t, a.c = i, a.r = n, a)) : (a["xs" + o] += t + (r || ""), a)
        };
        var Te = function(e, t) {
            t = t || {},
            this.p = t.prefix ? Z(e) || e: e,
            l[e] = l[this.p] = this,
            this.format = t.formatter || ge(t.defaultValue, t.color, t.collapsible, t.multi),
            t.parser && (this.parse = t.parser),
            this.clrs = t.color,
            this.multi = t.multi,
            this.keyword = t.keyword,
            this.dflt = t.defaultValue,
            this.pr = t.priority || 0
        },
        Se = G._registerComplexSpecialProp = function(e, t, i) {
            "object" != typeof t && (t = {
                parser: i
            });
            var r, n = e.split(","),
            s = t.defaultValue;
            for (i = i || [s], r = 0; r < n.length; r++) t.prefix = 0 === r && t.prefix,
            t.defaultValue = i[r] || s,
            new Te(n[r], t)
        },
        Ce = G._registerPluginProp = function(e) {
            if (!l[e]) {
                var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                Se(e, {
                    parser: function(e, i, r, n, s, a, h) {
                        var d = o.com.greensock.plugins[t];
                        return d ? (d._cssRegister(), l[r].parse(e, i, r, n, s, a, h)) : (W("Error: " + t + " js file not loaded."), s)
                    }
                })
            }
        }; (h = Te.prototype).parseComplex = function(e, t, i, r, n, s) {
            var a, o, l, h, d, c, u = this.keyword;
            if (this.multi && (D.test(i) || D.test(t) ? (o = t.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : u && (o = [t], l = [i])), l) {
                for (h = l.length > o.length ? l.length: o.length, a = 0; a < h; a++) t = o[a] = o[a] || this.dflt,
                i = l[a] = l[a] || this.dflt,
                u && (d = t.indexOf(u)) !== (c = i.indexOf(u)) && ( - 1 === c ? o[a] = o[a].split(u).join("") : -1 === d && (o[a] += " " + u));
                t = o.join(", "),
                i = l.join(", ")
            }
            return be(e, this.p, t, i, this.clrs, this.dflt, r, this.pr, n, s)
        },
        h.parse = function(e, t, i, r, s, a, o) {
            return this.parseComplex(e.style, this.format(J(e, this.p, n, !1, this.dflt)), this.format(t), s, a)
        },
        a.registerSpecialProp = function(e, t, i) {
            Se(e, {
                parser: function(e, r, n, s, a, o, l) {
                    var h = new ye(e, n, 0, 0, a, 2, n, !1, i);
                    return h.plugin = o,
                    h.setRatio = t(e, r, s._tween, n),
                    h
                },
                priority: i
            })
        },
        a.useSVGTransformAttr = !0;
        var Ee, Pe = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
        ke = Z("transform"),
        Me = U + "transform",
        Oe = Z("transformOrigin"),
        ze = null !== Z("perspective"),
        Ae = G.Transform = function() {
            this.perspective = parseFloat(a.defaultTransformPerspective) || 0,
            this.force3D = !(!1 === a.defaultForce3D || !ze) && (a.defaultForce3D || "auto")
        },
        Le = _gsScope.SVGElement,
        De = function(e, t, i) {
            var r, n = F.createElementNS("http://www.w3.org/2000/svg", e),
            s = /([a-z])([A-Z])/g;
            for (r in i) n.setAttributeNS(null, r.replace(s, "$1-$2").toLowerCase(), i[r]);
            return t.appendChild(n),
            n
        },
        Re = F.documentElement || {},
        Ie = function() {
            var e, t, i, r = m || /Android/i.test(j) && !_gsScope.chrome;
            return F.createElementNS && !r && (e = De("svg", Re), i = (t = De("rect", e, {
                width: 100,
                height: 50,
                x: 100
            })).getBoundingClientRect().width, t.style[Oe] = "50% 50%", t.style[ke] = "scaleX(0.5)", r = i === t.getBoundingClientRect().width && !(p && ze), Re.removeChild(e)),
            r
        } (),
        Xe = function(e, t, i, r, n, s) {
            var o, l, h, d, c, u, p, f, m, g, v, _, y, w, b = e._gsTransform,
            x = Be(e, !0);
            b && (y = b.xOrigin, w = b.yOrigin),
            (!r || (o = r.split(" ")).length < 2) && (0 === (p = e.getBBox()).x && 0 === p.y && p.width + p.height === 0 && (p = {
                x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
                y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
                width: 0,
                height: 0
            }), o = [( - 1 !== (t = oe(t).split(" "))[0].indexOf("%") ? parseFloat(t[0]) / 100 * p.width: parseFloat(t[0])) + p.x, ( - 1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * p.height: parseFloat(t[1])) + p.y]),
            i.xOrigin = d = parseFloat(o[0]),
            i.yOrigin = c = parseFloat(o[1]),
            r && x !== Fe && (u = x[0], p = x[1], f = x[2], m = x[3], g = x[4], v = x[5], (_ = u * m - p * f) && (l = d * (m / _) + c * ( - f / _) + (f * v - m * g) / _, h = d * ( - p / _) + c * (u / _) - (u * v - p * g) / _, d = i.xOrigin = o[0] = l, c = i.yOrigin = o[1] = h)),
            b && (s && (i.xOffset = b.xOffset, i.yOffset = b.yOffset, b = i), n || !1 !== n && !1 !== a.defaultSmoothOrigin ? (l = d - y, h = c - w, b.xOffset += l * x[0] + h * x[2] - l, b.yOffset += l * x[1] + h * x[3] - h) : b.xOffset = b.yOffset = 0),
            s || e.setAttribute("data-svg-origin", o.join(" "))
        },
        Ne = function(e) {
            var t, i = B("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
            r = this.parentNode,
            n = this.nextSibling,
            s = this.style.cssText;
            if (Re.appendChild(i), i.appendChild(this), this.style.display = "block", e) try {
                t = this.getBBox(),
                this._originalGetBBox = this.getBBox,
                this.getBBox = Ne
            } catch(e) {} else this._originalGetBBox && (t = this._originalGetBBox());
            return n ? r.insertBefore(this, n) : r.appendChild(this),
            Re.removeChild(i),
            this.style.cssText = s,
            t
        },
        $e = function(e) {
            return ! (!Le || !e.getCTM || e.parentNode && !e.ownerSVGElement || !
            function(e) {
                try {
                    return e.getBBox()
                } catch(t) {
                    return Ne.call(e, !0)
                }
            } (e))
        },
        Fe = [1, 0, 0, 1, 0, 0],
        Be = function(e, t) {
            var i, r, n, s, a, o, l = e._gsTransform || new Ae,
            h = e.style;
            if (ke ? r = J(e, Me, null, !0) : e.currentStyle && (r = (r = e.currentStyle.filter.match(A)) && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, !ke || !(o = !Q(e) || "none" === Q(e).display) && e.parentNode || (o && (s = h.display, h.display = "block"), e.parentNode || (a = 1, Re.appendChild(e)), i = !(r = J(e, Me, null, !0)) || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, s ? h.display = s: o && je(h, "display"), a && Re.removeChild(e)), (l.svg || e.getCTM && $e(e)) && (i && -1 !== (h[ke] + "").indexOf("matrix") && (r = h[ke], i = 0), n = e.getAttribute("transform"), i && n && ( - 1 !== n.indexOf("matrix") ? (r = n, i = 0) : -1 !== n.indexOf("translate") && (r = "matrix(1,0,0,1," + n.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Fe;
            for (n = (r || "").match(_) || [], xe = n.length; --xe > -1;) s = Number(n[xe]),
            n[xe] = (a = s - (s |= 0)) ? (1e5 * a + (a < 0 ? -.5 : .5) | 0) / 1e5 + s: s;
            return t && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n
        },
        Ye = G.getTransform = function(e, i, r, n) {
            if (e._gsTransform && r && !n) return e._gsTransform;
            var s, o, l, h, d, c, u = r ? e._gsTransform || new Ae: new Ae,
            p = u.scaleX < 0,
            f = ze ? parseFloat(J(e, Oe, i, !1, "0 0 0").split(" ")[2]) || u.zOrigin || 0 : 0,
            m = parseFloat(a.defaultTransformPerspective) || 0;
            if (u.svg = !(!e.getCTM || !$e(e)), u.svg && (Xe(e, J(e, Oe, i, !1, "50% 50%") + "", u, e.getAttribute("data-svg-origin")), Ee = a.useSVGTransformAttr || Ie), (s = Be(e)) !== Fe) {
                if (16 === s.length) {
                    var g, v, _, y, w, b = s[0],
                    x = s[1],
                    T = s[2],
                    S = s[3],
                    C = s[4],
                    E = s[5],
                    P = s[6],
                    k = s[7],
                    M = s[8],
                    O = s[9],
                    z = s[10],
                    A = s[12],
                    L = s[13],
                    D = s[14],
                    R = s[11],
                    I = Math.atan2(P, z);
                    u.zOrigin && (A = M * (D = -u.zOrigin) - s[12], L = O * D - s[13], D = z * D + u.zOrigin - s[14]),
                    u.rotationX = I * X,
                    I && (g = C * (y = Math.cos( - I)) + M * (w = Math.sin( - I)), v = E * y + O * w, _ = P * y + z * w, M = C * -w + M * y, O = E * -w + O * y, z = P * -w + z * y, R = k * -w + R * y, C = g, E = v, P = _),
                    I = Math.atan2( - T, z),
                    u.rotationY = I * X,
                    I && (v = x * (y = Math.cos( - I)) - O * (w = Math.sin( - I)), _ = T * y - z * w, O = x * w + O * y, z = T * w + z * y, R = S * w + R * y, b = g = b * y - M * w, x = v, T = _),
                    I = Math.atan2(x, b),
                    u.rotation = I * X,
                    I && (g = b * (y = Math.cos(I)) + x * (w = Math.sin(I)), v = C * y + E * w, _ = M * y + O * w, x = x * y - b * w, E = E * y - C * w, O = O * y - M * w, b = g, C = v, M = _),
                    u.rotationX && Math.abs(u.rotationX) + Math.abs(u.rotation) > 359.9 && (u.rotationX = u.rotation = 0, u.rotationY = 180 - u.rotationY),
                    I = Math.atan2(C, E),
                    u.scaleX = (1e5 * Math.sqrt(b * b + x * x + T * T) + .5 | 0) / 1e5,
                    u.scaleY = (1e5 * Math.sqrt(E * E + P * P) + .5 | 0) / 1e5,
                    u.scaleZ = (1e5 * Math.sqrt(M * M + O * O + z * z) + .5 | 0) / 1e5,
                    b /= u.scaleX,
                    C /= u.scaleY,
                    x /= u.scaleX,
                    E /= u.scaleY,
                    Math.abs(I) > 2e-5 ? (u.skewX = I * X, C = 0, "simple" !== u.skewType && (u.scaleY *= 1 / Math.cos(I))) : u.skewX = 0,
                    u.perspective = R ? 1 / (R < 0 ? -R: R) : 0,
                    u.x = A,
                    u.y = L,
                    u.z = D,
                    u.svg && (u.x -= u.xOrigin - (u.xOrigin * b - u.yOrigin * C), u.y -= u.yOrigin - (u.yOrigin * x - u.xOrigin * E))
                } else if (!ze || n || !s.length || u.x !== s[4] || u.y !== s[5] || !u.rotationX && !u.rotationY) {
                    var N = s.length >= 6,
                    $ = N ? s[0] : 1,
                    F = s[1] || 0,
                    B = s[2] || 0,
                    Y = N ? s[3] : 1;
                    u.x = s[4] || 0,
                    u.y = s[5] || 0,
                    l = Math.sqrt($ * $ + F * F),
                    h = Math.sqrt(Y * Y + B * B),
                    d = $ || F ? Math.atan2(F, $) * X: u.rotation || 0,
                    c = B || Y ? Math.atan2(B, Y) * X + d: u.skewX || 0,
                    u.scaleX = l,
                    u.scaleY = h,
                    u.rotation = d,
                    u.skewX = c,
                    ze && (u.rotationX = u.rotationY = u.z = 0, u.perspective = m, u.scaleZ = 1),
                    u.svg && (u.x -= u.xOrigin - (u.xOrigin * $ + u.yOrigin * B), u.y -= u.yOrigin - (u.xOrigin * F + u.yOrigin * Y))
                }
                Math.abs(u.skewX) > 90 && Math.abs(u.skewX) < 270 && (p ? (u.scaleX *= -1, u.skewX += u.rotation <= 0 ? 180 : -180, u.rotation += u.rotation <= 0 ? 180 : -180) : (u.scaleY *= -1, u.skewX += u.skewX <= 0 ? 180 : -180)),
                u.zOrigin = f;
                for (o in u) u[o] < 2e-5 && u[o] > -2e-5 && (u[o] = 0)
            }
            return r && (e._gsTransform = u, u.svg && (Ee && e.style[ke] ? t.delayedCall(.001,
            function() {
                je(e.style, ke)
            }) : !Ee && e.getAttribute("transform") && t.delayedCall(.001,
            function() {
                e.removeAttribute("transform")
            }))),
            u
        },
        He = G.set3DTransformRatio = G.setTransformRatio = function(e) {
            var t, i, r, n, s, a, o, l, h, d, c, u, f, m, g, v, _, y, w, b, x, T = this.data,
            S = this.t.style,
            C = T.rotation,
            E = T.rotationX,
            P = T.rotationY,
            k = T.scaleX,
            M = T.scaleY,
            O = T.scaleZ,
            z = T.x,
            A = T.y,
            L = T.z,
            D = T.svg,
            R = T.perspective,
            X = T.force3D,
            N = T.skewY,
            $ = T.skewX;
            if (N && ($ += N, C += N), !((1 !== e && 0 !== e || "auto" !== X || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && X || L || R || P || E || 1 !== O) || Ee && D || !ze) C || $ || D ? (C *= I, b = $ * I, x = 1e5, i = Math.cos(C) * k, s = Math.sin(C) * k, r = Math.sin(C - b) * -M, a = Math.cos(C - b) * M, b && "simple" === T.skewType && (t = Math.tan(b - N * I), r *= t = Math.sqrt(1 + t * t), a *= t, N && (t = Math.tan(N * I), i *= t = Math.sqrt(1 + t * t), s *= t)), D && (z += T.xOrigin - (T.xOrigin * i + T.yOrigin * r) + T.xOffset, A += T.yOrigin - (T.xOrigin * s + T.yOrigin * a) + T.yOffset, Ee && (T.xPercent || T.yPercent) && (g = this.t.getBBox(), z += .01 * T.xPercent * g.width, A += .01 * T.yPercent * g.height), z < (g = 1e-6) && z > -g && (z = 0), A < g && A > -g && (A = 0)), w = (i * x | 0) / x + "," + (s * x | 0) / x + "," + (r * x | 0) / x + "," + (a * x | 0) / x + "," + z + "," + A + ")", D && Ee ? this.t.setAttribute("transform", "matrix(" + w) : S[ke] = (T.xPercent || T.yPercent ? "translate(" + T.xPercent + "%," + T.yPercent + "%) matrix(": "matrix(") + w) : S[ke] = (T.xPercent || T.yPercent ? "translate(" + T.xPercent + "%," + T.yPercent + "%) matrix(": "matrix(") + k + ",0,0," + M + "," + z + "," + A + ")";
            else {
                if (p && (k < (g = 1e-4) && k > -g && (k = O = 2e-5), M < g && M > -g && (M = O = 2e-5), !R || T.z || T.rotationX || T.rotationY || (R = 0)), C || $) C *= I,
                v = i = Math.cos(C),
                _ = s = Math.sin(C),
                $ && (C -= $ * I, v = Math.cos(C), _ = Math.sin(C), "simple" === T.skewType && (t = Math.tan(($ - N) * I), v *= t = Math.sqrt(1 + t * t), _ *= t, T.skewY && (t = Math.tan(N * I), i *= t = Math.sqrt(1 + t * t), s *= t))),
                r = -_,
                a = v;
                else {
                    if (! (P || E || 1 !== O || R || D)) return void(S[ke] = (T.xPercent || T.yPercent ? "translate(" + T.xPercent + "%," + T.yPercent + "%) translate3d(": "translate3d(") + z + "px," + A + "px," + L + "px)" + (1 !== k || 1 !== M ? " scale(" + k + "," + M + ")": ""));
                    i = a = 1,
                    r = s = 0
                }
                d = 1,
                n = o = l = h = c = u = 0,
                f = R ? -1 / R: 0,
                m = T.zOrigin,
                g = 1e-6,
                ",",
                "0",
                (C = P * I) && (v = Math.cos(C), l = -(_ = Math.sin(C)), c = f * -_, n = i * _, o = s * _, d = v, f *= v, i *= v, s *= v),
                (C = E * I) && (t = r * (v = Math.cos(C)) + n * (_ = Math.sin(C)), y = a * v + o * _, h = d * _, u = f * _, n = r * -_ + n * v, o = a * -_ + o * v, d *= v, f *= v, r = t, a = y),
                1 !== O && (n *= O, o *= O, d *= O, f *= O),
                1 !== M && (r *= M, a *= M, h *= M, u *= M),
                1 !== k && (i *= k, s *= k, l *= k, c *= k),
                (m || D) && (m && (z += n * -m, A += o * -m, L += d * -m + m), D && (z += T.xOrigin - (T.xOrigin * i + T.yOrigin * r) + T.xOffset, A += T.yOrigin - (T.xOrigin * s + T.yOrigin * a) + T.yOffset), z < g && z > -g && (z = "0"), A < g && A > -g && (A = "0"), L < g && L > -g && (L = 0)),
                w = T.xPercent || T.yPercent ? "translate(" + T.xPercent + "%," + T.yPercent + "%) matrix3d(": "matrix3d(",
                w += (i < g && i > -g ? "0": i) + "," + (s < g && s > -g ? "0": s) + "," + (l < g && l > -g ? "0": l),
                w += "," + (c < g && c > -g ? "0": c) + "," + (r < g && r > -g ? "0": r) + "," + (a < g && a > -g ? "0": a),
                E || P || 1 !== O ? (w += "," + (h < g && h > -g ? "0": h) + "," + (u < g && u > -g ? "0": u) + "," + (n < g && n > -g ? "0": n), w += "," + (o < g && o > -g ? "0": o) + "," + (d < g && d > -g ? "0": d) + "," + (f < g && f > -g ? "0": f) + ",") : w += ",0,0,0,0,1,0,",
                w += z + "," + A + "," + L + "," + (R ? 1 + -L / R: 1) + ")",
                S[ke] = w
            }
        }; (h = Ae.prototype).x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0,
        h.scaleX = h.scaleY = h.scaleZ = 1,
        Se("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function(e, t, i, r, s, o, l) {
                if (r._lastParsedTransform === l) return s;
                r._lastParsedTransform = l;
                var h, d = l.scale && "function" == typeof l.scale ? l.scale: 0;
                "function" == typeof l[i] && (h = l[i], l[i] = t),
                d && (l.scale = d(v, e));
                var c, u, p, f, m, _, y, w, b, x = e._gsTransform,
                T = e.style,
                S = Pe.length,
                C = l,
                E = {},
                P = Ye(e, n, !0, C.parseTransform),
                k = C.transform && ("function" == typeof C.transform ? C.transform(v, g) : C.transform);
                if (P.skewType = C.skewType || P.skewType || a.defaultSkewType, r._transform = P, k && "string" == typeof k && ke)(u = Y.style)[ke] = k,
                u.display = "block",
                u.position = "absolute",
                F.body.appendChild(Y),
                c = Ye(Y, null, !1),
                "simple" === P.skewType && (c.scaleY *= Math.cos(c.skewX * I)),
                P.svg && (_ = P.xOrigin, y = P.yOrigin, c.x -= P.xOffset, c.y -= P.yOffset, (C.transformOrigin || C.svgOrigin) && (k = {},
                Xe(e, oe(C.transformOrigin), k, C.svgOrigin, C.smoothOrigin, !0), _ = k.xOrigin, y = k.yOrigin, c.x -= k.xOffset - P.xOffset, c.y -= k.yOffset - P.yOffset), (_ || y) && (w = Be(Y, !0), c.x -= _ - (_ * w[0] + y * w[2]), c.y -= y - (_ * w[1] + y * w[3]))),
                F.body.removeChild(Y),
                c.perspective || (c.perspective = P.perspective),
                null != C.xPercent && (c.xPercent = he(C.xPercent, P.xPercent)),
                null != C.yPercent && (c.yPercent = he(C.yPercent, P.yPercent));
                else if ("object" == typeof C) {
                    if (c = {
                        scaleX: he(null != C.scaleX ? C.scaleX: C.scale, P.scaleX),
                        scaleY: he(null != C.scaleY ? C.scaleY: C.scale, P.scaleY),
                        scaleZ: he(C.scaleZ, P.scaleZ),
                        x: he(C.x, P.x),
                        y: he(C.y, P.y),
                        z: he(C.z, P.z),
                        xPercent: he(C.xPercent, P.xPercent),
                        yPercent: he(C.yPercent, P.yPercent),
                        perspective: he(C.transformPerspective, P.perspective)
                    },
                    null != (m = C.directionalRotation)) if ("object" == typeof m) for (u in m) C[u] = m[u];
                    else C.rotation = m;
                    "string" == typeof C.x && -1 !== C.x.indexOf("%") && (c.x = 0, c.xPercent = he(C.x, P.xPercent)),
                    "string" == typeof C.y && -1 !== C.y.indexOf("%") && (c.y = 0, c.yPercent = he(C.y, P.yPercent)),
                    c.rotation = de("rotation" in C ? C.rotation: "shortRotation" in C ? C.shortRotation + "_short": "rotationZ" in C ? C.rotationZ: P.rotation, P.rotation, "rotation", E),
                    ze && (c.rotationX = de("rotationX" in C ? C.rotationX: "shortRotationX" in C ? C.shortRotationX + "_short": P.rotationX || 0, P.rotationX, "rotationX", E), c.rotationY = de("rotationY" in C ? C.rotationY: "shortRotationY" in C ? C.shortRotationY + "_short": P.rotationY || 0, P.rotationY, "rotationY", E)),
                    c.skewX = de(C.skewX, P.skewX),
                    c.skewY = de(C.skewY, P.skewY)
                }
                for (ze && null != C.force3D && (P.force3D = C.force3D, f = !0), (p = P.force3D || P.z || P.rotationX || P.rotationY || c.z || c.rotationX || c.rotationY || c.perspective) || null == C.scale || (c.scaleZ = 1); --S > -1;)((k = c[b = Pe[S]] - P[b]) > 1e-6 || k < -1e-6 || null != C[b] || null != N[b]) && (f = !0, s = new ye(P, b, P[b], k, s), b in E && (s.e = E[b]), s.xs0 = 0, s.plugin = o, r._overwriteProps.push(s.n));
                return k = C.transformOrigin,
                P.svg && (k || C.svgOrigin) && (_ = P.xOffset, y = P.yOffset, Xe(e, oe(k), c, C.svgOrigin, C.smoothOrigin), s = we(P, "xOrigin", (x ? P: c).xOrigin, c.xOrigin, s, "transformOrigin"), s = we(P, "yOrigin", (x ? P: c).yOrigin, c.yOrigin, s, "transformOrigin"), _ === P.xOffset && y === P.yOffset || (s = we(P, "xOffset", x ? _: P.xOffset, P.xOffset, s, "transformOrigin"), s = we(P, "yOffset", x ? y: P.yOffset, P.yOffset, s, "transformOrigin")), k = "0px 0px"),
                (k || ze && p && P.zOrigin) && (ke ? (f = !0, b = Oe, k = (k || J(e, b, n, !1, "50% 50%")) + "", (s = new ye(T, b, 0, 0, s, -1, "transformOrigin")).b = T[b], s.plugin = o, ze ? (u = P.zOrigin, k = k.split(" "), P.zOrigin = (k.length > 2 && (0 === u || "0px" !== k[2]) ? parseFloat(k[2]) : u) || 0, s.xs0 = s.e = k[0] + " " + (k[1] || "50%") + " 0px", (s = new ye(P, "zOrigin", 0, 0, s, -1, s.n)).b = u, s.xs0 = s.e = P.zOrigin) : s.xs0 = s.e = k) : oe(k + "", P)),
                f && (r._transformType = P.svg && Ee || !p && 3 !== this._transformType ? 2 : 3),
                h && (l[i] = h),
                d && (l.scale = d),
                s
            },
            prefix: !0
        }),
        Se("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        Se("borderRadius", {
            defaultValue: "0px",
            parser: function(e, t, i, s, a, o) {
                t = this.format(t);
                var l, h, d, c, u, p, f, m, g, v, _, y, w, b, x, T, S = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                C = e.style;
                for (g = parseFloat(e.offsetWidth), v = parseFloat(e.offsetHeight), l = t.split(" "), h = 0; h < S.length; h++) this.p.indexOf("border") && (S[h] = Z(S[h])),
                -1 !== (u = c = J(e, S[h], n, !1, "0px")).indexOf(" ") && (u = (c = u.split(" "))[0], c = c[1]),
                p = d = l[h],
                f = parseFloat(u),
                y = u.substr((f + "").length),
                (w = "=" === p.charAt(1)) ? (m = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), m *= parseFloat(p), _ = p.substr((m + "").length - (m < 0 ? 1 : 0)) || "") : (m = parseFloat(p), _ = p.substr((m + "").length)),
                "" === _ && (_ = r[i] || y),
                _ !== y && (b = ee(e, "borderLeft", f, y), x = ee(e, "borderTop", f, y), "%" === _ ? (u = b / g * 100 + "%", c = x / v * 100 + "%") : "em" === _ ? (u = b / (T = ee(e, "borderLeft", 1, "em")) + "em", c = x / T + "em") : (u = b + "px", c = x + "px"), w && (p = parseFloat(u) + m + _, d = parseFloat(c) + m + _)),
                a = be(C, S[h], u + " " + c, p + " " + d, !1, "0px", a);
                return a
            },
            prefix: !0,
            formatter: ge("0px 0px 0px 0px", !1, !0)
        }),
        Se("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function(e, t, i, r, s, a) {
                return be(e.style, i, this.format(J(e, i, n, !1, "0px 0px")), this.format(t), !1, "0px", s)
            },
            prefix: !0,
            formatter: ge("0px 0px", !1, !0)
        }),
        Se("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(e, t, i, r, s, a) {
                var o, l, h, d, c, u, p = "background-position",
                f = n || Q(e, null),
                g = this.format((f ? m ? f.getPropertyValue(p + "-x") + " " + f.getPropertyValue(p + "-y") : f.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                v = this.format(t);
                if ( - 1 !== g.indexOf("%") != ( - 1 !== v.indexOf("%")) && v.split(",").length < 2 && (u = J(e, "backgroundImage").replace(M, "")) && "none" !== u) {
                    for (o = g.split(" "), l = v.split(" "), H.setAttribute("src", u), h = 2; --h > -1;)(d = -1 !== (g = o[h]).indexOf("%")) !== ( - 1 !== l[h].indexOf("%")) && (c = 0 === h ? e.offsetWidth - H.width: e.offsetHeight - H.height, o[h] = d ? parseFloat(g) / 100 * c + "px": parseFloat(g) / c * 100 + "%");
                    g = o.join(" ")
                }
                return this.parseComplex(e.style, g, v, s, a)
            },
            formatter: oe
        }),
        Se("backgroundSize", {
            defaultValue: "0 0",
            formatter: function(e) {
                return e += "",
                oe( - 1 === e.indexOf(" ") ? e + " " + e: e)
            }
        }),
        Se("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        Se("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        Se("transformStyle", {
            prefix: !0
        }),
        Se("backfaceVisibility", {
            prefix: !0
        }),
        Se("userSelect", {
            prefix: !0
        }),
        Se("margin", {
            parser: ve("marginTop,marginRight,marginBottom,marginLeft")
        }),
        Se("padding", {
            parser: ve("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        Se("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(e, t, i, r, s, a) {
                var o, l, h;
                return m < 9 ? (l = e.currentStyle, h = m < 8 ? " ": ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", t = this.format(t).split(",").join(h)) : (o = this.format(J(e, this.p, n, !1, this.dflt)), t = this.format(t)),
                this.parseComplex(e.style, o, t, s, a)
            }
        }),
        Se("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        Se("autoRound,strictUnits", {
            parser: function(e, t, i, r, n) {
                return n
            }
        }),
        Se("border", {
            defaultValue: "0px solid #000",
            parser: function(e, t, i, r, s, a) {
                var o = J(e, "borderTopWidth", n, !1, "0px"),
                l = this.format(t).split(" "),
                h = l[0].replace(x, "");
                return "px" !== h && (o = parseFloat(o) / ee(e, "borderTopWidth", 1, h) + h),
                this.parseComplex(e.style, this.format(o + " " + J(e, "borderTopStyle", n, !1, "solid") + " " + J(e, "borderTopColor", n, !1, "#000")), l.join(" "), s, a)
            },
            color: !0,
            formatter: function(e) {
                var t = e.split(" ");
                return t[0] + " " + (t[1] || "solid") + " " + (e.match(me) || ["#000"])[0]
            }
        }),
        Se("borderWidth", {
            parser: ve("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        Se("float,cssFloat,styleFloat", {
            parser: function(e, t, i, r, n, s) {
                var a = e.style,
                o = "cssFloat" in a ? "cssFloat": "styleFloat";
                return new ye(a, o, 0, 0, n, -1, i, !1, 0, a[o], t)
            }
        });
        var Ge = function(e) {
            var t, i = this.t,
            r = i.filter || J(this.data, "filter") || "",
            n = this.s + this.c * e | 0;
            100 === n && ( - 1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (i.removeAttribute("filter"), t = !J(this.data, "filter")) : (i.filter = r.replace(C, ""), t = !0)),
            t || (this.xn1 && (i.filter = r = r || "alpha(opacity=" + n + ")"), -1 === r.indexOf("pacity") ? 0 === n && this.xn1 || (i.filter = r + " alpha(opacity=" + n + ")") : i.filter = r.replace(T, "opacity=" + n))
        };
        Se("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(e, t, i, r, s, a) {
                var o = parseFloat(J(e, "opacity", n, !1, "1")),
                l = e.style,
                h = "autoAlpha" === i;
                return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + o),
                h && 1 === o && "hidden" === J(e, "visibility", n) && 0 !== t && (o = 0),
                V ? s = new ye(l, "opacity", o, t - o, s) : ((s = new ye(l, "opacity", 100 * o, 100 * (t - o), s)).xn1 = h ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = a, s.setRatio = Ge),
                h && ((s = new ye(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== o ? "inherit": "hidden", 0 === t ? "hidden": "inherit")).xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(i)),
                s
            }
        });
        var je = function(e, t) {
            t && (e.removeProperty ? ("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6) || (t = "-" + t), e.removeProperty(t.replace(P, "-$1").toLowerCase())) : e.removeAttribute(t))
        },
        Ve = function(e) {
            if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                this.t.setAttribute("class", 0 === e ? this.b: this.e);
                for (var t = this.data,
                i = this.t.style; t;) t.v ? i[t.p] = t.v: je(i, t.p),
                t = t._next;
                1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        Se("className", {
            parser: function(e, t, r, s, a, o, l) {
                var h, d, c, u, p, f = e.getAttribute("class") || "",
                m = e.style.cssText;
                if (a = s._classNamePT = new ye(e, r, 0, 0, a, 2), a.setRatio = Ve, a.pr = -11, i = !0, a.b = f, d = ie(e, n), c = e._gsClassPT) {
                    for (u = {},
                    p = c.data; p;) u[p.p] = 1,
                    p = p._next;
                    c.setRatio(1)
                }
                return e._gsClassPT = a,
                a.e = "=" !== t.charAt(1) ? t: f.replace(new RegExp("(?:\\s|^)" + t.substr(2) + "(?![\\w-])"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""),
                e.setAttribute("class", a.e),
                h = re(e, d, ie(e), l, u),
                e.setAttribute("class", f),
                a.data = h.firstMPT,
                e.style.cssText = m,
                a = a.xfirst = s.parse(e, h.difs, a, o)
            }
        });
        var qe = function(e) {
            if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var t, i, r, n, s, a = this.t.style,
                o = l.transform.parse;
                if ("all" === this.e) a.cssText = "",
                n = !0;
                else for (r = (t = this.e.split(" ").join("").split(",")).length; --r > -1;) i = t[r],
                l[i] && (l[i].parse === o ? n = !0 : i = "transformOrigin" === i ? Oe: l[i].p),
                je(a, i);
                n && (je(a, ke), (s = this.t._gsTransform) && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
            }
        };
        for (Se("clearProps", {
            parser: function(e, t, r, n, s) {
                return s = new ye(e, r, 0, 0, s, 2),
                s.setRatio = qe,
                s.e = t,
                s.pr = -10,
                s.data = n._tween,
                i = !0,
                s
            }
        }), h = "bezier,throwProps,physicsProps,physics2D".split(","), xe = h.length; xe--;) Ce(h[xe]); (h = a.prototype)._firstPT = h._lastParsedTransform = h._transform = null,
        h._onInitTween = function(e, t, o, h) {
            if (!e.nodeType) return ! 1;
            this._target = g = e,
            this._tween = o,
            this._vars = t,
            v = h,
            d = t.autoRound,
            i = !1,
            r = t.suffixMap || a.suffixMap,
            n = Q(e, ""),
            s = this._overwriteProps;
            var p, _, y, w, b, C, E, P, k, M = e.style;
            if (c && "" === M.zIndex && ("auto" !== (p = J(e, "zIndex", n)) && "" !== p || this._addLazySet(M, "zIndex", 0)), "string" == typeof t && (w = M.cssText, p = ie(e, n), M.cssText = w + ";" + t, p = re(e, p, ie(e)).difs, !V && S.test(t) && (p.opacity = parseFloat(RegExp.$1)), t = p, M.cssText = w), t.className ? this._firstPT = _ = l.className.parse(e, t.className, "className", this, null, null, t) : this._firstPT = _ = this.parse(e, t, null), this._transformType) {
                for (k = 3 === this._transformType, ke ? u && (c = !0, "" === M.zIndex && ("auto" !== (E = J(e, "zIndex", n)) && "" !== E || this._addLazySet(M, "zIndex", 0)), f && this._addLazySet(M, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (k ? "visible": "hidden"))) : M.zoom = 1, y = _; y && y._next;) y = y._next;
                P = new ye(e, "transform", 0, 0, null, 2),
                this._linkCSSP(P, null, y),
                P.setRatio = ke ? He: function(e) {
                    var t, i, r = this.data,
                    n = -r.rotation * I,
                    s = n + r.skewX * I,
                    a = (Math.cos(n) * r.scaleX * 1e5 | 0) / 1e5,
                    o = (Math.sin(n) * r.scaleX * 1e5 | 0) / 1e5,
                    l = (Math.sin(s) * -r.scaleY * 1e5 | 0) / 1e5,
                    h = (Math.cos(s) * r.scaleY * 1e5 | 0) / 1e5,
                    d = this.t.style,
                    c = this.t.currentStyle;
                    if (c) {
                        i = o,
                        o = -l,
                        l = -i,
                        t = c.filter,
                        d.filter = "";
                        var u, p, f = this.t.offsetWidth,
                        g = this.t.offsetHeight,
                        v = "absolute" !== c.position,
                        _ = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + o + ", M21=" + l + ", M22=" + h,
                        y = r.x + f * r.xPercent / 100,
                        w = r.y + g * r.yPercent / 100;
                        if (null != r.ox && (y += (u = (r.oxp ? f * r.ox * .01 : r.ox) - f / 2) - (u * a + (p = (r.oyp ? g * r.oy * .01 : r.oy) - g / 2) * o), w += p - (u * l + p * h)), _ += v ? ", Dx=" + ((u = f / 2) - (u * a + (p = g / 2) * o) + y) + ", Dy=" + (p - (u * l + p * h) + w) + ")": ", sizingMethod='auto expand')", -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? d.filter = t.replace(L, _) : d.filter = _ + " " + t, 0 !== e && 1 !== e || 1 === a && 0 === o && 0 === l && 1 === h && (v && -1 === _.indexOf("Dx=0, Dy=0") || T.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && d.removeAttribute("filter")), !v) {
                            var b, S, C, E = m < 8 ? 1 : -1;
                            for (u = r.ieOffsetX || 0, p = r.ieOffsetY || 0, r.ieOffsetX = Math.round((f - ((a < 0 ? -a: a) * f + (o < 0 ? -o: o) * g)) / 2 + y), r.ieOffsetY = Math.round((g - ((h < 0 ? -h: h) * g + (l < 0 ? -l: l) * f)) / 2 + w), xe = 0; xe < 4; xe++) C = (i = -1 !== (b = c[S = se[xe]]).indexOf("px") ? parseFloat(b) : ee(this.t, S, parseFloat(b), b.replace(x, "")) || 0) !== r[S] ? xe < 2 ? -r.ieOffsetX: -r.ieOffsetY: xe < 2 ? u - r.ieOffsetX: p - r.ieOffsetY,
                            d[S] = (r[S] = Math.round(i - C * (0 === xe || 2 === xe ? 1 : E))) + "px"
                        }
                    }
                },
                P.data = this._transform || Ye(e, n, !0),
                P.tween = o,
                P.pr = -1,
                s.pop()
            }
            if (i) {
                for (; _;) {
                    for (C = _._next, y = w; y && y.pr > _.pr;) y = y._next; (_._prev = y ? y._prev: b) ? _._prev._next = _: w = _,
                    (_._next = y) ? y._prev = _: b = _,
                    _ = C
                }
                this._firstPT = w
            }
            return ! 0
        },
        h.parse = function(e, t, i, s) {
            var a, o, h, c, u, p, f, m, _, y, w = e.style;
            for (a in t) {
                if ("function" == typeof(p = t[a]) && (p = p(v, g)), o = l[a]) i = o.parse(e, p, a, this, i, s, t);
                else {
                    if ("--" === a.substr(0, 2)) {
                        this._tween._propLookup[a] = this._addTween.call(this._tween, e.style, "setProperty", Q(e).getPropertyValue(a) + "", p + "", a, !1, a);
                        continue
                    }
                    u = J(e, a, n) + "",
                    _ = "string" == typeof p,
                    "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || _ && E.test(p) ? (_ || (p = ((p = pe(p)).length > 3 ? "rgba(": "rgb(") + p.join(",") + ")"), i = be(w, a, u, p, !0, "transparent", i, 0, s)) : _ && R.test(p) ? i = be(w, a, u, p, !0, null, i, 0, s) : (f = (h = parseFloat(u)) || 0 === h ? u.substr((h + "").length) : "", "" !== u && "auto" !== u || ("width" === a || "height" === a ? (h = ae(e, a, n), f = "px") : "left" === a || "top" === a ? (h = te(e, a, n), f = "px") : (h = "opacity" !== a ? 0 : 1, f = "")), (y = _ && "=" === p.charAt(1)) ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), m = p.replace(x, "")) : (c = parseFloat(p), m = _ ? p.replace(x, "") : ""), "" === m && (m = a in r ? r[a] : f), p = c || 0 === c ? (y ? c + h: c) + m: t[a], f !== m && ("" === m && "lineHeight" !== a || (c || 0 === c) && h && (h = ee(e, a, h, f), "%" === m ? (h /= ee(e, a, 100, "%") / 100, !0 !== t.strictUnits && (u = h + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? h /= ee(e, a, 1, m) : "px" !== m && (c = ee(e, a, c, m), m = "px"), y && (c || 0 === c) && (p = c + h + m))), y && (c += h), !h && 0 !== h || !c && 0 !== c ? void 0 !== w[a] && (p || p + "" != "NaN" && null != p) ? (i = new ye(w, a, c || h || 0, 0, i, -1, a, !1, 0, u, p)).xs0 = "none" !== p || "display" !== a && -1 === a.indexOf("Style") ? p: u: W("invalid " + a + " tween value: " + t[a]) : (i = new ye(w, a, h, c - h, i, 0, a, !1 !== d && ("px" === m || "zIndex" === a), 0, u, p)).xs0 = m)
                }
                s && i && !i.plugin && (i.plugin = s)
            }
            return i
        },
        h.setRatio = function(e) {
            var t, i, r, n = this._firstPT;
            if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime) for (; n;) {
                if (t = n.c * e + n.s, n.r ? t = Math.round(t) : t < 1e-6 && t > -1e-6 && (t = 0), n.type) if (1 === n.type) if (2 === (r = n.l)) n.t[n.p] = n.xs0 + t + n.xs1 + n.xn1 + n.xs2;
                else if (3 === r) n.t[n.p] = n.xs0 + t + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3;
                else if (4 === r) n.t[n.p] = n.xs0 + t + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4;
                else if (5 === r) n.t[n.p] = n.xs0 + t + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4 + n.xn4 + n.xs5;
                else {
                    for (i = n.xs0 + t + n.xs1, r = 1; r < n.l; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                    n.t[n.p] = i
                } else - 1 === n.type ? n.t[n.p] = n.xs0: n.setRatio && n.setRatio(e);
                else n.t[n.p] = t + n.xs0;
                n = n._next
            } else for (; n;) 2 !== n.type ? n.t[n.p] = n.b: n.setRatio(e),
            n = n._next;
            else for (; n;) {
                if (2 !== n.type) if (n.r && -1 !== n.type) if (t = Math.round(n.s + n.c), n.type) {
                    if (1 === n.type) {
                        for (r = n.l, i = n.xs0 + t + n.xs1, r = 1; r < n.l; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                        n.t[n.p] = i
                    }
                } else n.t[n.p] = t + n.xs0;
                else n.t[n.p] = n.e;
                else n.setRatio(e);
                n = n._next
            }
        },
        h._enableTransforms = function(e) {
            this._transform = this._transform || Ye(this._target, n, !0),
            this._transformType = this._transform.svg && Ee || !e && 3 !== this._transformType ? 2 : 3
        };
        var We = function(e) {
            this.t[this.p] = this.e,
            this.data._linkCSSP(this, this._next, null, !0)
        };
        h._addLazySet = function(e, t, i) {
            var r = this._firstPT = new ye(e, t, 0, 0, this._firstPT, 2);
            r.e = i,
            r.setRatio = We,
            r.data = this
        },
        h._linkCSSP = function(e, t, i, r) {
            return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next: this._firstPT === e && (this._firstPT = e._next, r = !0), i ? i._next = e: r || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = i),
            e
        },
        h._mod = function(e) {
            for (var t = this._firstPT; t;)"function" == typeof e[t.p] && e[t.p] === Math.round && (t.r = 1),
            t = t._next
        },
        h._kill = function(t) {
            var i, r, n, s = t;
            if (t.autoAlpha || t.alpha) {
                s = {};
                for (r in t) s[r] = t[r];
                s.opacity = 1,
                s.autoAlpha && (s.visibility = 1)
            }
            for (t.className && (i = this._classNamePT) && ((n = i.xfirst) && n._prev ? this._linkCSSP(n._prev, i._next, n._prev._prev) : n === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, n._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== r && i.plugin._kill && (i.plugin._kill(t), r = i.plugin),
            i = i._next;
            return e.prototype._kill.call(this, s)
        };
        var Ue = function(e, t, i) {
            var r, n, s, a;
            if (e.slice) for (n = e.length; --n > -1;) Ue(e[n], t, i);
            else for (n = (r = e.childNodes).length; --n > -1;) a = (s = r[n]).type,
            s.style && (t.push(ie(s)), i && i.push(s)),
            1 !== a && 9 !== a && 11 !== a || !s.childNodes.length || Ue(s, t, i)
        };
        return a.cascadeTo = function(e, i, r) {
            var n, s, a, o, l = t.to(e, i, r),
            h = [l],
            d = [],
            c = [],
            u = [],
            p = t._internals.reservedProps;
            for (e = l._targets || l.target, Ue(e, d, u), l.render(i, !0, !0), Ue(e, c), l.render(0, !0, !0), l._enabled(!0), n = u.length; --n > -1;) if ((s = re(u[n], d[n], c[n])).firstMPT) {
                s = s.difs;
                for (a in r) p[a] && (s[a] = r[a]);
                o = {};
                for (a in s) o[a] = d[n][a];
                h.push(t.fromTo(u[n], i, o, s))
            }
            return h
        },
        e.activate([a]),
        a
    },
    !0),
    function() {
        var e = function(e) {
            for (; e;) e.f || e.blob || (e.m = Math.round),
            e = e._next
        },
        t = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.6.0",
            priority: -1,
            API: 2,
            init: function(e, t, i) {
                return this._tween = i,
                !0
            }
        }).prototype;
        t._onInitAllProps = function() {
            for (var t, i, r, n = this._tween,
            s = n.vars.roundProps.join ? n.vars.roundProps: n.vars.roundProps.split(","), a = s.length, o = {},
            l = n._propLookup.roundProps; --a > -1;) o[s[a]] = Math.round;
            for (a = s.length; --a > -1;) for (t = s[a], i = n._firstPT; i;) r = i._next,
            i.pg ? i.t._mod(o) : i.n === t && (2 === i.f && i.t ? e(i.t._firstPT) : (this._add(i.t, t, i.s, i.c), r && (r._prev = i._prev), i._prev ? i._prev._next = r: n._firstPT === i && (n._firstPT = r), i._next = i._prev = null, n._propLookup[t] = l)),
            i = r;
            return ! 1
        },
        t._add = function(e, t, i, r) {
            this._addTween(e, t, i, i + r, t, Math.round),
            this._overwriteProps.push(t)
        }
    } (),
    _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.6.1",
        init: function(e, t, i, r) {
            var n, s;
            if ("function" != typeof e.setAttribute) return ! 1;
            for (n in t)"function" == typeof(s = t[n]) && (s = s(r, e)),
            this._addTween(e, "setAttribute", e.getAttribute(n) + "", s + "", n, !1, n),
            this._overwriteProps.push(n);
            return ! 0
        }
    }),
    _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.1",
        API: 2,
        init: function(e, t, i, r) {
            "object" != typeof t && (t = {
                rotation: t
            }),
            this.finals = {};
            var n, s, a, o, l, h, d = !0 === t.useRadians ? 2 * Math.PI: 360;
            for (n in t)"useRadians" !== n && ("function" == typeof(o = t[n]) && (o = o(r, e)), s = (h = (o + "").split("_"))[0], a = parseFloat("function" != typeof e[n] ? e[n] : e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n: "get" + n.substr(3)]()), l = (o = this.finals[n] = "string" == typeof s && "=" === s.charAt(1) ? a + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0) - a, h.length && ( - 1 !== (s = h.join("_")).indexOf("short") && (l %= d) !== l % (d / 2) && (l = l < 0 ? l + d: l - d), -1 !== s.indexOf("_cw") && l < 0 ? l = (l + 9999999999 * d) % d - (l / d | 0) * d: -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * d) % d - (l / d | 0) * d)), (l > 1e-6 || l < -1e-6) && (this._addTween(e, n, a, a + l, n), this._overwriteProps.push(n)));
            return ! 0
        },
        set: function(e) {
            var t;
            if (1 !== e) this._super.setRatio.call(this, e);
            else for (t = this._firstPT; t;) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p],
            t = t._next
        }
    })._autoCSS = !0,
    _gsScope._gsDefine("easing.Back", ["easing.Ease"],
    function(e) {
        var t, i, r, n = _gsScope.GreenSockGlobals || _gsScope,
        s = n.com.greensock,
        a = 2 * Math.PI,
        o = Math.PI / 2,
        l = s._class,
        h = function(t, i) {
            var r = l("easing." + t,
            function() {},
            !0),
            n = r.prototype = new e;
            return n.constructor = r,
            n.getRatio = i,
            r
        },
        d = e.register ||
        function() {},
        c = function(e, t, i, r, n) {
            var s = l("easing." + e, {
                easeOut: new t,
                easeIn: new i,
                easeInOut: new r
            },
            !0);
            return d(s, e),
            s
        },
        u = function(e, t, i) {
            this.t = e,
            this.v = t,
            i && (this.next = i, i.prev = this, this.c = i.v - t, this.gap = i.t - e)
        },
        p = function(t, i) {
            var r = l("easing." + t,
            function(e) {
                this._p1 = e || 0 === e ? e: 1.70158,
                this._p2 = 1.525 * this._p1
            },
            !0),
            n = r.prototype = new e;
            return n.constructor = r,
            n.getRatio = i,
            n.config = function(e) {
                return new r(e)
            },
            r
        },
        f = c("Back", p("BackOut",
        function(e) {
            return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
        }), p("BackIn",
        function(e) {
            return e * e * ((this._p1 + 1) * e - this._p1)
        }), p("BackInOut",
        function(e) {
            return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
        })),
        m = l("easing.SlowMo",
        function(e, t, i) {
            t = t || 0 === t ? t: .7,
            null == e ? e = .7 : e > 1 && (e = 1),
            this._p = 1 !== e ? t: 0,
            this._p1 = (1 - e) / 2,
            this._p2 = e,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = !0 === i
        },
        !0),
        g = m.prototype = new e;
        return g.constructor = m,
        g.getRatio = function(e) {
            var t = e + (.5 - e) * this._p;
            return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e: t - (e = 1 - e / this._p1) * e * e * e * t: e > this._p3 ? this._calcEnd ? 1 === e ? 0 : 1 - (e = (e - this._p3) / this._p1) * e: t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e: this._calcEnd ? 1 : t
        },
        m.ease = new m(.7, .7),
        g.config = m.config = function(e, t, i) {
            return new m(e, t, i)
        },
        t = l("easing.SteppedEase",
        function(e, t) {
            e = e || 1,
            this._p1 = 1 / e,
            this._p2 = e + (t ? 0 : 1),
            this._p3 = t ? 1 : 0
        },
        !0),
        g = t.prototype = new e,
        g.constructor = t,
        g.getRatio = function(e) {
            return e < 0 ? e = 0 : e >= 1 && (e = .999999999),
            ((this._p2 * e | 0) + this._p3) * this._p1
        },
        g.config = t.config = function(e, i) {
            return new t(e, i)
        },
        i = l("easing.RoughEase",
        function(t) {
            for (var i, r, n, s, a, o, l = (t = t || {}).taper || "none", h = [], d = 0, c = 0 | (t.points || 20), p = c, f = !1 !== t.randomize, m = !0 === t.clamp, g = t.template instanceof e ? t.template: null, v = "number" == typeof t.strength ? .4 * t.strength: .4; --p > -1;) i = f ? Math.random() : 1 / c * p,
            r = g ? g.getRatio(i) : i,
            n = "none" === l ? v: "out" === l ? (s = 1 - i) * s * v: "in" === l ? i * i * v: i < .5 ? (s = 2 * i) * s * .5 * v: (s = 2 * (1 - i)) * s * .5 * v,
            f ? r += Math.random() * n - .5 * n: p % 2 ? r += .5 * n: r -= .5 * n,
            m && (r > 1 ? r = 1 : r < 0 && (r = 0)),
            h[d++] = {
                x: i,
                y: r
            };
            for (h.sort(function(e, t) {
                return e.x - t.x
            }), o = new u(1, 1, null), p = c; --p > -1;) a = h[p],
            o = new u(a.x, a.y, o);
            this._prev = new u(0, 0, 0 !== o.t ? o: o.next)
        },
        !0),
        g = i.prototype = new e,
        g.constructor = i,
        g.getRatio = function(e) {
            var t = this._prev;
            if (e > t.t) {
                for (; t.next && e >= t.t;) t = t.next;
                t = t.prev
            } else for (; t.prev && e <= t.t;) t = t.prev;
            return this._prev = t,
            t.v + (e - t.t) / t.gap * t.c
        },
        g.config = function(e) {
            return new i(e)
        },
        i.ease = new i,
        c("Bounce", h("BounceOut",
        function(e) {
            return e < 1 / 2.75 ? 7.5625 * e * e: e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), h("BounceIn",
        function(e) {
            return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e: e < 2 / 2.75 ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : e < 2.5 / 2.75 ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), h("BounceInOut",
        function(e) {
            var t = e < .5;
            return (e = t ? 1 - 2 * e: 2 * e - 1) < 1 / 2.75 ? e *= 7.5625 * e: e = e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375,
            t ? .5 * (1 - e) : .5 * e + .5
        })),
        c("Circ", h("CircOut",
        function(e) {
            return Math.sqrt(1 - (e -= 1) * e)
        }), h("CircIn",
        function(e) {
            return - (Math.sqrt(1 - e * e) - 1)
        }), h("CircInOut",
        function(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        })),
        r = function(t, i, r) {
            var n = l("easing." + t,
            function(e, t) {
                this._p1 = e >= 1 ? e: 1,
                this._p2 = (t || r) / (e < 1 ? e: 1),
                this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0),
                this._p2 = a / this._p2
            },
            !0),
            s = n.prototype = new e;
            return s.constructor = n,
            s.getRatio = i,
            s.config = function(e, t) {
                return new n(e, t)
            },
            n
        },
        c("Elastic", r("ElasticOut",
        function(e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
        },
        .3), r("ElasticIn",
        function(e) {
            return - this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2)
        },
        .3), r("ElasticInOut",
        function(e) {
            return (e *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * .5 + 1
        },
        .45)),
        c("Expo", h("ExpoOut",
        function(e) {
            return 1 - Math.pow(2, -10 * e)
        }), h("ExpoIn",
        function(e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), h("ExpoInOut",
        function(e) {
            return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        })),
        c("Sine", h("SineOut",
        function(e) {
            return Math.sin(e * o)
        }), h("SineIn",
        function(e) {
            return 1 - Math.cos(e * o)
        }), h("SineInOut",
        function(e) {
            return - .5 * (Math.cos(Math.PI * e) - 1)
        })),
        l("easing.EaseLookup", {
            find: function(t) {
                return e.map[t]
            }
        },
        !0),
        d(n.SlowMo, "SlowMo", "ease,"),
        d(i, "RoughEase", "ease,"),
        d(t, "SteppedEase", "ease,"),
        f
    },
    !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(e, t) {
    "use strict";
    var i = {},
    r = e.document,
    n = e.GreenSockGlobals = e.GreenSockGlobals || e;
    if (!n.TweenLite) {
        var s, a, o, l, h, d = function(e) {
            var t, i = e.split("."),
            r = n;
            for (t = 0; t < i.length; t++) r[i[t]] = r = r[i[t]] || {};
            return r
        },
        c = d("com.greensock"),
        u = function(e) {
            var t, i = [],
            r = e.length;
            for (t = 0; t !== r; i.push(e[t++]));
            return i
        },
        p = function() {},
        f = function() {
            var e = Object.prototype.toString,
            t = e.call([]);
            return function(i) {
                return null != i && (i instanceof Array || "object" == typeof i && !!i.push && e.call(i) === t)
            }
        } (),
        m = {},
        g = function(t, r, s, a) {
            this.sc = m[t] ? m[t].sc: [],
            m[t] = this,
            this.gsClass = null,
            this.func = s;
            var o = [];
            this.check = function(l) {
                for (var h, c, u, p, f = r.length,
                v = f; --f > -1;)(h = m[r[f]] || new g(r[f], [])).gsClass ? (o[f] = h.gsClass, v--) : l && h.sc.push(this);
                if (0 === v && s) {
                    if (c = ("com.greensock." + t).split("."), u = c.pop(), p = d(c.join("."))[u] = this.gsClass = s.apply(s, o), a) if (n[u] = i[u] = p, "undefined" != typeof module && module.exports) if ("TweenMax" === t) {
                        module.exports = i.TweenMax = p;
                        for (f in i) p[f] = i[f]
                    } else i.TweenMax && (i.TweenMax[u] = p);
                    else "function" == typeof define && define.amd && define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/": "") + t.split(".").pop(), [],
                    function() {
                        return p
                    });
                    for (f = 0; f < this.sc.length; f++) this.sc[f].check()
                }
            },
            this.check(!0)
        },
        v = e._gsDefine = function(e, t, i, r) {
            return new g(e, t, i, r)
        },
        _ = c._class = function(e, t, i) {
            return t = t ||
            function() {},
            v(e, [],
            function() {
                return t
            },
            i),
            t
        };
        v.globals = n;
        var y = [0, 0, 1, 1],
        w = _("easing.Ease",
        function(e, t, i, r) {
            this._func = e,
            this._type = i || 0,
            this._power = r || 0,
            this._params = t ? y.concat(t) : y
        },
        !0),
        b = w.map = {},
        x = w.register = function(e, t, i, r) {
            for (var n, s, a, o, l = t.split(","), h = l.length, d = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;) for (s = l[h], n = r ? _("easing." + s, null, !0) : c.easing[s] || {},
            a = d.length; --a > -1;) o = d[a],
            b[s + "." + o] = b[o + s] = n[o] = e.getRatio ? e: e[o] || new e
        };
        for ((o = w.prototype)._calcEnd = !1, o.getRatio = function(e) {
            if (this._func) return this._params[0] = e,
            this._func.apply(null, this._params);
            var t = this._type,
            i = this._power,
            r = 1 === t ? 1 - e: 2 === t ? e: e < .5 ? 2 * e: 2 * (1 - e);
            return 1 === i ? r *= r: 2 === i ? r *= r * r: 3 === i ? r *= r * r * r: 4 === i && (r *= r * r * r * r),
            1 === t ? 1 - r: 2 === t ? r: e < .5 ? r / 2 : 1 - r / 2
        },
        a = (s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --a > -1;) o = s[a] + ",Power" + a,
        x(new w(null, null, 1, a), o, "easeOut", !0),
        x(new w(null, null, 2, a), o, "easeIn" + (0 === a ? ",easeNone": "")),
        x(new w(null, null, 3, a), o, "easeInOut");
        b.linear = c.easing.Linear.easeIn,
        b.swing = c.easing.Quad.easeInOut;
        var T = _("events.EventDispatcher",
        function(e) {
            this._listeners = {},
            this._eventTarget = e || this
        }); (o = T.prototype).addEventListener = function(e, t, i, r, n) {
            n = n || 0;
            var s, a, o = this._listeners[e],
            d = 0;
            for (this !== l || h || l.wake(), null == o && (this._listeners[e] = o = []), a = o.length; --a > -1;)(s = o[a]).c === t && s.s === i ? o.splice(a, 1) : 0 === d && s.pr < n && (d = a + 1);
            o.splice(d, 0, {
                c: t,
                s: i,
                up: r,
                pr: n
            })
        },
        o.removeEventListener = function(e, t) {
            var i, r = this._listeners[e];
            if (r) for (i = r.length; --i > -1;) if (r[i].c === t) return void r.splice(i, 1)
        },
        o.dispatchEvent = function(e) {
            var t, i, r, n = this._listeners[e];
            if (n) for ((t = n.length) > 1 && (n = n.slice(0)), i = this._eventTarget; --t > -1;)(r = n[t]) && (r.up ? r.c.call(r.s || i, {
                type: e,
                target: i
            }) : r.c.call(r.s || i))
        };
        var S = e.requestAnimationFrame,
        C = e.cancelAnimationFrame,
        E = Date.now ||
        function() {
            return (new Date).getTime()
        },
        P = E();
        for (a = (s = ["ms", "moz", "webkit", "o"]).length; --a > -1 && !S;) S = e[s[a] + "RequestAnimationFrame"],
        C = e[s[a] + "CancelAnimationFrame"] || e[s[a] + "CancelRequestAnimationFrame"];
        _("Ticker",
        function(e, t) {
            var i, n, s, a, o, d = this,
            c = E(),
            u = !(!1 === t || !S) && "auto",
            f = 500,
            m = 33,
            g = function(e) {
                var t, r, l = E() - P;
                l > f && (c += l - m),
                P += l,
                d.time = (P - c) / 1e3,
                t = d.time - o,
                (!i || t > 0 || !0 === e) && (d.frame++, o += t + (t >= a ? .004 : a - t), r = !0),
                !0 !== e && (s = n(g)),
                r && d.dispatchEvent("tick")
            };
            T.call(d),
            d.time = d.frame = 0,
            d.tick = function() {
                g(!0)
            },
            d.lagSmoothing = function(e, t) {
                if (!arguments.length) return f < 1e10;
                f = e || 1e10,
                m = Math.min(t, f, 0)
            },
            d.sleep = function() {
                null != s && (u && C ? C(s) : clearTimeout(s), n = p, s = null, d === l && (h = !1))
            },
            d.wake = function(e) {
                null !== s ? d.sleep() : e ? c += -P + (P = E()) : d.frame > 10 && (P = E() - f + 5),
                n = 0 === i ? p: u && S ? S: function(e) {
                    return setTimeout(e, 1e3 * (o - d.time) + 1 | 0)
                },
                d === l && (h = !0),
                g(2)
            },
            d.fps = function(e) {
                if (!arguments.length) return i;
                a = 1 / ((i = e) || 60),
                o = this.time + a,
                d.wake()
            },
            d.useRAF = function(e) {
                if (!arguments.length) return u;
                d.sleep(),
                u = e,
                d.fps(i)
            },
            d.fps(e),
            setTimeout(function() {
                "auto" === u && d.frame < 5 && "hidden" !== r.visibilityState && d.useRAF(!1)
            },
            1500)
        }),
        (o = c.Ticker.prototype = new c.events.EventDispatcher).constructor = c.Ticker;
        var k = _("core.Animation",
        function(e, t) {
            if (this.vars = t = t || {},
            this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = !0 === t.immediateRender, this.data = t.data, this._reversed = !0 === t.reversed, q) {
                h || l.wake();
                var i = this.vars.useFrames ? V: q;
                i.add(this, i._time),
                this.vars.paused && this.paused(!0)
            }
        });
        l = k.ticker = new c.Ticker,
        (o = k.prototype)._dirty = o._gc = o._initted = o._paused = !1,
        o._totalTime = o._time = 0,
        o._rawPrevTime = -1,
        o._next = o._last = o._onUpdate = o._timeline = o.timeline = null,
        o._paused = !1;
        var M = function() {
            h && E() - P > 2e3 && ("hidden" !== r.visibilityState || !l.lagSmoothing()) && l.wake();
            var e = setTimeout(M, 2e3);
            e.unref && e.unref()
        };
        M(),
        o.play = function(e, t) {
            return null != e && this.seek(e, t),
            this.reversed(!1).paused(!1)
        },
        o.pause = function(e, t) {
            return null != e && this.seek(e, t),
            this.paused(!0)
        },
        o.resume = function(e, t) {
            return null != e && this.seek(e, t),
            this.paused(!1)
        },
        o.seek = function(e, t) {
            return this.totalTime(Number(e), !1 !== t)
        },
        o.restart = function(e, t) {
            return this.reversed(!1).paused(!1).totalTime(e ? -this._delay: 0, !1 !== t, !0)
        },
        o.reverse = function(e, t) {
            return null != e && this.seek(e || this.totalDuration(), t),
            this.reversed(!0).paused(!1)
        },
        o.render = function(e, t, i) {},
        o.invalidate = function() {
            return this._time = this._totalTime = 0,
            this._initted = this._gc = !1,
            this._rawPrevTime = -1,
            !this._gc && this.timeline || this._enabled(!0),
            this
        },
        o.isActive = function() {
            var e, t = this._timeline,
            i = this._startTime;
            return ! t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime(!0)) >= i && e < i + this.totalDuration() / this._timeScale - 1e-7
        },
        o._enabled = function(e, t) {
            return h || l.wake(),
            this._gc = !e,
            this._active = this.isActive(),
            !0 !== t && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)),
            !1
        },
        o._kill = function(e, t) {
            return this._enabled(!1, !1)
        },
        o.kill = function(e, t) {
            return this._kill(e, t),
            this
        },
        o._uncache = function(e) {
            for (var t = e ? this: this.timeline; t;) t._dirty = !0,
            t = t.timeline;
            return this
        },
        o._swapSelfInParams = function(e) {
            for (var t = e.length,
            i = e.concat(); --t > -1;)"{self}" === e[t] && (i[t] = this);
            return i
        },
        o._callback = function(e) {
            var t = this.vars,
            i = t[e],
            r = t[e + "Params"],
            n = t[e + "Scope"] || t.callbackScope || this;
            switch (r ? r.length: 0) {
            case 0:
                i.call(n);
                break;
            case 1:
                i.call(n, r[0]);
                break;
            case 2:
                i.call(n, r[0], r[1]);
                break;
            default:
                i.apply(n, r)
            }
        },
        o.eventCallback = function(e, t, i, r) {
            if ("on" === (e || "").substr(0, 2)) {
                var n = this.vars;
                if (1 === arguments.length) return n[e];
                null == t ? delete n[e] : (n[e] = t, n[e + "Params"] = f(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, n[e + "Scope"] = r),
                "onUpdate" === e && (this._onUpdate = t)
            }
            return this
        },
        o.delay = function(e) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
        },
        o.duration = function(e) {
            return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
        },
        o.totalDuration = function(e) {
            return this._dirty = !1,
            arguments.length ? this.duration(e) : this._totalDuration
        },
        o.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration: e, t)) : this._time
        },
        o.totalTime = function(e, t, i) {
            if (h || l.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (e < 0 && !i && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var r = this._totalDuration,
                    n = this._timeline;
                    if (e > r && !i && (e = r), this._startTime = (this._paused ? this._pauseTime: n._time) - (this._reversed ? r - e: e) / this._timeScale, n._dirty || this._uncache(!1), n._timeline) for (; n._timeline;) n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0),
                    n = n._timeline
                }
                this._gc && this._enabled(!0, !1),
                this._totalTime === e && 0 !== this._duration || (L.length && U(), this.render(e, t, !1), L.length && U())
            }
            return this
        },
        o.progress = o.totalProgress = function(e, t) {
            var i = this.duration();
            return arguments.length ? this.totalTime(i * e, t) : i ? this._time / i: this.ratio
        },
        o.startTime = function(e) {
            return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
        },
        o.endTime = function(e) {
            return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
        },
        o.timeScale = function(e) {
            if (!arguments.length) return this._timeScale;
            var t, i;
            for (e = e || 1e-10, this._timeline && this._timeline.smoothChildTiming && (i = (t = this._pauseTime) || 0 === t ? t: this._timeline.totalTime(), this._startTime = i - (i - this._startTime) * this._timeScale / e), this._timeScale = e, i = this.timeline; i && i.timeline;) i._dirty = !0,
            i.totalDuration(),
            i = i.timeline;
            return this
        },
        o.reversed = function(e) {
            return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime: this._totalTime, !0)), this) : this._reversed
        },
        o.paused = function(e) {
            if (!arguments.length) return this._paused;
            var t, i, r = this._timeline;
            return e != this._paused && r && (h || e || l.wake(), i = (t = r.rawTime()) - this._pauseTime, !e && r.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = e ? t: null, this._paused = e, this._active = this.isActive(), !e && 0 !== i && this._initted && this.duration() && (t = r.smoothChildTiming ? this._totalTime: (t - this._startTime) / this._timeScale, this.render(t, t === this._totalTime, !0))),
            this._gc && !e && this._enabled(!0, !1),
            this
        };
        var O = _("core.SimpleTimeline",
        function(e) {
            k.call(this, 0, e),
            this.autoRemoveChildren = this.smoothChildTiming = !0
        }); (o = O.prototype = new k).constructor = O,
        o.kill()._gc = !1,
        o._first = o._last = o._recent = null,
        o._sortChildren = !1,
        o.add = o.insert = function(e, t, i, r) {
            var n, s;
            if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), n = this._last, this._sortChildren) for (s = e._startTime; n && n._startTime > s;) n = n._prev;
            return n ? (e._next = n._next, n._next = e) : (e._next = this._first, this._first = e),
            e._next ? e._next._prev = e: this._last = e,
            e._prev = n,
            this._recent = e,
            this._timeline && this._uncache(!0),
            this
        },
        o._remove = function(e, t) {
            return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next: this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev: this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)),
            this
        },
        o.render = function(e, t, i) {
            var r, n = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = e; n;) r = n._next,
            (n._active || e >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)),
            n = r
        },
        o.rawTime = function() {
            return h || l.wake(),
            this._totalTime
        };
        var z = _("TweenLite",
        function(t, i, r) {
            if (k.call(this, i, r), this.render = z.prototype.render, null == t) throw "Cannot tween a null target.";
            this.target = t = "string" != typeof t ? t: z.selector(t) || t;
            var n, s, a, o = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
            l = this.vars.overwrite;
            if (this._overwrite = l = null == l ? j[z.defaultOverwrite] : "number" == typeof l ? l >> 0 : j[l], (o || t instanceof Array || t.push && f(t)) && "number" != typeof t[0]) for (this._targets = a = u(t), this._propLookup = [], this._siblings = [], n = 0; n < a.length; n++)(s = a[n]) ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (a.splice(n--, 1), this._targets = a = a.concat(u(s))) : (this._siblings[n] = K(s, this, !1), 1 === l && this._siblings[n].length > 1 && Q(s, this, null, 1, this._siblings[n])) : "string" == typeof(s = a[n--] = z.selector(s)) && a.splice(n + 1, 1) : a.splice(n--, 1);
            else this._propLookup = {},
            this._siblings = K(t, this, !1),
            1 === l && this._siblings.length > 1 && Q(t, this, null, 1, this._siblings); (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -1e-10, this.render(Math.min(0, -this._delay)))
        },
        !0),
        A = function(t) {
            return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
        }; (o = z.prototype = new k).constructor = z,
        o.kill()._gc = !1,
        o.ratio = 0,
        o._firstPT = o._targets = o._overwrittenProps = o._startAt = null,
        o._notifyPluginsOfEnabled = o._lazy = !1,
        z.version = "1.20.3",
        z.defaultEase = o._ease = new w(null, null, 1, 1),
        z.defaultOverwrite = "auto",
        z.ticker = l,
        z.autoSleep = 120,
        z.lagSmoothing = function(e, t) {
            l.lagSmoothing(e, t)
        },
        z.selector = e.$ || e.jQuery ||
        function(t) {
            var i = e.$ || e.jQuery;
            return i ? (z.selector = i, i(t)) : void 0 === r ? t: r.querySelectorAll ? r.querySelectorAll(t) : r.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
        };
        var L = [],
        D = {},
        R = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        I = /[\+-]=-?[\.\d]/,
        X = function(e) {
            for (var t, i = this._firstPT; i;) t = i.blob ? 1 === e && null != this.end ? this.end: e ? this.join("") : this.start: i.c * e + i.s,
            i.m ? t = i.m(t, this._target || i.t) : t < 1e-6 && t > -1e-6 && !i.blob && (t = 0),
            i.f ? i.fp ? i.t[i.p](i.fp, t) : i.t[i.p](t) : i.t[i.p] = t,
            i = i._next
        },
        N = function(e, t, i, r) {
            var n, s, a, o, l, h, d, c = [],
            u = 0,
            p = "",
            f = 0;
            for (c.start = e, c.end = t, e = c[0] = e + "", t = c[1] = t + "", i && (i(c), e = c[0], t = c[1]), c.length = 0, n = e.match(R) || [], s = t.match(R) || [], r && (r._next = null, r.blob = 1, c._firstPT = c._applyPT = r), l = s.length, o = 0; o < l; o++) d = s[o],
            p += (h = t.substr(u, t.indexOf(d, u) - u)) || !o ? h: ",",
            u += h.length,
            f ? f = (f + 1) % 5 : "rgba(" === h.substr( - 5) && (f = 1),
            d === n[o] || n.length <= o ? p += d: (p && (c.push(p), p = ""), a = parseFloat(n[o]), c.push(a), c._firstPT = {
                _next: c._firstPT,
                t: c,
                p: c.length - 1,
                s: a,
                c: ("=" === d.charAt(1) ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - a) || 0,
                f: 0,
                m: f && f < 4 ? Math.round: 0
            }),
            u += d.length;
            return (p += t.substr(u)) && c.push(p),
            c.setRatio = X,
            I.test(t) && (c.end = null),
            c
        },
        $ = function(e, t, i, r, n, s, a, o, l) {
            "function" == typeof r && (r = r(l || 0, e));
            var h = typeof e[t],
            d = "function" !== h ? "": t.indexOf("set") || "function" != typeof e["get" + t.substr(3)] ? t: "get" + t.substr(3),
            c = "get" !== i ? i: d ? a ? e[d](a) : e[d]() : e[t],
            u = "string" == typeof r && "=" === r.charAt(1),
            p = {
                t: e,
                p: t,
                s: c,
                f: "function" === h,
                pg: 0,
                n: n || t,
                m: s ? "function" == typeof s ? s: Math.round: 0,
                pr: 0,
                c: u ? parseInt(r.charAt(0) + "1", 10) * parseFloat(r.substr(2)) : parseFloat(r) - c || 0
            };
            if (("number" != typeof c || "number" != typeof r && !u) && (a || isNaN(c) || !u && isNaN(r) || "boolean" == typeof c || "boolean" == typeof r ? (p.fp = a, p = {
                t: N(c, u ? parseFloat(p.s) + p.c: r, o || z.defaultStringFilter, p),
                p: "setRatio",
                s: 0,
                c: 1,
                f: 2,
                pg: 0,
                n: n || t,
                pr: 0,
                m: 0
            }) : (p.s = parseFloat(c), u || (p.c = parseFloat(r) - p.s || 0))), p.c) return (p._next = this._firstPT) && (p._next._prev = p),
            this._firstPT = p,
            p
        },
        F = z._internals = {
            isArray: f,
            isSelector: A,
            lazyTweens: L,
            blobDif: N
        },
        B = z._plugins = {},
        Y = F.tweenLookup = {},
        H = 0,
        G = F.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1,
            onOverwrite: 1,
            callbackScope: 1,
            stringFilter: 1,
            id: 1,
            yoyoEase: 1
        },
        j = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            true: 1,
            false: 0
        },
        V = k._rootFramesTimeline = new O,
        q = k._rootTimeline = new O,
        W = 30,
        U = F.lazyRender = function() {
            var e, t = L.length;
            for (D = {}; --t > -1;)(e = L[t]) && !1 !== e._lazy && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
            L.length = 0
        };
        q._startTime = l.time,
        V._startTime = l.frame,
        q._active = V._active = !0,
        setTimeout(U, 1),
        k._updateRoot = z.render = function() {
            var e, t, i;
            if (L.length && U(), q.render((l.time - q._startTime) * q._timeScale, !1, !1), V.render((l.frame - V._startTime) * V._timeScale, !1, !1), L.length && U(), l.frame >= W) {
                W = l.frame + (parseInt(z.autoSleep, 10) || 120);
                for (i in Y) {
                    for (e = (t = Y[i].tweens).length; --e > -1;) t[e]._gc && t.splice(e, 1);
                    0 === t.length && delete Y[i]
                }
                if ((! (i = q._first) || i._paused) && z.autoSleep && !V._first && 1 === l._listeners.tick.length) {
                    for (; i && i._paused;) i = i._next;
                    i || l.sleep()
                }
            }
        },
        l.addEventListener("tick", k._updateRoot);
        var K = function(e, t, i) {
            var r, n, s = e._gsTweenID;
            if (Y[s || (e._gsTweenID = s = "t" + H++)] || (Y[s] = {
                target: e,
                tweens: []
            }), t && (r = Y[s].tweens, r[n = r.length] = t, i)) for (; --n > -1;) r[n] === t && r.splice(n, 1);
            return Y[s].tweens
        },
        Z = function(e, t, i, r) {
            var n, s, a = e.vars.onOverwrite;
            return a && (n = a(e, t, i, r)),
            (a = z.onOverwrite) && (s = a(e, t, i, r)),
            !1 !== n && !1 !== s
        },
        Q = function(e, t, i, r, n) {
            var s, a, o, l;
            if (1 === r || r >= 4) {
                for (l = n.length, s = 0; s < l; s++) if ((o = n[s]) !== t) o._gc || o._kill(null, e, t) && (a = !0);
                else if (5 === r) break;
                return a
            }
            var h, d = t._startTime + 1e-10,
            c = [],
            u = 0,
            p = 0 === t._duration;
            for (s = n.length; --s > -1;)(o = n[s]) === t || o._gc || o._paused || (o._timeline !== t._timeline ? (h = h || J(t, 0, p), 0 === J(o, h, p) && (c[u++] = o)) : o._startTime <= d && o._startTime + o.totalDuration() / o._timeScale > d && ((p || !o._initted) && d - o._startTime <= 2e-10 || (c[u++] = o)));
            for (s = u; --s > -1;) if (o = c[s], 2 === r && o._kill(i, e, t) && (a = !0), 2 !== r || !o._firstPT && o._initted) {
                if (2 !== r && !Z(o, t)) continue;
                o._enabled(!1, !1) && (a = !0)
            }
            return a
        },
        J = function(e, t, i) {
            for (var r = e._timeline,
            n = r._timeScale,
            s = e._startTime; r._timeline;) {
                if (s += r._startTime, n *= r._timeScale, r._paused) return - 100;
                r = r._timeline
            }
            return (s /= n) > t ? s - t: i && s === t || !e._initted && s - t < 2e-10 ? 1e-10: (s += e.totalDuration() / e._timeScale / n) > t + 1e-10 ? 0 : s - t - 1e-10
        };
        o._init = function() {
            var e, t, i, r, n, s, a = this.vars,
            o = this._overwrittenProps,
            l = this._duration,
            h = !!a.immediateRender,
            d = a.ease;
            if (a.startAt) {
                this._startAt && (this._startAt.render( - 1, !0), this._startAt.kill()),
                n = {};
                for (r in a.startAt) n[r] = a.startAt[r];
                if (n.data = "isStart", n.overwrite = !1, n.immediateRender = !0, n.lazy = h && !1 !== a.lazy, n.startAt = n.delay = null, n.onUpdate = a.onUpdate, n.onUpdateParams = a.onUpdateParams, n.onUpdateScope = a.onUpdateScope || a.callbackScope || this, this._startAt = z.to(this.target, 0, n), h) if (this._time > 0) this._startAt = null;
                else if (0 !== l) return
            } else if (a.runBackwards && 0 !== l) if (this._startAt) this._startAt.render( - 1, !0),
            this._startAt.kill(),
            this._startAt = null;
            else {
                0 !== this._time && (h = !1),
                i = {};
                for (r in a) G[r] && "autoCSS" !== r || (i[r] = a[r]);
                if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== a.lazy, i.immediateRender = h, this._startAt = z.to(this.target, 0, i), h) {
                    if (0 === this._time) return
                } else this._startAt._init(),
                this._startAt._enabled(!1),
                this.vars.immediateRender && (this._startAt = null)
            }
            if (this._ease = d = d ? d instanceof w ? d: "function" == typeof d ? new w(d, a.easeParams) : b[d] || z.defaultEase: z.defaultEase, a.easeParams instanceof Array && d.config && (this._ease = d.config.apply(d, a.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (s = this._targets.length, e = 0; e < s; e++) this._initProps(this._targets[e], this._propLookup[e] = {},
            this._siblings[e], o ? o[e] : null, e) && (t = !0);
            else t = this._initProps(this.target, this._propLookup, this._siblings, o, 0);
            if (t && z._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), a.runBackwards) for (i = this._firstPT; i;) i.s += i.c,
            i.c = -i.c,
            i = i._next;
            this._onUpdate = a.onUpdate,
            this._initted = !0
        },
        o._initProps = function(t, i, r, n, s) {
            var a, o, l, h, d, c;
            if (null == t) return ! 1;
            D[t._gsTweenID] && U(),
            this.vars.css || t.style && t !== e && t.nodeType && B.css && !1 !== this.vars.autoCSS &&
            function(e, t) {
                var i, r = {};
                for (i in e) G[i] || i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!B[i] || B[i] && B[i]._autoCSS) || (r[i] = e[i], delete e[i]);
                e.css = r
            } (this.vars, t);
            for (a in this.vars) if (c = this.vars[a], G[a]) c && (c instanceof Array || c.push && f(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[a] = c = this._swapSelfInParams(c, this));
            else if (B[a] && (h = new B[a])._onInitTween(t, this.vars[a], this, s)) {
                for (this._firstPT = d = {
                    _next: this._firstPT,
                    t: h,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: a,
                    pg: 1,
                    pr: h._priority,
                    m: 0
                },
                o = h._overwriteProps.length; --o > -1;) i[h._overwriteProps[o]] = this._firstPT; (h._priority || h._onInitAllProps) && (l = !0),
                (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0),
                d._next && (d._next._prev = d)
            } else i[a] = $.call(this, t, a, "get", c, a, 0, null, this.vars.stringFilter, s);
            return n && this._kill(n, t) ? this._initProps(t, i, r, n, s) : this._overwrite > 1 && this._firstPT && r.length > 1 && Q(t, this, i, this._overwrite, r) ? (this._kill(i, t), this._initProps(t, i, r, n, s)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (D[t._gsTweenID] = !0), l)
        },
        o.render = function(e, t, i) {
            var r, n, s, a, o = this._time,
            l = this._duration,
            h = this._rawPrevTime;
            if (e >= l - 1e-7 && e >= 0) this._totalTime = this._time = l,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
            this._reversed || (r = !0, n = "onComplete", i = i || this._timeline.autoRemoveChildren),
            0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (h < 0 || e <= 0 && e >= -1e-7 || 1e-10 === h && "isPause" !== this.data) && h !== e && (i = !0, h > 1e-10 && (n = "onReverseComplete")), this._rawPrevTime = a = !t || e || h === e ? e: 1e-10);
            else if (e < 1e-7) this._totalTime = this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== o || 0 === l && h > 0) && (n = "onReverseComplete", r = this._reversed),
            e < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (1e-10 !== h || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !t || e || h === e ? e: 1e-10)),
            (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
            else if (this._totalTime = this._time = e, this._easeType) {
                var d = e / l,
                c = this._easeType,
                u = this._easePower; (1 === c || 3 === c && d >= .5) && (d = 1 - d),
                3 === c && (d *= 2),
                1 === u ? d *= d: 2 === u ? d *= d * d: 3 === u ? d *= d * d * d: 4 === u && (d *= d * d * d * d),
                this.ratio = 1 === c ? 1 - d: 2 === c ? d: e / l < .5 ? d / 2 : 1 - d / 2
            } else this.ratio = this._ease.getRatio(e / l);
            if (this._time !== o || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o,
                    this._rawPrevTime = h,
                    L.push(this),
                    void(this._lazy = [e, t]);
                    this._time && !r ? this.ratio = this._ease.getRatio(this._time / l) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== o && e >= 0 && (this._active = !0), 0 === o && (this._startAt && (e >= 0 ? this._startAt.render(e, !0, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== l || t || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s,
                s = s._next;
                this._onUpdate && (e < 0 && this._startAt && -1e-4 !== e && this._startAt.render(e, !0, i), t || (this._time !== o || r || i) && this._callback("onUpdate")),
                n && (this._gc && !i || (e < 0 && this._startAt && !this._onUpdate && -1e-4 !== e && this._startAt.render(e, !0, i), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[n] && this._callback(n), 0 === l && 1e-10 === this._rawPrevTime && 1e-10 !== a && (this._rawPrevTime = 0)))
            }
        },
        o._kill = function(e, t, i) {
            if ("all" === e && (e = null), null == e && (null == t || t === this.target)) return this._lazy = !1,
            this._enabled(!1, !1);
            t = "string" != typeof t ? t || this._targets || this.target: z.selector(t) || t;
            var r, n, s, a, o, l, h, d, c, u = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
            if ((f(t) || A(t)) && "number" != typeof t[0]) for (r = t.length; --r > -1;) this._kill(e, t[r], i) && (l = !0);
            else {
                if (this._targets) {
                    for (r = this._targets.length; --r > -1;) if (t === this._targets[r]) {
                        o = this._propLookup[r] || {},
                        this._overwrittenProps = this._overwrittenProps || [],
                        n = this._overwrittenProps[r] = e ? this._overwrittenProps[r] || {}: "all";
                        break
                    }
                } else {
                    if (t !== this.target) return ! 1;
                    o = this._propLookup,
                    n = this._overwrittenProps = e ? this._overwrittenProps || {}: "all"
                }
                if (o) {
                    if (h = e || o, d = e !== n && "all" !== n && e !== o && ("object" != typeof e || !e._tempKill), i && (z.onOverwrite || this.vars.onOverwrite)) {
                        for (s in h) o[s] && (c || (c = []), c.push(s));
                        if ((c || !e) && !Z(this, i, t, c)) return ! 1
                    }
                    for (s in h)(a = o[s]) && (u && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s, l = !0), a.pg && a.t._kill(h) && (l = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next: a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[s]),
                    d && (n[s] = 1); ! this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return l
        },
        o.invalidate = function() {
            return this._notifyPluginsOfEnabled && z._onPluginEvent("_onDisable", this),
            this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
            this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
            this._propLookup = this._targets ? {}: [],
            k.prototype.invalidate.call(this),
            this.vars.immediateRender && (this._time = -1e-10, this.render(Math.min(0, -this._delay))),
            this
        },
        o._enabled = function(e, t) {
            if (h || l.wake(), e && this._gc) {
                var i, r = this._targets;
                if (r) for (i = r.length; --i > -1;) this._siblings[i] = K(r[i], this, !0);
                else this._siblings = K(this.target, this, !0)
            }
            return k.prototype._enabled.call(this, e, t),
            !(!this._notifyPluginsOfEnabled || !this._firstPT) && z._onPluginEvent(e ? "_onEnable": "_onDisable", this)
        },
        z.to = function(e, t, i) {
            return new z(e, t, i)
        },
        z.from = function(e, t, i) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            new z(e, t, i)
        },
        z.fromTo = function(e, t, i, r) {
            return r.startAt = i,
            r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender,
            new z(e, t, r)
        },
        z.delayedCall = function(e, t, i, r, n) {
            return new z(t, 0, {
                delay: e,
                onComplete: t,
                onCompleteParams: i,
                callbackScope: r,
                onReverseComplete: t,
                onReverseCompleteParams: i,
                immediateRender: !1,
                lazy: !1,
                useFrames: n,
                overwrite: 0
            })
        },
        z.set = function(e, t) {
            return new z(e, 0, t)
        },
        z.getTweensOf = function(e, t) {
            if (null == e) return [];
            e = "string" != typeof e ? e: z.selector(e) || e;
            var i, r, n, s;
            if ((f(e) || A(e)) && "number" != typeof e[0]) {
                for (i = e.length, r = []; --i > -1;) r = r.concat(z.getTweensOf(e[i], t));
                for (i = r.length; --i > -1;) for (s = r[i], n = i; --n > -1;) s === r[n] && r.splice(i, 1)
            } else if (e._gsTweenID) for (i = (r = K(e).concat()).length; --i > -1;)(r[i]._gc || t && !r[i].isActive()) && r.splice(i, 1);
            return r || []
        },
        z.killTweensOf = z.killDelayedCallsTo = function(e, t, i) {
            "object" == typeof t && (i = t, t = !1);
            for (var r = z.getTweensOf(e, t), n = r.length; --n > -1;) r[n]._kill(i, e)
        };
        var ee = _("plugins.TweenPlugin",
        function(e, t) {
            this._overwriteProps = (e || "").split(","),
            this._propName = this._overwriteProps[0],
            this._priority = t || 0,
            this._super = ee.prototype
        },
        !0);
        if (o = ee.prototype, ee.version = "1.19.0", ee.API = 2, o._firstPT = null, o._addTween = $, o.setRatio = X, o._kill = function(e) {
            var t, i = this._overwriteProps,
            r = this._firstPT;
            if (null != e[this._propName]) this._overwriteProps = [];
            else for (t = i.length; --t > -1;) null != e[i[t]] && i.splice(t, 1);
            for (; r;) null != e[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)),
            r = r._next;
            return ! 1
        },
        o._mod = o._roundProps = function(e) {
            for (var t, i = this._firstPT; i;)(t = e[this._propName] || null != i.n && e[i.n.split(this._propName + "_").join("")]) && "function" == typeof t && (2 === i.f ? i.t._applyPT.m = t: i.m = t),
            i = i._next
        },
        z._onPluginEvent = function(e, t) {
            var i, r, n, s, a, o = t._firstPT;
            if ("_onInitAllProps" === e) {
                for (; o;) {
                    for (a = o._next, r = n; r && r.pr > o.pr;) r = r._next; (o._prev = r ? r._prev: s) ? o._prev._next = o: n = o,
                    (o._next = r) ? r._prev = o: s = o,
                    o = a
                }
                o = t._firstPT = n
            }
            for (; o;) o.pg && "function" == typeof o.t[e] && o.t[e]() && (i = !0),
            o = o._next;
            return i
        },
        ee.activate = function(e) {
            for (var t = e.length; --t > -1;) e[t].API === ee.API && (B[(new e[t])._propName] = e[t]);
            return ! 0
        },
        v.plugin = function(e) {
            if (! (e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
            var t, i = e.propName,
            r = e.priority || 0,
            n = e.overwriteProps,
            s = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_mod",
                mod: "_mod",
                initAll: "_onInitAllProps"
            },
            a = _("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
            function() {
                ee.call(this, i, r),
                this._overwriteProps = n || []
            },
            !0 === e.global),
            o = a.prototype = new ee(i);
            o.constructor = a,
            a.API = e.API;
            for (t in s)"function" == typeof e[t] && (o[s[t]] = e[t]);
            return a.version = e.version,
            ee.activate([a]),
            a
        },
        s = e._gsQueue) {
            for (a = 0; a < s.length; a++) s[a]();
            for (o in m) m[o].func || e.console.log("GSAP encountered missing dependency: " + o)
        }
        h = !1
    }
} ("undefined" != typeof module && module.exports && "undefined" != typeof global ? global: this || window),
function(e, t) {
    "function" == typeof define && define.amd ? define(["ScrollMagic", "TweenMax", "TimelineMax"], t) : "object" == typeof exports ? (require("gsap"), t(require("scrollmagic"), TweenMax, TimelineMax)) : t(e.ScrollMagic || e.jQuery && e.jQuery.ScrollMagic, e.TweenMax || e.TweenLite, e.TimelineMax || e.TimelineLite)
} (this,
function(e, t, i) {
    "use strict";
    e.Scene.addOption("tweenChanges", !1,
    function(e) {
        return !! e
    }),
    e.Scene.extend(function() {
        var e, r = this;
        r.on("progress.plugin_gsap",
        function() {
            n()
        }),
        r.on("destroy.plugin_gsap",
        function(e) {
            r.removeTween(e.reset)
        });
        var n = function() {
            if (e) {
                var t = r.progress(),
                i = r.state();
                e.repeat && -1 === e.repeat() ? "DURING" === i && e.paused() ? e.play() : "DURING" === i || e.paused() || e.pause() : t != e.progress() && (0 === r.duration() ? t > 0 ? e.play() : e.reverse() : r.tweenChanges() && e.tweenTo ? e.tweenTo(t * e.duration()) : e.progress(t).pause())
            }
        };
        r.setTween = function(s, a, o) {
            var l;
            arguments.length > 1 && (arguments.length < 3 && (o = a, a = 1), s = t.to(s, a, o));
            try { (l = i ? new i({
                    smoothChildTiming: !0
                }).add(s) : s).pause()
            } catch(e) {
                return r
            }
            return e && r.removeTween(),
            e = l,
            s.repeat && -1 === s.repeat() && (e.repeat( - 1), e.yoyo(s.yoyo())),
            n(),
            r
        },
        r.removeTween = function(t) {
            return e && (t && e.progress(0).pause(), e.kill(), e = void 0),
            r
        }
    })
}),
function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Barba", [], t) : "object" == typeof exports ? exports.Barba = t() : e.Barba = t()
} (this,
function() {
    return function(e) {
        function t(r) {
            if (i[r]) return i[r].exports;
            var n = i[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return e[r].call(n.exports, n, n.exports, t),
            n.loaded = !0,
            n.exports
        }
        var i = {};
        return t.m = e,
        t.c = i,
        t.p = "http://localhost:8080/dist",
        t(0)
    } ([function(e, t, i) {
        "function" != typeof Promise && (window.Promise = i(1));
        var r = {
            version: "1.0.0",
            BaseTransition: i(4),
            BaseView: i(6),
            BaseCache: i(8),
            Dispatcher: i(7),
            HistoryManager: i(9),
            Pjax: i(10),
            Prefetch: i(13),
            Utils: i(5)
        };
        e.exports = r
    },
    function(e, t, i) { (function(t) { !
            function(i) {
                function r() {}
                function n(e) {
                    if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof e) throw new TypeError("not a function");
                    this._state = 0,
                    this._handled = !1,
                    this._value = void 0,
                    this._deferreds = [],
                    h(e, this)
                }
                function s(e, t) {
                    for (; 3 === e._state;) e = e._value;
                    0 !== e._state ? (e._handled = !0, c(function() {
                        var i = 1 === e._state ? t.onFulfilled: t.onRejected;
                        if (null !== i) {
                            var r;
                            try {
                                r = i(e._value)
                            } catch(e) {
                                return void o(t.promise, e)
                            }
                            a(t.promise, r)
                        } else(1 === e._state ? a: o)(t.promise, e._value)
                    })) : e._deferreds.push(t)
                }
                function a(e, t) {
                    try {
                        if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                        if (t && ("object" == typeof t || "function" == typeof t)) {
                            var i = t.then;
                            if (t instanceof n) return e._state = 3,
                            e._value = t,
                            void l(e);
                            if ("function" == typeof i) return void h(function(e, t) {
                                return function() {
                                    e.apply(t, arguments)
                                }
                            } (i, t), e)
                        }
                        e._state = 1,
                        e._value = t,
                        l(e)
                    } catch(t) {
                        o(e, t)
                    }
                }
                function o(e, t) {
                    e._state = 2,
                    e._value = t,
                    l(e)
                }
                function l(e) {
                    2 === e._state && 0 === e._deferreds.length && c(function() {
                        e._handled || u(e._value)
                    });
                    for (var t = 0,
                    i = e._deferreds.length; t < i; t++) s(e, e._deferreds[t]);
                    e._deferreds = null
                }
                function h(e, t) {
                    var i = !1;
                    try {
                        e(function(e) {
                            i || (i = !0, a(t, e))
                        },
                        function(e) {
                            i || (i = !0, o(t, e))
                        })
                    } catch(e) {
                        if (i) return;
                        i = !0,
                        o(t, e)
                    }
                }
                var d = setTimeout,
                c = "function" == typeof t && t ||
                function(e) {
                    d(e, 0)
                },
                u = function(e) {
                    "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
                };
                n.prototype.
                catch = function(e) {
                    return this.then(null, e)
                },
                n.prototype.then = function(e, t) {
                    var i = new this.constructor(r);
                    return s(this, new
                    function(e, t, i) {
                        this.onFulfilled = "function" == typeof e ? e: null,
                        this.onRejected = "function" == typeof t ? t: null,
                        this.promise = i
                    } (e, t, i)),
                    i
                },
                n.all = function(e) {
                    var t = Array.prototype.slice.call(e);
                    return new n(function(e, i) {
                        function r(s, a) {
                            try {
                                if (a && ("object" == typeof a || "function" == typeof a)) {
                                    var o = a.then;
                                    if ("function" == typeof o) return void o.call(a,
                                    function(e) {
                                        r(s, e)
                                    },
                                    i)
                                }
                                t[s] = a,
                                0 == --n && e(t)
                            } catch(e) {
                                i(e)
                            }
                        }
                        if (0 === t.length) return e([]);
                        for (var n = t.length,
                        s = 0; s < t.length; s++) r(s, t[s])
                    })
                },
                n.resolve = function(e) {
                    return e && "object" == typeof e && e.constructor === n ? e: new n(function(t) {
                        t(e)
                    })
                },
                n.reject = function(e) {
                    return new n(function(t, i) {
                        i(e)
                    })
                },
                n.race = function(e) {
                    return new n(function(t, i) {
                        for (var r = 0,
                        n = e.length; r < n; r++) e[r].then(t, i)
                    })
                },
                n._setImmediateFn = function(e) {
                    c = e
                },
                n._setUnhandledRejectionFn = function(e) {
                    u = e
                },
                void 0 !== e && e.exports ? e.exports = n: i.Promise || (i.Promise = n)
            } (this)
        }).call(t, i(2).setImmediate)
    },
    function(e, t, i) { (function(e, r) {
            function n(e, t) {
                this._id = e,
                this._clearFn = t
            }
            var s = i(3).nextTick,
            a = Function.prototype.apply,
            o = Array.prototype.slice,
            l = {},
            h = 0;
            t.setTimeout = function() {
                return new n(a.call(setTimeout, window, arguments), clearTimeout)
            },
            t.setInterval = function() {
                return new n(a.call(setInterval, window, arguments), clearInterval)
            },
            t.clearTimeout = t.clearInterval = function(e) {
                e.close()
            },
            n.prototype.unref = n.prototype.ref = function() {},
            n.prototype.close = function() {
                this._clearFn.call(window, this._id)
            },
            t.enroll = function(e, t) {
                clearTimeout(e._idleTimeoutId),
                e._idleTimeout = t
            },
            t.unenroll = function(e) {
                clearTimeout(e._idleTimeoutId),
                e._idleTimeout = -1
            },
            t._unrefActive = t.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                    e._onTimeout && e._onTimeout()
                },
                t))
            },
            t.setImmediate = "function" == typeof e ? e: function(e) {
                var i = h++,
                r = !(arguments.length < 2) && o.call(arguments, 1);
                return l[i] = !0,
                s(function() {
                    l[i] && (r ? e.apply(null, r) : e.call(null), t.clearImmediate(i))
                }),
                i
            },
            t.clearImmediate = "function" == typeof r ? r: function(e) {
                delete l[e]
            }
        }).call(t, i(2).setImmediate, i(2).clearImmediate)
    },
    function(e, t) {
        function i() {
            c && h && (c = !1, h.length ? d = h.concat(d) : u = -1, d.length && r())
        }
        function r() {
            if (!c) {
                var e = a(i);
                c = !0;
                for (var t = d.length; t;) {
                    for (h = d, d = []; ++u < t;) h && h[u].run();
                    u = -1,
                    t = d.length
                }
                h = null,
                c = !1,
                o(e)
            }
        }
        function n(e, t) {
            this.fun = e,
            this.array = t
        }
        function s() {}
        var a, o, l = e.exports = {}; !
        function() {
            try {
                a = setTimeout
            } catch(e) {
                a = function() {
                    throw new Error("setTimeout is not defined")
                }
            }
            try {
                o = clearTimeout
            } catch(e) {
                o = function() {
                    throw new Error("clearTimeout is not defined")
                }
            }
        } ();
        var h, d = [],
        c = !1,
        u = -1;
        l.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
            d.push(new n(e, t)),
            1 !== d.length || c || a(r, 0)
        },
        n.prototype.run = function() {
            this.fun.apply(null, this.array)
        },
        l.title = "browser",
        l.browser = !0,
        l.env = {},
        l.argv = [],
        l.version = "",
        l.versions = {},
        l.on = s,
        l.addListener = s,
        l.once = s,
        l.off = s,
        l.removeListener = s,
        l.removeAllListeners = s,
        l.emit = s,
        l.binding = function(e) {
            throw new Error("process.binding is not supported")
        },
        l.cwd = function() {
            return "/"
        },
        l.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        },
        l.umask = function() {
            return 0
        }
    },
    function(e, t, i) {
        var r = i(5),
        n = {
            oldContainer: void 0,
            newContainer: void 0,
            newContainerLoading: void 0,
            extend: function(e) {
                return r.extend(this, e)
            },
            init: function(e, t) {
                var i = this;
                return this.oldContainer = e,
                this._newContainerPromise = t,
                this.deferred = r.deferred(),
                this.newContainerReady = r.deferred(),
                this.newContainerLoading = this.newContainerReady.promise,
                this.start(),
                this._newContainerPromise.then(function(e) {
                    i.newContainer = e,
                    i.newContainerReady.resolve()
                }),
                this.deferred.promise
            },
            done: function() {
                this.oldContainer.parentNode.removeChild(this.oldContainer),
                this.newContainer.style.visibility = "visible",
                this.deferred.resolve()
            },
            start: function() {}
        };
        e.exports = n
    },
    function(e, t) {
        var i = {
            getCurrentUrl: function() {
                return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search
            },
            cleanLink: function(e) {
                return e.replace(/#.*/, "")
            },
            xhrTimeout: 5e3,
            xhr: function(e) {
                var t = this.deferred(),
                i = new XMLHttpRequest;
                return i.onreadystatechange = function() {
                    if (4 === i.readyState) return 200 === i.status ? t.resolve(i.responseText) : t.reject(new Error("xhr: HTTP code is not 200"))
                },
                i.ontimeout = function() {
                    return t.reject(new Error("xhr: Timeout exceeded"))
                },
                i.open("GET", e),
                i.timeout = this.xhrTimeout,
                i.setRequestHeader("x-barba", "yes"),
                i.send(),
                t.promise
            },
            extend: function(e, t) {
                var i = Object.create(e);
                for (var r in t) t.hasOwnProperty(r) && (i[r] = t[r]);
                return i
            },
            deferred: function() {
                return new
                function() {
                    this.resolve = null,
                    this.reject = null,
                    this.promise = new Promise(function(e, t) {
                        this.resolve = e,
                        this.reject = t
                    }.bind(this))
                }
            },
            getPort: function(e) {
                var t = void 0 !== e ? e: window.location.port,
                i = window.location.protocol;
                return "" != t ? parseInt(t) : "http:" === i ? 80 : "https:" === i ? 443 : void 0
            }
        };
        e.exports = i
    },
    function(e, t, i) {
        var r = i(7),
        n = i(5),
        s = {
            namespace: null,
            extend: function(e) {
                return n.extend(this, e)
            },
            init: function() {
                var e = this;
                r.on("initStateChange",
                function(t, i) {
                    i && i.namespace === e.namespace && e.onLeave()
                }),
                r.on("newPageReady",
                function(t, i, r) {
                    e.container = r,
                    t.namespace === e.namespace && e.onEnter()
                }),
                r.on("transitionCompleted",
                function(t, i) {
                    t.namespace === e.namespace && e.onEnterCompleted(),
                    i && i.namespace === e.namespace && e.onLeaveCompleted()
                })
            },
            onEnter: function() {},
            onEnterCompleted: function() {},
            onLeave: function() {},
            onLeaveCompleted: function() {}
        };
        e.exports = s
    },
    function(e, t) {
        var i = {
            events: {},
            on: function(e, t) {
                this.events[e] = this.events[e] || [],
                this.events[e].push(t)
            },
            off: function(e, t) {
                e in this.events != !1 && this.events[e].splice(this.events[e].indexOf(t), 1)
            },
            trigger: function(e) {
                if (e in this.events != !1) for (var t = 0; t < this.events[e].length; t++) this.events[e][t].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        };
        e.exports = i
    },
    function(e, t, i) {
        var r = i(5),
        n = {
            data: {},
            extend: function(e) {
                return r.extend(this, e)
            },
            set: function(e, t) {
                this.data[e] = t
            },
            get: function(e) {
                return this.data[e]
            },
            reset: function() {
                this.data = {}
            }
        };
        e.exports = n
    },
    function(e, t) {
        var i = {
            history: [],
            add: function(e, t) {
                t || (t = void 0),
                this.history.push({
                    url: e,
                    namespace: t
                })
            },
            currentStatus: function() {
                return this.history[this.history.length - 1]
            },
            prevStatus: function() {
                var e = this.history;
                return e.length < 2 ? null: e[e.length - 2]
            }
        };
        e.exports = i
    },
    function(e, t, i) {
        var r = i(5),
        n = i(7),
        s = i(11),
        a = i(8),
        o = i(9),
        l = {
            Dom: i(12),
            History: o,
            Cache: a,
            cacheEnabled: !0,
            transitionProgress: !1,
            ignoreClassLink: "no-barba",
            start: function() {
                this.init()
            },
            init: function() {
                var e = this.Dom.getContainer();
                this.Dom.getWrapper().setAttribute("aria-live", "polite"),
                this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(e)),
                n.trigger("initStateChange", this.History.currentStatus()),
                n.trigger("newPageReady", this.History.currentStatus(), {},
                e, this.Dom.currentHTML),
                n.trigger("transitionCompleted", this.History.currentStatus()),
                this.bindEvents()
            },
            bindEvents: function() {
                document.addEventListener("click", this.onLinkClick.bind(this)),
                window.addEventListener("popstate", this.onStateChange.bind(this))
            },
            getCurrentUrl: function() {
                return r.cleanLink(r.getCurrentUrl())
            },
            goTo: function(e) {
                window.history.pushState(null, null, e),
                this.onStateChange()
            },
            forceGoTo: function(e) {
                window.location = e
            },
            load: function(e) {
                var t, i = r.deferred(),
                n = this;
                return (t = this.Cache.get(e)) || (t = r.xhr(e), this.Cache.set(e, t)),
                t.then(function(e) {
                    var t = n.Dom.parseResponse(e);
                    n.Dom.putContainer(t),
                    n.cacheEnabled || n.Cache.reset(),
                    i.resolve(t)
                },
                function() {
                    n.forceGoTo(e),
                    i.reject()
                }),
                i.promise
            },
            getHref: function(e) {
                if (e) return e.getAttribute && "string" == typeof e.getAttribute("xlink:href") ? e.getAttribute("xlink:href") : "string" == typeof e.href ? e.href: void 0
            },
            onLinkClick: function(e) {
                for (var t = e.target; t && !this.getHref(t);) t = t.parentNode;
                if (this.preventCheck(e, t)) {
                    e.stopPropagation(),
                    e.preventDefault(),
                    n.trigger("linkClicked", t, e);
                    var i = this.getHref(t);
                    this.goTo(i)
                }
            },
            preventCheck: function(e, t) {
                if (!window.history.pushState) return ! 1;
                var i = this.getHref(t);
                return ! (!t || !i) && (!(e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) && ((!t.target || "_blank" !== t.target) && (window.location.protocol === t.protocol && window.location.hostname === t.hostname && (r.getPort() === r.getPort(t.port) && (!(i.indexOf("#") > -1) && ((!t.getAttribute || "string" != typeof t.getAttribute("download")) && (r.cleanLink(i) != r.cleanLink(location.href) && !t.classList.contains(this.ignoreClassLink))))))))
            },
            getTransition: function() {
                return s
            },
            onStateChange: function() {
                var e = this.getCurrentUrl();
                if (this.transitionProgress && this.forceGoTo(e), this.History.currentStatus().url === e) return ! 1;
                this.History.add(e);
                var t = this.load(e),
                i = Object.create(this.getTransition());
                this.transitionProgress = !0,
                n.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
                var r = i.init(this.Dom.getContainer(), t);
                t.then(this.onNewContainerLoaded.bind(this)),
                r.then(this.onTransitionEnd.bind(this))
            },
            onNewContainerLoaded: function(e) {
                this.History.currentStatus().namespace = this.Dom.getNamespace(e),
                n.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus(), e, this.Dom.currentHTML)
            },
            onTransitionEnd: function() {
                this.transitionProgress = !1,
                n.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus())
            }
        };
        e.exports = l
    },
    function(e, t, i) {
        var r = i(4).extend({
            start: function() {
                this.newContainerLoading.then(this.finish.bind(this))
            },
            finish: function() {
                document.body.scrollTop = 0,
                this.done()
            }
        });
        e.exports = r
    },
    function(e, t) {
        var i = {
            dataNamespace: "namespace",
            wrapperId: "barba-wrapper",
            containerClass: "barba-container",
            currentHTML: document.documentElement.innerHTML,
            parseResponse: function(e) {
                this.currentHTML = e;
                var t = document.createElement("div");
                t.innerHTML = e;
                var i = t.querySelector("title");
                return i && (document.title = i.textContent),
                this.getContainer(t)
            },
            getWrapper: function() {
                var e = document.getElementById(this.wrapperId);
                if (!e) throw new Error("Barba.js: wrapper not found!");
                return e
            },
            getContainer: function(e) {
                if (e || (e = document.body), !e) throw new Error("Barba.js: DOM not ready!");
                var t = this.parseContainer(e);
                if (t && t.jquery && (t = t[0]), !t) throw new Error("Barba.js: no container found");
                return t
            },
            getNamespace: function(e) {
                return e && e.dataset ? e.dataset[this.dataNamespace] : e ? e.getAttribute("data-" + this.dataNamespace) : null
            },
            putContainer: function(e) {
                e.style.visibility = "hidden";
                this.getWrapper().appendChild(e)
            },
            parseContainer: function(e) {
                return e.querySelector("." + this.containerClass)
            }
        };
        e.exports = i
    },
    function(e, t, i) {
        var r = i(5),
        n = i(10),
        s = {
            ignoreClassLink: "no-barba-prefetch",
            init: function() {
                if (!window.history.pushState) return ! 1;
                document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)),
                document.body.addEventListener("touchstart", this.onLinkEnter.bind(this))
            },
            onLinkEnter: function(e) {
                for (var t = e.target; t && !n.getHref(t);) t = t.parentNode;
                if (t && !t.classList.contains(this.ignoreClassLink)) {
                    var i = n.getHref(t);
                    if (n.preventCheck(e, t) && !n.Cache.get(i)) {
                        var s = r.xhr(i);
                        n.Cache.set(i, s)
                    }
                }
            }
        };
        e.exports = s
    }])
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["ScrollMagic"], t) : t("object" == typeof exports ? require("scrollmagic") : e.ScrollMagic || e.jQuery && e.jQuery.ScrollMagic)
} (this,
function(e) {
    "use strict";
    var t = "0.85em",
    i = "9999",
    r = e._util,
    n = 0;
    e.Scene.extend(function() {
        var e, t = this;
        t.addIndicators = function(i) {
            if (!e) {
                i = r.extend({},
                {
                    name: "",
                    indent: 0,
                    parent: void 0,
                    colorStart: "green",
                    colorEnd: "red",
                    colorTrigger: "blue"
                },
                i),
                n++,
                e = new s(t, i),
                t.on("add.plugin_addIndicators", e.add),
                t.on("remove.plugin_addIndicators", e.remove),
                t.on("destroy.plugin_addIndicators", t.removeIndicators),
                t.controller() && e.add()
            }
            return t
        },
        t.removeIndicators = function() {
            return e && (e.remove(), this.off("*.plugin_addIndicators"), e = void 0),
            t
        }
    }),
    e.Controller.addOption("addIndicators", !1),
    e.Controller.extend(function() {
        var t = this,
        i = t.info(),
        n = i.container,
        s = i.isDocument,
        a = i.vertical,
        o = {
            groups: []
        };
        this._indicators = o;
        var l = function() {
            o.updateBoundsPositions()
        },
        h = function() {
            o.updateTriggerGroupPositions()
        };
        return n.addEventListener("resize", h),
        s || (window.addEventListener("resize", h), window.addEventListener("scroll", h)),
        n.addEventListener("resize", l),
        n.addEventListener("scroll", l),
        this._indicators.updateBoundsPositions = function(e) {
            for (var t, i, s, l = e ? [r.extend({},
            e.triggerGroup, {
                members: [e]
            })] : o.groups, h = l.length, d = {},
            c = a ? "left": "top", u = a ? "width": "height", p = a ? r.get.scrollLeft(n) + r.get.width(n) - 15 : r.get.scrollTop(n) + r.get.height(n) - 15; h--;) for (s = l[h], t = s.members.length, i = r.get[u](s.element.firstChild); t--;) d[c] = p - i,
            r.css(s.members[t].bounds, d)
        },
        this._indicators.updateTriggerGroupPositions = function(e) {
            for (var i, l, h, d, c, u = e ? [e] : o.groups, p = u.length, f = s ? document.body: n, m = s ? {
                top: 0,
                left: 0
            }: r.get.offset(f, !0), g = a ? r.get.width(n) - 15 : r.get.height(n) - 15, v = a ? "width": "height", _ = a ? "Y": "X"; p--;) i = u[p],
            l = i.element,
            h = i.triggerHook * t.info("size"),
            d = r.get[v](l.firstChild.firstChild),
            c = h > d ? "translate" + _ + "(-100%)": "",
            r.css(l, {
                top: m.top + (a ? h: g - i.members[0].options.indent),
                left: m.left + (a ? g - i.members[0].options.indent: h)
            }),
            r.css(l.firstChild.firstChild, {
                "-ms-transform": c,
                "-webkit-transform": c,
                transform: c
            })
        },
        this._indicators.updateTriggerGroupLabel = function(e) {
            var t = "trigger" + (e.members.length > 1 ? "": " " + e.members[0].options.name),
            i = e.element.firstChild.firstChild;
            i.textContent !== t && (i.textContent = t, a && o.updateBoundsPositions())
        },
        this.addScene = function(i) {
            this._options.addIndicators && i instanceof e.Scene && i.controller() === t && i.addIndicators(),
            this.$super.addScene.apply(this, arguments)
        },
        this.destroy = function() {
            n.removeEventListener("resize", h),
            s || (window.removeEventListener("resize", h), window.removeEventListener("scroll", h)),
            n.removeEventListener("resize", l),
            n.removeEventListener("scroll", l),
            this.$super.destroy.apply(this, arguments)
        },
        t
    });
    var s = function(e, t) {
        var i, s, o = this,
        l = a.bounds(),
        h = a.start(t.colorStart),
        d = a.end(t.colorEnd),
        c = t.parent && r.get.elements(t.parent)[0];
        t.name = t.name || n,
        h.firstChild.textContent += " " + t.name,
        d.textContent += " " + t.name,
        l.appendChild(h),
        l.appendChild(d),
        o.options = t,
        o.bounds = l,
        o.triggerGroup = void 0,
        this.add = function() {
            s = e.controller(),
            i = s.info("vertical");
            var t = s.info("isDocument");
            c || (c = t ? document.body: s.info("container")),
            t || "static" !== r.css(c, "position") || r.css(c, {
                position: "relative"
            }),
            e.on("change.plugin_addIndicators", p),
            e.on("shift.plugin_addIndicators", u),
            y(),
            g(),
            setTimeout(function() {
                s._indicators.updateBoundsPositions(o)
            },
            0)
        },
        this.remove = function() {
            if (o.triggerGroup) {
                if (e.off("change.plugin_addIndicators", p), e.off("shift.plugin_addIndicators", u), o.triggerGroup.members.length > 1) {
                    var t = o.triggerGroup;
                    t.members.splice(t.members.indexOf(o), 1),
                    s._indicators.updateTriggerGroupLabel(t),
                    s._indicators.updateTriggerGroupPositions(t),
                    o.triggerGroup = void 0
                } else _();
                m()
            }
        };
        var u = function() {
            g()
        },
        p = function(e) {
            "triggerHook" === e.what && y()
        },
        f = function() {
            var e = s.info("vertical");
            r.css(h.firstChild, {
                "border-bottom-width": e ? 1 : 0,
                "border-right-width": e ? 0 : 1,
                bottom: e ? -1 : t.indent,
                right: e ? t.indent: -1,
                padding: e ? "0 8px": "2px 4px"
            }),
            r.css(d, {
                "border-top-width": e ? 1 : 0,
                "border-left-width": e ? 0 : 1,
                top: e ? "100%": "",
                right: e ? t.indent: "",
                bottom: e ? "": t.indent,
                left: e ? "": "100%",
                padding: e ? "0 8px": "2px 4px"
            }),
            c.appendChild(l)
        },
        m = function() {
            l.parentNode.removeChild(l)
        },
        g = function() {
            l.parentNode !== c && f();
            var t = {};
            t[i ? "top": "left"] = e.triggerPosition(),
            t[i ? "height": "width"] = e.duration(),
            r.css(l, t),
            r.css(d, {
                display: e.duration() > 0 ? "": "none"
            })
        },
        v = function() {
            var n = a.trigger(t.colorTrigger),
            l = {};
            l[i ? "right": "bottom"] = 0,
            l[i ? "border-top-width": "border-left-width"] = 1,
            r.css(n.firstChild, l),
            r.css(n.firstChild.firstChild, {
                padding: i ? "0 8px 3px 8px": "3px 4px"
            }),
            document.body.appendChild(n);
            var h = {
                triggerHook: e.triggerHook(),
                element: n,
                members: [o]
            };
            s._indicators.groups.push(h),
            o.triggerGroup = h,
            s._indicators.updateTriggerGroupLabel(h),
            s._indicators.updateTriggerGroupPositions(h)
        },
        _ = function() {
            s._indicators.groups.splice(s._indicators.groups.indexOf(o.triggerGroup), 1),
            o.triggerGroup.element.parentNode.removeChild(o.triggerGroup.element),
            o.triggerGroup = void 0
        },
        y = function() {
            var t = e.triggerHook();
            if (! (o.triggerGroup && Math.abs(o.triggerGroup.triggerHook - t) < 1e-4)) {
                for (var i, r = s._indicators.groups,
                n = r.length; n--;) if (i = r[n], Math.abs(i.triggerHook - t) < 1e-4) return o.triggerGroup && (1 === o.triggerGroup.members.length ? _() : (o.triggerGroup.members.splice(o.triggerGroup.members.indexOf(o), 1), s._indicators.updateTriggerGroupLabel(o.triggerGroup), s._indicators.updateTriggerGroupPositions(o.triggerGroup))),
                i.members.push(o),
                o.triggerGroup = i,
                void s._indicators.updateTriggerGroupLabel(i);
                if (o.triggerGroup) {
                    if (1 === o.triggerGroup.members.length) return o.triggerGroup.triggerHook = t,
                    void s._indicators.updateTriggerGroupPositions(o.triggerGroup);
                    o.triggerGroup.members.splice(o.triggerGroup.members.indexOf(o), 1),
                    s._indicators.updateTriggerGroupLabel(o.triggerGroup),
                    s._indicators.updateTriggerGroupPositions(o.triggerGroup),
                    o.triggerGroup = void 0
                }
                v()
            }
        }
    },
    a = {
        start: function(e) {
            var t = document.createElement("div");
            t.textContent = "start",
            r.css(t, {
                position: "absolute",
                overflow: "visible",
                "border-width": 0,
                "border-style": "solid",
                color: e,
                "border-color": e
            });
            var i = document.createElement("div");
            return r.css(i, {
                position: "absolute",
                overflow: "visible",
                width: 0,
                height: 0
            }),
            i.appendChild(t),
            i
        },
        end: function(e) {
            var t = document.createElement("div");
            return t.textContent = "end",
            r.css(t, {
                position: "absolute",
                overflow: "visible",
                "border-width": 0,
                "border-style": "solid",
                color: e,
                "border-color": e
            }),
            t
        },
        bounds: function() {
            var e = document.createElement("div");
            return r.css(e, {
                position: "absolute",
                overflow: "visible",
                "white-space": "nowrap",
                "pointer-events": "none",
                "font-size": t
            }),
            e.style.zIndex = i,
            e
        },
        trigger: function(e) {
            var n = document.createElement("div");
            n.textContent = "trigger",
            r.css(n, {
                position: "relative"
            });
            var s = document.createElement("div");
            r.css(s, {
                position: "absolute",
                overflow: "visible",
                "border-width": 0,
                "border-style": "solid",
                color: e,
                "border-color": e
            }),
            s.appendChild(n);
            var a = document.createElement("div");
            return r.css(a, {
                position: "fixed",
                overflow: "visible",
                "white-space": "nowrap",
                "pointer-events": "none",
                "font-size": t
            }),
            a.style.zIndex = i,
            a.appendChild(s),
            a
        }
    }
}),
function(e) {
    e(document).ready(function() {
        function t() {
            T += (b - T) * C,
            S += (x - S) * C,
            rotate = "rotateY(" + -1 * T + "deg) rotateX(" + S + "deg) translateZ(-150px)",
            e(".alpha-zio__inner").css({
                "-webit-transform": rotate,
                "-moz-transform": rotate,
                transform: rotate
            }),
            window.requestAnimationFrame(t)
        }
        function i() {
            T += (b - T) * C,
            S += (x - S) * C,
            rotate = "rotateY(" + -1 * T + "deg) rotateX(" + S + "deg) translateZ(-300px)",
            e(".works__imgs.rotate").css({
                "-webit-transform": rotate,
                "-moz-transform": rotate,
                transform: rotate
            }),
            window.requestAnimationFrame(i)
        }
        function r() {
            T += (b - T) * C,
            S += (x - S) * C,
            rotate = "rotateY(" + -1 * T + "deg) rotateX(" + S + "deg)",
            e(".me").css({
                "-webit-transform": rotate,
                "-moz-transform": rotate,
                transform: rotate
            }),
            window.requestAnimationFrame(r)
        }
        function n() {
            T += (b - T) * C,
            S += (x - S) * C,
            rotate = "rotateY(" + -1 * T + "deg) rotateX(" + S + "deg)",
            e(".loader span").css({
                "-webit-transform": rotate,
                "-moz-transform": rotate,
                transform: rotate
            }),
            window.requestAnimationFrame(n)
        }
        var s = viewportSize.getWidth();
        e("#barba-wrapper").mousedown(function() {
            e(this).mousemove(function(t) {
                e(".cursor").css({
                    top: t.clientY,
                    left: t.clientX
                })
            })
        }),
        e("#barba-wrapper").mousemove(function(t) {
            e(".cursor").css({
                top: t.clientY,
                left: t.clientX
            })
        });
        var a;
        Barba.Dispatcher.on("linkClicked",
        function(e) {
            a = e
        }),
        Barba.Dispatcher.on("newPageReady",
        function(t, i, r) {
            e("a:not(.view-site)").closest("div,li,span,u").addClass("js-cursor-hover"),
            e(".works__nav > div, .scroll").addClass("js-cursor-hover"),
            e(".js-cursor-hover").on("mouseenter",
            function() {
                e(".cursor").addClass("is-hover")
            }),
            e(".js-cursor-hover").on("mouseleave",
            function() {
                e(".cursor").removeClass("is-hover")
            }),
            e("a").on("click",
            function(e) { (e.currentTarget.href === window.location.href || Barba.Pjax.transitionProgress) && (e.preventDefault(), e.stopPropagation())
            });
            var n = Barba.HistoryManager.currentStatus().namespace;
            e(".main-menu a").each(function() {
                e(this).data("page") == n && e(this).addClass("is-active")
            }),
            e(".works__titles").on("mouseenter",
            function() {
                e(".cursor").addClass("grab")
            }),
            e(".works__titles").on("mouseleave",
            function() {
                e(".cursor").removeClass("grab")
            }),
            e(".work-mobile-swiper").on("mouseenter",
            function() {
                e(".cursor").addClass("swipe")
            }),
            e(".work-mobile-swiper").on("mouseleave",
            function() {
                e(".cursor").removeClass("swipe")
            }),
            e(".view-site").on("mouseenter",
            function() {
                e(".cursor").addClass("site")
            }),
            e(".view-site").on("mouseleave",
            function() {
                e(".cursor").removeClass("site")
            }),
            e(".hamburger").on("click",
            function() {
                e(this).toggleClass("is-active"),
                e(".main-menu").toggleClass("is-open")
            })
        });
        var o = Barba.BaseTransition.extend({
            start: function() {
                Promise.all([this.newContainerLoading, this.pageOut()]).then(this.pageIn.bind(this))
            },
            pageOut: function() {
                var t = Barba.Utils.deferred();
                e("body").addClass("no-scroll");
                var i = new TimelineMax;
                return i.fromTo(".section-content", .6, {
                    autoAlpha: 1
                },
                {
                    autoAlpha: 0,
                    ease: Power4.easeOut
                }),
                i.fromTo(".loader", .6, {
                    scaleX: 0
                },
                {
                    scaleX: 1,
                    transformOrigin: "right center",
                    ease: Power4.easeOut
                },
                "-=0.4"),
                i.eventCallback("onComplete",
                function() {
                    t.resolve()
                }),
                t.promise
            },
            pageIn: function() {
                var t = this,
                i = (e(this.newContainer), new TimelineMax);
                i.fromTo(".loader", .6, {
                    scaleX: 1
                },
                {
                    scaleX: 0,
                    transformOrigin: "left center",
                    ease: Power4.easeOut
                }),
                i.fromTo(".section-content", .6, {
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1,
                    ease: Power4.easeOut
                },
                "-=0.4"),
                i.eventCallback("onStart",
                function() {
                    t.done(),
                    e("body").removeClass("no-scroll")
                })
            }
        }),
        l = Barba.BaseTransition.extend({
            start: function() {
                Promise.all([this.newContainerLoading, this.clearPage()]).then(this.showWork.bind(this))
            },
            clearPage: function() {
                var t = Barba.Utils.deferred();
                e(".works__imgs__item__bg").css("pointer-events", "none"),
                e("body").addClass("no-scroll"),
                e(".works__imgs").removeClass("rotate"),
                e(".swiper-slide-active .works__imgs__item__bg").clone().appendTo(".works__imgs").addClass("work-header"),
                e(".work-header").removeClass("works__imgs__item__bg");
                var i = "rotateY(0deg) rotateX(0deg)";
                e(".works__imgs").css({
                    "-webkit-transition": "-webkit-transform 0.5s ease",
                    transition: "transform 0.5s ease",
                    "-webit-transform": i,
                    "-moz-transform": i,
                    transform: i
                }),
                e(".work-bg").removeClass("preload").css({
                    width: "100%"
                }),
                e(".whity").css({
                    opacity: 0
                });
                var r = new TimelineMax;
                return r.fromTo(".works__titles", .9, {
                    autoAlpha: 1
                },
                {
                    autoAlpha: 0,
                    ease: Power4.easeOut
                }),
                r.fromTo(".works__controls", .9, {
                    autoAlpha: 1
                },
                {
                    autoAlpha: 0,
                    ease: Power4.easeOut
                },
                "-=0.8"),
                r.fromTo(".alpha-zio", .9, {
                    autoAlpha: 1
                },
                {
                    autoAlpha: 0,
                    ease: Power4.easeOut
                },
                "-=0.8"),
                r.to(".section-footer", .9, {
                    autoAlpha: 0,
                    ease: Power4.easeOut
                },
                "-=0.8"),
                r.to(".work-header", .9, {
                    top: 0,
                    height: "100%",
                    width: "100%",
                    ease: Power4.easeOut
                },
                "-=0.2"),
                r.eventCallback("onComplete",
                function() {
                    t.resolve()
                }),
                t.promise
            },
            showWork: function() {
                var t = this,
                i = (e(this.newContainer), new TimelineMax);
                i.fromTo(".section-content", .9, {
                    autoAlpha: "1"
                },
                {
                    autoAlpha: "1",
                    ease: Power4.easeOut
                }),
                i.eventCallback("onStart",
                function() {
                    t.done()
                }),
                i.eventCallback("onComplete",
                function() {
                    e("body").removeClass("no-scroll")
                })
            }
        }),
        h = Barba.BaseTransition.extend({
            start: function() {
                Promise.all([this.newContainerLoading, this.scrollTop()]).then(this.workIn.bind(this))
            },
            scrollTop: function() {
                var t = Barba.Utils.deferred(),
                i = new TimelineMax;
                if (i.set(".works__imgs__item__bg__inner span", {
                    width: "100%"
                }), i.to(window, 2.5, {
                    scrollTo: {
                        y: 0,
                        autoKill: !1
                    },
                    ease: Power1.easeInOut
                }), i.fromTo(".work__header__title h1", .6, {
                    autoAlpha: 1,
                    y: 0
                },
                {
                    autoAlpha: 0,
                    y: -80,
                    ease: Power4.easeOut
                },
                "-=0.2"), i.fromTo(".work__header__title p", .6, {
                    autoAlpha: 1,
                    y: 0
                },
                {
                    autoAlpha: 0,
                    y: -80,
                    ease: Power4.easeOut
                },
                "-=0.4"), i.fromTo(".scroll", .6, {
                    autoAlpha: 1,
                    y: 0
                },
                {
                    autoAlpha: 0,
                    y: -80,
                    ease: Power4.easeOut
                },
                "-=0.4"), i.fromTo(".works__imgs__item__bg__inner span", .6, {
                    scaleX: 0
                },
                {
                    scaleX: 1,
                    transformOrigin: "left center",
                    ease: Power4.easeOut
                },
                "-=0.4"), e(a).hasClass("work-nav")) {
                    var r = e(a).data("color");
                    i.to(".barba-container", .6, {
                        backgroundColor: r,
                        ease: Power4.easeOut
                    },
                    "-=0.4")
                }
                return i.eventCallback("onComplete",
                function() {
                    t.resolve()
                }),
                t.promise
            },
            workIn: function() {
                var t = this,
                i = (e(this.newContainer), new TimelineMax);
                i.set(".works__imgs__item__bg__inner span", {
                    width: "100%"
                }),
                i.fromTo(".works__imgs__item__bg__inner span", .6, {
                    scaleX: 1
                },
                {
                    scaleX: 0,
                    transformOrigin: "right center",
                    ease: Power4.easeIn
                }),
                i.eventCallback("onStart",
                function() {
                    t.done()
                }),
                i.eventCallback("onComplete",
                function() {})
            }
        });
        Barba.Pjax.getTransition = function() {
            t = o;
            if (e(a).hasClass("work-link")) t = l;
            else if (e(a).hasClass("work-nav")) t = h;
            else if ("work-item" === Barba.HistoryManager.prevStatus().namespace && "work-item" === Barba.HistoryManager.currentStatus().namespace) var t = h;
            return t
        };
        var d = new TimelineMax;
        d.pause();
        var c = Barba.BaseView.extend({
            namespace: "homepage",
            onEnter: function() {
                d.play()
            },
            onEnterCompleted: function() {
                d.fromTo(".front-intro", .9, {
                    autoAlpha: 0,
                    delay: .8
                },
                {
                    autoAlpha: 1,
                    ease: Power2.easeOut
                }),
                d.fromTo(".front-intro span", .9, {
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1,
                    ease: Power2.easeOut
                },
                "-=0.8"),
                d.fromTo(".alpha-zio span", .9, {
                    scaleX: 1.1
                },
                {
                    scaleX: 0,
                    transformOrigin: "center right",
                    ease: Power2.easeOut
                },
                "-=0.8"),
                d.eventCallback("onComplete",
                function() {
                    e(".front-intro").addClass("loaded")
                })
            },
            onLeave: function() {
                d.reverse()
            },
            onLeaveCompleted: function() {
                d.pause()
            }
        }),
        u = new TimelineMax;
        u.pause();
        var p = Barba.BaseView.extend({
            namespace: "about",
            onEnter: function() {
                u.play()
            },
            onEnterCompleted: function() {
                u.fromTo(".about-content__img", .9, {
                    autoAlpha: 0,
                    x: 50
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    ease: Power2.easeOut
                }),
                u.fromTo(".about-content__text", .9, {
                    autoAlpha: 0,
                    x: -50
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    ease: Power2.easeOut
                },
                "-=0.8"),
                u.fromTo(".alpha-zio span", .9, {
                    scaleX: 1.1
                },
                {
                    scaleX: 0,
                    transformOrigin: "center right",
                    ease: Power2.easeOut
                },
                "-=0.8");
                var t = e(".me").width(),
                i = e(".me").height(),
                r = t / 2,
                n = i / 2,
                s = e(".me").offset(),
                a = s.left + r,
                o = s.top + n;
                e(window).on("mousemove",
                function(s) {
                    var l = Math.max( - 1 * t, Math.min(t, s.clientX - a)),
                    h = Math.max( - 1 * i, Math.min(i, s.clientY - o));
                    l < -1 * r && h < -1 * n ? e(".me").css("background-position", "left top") : l < -1 * r && h > -1 * n && h < n ? e(".me").css("background-position", "left center") : l < -1 * r && h > n ? e(".me").css("background-position", "left bottom") : l > r && h < -1 * n ? e(".me").css("background-position", "right top") : l > r && h > -1 * n && h < n ? e(".me").css("background-position", "right center") : l > r && h > n ? e(".me").css("background-position", "right bottom") : l > -1 * r && l < r && h < -1 * n ? e(".me").css("background-position", "center top") : l > -1 * r && l < r && h > n ? e(".me").css("background-position", "center bottom") : e(".me").css("background-position", "center center")
                })
            },
            onLeave: function() {
                u.reverse()
            },
            onLeaveCompleted: function() {
                u.pause()
            }
        }),
        f = new TimelineMax;
        f.pause();
        e(".barba-container").css("background-color");
        var m = Barba.BaseView.extend({
            namespace: "work",
            onEnter: function() {
                var t = e(".works__titles__item").length - 1,
                i = new Swiper(".works__titles", {
                    init: !1,
                    direction: "vertical",
                    speed: 1e3,
                    slidesPerView: 5,
                    centeredSlides: !0,
                    mousewheel: !0,
                    navigation: {
                        nextEl: ".works__nav__next",
                        prevEl: ".works__nav__prev"
                    },
                    pagination: {
                        el: ".works__pag",
                        type: "fraction"
                    }
                });
                e(".works__titles__item").on("click",
                function() {
                    i.slideTo(e(this).index())
                });
                var r = new Swiper(".works__imgs", {
                    effect: "fade",
                    speed: 1e3,
                    mousewheel: !0
                });
                i.controller.control = r,
                r.controller.control = i;
                var n = e(".works__imgs__item a");
                if (n.on("mouseover",
                function() {
                    if (e(this).closest(".works__imgs__item").hasClass("swiper-slide-active")) {
                        var t = e(this).data("color");
                        e(".work-bg.preload").css({
                            "background-color": t,
                            width: "40%"
                        })
                    }
                }), n.on("mouseout",
                function() {
                    e(".work-bg.preload").css({
                        width: "0"
                    })
                }), s <= 980) {
                    e(".works__titles__item span").on("click",
                    function() {
                        if (e(this).closest(".works__titles__item").hasClass("swiper-slide-active")) {
                            var t = e(".works__imgs__item.swiper-slide-active a").attr("href");
                            Barba.Pjax.goTo(t)
                        }
                    })
                }
                var a = new TweenMax.fromTo(".works__progress span", 8, {
                    scaleX: 0,
                    paused: !0
                },
                {
                    scaleX: 1,
                    transformOrigin: "center left",
                    ease: Power0.easeNone
                });
                a.eventCallback("onComplete",
                function() {
                    i.activeIndex < t ? i.slideNext(1e3) : i.slideTo(0, 1e3),
                    a.restart()
                });
                var o = new TimelineMax;
                o.pause(),
                o.fromTo(".whity", .5, {
                    scaleX: 0
                },
                {
                    scaleX: 1,
                    transformOrigin: "center left",
                    ease: Power4.easeIn
                }),
                o.fromTo(".whity", .5, {
                    scaleX: 1
                },
                {
                    scaleX: 0,
                    transformOrigin: "center right",
                    ease: Power4.easeOut
                }),
                i.on("slideChange",
                function() {
                    a.restart(),
                    o.restart()
                }),
                i.on("init",
                function() {
                    o.play()
                }),
                i.init(),
                f.play(),
                f.eventCallback("onComplete",
                function() {
                    a.play()
                })
            },
            onEnterCompleted: function() {
                f.fromTo(".works__titles", .9, {
                    autoAlpha: 0,
                    x: 50
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    ease: Power2.easeOut
                }),
                f.fromTo(".works__imgs", .9, {
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1,
                    ease: Power2.easeOut
                },
                "-=0.9"),
                f.fromTo(".works .alpha-zio span", .9, {
                    scaleX: 1.1
                },
                {
                    scaleX: 0,
                    transformOrigin: "center right",
                    ease: Power2.easeOut
                },
                "-=0.7"),
                f.fromTo(".works__controls", .9, {
                    autoAlpha: 0,
                    x: -50
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    ease: Power2.easeOut
                },
                "-=0.9")
            },
            onLeave: function() {
                0 == e(a).hasClass("work-link") && f.reverse()
            },
            onLeaveCompleted: function() {
                f.eventCallback("onReverseComplete",
                function() {
                    TweenMax.killAll()
                }),
                f.pause(),
                e(".cursor").removeClass("grab")
            }
        }),
        g = new TimelineMax;
        g.pause();
        var v = new ScrollMagic.Controller,
        _ = Barba.BaseView.extend({
            namespace: "work-item",
            onEnter: function() {
                if (g.play(), e(a).hasClass("work-link")) {
                    var t = e(a).data("color");
                    e(".barba-container").css("background-color", t)
                }
                new Swiper(".work-mobile-swiper", {
                    loop: !0,
                    pagination: {
                        el: ".work-mobile__pag",
                        type: "bullets",
                        clickable: !0
                    },
                    autoplay: {
                        delay: 3e3,
                        disableOnInteraction: !1
                    }
                })
            },
            onEnterCompleted: function() {
                g.fromTo(".work__header__title h1", .9, {
                    autoAlpha: "0",
                    y: 80
                },
                {
                    autoAlpha: "1",
                    y: 0,
                    ease: Power2.easeOut
                }),
                g.fromTo(".work__header__title p", .9, {
                    autoAlpha: "0",
                    y: 80
                },
                {
                    autoAlpha: "1",
                    y: 0,
                    ease: Power2.easeOut
                },
                "-=0.7"),
                g.fromTo(".work__header .scroll", .9, {
                    autoAlpha: "0",
                    y: 80
                },
                {
                    autoAlpha: "1",
                    y: 0,
                    ease: Power2.easeOut
                },
                "-=0.7"),
                e(".scroll").on("click",
                function() {
                    new TweenMax.to(window, .6, {
                        scrollTo: {
                            y: 500,
                            autoKill: !1
                        },
                        ease: Power2.easeOut
                    })
                });
                var t = e(".work__header .works__imgs__item__bg__inner"),
                i = TweenMax.fromTo(t, 1, {
                    y: "0"
                },
                {
                    y: "60px"
                }),
                r = (new ScrollMagic.Scene({
                    triggerElement: ".section-content",
                    duration: "150%"
                }).setTween(i).triggerHook(0).addTo(v), e(".work__header__title")),
                n = TweenMax.fromTo(r, 1, {
                    y: "-35%"
                },
                {
                    y: "-65%"
                }),
                s = (new ScrollMagic.Scene({
                    triggerElement: ".section-content",
                    duration: "150%"
                }).setTween(n).triggerHook(0).addTo(v), e(".col-right img")),
                a = TweenMax.fromTo(s, 1, {
                    y: "70px"
                },
                {
                    y: "-70px"
                }),
                o = (new ScrollMagic.Scene({
                    triggerElement: ".work__screen__imgs",
                    duration: "200%"
                }).setTween(a).triggerHook(.6).addTo(v), e(".col-left")),
                l = TweenMax.fromTo(o, 1, {
                    y: "-70px"
                },
                {
                    y: "70px"
                });
                new ScrollMagic.Scene({
                    triggerElement: ".work__screen__imgs",
                    duration: "200%"
                }).setTween(l).triggerHook(.6).addTo(v)
            },
            onLeave: function() {},
            onLeaveCompleted: function() {}
        }),
        y = new TimelineMax;
        y.pause();
        var w = Barba.BaseView.extend({
            namespace: "contact",
            onEnter: function() {
                y.play()
            },
            onEnterCompleted: function() {
                y.fromTo(".contact-content h1", .9, {
                    autoAlpha: 0,
                    x: 50
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    ease: Power2.easeOut
                }),
                y.fromTo(".contact-content p", .9, {
                    autoAlpha: 0,
                    x: 50
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    ease: Power2.easeOut
                },
                "-=0.8"),
                y.fromTo(".contact .alpha-zio span", .9, {
                    scaleX: 1.1
                },
                {
                    scaleX: 0,
                    transformOrigin: "center right",
                    ease: Power2.easeOut
                },
                "-=0.8")
            },
            onLeave: function() {
                y.reverse()
            },
            onLeaveCompleted: function() {
                y.pause()
            }
        });
        c.init(),
        m.init(),
        _.init(),
        p.init(),
        w.init();
        var b = 0,
        x = 0,
        T = 0,
        S = 0,
        C = 1 / 30;
        e(window).on("mousemove",
        function(t) {
            var i = Math.max( - 150, Math.min(150, e(window).width() / 2 - t.clientX)),
            r = Math.max( - 150, Math.min(150, e(window).height() / 2 - t.clientY));
            b = 20 * i / 300,
            x = 10 * r / 300
        }),
        t(),
        i(),
        r(),
        n();
        var E = new TimelineMax;
        E.set(".loader", {
            scale: 1
        }),
        E.set(".loader__inner", {
            scale: 1.2,
            autoAlpha: 0
        }),
        e("body").addClass("no-scroll"),
        e(window).load(function() {
            E.fromTo(".loader__inner", 2, {
                scale: 1.2,
                autoAlpha: 0
            },
            {
                scale: 1,
                autoAlpha: 1,
                ease: Power4.easeOut
            }),
            E.fromTo(".loader span", .7, {
                scale: 1,
                autoAlpha: 1
            },
            {
                scale: .8,
                autoAlpha: 0,
                ease: Power4.easeOut
            }),
            E.fromTo(".loader", 1.5, {
                scaleX: 1
            },
            {
                scaleX: 0,
                transformOrigin: "left center",
                ease: Power4.easeOut
            }),
            E.eventCallback("onStart",
            function() {
                setTimeout(function() {
                    Barba.Pjax.init(),
                    e("body").removeClass("no-scroll")
                },
                2700)
            })
        })
    })
} (jQuery),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t()
} (this,
function() {
    "use strict";
    function e(e, t) {
        var i = [],
        r = 0;
        if (e && !t && e instanceof n) return e;
        if (e) if ("string" == typeof e) {
            var s, a, o = e.trim();
            if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                var l = "div";
                for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), 0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), (a = document.createElement(l)).innerHTML = o, r = 0; r < a.childNodes.length; r += 1) i.push(a.childNodes[r])
            } else for (s = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || document).querySelectorAll(e.trim()) : [document.getElementById(e.trim().split("#")[1])], r = 0; r < s.length; r += 1) s[r] && i.push(s[r])
        } else if (e.nodeType || e === window || e === document) i.push(e);
        else if (e.length > 0 && e[0].nodeType) for (r = 0; r < e.length; r += 1) i.push(e[r]);
        return new n(i)
    }
    function t(e) {
        for (var t = [], i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }
    var i, r = i = "undefined" == typeof window ? {
        navigator: {
            userAgent: ""
        },
        location: {},
        history: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {}
        },
        Image: function() {},
        Date: function() {},
        screen: {}
    }: window,
    n = function(e) {
        for (var t = 0; t < e.length; t += 1) this[t] = e[t];
        return this.length = e.length,
        this
    };
    e.fn = n.prototype,
    e.Class = n,
    e.Dom7 = n,
    "resize scroll".split(" ");
    var s = {
        addClass: function(e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var r = 0; r < this.length; r += 1) void 0 !== this[r].classList && this[r].classList.add(t[i]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var r = 0; r < this.length; r += 1) void 0 !== this[r].classList && this[r].classList.remove(t[i]);
            return this
        },
        hasClass: function(e) {
            return !! this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var r = 0; r < this.length; r += 1) void 0 !== this[r].classList && this[r].classList.toggle(t[i]);
            return this
        },
        attr: function(e, t) {
            var i = arguments,
            r = this;
            if (1 !== arguments.length || "string" != typeof e) {
                for (var n = 0; n < this.length; n += 1) if (2 === i.length) r[n].setAttribute(e, t);
                else for (var s in e) r[n][s] = e[s],
                r[n].setAttribute(s, e[s]);
                return this
            }
            if (this[0]) return this[0].getAttribute(e)
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var i;
            if (void 0 !== t) {
                for (var r = 0; r < this.length; r += 1)(i = this[r]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}),
                i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
                var n = i.getAttribute("data-" + e);
                if (n) return n
            }
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e,
                i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e,
                i.transitionDuration = e
            }
            return this
        },
        on: function() {
            function t(t) {
                var i = t.target;
                if (i) {
                    var r = t.target.dom7EventData || [];
                    if (r.unshift(t), e(i).is(a)) o.apply(i, r);
                    else for (var n = e(i).parents(), s = 0; s < n.length; s += 1) e(n[s]).is(a) && o.apply(n[s], r)
                }
            }
            function i(e) {
                var t = e && e.target ? e.target.dom7EventData || [] : [];
                t.unshift(e),
                o.apply(this, t)
            }
            for (var r = [], n = arguments.length; n--;) r[n] = arguments[n];
            var s = r[0],
            a = r[1],
            o = r[2],
            l = r[3];
            if ("function" == typeof r[1]) {
                var h;
                s = (h = r)[0],
                o = h[1],
                l = h[2],
                a = void 0
            }
            l || (l = !1);
            for (var d, c = s.split(" "), u = 0; u < this.length; u += 1) {
                var p = this[u];
                if (a) for (d = 0; d < c.length; d += 1) p.dom7LiveListeners || (p.dom7LiveListeners = []),
                p.dom7LiveListeners.push({
                    type: s,
                    listener: o,
                    proxyListener: t
                }),
                p.addEventListener(c[d], t, l);
                else for (d = 0; d < c.length; d += 1) p.dom7Listeners || (p.dom7Listeners = []),
                p.dom7Listeners.push({
                    type: s,
                    listener: o,
                    proxyListener: i
                }),
                p.addEventListener(c[d], i, l)
            }
            return this
        },
        off: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i = e[0],
            r = e[1],
            n = e[2],
            s = e[3];
            if ("function" == typeof e[1]) {
                var a;
                i = (a = e)[0],
                n = a[1],
                s = a[2],
                r = void 0
            }
            s || (s = !1);
            for (var o = i.split(" "), l = 0; l < o.length; l += 1) for (var h = 0; h < this.length; h += 1) {
                var d = this[h];
                if (r) {
                    if (d.dom7LiveListeners) for (var c = 0; c < d.dom7LiveListeners.length; c += 1) n ? d.dom7LiveListeners[c].listener === n && d.removeEventListener(o[l], d.dom7LiveListeners[c].proxyListener, s) : d.dom7LiveListeners[c].type === o[l] && d.removeEventListener(o[l], d.dom7LiveListeners[c].proxyListener, s)
                } else if (d.dom7Listeners) for (var u = 0; u < d.dom7Listeners.length; u += 1) n ? d.dom7Listeners[u].listener === n && d.removeEventListener(o[l], d.dom7Listeners[u].proxyListener, s) : d.dom7Listeners[u].type === o[l] && d.removeEventListener(o[l], d.dom7Listeners[u].proxyListener, s)
            }
            return this
        },
        trigger: function() {
            for (var e = this,
            t = [], i = arguments.length; i--;) t[i] = arguments[i];
            for (var r = t[0].split(" "), n = t[1], s = 0; s < r.length; s += 1) for (var a = 0; a < this.length; a += 1) {
                var o = void 0;
                try {
                    o = new window.CustomEvent(r[s], {
                        detail: n,
                        bubbles: !0,
                        cancelable: !0
                    })
                } catch(e) { (o = document.createEvent("Event")).initEvent(r[s], !0, !0),
                    o.detail = n
                }
                e[a].dom7EventData = t.filter(function(e, t) {
                    return t > 0
                }),
                e[a].dispatchEvent(o),
                e[a].dom7EventData = [],
                delete e[a].dom7EventData
            }
            return this
        },
        transitionEnd: function(e) {
            function t(s) {
                if (s.target === this) for (e.call(this, s), i = 0; i < r.length; i += 1) n.off(r[i], t)
            }
            var i, r = ["webkitTransitionEnd", "transitionend"],
            n = this;
            if (e) for (i = 0; i < r.length; i += 1) n.on(r[i], t);
            return this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (this.length > 0) {
                var e = this[0],
                t = e.getBoundingClientRect(),
                i = document.body,
                r = e.clientTop || i.clientTop || 0,
                n = e.clientLeft || i.clientLeft || 0,
                s = e === window ? window.scrollY: e.scrollTop,
                a = e === window ? window.scrollX: e.scrollLeft;
                return {
                    top: t.top + s - r,
                    left: t.left + a - n
                }
            }
            return null
        },
        css: function(e, t) {
            var i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1) for (var r in e) this[i].style[r] = e[r];
                    return this
                }
                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            var t = this;
            if (!e) return this;
            for (var i = 0; i < this.length; i += 1) if (!1 === e.call(t[i], i, t[i])) return t;
            return this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML: void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(t) {
            var i, r, s = this[0];
            if (!s || void 0 === t) return ! 1;
            if ("string" == typeof t) {
                if (s.matches) return s.matches(t);
                if (s.webkitMatchesSelector) return s.webkitMatchesSelector(t);
                if (s.msMatchesSelector) return s.msMatchesSelector(t);
                for (i = e(t), r = 0; r < i.length; r += 1) if (i[r] === s) return ! 0;
                return ! 1
            }
            if (t === document) return s === document;
            if (t === window) return s === window;
            if (t.nodeType || t instanceof n) {
                for (i = t.nodeType ? [t] : t, r = 0; r < i.length; r += 1) if (i[r] === s) return ! 0;
                return ! 1
            }
            return ! 1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            var t, i = this.length;
            return e > i - 1 ? new n([]) : e < 0 ? (t = i + e, new n(t < 0 ? [] : [this[t]])) : new n([this[e]])
        },
        append: function() {
            for (var e = this,
            t = [], i = arguments.length; i--;) t[i] = arguments[i];
            for (var r, s = 0; s < t.length; s += 1) {
                r = t[s];
                for (var a = 0; a < this.length; a += 1) if ("string" == typeof r) {
                    var o = document.createElement("div");
                    for (o.innerHTML = r; o.firstChild;) e[a].appendChild(o.firstChild)
                } else if (r instanceof n) for (var l = 0; l < r.length; l += 1) e[a].appendChild(r[l]);
                else e[a].appendChild(r)
            }
            return this
        },
        prepend: function(e) {
            var t, i, r = this;
            for (t = 0; t < this.length; t += 1) if ("string" == typeof e) {
                var s = document.createElement("div");
                for (s.innerHTML = e, i = s.childNodes.length - 1; i >= 0; i -= 1) r[t].insertBefore(s.childNodes[i], r[t].childNodes[0])
            } else if (e instanceof n) for (i = 0; i < e.length; i += 1) r[t].insertBefore(e[i], r[t].childNodes[0]);
            else r[t].insertBefore(e, r[t].childNodes[0]);
            return this
        },
        next: function(t) {
            return new n(this.length > 0 ? t ? this[0].nextElementSibling && e(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
        },
        nextAll: function(t) {
            var i = [],
            r = this[0];
            if (!r) return new n([]);
            for (; r.nextElementSibling;) {
                var s = r.nextElementSibling;
                t ? e(s).is(t) && i.push(s) : i.push(s),
                r = s
            }
            return new n(i)
        },
        prev: function(t) {
            if (this.length > 0) {
                var i = this[0];
                return new n(t ? i.previousElementSibling && e(i.previousElementSibling).is(t) ? [i.previousElementSibling] : [] : i.previousElementSibling ? [i.previousElementSibling] : [])
            }
            return new n([])
        },
        prevAll: function(t) {
            var i = [],
            r = this[0];
            if (!r) return new n([]);
            for (; r.previousElementSibling;) {
                var s = r.previousElementSibling;
                t ? e(s).is(t) && i.push(s) : i.push(s),
                r = s
            }
            return new n(i)
        },
        parent: function(i) {
            for (var r = this,
            n = [], s = 0; s < this.length; s += 1) null !== r[s].parentNode && (i ? e(r[s].parentNode).is(i) && n.push(r[s].parentNode) : n.push(r[s].parentNode));
            return e(t(n))
        },
        parents: function(i) {
            for (var r = [], n = 0; n < this.length; n += 1) for (var s = this[n].parentNode; s;) i ? e(s).is(i) && r.push(s) : r.push(s),
            s = s.parentNode;
            return e(t(r))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new n([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) for (var r = this[i].querySelectorAll(e), s = 0; s < r.length; s += 1) t.push(r[s]);
            return new n(t)
        },
        children: function(i) {
            for (var r = [], s = 0; s < this.length; s += 1) for (var a = this[s].childNodes, o = 0; o < a.length; o += 1) i ? 1 === a[o].nodeType && e(a[o]).is(i) && r.push(a[o]) : 1 === a[o].nodeType && r.push(a[o]);
            return new n(t(r))
        },
        remove: function() {
            for (var e = this,
            t = 0; t < this.length; t += 1) e[t].parentNode && e[t].parentNode.removeChild(e[t]);
            return this
        },
        add: function() {
            for (var t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var r, n, s = this;
            for (r = 0; r < t.length; r += 1) {
                var a = e(t[r]);
                for (n = 0; n < a.length; n += 1) s[s.length] = a[n],
                s.length += 1
            }
            return s
        },
        styles: function() {
            return this[0] ? window.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(s).forEach(function(t) {
        e.fn[t] = s[t]
    });
    var a, o = {
        deleteProps: function(e) {
            var t = e;
            Object.keys(t).forEach(function(e) {
                try {
                    t[e] = null
                } catch(e) {}
                try {
                    delete t[e]
                } catch(e) {}
            })
        },
        nextTick: function(e, t) {
            return void 0 === t && (t = 0),
            setTimeout(e, t)
        },
        now: function() {
            return Date.now()
        },
        getTranslate: function(e, t) {
            void 0 === t && (t = "x");
            var i, n, s, a = r.getComputedStyle(e, null);
            return r.WebKitCSSMatrix ? ((n = a.transform || a.webkitTransform).split(",").length > 6 && (n = n.split(", ").map(function(e) {
                return e.replace(",", ".")
            }).join(", ")), s = new r.WebKitCSSMatrix("none" === n ? "": n)) : i = (s = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","),
            "x" === t && (n = r.WebKitCSSMatrix ? s.m41: 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
            "y" === t && (n = r.WebKitCSSMatrix ? s.m42: 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
            n || 0
        },
        parseUrlQuery: function(e) {
            var t, i, n, s, a = {},
            o = e || r.location.href;
            if ("string" == typeof o && o.length) for (s = (i = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
                return "" !== e
            })).length, t = 0; t < s; t += 1) n = i[t].replace(/#\S+/g, "").split("="),
            a[decodeURIComponent(n[0])] = void 0 === n[1] ? void 0 : decodeURIComponent(n[1]) || "";
            return a
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        },
        extend: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var i = Object(e[0]), r = 1; r < e.length; r += 1) {
                var n = e[r];
                if (void 0 !== n && null !== n) for (var s = Object.keys(Object(n)), a = 0, l = s.length; a < l; a += 1) {
                    var h = s[a],
                    d = Object.getOwnPropertyDescriptor(n, h);
                    void 0 !== d && d.enumerable && (o.isObject(i[h]) && o.isObject(n[h]) ? o.extend(i[h], n[h]) : !o.isObject(i[h]) && o.isObject(n[h]) ? (i[h] = {},
                    o.extend(i[h], n[h])) : i[h] = n[h])
                }
            }
            return i
        }
    },
    l = a = "undefined" == typeof document ? {
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return {}
        },
        querySelectorAll: function() {
            return []
        },
        createElement: function() {
            return {
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return []
                }
            }
        },
        location: {
            hash: ""
        }
    }: document,
    h = {
        touch: r.Modernizr && !0 === r.Modernizr.touch || !!("ontouchstart" in r || r.DocumentTouch && l instanceof r.DocumentTouch),
        transforms3d: r.Modernizr && !0 === r.Modernizr.csstransforms3d ||
        function() {
            var e = l.createElement("div").style;
            return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
        } (),
        flexbox: function() {
            for (var e = l.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1) if (t[i] in e) return ! 0;
            return ! 1
        } (),
        observer: "MutationObserver" in r || "WebkitMutationObserver" in r,
        passiveListener: function() {
            var e = !1;
            try {
                var t = Object.defineProperty({},
                "passive", {
                    get: function() {
                        e = !0
                    }
                });
                r.addEventListener("testPassiveListener", null, t)
            } catch(e) {}
            return e
        } (),
        gestures: "ongesturestart" in r
    },
    d = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e,
        t.eventsListeners = {},
        t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
            t.on(e, t.params.on[e])
        })
    },
    c = {
        components: {}
    };
    d.prototype.on = function(e, t) {
        var i = this;
        return "function" != typeof t ? i: (e.split(" ").forEach(function(e) {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e].push(t)
        }), i)
    },
    d.prototype.once = function(e, t) {
        function i() {
            for (var n = [], s = arguments.length; s--;) n[s] = arguments[s];
            t.apply(r, n),
            r.off(e, i)
        }
        var r = this;
        return "function" != typeof t ? r: r.on(e, i)
    },
    d.prototype.off = function(e, t) {
        var i = this;
        return e.split(" ").forEach(function(e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e].forEach(function(r, n) {
                r === t && i.eventsListeners[e].splice(n, 1)
            })
        }),
        i
    },
    d.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var i = this;
        if (!i.eventsListeners) return i;
        var r, n, s;
        return "string" == typeof e[0] || Array.isArray(e[0]) ? (r = e[0], n = e.slice(1, e.length), s = i) : (r = e[0].events, n = e[0].data, s = e[0].context || i),
        (Array.isArray(r) ? r: r.split(" ")).forEach(function(e) {
            if (i.eventsListeners[e]) {
                var t = [];
                i.eventsListeners[e].forEach(function(e) {
                    t.push(e)
                }),
                t.forEach(function(e) {
                    e.apply(s, n)
                })
            }
        }),
        i
    },
    d.prototype.useModulesParams = function(e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function(i) {
            var r = t.modules[i];
            r.params && o.extend(e, r.params)
        })
    },
    d.prototype.useModules = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function(i) {
            var r = t.modules[i],
            n = e[i] || {};
            r.instance && Object.keys(r.instance).forEach(function(e) {
                var i = r.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            }),
            r.on && t.on && Object.keys(r.on).forEach(function(e) {
                t.on(e, r.on[e])
            }),
            r.create && r.create.bind(t)(n)
        })
    },
    c.components.set = function(e) {
        this.use && this.use(e)
    },
    d.installModule = function(e) {
        for (var t = [], i = arguments.length - 1; i-->0;) t[i] = arguments[i + 1];
        var r = this;
        r.prototype.modules || (r.prototype.modules = {});
        var n = e.name || Object.keys(r.prototype.modules).length + "_" + o.now();
        return r.prototype.modules[n] = e,
        e.proto && Object.keys(e.proto).forEach(function(t) {
            r.prototype[t] = e.proto[t]
        }),
        e.static && Object.keys(e.static).forEach(function(t) {
            r[t] = e.static[t]
        }),
        e.install && e.install.apply(r, t),
        r
    },
    d.use = function(e) {
        for (var t = [], i = arguments.length - 1; i-->0;) t[i] = arguments[i + 1];
        var r = this;
        return Array.isArray(e) ? (e.forEach(function(e) {
            return r.installModule(e)
        }), r) : r.installModule.apply(r, [e].concat(t))
    },
    Object.defineProperties(d, c);
    var u = {
        updateSize: function() {
            var e, t, i = this,
            r = i.$el;
            e = void 0 !== i.params.width ? i.params.width: r[0].clientWidth,
            t = void 0 !== i.params.height ? i.params.height: r[0].clientHeight,
            0 === e && i.isHorizontal() || 0 === t && i.isVertical() || (e = e - parseInt(r.css("padding-left"), 10) - parseInt(r.css("padding-right"), 10), t = t - parseInt(r.css("padding-top"), 10) - parseInt(r.css("padding-bottom"), 10), o.extend(i, {
                width: e,
                height: t,
                size: i.isHorizontal() ? e: t
            }))
        },
        updateSlides: function() {
            var e = this,
            t = e.params,
            i = e.$wrapperEl,
            r = e.size,
            n = e.rtl,
            s = e.wrongRTL,
            a = i.children("." + e.params.slideClass),
            l = e.virtual && t.virtual.enabled ? e.virtual.slides.length: a.length,
            d = [],
            c = [],
            u = [],
            p = t.slidesOffsetBefore;
            "function" == typeof p && (p = t.slidesOffsetBefore.call(e));
            var f = t.slidesOffsetAfter;
            "function" == typeof f && (f = t.slidesOffsetAfter.call(e));
            var m = l,
            g = e.snapGrid.length,
            v = e.snapGrid.length,
            _ = t.spaceBetween,
            y = -p,
            w = 0,
            b = 0;
            if (void 0 !== r) {
                "string" == typeof _ && _.indexOf("%") >= 0 && (_ = parseFloat(_.replace("%", "")) / 100 * r),
                e.virtualSize = -_,
                n ? a.css({
                    marginLeft: "",
                    marginTop: ""
                }) : a.css({
                    marginRight: "",
                    marginBottom: ""
                });
                var x;
                t.slidesPerColumn > 1 && (x = Math.floor(l / t.slidesPerColumn) === l / e.params.slidesPerColumn ? l: Math.ceil(l / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
                for (var T, S = t.slidesPerColumn,
                C = x / S,
                E = C - (t.slidesPerColumn * C - l), P = 0; P < l; P += 1) {
                    T = 0;
                    var k = a.eq(P);
                    if (t.slidesPerColumn > 1) {
                        var M = void 0,
                        O = void 0,
                        z = void 0;
                        "column" === t.slidesPerColumnFill ? (z = P - (O = Math.floor(P / S)) * S, (O > E || O === E && z === S - 1) && (z += 1) >= S && (z = 0, O += 1), M = O + z * x / S, k.css({
                            "-webkit-box-ordinal-group": M,
                            "-moz-box-ordinal-group": M,
                            "-ms-flex-order": M,
                            "-webkit-order": M,
                            order: M
                        })) : O = P - (z = Math.floor(P / C)) * C,
                        k.css("margin-" + (e.isHorizontal() ? "top": "left"), 0 !== z && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", O).attr("data-swiper-row", z)
                    }
                    "none" !== k.css("display") && ("auto" === t.slidesPerView ? (T = e.isHorizontal() ? k.outerWidth(!0) : k.outerHeight(!0), t.roundLengths && (T = Math.floor(T))) : (T = (r - (t.slidesPerView - 1) * _) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), a[P] && (e.isHorizontal() ? a[P].style.width = T + "px": a[P].style.height = T + "px")), a[P] && (a[P].swiperSlideSize = T), u.push(T), t.centeredSlides ? (y = y + T / 2 + w / 2 + _, 0 === w && 0 !== P && (y = y - r / 2 - _), 0 === P && (y = y - r / 2 - _), Math.abs(y) < .001 && (y = 0), b % t.slidesPerGroup == 0 && d.push(y), c.push(y)) : (b % t.slidesPerGroup == 0 && d.push(y), c.push(y), y = y + T + _), e.virtualSize += T + _, w = T, b += 1)
                }
                e.virtualSize = Math.max(e.virtualSize, r) + f;
                var A;
                if (n && s && ("slide" === t.effect || "coverflow" === t.effect) && i.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }), h.flexbox && !t.setWrapperSize || (e.isHorizontal() ? i.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }) : i.css({
                    height: e.virtualSize + t.spaceBetween + "px"
                })), t.slidesPerColumn > 1 && (e.virtualSize = (T + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? i.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }) : i.css({
                    height: e.virtualSize + t.spaceBetween + "px"
                }), t.centeredSlides)) {
                    A = [];
                    for (var L = 0; L < d.length; L += 1) d[L] < e.virtualSize + d[0] && A.push(d[L]);
                    d = A
                }
                if (!t.centeredSlides) {
                    A = [];
                    for (var D = 0; D < d.length; D += 1) d[D] <= e.virtualSize - r && A.push(d[D]);
                    d = A,
                    Math.floor(e.virtualSize - r) - Math.floor(d[d.length - 1]) > 1 && d.push(e.virtualSize - r)
                }
                0 === d.length && (d = [0]),
                0 !== t.spaceBetween && (e.isHorizontal() ? n ? a.css({
                    marginLeft: _ + "px"
                }) : a.css({
                    marginRight: _ + "px"
                }) : a.css({
                    marginBottom: _ + "px"
                })),
                o.extend(e, {
                    slides: a,
                    snapGrid: d,
                    slidesGrid: c,
                    slidesSizesGrid: u
                }),
                l !== m && e.emit("slidesLengthChange"),
                d.length !== g && e.emit("snapGridLengthChange"),
                c.length !== v && e.emit("slidesGridLengthChange"),
                (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
            }
        },
        updateAutoHeight: function() {
            var e, t = this,
            i = [],
            r = 0;
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) for (e = 0; e < Math.ceil(t.params.slidesPerView); e += 1) {
                var n = t.activeIndex + e;
                if (n > t.slides.length) break;
                i.push(t.slides.eq(n)[0])
            } else i.push(t.slides.eq(t.activeIndex)[0]);
            for (e = 0; e < i.length; e += 1) if (void 0 !== i[e]) {
                var s = i[e].offsetHeight;
                r = s > r ? s: r
            }
            r && t.$wrapperEl.css("height", r + "px")
        },
        updateSlidesOffset: function() {
            for (var e = this.slides,
            t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft: e[t].offsetTop
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this.translate || 0);
            var t = this,
            i = t.params,
            r = t.slides,
            n = t.rtl;
            if (0 !== r.length) {
                void 0 === r[0].swiperSlideOffset && t.updateSlidesOffset();
                var s = -e;
                n && (s = e),
                r.removeClass(i.slideVisibleClass);
                for (var a = 0; a < r.length; a += 1) {
                    var o = r[a],
                    l = (s + (i.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + i.spaceBetween);
                    if (i.watchSlidesVisibility) {
                        var h = -(s - o.swiperSlideOffset),
                        d = h + t.slidesSizesGrid[a]; (h >= 0 && h < t.size || d > 0 && d <= t.size || h <= 0 && d >= t.size) && r.eq(a).addClass(i.slideVisibleClass)
                    }
                    o.progress = n ? -l: l
                }
            }
        },
        updateProgress: function(e) {
            void 0 === e && (e = this.translate || 0);
            var t = this,
            i = t.params,
            r = t.maxTranslate() - t.minTranslate(),
            n = t.progress,
            s = t.isBeginning,
            a = t.isEnd,
            l = s,
            h = a;
            0 === r ? (n = 0, s = !0, a = !0) : (s = (n = (e - t.minTranslate()) / r) <= 0, a = n >= 1),
            o.extend(t, {
                progress: n,
                isBeginning: s,
                isEnd: a
            }),
            (i.watchSlidesProgress || i.watchSlidesVisibility) && t.updateSlidesProgress(e),
            s && !l && t.emit("reachBeginning toEdge"),
            a && !h && t.emit("reachEnd toEdge"),
            (l && !s || h && !a) && t.emit("fromEdge"),
            t.emit("progress", n)
        },
        updateSlidesClasses: function() {
            var e = this,
            t = e.slides,
            i = e.params,
            r = e.$wrapperEl,
            n = e.activeIndex,
            s = e.realIndex,
            a = e.virtual && i.virtual.enabled;
            t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass);
            var o; (o = a ? e.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + n + '"]') : t.eq(n)).addClass(i.slideActiveClass),
            i.loop && (o.hasClass(i.slideDuplicateClass) ? r.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + s + '"]').addClass(i.slideDuplicateActiveClass) : r.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + s + '"]').addClass(i.slideDuplicateActiveClass));
            var l = o.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === l.length && (l = t.eq(0)).addClass(i.slideNextClass);
            var h = o.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === h.length && (h = t.eq( - 1)).addClass(i.slidePrevClass),
            i.loop && (l.hasClass(i.slideDuplicateClass) ? r.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : r.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), h.hasClass(i.slideDuplicateClass) ? r.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + h.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : r.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + h.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            var t, i = this,
            r = i.rtl ? i.translate: -i.translate,
            n = i.slidesGrid,
            s = i.snapGrid,
            a = i.params,
            l = i.activeIndex,
            h = i.realIndex,
            d = i.snapIndex,
            c = e;
            if (void 0 === c) {
                for (var u = 0; u < n.length; u += 1) void 0 !== n[u + 1] ? r >= n[u] && r < n[u + 1] - (n[u + 1] - n[u]) / 2 ? c = u: r >= n[u] && r < n[u + 1] && (c = u + 1) : r >= n[u] && (c = u);
                a.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
            }
            if ((t = s.indexOf(r) >= 0 ? s.indexOf(r) : Math.floor(c / a.slidesPerGroup)) >= s.length && (t = s.length - 1), c !== l) {
                var p = parseInt(i.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
                o.extend(i, {
                    snapIndex: t,
                    realIndex: p,
                    previousIndex: l,
                    activeIndex: c
                }),
                i.emit("activeIndexChange"),
                i.emit("snapIndexChange"),
                h !== p && i.emit("realIndexChange"),
                i.emit("slideChange")
            } else t !== d && (i.snapIndex = t, i.emit("snapIndexChange"))
        },
        updateClickedSlide: function(t) {
            var i = this,
            r = i.params,
            n = e(t.target).closest("." + r.slideClass)[0],
            s = !1;
            if (n) for (var a = 0; a < i.slides.length; a += 1) i.slides[a] === n && (s = !0);
            if (!n || !s) return i.clickedSlide = void 0,
            void(i.clickedIndex = void 0);
            i.clickedSlide = n,
            i.virtual && i.params.virtual.enabled ? i.clickedIndex = parseInt(e(n).attr("data-swiper-slide-index"), 10) : i.clickedIndex = e(n).index(),
            r.slideToClickedSlide && void 0 !== i.clickedIndex && i.clickedIndex !== i.activeIndex && i.slideToClickedSlide()
        }
    },
    p = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x": "y");
            var t = this,
            i = t.params,
            r = t.rtl,
            n = t.translate,
            s = t.$wrapperEl;
            if (i.virtualTranslate) return r ? -n: n;
            var a = o.getTranslate(s[0], e);
            return r && (a = -a),
            a || 0
        },
        setTranslate: function(e, t) {
            var i = this,
            r = i.rtl,
            n = i.params,
            s = i.$wrapperEl,
            a = i.progress,
            o = 0,
            l = 0;
            i.isHorizontal() ? o = r ? -e: e: l = e,
            n.roundLengths && (o = Math.floor(o), l = Math.floor(l)),
            n.virtualTranslate || (h.transforms3d ? s.transform("translate3d(" + o + "px, " + l + "px, 0px)") : s.transform("translate(" + o + "px, " + l + "px)")),
            i.translate = i.isHorizontal() ? o: l;
            var d = i.maxTranslate() - i.minTranslate(); (0 === d ? 0 : (e - i.minTranslate()) / d) !== a && i.updateProgress(e),
            i.emit("setTranslate", i.translate, t)
        },
        minTranslate: function() {
            return - this.snapGrid[0]
        },
        maxTranslate: function() {
            return - this.snapGrid[this.snapGrid.length - 1]
        }
    },
    f = {
        isSafari: function() {
            var e = r.navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        } (),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(r.navigator.userAgent),
        ie: r.navigator.pointerEnabled || r.navigator.msPointerEnabled,
        ieTouch: r.navigator.msPointerEnabled && r.navigator.msMaxTouchPoints > 1 || r.navigator.pointerEnabled && r.navigator.maxTouchPoints > 1,
        lteIE9: function() {
            var e = l.createElement("div");
            return e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e",
            1 === e.getElementsByTagName("i").length
        } ()
    },
    m = {
        slideTo: function(e, t, i, r) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0);
            var n = this,
            s = e;
            s < 0 && (s = 0);
            var a = n.params,
            o = n.snapGrid,
            l = n.slidesGrid,
            h = n.previousIndex,
            d = n.activeIndex,
            c = n.rtl,
            u = n.$wrapperEl,
            p = Math.floor(s / a.slidesPerGroup);
            p >= o.length && (p = o.length - 1),
            (d || a.initialSlide || 0) === (h || 0) && i && n.emit("beforeSlideChangeStart");
            var m = -o[p];
            if (n.updateProgress(m), a.normalizeSlideIndex) for (var g = 0; g < l.length; g += 1) - Math.floor(100 * m) >= Math.floor(100 * l[g]) && (s = g);
            return ! (!n.allowSlideNext && m < n.translate && m < n.minTranslate() || !n.allowSlidePrev && m > n.translate && m > n.maxTranslate() && (d || 0) !== s || (c && -m === n.translate || !c && m === n.translate ? (n.updateActiveIndex(s), a.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), "slide" !== a.effect && n.setTranslate(m), 1) : (0 === t || f.lteIE9 ? (n.setTransition(0), n.setTranslate(m), n.updateActiveIndex(s), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, r), n.transitionStart(i), n.transitionEnd(i)) : (n.setTransition(t), n.setTranslate(m), n.updateActiveIndex(s), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, r), n.transitionStart(i), n.animating || (n.animating = !0, u.transitionEnd(function() {
                n && !n.destroyed && n.transitionEnd(i)
            }))), 0)))
        },
        slideNext: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var r = this,
            n = r.params,
            s = r.animating;
            return n.loop ? !s && (r.loopFix(), r._clientLeft = r.$wrapperEl[0].clientLeft, r.slideTo(r.activeIndex + n.slidesPerGroup, e, t, i)) : r.slideTo(r.activeIndex + n.slidesPerGroup, e, t, i)
        },
        slidePrev: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var r = this,
            n = r.params,
            s = r.animating;
            return n.loop ? !s && (r.loopFix(), r._clientLeft = r.$wrapperEl[0].clientLeft, r.slideTo(r.activeIndex - 1, e, t, i)) : r.slideTo(r.activeIndex - 1, e, t, i)
        },
        slideReset: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            return this.slideTo(this.activeIndex, e, t, i)
        },
        slideToClickedSlide: function() {
            var t, i = this,
            r = i.params,
            n = i.$wrapperEl,
            s = "auto" === r.slidesPerView ? i.slidesPerViewDynamic() : r.slidesPerView,
            a = i.clickedIndex;
            if (r.loop) {
                if (i.animating) return;
                t = parseInt(e(i.clickedSlide).attr("data-swiper-slide-index"), 10),
                r.centeredSlides ? a < i.loopedSlides - s / 2 || a > i.slides.length - i.loopedSlides + s / 2 ? (i.loopFix(), a = n.children("." + r.slideClass + '[data-swiper-slide-index="' + t + '"]:not(.' + r.slideDuplicateClass + ")").eq(0).index(), o.nextTick(function() {
                    i.slideTo(a)
                })) : i.slideTo(a) : a > i.slides.length - s ? (i.loopFix(), a = n.children("." + r.slideClass + '[data-swiper-slide-index="' + t + '"]:not(.' + r.slideDuplicateClass + ")").eq(0).index(), o.nextTick(function() {
                    i.slideTo(a)
                })) : i.slideTo(a)
            } else i.slideTo(a)
        }
    },
    g = {
        loopCreate: function() {
            var t = this,
            i = t.params,
            r = t.$wrapperEl;
            r.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var n = r.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var s = i.slidesPerGroup - n.length % i.slidesPerGroup;
                if (s !== i.slidesPerGroup) {
                    for (var a = 0; a < s; a += 1) {
                        var o = e(l.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        r.append(o)
                    }
                    n = r.children("." + i.slideClass)
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = n.length),
            t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10),
            t.loopedSlides += i.loopAdditionalSlides,
            t.loopedSlides > n.length && (t.loopedSlides = n.length);
            var h = [],
            d = [];
            n.each(function(i, r) {
                var s = e(r);
                i < t.loopedSlides && d.push(r),
                i < n.length && i >= n.length - t.loopedSlides && h.push(r),
                s.attr("data-swiper-slide-index", i)
            });
            for (var c = 0; c < d.length; c += 1) r.append(e(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var u = h.length - 1; u >= 0; u -= 1) r.prepend(e(h[u].cloneNode(!0)).addClass(i.slideDuplicateClass))
        },
        loopFix: function() {
            var e, t = this,
            i = t.params,
            r = t.activeIndex,
            n = t.slides,
            s = t.loopedSlides,
            a = t.allowSlidePrev,
            o = t.allowSlideNext;
            t.allowSlidePrev = !0,
            t.allowSlideNext = !0,
            r < s ? (e = n.length - 3 * s + r, e += s, t.slideTo(e, 0, !1, !0)) : ("auto" === i.slidesPerView && r >= 2 * s || r > n.length - 2 * i.slidesPerView) && (e = -n.length + r + s, e += s, t.slideTo(e, 0, !1, !0)),
            t.allowSlidePrev = a,
            t.allowSlideNext = o
        },
        loopDestroy: function() {
            var e = this,
            t = e.$wrapperEl,
            i = e.params,
            r = e.slides;
            t.children("." + i.slideClass + "." + i.slideDuplicateClass).remove(),
            r.removeAttr("data-swiper-slide-index")
        }
    },
    v = {
        setGrabCursor: function(e) {
            if (!h.touch && this.params.simulateTouch) {
                var t = this.el;
                t.style.cursor = "move",
                t.style.cursor = e ? "-webkit-grabbing": "-webkit-grab",
                t.style.cursor = e ? "-moz-grabbin": "-moz-grab",
                t.style.cursor = e ? "grabbing": "grab"
            }
        },
        unsetGrabCursor: function() {
            h.touch || (this.el.style.cursor = "")
        }
    },
    _ = {
        appendSlide: function(e) {
            var t = this,
            i = t.$wrapperEl,
            r = t.params;
            if (r.loop && t.loopDestroy(), "object" == typeof e && "length" in e) for (var n = 0; n < e.length; n += 1) e[n] && i.append(e[n]);
            else i.append(e);
            r.loop && t.loopCreate(),
            r.observer && h.observer || t.update()
        },
        prependSlide: function(e) {
            var t = this,
            i = t.params,
            r = t.$wrapperEl,
            n = t.activeIndex;
            i.loop && t.loopDestroy();
            var s = n + 1;
            if ("object" == typeof e && "length" in e) {
                for (var a = 0; a < e.length; a += 1) e[a] && r.prepend(e[a]);
                s = n + e.length
            } else r.prepend(e);
            i.loop && t.loopCreate(),
            i.observer && h.observer || t.update(),
            t.slideTo(s, 0, !1)
        },
        removeSlide: function(e) {
            var t = this,
            i = t.params,
            r = t.$wrapperEl,
            n = t.activeIndex;
            i.loop && (t.loopDestroy(), t.slides = r.children("." + i.slideClass));
            var s, a = n;
            if ("object" == typeof e && "length" in e) {
                for (var o = 0; o < e.length; o += 1) s = e[o],
                t.slides[s] && t.slides.eq(s).remove(),
                s < a && (a -= 1);
                a = Math.max(a, 0)
            } else s = e,
            t.slides[s] && t.slides.eq(s).remove(),
            s < a && (a -= 1),
            a = Math.max(a, 0);
            i.loop && t.loopCreate(),
            i.observer && h.observer || t.update(),
            i.loop ? t.slideTo(a + t.loopedSlides, 0, !1) : t.slideTo(a, 0, !1)
        },
        removeAllSlides: function() {
            for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
            this.removeSlide(e)
        }
    },
    y = function() {
        var e = r.navigator.userAgent,
        t = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            windows: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            cordova: r.cordova || r.phonegap,
            phonegap: r.cordova || r.phonegap
        },
        i = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
        n = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        s = e.match(/(iPad).*OS\s([\d_]+)/),
        a = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        o = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (i && (t.os = "windows", t.osVersion = i[2], t.windows = !0), n && !i && (t.os = "android", t.osVersion = n[2], t.android = !0, t.androidChrome = e.toLowerCase().indexOf("chrome") >= 0), (s || o || a) && (t.os = "ios", t.ios = !0), o && !a && (t.osVersion = o[2].replace(/_/g, "."), t.iphone = !0), s && (t.osVersion = s[2].replace(/_/g, "."), t.ipad = !0), a && (t.osVersion = a[3] ? a[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && e.indexOf("Version/") >= 0 && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (o || s || a) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) {
            var h = t.osVersion.split("."),
            d = l.querySelector('meta[name="viewport"]');
            t.minimalUi = !t.webView && (a || o) && (1 * h[0] == 7 ? 1 * h[1] >= 1 : 1 * h[0] > 7) && d && d.getAttribute("content").indexOf("minimal-ui") >= 0
        }
        return t.pixelRatio = r.devicePixelRatio || 1,
        t
    } (),
    w = function(t) {
        var i = this,
        r = i.touchEventsData,
        n = i.params,
        s = i.touches,
        a = t;
        if (a.originalEvent && (a = a.originalEvent), r.isTouchEvent = "touchstart" === a.type, (r.isTouchEvent || !("which" in a) || 3 !== a.which) && (!r.isTouched || !r.isMoved)) if (n.noSwiping && e(a.target).closest("." + n.noSwipingClass)[0]) i.allowClick = !0;
        else if (!n.swipeHandler || e(a).closest(n.swipeHandler)[0]) {
            s.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX: a.pageX,
            s.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY: a.pageY;
            var h = s.currentX,
            d = s.currentY;
            if (! (y.ios && !y.cordova && n.iOSEdgeSwipeDetection && h <= n.iOSEdgeSwipeThreshold && h >= window.screen.width - n.iOSEdgeSwipeThreshold)) {
                if (o.extend(r, {
                    isTouched: !0,
                    isMoved: !1,
                    allowTouchCallbacks: !0,
                    isScrolling: void 0,
                    startMoving: void 0
                }), s.startX = h, s.startY = d, r.touchStartTime = o.now(), i.allowClick = !0, i.updateSize(), i.swipeDirection = void 0, n.threshold > 0 && (r.allowThresholdMove = !1), "touchstart" !== a.type) {
                    var c = !0;
                    e(a.target).is(r.formElements) && (c = !1),
                    l.activeElement && e(l.activeElement).is(r.formElements) && l.activeElement.blur(),
                    c && i.allowTouchMove && a.preventDefault()
                }
                i.emit("touchStart", a)
            }
        }
    },
    b = function(t) {
        var i = this,
        r = i.touchEventsData,
        n = i.params,
        s = i.touches,
        a = i.rtl,
        h = t;
        if (h.originalEvent && (h = h.originalEvent), !r.isTouchEvent || "mousemove" !== h.type) {
            var d = "touchmove" === h.type ? h.targetTouches[0].pageX: h.pageX,
            c = "touchmove" === h.type ? h.targetTouches[0].pageY: h.pageY;
            if (h.preventedByNestedSwiper) return s.startX = d,
            void(s.startY = c);
            if (!i.allowTouchMove) return i.allowClick = !1,
            void(r.isTouched && (o.extend(s, {
                startX: d,
                startY: c,
                currentX: d,
                currentY: c
            }), r.touchStartTime = o.now()));
            if (r.isTouchEvent && n.touchReleaseOnEdges && !n.loop) if (i.isVertical()) {
                if (s.currentY < s.startY && i.translate <= i.maxTranslate() || s.currentY > s.startY && i.translate >= i.minTranslate()) return
            } else if (s.currentX < s.startX && i.translate <= i.maxTranslate() || s.currentX > s.startX && i.translate >= i.minTranslate()) return;
            if (r.isTouchEvent && l.activeElement && h.target === l.activeElement && e(h.target).is(r.formElements)) return r.isMoved = !0,
            void(i.allowClick = !1);
            if (r.allowTouchCallbacks && i.emit("touchMove", h), !(h.targetTouches && h.targetTouches.length > 1)) {
                s.currentX = "touchmove" === h.type ? h.targetTouches[0].pageX: h.pageX,
                s.currentY = "touchmove" === h.type ? h.targetTouches[0].pageY: h.pageY;
                var u = s.currentX - s.startX,
                p = s.currentY - s.startY;
                if (void 0 === r.isScrolling) {
                    var f;
                    i.isHorizontal() && s.currentY === s.startY || i.isVertical() && s.currentX === s.startX ? r.isScrolling = !1 : u * u + p * p >= 25 && (f = 180 * Math.atan2(Math.abs(p), Math.abs(u)) / Math.PI, r.isScrolling = i.isHorizontal() ? f > n.touchAngle: 90 - f > n.touchAngle)
                }
                if (r.isScrolling && i.emit("touchMoveOpposite", h), "undefined" == typeof startMoving && (s.currentX === s.startX && s.currentY === s.startY || (r.startMoving = !0)), r.isTouched) if (r.isScrolling) r.isTouched = !1;
                else if (r.startMoving) {
                    i.allowClick = !1,
                    h.preventDefault(),
                    n.touchMoveStopPropagation && !n.nested && h.stopPropagation(),
                    r.isMoved || (n.loop && i.loopFix(), r.startTranslate = i.getTranslate(), i.setTransition(0), i.animating && i.$wrapperEl.trigger("webkitTransitionEnd transitionend"), r.allowMomentumBounce = !1, !n.grabCursor || !0 !== i.allowSlideNext && !0 !== i.allowSlidePrev || i.setGrabCursor(!0), i.emit("sliderFirstMove", h)),
                    i.emit("sliderMove", h),
                    r.isMoved = !0;
                    var m = i.isHorizontal() ? u: p;
                    s.diff = m,
                    m *= n.touchRatio,
                    a && (m = -m),
                    i.swipeDirection = m > 0 ? "prev": "next",
                    r.currentTranslate = m + r.startTranslate;
                    var g = !0,
                    v = n.resistanceRatio;
                    if (n.touchReleaseOnEdges && (v = 0), m > 0 && r.currentTranslate > i.minTranslate() ? (g = !1, n.resistance && (r.currentTranslate = i.minTranslate() - 1 + Math.pow( - i.minTranslate() + r.startTranslate + m, v))) : m < 0 && r.currentTranslate < i.maxTranslate() && (g = !1, n.resistance && (r.currentTranslate = i.maxTranslate() + 1 - Math.pow(i.maxTranslate() - r.startTranslate - m, v))), g && (h.preventedByNestedSwiper = !0), !i.allowSlideNext && "next" === i.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate), !i.allowSlidePrev && "prev" === i.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate), n.threshold > 0) {
                        if (! (Math.abs(m) > n.threshold || r.allowThresholdMove)) return void(r.currentTranslate = r.startTranslate);
                        if (!r.allowThresholdMove) return r.allowThresholdMove = !0,
                        s.startX = s.currentX,
                        s.startY = s.currentY,
                        r.currentTranslate = r.startTranslate,
                        void(s.diff = i.isHorizontal() ? s.currentX - s.startX: s.currentY - s.startY)
                    }
                    n.followFinger && ((n.freeMode || n.watchSlidesProgress || n.watchSlidesVisibility) && (i.updateActiveIndex(), i.updateSlidesClasses()), n.freeMode && (0 === r.velocities.length && r.velocities.push({
                        position: s[i.isHorizontal() ? "startX": "startY"],
                        time: r.touchStartTime
                    }), r.velocities.push({
                        position: s[i.isHorizontal() ? "currentX": "currentY"],
                        time: o.now()
                    })), i.updateProgress(r.currentTranslate), i.setTranslate(r.currentTranslate))
                }
            }
        }
    },
    x = function() {
        var e = this,
        t = e.params,
        i = e.el,
        r = e.allowSlideNext,
        n = e.allowSlidePrev;
        if (!i || 0 !== i.offsetWidth) {
            if (t.breakpoints && e.setBreakpoint(), e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
                var s = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s),
                e.updateActiveIndex(),
                e.updateSlidesClasses(),
                t.autoHeight && e.updateAutoHeight()
            } else e.updateSlidesClasses(),
            ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = n,
            e.allowSlideNext = r
        }
    },
    T = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        iOSEdgeSwipeDetection: !1,
        iOSEdgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0
    },
    S = {
        update: u,
        translate: p,
        transition: {
            setTransition: function(e, t) {
                this.$wrapperEl.transition(e),
                this.emit("setTransition", e, t)
            },
            transitionStart: function(e) {
                void 0 === e && (e = !0);
                var t = this,
                i = t.activeIndex,
                r = t.params,
                n = t.previousIndex;
                r.autoHeight && t.updateAutoHeight(),
                t.emit("transitionStart"),
                e && i !== n && (t.emit("slideChangeTransitionStart"), i > n ? t.emit("slideNextTransitionStart") : t.emit("slidePrevTransitionStart"))
            },
            transitionEnd: function(e) {
                void 0 === e && (e = !0);
                var t = this,
                i = t.activeIndex,
                r = t.previousIndex;
                t.animating = !1,
                t.setTransition(0),
                t.emit("transitionEnd"),
                e && i !== r && (t.emit("slideChangeTransitionEnd"), i > r ? t.emit("slideNextTransitionEnd") : t.emit("slidePrevTransitionEnd"))
            }
        },
        slide: m,
        loop: g,
        grabCursor: v,
        manipulation: _,
        events: {
            attachEvents: function() {
                var e = this,
                t = e.params,
                i = e.touchEvents,
                r = e.el,
                n = e.wrapperEl;
                e.onTouchStart = w.bind(e),
                e.onTouchMove = b.bind(e),
                e.onTouchEnd = function(e) {
                    var t = this,
                    i = t.touchEventsData,
                    r = t.params,
                    n = t.touches,
                    s = t.rtl,
                    a = t.$wrapperEl,
                    l = t.slidesGrid,
                    h = t.snapGrid,
                    d = e;
                    if (d.originalEvent && (d = d.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", d), i.allowTouchCallbacks = !1, i.isTouched) {
                        r.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        var c = o.now(),
                        u = c - i.touchStartTime;
                        if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), u < 300 && c - i.lastClickTime > 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = o.nextTick(function() {
                            t && !t.destroyed && t.emit("click", d)
                        },
                        300)), u < 300 && c - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", d))), i.lastClickTime = o.now(), o.nextTick(function() {
                            t.destroyed || (t.allowClick = !0)
                        }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === n.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1,
                        void(i.isMoved = !1);
                        i.isTouched = !1,
                        i.isMoved = !1;
                        var p;
                        if (p = r.followFinger ? s ? t.translate: -t.translate: -i.currentTranslate, r.freeMode) {
                            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                            if (p > -t.maxTranslate()) return void(t.slides.length < h.length ? t.slideTo(h.length - 1) : t.slideTo(t.slides.length - 1));
                            if (r.freeModeMomentum) {
                                if (i.velocities.length > 1) {
                                    var f = i.velocities.pop(),
                                    m = i.velocities.pop(),
                                    g = f.position - m.position,
                                    v = f.time - m.time;
                                    t.velocity = g / v,
                                    t.velocity /= 2,
                                    Math.abs(t.velocity) < r.freeModeMinimumVelocity && (t.velocity = 0),
                                    (v > 150 || o.now() - f.time > 300) && (t.velocity = 0)
                                } else t.velocity = 0;
                                t.velocity *= r.freeModeMomentumVelocityRatio,
                                i.velocities.length = 0;
                                var _ = 1e3 * r.freeModeMomentumRatio,
                                y = t.velocity * _,
                                w = t.translate + y;
                                s && (w = -w);
                                var b, x = !1,
                                T = 20 * Math.abs(t.velocity) * r.freeModeMomentumBounceRatio;
                                if (w < t.maxTranslate()) r.freeModeMomentumBounce ? (w + t.maxTranslate() < -T && (w = t.maxTranslate() - T), b = t.maxTranslate(), x = !0, i.allowMomentumBounce = !0) : w = t.maxTranslate();
                                else if (w > t.minTranslate()) r.freeModeMomentumBounce ? (w - t.minTranslate() > T && (w = t.minTranslate() + T), b = t.minTranslate(), x = !0, i.allowMomentumBounce = !0) : w = t.minTranslate();
                                else if (r.freeModeSticky) {
                                    for (var S, C = 0; C < h.length; C += 1) if (h[C] > -w) {
                                        S = C;
                                        break
                                    }
                                    w = -(w = Math.abs(h[S] - w) < Math.abs(h[S - 1] - w) || "next" === t.swipeDirection ? h[S] : h[S - 1])
                                }
                                if (0 !== t.velocity) _ = s ? Math.abs(( - w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);
                                else if (r.freeModeSticky) return void t.slideReset();
                                r.freeModeMomentumBounce && x ? (t.updateProgress(b), t.setTransition(_), t.setTranslate(w), t.transitionStart(), t.animating = !0, a.transitionEnd(function() {
                                    t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(r.speed), t.setTranslate(b), a.transitionEnd(function() {
                                        t && !t.destroyed && t.transitionEnd()
                                    }))
                                })) : t.velocity ? (t.updateProgress(w), t.setTransition(_), t.setTranslate(w), t.transitionStart(), t.animating || (t.animating = !0, a.transitionEnd(function() {
                                    t && !t.destroyed && t.transitionEnd()
                                }))) : t.updateProgress(w),
                                t.updateActiveIndex(),
                                t.updateSlidesClasses()
                            } (!r.freeModeMomentum || u >= r.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                        } else {
                            for (var E = 0,
                            P = t.slidesSizesGrid[0], k = 0; k < l.length; k += r.slidesPerGroup) void 0 !== l[k + r.slidesPerGroup] ? p >= l[k] && p < l[k + r.slidesPerGroup] && (E = k, P = l[k + r.slidesPerGroup] - l[k]) : p >= l[k] && (E = k, P = l[l.length - 1] - l[l.length - 2]);
                            var M = (p - l[E]) / P;
                            if (u > r.longSwipesMs) {
                                if (!r.longSwipes) return void t.slideTo(t.activeIndex);
                                "next" === t.swipeDirection && (M >= r.longSwipesRatio ? t.slideTo(E + r.slidesPerGroup) : t.slideTo(E)),
                                "prev" === t.swipeDirection && (M > 1 - r.longSwipesRatio ? t.slideTo(E + r.slidesPerGroup) : t.slideTo(E))
                            } else {
                                if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
                                "next" === t.swipeDirection && t.slideTo(E + r.slidesPerGroup),
                                "prev" === t.swipeDirection && t.slideTo(E)
                            }
                        }
                    }
                }.bind(e),
                e.onClick = function(e) {
                    var t = this;
                    t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                }.bind(e);
                var s = "container" === t.touchEventsTarget ? r: n,
                a = !!t.nested;
                if (f.ie) s.addEventListener(i.start, e.onTouchStart, !1),
                (h.touch ? s: l).addEventListener(i.move, e.onTouchMove, a),
                (h.touch ? s: l).addEventListener(i.end, e.onTouchEnd, !1);
                else {
                    if (h.touch) {
                        var d = !("touchstart" !== i.start || !h.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.addEventListener(i.start, e.onTouchStart, d),
                        s.addEventListener(i.move, e.onTouchMove, h.passiveListener ? {
                            passive: !1,
                            capture: a
                        }: a),
                        s.addEventListener(i.end, e.onTouchEnd, d)
                    } (t.simulateTouch && !y.ios && !y.android || t.simulateTouch && !h.touch && y.ios) && (s.addEventListener("mousedown", e.onTouchStart, !1), l.addEventListener("mousemove", e.onTouchMove, a), l.addEventListener("mouseup", e.onTouchEnd, !1))
                } (t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", e.onClick, !0),
                e.on("resize observerUpdate", x)
            },
            detachEvents: function() {
                var e = this,
                t = e.params,
                i = e.touchEvents,
                r = e.el,
                n = e.wrapperEl,
                s = "container" === t.touchEventsTarget ? r: n,
                a = !!t.nested;
                if (f.ie) s.removeEventListener(i.start, e.onTouchStart, !1),
                (h.touch ? s: l).removeEventListener(i.move, e.onTouchMove, a),
                (h.touch ? s: l).removeEventListener(i.end, e.onTouchEnd, !1);
                else {
                    if (h.touch) {
                        var o = !("onTouchStart" !== i.start || !h.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.removeEventListener(i.start, e.onTouchStart, o),
                        s.removeEventListener(i.move, e.onTouchMove, a),
                        s.removeEventListener(i.end, e.onTouchEnd, o)
                    } (t.simulateTouch && !y.ios && !y.android || t.simulateTouch && !h.touch && y.ios) && (s.removeEventListener("mousedown", e.onTouchStart, !1), l.removeEventListener("mousemove", e.onTouchMove, a), l.removeEventListener("mouseup", e.onTouchEnd, !1))
                } (t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", e.onClick, !0),
                e.off("resize observerUpdate", x)
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                var e = this,
                t = e.activeIndex,
                i = e.loopedSlides;
                void 0 === i && (i = 0);
                var r = e.params,
                n = r.breakpoints;
                if (n && (!n || 0 !== Object.keys(n).length)) {
                    var s = e.getBreakpoint(n);
                    if (s && e.currentBreakpoint !== s) {
                        var a = s in n ? n[s] : e.originalParams,
                        l = r.loop && a.slidesPerView !== r.slidesPerView;
                        if (o.extend(e.params, a), o.extend(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }), e.currentBreakpoint = s, l) {
                            var h = t - i;
                            e.loopDestroy(),
                            e.loopCreate(),
                            e.updateSlides(),
                            e.slideTo(h + i, 0, !1)
                        }
                        e.emit("breakpoint", a)
                    }
                }
            },
            getBreakpoint: function(e) {
                if (e) {
                    var t = !1,
                    i = [];
                    Object.keys(e).forEach(function(e) {
                        i.push(e)
                    }),
                    i.sort(function(e, t) {
                        return parseInt(e, 10) > parseInt(t, 10)
                    });
                    for (var n = 0; n < i.length; n += 1) {
                        var s = i[n];
                        s >= r.innerWidth && !t && (t = s)
                    }
                    return t || "max"
                }
            }
        },
        classes: {
            addClasses: function() {
                var e = this,
                t = e.classNames,
                i = e.params,
                n = e.rtl,
                s = e.$el,
                a = [];
                a.push(i.direction),
                i.freeMode && a.push("free-mode"),
                h.flexbox || a.push("no-flexbox"),
                i.autoHeight && a.push("autoheight"),
                n && a.push("rtl"),
                i.slidesPerColumn > 1 && a.push("multirow"),
                y.android && a.push("android"),
                y.ios && a.push("ios"),
                (r.navigator.pointerEnabled || r.navigator.msPointerEnabled) && a.push("wp8-" + i.direction),
                a.forEach(function(e) {
                    t.push(i.containerModifierClass + e)
                }),
                s.addClass(t.join(" "))
            },
            removeClasses: function() {
                var e = this.$el,
                t = this.classNames;
                e.removeClass(t.join(" "))
            }
        },
        images: {
            loadImage: function(e, t, i, n, s, a) {
                function o() {
                    a && a()
                }
                var l;
                e.complete && s ? o() : t ? ((l = new r.Image).onload = o, l.onerror = o, n && (l.sizes = n), i && (l.srcset = i), t && (l.src = t)) : o()
            },
            preloadImages: function() {
                var e = this;
                e.imagesToLoad = e.$el.find("img");
                for (var t = 0; t < e.imagesToLoad.length; t += 1) {
                    var i = e.imagesToLoad[t];
                    e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0,
                    function() {
                        void 0 !== e && null !== e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    })
                }
            }
        }
    },
    C = {},
    E = function(t) {
        function i() {
            for (var n = [], s = arguments.length; s--;) n[s] = arguments[s];
            var a, l;
            if (1 === n.length && n[0].constructor && n[0].constructor === Object) l = n[0];
            else {
                var d;
                a = (d = n)[0],
                l = d[1]
            }
            l || (l = {}),
            l = o.extend({},
            l),
            a && !l.el && (l.el = a),
            t.call(this, l),
            Object.keys(S).forEach(function(e) {
                Object.keys(S[e]).forEach(function(t) {
                    i.prototype[t] || (i.prototype[t] = S[e][t])
                })
            });
            var c = this;
            Object.keys(c.modules).forEach(function(e) {
                var t = c.modules[e];
                if (t.params) {
                    var i = Object.keys(t.params)[0],
                    r = t.params[i];
                    if ("object" != typeof r) return;
                    if (! (i in l && "enabled" in r)) return; ! 0 === l[i] && (l[i] = {
                        enabled: !0
                    }),
                    "object" != typeof l[i] || "enabled" in l[i] || (l[i].enabled = !0),
                    l[i] || (l[i] = {
                        enabled: !1
                    })
                }
            });
            var u = o.extend({},
            T);
            c.useModulesParams(u),
            c.params = o.extend({},
            u, C, l),
            c.originalParams = o.extend({},
            c.params),
            c.passedParams = o.extend({},
            l);
            var p = e(c.params.el);
            if (a = p[0]) {
                if (p.length > 1) {
                    var f = [];
                    return p.each(function(e, t) {
                        var r = o.extend({},
                        l, {
                            el: t
                        });
                        f.push(new i(r))
                    }),
                    f
                }
                a.swiper = c,
                p.data("swiper", c);
                var m = p.children("." + c.params.wrapperClass);
                return o.extend(c, {
                    $el: p,
                    el: a,
                    $wrapperEl: m,
                    wrapperEl: m[0],
                    classNames: [],
                    slides: e(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: function() {
                        return "horizontal" === c.params.direction
                    },
                    isVertical: function() {
                        return "vertical" === c.params.direction
                    },
                    rtl: "horizontal" === c.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === p.css("direction")),
                    wrongRTL: "-webkit-box" === m.css("display"),
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: c.params.allowSlideNext,
                    allowSlidePrev: c.params.allowSlidePrev,
                    touchEvents: function() {
                        var e = ["touchstart", "touchmove", "touchend"],
                        t = ["mousedown", "mousemove", "mouseup"];
                        return r.navigator.pointerEnabled ? t = ["pointerdown", "pointermove", "pointerup"] : r.navigator.msPointerEnabled && (t = ["MSPointerDown", "MsPointerMove", "MsPointerUp"]),
                        {
                            start: h.touch || !c.params.simulateTouch ? e[0] : t[0],
                            move: h.touch || !c.params.simulateTouch ? e[1] : t[1],
                            end: h.touch || !c.params.simulateTouch ? e[2] : t[2]
                        }
                    } (),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        formElements: "input, select, option, textarea, button, video",
                        lastClickTime: o.now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: !0,
                    allowTouchMove: c.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                }),
                c.useModules(),
                c.params.init && c.init(),
                c
            }
        }
        t && (i.__proto__ = t),
        (i.prototype = Object.create(t && t.prototype)).constructor = i;
        var n = {
            extendedDefaults: {},
            defaults: {},
            Class: {},
            $: {}
        };
        return i.prototype.slidesPerViewDynamic = function() {
            var e = this,
            t = e.params,
            i = e.slides,
            r = e.slidesGrid,
            n = e.size,
            s = e.activeIndex,
            a = 1;
            if (t.centeredSlides) {
                for (var o, l = i[s].swiperSlideSize, h = s + 1; h < i.length; h += 1) i[h] && !o && (a += 1, (l += i[h].swiperSlideSize) > n && (o = !0));
                for (var d = s - 1; d >= 0; d -= 1) i[d] && !o && (a += 1, (l += i[d].swiperSlideSize) > n && (o = !0))
            } else for (var c = s + 1; c < i.length; c += 1) r[c] - r[s] < n && (a += 1);
            return a
        },
        i.prototype.update = function() {
            function e() {
                i = Math.min(Math.max(t.translate, t.maxTranslate()), t.minTranslate()),
                t.setTranslate(i),
                t.updateActiveIndex(),
                t.updateSlidesClasses()
            }
            var t = this;
            if (t && !t.destroyed) {
                t.updateSize(),
                t.updateSlides(),
                t.updateProgress(),
                t.updateSlidesClasses();
                var i;
                t.params.freeMode ? (e(), t.params.autoHeight && t.updateAutoHeight()) : (("auto" === t.params.slidesPerView || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0)) || e(),
                t.emit("update")
            }
        },
        i.prototype.init = function() {
            var e = this;
            e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
        },
        i.prototype.destroy = function(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            var i = this,
            r = i.params,
            n = i.$el,
            s = i.$wrapperEl,
            a = i.slides;
            i.emit("beforeDestroy"),
            i.initialized = !1,
            i.detachEvents(),
            r.loop && i.loopDestroy(),
            t && (i.removeClasses(), n.removeAttr("style"), s.removeAttr("style"), a && a.length && a.removeClass([r.slideVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach(function(e) {
                i.off(e)
            }),
            !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), o.deleteProps(i)),
            i.destroyed = !0
        },
        i.extendDefaults = function(e) {
            o.extend(C, e)
        },
        n.extendedDefaults.get = function() {
            return C
        },
        n.defaults.get = function() {
            return T
        },
        n.Class.get = function() {
            return t
        },
        n.$.get = function() {
            return e
        },
        Object.defineProperties(i, n),
        i
    } (d),
    P = {
        name: "device",
        proto: {
            device: y
        },
        static: {
            device: y
        }
    },
    k = {
        name: "support",
        proto: {
            support: h
        },
        static: {
            support: h
        }
    },
    M = {
        name: "browser",
        proto: {
            browser: f
        },
        static: {
            browser: f
        }
    },
    O = {
        name: "resize",
        create: function() {
            var e = this;
            o.extend(e, {
                resize: {
                    resizeHandler: function() {
                        e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                    },
                    orientationChangeHandler: function() {
                        e && !e.destroyed && e.initialized && e.emit("orientationchange")
                    }
                }
            })
        },
        on: {
            init: function() {
                r.addEventListener("resize", this.resize.resizeHandler),
                r.addEventListener("orientationchange", this.resize.orientationChangeHandler)
            },
            destroy: function() {
                r.removeEventListener("resize", this.resize.resizeHandler),
                r.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
            }
        }
    },
    z = {
        func: r.MutationObserver || r.WebkitMutationObserver,
        attach: function(e, t) {
            void 0 === t && (t = {});
            var i = this,
            r = new(0, z.func)(function(e) {
                e.forEach(function(e) {
                    i.emit("observerUpdate", e)
                })
            });
            r.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
            i.observer.observers.push(r)
        },
        init: function() {
            var e = this;
            if (h.observer && e.params.observer) {
                if (e.params.observeParents) for (var t = e.$el.parents(), i = 0; i < t.length; i += 1) e.observer.attach(t[i]);
                e.observer.attach(e.$el[0], {
                    childList: !1
                }),
                e.observer.attach(e.$wrapperEl[0], {
                    attributes: !1
                })
            }
        },
        destroy: function() {
            this.observer.observers.forEach(function(e) {
                e.disconnect()
            }),
            this.observer.observers = []
        }
    },
    A = {
        name: "observer",
        params: {
            observer: !1,
            observeParents: !1
        },
        create: function() {
            var e = this;
            o.extend(e, {
                observer: {
                    init: z.init.bind(e),
                    attach: z.attach.bind(e),
                    destroy: z.destroy.bind(e),
                    observers: []
                }
            })
        },
        on: {
            init: function() {
                this.observer.init()
            },
            destroy: function() {
                this.observer.destroy()
            }
        }
    },
    L = {
        update: function(e) {
            function t() {
                i.updateSlides(),
                i.updateProgress(),
                i.updateSlidesClasses(),
                i.lazy && i.params.lazy.enabled && i.lazy.load()
            }
            var i = this,
            r = i.params,
            n = r.slidesPerView,
            s = r.slidesPerGroup,
            a = r.centeredSlides,
            l = i.virtual,
            h = l.from,
            d = l.to,
            c = l.slides,
            u = l.slidesGrid,
            p = l.renderSlide,
            f = l.offset;
            i.updateActiveIndex();
            var m, g = i.activeIndex || 0;
            m = i.rtl && i.isHorizontal() ? "right": i.isHorizontal() ? "left": "top";
            var v, _;
            a ? (v = Math.floor(n / 2) + s, _ = Math.floor(n / 2) + s) : (v = n + (s - 1), _ = s);
            var y = Math.max((g || 0) - _, 0),
            w = Math.min((g || 0) + v, c.length - 1),
            b = (i.slidesGrid[y] || 0) - (i.slidesGrid[0] || 0);
            if (o.extend(i.virtual, {
                from: y,
                to: w,
                offset: b,
                slidesGrid: i.slidesGrid
            }), h === y && d === w && !e) return i.slidesGrid !== u && b !== f && i.slides.css(m, b + "px"),
            void i.updateProgress();
            if (i.params.virtual.renderExternal) return i.params.virtual.renderExternal.call(i, {
                offset: b,
                from: y,
                to: w,
                slides: function() {
                    for (var e = [], t = y; t <= w; t += 1) e.push(c[t]);
                    return e
                } ()
            }),
            void t();
            var x = [],
            T = [];
            if (e) i.$wrapperEl.find("." + i.params.slideClass).remove();
            else for (var S = h; S <= d; S += 1)(S < y || S > w) && i.$wrapperEl.find("." + i.params.slideClass + '[data-swiper-slide-index="' + S + '"]').remove();
            for (var C = 0; C < c.length; C += 1) C >= y && C <= w && (void 0 === d || e ? T.push(C) : (C > d && T.push(C), C < h && x.push(C)));
            T.forEach(function(e) {
                i.$wrapperEl.append(p(c[e], e))
            }),
            x.sort(function(e, t) {
                return e < t
            }).forEach(function(e) {
                i.$wrapperEl.prepend(p(c[e], e))
            }),
            i.$wrapperEl.children(".swiper-slide").css(m, b + "px"),
            t()
        },
        renderSlide: function(t, i) {
            var r = this,
            n = r.params.virtual;
            if (n.cache && r.virtual.cache[i]) return r.virtual.cache[i];
            var s = e(n.renderSlide ? n.renderSlide.call(r, t, i) : '<div class="' + r.params.slideClass + '" data-swiper-slide-index="' + i + '">' + t + "</div>");
            return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", i),
            n.cache && (r.virtual.cache[i] = s),
            s
        },
        appendSlide: function(e) {
            this.virtual.slides.push(e),
            this.virtual.update(!0)
        },
        prependSlide: function(e) {
            var t = this;
            if (t.virtual.slides.unshift(e), t.params.virtual.cache) {
                var i = t.virtual.cache,
                r = {};
                Object.keys(i).forEach(function(e) {
                    r[e + 1] = i[e]
                }),
                t.virtual.cache = r
            }
            t.virtual.update(!0),
            t.slideNext(0)
        }
    },
    D = {
        name: "virtual",
        params: {
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                virtual: {
                    update: L.update.bind(e),
                    appendSlide: L.appendSlide.bind(e),
                    prependSlide: L.prependSlide.bind(e),
                    renderSlide: L.renderSlide.bind(e),
                    slides: e.params.virtual.slides,
                    cache: {}
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if (e.params.virtual.enabled) {
                    e.classNames.push(e.params.containerModifierClass + "virtual");
                    var t = {
                        watchSlidesProgress: !0
                    };
                    o.extend(e.params, t),
                    o.extend(e.originalParams, t),
                    e.virtual.update()
                }
            },
            setTranslate: function() {
                this.params.virtual.enabled && this.virtual.update()
            }
        }
    },
    R = {
        handle: function(e) {
            var t = this,
            i = e;
            i.originalEvent && (i = i.originalEvent);
            var n = i.keyCode || i.charCode;
            if (!t.allowSlideNext && (t.isHorizontal() && 39 === n || t.isVertical() && 40 === n)) return ! 1;
            if (!t.allowSlidePrev && (t.isHorizontal() && 37 === n || t.isVertical() && 38 === n)) return ! 1;
            if (! (i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || l.activeElement && l.activeElement.nodeName && ("input" === l.activeElement.nodeName.toLowerCase() || "textarea" === l.activeElement.nodeName.toLowerCase()))) {
                if (37 === n || 39 === n || 38 === n || 40 === n) {
                    var s = !1;
                    if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                    var a = {
                        left: r.pageXOffset,
                        top: r.pageYOffset
                    },
                    o = r.innerWidth,
                    h = r.innerHeight,
                    d = t.$el.offset();
                    t.rtl && (d.left -= t.$el[0].scrollLeft);
                    for (var c = [[d.left, d.top], [d.left + t.width, d.top], [d.left, d.top + t.height], [d.left + t.width, d.top + t.height]], u = 0; u < c.length; u += 1) {
                        var p = c[u];
                        p[0] >= a.left && p[0] <= a.left + o && p[1] >= a.top && p[1] <= a.top + h && (s = !0)
                    }
                    if (!s) return
                }
                t.isHorizontal() ? (37 !== n && 39 !== n || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (39 === n && !t.rtl || 37 === n && t.rtl) && t.slideNext(), (37 === n && !t.rtl || 39 === n && t.rtl) && t.slidePrev()) : (38 !== n && 40 !== n || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), 40 === n && t.slideNext(), 38 === n && t.slidePrev()),
                t.emit("keyPress", n)
            }
        },
        enable: function() {
            var t = this;
            t.keyboard.enabled || (e(l).on("keydown", t.keyboard.handle), t.keyboard.enabled = !0)
        },
        disable: function() {
            var t = this;
            t.keyboard.enabled && (e(l).off("keydown", t.keyboard.handle), t.keyboard.enabled = !1)
        }
    },
    I = {
        name: "keyboard",
        params: {
            keyboard: {
                enabled: !1
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                keyboard: {
                    enabled: !1,
                    enable: R.enable.bind(e),
                    disable: R.disable.bind(e),
                    handle: R.handle.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.params.keyboard.enabled && this.keyboard.enable()
            },
            destroy: function() {
                this.keyboard.enabled && this.keyboard.disable()
            }
        }
    },
    X = {
        lastScrollTime: o.now(),
        event: r.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll": function() {
            var e = "onwheel" in l;
            if (!e) {
                var t = l.createElement("div");
                t.setAttribute("onwheel", "return;"),
                e = "function" == typeof t.onwheel
            }
            return ! e && l.implementation && l.implementation.hasFeature && !0 !== l.implementation.hasFeature("", "") && (e = l.implementation.hasFeature("Events.wheel", "3.0")),
            e
        } () ? "wheel": "mousewheel",
        normalize: function(e) {
            var t = 0,
            i = 0,
            r = 0,
            n = 0;
            return "detail" in e && (i = e.detail),
            "wheelDelta" in e && (i = -e.wheelDelta / 120),
            "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
            "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
            "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0),
            r = 10 * t,
            n = 10 * i,
            "deltaY" in e && (n = e.deltaY),
            "deltaX" in e && (r = e.deltaX),
            (r || n) && e.deltaMode && (1 === e.deltaMode ? (r *= 40, n *= 40) : (r *= 800, n *= 800)),
            r && !t && (t = r < 1 ? -1 : 1),
            n && !i && (i = n < 1 ? -1 : 1),
            {
                spinX: t,
                spinY: i,
                pixelX: r,
                pixelY: n
            }
        },
        handle: function(e) {
            var t = e,
            i = this,
            n = i.params.mousewheel;
            t.originalEvent && (t = t.originalEvent);
            var s = 0,
            a = i.rtl ? -1 : 1,
            l = X.normalize(t);
            if (n.forceToAxis) if (i.isHorizontal()) {
                if (! (Math.abs(l.pixelX) > Math.abs(l.pixelY))) return ! 0;
                s = l.pixelX * a
            } else {
                if (! (Math.abs(l.pixelY) > Math.abs(l.pixelX))) return ! 0;
                s = l.pixelY
            } else s = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * a: -l.pixelY;
            if (0 === s) return ! 0;
            if (n.invert && (s = -s), i.params.freeMode) {
                var h = i.getTranslate() + s * n.sensitivity,
                d = i.isBeginning,
                c = i.isEnd;
                if (h >= i.minTranslate() && (h = i.minTranslate()), h <= i.maxTranslate() && (h = i.maxTranslate()), i.setTransition(0), i.setTranslate(h), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!d && i.isBeginning || !c && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky && (clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = o.nextTick(function() {
                    i.slideReset()
                },
                300)), i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.stopAutoplay(), 0 === h || h === i.maxTranslate()) return ! 0
            } else {
                if (o.now() - i.mousewheel.lastScrollTime > 60) if (s < 0) if (i.isEnd && !i.params.loop || i.animating) {
                    if (n.releaseOnEdges) return ! 0
                } else i.slideNext(),
                i.emit("scroll", t);
                else if (i.isBeginning && !i.params.loop || i.animating) {
                    if (n.releaseOnEdges) return ! 0
                } else i.slidePrev(),
                i.emit("scroll", t);
                i.mousewheel.lastScrollTime = (new r.Date).getTime()
            }
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
            !1
        },
        enable: function() {
            var t = this;
            if (!X.event) return ! 1;
            if (t.mousewheel.enabled) return ! 1;
            var i = t.$el;
            return "container" !== t.params.mousewheel.eventsTarged && (i = e(t.params.mousewheel.eventsTarged)),
            i.on(X.event, t.mousewheel.handle),
            t.mousewheel.enabled = !0,
            !0
        },
        disable: function() {
            var t = this;
            if (!X.event) return ! 1;
            if (!t.mousewheel.enabled) return ! 1;
            var i = t.$el;
            return "container" !== t.params.mousewheel.eventsTarged && (i = e(t.params.mousewheel.eventsTarged)),
            i.off(X.event, t.mousewheel.handle),
            t.mousewheel.enabled = !1,
            !0
        }
    },
    N = {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                mousewheel: {
                    enabled: !1,
                    enable: X.enable.bind(e),
                    disable: X.disable.bind(e),
                    handle: X.handle.bind(e),
                    lastScrollTime: o.now()
                }
            })
        },
        on: {
            init: function() {
                this.params.mousewheel.enabled && this.mousewheel.enable()
            },
            destroy: function() {
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    },
    $ = {
        update: function() {
            var e = this,
            t = e.params.navigation;
            if (!e.params.loop) {
                var i = e.navigation,
                r = i.$nextEl,
                n = i.$prevEl;
                n && n.length > 0 && (e.isBeginning ? n.addClass(t.disabledClass) : n.removeClass(t.disabledClass)),
                r && r.length > 0 && (e.isEnd ? r.addClass(t.disabledClass) : r.removeClass(t.disabledClass))
            }
        },
        init: function() {
            var t = this,
            i = t.params.navigation;
            if (i.nextEl || i.prevEl) {
                var r, n;
                i.nextEl && (r = e(i.nextEl), t.params.uniqueNavElements && "string" == typeof i.nextEl && r.length > 1 && 1 === t.$el.find(i.nextEl).length && (r = t.$el.find(i.nextEl))),
                i.prevEl && (n = e(i.prevEl), t.params.uniqueNavElements && "string" == typeof i.prevEl && n.length > 1 && 1 === t.$el.find(i.prevEl).length && (n = t.$el.find(i.prevEl))),
                r && r.length > 0 && r.on("click",
                function(e) {
                    e.preventDefault(),
                    t.isEnd && !t.params.loop || t.slideNext()
                }),
                n && n.length > 0 && n.on("click",
                function(e) {
                    e.preventDefault(),
                    t.isBeginning && !t.params.loop || t.slidePrev()
                }),
                o.extend(t.navigation, {
                    $nextEl: r,
                    nextEl: r && r[0],
                    $prevEl: n,
                    prevEl: n && n[0]
                })
            }
        },
        destroy: function() {
            var e = this,
            t = e.navigation,
            i = t.$nextEl,
            r = t.$prevEl;
            i && i.length && (i.off("click"), i.removeClass(e.params.navigation.disabledClass)),
            r && r.length && (r.off("click"), r.removeClass(e.params.navigation.disabledClass))
        }
    },
    F = {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden"
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                navigation: {
                    init: $.init.bind(e),
                    update: $.update.bind(e),
                    destroy: $.destroy.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.navigation.init(),
                this.navigation.update()
            },
            toEdge: function() {
                this.navigation.update()
            },
            fromEdge: function() {
                this.navigation.update()
            },
            destroy: function() {
                this.navigation.destroy()
            },
            click: function(t) {
                var i = this,
                r = i.navigation,
                n = r.$nextEl,
                s = r.$prevEl; ! i.params.navigation.hideOnClick || e(t.target).is(s) || e(t.target).is(n) || (n && n.toggleClass(i.params.navigation.hiddenClass), s && s.toggleClass(i.params.navigation.hiddenClass))
            }
        }
    },
    B = {
        update: function() {
            var t = this,
            i = t.rtl,
            r = t.params.pagination;
            if (r.el && t.pagination.el && t.pagination.$el && 0 !== t.pagination.$el.length) {
                var n, s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length: t.slides.length,
                a = t.pagination.$el,
                o = t.params.loop ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                if (t.params.loop ? ((n = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup)) > s - 1 - 2 * t.loopedSlides && (n -= s - 2 * t.loopedSlides), n > o - 1 && (n -= o), n < 0 && "bullets" !== t.params.paginationType && (n = o + n)) : n = void 0 !== t.snapIndex ? t.snapIndex: t.activeIndex || 0, "bullets" === r.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
                    var l = t.pagination.bullets;
                    if (r.dynamicBullets && (t.pagination.bulletSize = l.eq(0)[t.isHorizontal() ? "outerWidth": "outerHeight"](!0), a.css(t.isHorizontal() ? "width": "height", 5 * t.pagination.bulletSize + "px")), l.removeClass(r.bulletActiveClass + " " + r.bulletActiveClass + "-next " + r.bulletActiveClass + "-next-next " + r.bulletActiveClass + "-prev " + r.bulletActiveClass + "-prev-prev"), a.length > 1) l.each(function(t, i) {
                        var s = e(i);
                        s.index() === n && (s.addClass(r.bulletActiveClass), r.dynamicBullets && (s.prev().addClass(r.bulletActiveClass + "-prev").prev().addClass(r.bulletActiveClass + "-prev-prev"), s.next().addClass(r.bulletActiveClass + "-next").next().addClass(r.bulletActiveClass + "-next-next")))
                    });
                    else {
                        var h = l.eq(n);
                        h.addClass(r.bulletActiveClass),
                        r.dynamicBullets && (h.prev().addClass(r.bulletActiveClass + "-prev").prev().addClass(r.bulletActiveClass + "-prev-prev"), h.next().addClass(r.bulletActiveClass + "-next").next().addClass(r.bulletActiveClass + "-next-next"))
                    }
                    if (r.dynamicBullets) {
                        var d = Math.min(l.length, 5),
                        c = (t.pagination.bulletSize * d - t.pagination.bulletSize) / 2 - n * t.pagination.bulletSize,
                        u = i ? "right": "left";
                        l.css(t.isHorizontal() ? u: "top", c + "px")
                    }
                }
                if ("fraction" === r.type && (a.find("." + r.currentClass).text(n + 1), a.find("." + r.totalClass).text(o)), "progressbar" === r.type) {
                    var p = (n + 1) / o,
                    f = p,
                    m = 1;
                    t.isHorizontal() || (m = p, f = 1),
                    a.find("." + r.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + f + ") scaleY(" + m + ")").transition(t.params.speed)
                }
                "custom" === r.type && r.renderCustom ? (a.html(r.renderCustom(t, n + 1, o)), t.emit("paginationRender", t, a[0])) : t.emit("paginationUpdate", t, a[0])
            }
        },
        render: function() {
            var e = this,
            t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length: e.slides.length,
                r = e.pagination.$el,
                n = "";
                if ("bullets" === t.type) {
                    for (var s = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, a = 0; a < s; a += 1) t.renderBullet ? n += t.renderBullet.call(e, a, t.bulletClass) : n += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                    r.html(n),
                    e.pagination.bullets = r.find("." + t.bulletClass)
                }
                "fraction" === t.type && (n = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', r.html(n)),
                "progressbar" === t.type && (n = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', r.html(n)),
                "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
            }
        },
        init: function() {
            var t = this,
            i = t.params.pagination;
            if (i.el) {
                var r = e(i.el);
                0 !== r.length && (t.params.uniqueNavElements && "string" == typeof i.el && r.length > 1 && 1 === t.$el.find(i.el).length && (r = t.$el.find(i.el)), "bullets" === i.type && i.clickable && r.addClass(i.clickableClass), r.addClass(i.modifierClass + i.type), "bullets" === i.type && i.dynamicBullets && r.addClass("" + i.modifierClass + i.type + "-dynamic"), i.clickable && r.on("click", "." + i.bulletClass,
                function(i) {
                    i.preventDefault();
                    var r = e(this).index() * t.params.slidesPerGroup;
                    t.params.loop && (r += t.loopedSlides),
                    t.slideTo(r)
                }), o.extend(t.pagination, {
                    $el: r,
                    el: r[0]
                }))
            }
        },
        destroy: function() {
            var e = this,
            t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var i = e.pagination.$el;
                i.removeClass(t.hiddenClass),
                i.removeClass(t.modifierClass + t.type),
                e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass),
                t.clickable && i.off("click", "." + t.bulletClass)
            }
        }
    },
    Y = {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                type: "bullets",
                dynamicBullets: !1,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                clickableClass: "swiper-pagination-clickable"
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                pagination: {
                    init: B.init.bind(e),
                    render: B.render.bind(e),
                    update: B.update.bind(e),
                    destroy: B.destroy.bind(e)
                }
            })
        },
        on: {
            init: function() {
                var e = this;
                e.pagination.init(),
                e.pagination.render(),
                e.pagination.update()
            },
            activeIndexChange: function() {
                var e = this;
                e.params.loop ? e.pagination.update() : void 0 === e.snapIndex && e.pagination.update()
            },
            snapIndexChange: function() {
                this.params.loop || this.pagination.update()
            },
            slidesLengthChange: function() {
                var e = this;
                e.params.loop && (e.pagination.render(), e.pagination.update())
            },
            snapGridLengthChange: function() {
                var e = this;
                e.params.loop || (e.pagination.render(), e.pagination.update())
            },
            destroy: function() {
                this.pagination.destroy()
            },
            click: function(t) {
                var i = this;
                i.params.pagination.el && i.params.pagination.hideOnClick && i.pagination.$el.length > 0 && !e(t.target).hasClass(i.params.pagination.bulletClass) && i.pagination.$el.toggleClass(i.params.pagination.hiddenClass)
            }
        }
    },
    H = {
        setTranslate: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar,
                i = e.rtl,
                r = e.progress,
                n = t.dragSize,
                s = t.trackSize,
                a = t.$dragEl,
                o = t.$el,
                l = e.params.scrollbar,
                d = n,
                c = (s - n) * r;
                i && e.isHorizontal() ? (c = -c) > 0 ? (d = n - c, c = 0) : -c + n > s && (d = s + c) : c < 0 ? (d = n + c, c = 0) : c + n > s && (d = s - c),
                e.isHorizontal() ? (h.transforms3d ? a.transform("translate3d(" + c + "px, 0, 0)") : a.transform("translateX(" + c + "px)"), a[0].style.width = d + "px") : (h.transforms3d ? a.transform("translate3d(0px, " + c + "px, 0)") : a.transform("translateY(" + c + "px)"), a[0].style.height = d + "px"),
                l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(function() {
                    o[0].style.opacity = 0,
                    o.transition(400)
                },
                1e3))
            }
        },
        setTransition: function(e) {
            var t = this;
            t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e)
        },
        updateSize: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar,
                i = t.$dragEl,
                r = t.$el;
                i[0].style.width = "",
                i[0].style.height = "";
                var n, s = e.isHorizontal() ? r[0].offsetWidth: r[0].offsetHeight,
                a = e.size / e.virtualSize,
                l = a * (s / e.size);
                n = "auto" === e.params.scrollbar.dragSize ? s * a: parseInt(e.params.scrollbar.dragSize, 10),
                e.isHorizontal() ? i[0].style.width = n + "px": i[0].style.height = n + "px",
                r[0].style.display = a >= 1 ? "none": "",
                e.params.scrollbarHide && (r[0].style.opacity = 0),
                o.extend(t, {
                    trackSize: s,
                    divider: a,
                    moveDivider: l,
                    dragSize: n
                })
            }
        },
        setDragPosition: function(e) {
            var t, i = this,
            r = i.scrollbar,
            n = r.$el,
            s = r.dragSize,
            a = r.moveDivider,
            o = (t = i.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX: e.pageX || e.clientX: "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY: e.pageY || e.clientY) - n.offset()[i.isHorizontal() ? "left": "top"] - s / 2,
            l = -i.minTranslate() * a,
            h = -i.maxTranslate() * a;
            o < l ? o = l: o > h && (o = h),
            i.rtl && (o = h - o),
            o = -o / a,
            i.updateProgress(o),
            i.setTranslate(o),
            i.updateActiveIndex(),
            i.updateSlidesClasses()
        },
        onDragStart: function(e) {
            var t = this,
            i = t.params.scrollbar,
            r = t.scrollbar,
            n = t.$wrapperEl,
            s = r.$el,
            a = r.$dragEl;
            t.scrollbar.isTouched = !0,
            e.preventDefault(),
            e.stopPropagation(),
            n.transition(100),
            a.transition(100),
            r.setDragPosition(e),
            clearTimeout(t.scrollbar.dragTimeout),
            s.transition(0),
            i.hide && s.css("opacity", 1),
            t.emit("scrollbarDragStart", e)
        },
        onDragMove: function(e) {
            var t = this,
            i = t.scrollbar,
            r = t.$wrapperEl,
            n = i.$el,
            s = i.$dragEl;
            t.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, i.setDragPosition(e), r.transition(0), n.transition(0), s.transition(0), t.emit("scrollbarDragMove", e))
        },
        onDragEnd: function(e) {
            var t = this,
            i = t.params.scrollbar,
            r = t.scrollbar.$el;
            t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, i.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = o.nextTick(function() {
                r.css("opacity", 0),
                r.transition(400)
            },
            1e3)), t.emit("scrollbarDragEnd", e), i.snapOnRelease && t.slideReset())
        },
        enableDraggable: function() {
            var t = this;
            if (t.params.scrollbar.el) {
                var i = t.scrollbar.$el,
                r = h.touch ? i[0] : document;
                i.on(t.scrollbar.dragEvents.start, t.scrollbar.onDragStart),
                e(r).on(t.scrollbar.dragEvents.move, t.scrollbar.onDragMove),
                e(r).on(t.scrollbar.dragEvents.end, t.scrollbar.onDragEnd)
            }
        },
        disableDraggable: function() {
            var t = this;
            if (t.params.scrollbar.el) {
                var i = t.scrollbar.$el,
                r = h.touch ? i[0] : document;
                i.off(t.scrollbar.dragEvents.start),
                e(r).off(t.scrollbar.dragEvents.move),
                e(r).off(t.scrollbar.dragEvents.end)
            }
        },
        init: function() {
            var t = this;
            if (t.params.scrollbar.el) {
                var i = t.scrollbar,
                r = t.$el,
                n = t.touchEvents,
                s = t.params.scrollbar,
                a = e(s.el);
                t.params.uniqueNavElements && "string" == typeof s.el && a.length > 1 && 1 === r.find(s.el).length && (a = r.find(s.el));
                var l = a.find(".swiper-scrollbar-drag");
                0 === l.length && (l = e('<div class="swiper-scrollbar-drag"></div>'), a.append(l)),
                t.scrollbar.dragEvents = !1 !== t.params.simulateTouch || h.touch ? n: {
                    start: "mousedown",
                    move: "mousemove",
                    end: "mouseup"
                },
                o.extend(i, {
                    $el: a,
                    el: a[0],
                    $dragEl: l,
                    dragEl: l[0]
                }),
                s.draggable && i.enableDraggable()
            }
        },
        destroy: function() {
            this.scrollbar.disableDraggable()
        }
    },
    G = {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                scrollbar: {
                    init: H.init.bind(e),
                    destroy: H.destroy.bind(e),
                    updateSize: H.updateSize.bind(e),
                    setTranslate: H.setTranslate.bind(e),
                    setTransition: H.setTransition.bind(e),
                    enableDraggable: H.enableDraggable.bind(e),
                    disableDraggable: H.disableDraggable.bind(e),
                    setDragPosition: H.setDragPosition.bind(e),
                    onDragStart: H.onDragStart.bind(e),
                    onDragMove: H.onDragMove.bind(e),
                    onDragEnd: H.onDragEnd.bind(e),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init: function() {
                var e = this;
                e.scrollbar.init(),
                e.scrollbar.updateSize(),
                e.scrollbar.setTranslate()
            },
            update: function() {
                this.scrollbar.updateSize()
            },
            resize: function() {
                this.scrollbar.updateSize()
            },
            observerUpdate: function() {
                this.scrollbar.updateSize()
            },
            setTranslate: function() {
                this.scrollbar.setTranslate()
            },
            setTransition: function(e) {
                this.scrollbar.setTransition(e)
            },
            destroy: function() {
                this.scrollbar.destroy()
            }
        }
    },
    j = {
        setTransform: function(t, i) {
            var r = this.rtl,
            n = e(t),
            s = r ? -1 : 1,
            a = n.attr("data-swiper-parallax") || "0",
            o = n.attr("data-swiper-parallax-x"),
            l = n.attr("data-swiper-parallax-y"),
            h = n.attr("data-swiper-parallax-scale"),
            d = n.attr("data-swiper-parallax-opacity");
            if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = a, l = "0") : (l = a, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * i * s + "%": o * i * s + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * i + "%": l * i + "px", void 0 !== d && null !== d) {
                var c = d - (d - 1) * (1 - Math.abs(i));
                n[0].style.opacity = c
            }
            if (void 0 === h || null === h) n.transform("translate3d(" + o + ", " + l + ", 0px)");
            else {
                var u = h - (h - 1) * (1 - Math.abs(i));
                n.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + u + ")")
            }
        },
        setTranslate: function() {
            var t = this,
            i = t.$el,
            r = t.slides,
            n = t.progress,
            s = t.snapGrid;
            i.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, i) {
                t.parallax.setTransform(i, n)
            }),
            r.each(function(i, r) {
                var a = r.progress;
                t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (a += Math.ceil(i / 2) - n * (s.length - 1)),
                a = Math.min(Math.max(a, -1), 1),
                e(r).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, i) {
                    t.parallax.setTransform(i, a)
                })
            })
        },
        setTransition: function(t) {
            void 0 === t && (t = this.params.speed),
            this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(i, r) {
                var n = e(r),
                s = parseInt(n.attr("data-swiper-parallax-duration"), 10) || t;
                0 === t && (s = 0),
                n.transition(s)
            })
        }
    },
    V = {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                parallax: {
                    setTransform: j.setTransform.bind(e),
                    setTranslate: j.setTranslate.bind(e),
                    setTransition: j.setTransition.bind(e)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.watchSlidesProgress = !0
            },
            init: function() {
                this.params.parallax && this.parallax.setTranslate()
            },
            setTranslate: function() {
                this.params.parallax && this.parallax.setTranslate()
            },
            setTransition: function(e) {
                this.params.parallax && this.parallax.setTransition(e)
            }
        }
    },
    q = {
        getDistanceBetweenTouches: function(e) {
            if (e.targetTouches.length < 2) return 1;
            var t = e.targetTouches[0].pageX,
            i = e.targetTouches[0].pageY,
            r = e.targetTouches[1].pageX,
            n = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(r - t, 2) + Math.pow(n - i, 2))
        },
        onGestureStart: function(t) {
            var i = this,
            r = i.params.zoom,
            n = i.zoom,
            s = n.gesture;
            if (n.fakeGestureTouched = !1, n.fakeGestureMoved = !1, !h.gestures) {
                if ("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2) return;
                n.fakeGestureTouched = !0,
                s.scaleStart = q.getDistanceBetweenTouches(t)
            }
            s.$slideEl && s.$slideEl.length || (s.$slideEl = e(this), 0 === s.$slideEl.length && (s.$slideEl = i.slides.eq(i.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + r.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || r.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), i.zoom.isScaling = !0) : s.$imageEl = void 0
        },
        onGestureChange: function(e) {
            var t = this,
            i = t.params.zoom,
            r = t.zoom,
            n = r.gesture;
            if (!h.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                r.fakeGestureMoved = !0,
                n.scaleMove = q.getDistanceBetweenTouches(e)
            }
            n.$imageEl && 0 !== n.$imageEl.length && (h.gestures ? t.zoom.scale = e.scale * r.currentScale: r.scale = n.scaleMove / n.scaleStart * r.currentScale, r.scale > n.maxRatio && (r.scale = n.maxRatio - 1 + Math.pow(r.scale - n.maxRatio + 1, .5)), r.scale < i.minRatio && (r.scale = i.minRatio + 1 - Math.pow(i.minRatio - r.scale + 1, .5)), n.$imageEl.transform("translate3d(0,0,0) scale(" + r.scale + ")"))
        },
        onGestureEnd: function(e) {
            var t = this,
            i = t.params.zoom,
            r = t.zoom,
            n = r.gesture;
            if (!h.gestures) {
                if (!r.fakeGestureTouched || !r.fakeGestureMoved) return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !y.android) return;
                r.fakeGestureTouched = !1,
                r.fakeGestureMoved = !1
            }
            n.$imageEl && 0 !== n.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, n.maxRatio), i.minRatio), n.$imageEl.transition(t.params.speed).transform("translate3d(0,0,0) scale(" + r.scale + ")"), r.currentScale = r.scale, r.isScaling = !1, 1 === r.scale && (n.$slideEl = void 0))
        },
        onTouchStart: function(e) {
            var t = this.zoom,
            i = t.gesture,
            r = t.image;
            i.$imageEl && 0 !== i.$imageEl.length && (r.isTouched || (y.android && e.preventDefault(), r.isTouched = !0, r.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX: e.pageX, r.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY: e.pageY))
        },
        onTouchMove: function(e) {
            var t = this,
            i = t.zoom,
            r = i.gesture,
            n = i.image,
            s = i.velocity;
            if (r.$imageEl && 0 !== r.$imageEl.length && (t.allowClick = !1, n.isTouched && r.$slideEl)) {
                n.isMoved || (n.width = r.$imageEl[0].offsetWidth, n.height = r.$imageEl[0].offsetHeight, n.startX = o.getTranslate(r.$imageWrapEl[0], "x") || 0, n.startY = o.getTranslate(r.$imageWrapEl[0], "y") || 0, r.slideWidth = r.$slideEl[0].offsetWidth, r.slideHeight = r.$slideEl[0].offsetHeight, r.$imageWrapEl.transition(0), t.rtl && (n.startX = -n.startX), t.rtl && (n.startY = -n.startY));
                var a = n.width * i.scale,
                l = n.height * i.scale;
                if (! (a < r.slideWidth && l < r.slideHeight)) {
                    if (n.minX = Math.min(r.slideWidth / 2 - a / 2, 0), n.maxX = -n.minX, n.minY = Math.min(r.slideHeight / 2 - l / 2, 0), n.maxY = -n.minY, n.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX: e.pageX, n.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY: e.pageY, !n.isMoved && !i.isScaling) {
                        if (t.isHorizontal() && (Math.floor(n.minX) === Math.floor(n.startX) && n.touchesCurrent.x < n.touchesStart.x || Math.floor(n.maxX) === Math.floor(n.startX) && n.touchesCurrent.x > n.touchesStart.x)) return void(n.isTouched = !1);
                        if (!t.isHorizontal() && (Math.floor(n.minY) === Math.floor(n.startY) && n.touchesCurrent.y < n.touchesStart.y || Math.floor(n.maxY) === Math.floor(n.startY) && n.touchesCurrent.y > n.touchesStart.y)) return void(n.isTouched = !1)
                    }
                    e.preventDefault(),
                    e.stopPropagation(),
                    n.isMoved = !0,
                    n.currentX = n.touchesCurrent.x - n.touchesStart.x + n.startX,
                    n.currentY = n.touchesCurrent.y - n.touchesStart.y + n.startY,
                    n.currentX < n.minX && (n.currentX = n.minX + 1 - Math.pow(n.minX - n.currentX + 1, .8)),
                    n.currentX > n.maxX && (n.currentX = n.maxX - 1 + Math.pow(n.currentX - n.maxX + 1, .8)),
                    n.currentY < n.minY && (n.currentY = n.minY + 1 - Math.pow(n.minY - n.currentY + 1, .8)),
                    n.currentY > n.maxY && (n.currentY = n.maxY - 1 + Math.pow(n.currentY - n.maxY + 1, .8)),
                    s.prevPositionX || (s.prevPositionX = n.touchesCurrent.x),
                    s.prevPositionY || (s.prevPositionY = n.touchesCurrent.y),
                    s.prevTime || (s.prevTime = Date.now()),
                    s.x = (n.touchesCurrent.x - s.prevPositionX) / (Date.now() - s.prevTime) / 2,
                    s.y = (n.touchesCurrent.y - s.prevPositionY) / (Date.now() - s.prevTime) / 2,
                    Math.abs(n.touchesCurrent.x - s.prevPositionX) < 2 && (s.x = 0),
                    Math.abs(n.touchesCurrent.y - s.prevPositionY) < 2 && (s.y = 0),
                    s.prevPositionX = n.touchesCurrent.x,
                    s.prevPositionY = n.touchesCurrent.y,
                    s.prevTime = Date.now(),
                    r.$imageWrapEl.transform("translate3d(" + n.currentX + "px, " + n.currentY + "px,0)")
                }
            }
        },
        onTouchEnd: function() {
            var e = this.zoom,
            t = e.gesture,
            i = e.image,
            r = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!i.isTouched || !i.isMoved) return i.isTouched = !1,
                void(i.isMoved = !1);
                i.isTouched = !1,
                i.isMoved = !1;
                var n = 300,
                s = 300,
                a = r.x * n,
                o = i.currentX + a,
                l = r.y * s,
                h = i.currentY + l;
                0 !== r.x && (n = Math.abs((o - i.currentX) / r.x)),
                0 !== r.y && (s = Math.abs((h - i.currentY) / r.y));
                var d = Math.max(n, s);
                i.currentX = o,
                i.currentY = h;
                var c = i.width * e.scale,
                u = i.height * e.scale;
                i.minX = Math.min(t.slideWidth / 2 - c / 2, 0),
                i.maxX = -i.minX,
                i.minY = Math.min(t.slideHeight / 2 - u / 2, 0),
                i.maxY = -i.minY,
                i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX),
                i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY),
                t.$imageWrapEl.transition(d).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
            }
        },
        onTransitionEnd: function() {
            var e = this,
            t = e.zoom,
            i = t.gesture;
            i.$slideEl && e.previousIndex !== e.activeIndex && (i.$imageEl.transform("translate3d(0,0,0) scale(1)"), i.$imageWrapEl.transform("translate3d(0,0,0)"), i.$slideEl = void 0, i.$imageEl = void 0, i.$imageWrapEl = void 0, t.scale = 1, t.currentScale = 1)
        },
        toggle: function(e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t. in (e)
        },
        in:function(t) {
            var i = this,
            r = i.zoom,
            n = i.params.zoom,
            s = r.gesture,
            a = r.image;
            if (s.$slideEl || (s.$slideEl = i.clickedSlide ? e(i.clickedSlide) : i.slides.eq(i.activeIndex), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + n.containerClass)), s.$imageEl && 0 !== s.$imageEl.length) {
                s.$slideEl.addClass("" + n.zoomedSlideClass);
                var o, l, h, d, c, u, p, f, m, g, v, _, y, w, b, x;
                void 0 === a.touchesStart.x && t ? (o = "touchend" === t.type ? t.changedTouches[0].pageX: t.pageX, l = "touchend" === t.type ? t.changedTouches[0].pageY: t.pageY) : (o = a.touchesStart.x, l = a.touchesStart.y),
                r.scale = s.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio,
                r.currentScale = s.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio,
                t ? (b = s.$slideEl[0].offsetWidth, x = s.$slideEl[0].offsetHeight, h = s.$slideEl.offset().left + b / 2 - o, d = s.$slideEl.offset().top + x / 2 - l, p = s.$imageEl[0].offsetWidth, f = s.$imageEl[0].offsetHeight, m = p * r.scale, g = f * r.scale, y = -(v = Math.min(b / 2 - m / 2, 0)), w = -(_ = Math.min(x / 2 - g / 2, 0)), c = h * r.scale, u = d * r.scale, c < v && (c = v), c > y && (c = y), u < _ && (u = _), u > w && (u = w)) : (c = 0, u = 0),
                s.$imageWrapEl.transition(300).transform("translate3d(" + c + "px, " + u + "px,0)"),
                s.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + r.scale + ")")
            }
        },
        out: function() {
            var t = this,
            i = t.zoom,
            r = t.params.zoom,
            n = i.gesture;
            n.$slideEl || (n.$slideEl = t.clickedSlide ? e(t.clickedSlide) : t.slides.eq(t.activeIndex), n.$imageEl = n.$slideEl.find("img, svg, canvas"), n.$imageWrapEl = n.$imageEl.parent("." + r.containerClass)),
            n.$imageEl && 0 !== n.$imageEl.length && (i.scale = 1, i.currentScale = 1, n.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), n.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), n.$slideEl.removeClass("" + r.zoomedSlideClass), n.$slideEl = void 0)
        },
        enable: function() {
            var t = this,
            i = t.zoom;
            if (!i.enabled) {
                i.enabled = !0;
                var r = t.slides,
                n = !("touchstart" !== t.touchEvents.start || !h.passiveListener || !t.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                h.gestures ? (r.on("gesturestart", i.onGestureStart, n), r.on("gesturechange", i.onGestureChange, n), r.on("gestureend", i.onGestureEnd, n)) : "touchstart" === t.touchEvents.start && (r.on(t.touchEvents.start, i.onGestureStart, n), r.on(t.touchEvents.move, i.onGestureChange, n), r.on(t.touchEvents.end, i.onGestureEnd, n)),
                t.slides.each(function(r, n) {
                    var s = e(n);
                    s.find("." + t.params.zoom.containerClass).length > 0 && s.on(t.touchEvents.move, i.onTouchMove)
                })
            }
        },
        disable: function() {
            var t = this,
            i = t.zoom;
            if (i.enabled) {
                t.zoom.enabled = !1;
                var r = t.slides,
                n = !("touchstart" !== t.touchEvents.start || !h.passiveListener || !t.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                h.gestures ? (r.off("gesturestart", i.onGestureStart, n), r.off("gesturechange", i.onGestureChange, n), r.off("gestureend", i.onGestureEnd, n)) : "touchstart" === t.touchEvents.start && (r.off(t.touchEvents.start, i.onGestureStart, n), r.off(t.touchEvents.move, i.onGestureChange, n), r.off(t.touchEvents.end, i.onGestureEnd, n)),
                t.slides.each(function(r, n) {
                    var s = e(n);
                    s.find("." + t.params.zoom.containerClass).length > 0 && s.off(t.touchEvents.move, i.onTouchMove)
                })
            }
        }
    },
    W = {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function() {
            var e = this,
            t = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                }
            };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(i) {
                t[i] = q[i].bind(e)
            }),
            o.extend(e, {
                zoom: t
            })
        },
        on: {
            init: function() {
                this.params.zoom.enabled && this.zoom.enable()
            },
            destroy: function() {
                this.zoom.disable()
            },
            touchStart: function(e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            },
            touchEnd: function(e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            },
            doubleTap: function(e) {
                var t = this;
                t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && t.zoom.toggle(e)
            },
            transitionEnd: function() {
                var e = this;
                e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd()
            }
        }
    },
    U = {
        loadInSlide: function(t, i) {
            void 0 === i && (i = !0);
            var r = this,
            n = r.params.lazy;
            if (void 0 !== t && 0 !== r.slides.length) {
                var s = r.virtual && r.params.virtual.enabled ? r.$wrapperEl.children("." + r.params.slideClass + '[data-swiper-slide-index="' + t + '"]') : r.slides.eq(t),
                a = s.find("." + n.elementClass + ":not(." + n.loadedClass + "):not(." + n.loadingClass + ")"); ! s.hasClass(n.elementClass) || s.hasClass(n.loadedClass) || s.hasClass(n.loadingClass) || (a = a.add(s[0])),
                0 !== a.length && a.each(function(t, a) {
                    var o = e(a);
                    o.addClass(n.loadingClass);
                    var l = o.attr("data-background"),
                    h = o.attr("data-src"),
                    d = o.attr("data-srcset"),
                    c = o.attr("data-sizes");
                    r.loadImage(o[0], h || l, d, c, !1,
                    function() {
                        if (void 0 !== r && null !== r && r && (!r || r.params) && !r.destroyed) {
                            if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (d && (o.attr("srcset", d), o.removeAttr("data-srcset")), c && (o.attr("sizes", c), o.removeAttr("data-sizes")), h && (o.attr("src", h), o.removeAttr("data-src"))), o.addClass(n.loadedClass).removeClass(n.loadingClass), s.find("." + n.preloaderClass).remove(), r.params.loop && i) {
                                var e = s.attr("data-swiper-slide-index");
                                if (s.hasClass(r.params.slideDuplicateClass)) {
                                    var t = r.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + r.params.slideDuplicateClass + ")");
                                    r.lazy.loadInSlide(t.index(), !1)
                                } else {
                                    var a = r.$wrapperEl.children("." + r.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    r.lazy.loadInSlide(a.index(), !1)
                                }
                            }
                            r.emit("lazyImageReady", s[0], o[0])
                        }
                    }),
                    r.emit("lazyImageLoad", s[0], o[0])
                })
            }
        },
        load: function() {
            function t(e) {
                if (l) {
                    if (n.children("." + s.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return ! 0
                } else if (a[e]) return ! 0;
                return ! 1
            }
            function i(t) {
                return l ? e(t).attr("data-swiper-slide-index") : e(t).index()
            }
            var r = this,
            n = r.$wrapperEl,
            s = r.params,
            a = r.slides,
            o = r.activeIndex,
            l = r.virtual && s.virtual.enabled,
            h = s.lazy,
            d = s.slidesPerView;
            if ("auto" === d && (d = 0), r.lazy.initialImageLoaded || (r.lazy.initialImageLoaded = !0), r.params.watchSlidesVisibility) n.children("." + s.slideVisibleClass).each(function(t, i) {
                var n = l ? e(i).attr("data-swiper-slide-index") : e(i).index();
                r.lazy.loadInSlide(n)
            });
            else if (d > 1) for (var c = o; c < o + d; c += 1) t(c) && r.lazy.loadInSlide(c);
            else r.lazy.loadInSlide(o);
            if (h.loadPrevNext) if (d > 1 || h.loadPrevNextAmount && h.loadPrevNextAmount > 1) {
                for (var u = h.loadPrevNextAmount,
                p = d,
                f = Math.min(o + p + Math.max(u, p), a.length), m = Math.max(o - Math.max(p, u), 0), g = o + d; g < f; g += 1) t(g) && r.lazy.loadInSlide(g);
                for (var v = m; v < o; v += 1) t(v) && r.lazy.loadInSlide(v)
            } else {
                var _ = n.children("." + s.slideNextClass);
                _.length > 0 && r.lazy.loadInSlide(i(_));
                var y = n.children("." + s.slidePrevClass);
                y.length > 0 && r.lazy.loadInSlide(i(y))
            }
        }
    },
    K = {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                lazy: {
                    initialImageLoaded: !1,
                    load: U.load.bind(e),
                    loadInSlide: U.loadInSlide.bind(e)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.preloadImages && (this.params.preloadImages = !1)
            },
            init: function() {
                var e = this;
                e.params.lazy.enabled && !e.params.loop && 0 === e.params.initialSlide && e.lazy.load()
            },
            scroll: function() {
                var e = this;
                e.params.freeMode && !e.params.freeModeSticky && e.lazy.load()
            },
            resize: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            scrollbarDragMove: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            transitionStart: function() {
                var e = this;
                e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
            },
            transitionEnd: function() {
                var e = this;
                e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && e.lazy.load()
            }
        }
    },
    Z = {
        LinearSpline: function(e, t) {
            var i = function() {
                var e, t, i;
                return function(r, n) {
                    for (t = -1, e = r.length; e - t > 1;) r[i = e + t >> 1] <= n ? t = i: e = i;
                    return e
                }
            } ();
            this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1;
            var r, n;
            return this.interpolate = function(e) {
                return e ? (n = i(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
            },
            this
        },
        getInterpolateFunction: function(e) {
            var t = this;
            t.controller.spline || (t.controller.spline = t.params.loop ? new Z.LinearSpline(t.slidesGrid, e.slidesGrid) : new Z.LinearSpline(t.snapGrid, e.snapGrid))
        },
        setTranslate: function(e, t) {
            function i(e) {
                var t = e.rtl && "horizontal" === e.params.direction ? -s.translate: s.translate;
                "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), n = -s.controller.spline.interpolate( - t)),
                n && "container" !== s.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), n = (t - s.minTranslate()) * r + e.minTranslate()),
                s.params.controller.inverse && (n = e.maxTranslate() - n),
                e.updateProgress(n),
                e.setTranslate(n, s),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            var r, n, s = this,
            a = s.controller.control;
            if (Array.isArray(a)) for (var o = 0; o < a.length; o += 1) a[o] !== t && a[o] instanceof E && i(a[o]);
            else a instanceof E && t !== a && i(a)
        },
        setTransition: function(e, t) {
            function i(t) {
                t.setTransition(e, n),
                0 !== e && (t.transitionStart(), t.$wrapperEl.transitionEnd(function() {
                    s && (t.params.loop && "slide" === n.params.controller.by && t.loopFix(), t.transitionEnd())
                }))
            }
            var r, n = this,
            s = n.controller.control;
            if (Array.isArray(s)) for (r = 0; r < s.length; r += 1) s[r] !== t && s[r] instanceof E && i(s[r]);
            else s instanceof E && t !== s && i(s)
        }
    },
    Q = {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                controller: {
                    control: e.params.controller.control,
                    getInterpolateFunction: Z.getInterpolateFunction.bind(e),
                    setTranslate: Z.setTranslate.bind(e),
                    setTransition: Z.setTransition.bind(e)
                }
            })
        },
        on: {
            update: function() {
                var e = this;
                e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
            },
            resize: function() {
                var e = this;
                e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
            },
            observerUpdate: function() {
                var e = this;
                e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
            },
            setTranslate: function(e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            },
            setTransition: function(e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    },
    J = {
        makeElFocusable: function(e) {
            return e.attr("tabIndex", "0"),
            e
        },
        addElRole: function(e, t) {
            return e.attr("role", t),
            e
        },
        addElLabel: function(e, t) {
            return e.attr("aria-label", t),
            e
        },
        disableEl: function(e) {
            return e.attr("aria-disabled", !0),
            e
        },
        enableEl: function(e) {
            return e.attr("aria-disabled", !1),
            e
        },
        onEnterKey: function(t) {
            var i = this,
            r = i.params.a11y;
            if (13 === t.keyCode) {
                var n = e(t.target);
                i.navigation && i.navigation.$nextEl && n.is(i.navigation.$nextEl) && (i.isEnd && !i.params.loop || i.slideNext(), i.isEnd ? i.a11y.notify(r.lastSlideMessage) : i.a11y.notify(r.nextSlideMessage)),
                i.navigation && i.navigation.$prevEl && n.is(i.navigation.$prevEl) && (i.isBeginning && !i.params.loop || i.slidePrev(), i.isBeginning ? i.a11y.notify(r.firstSlideMessage) : i.a11y.notify(r.prevSlideMessage)),
                i.pagination && n.is("." + i.params.pagination.bulletClass) && n[0].click()
            }
        },
        notify: function(e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""), t.html(e))
        },
        updateNavigation: function() {
            var e = this;
            if (!e.params.loop) {
                var t = e.navigation,
                i = t.$nextEl,
                r = t.$prevEl;
                r && r.length > 0 && (e.isBeginning ? e.a11y.disableEl(r) : e.a11y.enableEl(r)),
                i && i.length > 0 && (e.isEnd ? e.a11y.disableEl(i) : e.a11y.enableEl(i))
            }
        },
        updatePagination: function() {
            var t = this,
            i = t.params.a11y;
            t.pagination && t.params.pagination.clickable && t.pagination.bullets && t.pagination.bullets.length && t.pagination.bullets.each(function(r, n) {
                var s = e(n);
                t.a11y.makeElFocusable(s),
                t.a11y.addElRole(s, "button"),
                t.a11y.addElLabel(s, i.paginationBulletMessage.replace(/{{index}}/, s.index() + 1))
            })
        },
        init: function() {
            var e = this;
            e.$el.append(e.a11y.liveRegion);
            var t, i, r = e.params.a11y;
            e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl),
            t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, r.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)),
            i && (e.a11y.makeElFocusable(i), e.a11y.addElRole(i, "button"), e.a11y.addElLabel(i, r.prevSlideMessage), i.on("keydown", e.a11y.onEnterKey)),
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
        },
        destroy: function() {
            var e = this;
            e.a11y.liveRegion && e.a11y.liveRegion.length > 0 && e.a11y.liveRegion.remove();
            var t, i;
            e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl),
            t && t.off("keydown", e.a11y.onEnterKey),
            i && i.off("keydown", e.a11y.onEnterKey),
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.off("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
        }
    },
    ee = {
        name: "a11y",
        params: {
            a11y: {
                enabled: !1,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function() {
            var t = this;
            o.extend(t, {
                a11y: {
                    liveRegion: e('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                }
            }),
            Object.keys(J).forEach(function(e) {
                t.a11y[e] = J[e].bind(t)
            })
        },
        on: {
            init: function() {
                var e = this;
                e.params.a11y.enabled && (e.a11y.init(), e.a11y.updateNavigation())
            },
            toEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            fromEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            paginationUpdate: function() {
                this.params.a11y.enabled && this.a11y.updatePagination()
            },
            destroy: function() {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    },
    te = {
        init: function() {
            var e = this;
            if (e.params.history) {
                if (!r.history || !r.history.pushState) return e.params.history.enabled = !1,
                void(e.params.hashNavigation.enabled = !0);
                var t = e.history;
                t.initialized = !0,
                t.paths = te.getPathValues(),
                (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || r.addEventListener("popstate", e.history.setHistoryPopState))
            }
        },
        destroy: function() {
            this.params.history.replaceState || r.removeEventListener("popstate", this.history.setHistoryPopState)
        },
        setHistoryPopState: function() {
            var e = this;
            e.history.paths = te.getPathValues(),
            e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1)
        },
        getPathValues: function() {
            var e = r.location.pathname.slice(1).split("/").filter(function(e) {
                return "" !== e
            }),
            t = e.length;
            return {
                key: e[t - 2],
                value: e[t - 1]
            }
        },
        setHistory: function(e, t) {
            var i = this;
            if (i.history.initialized && i.params.history.enabled) {
                var n = i.slides.eq(t),
                s = te.slugify(n.attr("data-history"));
                r.location.pathname.includes(e) || (s = e + "/" + s);
                var a = r.history.state;
                a && a.value === s || (i.params.history.replaceState ? r.history.replaceState({
                    value: s
                },
                null, s) : r.history.pushState({
                    value: s
                },
                null, s))
            }
        },
        slugify: function(e) {
            return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        },
        scrollToSlide: function(e, t, i) {
            var r = this;
            if (t) for (var n = 0,
            s = r.slides.length; n < s; n += 1) {
                var a = r.slides.eq(n);
                if (te.slugify(a.attr("data-history")) === t && !a.hasClass(r.params.slideDuplicateClass)) {
                    var o = a.index();
                    r.slideTo(o, e, i)
                }
            } else r.slideTo(0, e, i)
        }
    },
    ie = {
        name: "history",
        params: {
            history: {
                enabled: !1,
                replaceState: !1,
                key: "slides"
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                history: {
                    init: te.init.bind(e),
                    setHistory: te.setHistory.bind(e),
                    setHistoryPopState: te.setHistoryPopState.bind(e),
                    scrollToSlide: te.scrollToSlide.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.params.history.enabled && this.history.init()
            },
            destroy: function() {
                this.params.history.enabled && this.history.destroy()
            },
            transitionEnd: function() {
                var e = this;
                e.history.initialized && e.history.setHistory(e.params.history.key, e.activeIndex)
            }
        }
    },
    re = {
        onHashCange: function() {
            var e = this,
            t = l.location.hash.replace("#", "");
            t !== e.slides.eq(e.activeIndex).attr("data-hash") && e.slideTo(e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index())
        },
        setHash: function() {
            var e = this;
            if (e.hashNavigation.initialized && e.params.hashNavigation.enabled) if (e.params.hashNavigation.replaceState && r.history && r.history.replaceState) r.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
            else {
                var t = e.slides.eq(e.activeIndex),
                i = t.attr("data-hash") || t.attr("data-history");
                l.location.hash = i || ""
            }
        },
        init: function() {
            var t = this;
            if (! (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled)) {
                t.hashNavigation.initialized = !0;
                var i = l.location.hash.replace("#", "");
                if (i) for (var n = 0,
                s = t.slides.length; n < s; n += 1) {
                    var a = t.slides.eq(n);
                    if ((a.attr("data-hash") || a.attr("data-history")) === i && !a.hasClass(t.params.slideDuplicateClass)) {
                        var o = a.index();
                        t.slideTo(o, 0, t.params.runCallbacksOnInit, !0)
                    }
                }
                t.params.hashNavigation.watchState && e(r).on("hashchange", t.hashNavigation.onHashCange)
            }
        },
        destroy: function() {
            this.params.hashNavigation.watchState && e(r).off("hashchange", this.hashNavigation.onHashCange)
        }
    },
    ne = {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                hashNavigation: {
                    initialized: !1,
                    init: re.init.bind(e),
                    destroy: re.destroy.bind(e),
                    setHash: re.setHash.bind(e),
                    onHashCange: re.onHashCange.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.init()
            },
            destroy: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy()
            },
            transitionEnd: function() {
                this.hashNavigation.initialized && this.hashNavigation.setHash()
            }
        }
    },
    se = {
        run: function() {
            var e = this,
            t = e.slides.eq(e.activeIndex),
            i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            e.autoplay.timeout = o.nextTick(function() {
                e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
            },
            i)
        },
        start: function() {
            var e = this;
            return void 0 === e.autoplay.timeout && !e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0)
        },
        stop: function() {
            var e = this;
            return !! e.autoplay.running && void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0)
        },
        pause: function(e) {
            var t = this;
            t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 === e ? (t.autoplay.paused = !1, t.autoplay.run()) : t.$wrapperEl.transitionEnd(function() {
                t && !t.destroyed && (t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
            })))
        }
    },
    ae = {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                disableOnInteraction: !0,
                stopOnLastSlide: !1
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: se.run.bind(e),
                    start: se.start.bind(e),
                    stop: se.stop.bind(e),
                    pause: se.pause.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.params.autoplay.enabled && this.autoplay.start()
            },
            beforeTransitionStart: function(e, t) {
                var i = this;
                i.autoplay.running && (t || !i.params.autoplay.disableOnInteraction ? i.autoplay.pause(e) : i.autoplay.stop())
            },
            sliderFirstMove: function() {
                var e = this;
                e.autoplay.running && (e.params.autoplay.disableOnInteraction ? e.autoplay.stop() : e.autoplay.pause())
            },
            destroy: function() {
                this.autoplay.running && this.autoplay.stop()
            }
        }
    },
    oe = {
        setTranslate: function() {
            for (var e = this,
            t = e.slides,
            i = 0; i < t.length; i += 1) {
                var r = e.slides.eq(i),
                n = -r[0].swiperSlideOffset;
                e.params.virtualTranslate || (n -= e.translate);
                var s = 0;
                e.isHorizontal() || (s = n, n = 0);
                var a = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(r[0].progress), 0) : 1 + Math.min(Math.max(r[0].progress, -1), 0);
                r.css({
                    opacity: a
                }).transform("translate3d(" + n + "px, " + s + "px, 0px)")
            }
        },
        setTransition: function(e) {
            var t = this,
            i = t.slides,
            r = t.$wrapperEl;
            if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
                var n = !1;
                i.transitionEnd(function() {
                    if (!n && t && !t.destroyed) {
                        n = !0,
                        t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) r.trigger(e[i])
                    }
                })
            }
        }
    },
    le = {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                fadeEffect: {
                    setTranslate: oe.setTranslate.bind(e),
                    setTransition: oe.setTransition.bind(e)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("fade" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "fade");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    o.extend(e.params, t),
                    o.extend(e.originalParams, t)
                }
            },
            setTranslate: function() {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            },
            setTransition: function(e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    },
    he = {
        setTranslate: function() {
            var t, i = this,
            r = i.$el,
            n = i.$wrapperEl,
            s = i.slides,
            a = i.width,
            o = i.height,
            l = i.rtl,
            h = i.size,
            d = i.params.cubeEffect,
            c = i.isHorizontal(),
            u = i.virtual && i.params.virtual.enabled,
            p = 0;
            d.shadow && (c ? (0 === (t = n.find(".swiper-cube-shadow")).length && (t = e('<div class="swiper-cube-shadow"></div>'), n.append(t)), t.css({
                height: a + "px"
            })) : 0 === (t = r.find(".swiper-cube-shadow")).length && (t = e('<div class="swiper-cube-shadow"></div>'), r.append(t)));
            for (var m = 0; m < s.length; m += 1) {
                var g = s.eq(m),
                v = m;
                u && (v = parseInt(g.attr("data-swiper-slide-index"), 10));
                var _ = 90 * v,
                y = Math.floor(_ / 360);
                l && (_ = -_, y = Math.floor( - _ / 360));
                var w = Math.max(Math.min(g[0].progress, 1), -1),
                b = 0,
                x = 0,
                T = 0;
                v % 4 == 0 ? (b = 4 * -y * h, T = 0) : (v - 1) % 4 == 0 ? (b = 0, T = 4 * -y * h) : (v - 2) % 4 == 0 ? (b = h + 4 * y * h, T = h) : (v - 3) % 4 == 0 && (b = -h, T = 3 * h + 4 * h * y),
                l && (b = -b),
                c || (x = b, b = 0);
                var S = "rotateX(" + (c ? 0 : -_) + "deg) rotateY(" + (c ? _: 0) + "deg) translate3d(" + b + "px, " + x + "px, " + T + "px)";
                if (w <= 1 && w > -1 && (p = 90 * v + 90 * w, l && (p = 90 * -v - 90 * w)), g.transform(S), d.slideShadows) {
                    var C = c ? g.find(".swiper-slide-shadow-left") : g.find(".swiper-slide-shadow-top"),
                    E = c ? g.find(".swiper-slide-shadow-right") : g.find(".swiper-slide-shadow-bottom");
                    0 === C.length && (C = e('<div class="swiper-slide-shadow-' + (c ? "left": "top") + '"></div>'), g.append(C)),
                    0 === E.length && (E = e('<div class="swiper-slide-shadow-' + (c ? "right": "bottom") + '"></div>'), g.append(E)),
                    C.length && (C[0].style.opacity = Math.max( - w, 0)),
                    E.length && (E[0].style.opacity = Math.max(w, 0))
                }
            }
            if (n.css({
                "-webkit-transform-origin": "50% 50% -" + h / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + h / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + h / 2 + "px",
                "transform-origin": "50% 50% -" + h / 2 + "px"
            }), d.shadow) if (c) t.transform("translate3d(0px, " + (a / 2 + d.shadowOffset) + "px, " + -a / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
            else {
                var P = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90),
                k = 1.5 - (Math.sin(2 * P * Math.PI / 360) / 2 + Math.cos(2 * P * Math.PI / 360) / 2),
                M = d.shadowScale,
                O = d.shadowScale / k,
                z = d.shadowOffset;
                t.transform("scale3d(" + M + ", 1, " + O + ") translate3d(0px, " + (o / 2 + z) + "px, " + -o / 2 / O + "px) rotateX(-90deg)")
            }
            var A = f.isSafari || f.isUiWebView ? -h / 2 : 0;
            n.transform("translate3d(0px,0," + A + "px) rotateX(" + (i.isHorizontal() ? 0 : p) + "deg) rotateY(" + (i.isHorizontal() ? -p: 0) + "deg)")
        },
        setTransition: function(e) {
            var t = this,
            i = t.$el;
            t.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            t.params.cubeEffect.shadow && !t.isHorizontal() && i.find(".swiper-cube-shadow").transition(e)
        }
    },
    de = {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                cubeEffect: {
                    setTranslate: he.setTranslate.bind(e),
                    setTransition: he.setTransition.bind(e)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("cube" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "cube"),
                    e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    o.extend(e.params, t),
                    o.extend(e.originalParams, t)
                }
            },
            setTranslate: function() {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            },
            setTransition: function(e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    },
    ce = {
        setTranslate: function() {
            for (var t = this,
            i = t.slides,
            r = 0; r < i.length; r += 1) {
                var n = i.eq(r),
                s = n[0].progress;
                t.params.flipEffect.limitRotation && (s = Math.max(Math.min(n[0].progress, 1), -1));
                var a = -180 * s,
                o = 0,
                l = -n[0].swiperSlideOffset,
                h = 0;
                if (t.isHorizontal() ? t.rtl && (a = -a) : (h = l, l = 0, o = -a, a = 0), n[0].style.zIndex = -Math.abs(Math.round(s)) + i.length, t.params.flipEffect.slideShadows) {
                    var d = t.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"),
                    c = t.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
                    0 === d.length && (d = e('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "left": "top") + '"></div>'), n.append(d)),
                    0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "right": "bottom") + '"></div>'), n.append(c)),
                    d.length && (d[0].style.opacity = Math.max( - s, 0)),
                    c.length && (c[0].style.opacity = Math.max(s, 0))
                }
                n.transform("translate3d(" + l + "px, " + h + "px, 0px) rotateX(" + o + "deg) rotateY(" + a + "deg)")
            }
        },
        setTransition: function(e) {
            var t = this,
            i = t.slides,
            r = t.activeIndex,
            n = t.$wrapperEl;
            if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                var s = !1;
                i.eq(r).transitionEnd(function() {
                    if (!s && t && !t.destroyed) {
                        s = !0,
                        t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) n.trigger(e[i])
                    }
                })
            }
        }
    },
    ue = {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                flipEffect: {
                    setTranslate: ce.setTranslate.bind(e),
                    setTransition: ce.setTransition.bind(e)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("flip" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "flip"),
                    e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    o.extend(e.params, t),
                    o.extend(e.originalParams, t)
                }
            },
            setTranslate: function() {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            },
            setTransition: function(e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    },
    pe = {
        setTranslate: function() {
            for (var t = this,
            i = t.width,
            r = t.height,
            n = t.slides,
            s = t.$wrapperEl,
            a = t.slidesSizesGrid,
            o = t.params.coverflowEffect,
            l = t.isHorizontal(), h = t.translate, d = l ? i / 2 - h: r / 2 - h, c = l ? o.rotate: -o.rotate, u = o.depth, p = 0, m = n.length; p < m; p += 1) {
                var g = n.eq(p),
                v = a[p],
                _ = (d - g[0].swiperSlideOffset - v / 2) / v * o.modifier,
                y = l ? c * _: 0,
                w = l ? 0 : c * _,
                b = -u * Math.abs(_),
                x = l ? 0 : o.stretch * _,
                T = l ? o.stretch * _: 0;
                Math.abs(T) < .001 && (T = 0),
                Math.abs(x) < .001 && (x = 0),
                Math.abs(b) < .001 && (b = 0),
                Math.abs(y) < .001 && (y = 0),
                Math.abs(w) < .001 && (w = 0);
                var S = "translate3d(" + T + "px," + x + "px," + b + "px)  rotateX(" + w + "deg) rotateY(" + y + "deg)";
                if (g.transform(S), g[0].style.zIndex = 1 - Math.abs(Math.round(_)), o.slideShadows) {
                    var C = l ? g.find(".swiper-slide-shadow-left") : g.find(".swiper-slide-shadow-top"),
                    E = l ? g.find(".swiper-slide-shadow-right") : g.find(".swiper-slide-shadow-bottom");
                    0 === C.length && (C = e('<div class="swiper-slide-shadow-' + (l ? "left": "top") + '"></div>'), g.append(C)),
                    0 === E.length && (E = e('<div class="swiper-slide-shadow-' + (l ? "right": "bottom") + '"></div>'), g.append(E)),
                    C.length && (C[0].style.opacity = _ > 0 ? _: 0),
                    E.length && (E[0].style.opacity = -_ > 0 ? -_: 0)
                }
            }
            f.ie && (s[0].style.perspectiveOrigin = d + "px 50%")
        },
        setTransition: function(e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    },
    fe = {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            }
        },
        create: function() {
            var e = this;
            o.extend(e, {
                coverflowEffect: {
                    setTranslate: pe.setTranslate.bind(e),
                    setTransition: pe.setTransition.bind(e)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
            },
            setTranslate: function() {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            },
            setTransition: function(e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    };
    return E.components = [P, k, M, O, A, D, I, N, F, Y, G, V, W, K, Q, ee, ie, ne, ae, le, de, ue, fe],
    E
}),
function(e) {
    e.viewportSize = {},
    e.viewportSize.getHeight = function() {
        return t("Height")
    },
    e.viewportSize.getWidth = function() {
        return t("Width")
    };
    var t = function(t) {
        var i, r, n, s = t.toLowerCase(),
        a = e.document,
        o = a.documentElement;
        return void 0 === e["inner" + t] ? i = o["client" + t] : e["inner" + t] != o["client" + t] ? (r = a.createElement("body"), r.id = "vpw-test-b", r.style.cssText = "overflow:scroll", n = a.createElement("div"), n.id = "vpw-test-d", n.style.cssText = "position:absolute;top:-1000px", n.innerHTML = "<style>@media(" + s + ":" + o["client" + t] + "px){body#vpw-test-b div#vpw-test-d{" + s + ":7px!important}}</style>", r.appendChild(n), o.insertBefore(r, a.head), i = 7 == n["offset" + t] ? o["client" + t] : e["inner" + t], o.removeChild(r)) : i = e["inner" + t],
        i
    }
} (this);
