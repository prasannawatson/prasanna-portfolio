"use strict";
var AR = Object.defineProperty,
  IR = Object.defineProperties,
  FR = Object.getOwnPropertyDescriptors,
  Yb = Object.getOwnPropertySymbols,
  RR = Object.prototype.hasOwnProperty,
  NR = Object.prototype.propertyIsEnumerable,
  Qb = (U, qe, et) => qe in U ? AR(U, qe, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: et
  }) : U[qe] = et,
  te = (U, qe) => {
    for (var et in qe || (qe = {})) RR.call(qe, et) && Qb(U, et, qe[et]);
    if (Yb)
      for (var et of Yb(qe)) NR.call(qe, et) && Qb(U, et, qe[et]);
    return U
  },
  nh = (U, qe) => IR(U, FR(qe));
(self.webpackChunkprasanna_portfolio = self.webpackChunkprasanna_portfolio || []).push([
  [179], {
    495: () => {
      function U(n) {
        return "function" == typeof n
      }

      function qe(n) {
        const t = n(i => {
          Error.call(i), i.stack = (new Error).stack
        });
        return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t
      }
      const et = qe(n => function (t) {
        n(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((i,r)=>`${r+1}) ${i.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t
      });

      function vi(n, e) {
        if (n) {
          const t = n.indexOf(e);
          0 <= t && n.splice(t, 1)
        }
      }
      class Se {
        constructor(e) {
          this.initialTeardown = e, this.closed = !1, this._parentage = null, this._teardowns = null
        }
        unsubscribe() {
          let e;
          if (!this.closed) {
            this.closed = !0;
            const {
              _parentage: t
            } = this;
            if (t)
              if (this._parentage = null, Array.isArray(t))
                for (const o of t) o.remove(this);
              else t.remove(this);
            const {
              initialTeardown: i
            } = this;
            if (U(i)) try {
              i()
            } catch (o) {
              e = o instanceof et ? o.errors : [o]
            }
            const {
              _teardowns: r
            } = this;
            if (r) {
              this._teardowns = null;
              for (const o of r) try {
                oh(o)
              } catch (s) {
                e = null != e ? e : [], s instanceof et ? e = [...e, ...s.errors] : e.push(s)
              }
            }
            if (e) throw new et(e)
          }
        }
        add(e) {
          var t;
          if (e && e !== this)
            if (this.closed) oh(e);
            else {
              if (e instanceof Se) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this)
              }(this._teardowns = null !== (t = this._teardowns) && void 0 !== t ? t : []).push(e)
            }
        }
        _hasParent(e) {
          const {
            _parentage: t
          } = this;
          return t === e || Array.isArray(t) && t.includes(e)
        }
        _addParent(e) {
          const {
            _parentage: t
          } = this;
          this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e
        }
        _removeParent(e) {
          const {
            _parentage: t
          } = this;
          t === e ? this._parentage = null : Array.isArray(t) && vi(t, e)
        }
        remove(e) {
          const {
            _teardowns: t
          } = this;
          t && vi(t, e), e instanceof Se && e._removeParent(this)
        }
      }
      Se.EMPTY = (() => {
        const n = new Se;
        return n.closed = !0, n
      })();
      const ih = Se.EMPTY;

      function rh(n) {
        return n instanceof Se || n && "closed" in n && U(n.remove) && U(n.add) && U(n.unsubscribe)
      }

      function oh(n) {
        U(n) ? n() : n.unsubscribe()
      }
      const Qn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1
        },
        Bo = {
          setTimeout(...n) {
            const {
              delegate: e
            } = Bo;
            return ((null == e ? void 0 : e.setTimeout) || setTimeout)(...n)
          },
          clearTimeout(n) {
            const {
              delegate: e
            } = Bo;
            return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(n)
          },
          delegate: void 0
        };

      function sh(n) {
        Bo.setTimeout(() => {
          const {
            onUnhandledError: e
          } = Qn;
          if (!e) throw n;
          e(n)
        })
      }

      function Sr() {}
      const Zb = Ua("C", void 0, void 0);

      function Ua(n, e, t) {
        return {
          kind: n,
          value: e,
          error: t
        }
      }
      let Zn = null;

      function jo(n) {
        if (Qn.useDeprecatedSynchronousErrorHandling) {
          const e = !Zn;
          if (e && (Zn = {
              errorThrown: !1,
              error: null
            }), n(), e) {
            const {
              errorThrown: t,
              error: i
            } = Zn;
            if (Zn = null, t) throw i
          }
        } else n()
      }
      class Ga extends Se {
        constructor(e) {
          super(), this.isStopped = !1, e ? (this.destination = e, rh(e) && e.add(this)) : this.destination = t0
        }
        static create(e, t, i) {
          return new Wa(e, t, i)
        }
        next(e) {
          this.isStopped ? Ka(Ua("N", e, void 0), this) : this._next(e)
        }
        error(e) {
          this.isStopped ? Ka(Ua("E", void 0, e), this) : (this.isStopped = !0, this._error(e))
        }
        complete() {
          this.isStopped ? Ka(Zb, this) : (this.isStopped = !0, this._complete())
        }
        unsubscribe() {
          this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
        }
        _next(e) {
          this.destination.next(e)
        }
        _error(e) {
          try {
            this.destination.error(e)
          } finally {
            this.unsubscribe()
          }
        }
        _complete() {
          try {
            this.destination.complete()
          } finally {
            this.unsubscribe()
          }
        }
      }
      class Wa extends Ga {
        constructor(e, t, i) {
          let r;
          if (super(), U(e)) r = e;
          else if (e) {
            let o;
            ({
              next: r,
              error: t,
              complete: i
            } = e), this && Qn.useDeprecatedNextContext ? (o = Object.create(e), o.unsubscribe = () => this.unsubscribe()) : o = e, r = null == r ? void 0 : r.bind(o), t = null == t ? void 0 : t.bind(o), i = null == i ? void 0 : i.bind(o)
          }
          this.destination = {
            next: r ? qa(r) : Sr,
            error: qa(null != t ? t : ah),
            complete: i ? qa(i) : Sr
          }
        }
      }

      function qa(n, e) {
        return (...t) => {
          try {
            n(...t)
          } catch (i) {
            Qn.useDeprecatedSynchronousErrorHandling ? function (n) {
              Qn.useDeprecatedSynchronousErrorHandling && Zn && (Zn.errorThrown = !0, Zn.error = n)
            }(i) : sh(i)
          }
        }
      }

      function ah(n) {
        throw n
      }

      function Ka(n, e) {
        const {
          onStoppedNotification: t
        } = Qn;
        t && Bo.setTimeout(() => t(n, e))
      }
      const t0 = {
          closed: !0,
          next: Sr,
          error: ah,
          complete: Sr
        },
        Ya = "function" == typeof Symbol && Symbol.observable || "@@observable";

      function Vo(n) {
        return n
      }
      let Le = (() => {
        class n {
          constructor(t) {
            t && (this._subscribe = t)
          }
          lift(t) {
            const i = new n;
            return i.source = this, i.operator = t, i
          }
          subscribe(t, i, r) {
            const o = function (n) {
              return n && n instanceof Ga || function (n) {
                return n && U(n.next) && U(n.error) && U(n.complete)
              }(n) && rh(n)
            }(t) ? t : new Wa(t, i, r);
            return jo(() => {
              const {
                operator: s,
                source: a
              } = this;
              o.add(s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o))
            }), o
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t)
            } catch (i) {
              t.error(i)
            }
          }
          forEach(t, i) {
            return new(i = ch(i))((r, o) => {
              let s;
              s = this.subscribe(a => {
                try {
                  t(a)
                } catch (l) {
                  o(l), null == s || s.unsubscribe()
                }
              }, o, r)
            })
          }
          _subscribe(t) {
            var i;
            return null === (i = this.source) || void 0 === i ? void 0 : i.subscribe(t)
          } [Ya]() {
            return this
          }
          pipe(...t) {
            return function (n) {
              return 0 === n.length ? Vo : 1 === n.length ? n[0] : function (t) {
                return n.reduce((i, r) => r(i), t)
              }
            }(t)(this)
          }
          toPromise(t) {
            return new(t = ch(t))((i, r) => {
              let o;
              this.subscribe(s => o = s, s => r(s), () => i(o))
            })
          }
        }
        return n.create = e => new n(e), n
      })();

      function ch(n) {
        var e;
        return null !== (e = null != n ? n : Qn.Promise) && void 0 !== e ? e : Promise
      }
      const o0 = qe(n => function () {
        n(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
      });
      let re = (() => {
        class n extends Le {
          constructor() {
            super(), this.closed = !1, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
          }
          lift(t) {
            const i = new uh(this, this);
            return i.operator = t, i
          }
          _throwIfClosed() {
            if (this.closed) throw new o0
          }
          next(t) {
            jo(() => {
              if (this._throwIfClosed(), !this.isStopped) {
                const i = this.observers.slice();
                for (const r of i) r.next(t)
              }
            })
          }
          error(t) {
            jo(() => {
              if (this._throwIfClosed(), !this.isStopped) {
                this.hasError = this.isStopped = !0, this.thrownError = t;
                const {
                  observers: i
                } = this;
                for (; i.length;) i.shift().error(t)
              }
            })
          }
          complete() {
            jo(() => {
              if (this._throwIfClosed(), !this.isStopped) {
                this.isStopped = !0;
                const {
                  observers: t
                } = this;
                for (; t.length;) t.shift().complete()
              }
            })
          }
          unsubscribe() {
            this.isStopped = this.closed = !0, this.observers = null
          }
          get observed() {
            var t;
            return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t)
          }
          _subscribe(t) {
            return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t)
          }
          _innerSubscribe(t) {
            const {
              hasError: i,
              isStopped: r,
              observers: o
            } = this;
            return i || r ? ih : (o.push(t), new Se(() => vi(o, t)))
          }
          _checkFinalizedStatuses(t) {
            const {
              hasError: i,
              thrownError: r,
              isStopped: o
            } = this;
            i ? t.error(r) : o && t.complete()
          }
          asObservable() {
            const t = new Le;
            return t.source = this, t
          }
        }
        return n.create = (e, t) => new uh(e, t), n
      })();
      class uh extends re {
        constructor(e, t) {
          super(), this.destination = e, this.source = t
        }
        next(e) {
          var t, i;
          null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === i || i.call(t, e)
        }
        error(e) {
          var t, i;
          null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === i || i.call(t, e)
        }
        complete() {
          var e, t;
          null === (t = null === (e = this.destination) || void 0 === e ? void 0 : e.complete) || void 0 === t || t.call(e)
        }
        _subscribe(e) {
          var t, i;
          return null !== (i = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e)) && void 0 !== i ? i : ih
        }
      }

      function ht(n) {
        return e => {
          if (function (n) {
              return U(null == n ? void 0 : n.lift)
            }(e)) return e.lift(function (t) {
            try {
              return n(t, this)
            } catch (i) {
              this.error(i)
            }
          });
          throw new TypeError("Unable to lift unknown Observable type")
        }
      }
      class Pt extends Ga {
        constructor(e, t, i, r, o) {
          super(e), this.onFinalize = o, this._next = t ? function (s) {
            try {
              t(s)
            } catch (a) {
              e.error(a)
            }
          } : super._next, this._error = r ? function (s) {
            try {
              r(s)
            } catch (a) {
              e.error(a)
            } finally {
              this.unsubscribe()
            }
          } : super._error, this._complete = i ? function () {
            try {
              i()
            } catch (s) {
              e.error(s)
            } finally {
              this.unsubscribe()
            }
          } : super._complete
        }
        unsubscribe() {
          var e;
          const {
            closed: t
          } = this;
          super.unsubscribe(), !t && (null === (e = this.onFinalize) || void 0 === e || e.call(this))
        }
      }

      function Qa(n, e) {
        return ht((t, i) => {
          let r = 0;
          t.subscribe(new Pt(i, o => {
            i.next(n.call(e, o, r++))
          }))
        })
      }

      function Xn(n) {
        return this instanceof Xn ? (this.v = n, this) : new Xn(n)
      }

      function c0(n, e, t) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var r, i = t.apply(n, e || []),
          o = [];
        return r = {}, s("next"), s("throw"), s("return"), r[Symbol.asyncIterator] = function () {
          return this
        }, r;

        function s(m) {
          i[m] && (r[m] = function (p) {
            return new Promise(function (_, v) {
              o.push([m, p, _, v]) > 1 || a(m, p)
            })
          })
        }

        function a(m, p) {
          try {
            ! function (m) {
              m.value instanceof Xn ? Promise.resolve(m.value.v).then(c, u) : f(o[0][2], m)
            }(i[m](p))
          } catch (_) {
            f(o[0][3], _)
          }
        }

        function c(m) {
          a("next", m)
        }

        function u(m) {
          a("throw", m)
        }

        function f(m, p) {
          m(p), o.shift(), o.length && a(o[0][0], o[0][1])
        }
      }

      function u0(n) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var t, e = n[Symbol.asyncIterator];
        return e ? e.call(n) : (n = function (n) {
          var e = "function" == typeof Symbol && Symbol.iterator,
            t = e && n[e],
            i = 0;
          if (t) return t.call(n);
          if (n && "number" == typeof n.length) return {
            next: function () {
              return n && i >= n.length && (n = void 0), {
                value: n && n[i++],
                done: !n
              }
            }
          };
          throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }(n), t = {}, i("next"), i("throw"), i("return"), t[Symbol.asyncIterator] = function () {
          return this
        }, t);

        function i(o) {
          t[o] = n[o] && function (s) {
            return new Promise(function (a, l) {
              ! function (o, s, a, l) {
                Promise.resolve(l).then(function (c) {
                  o({
                    value: c,
                    done: a
                  })
                }, s)
              }(a, l, (s = n[o](s)).done, s.value)
            })
          }
        }
      }
      const Xa = n => n && "number" == typeof n.length && "function" != typeof n;

      function mh(n) {
        return U(null == n ? void 0 : n.then)
      }

      function ph(n) {
        return U(n[Ya])
      }

      function gh(n) {
        return Symbol.asyncIterator && U(null == n ? void 0 : n[Symbol.asyncIterator])
      }

      function _h(n) {
        return new TypeError(`You provided ${null!==n&&"object"==typeof n?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
      }
      const yh = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";

      function vh(n) {
        return U(null == n ? void 0 : n[yh])
      }

      function bh(n) {
        return c0(this, arguments, function* () {
          const t = n.getReader();
          try {
            for (;;) {
              const {
                value: i,
                done: r
              } = yield Xn(t.read());
              if (r) return yield Xn(void 0);
              yield yield Xn(i)
            }
          } finally {
            t.releaseLock()
          }
        })
      }

      function Ch(n) {
        return U(null == n ? void 0 : n.getReader)
      }

      function sn(n) {
        if (n instanceof Le) return n;
        if (null != n) {
          if (ph(n)) return function (n) {
            return new Le(e => {
              const t = n[Ya]();
              if (U(t.subscribe)) return t.subscribe(e);
              throw new TypeError("Provided object does not correctly implement Symbol.observable")
            })
          }(n);
          if (Xa(n)) return function (n) {
            return new Le(e => {
              for (let t = 0; t < n.length && !e.closed; t++) e.next(n[t]);
              e.complete()
            })
          }(n);
          if (mh(n)) return function (n) {
            return new Le(e => {
              n.then(t => {
                e.closed || (e.next(t), e.complete())
              }, t => e.error(t)).then(null, sh)
            })
          }(n);
          if (gh(n)) return wh(n);
          if (vh(n)) return function (n) {
            return new Le(e => {
              for (const t of n)
                if (e.next(t), e.closed) return;
              e.complete()
            })
          }(n);
          if (Ch(n)) return function (n) {
            return wh(bh(n))
          }(n)
        }
        throw _h(n)
      }

      function wh(n) {
        return new Le(e => {
          (function (n, e) {
            var t, i, r, o;
            return function (n, e, t, i) {
              return new(t || (t = Promise))(function (o, s) {
                function a(u) {
                  try {
                    c(i.next(u))
                  } catch (f) {
                    s(f)
                  }
                }

                function l(u) {
                  try {
                    c(i.throw(u))
                  } catch (f) {
                    s(f)
                  }
                }

                function c(u) {
                  u.done ? o(u.value) : function (o) {
                    return o instanceof t ? o : new t(function (s) {
                      s(o)
                    })
                  }(u.value).then(a, l)
                }
                c((i = i.apply(n, e || [])).next())
              })
            }(this, void 0, void 0, function* () {
              try {
                for (t = u0(n); !(i = yield t.next()).done;)
                  if (e.next(i.value), e.closed) return
              } catch (s) {
                r = {
                  error: s
                }
              } finally {
                try {
                  i && !i.done && (o = t.return) && (yield o.call(t))
                } finally {
                  if (r) throw r.error
                }
              }
              e.complete()
            })
          })(n, e).catch(t => e.error(t))
        })
      }

      function On(n, e, t, i = 0, r = !1) {
        const o = e.schedule(function () {
          t(), r ? n.add(this.schedule(null, i)) : this.unsubscribe()
        }, i);
        if (n.add(o), !r) return o
      }

      function Ja(n, e, t = 1 / 0) {
        return U(e) ? Ja((i, r) => Qa((o, s) => e(i, o, r, s))(sn(n(i, r))), t) : ("number" == typeof e && (t = e), ht((i, r) => function (n, e, t, i, r, o, s, a) {
          const l = [];
          let c = 0,
            u = 0,
            f = !1;
          const m = () => {
              f && !l.length && !c && e.complete()
            },
            p = v => c < i ? _(v) : l.push(v),
            _ = v => {
              c++;
              let C = !1;
              sn(t(v, u++)).subscribe(new Pt(e, D => {
                e.next(D)
              }, () => {
                C = !0
              }, void 0, () => {
                if (C) try {
                  for (c--; l.length && c < i;) {
                    const D = l.shift();
                    _(D)
                  }
                  m()
                } catch (D) {
                  e.error(D)
                }
              }))
            };
          return n.subscribe(new Pt(e, p, () => {
            f = !0, m()
          })), () => {}
        }(i, r, n, t)))
      }

      function Dh(n = 1 / 0) {
        return Ja(Vo, n)
      }
      const el = new Le(n => n.complete());

      function Mh(n) {
        return n && U(n.schedule)
      }

      function tl(n) {
        return n[n.length - 1]
      }

      function Ho(n) {
        return Mh(tl(n)) ? n.pop() : void 0
      }

      function Eh(n, e = 0) {
        return ht((t, i) => {
          t.subscribe(new Pt(i, r => On(i, n, () => i.next(r), e), () => On(i, n, () => i.complete(), e), r => On(i, n, () => i.error(r), e)))
        })
      }

      function xh(n, e = 0) {
        return ht((t, i) => {
          i.add(n.schedule(() => t.subscribe(i), e))
        })
      }

      function Th(n, e) {
        if (!n) throw new Error("Iterable cannot be null");
        return new Le(t => {
          On(t, e, () => {
            const i = n[Symbol.asyncIterator]();
            On(t, e, () => {
              i.next().then(r => {
                r.done ? t.complete() : t.next(r.value)
              })
            }, 0, !0)
          })
        })
      }

      function zo(n, e) {
        return e ? function (n, e) {
          if (null != n) {
            if (ph(n)) return function (n, e) {
              return sn(n).pipe(xh(e), Eh(e))
            }(n, e);
            if (Xa(n)) return function (n, e) {
              return new Le(t => {
                let i = 0;
                return e.schedule(function () {
                  i === n.length ? t.complete() : (t.next(n[i++]), t.closed || this.schedule())
                })
              })
            }(n, e);
            if (mh(n)) return function (n, e) {
              return sn(n).pipe(xh(e), Eh(e))
            }(n, e);
            if (gh(n)) return Th(n, e);
            if (vh(n)) return function (n, e) {
              return new Le(t => {
                let i;
                return On(t, e, () => {
                  i = n[yh](), On(t, e, () => {
                    let r, o;
                    try {
                      ({
                        value: r,
                        done: o
                      } = i.next())
                    } catch (s) {
                      return void t.error(s)
                    }
                    o ? t.complete() : t.next(r)
                  }, 0, !0)
                }), () => U(null == i ? void 0 : i.return) && i.return()
              })
            }(n, e);
            if (Ch(n)) return function (n, e) {
              return Th(bh(n), e)
            }(n, e)
          }
          throw _h(n)
        }(n, e) : sn(n)
      }

      function Pr(...n) {
        const e = Ho(n),
          t = function (n, e) {
            return "number" == typeof tl(n) ? n.pop() : 1 / 0
          }(n),
          i = n;
        return i.length ? 1 === i.length ? sn(i[0]) : Dh(t)(zo(i, e)) : el
      }

      function bi(n) {
        return n <= 0 ? () => el : ht((e, t) => {
          let i = 0;
          e.subscribe(new Pt(t, r => {
            ++i <= n && (t.next(r), n <= i && t.complete())
          }))
        })
      }

      function nl(n, e, ...t) {
        return !0 === e ? (n(), null) : !1 === e ? null : e(...t).pipe(bi(1)).subscribe(() => n())
      }

      function oe(n) {
        for (let e in n)
          if (n[e] === oe) return e;
        throw Error("Could not find renamed property on target object.")
      }

      function il(n, e) {
        for (const t in e) e.hasOwnProperty(t) && !n.hasOwnProperty(t) && (n[t] = e[t])
      }

      function Q(n) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) return "[" + n.map(Q).join(", ") + "]";
        if (null == n) return "" + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const e = n.toString();
        if (null == e) return "" + e;
        const t = e.indexOf("\n");
        return -1 === t ? e : e.substring(0, t)
      }

      function rl(n, e) {
        return null == n || "" === n ? null === e ? "" : e : null == e || "" === e ? n : n + " " + e
      }
      const S0 = oe({
        __forward_ref__: oe
      });

      function $o(n) {
        return n.__forward_ref__ = $o, n.toString = function () {
          return Q(this())
        }, n
      }

      function H(n) {
        return kh(n) ? n() : n
      }

      function kh(n) {
        return "function" == typeof n && n.hasOwnProperty(S0) && n.__forward_ref__ === $o
      }
      class ft extends Error {
        constructor(e, t) {
          super(function (n, e) {
            return `${n?`NG0${n}: `:""}${e}`
          }(e, t)), this.code = e
        }
      }

      function B(n) {
        return "string" == typeof n ? n : null == n ? "" : String(n)
      }

      function tt(n) {
        return "function" == typeof n ? n.name || n.toString() : "object" == typeof n && null != n && "function" == typeof n.type ? n.type.name || n.type.toString() : B(n)
      }

      function Uo(n, e) {
        const t = e ? ` in ${e}` : "";
        throw new ft("201", `No provider for ${tt(n)} found${t}`)
      }

      function pt(n, e) {
        null == n && function (n, e, t, i) {
          throw new Error(`ASSERTION ERROR: ${n}` + (null == i ? "" : ` [Expected=> ${t} ${i} ${e} <=Actual]`))
        }(e, n, null, "!=")
      }

      function I(n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0
        }
      }

      function ge(n) {
        return {
          providers: n.providers || [],
          imports: n.imports || []
        }
      }

      function sl(n) {
        return Sh(n, Go) || Sh(n, Oh)
      }

      function Sh(n, e) {
        return n.hasOwnProperty(e) ? n[e] : null
      }

      function Ph(n) {
        return n && (n.hasOwnProperty(al) || n.hasOwnProperty(N0)) ? n[al] : null
      }
      const Go = oe({
          \u0275prov: oe
        }),
        al = oe({
          \u0275inj: oe
        }),
        Oh = oe({
          ngInjectableDef: oe
        }),
        N0 = oe({
          ngInjectorDef: oe
        });
      var V = (() => ((V = V || {})[V.Default = 0] = "Default", V[V.Host = 1] = "Host", V[V.Self = 2] = "Self", V[V.SkipSelf = 4] = "SkipSelf", V[V.Optional = 8] = "Optional", V))();
      let ll;

      function An(n) {
        const e = ll;
        return ll = n, e
      }

      function Ah(n, e, t) {
        const i = sl(n);
        return i && "root" == i.providedIn ? void 0 === i.value ? i.value = i.factory() : i.value : t & V.Optional ? null : void 0 !== e ? e : void Uo(Q(n), "Injector")
      }

      function In(n) {
        return {
          toString: n
        }.toString()
      }
      var Ot = (() => ((Ot = Ot || {})[Ot.OnPush = 0] = "OnPush", Ot[Ot.Default = 1] = "Default", Ot))(),
        $t = (() => {
          return (n = $t || ($t = {}))[n.Emulated = 0] = "Emulated", n[n.None = 2] = "None", n[n.ShadowDom = 3] = "ShadowDom", $t;
          var n
        })();
      const B0 = "undefined" != typeof globalThis && globalThis,
        j0 = "undefined" != typeof window && window,
        V0 = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
        ie = B0 || "undefined" != typeof global && global || j0 || V0,
        Ci = {},
        se = [],
        Wo = oe({
          \u0275cmp: oe
        }),
        cl = oe({
          \u0275dir: oe
        }),
        ul = oe({
          \u0275pipe: oe
        }),
        Ih = oe({
          \u0275mod: oe
        }),
        Cn = oe({
          \u0275fac: oe
        }),
        Or = oe({
          __NG_ELEMENT_ID__: oe
        });
      let H0 = 0;

      function W(n) {
        return In(() => {
          const t = {},
            i = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: t,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === Ot.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: n.selectors || se,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || $t.Emulated,
              id: "c",
              styles: n.styles || se,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null
            },
            r = n.directives,
            o = n.features,
            s = n.pipes;
          return i.id += H0++, i.inputs = Lh(n.inputs, t), i.outputs = Lh(n.outputs), o && o.forEach(a => a(i)), i.directiveDefs = r ? () => ("function" == typeof r ? r() : r).map(Fh) : null, i.pipeDefs = s ? () => ("function" == typeof s ? s() : s).map(Rh) : null, i
        })
      }

      function Fh(n) {
        return Ke(n) || function (n) {
          return n[cl] || null
        }(n)
      }

      function Rh(n) {
        return function (n) {
          return n[ul] || null
        }(n)
      }
      const Nh = {};

      function Me(n) {
        return In(() => {
          const e = {
            type: n.type,
            bootstrap: n.bootstrap || se,
            declarations: n.declarations || se,
            imports: n.imports || se,
            exports: n.exports || se,
            transitiveCompileScopes: null,
            schemas: n.schemas || null,
            id: n.id || null
          };
          return null != n.id && (Nh[n.id] = n.type), e
        })
      }

      function Lh(n, e) {
        if (null == n) return Ci;
        const t = {};
        for (const i in n)
          if (n.hasOwnProperty(i)) {
            let r = n[i],
              o = r;
            Array.isArray(r) && (o = r[1], r = r[0]), t[r] = i, e && (e[r] = o)
          } return t
      }
      const ne = W;

      function Ke(n) {
        return n[Wo] || null
      }

      function At(n, e) {
        const t = n[Ih] || null;
        if (!t && !0 === e) throw new Error(`Type ${Q(n)} does not have '\u0275mod' property.`);
        return t
      }
      const z = 11;

      function an(n) {
        return Array.isArray(n) && "object" == typeof n[1]
      }

      function Gt(n) {
        return Array.isArray(n) && !0 === n[1]
      }

      function fl(n) {
        return 0 != (8 & n.flags)
      }

      function Qo(n) {
        return 2 == (2 & n.flags)
      }

      function Zo(n) {
        return 1 == (1 & n.flags)
      }

      function Wt(n) {
        return null !== n.template
      }

      function q0(n) {
        return 0 != (512 & n[2])
      }

      function ii(n, e) {
        return n.hasOwnProperty(Cn) ? n[Cn] : null
      }
      class Q0 {
        constructor(e, t, i) {
          this.previousValue = e, this.currentValue = t, this.firstChange = i
        }
        isFirstChange() {
          return this.firstChange
        }
      }

      function xi() {
        return jh
      }

      function jh(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = X0), Z0
      }

      function Z0() {
        const n = Hh(this),
          e = null == n ? void 0 : n.current;
        if (e) {
          const t = n.previous;
          if (t === Ci) n.previous = e;
          else
            for (let i in e) t[i] = e[i];
          n.current = null, this.ngOnChanges(e)
        }
      }

      function X0(n, e, t, i) {
        const r = Hh(n) || function (n, e) {
            return n[Vh] = e
          }(n, {
            previous: Ci,
            current: null
          }),
          o = r.current || (r.current = {}),
          s = r.previous,
          a = this.declaredInputs[t],
          l = s[a];
        o[a] = new Q0(l && l.currentValue, e, s === Ci), n[i] = e
      }
      xi.ngInherit = !0;
      const Vh = "__ngSimpleChanges__";

      function Hh(n) {
        return n[Vh] || null
      }
      let gl;

      function Ee(n) {
        return !!n.listen
      }
      const Uh = {
        createRenderer: (n, e) => void 0 !== gl ? gl : "undefined" != typeof document ? document : void 0
      };

      function Ae(n) {
        for (; Array.isArray(n);) n = n[0];
        return n
      }

      function Xo(n, e) {
        return Ae(e[n])
      }

      function Rt(n, e) {
        return Ae(e[n.index])
      }

      function yl(n, e) {
        return n.data[e]
      }

      function _t(n, e) {
        const t = e[n];
        return an(t) ? t : t[0]
      }

      function Gh(n) {
        return 4 == (4 & n[2])
      }

      function vl(n) {
        return 128 == (128 & n[2])
      }

      function Rn(n, e) {
        return null == e ? null : n[e]
      }

      function Wh(n) {
        n[18] = 0
      }

      function bl(n, e) {
        n[5] += e;
        let t = n,
          i = n[3];
        for (; null !== i && (1 === e && 1 === t[5] || -1 === e && 0 === t[5]);) i[5] += e, t = i, i = i[3]
      }
      const N = {
        lFrame: ef(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1
      };

      function qh() {
        return N.bindingsEnabled
      }

      function E() {
        return N.lFrame.lView
      }

      function Z() {
        return N.lFrame.tView
      }

      function ki(n) {
        return N.lFrame.contextLView = n, n[8]
      }

      function Be() {
        let n = Kh();
        for (; null !== n && 64 === n.type;) n = n.parent;
        return n
      }

      function Kh() {
        return N.lFrame.currentTNode
      }

      function ln(n, e) {
        const t = N.lFrame;
        t.currentTNode = n, t.isParent = e
      }

      function Cl() {
        return N.lFrame.isParent
      }

      function wl() {
        N.lFrame.isParent = !1
      }

      function Jo() {
        return N.isInCheckNoChangesMode
      }

      function es(n) {
        N.isInCheckNoChangesMode = n
      }

      function nt() {
        const n = N.lFrame;
        let e = n.bindingRootIndex;
        return -1 === e && (e = n.bindingRootIndex = n.tView.bindingStartIndex), e
      }

      function Si() {
        return N.lFrame.bindingIndex++
      }

      function m1(n, e) {
        const t = N.lFrame;
        t.bindingIndex = t.bindingRootIndex = n, Dl(e)
      }

      function Dl(n) {
        N.lFrame.currentDirectiveIndex = n
      }

      function Ml(n) {
        const e = N.lFrame.currentDirectiveIndex;
        return -1 === e ? null : n[e]
      }

      function Zh() {
        return N.lFrame.currentQueryIndex
      }

      function El(n) {
        N.lFrame.currentQueryIndex = n
      }

      function g1(n) {
        const e = n[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? n[6] : null
      }

      function Xh(n, e, t) {
        if (t & V.SkipSelf) {
          let r = e,
            o = n;
          for (; !(r = r.parent, null !== r || t & V.Host || (r = g1(o), null === r || (o = o[15], 10 & r.type))););
          if (null === r) return !1;
          e = r, n = o
        }
        const i = N.lFrame = Jh();
        return i.currentTNode = e, i.lView = n, !0
      }

      function ts(n) {
        const e = Jh(),
          t = n[1];
        N.lFrame = e, e.currentTNode = t.firstChild, e.lView = n, e.tView = t, e.contextLView = n, e.bindingIndex = t.bindingStartIndex, e.inI18n = !1
      }

      function Jh() {
        const n = N.lFrame,
          e = null === n ? null : n.child;
        return null === e ? ef(n) : e
      }

      function ef(n) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1
        };
        return null !== n && (n.child = e), e
      }

      function tf() {
        const n = N.lFrame;
        return N.lFrame = n.parent, n.currentTNode = null, n.lView = null, n
      }
      const nf = tf;

      function ns() {
        const n = tf();
        n.isParent = !0, n.tView = null, n.selectedIndex = -1, n.contextLView = null, n.elementDepthCount = 0, n.currentDirectiveIndex = -1, n.currentNamespace = null, n.bindingRootIndex = -1, n.bindingIndex = -1, n.currentQueryIndex = 0
      }

      function it() {
        return N.lFrame.selectedIndex
      }

      function Nn(n) {
        N.lFrame.selectedIndex = n
      }

      function xe() {
        const n = N.lFrame;
        return yl(n.tView, n.selectedIndex)
      }

      function is(n, e) {
        for (let t = e.directiveStart, i = e.directiveEnd; t < i; t++) {
          const o = n.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u
            } = o;
          s && (n.contentHooks || (n.contentHooks = [])).push(-t, s), a && ((n.contentHooks || (n.contentHooks = [])).push(t, a), (n.contentCheckHooks || (n.contentCheckHooks = [])).push(t, a)), l && (n.viewHooks || (n.viewHooks = [])).push(-t, l), c && ((n.viewHooks || (n.viewHooks = [])).push(t, c), (n.viewCheckHooks || (n.viewCheckHooks = [])).push(t, c)), null != u && (n.destroyHooks || (n.destroyHooks = [])).push(t, u)
        }
      }

      function rs(n, e, t) {
        rf(n, e, 3, t)
      }

      function os(n, e, t, i) {
        (3 & n[2]) === t && rf(n, e, t, i)
      }

      function xl(n, e) {
        let t = n[2];
        (3 & t) === e && (t &= 2047, t += 1, n[2] = t)
      }

      function rf(n, e, t, i) {
        const o = null != i ? i : -1,
          s = e.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & n[18] : 0; l < s; l++)
          if ("number" == typeof e[l + 1]) {
            if (a = e[l], null != i && a >= i) break
          } else e[l] < 0 && (n[18] += 65536), (a < o || -1 == o) && (E1(n, t, e, l), n[18] = (4294901760 & n[18]) + l + 2), l++
      }

      function E1(n, e, t, i) {
        const r = t[i] < 0,
          o = t[i + 1],
          a = n[r ? -t[i] : t[i]];
        if (r) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === e) {
            n[2] += 2048;
            try {
              o.call(a)
            } finally {}
          }
        } else try {
          o.call(a)
        } finally {}
      }
      class Nr {
        constructor(e, t, i) {
          this.factory = e, this.resolving = !1, this.canSeeViewProviders = t, this.injectImpl = i
        }
      }

      function ss(n, e, t) {
        const i = Ee(n);
        let r = 0;
        for (; r < t.length;) {
          const o = t[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const s = t[r++],
              a = t[r++],
              l = t[r++];
            i ? n.setAttribute(e, a, l, s) : e.setAttributeNS(s, a, l)
          } else {
            const s = o,
              a = t[++r];
            kl(s) ? i && n.setProperty(e, s, a) : i ? n.setAttribute(e, s, a) : e.setAttribute(s, a), r++
          }
        }
        return r
      }

      function sf(n) {
        return 3 === n || 4 === n || 6 === n
      }

      function kl(n) {
        return 64 === n.charCodeAt(0)
      }

      function as(n, e) {
        if (null !== e && 0 !== e.length)
          if (null === n || 0 === n.length) n = e.slice();
          else {
            let t = -1;
            for (let i = 0; i < e.length; i++) {
              const r = e[i];
              "number" == typeof r ? t = r : 0 === t || af(n, t, r, null, -1 === t || 2 === t ? e[++i] : null)
            }
          } return n
      }

      function af(n, e, t, i, r) {
        let o = 0,
          s = n.length;
        if (-1 === e) s = -1;
        else
          for (; o < n.length;) {
            const a = n[o++];
            if ("number" == typeof a) {
              if (a === e) {
                s = -1;
                break
              }
              if (a > e) {
                s = o - 1;
                break
              }
            }
          }
        for (; o < n.length;) {
          const a = n[o];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === i) return void(null !== r && (n[o + 1] = r));
            if (i === n[o + 1]) return void(n[o + 2] = r)
          }
          o++, null !== i && o++, null !== r && o++
        } - 1 !== s && (n.splice(s, 0, e), o = s + 1), n.splice(o++, 0, t), null !== i && n.splice(o++, 0, i), null !== r && n.splice(o++, 0, r)
      }

      function lf(n) {
        return -1 !== n
      }

      function Pi(n) {
        return 32767 & n
      }

      function Oi(n, e) {
        let t = function (n) {
            return n >> 16
          }(n),
          i = e;
        for (; t > 0;) i = i[15], t--;
        return i
      }
      let Sl = !0;

      function ls(n) {
        const e = Sl;
        return Sl = n, e
      }
      let O1 = 0;

      function Br(n, e) {
        const t = Ol(n, e);
        if (-1 !== t) return t;
        const i = e[1];
        i.firstCreatePass && (n.injectorIndex = e.length, Pl(i.data, n), Pl(e, null), Pl(i.blueprint, null));
        const r = cs(n, e),
          o = n.injectorIndex;
        if (lf(r)) {
          const s = Pi(r),
            a = Oi(r, e),
            l = a[1].data;
          for (let c = 0; c < 8; c++) e[o + c] = a[s + c] | l[s + c]
        }
        return e[o + 8] = r, o
      }

      function Pl(n, e) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, e)
      }

      function Ol(n, e) {
        return -1 === n.injectorIndex || n.parent && n.parent.injectorIndex === n.injectorIndex || null === e[n.injectorIndex + 8] ? -1 : n.injectorIndex
      }

      function cs(n, e) {
        if (n.parent && -1 !== n.parent.injectorIndex) return n.parent.injectorIndex;
        let t = 0,
          i = null,
          r = e;
        for (; null !== r;) {
          const o = r[1],
            s = o.type;
          if (i = 2 === s ? o.declTNode : 1 === s ? r[6] : null, null === i) return -1;
          if (t++, r = r[15], -1 !== i.injectorIndex) return i.injectorIndex | t << 16
        }
        return -1
      }

      function us(n, e, t) {
        ! function (n, e, t) {
          let i;
          "string" == typeof t ? i = t.charCodeAt(0) || 0 : t.hasOwnProperty(Or) && (i = t[Or]), null == i && (i = t[Or] = O1++);
          const r = 255 & i;
          e.data[n + (r >> 5)] |= 1 << r
        }(n, e, t)
      }

      function df(n, e, t) {
        if (t & V.Optional) return n;
        Uo(e, "NodeInjector")
      }

      function hf(n, e, t, i) {
        if (t & V.Optional && void 0 === i && (i = null), 0 == (t & (V.Self | V.Host))) {
          const r = n[9],
            o = An(void 0);
          try {
            return r ? r.get(e, i, t & V.Optional) : Ah(e, i, t & V.Optional)
          } finally {
            An(o)
          }
        }
        return df(i, e, t)
      }

      function ff(n, e, t, i = V.Default, r) {
        if (null !== n) {
          const o = function (n) {
            if ("string" == typeof n) return n.charCodeAt(0) || 0;
            const e = n.hasOwnProperty(Or) ? n[Or] : void 0;
            return "number" == typeof e ? e >= 0 ? 255 & e : F1 : e
          }(t);
          if ("function" == typeof o) {
            if (!Xh(e, n, i)) return i & V.Host ? df(r, t, i) : hf(e, t, i, r);
            try {
              const s = o(i);
              if (null != s || i & V.Optional) return s;
              Uo(t)
            } finally {
              nf()
            }
          } else if ("number" == typeof o) {
            let s = null,
              a = Ol(n, e),
              l = -1,
              c = i & V.Host ? e[16][6] : null;
            for ((-1 === a || i & V.SkipSelf) && (l = -1 === a ? cs(n, e) : e[a + 8], -1 !== l && gf(i, !1) ? (s = e[1], a = Pi(l), e = Oi(l, e)) : a = -1); - 1 !== a;) {
              const u = e[1];
              if (pf(o, a, u.data)) {
                const f = R1(a, e, t, s, i, c);
                if (f !== mf) return f
              }
              l = e[a + 8], -1 !== l && gf(i, e[1].data[a + 8] === c) && pf(o, a, e) ? (s = u, a = Pi(l), e = Oi(l, e)) : a = -1
            }
          }
        }
        return hf(e, t, i, r)
      }
      const mf = {};

      function F1() {
        return new Ai(Be(), E())
      }

      function R1(n, e, t, i, r, o) {
        const s = e[1],
          a = s.data[n + 8],
          u = ds(a, s, t, null == i ? Qo(a) && Sl : i != s && 0 != (3 & a.type), r & V.Host && o === a);
        return null !== u ? jr(e, s, u, a) : mf
      }

      function ds(n, e, t, i, r) {
        const o = n.providerIndexes,
          s = e.data,
          a = 1048575 & o,
          l = n.directiveStart,
          u = o >> 20,
          m = r ? a + u : n.directiveEnd;
        for (let p = i ? a : a + u; p < m; p++) {
          const _ = s[p];
          if (p < l && t === _ || p >= l && _.type === t) return p
        }
        if (r) {
          const p = s[l];
          if (p && Wt(p) && p.type === t) return l
        }
        return null
      }

      function jr(n, e, t, i) {
        let r = n[t];
        const o = e.data;
        if (function (n) {
            return n instanceof Nr
          }(r)) {
          const s = r;
          s.resolving && function (n, e) {
            throw new ft("200", `Circular dependency in DI detected for ${n}`)
          }(tt(o[t]));
          const a = ls(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? An(s.injectImpl) : null;
          Xh(n, i, V.Default);
          try {
            r = n[t] = s.factory(void 0, o, n, i), e.firstCreatePass && t >= i.directiveStart && function (n, e, t) {
              const {
                ngOnChanges: i,
                ngOnInit: r,
                ngDoCheck: o
              } = e.type.prototype;
              if (i) {
                const s = jh(e);
                (t.preOrderHooks || (t.preOrderHooks = [])).push(n, s), (t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n, s)
              }
              r && (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - n, r), o && ((t.preOrderHooks || (t.preOrderHooks = [])).push(n, o), (t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n, o))
            }(t, o[t], e)
          } finally {
            null !== l && An(l), ls(a), s.resolving = !1, nf()
          }
        }
        return r
      }

      function pf(n, e, t) {
        return !!(t[e + (n >> 5)] & 1 << n)
      }

      function gf(n, e) {
        return !(n & V.Self || n & V.Host && e)
      }
      class Ai {
        constructor(e, t) {
          this._tNode = e, this._lView = t
        }
        get(e, t, i) {
          return ff(this._tNode, this._lView, e, i, t)
        }
      }

      function Al(n) {
        return kh(n) ? () => {
          const e = Al(H(n));
          return e && e()
        } : ii(n)
      }
      const Fi = "__parameters__";

      function Ni(n, e, t) {
        return In(() => {
          const i = function (n) {
            return function (...t) {
              if (n) {
                const i = n(...t);
                for (const r in i) this[r] = i[r]
              }
            }
          }(e);

          function r(...o) {
            if (this instanceof r) return i.apply(this, o), this;
            const s = new r(...o);
            return a.annotation = s, a;

            function a(l, c, u) {
              const f = l.hasOwnProperty(Fi) ? l[Fi] : Object.defineProperty(l, Fi, {
                value: []
              })[Fi];
              for (; f.length <= u;) f.push(null);
              return (f[u] = f[u] || []).push(s), l
            }
          }
          return t && (r.prototype = Object.create(t.prototype)), r.prototype.ngMetadataName = n, r.annotationCls = r, r
        })
      }
      class P {
        constructor(e, t) {
          this._desc = e, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.\u0275prov = I({
            token: this,
            providedIn: t.providedIn || "root",
            factory: t.factory
          }))
        }
        toString() {
          return `InjectionToken ${this._desc}`
        }
      }

      function Nt(n, e) {
        void 0 === e && (e = n);
        for (let t = 0; t < n.length; t++) {
          let i = n[t];
          Array.isArray(i) ? (e === n && (e = n.slice(0, t)), Nt(i, e)) : e !== n && e.push(i)
        }
        return e
      }

      function cn(n, e) {
        n.forEach(t => Array.isArray(t) ? cn(t, e) : e(t))
      }

      function yf(n, e, t) {
        e >= n.length ? n.push(t) : n.splice(e, 0, t)
      }

      function hs(n, e) {
        return e >= n.length - 1 ? n.pop() : n.splice(e, 1)[0]
      }

      function $r(n, e) {
        const t = [];
        for (let i = 0; i < n; i++) t.push(e);
        return t
      }

      function yt(n, e, t) {
        let i = Li(n, e);
        return i >= 0 ? n[1 | i] = t : (i = ~i, function (n, e, t, i) {
          let r = n.length;
          if (r == e) n.push(t, i);
          else if (1 === r) n.push(i, n[0]), n[0] = t;
          else {
            for (r--, n.push(n[r - 1], n[r]); r > e;) n[r] = n[r - 2], r--;
            n[e] = t, n[e + 1] = i
          }
        }(n, i, e, t)), i
      }

      function Nl(n, e) {
        const t = Li(n, e);
        if (t >= 0) return n[1 | t]
      }

      function Li(n, e) {
        return function (n, e, t) {
          let i = 0,
            r = n.length >> t;
          for (; r !== i;) {
            const o = i + (r - i >> 1),
              s = n[o << t];
            if (e === s) return o << t;
            s > e ? r = o : i = o + 1
          }
          return ~(r << t)
        }(n, e, 1)
      }
      const Ur = {},
        Bl = "__NG_DI_FLAG__",
        ms = "ngTempTokenPath",
        q1 = /\n/gm,
        Df = "__source",
        Y1 = oe({
          provide: String,
          useValue: oe
        });
      let Gr;

      function Mf(n) {
        const e = Gr;
        return Gr = n, e
      }

      function Q1(n, e = V.Default) {
        if (void 0 === Gr) throw new Error("inject() must be called from an injection context");
        return null === Gr ? Ah(n, void 0, e) : Gr.get(n, e & V.Optional ? null : void 0, e)
      }

      function M(n, e = V.Default) {
        return (ll || Q1)(H(n), e)
      }
      const xf = M;

      function jl(n) {
        const e = [];
        for (let t = 0; t < n.length; t++) {
          const i = H(n[t]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new Error("Arguments array must have arguments.");
            let r, o = V.Default;
            for (let s = 0; s < i.length; s++) {
              const a = i[s],
                l = Z1(a);
              "number" == typeof l ? -1 === l ? r = a.token : o |= l : r = a
            }
            e.push(M(r, o))
          } else e.push(M(i))
        }
        return e
      }

      function Wr(n, e) {
        return n[Bl] = e, n.prototype[Bl] = e, n
      }

      function Z1(n) {
        return n[Bl]
      }
      const ps = Wr(Ni("Inject", n => ({
          token: n
        })), -1),
        Bi = Wr(Ni("Optional"), 8),
        qr = Wr(Ni("SkipSelf"), 4);
      class Ff {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
        }
      }

      function Bn(n) {
        return n instanceof Ff ? n.changingThisBreaksApplicationSecurity : n
      }
      const vC = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        bC = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var Ie = (() => ((Ie = Ie || {})[Ie.NONE = 0] = "NONE", Ie[Ie.HTML = 1] = "HTML", Ie[Ie.STYLE = 2] = "STYLE", Ie[Ie.SCRIPT = 3] = "SCRIPT", Ie[Ie.URL = 4] = "URL", Ie[Ie.RESOURCE_URL = 5] = "RESOURCE_URL", Ie))();

      function Cs(n) {
        const e = function () {
          const n = E();
          return n && n[12]
        }();
        return e ? e.sanitize(Ie.URL, n) || "" : function (n, e) {
          const t = function (n) {
            return n instanceof Ff && n.getTypeName() || null
          }(n);
          if (null != t && t !== e) {
            if ("ResourceURL" === t && "URL" === e) return !0;
            throw new Error(`Required a safe ${e}, got a ${t} (see https://g.co/ng/security#xss)`)
          }
          return t === e
        }(n, "URL") ? Bn(n) : function (n) {
          return (n = String(n)).match(vC) || n.match(bC) ? n : "unsafe:" + n
        }(B(n))
      }
      const Uf = "__ngContext__";

      function Qe(n, e) {
        n[Uf] = e
      }

      function Kl(n) {
        const e = function (n) {
          return n[Uf] || null
        }(n);
        return e ? Array.isArray(e) ? e : e.lView : null
      }

      function Ql(n) {
        return n.ngOriginalError
      }

      function UC(n, ...e) {
        n.error(...e)
      }
      class Hi {
        constructor() {
          this._console = console
        }
        handleError(e) {
          const t = this._findOriginalError(e),
            i = (n = e) && n.ngErrorLogger || UC;
          var n;
          i(this._console, "ERROR", e), t && i(this._console, "ORIGINAL ERROR", t)
        }
        _findOriginalError(e) {
          let t = e && Ql(e);
          for (; t && Ql(t);) t = Ql(t);
          return t || null
        }
      }
      const Yf = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(ie))();

      function Qf(n) {
        return n.ownerDocument.defaultView
      }

      function dn(n) {
        return n instanceof Function ? n() : n
      }
      var vt = (() => ((vt = vt || {})[vt.Important = 1] = "Important", vt[vt.DashCase = 2] = "DashCase", vt))();

      function Xl(n, e) {
        return undefined(n, e)
      }

      function Jr(n) {
        const e = n[3];
        return Gt(e) ? e[3] : e
      }

      function Jl(n) {
        return tm(n[13])
      }

      function ec(n) {
        return tm(n[4])
      }

      function tm(n) {
        for (; null !== n && !Gt(n);) n = n[4];
        return n
      }

      function $i(n, e, t, i, r) {
        if (null != i) {
          let o, s = !1;
          Gt(i) ? o = i : an(i) && (s = !0, i = i[0]);
          const a = Ae(i);
          0 === n && null !== t ? null == r ? am(e, t, a) : ri(e, t, a, r || null, !0) : 1 === n && null !== t ? ri(e, t, a, r || null, !0) : 2 === n ? function (n, e, t) {
            const i = ws(n, e);
            i && function (n, e, t, i) {
              Ee(n) ? n.removeChild(e, t, i) : e.removeChild(t)
            }(n, i, e, t)
          }(e, a, s) : 3 === n && e.destroyNode(a), null != o && function (n, e, t, i, r) {
            const o = t[7];
            o !== Ae(t) && $i(e, n, i, o, r);
            for (let a = 10; a < t.length; a++) {
              const l = t[a];
              eo(l[1], l, n, e, i, o)
            }
          }(e, n, o, t, r)
        }
      }

      function nc(n, e, t) {
        return Ee(n) ? n.createElement(e, t) : null === t ? n.createElement(e) : n.createElementNS(t, e)
      }

      function im(n, e) {
        const t = n[9],
          i = t.indexOf(e),
          r = e[3];
        1024 & e[2] && (e[2] &= -1025, bl(r, -1)), t.splice(i, 1)
      }

      function ic(n, e) {
        if (n.length <= 10) return;
        const t = 10 + e,
          i = n[t];
        if (i) {
          const r = i[17];
          null !== r && r !== n && im(r, i), e > 0 && (n[t - 1][4] = i[4]);
          const o = hs(n, 10 + e);
          ! function (n, e) {
            eo(n, e, e[z], 2, null, null), e[0] = null, e[6] = null
          }(i[1], i);
          const s = o[19];
          null !== s && s.detachView(o[1]), i[3] = null, i[4] = null, i[2] &= -129
        }
        return i
      }

      function rm(n, e) {
        if (!(256 & e[2])) {
          const t = e[z];
          Ee(t) && t.destroyNode && eo(n, e, t, 3, null, null),
            function (n) {
              let e = n[13];
              if (!e) return rc(n[1], n);
              for (; e;) {
                let t = null;
                if (an(e)) t = e[13];
                else {
                  const i = e[10];
                  i && (t = i)
                }
                if (!t) {
                  for (; e && !e[4] && e !== n;) an(e) && rc(e[1], e), e = e[3];
                  null === e && (e = n), an(e) && rc(e[1], e), t = e && e[4]
                }
                e = t
              }
            }(e)
        }
      }

      function rc(n, e) {
        if (!(256 & e[2])) {
          e[2] &= -129, e[2] |= 256,
            function (n, e) {
              let t;
              if (null != n && null != (t = n.destroyHooks))
                for (let i = 0; i < t.length; i += 2) {
                  const r = e[t[i]];
                  if (!(r instanceof Nr)) {
                    const o = t[i + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = r[o[s]],
                          l = o[s + 1];
                        try {
                          l.call(a)
                        } finally {}
                      } else try {
                        o.call(r)
                      } finally {}
                  }
                }
            }(n, e),
            function (n, e) {
              const t = n.cleanup,
                i = e[7];
              let r = -1;
              if (null !== t)
                for (let o = 0; o < t.length - 1; o += 2)
                  if ("string" == typeof t[o]) {
                    const s = t[o + 1],
                      a = "function" == typeof s ? s(e) : Ae(e[s]),
                      l = i[r = t[o + 2]],
                      c = t[o + 3];
                    "boolean" == typeof c ? a.removeEventListener(t[o], l, c) : c >= 0 ? i[r = c]() : i[r = -c].unsubscribe(), o += 2
                  } else {
                    const s = i[r = t[o + 1]];
                    t[o].call(s)
                  } if (null !== i) {
                for (let o = r + 1; o < i.length; o++) i[o]();
                e[7] = null
              }
            }(n, e), 1 === e[1].type && Ee(e[z]) && e[z].destroy();
          const t = e[17];
          if (null !== t && Gt(e[3])) {
            t !== e[3] && im(t, e);
            const i = e[19];
            null !== i && i.detachView(n)
          }
        }
      }

      function om(n, e, t) {
        return function (n, e, t) {
          let i = e;
          for (; null !== i && 40 & i.type;) i = (e = i).parent;
          if (null === i) return t[0];
          if (2 & i.flags) {
            const r = n.data[i.directiveStart].encapsulation;
            if (r === $t.None || r === $t.Emulated) return null
          }
          return Rt(i, t)
        }(n, e.parent, t)
      }

      function ri(n, e, t, i, r) {
        Ee(n) ? n.insertBefore(e, t, i, r) : e.insertBefore(t, i, r)
      }

      function am(n, e, t) {
        Ee(n) ? n.appendChild(e, t) : e.appendChild(t)
      }

      function lm(n, e, t, i, r) {
        null !== i ? ri(n, e, t, i, r) : am(n, e, t)
      }

      function ws(n, e) {
        return Ee(n) ? n.parentNode(e) : e.parentNode
      }

      function cm(n, e, t) {
        return dm(n, e, t)
      }
      let dm = function (n, e, t) {
        return 40 & n.type ? Rt(n, t) : null
      };

      function Ds(n, e, t, i) {
        const r = om(n, i, e),
          o = e[z],
          a = cm(i.parent || e[6], i, e);
        if (null != r)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) lm(o, r, t[l], a, !1);
          else lm(o, r, t, a, !1)
      }

      function Ms(n, e) {
        if (null !== e) {
          const t = e.type;
          if (3 & t) return Rt(e, n);
          if (4 & t) return sc(-1, n[e.index]);
          if (8 & t) {
            const i = e.child;
            if (null !== i) return Ms(n, i); {
              const r = n[e.index];
              return Gt(r) ? sc(-1, r) : Ae(r)
            }
          }
          if (32 & t) return Xl(e, n)() || Ae(n[e.index]); {
            const i = fm(n, e);
            return null !== i ? Array.isArray(i) ? i[0] : Ms(Jr(n[16]), i) : Ms(n, e.next)
          }
        }
        return null
      }

      function fm(n, e) {
        return null !== e ? n[16][6].projection[e.projection] : null
      }

      function sc(n, e) {
        const t = 10 + n + 1;
        if (t < e.length) {
          const i = e[t],
            r = i[1].firstChild;
          if (null !== r) return Ms(i, r)
        }
        return e[7]
      }

      function ac(n, e, t, i, r, o, s) {
        for (; null != t;) {
          const a = i[t.index],
            l = t.type;
          if (s && 0 === e && (a && Qe(Ae(a), i), t.flags |= 4), 64 != (64 & t.flags))
            if (8 & l) ac(n, e, t.child, i, r, o, !1), $i(e, n, r, a, o);
            else if (32 & l) {
            const c = Xl(t, i);
            let u;
            for (; u = c();) $i(e, n, r, u, o);
            $i(e, n, r, a, o)
          } else 16 & l ? pm(n, e, i, t, r, o) : $i(e, n, r, a, o);
          t = s ? t.projectionNext : t.next
        }
      }

      function eo(n, e, t, i, r, o) {
        ac(t, i, n.firstChild, e, r, o, !1)
      }

      function pm(n, e, t, i, r, o) {
        const s = t[16],
          l = s[6].projection[i.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) $i(e, n, r, l[c], o);
        else ac(n, e, l, s[3], r, o, !0)
      }

      function gm(n, e, t) {
        Ee(n) ? n.setAttribute(e, "style", t) : e.style.cssText = t
      }

      function lc(n, e, t) {
        Ee(n) ? "" === t ? n.removeAttribute(e, "class") : n.setAttribute(e, "class", t) : e.className = t
      }

      function _m(n, e, t) {
        let i = n.length;
        for (;;) {
          const r = n.indexOf(e, t);
          if (-1 === r) return r;
          if (0 === r || n.charCodeAt(r - 1) <= 32) {
            const o = e.length;
            if (r + o === i || n.charCodeAt(r + o) <= 32) return r
          }
          t = r + 1
        }
      }
      const ym = "ng-template";

      function _w(n, e, t) {
        let i = 0;
        for (; i < n.length;) {
          let r = n[i++];
          if (t && "class" === r) {
            if (r = n[i], -1 !== _m(r.toLowerCase(), e, 0)) return !0
          } else if (1 === r) {
            for (; i < n.length && "string" == typeof (r = n[i++]);)
              if (r.toLowerCase() === e) return !0;
            return !1
          }
        }
        return !1
      }

      function vm(n) {
        return 4 === n.type && n.value !== ym
      }

      function yw(n, e, t) {
        return e === (4 !== n.type || t ? n.value : ym)
      }

      function vw(n, e, t) {
        let i = 4;
        const r = n.attrs || [],
          o = function (n) {
            for (let e = 0; e < n.length; e++)
              if (sf(n[e])) return e;
            return n.length
          }(r);
        let s = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & i) {
                if (i = 2 | 1 & i, "" !== l && !yw(n, l, t) || "" === l && 1 === e.length) {
                  if (qt(i)) return !1;
                  s = !0
                }
              } else {
                const c = 8 & i ? l : e[++a];
                if (8 & i && null !== n.attrs) {
                  if (!_w(n.attrs, c, t)) {
                    if (qt(i)) return !1;
                    s = !0
                  }
                  continue
                }
                const f = bw(8 & i ? "class" : l, r, vm(n), t);
                if (-1 === f) {
                  if (qt(i)) return !1;
                  s = !0;
                  continue
                }
                if ("" !== c) {
                  let m;
                  m = f > o ? "" : r[f + 1].toLowerCase();
                  const p = 8 & i ? m : null;
                  if (p && -1 !== _m(p, c, 0) || 2 & i && c !== m) {
                    if (qt(i)) return !1;
                    s = !0
                  }
                }
              }
          } else {
            if (!s && !qt(i) && !qt(l)) return !1;
            if (s && qt(l)) continue;
            s = !1, i = l | 1 & i
          }
        }
        return qt(i) || s
      }

      function qt(n) {
        return 0 == (1 & n)
      }

      function bw(n, e, t, i) {
        if (null === e) return -1;
        let r = 0;
        if (i || !t) {
          let o = !1;
          for (; r < e.length;) {
            const s = e[r];
            if (s === n) return r;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = e[++r];
                for (;
                  "string" == typeof a;) a = e[++r];
                continue
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue
              }
            }
            r += o ? 1 : 2
          }
          return -1
        }
        return function (n, e) {
          let t = n.indexOf(4);
          if (t > -1)
            for (t++; t < n.length;) {
              const i = n[t];
              if ("number" == typeof i) return -1;
              if (i === e) return t;
              t++
            }
          return -1
        }(e, n)
      }

      function bm(n, e, t = !1) {
        for (let i = 0; i < e.length; i++)
          if (vw(n, e[i], t)) return !0;
        return !1
      }

      function Mw(n, e) {
        e: for (let t = 0; t < e.length; t++) {
          const i = e[t];
          if (n.length === i.length) {
            for (let r = 0; r < n.length; r++)
              if (n[r] !== i[r]) continue e;
            return !0
          }
        }
        return !1
      }

      function Cm(n, e) {
        return n ? ":not(" + e.trim() + ")" : e
      }

      function Ew(n) {
        let e = n[0],
          t = 1,
          i = 2,
          r = "",
          o = !1;
        for (; t < n.length;) {
          let s = n[t];
          if ("string" == typeof s)
            if (2 & i) {
              const a = n[++t];
              r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
            } else 8 & i ? r += "." + s : 4 & i && (r += " " + s);
          else "" !== r && !qt(s) && (e += Cm(o, r), r = ""), i = s, o = o || !qt(i);
          t++
        }
        return "" !== r && (e += Cm(o, r)), e
      }
      const j = {};

      function $e(n) {
        wm(Z(), E(), it() + n, Jo())
      }

      function wm(n, e, t, i) {
        if (!i)
          if (3 == (3 & e[2])) {
            const o = n.preOrderCheckHooks;
            null !== o && rs(e, o, t)
          } else {
            const o = n.preOrderHooks;
            null !== o && os(e, o, 0, t)
          } Nn(t)
      }

      function Es(n, e) {
        return n << 17 | e << 2
      }

      function Kt(n) {
        return n >> 17 & 32767
      }

      function cc(n) {
        return 2 | n
      }

      function Mn(n) {
        return (131068 & n) >> 2
      }

      function uc(n, e) {
        return -131069 & n | e << 2
      }

      function dc(n) {
        return 1 | n
      }

      function Im(n, e) {
        const t = n.contentQueries;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) {
            const r = t[i],
              o = t[i + 1];
            if (-1 !== o) {
              const s = n.data[o];
              El(r), s.contentQueries(2, e[o], o)
            }
          }
      }

      function to(n, e, t, i, r, o, s, a, l, c) {
        const u = e.blueprint.slice();
        return u[0] = r, u[2] = 140 | i, Wh(u), u[3] = u[15] = n, u[8] = t, u[10] = s || n && n[10], u[z] = a || n && n[z], u[12] = l || n && n[12] || null, u[9] = c || n && n[9] || null, u[6] = o, u[16] = 2 == e.type ? n[16] : u, u
      }

      function Ui(n, e, t, i, r) {
        let o = n.data[e];
        if (null === o) o = function (n, e, t, i, r) {
          const o = Kh(),
            s = Cl(),
            l = n.data[e] = function (n, e, t, i, r, o) {
              return {
                type: t,
                index: i,
                insertBeforeIndex: null,
                injectorIndex: e ? e.injectorIndex : -1,
                directiveStart: -1,
                directiveEnd: -1,
                directiveStylingLast: -1,
                propertyBindings: null,
                flags: 0,
                providerIndexes: 0,
                value: r,
                attrs: o,
                mergedAttrs: null,
                localNames: null,
                initialInputs: void 0,
                inputs: null,
                outputs: null,
                tViews: null,
                next: null,
                projectionNext: null,
                child: null,
                parent: e,
                projection: null,
                styles: null,
                stylesWithoutHost: null,
                residualStyles: void 0,
                classes: null,
                classesWithoutHost: null,
                residualClasses: void 0,
                classBindings: 0,
                styleBindings: 0
              }
            }(0, s ? o : o && o.parent, t, e, i, r);
          return null === n.firstChild && (n.firstChild = l), null !== o && (s ? null == o.child && null !== l.parent && (o.child = l) : null === o.next && (o.next = l)), l
        }(n, e, t, i, r), N.lFrame.inI18n && (o.flags |= 64);
        else if (64 & o.type) {
          o.type = t, o.value = i, o.attrs = r;
          const s = function () {
            const n = N.lFrame,
              e = n.currentTNode;
            return n.isParent ? e : e.parent
          }();
          o.injectorIndex = null === s ? -1 : s.injectorIndex
        }
        return ln(o, !0), o
      }

      function Gi(n, e, t, i) {
        if (0 === t) return -1;
        const r = e.length;
        for (let o = 0; o < t; o++) e.push(i), n.blueprint.push(i), n.data.push(null);
        return r
      }

      function no(n, e, t) {
        ts(e);
        try {
          const i = n.viewQuery;
          null !== i && Sc(1, i, t);
          const r = n.template;
          null !== r && Fm(n, e, r, 1, t), n.firstCreatePass && (n.firstCreatePass = !1), n.staticContentQueries && Im(n, e), n.staticViewQueries && Sc(2, n.viewQuery, t);
          const o = n.components;
          null !== o && function (n, e) {
            for (let t = 0; t < e.length; t++) aD(n, e[t])
          }(e, o)
        } catch (i) {
          throw n.firstCreatePass && (n.incompleteFirstPass = !0, n.firstCreatePass = !1), i
        } finally {
          e[2] &= -5, ns()
        }
      }

      function Wi(n, e, t, i) {
        const r = e[2];
        if (256 == (256 & r)) return;
        ts(e);
        const o = Jo();
        try {
          Wh(e),
            function (n) {
              N.lFrame.bindingIndex = n
            }(n.bindingStartIndex), null !== t && Fm(n, e, t, 2, i);
          const s = 3 == (3 & r);
          if (!o)
            if (s) {
              const c = n.preOrderCheckHooks;
              null !== c && rs(e, c, null)
            } else {
              const c = n.preOrderHooks;
              null !== c && os(e, c, 0, null), xl(e, 0)
            } if (function (n) {
              for (let e = Jl(n); null !== e; e = ec(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let i = 0; i < t.length; i++) {
                  const r = t[i],
                    o = r[3];
                  0 == (1024 & r[2]) && bl(o, 1), r[2] |= 1024
                }
              }
            }(e), function (n) {
              for (let e = Jl(n); null !== e; e = ec(e))
                for (let t = 10; t < e.length; t++) {
                  const i = e[t],
                    r = i[1];
                  vl(i) && Wi(r, i, r.template, i[8])
                }
            }(e), null !== n.contentQueries && Im(n, e), !o)
            if (s) {
              const c = n.contentCheckHooks;
              null !== c && rs(e, c)
            } else {
              const c = n.contentHooks;
              null !== c && os(e, c, 1), xl(e, 1)
            }!
          function (n, e) {
            const t = n.hostBindingOpCodes;
            if (null !== t) try {
              for (let i = 0; i < t.length; i++) {
                const r = t[i];
                if (r < 0) Nn(~r);
                else {
                  const o = r,
                    s = t[++i],
                    a = t[++i];
                  m1(s, o), a(2, e[o])
                }
              }
            } finally {
              Nn(-1)
            }
          }(n, e);
          const a = n.components;
          null !== a && function (n, e) {
            for (let t = 0; t < e.length; t++) sD(n, e[t])
          }(e, a);
          const l = n.viewQuery;
          if (null !== l && Sc(2, l, i), !o)
            if (s) {
              const c = n.viewCheckHooks;
              null !== c && rs(e, c)
            } else {
              const c = n.viewHooks;
              null !== c && os(e, c, 2), xl(e, 2)
            }! 0 === n.firstUpdatePass && (n.firstUpdatePass = !1), o || (e[2] &= -73), 1024 & e[2] && (e[2] &= -1025, bl(e[3], -1))
        } finally {
          ns()
        }
      }

      function Hw(n, e, t, i) {
        const r = e[10],
          o = !Jo(),
          s = Gh(e);
        try {
          o && !s && r.begin && r.begin(), s && no(n, e, i), Wi(n, e, t, i)
        } finally {
          o && !s && r.end && r.end()
        }
      }

      function Fm(n, e, t, i, r) {
        const o = it(),
          s = 2 & i;
        try {
          Nn(-1), s && e.length > 20 && wm(n, e, 20, Jo()), t(i, r)
        } finally {
          Nn(o)
        }
      }

      function Cc(n, e, t) {
        !qh() || (function (n, e, t, i) {
          const r = t.directiveStart,
            o = t.directiveEnd;
          n.firstCreatePass || Br(t, e), Qe(i, e);
          const s = t.initialInputs;
          for (let a = r; a < o; a++) {
            const l = n.data[a],
              c = Wt(l);
            c && tD(e, t, l);
            const u = jr(e, n, a, t);
            Qe(u, e), null !== s && nD(0, a - r, u, l, 0, s), c && (_t(t.index, e)[8] = u)
          }
        }(n, e, t, Rt(t, e)), 128 == (128 & t.flags) && function (n, e, t) {
          const i = t.directiveStart,
            r = t.directiveEnd,
            s = t.index,
            a = N.lFrame.currentDirectiveIndex;
          try {
            Nn(s);
            for (let l = i; l < r; l++) {
              const c = n.data[l],
                u = e[l];
              Dl(l), (null !== c.hostBindings || 0 !== c.hostVars || null !== c.hostAttrs) && $m(c, u)
            }
          } finally {
            Nn(-1), Dl(a)
          }
        }(n, e, t))
      }

      function wc(n, e, t = Rt) {
        const i = e.localNames;
        if (null !== i) {
          let r = e.index + 1;
          for (let o = 0; o < i.length; o += 2) {
            const s = i[o + 1],
              a = -1 === s ? t(e, n) : n[s];
            n[r++] = a
          }
        }
      }

      function Nm(n) {
        const e = n.tView;
        return null === e || e.incompleteFirstPass ? n.tView = ks(1, null, n.template, n.decls, n.vars, n.directiveDefs, n.pipeDefs, n.viewQuery, n.schemas, n.consts) : e
      }

      function ks(n, e, t, i, r, o, s, a, l, c) {
        const u = 20 + i,
          f = u + r,
          m = function (n, e) {
            const t = [];
            for (let i = 0; i < e; i++) t.push(i < n ? null : j);
            return t
          }(u, f),
          p = "function" == typeof c ? c() : c;
        return m[1] = {
          type: n,
          blueprint: m,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: m.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1
        }
      }

      function jm(n, e, t, i) {
        const r = Ym(e);
        null === t ? r.push(i) : (r.push(t), n.firstCreatePass && Qm(n).push(i, r.length - 1))
      }

      function Vm(n, e, t) {
        for (let i in n)
          if (n.hasOwnProperty(i)) {
            const r = n[i];
            (t = null === t ? {} : t).hasOwnProperty(i) ? t[i].push(e, r) : t[i] = [e, r]
          } return t
      }

      function bt(n, e, t, i, r, o, s, a) {
        const l = Rt(e, t);
        let u, c = e.inputs;
        !a && null != c && (u = c[i]) ? (Jm(n, t, u, i, r), Qo(e) && function (n, e) {
          const t = _t(e, n);
          16 & t[2] || (t[2] |= 64)
        }(t, e.index)) : 3 & e.type && (i = function (n) {
          return "class" === n ? "className" : "for" === n ? "htmlFor" : "formaction" === n ? "formAction" : "innerHtml" === n ? "innerHTML" : "readonly" === n ? "readOnly" : "tabindex" === n ? "tabIndex" : n
        }(i), r = null != s ? s(r, e.value || "", i) : r, Ee(o) ? o.setProperty(l, i, r) : kl(i) || (l.setProperty ? l.setProperty(i, r) : l[i] = r))
      }

      function Dc(n, e, t, i) {
        let r = !1;
        if (qh()) {
          const o = function (n, e, t) {
              const i = n.directiveRegistry;
              let r = null;
              if (i)
                for (let o = 0; o < i.length; o++) {
                  const s = i[o];
                  bm(t, s.selectors, !1) && (r || (r = []), us(Br(t, e), n, s.type), Wt(s) ? (Um(n, t), r.unshift(s)) : r.push(s))
                }
              return r
            }(n, e, t),
            s = null === i ? null : {
              "": -1
            };
          if (null !== o) {
            r = !0, Gm(t, n.data.length, o.length);
            for (let u = 0; u < o.length; u++) {
              const f = o[u];
              f.providersResolver && f.providersResolver(f)
            }
            let a = !1,
              l = !1,
              c = Gi(n, e, o.length, null);
            for (let u = 0; u < o.length; u++) {
              const f = o[u];
              t.mergedAttrs = as(t.mergedAttrs, f.hostAttrs), Wm(n, t, e, c, f), eD(c, f, s), null !== f.contentQueries && (t.flags |= 8), (null !== f.hostBindings || null !== f.hostAttrs || 0 !== f.hostVars) && (t.flags |= 128);
              const m = f.type.prototype;
              !a && (m.ngOnChanges || m.ngOnInit || m.ngDoCheck) && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t.index), a = !0), !l && (m.ngOnChanges || m.ngDoCheck) && ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t.index), l = !0), c++
            }! function (n, e) {
              const i = e.directiveEnd,
                r = n.data,
                o = e.attrs,
                s = [];
              let a = null,
                l = null;
              for (let c = e.directiveStart; c < i; c++) {
                const u = r[c],
                  f = u.inputs,
                  m = null === o || vm(e) ? null : iD(f, o);
                s.push(m), a = Vm(f, c, a), l = Vm(u.outputs, c, l)
              }
              null !== a && (a.hasOwnProperty("class") && (e.flags |= 16), a.hasOwnProperty("style") && (e.flags |= 32)), e.initialInputs = s, e.inputs = a, e.outputs = l
            }(n, t)
          }
          s && function (n, e, t) {
            if (e) {
              const i = n.localNames = [];
              for (let r = 0; r < e.length; r += 2) {
                const o = t[e[r + 1]];
                if (null == o) throw new ft("301", `Export of name '${e[r+1]}' not found!`);
                i.push(e[r], o)
              }
            }
          }(t, i, s)
        }
        return t.mergedAttrs = as(t.mergedAttrs, t.attrs), r
      }

      function zm(n, e, t, i, r, o) {
        const s = o.hostBindings;
        if (s) {
          let a = n.hostBindingOpCodes;
          null === a && (a = n.hostBindingOpCodes = []);
          const l = ~e.index;
          (function (n) {
            let e = n.length;
            for (; e > 0;) {
              const t = n[--e];
              if ("number" == typeof t && t < 0) return t
            }
            return 0
          })(a) != l && a.push(l), a.push(i, r, s)
        }
      }

      function $m(n, e) {
        null !== n.hostBindings && n.hostBindings(1, e)
      }

      function Um(n, e) {
        e.flags |= 2, (n.components || (n.components = [])).push(e.index)
      }

      function eD(n, e, t) {
        if (t) {
          if (e.exportAs)
            for (let i = 0; i < e.exportAs.length; i++) t[e.exportAs[i]] = n;
          Wt(e) && (t[""] = n)
        }
      }

      function Gm(n, e, t) {
        n.flags |= 1, n.directiveStart = e, n.directiveEnd = e + t, n.providerIndexes = e
      }

      function Wm(n, e, t, i, r) {
        n.data[i] = r;
        const o = r.factory || (r.factory = ii(r.type)),
          s = new Nr(o, Wt(r), null);
        n.blueprint[i] = s, t[i] = s, zm(n, e, 0, i, Gi(n, t, r.hostVars, j), r)
      }

      function tD(n, e, t) {
        const i = Rt(e, n),
          r = Nm(t),
          o = n[10],
          s = Ss(n, to(n, r, null, t.onPush ? 64 : 16, i, e, o, o.createRenderer(i, t), null, null));
        n[e.index] = s
      }

      function hn(n, e, t, i, r, o) {
        const s = Rt(n, e);
        ! function (n, e, t, i, r, o, s) {
          if (null == o) Ee(n) ? n.removeAttribute(e, r, t) : e.removeAttribute(r);
          else {
            const a = null == s ? B(o) : s(o, i || "", r);
            Ee(n) ? n.setAttribute(e, r, a, t) : t ? e.setAttributeNS(t, r, a) : e.setAttribute(r, a)
          }
        }(e[z], s, o, n.value, t, i, r)
      }

      function nD(n, e, t, i, r, o) {
        const s = o[e];
        if (null !== s) {
          const a = i.setInput;
          for (let l = 0; l < s.length;) {
            const c = s[l++],
              u = s[l++],
              f = s[l++];
            null !== a ? i.setInput(t, f, c, u) : t[u] = f
          }
        }
      }

      function iD(n, e) {
        let t = null,
          i = 0;
        for (; i < e.length;) {
          const r = e[i];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              n.hasOwnProperty(r) && (null === t && (t = []), t.push(r, n[r], e[i + 1])), i += 2
            } else i += 2;
          else i += 4
        }
        return t
      }

      function qm(n, e, t, i) {
        return new Array(n, !0, !1, e, null, 0, i, t, null, null)
      }

      function sD(n, e) {
        const t = _t(e, n);
        if (vl(t)) {
          const i = t[1];
          80 & t[2] ? Wi(i, t, i.template, t[8]) : t[5] > 0 && Ec(t)
        }
      }

      function Ec(n) {
        for (let i = Jl(n); null !== i; i = ec(i))
          for (let r = 10; r < i.length; r++) {
            const o = i[r];
            if (1024 & o[2]) {
              const s = o[1];
              Wi(s, o, s.template, o[8])
            } else o[5] > 0 && Ec(o)
          }
        const t = n[1].components;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const r = _t(t[i], n);
            vl(r) && r[5] > 0 && Ec(r)
          }
      }

      function aD(n, e) {
        const t = _t(e, n),
          i = t[1];
        (function (n, e) {
          for (let t = e.length; t < n.blueprint.length; t++) e.push(n.blueprint[t])
        })(i, t), no(i, t, t[8])
      }

      function Ss(n, e) {
        return n[13] ? n[14][4] = e : n[13] = e, n[14] = e, e
      }

      function xc(n) {
        for (; n;) {
          n[2] |= 64;
          const e = Jr(n);
          if (q0(n) && !e) return n;
          n = e
        }
        return null
      }

      function kc(n, e, t) {
        const i = e[10];
        i.begin && i.begin();
        try {
          Wi(n, e, n.template, t)
        } catch (r) {
          throw Xm(e, r), r
        } finally {
          i.end && i.end()
        }
      }

      function Km(n) {
        ! function (n) {
          for (let e = 0; e < n.components.length; e++) {
            const t = n.components[e],
              i = Kl(t),
              r = i[1];
            Hw(r, i, r.template, t)
          }
        }(n[8])
      }

      function Sc(n, e, t) {
        El(0), e(n, t)
      }
      const hD = (() => Promise.resolve(null))();

      function Ym(n) {
        return n[7] || (n[7] = [])
      }

      function Qm(n) {
        return n.cleanup || (n.cleanup = [])
      }

      function Zm(n, e, t) {
        return (null === n || Wt(n)) && (t = function (n) {
          for (; Array.isArray(n);) {
            if ("object" == typeof n[1]) return n;
            n = n[0]
          }
          return null
        }(t[e.index])), t[z]
      }

      function Xm(n, e) {
        const t = n[9],
          i = t ? t.get(Hi, null) : null;
        i && i.handleError(e)
      }

      function Jm(n, e, t, i, r) {
        for (let o = 0; o < t.length;) {
          const s = t[o++],
            a = t[o++],
            l = e[s],
            c = n.data[s];
          null !== c.setInput ? c.setInput(l, r, i, a) : l[a] = r
        }
      }

      function En(n, e, t) {
        const i = Xo(e, n);
        ! function (n, e, t) {
          Ee(n) ? n.setValue(e, t) : e.textContent = t
        }(n[z], i, t)
      }

      function Ps(n, e, t) {
        let i = t ? n.styles : null,
          r = t ? n.classes : null,
          o = 0;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const a = e[s];
            "number" == typeof a ? o = a : 1 == o ? r = rl(r, a) : 2 == o && (i = rl(i, a + ": " + e[++s] + ";"))
          }
        t ? n.styles = i : n.stylesWithoutHost = i, t ? n.classes = r : n.classesWithoutHost = r
      }
      const Pc = new P("INJECTOR", -1);
      class ep {
        get(e, t = Ur) {
          if (t === Ur) {
            const i = new Error(`NullInjectorError: No provider for ${Q(e)}!`);
            throw i.name = "NullInjectorError", i
          }
          return t
        }
      }
      const Oc = new P("Set Injector scope."),
        io = {},
        pD = {};
      let Ac;

      function tp() {
        return void 0 === Ac && (Ac = new ep), Ac
      }

      function np(n, e = null, t = null, i) {
        const r = ip(n, e, t, i);
        return r._resolveInjectorDefTypes(), r
      }

      function ip(n, e = null, t = null, i) {
        return new gD(n, t, e || tp(), i)
      }
      class gD {
        constructor(e, t, i, r = null) {
          this.parent = i, this.records = new Map, this.injectorDefTypes = new Set, this.onDestroy = new Set, this._destroyed = !1;
          const o = [];
          t && cn(t, a => this.processProvider(a, e, t)), cn([e], a => this.processInjectorType(a, [], o)), this.records.set(Pc, qi(void 0, this));
          const s = this.records.get(Oc);
          this.scope = null != s ? s.value : null, this.source = r || ("object" == typeof e ? null : Q(e))
        }
        get destroyed() {
          return this._destroyed
        }
        destroy() {
          this.assertNotDestroyed(), this._destroyed = !0;
          try {
            this.onDestroy.forEach(e => e.ngOnDestroy())
          } finally {
            this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear()
          }
        }
        get(e, t = Ur, i = V.Default) {
          this.assertNotDestroyed();
          const r = Mf(this),
            o = An(void 0);
          try {
            if (!(i & V.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l = ("function" == typeof (n = e) || "object" == typeof n && n instanceof P) && sl(e);
                a = l && this.injectableDefInScope(l) ? qi(Ic(e), io) : null, this.records.set(e, a)
              }
              if (null != a) return this.hydrate(e, a)
            }
            return (i & V.Self ? tp() : this.parent).get(e, t = i & V.Optional && t === Ur ? null : t)
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if ((s[ms] = s[ms] || []).unshift(Q(e)), r) throw s;
              return function (n, e, t, i) {
                const r = n[ms];
                throw e[Df] && r.unshift(e[Df]), n.message = function (n, e, t, i = null) {
                  n = n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1) ? n.substr(2) : n;
                  let r = Q(e);
                  if (Array.isArray(e)) r = e.map(Q).join(" -> ");
                  else if ("object" == typeof e) {
                    let o = [];
                    for (let s in e)
                      if (e.hasOwnProperty(s)) {
                        let a = e[s];
                        o.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : Q(a)))
                      } r = `{${o.join(", ")}}`
                  }
                  return `${t}${i?"("+i+")":""}[${r}]: ${n.replace(q1,"\n  ")}`
                }("\n" + n.message, r, t, i), n.ngTokenPath = r, n[ms] = null, n
              }(s, e, "R3InjectorError", this.source)
            }
            throw s
          } finally {
            An(o), Mf(r)
          }
          var n
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach(e => this.get(e))
        }
        toString() {
          const e = [];
          return this.records.forEach((i, r) => e.push(Q(r))), `R3Injector[${e.join(", ")}]`
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new Error("Injector has already been destroyed.")
        }
        processInjectorType(e, t, i) {
          if (!(e = H(e))) return !1;
          let r = Ph(e);
          const o = null == r && e.ngModule || void 0,
            s = void 0 === o ? e : o,
            a = -1 !== i.indexOf(s);
          if (void 0 !== o && (r = Ph(o)), null == r) return !1;
          if (null != r.imports && !a) {
            let u;
            i.push(s);
            try {
              cn(r.imports, f => {
                this.processInjectorType(f, t, i) && (void 0 === u && (u = []), u.push(f))
              })
            } finally {}
            if (void 0 !== u)
              for (let f = 0; f < u.length; f++) {
                const {
                  ngModule: m,
                  providers: p
                } = u[f];
                cn(p, _ => this.processProvider(_, m, p || se))
              }
          }
          this.injectorDefTypes.add(s);
          const l = ii(s) || (() => new s);
          this.records.set(s, qi(l, io));
          const c = r.providers;
          if (null != c && !a) {
            const u = e;
            cn(c, f => this.processProvider(f, u, c))
          }
          return void 0 !== o && void 0 !== e.providers
        }
        processProvider(e, t, i) {
          let r = Ki(e = H(e)) ? e : H(e && e.provide);
          const o = (n = e, op(n) ? qi(void 0, n.useValue) : qi(rp(n), io));
          var n;
          if (Ki(e) || !0 !== e.multi) this.records.get(r);
          else {
            let s = this.records.get(r);
            s || (s = qi(void 0, io, !0), s.factory = () => jl(s.multi), this.records.set(r, s)), r = e, s.multi.push(e)
          }
          this.records.set(r, o)
        }
        hydrate(e, t) {
          return t.value === io && (t.value = pD, t.value = t.factory()), "object" == typeof t.value && t.value && null !== (n = t.value) && "object" == typeof n && "function" == typeof n.ngOnDestroy && this.onDestroy.add(t.value), t.value;
          var n
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const t = H(e.providedIn);
          return "string" == typeof t ? "any" === t || t === this.scope : this.injectorDefTypes.has(t)
        }
      }

      function Ic(n) {
        const e = sl(n),
          t = null !== e ? e.factory : ii(n);
        if (null !== t) return t;
        if (n instanceof P) throw new Error(`Token ${Q(n)} is missing a \u0275prov definition.`);
        if (n instanceof Function) return function (n) {
          const e = n.length;
          if (e > 0) {
            const i = $r(e, "?");
            throw new Error(`Can't resolve all parameters for ${Q(n)}: (${i.join(", ")}).`)
          }
          const t = function (n) {
            const e = n && (n[Go] || n[Oh]);
            if (e) {
              const t = function (n) {
                if (n.hasOwnProperty("name")) return n.name;
                const e = ("" + n).match(/^function\s*([^\s(]+)/);
                return null === e ? "" : e[1]
              }(n);
              return console.warn(`DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`), e
            }
            return null
          }(n);
          return null !== t ? () => t.factory(n) : () => new n
        }(n);
        throw new Error("unreachable")
      }

      function rp(n, e, t) {
        let i;
        if (Ki(n)) {
          const r = H(n);
          return ii(r) || Ic(r)
        }
        if (op(n)) i = () => H(n.useValue);
        else if (function (n) {
            return !(!n || !n.useFactory)
          }(n)) i = () => n.useFactory(...jl(n.deps || []));
        else if (function (n) {
            return !(!n || !n.useExisting)
          }(n)) i = () => M(H(n.useExisting));
        else {
          const r = H(n && (n.useClass || n.provide));
          if (! function (n) {
              return !!n.deps
            }(n)) return ii(r) || Ic(r);
          i = () => new r(...jl(n.deps))
        }
        return i
      }

      function qi(n, e, t = !1) {
        return {
          factory: n,
          value: e,
          multi: t ? [] : void 0
        }
      }

      function op(n) {
        return null !== n && "object" == typeof n && Y1 in n
      }

      function Ki(n) {
        return "function" == typeof n
      }
      let Ze = (() => {
        class n {
          static create(t, i) {
            var r;
            if (Array.isArray(t)) return np({
              name: ""
            }, i, t, ""); {
              const o = null != (r = t.name) ? r : "";
              return np({
                name: o
              }, t.parent, t.providers, o)
            }
          }
        }
        return n.THROW_IF_NOT_FOUND = Ur, n.NULL = new ep, n.\u0275prov = I({
          token: n,
          providedIn: "any",
          factory: () => M(Pc)
        }), n.__NG_ELEMENT_ID__ = -1, n
      })();

      function AD(n, e) {
        is(Kl(n)[1], Be())
      }

      function ct(n) {
        let e = function (n) {
            return Object.getPrototypeOf(n.prototype).constructor
          }(n.type),
          t = !0;
        const i = [n];
        for (; e;) {
          let r;
          if (Wt(n)) r = e.\u0275cmp || e.\u0275dir;
          else {
            if (e.\u0275cmp) throw new Error("Directives cannot inherit Components");
            r = e.\u0275dir
          }
          if (r) {
            if (t) {
              i.push(r);
              const s = n;
              s.inputs = Nc(n.inputs), s.declaredInputs = Nc(n.declaredInputs), s.outputs = Nc(n.outputs);
              const a = r.hostBindings;
              a && ND(n, a);
              const l = r.viewQuery,
                c = r.contentQueries;
              if (l && FD(n, l), c && RD(n, c), il(n.inputs, r.inputs), il(n.declaredInputs, r.declaredInputs), il(n.outputs, r.outputs), Wt(r) && r.data.animation) {
                const u = n.data;
                u.animation = (u.animation || []).concat(r.data.animation)
              }
            }
            const o = r.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s];
                a && a.ngInherit && a(n), a === ct && (t = !1)
              }
          }
          e = Object.getPrototypeOf(e)
        }! function (n) {
          let e = 0,
            t = null;
          for (let i = n.length - 1; i >= 0; i--) {
            const r = n[i];
            r.hostVars = e += r.hostVars, r.hostAttrs = as(r.hostAttrs, t = as(t, r.hostAttrs))
          }
        }(i)
      }

      function Nc(n) {
        return n === Ci ? {} : n === se ? [] : n
      }

      function FD(n, e) {
        const t = n.viewQuery;
        n.viewQuery = t ? (i, r) => {
          e(i, r), t(i, r)
        } : e
      }

      function RD(n, e) {
        const t = n.contentQueries;
        n.contentQueries = t ? (i, r, o) => {
          e(i, r, o), t(i, r, o)
        } : e
      }

      function ND(n, e) {
        const t = n.hostBindings;
        n.hostBindings = t ? (i, r) => {
          e(i, r), t(i, r)
        } : e
      }
      let Os = null;

      function Yi() {
        if (!Os) {
          const n = ie.Symbol;
          if (n && n.iterator) Os = n.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const i = e[t];
              "entries" !== i && "size" !== i && Map.prototype[i] === Map.prototype.entries && (Os = i)
            }
          }
        }
        return Os
      }

      function ro(n) {
        return !!Lc(n) && (Array.isArray(n) || !(n instanceof Map) && Yi() in n)
      }

      function Lc(n) {
        return null !== n && ("function" == typeof n || "object" == typeof n)
      }

      function fn(n, e, t) {
        return n[e] = t
      }

      function Xe(n, e, t) {
        return !Object.is(n[e], t) && (n[e] = t, !0)
      }

      function Hn(n, e, t, i) {
        const r = E();
        return Xe(r, Si(), e) && (Z(), hn(xe(), r, n, e, t, i)), Hn
      }

      function mn(n, e, t, i, r, o, s, a) {
        const l = E(),
          c = Z(),
          u = n + 20,
          f = c.firstCreatePass ? function (n, e, t, i, r, o, s, a, l) {
            const c = e.consts,
              u = Ui(e, n, 4, s || null, Rn(c, a));
            Dc(e, t, u, Rn(c, l)), is(e, u);
            const f = u.tViews = ks(2, u, i, r, o, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c);
            return null !== e.queries && (e.queries.template(e, u), f.queries = e.queries.embeddedTView(u)), u
          }(u, c, l, e, t, i, r, o, s) : c.data[u];
        ln(f, !1);
        const m = l[z].createComment("");
        Ds(c, l, m, f), Qe(m, l), Ss(l, l[u] = qm(m, l, m, f)), Zo(f) && Cc(c, l, f), null != s && wc(l, f, a)
      }

      function w(n, e = V.Default) {
        const t = E();
        return null === t ? M(n, e) : ff(Be(), t, H(n), e)
      }

      function _e(n, e, t) {
        const i = E();
        return Xe(i, Si(), e) && bt(Z(), xe(), i, n, e, i[z], t, !1), _e
      }

      function zc(n, e, t, i, r) {
        const s = r ? "class" : "style";
        Jm(n, t, e.inputs[s], s, i)
      }

      function d(n, e, t, i) {
        const r = E(),
          o = Z(),
          s = 20 + n,
          a = r[z],
          l = r[s] = nc(a, e, N.lFrame.currentNamespace),
          c = o.firstCreatePass ? function (n, e, t, i, r, o, s) {
            const a = e.consts,
              c = Ui(e, n, 2, r, Rn(a, o));
            return Dc(e, t, c, Rn(a, s)), null !== c.attrs && Ps(c, c.attrs, !1), null !== c.mergedAttrs && Ps(c, c.mergedAttrs, !0), null !== e.queries && e.queries.elementStart(e, c), c
          }(s, o, r, 0, e, t, i) : o.data[s];
        ln(c, !0);
        const u = c.mergedAttrs;
        null !== u && ss(a, l, u);
        const f = c.classes;
        null !== f && lc(a, l, f);
        const m = c.styles;
        null !== m && gm(a, l, m), 64 != (64 & c.flags) && Ds(o, r, l, c), 0 === N.lFrame.elementDepthCount && Qe(l, r), N.lFrame.elementDepthCount++, Zo(c) && (Cc(o, r, c), function (n, e, t) {
          if (fl(e)) {
            const r = e.directiveEnd;
            for (let o = e.directiveStart; o < r; o++) {
              const s = n.data[o];
              s.contentQueries && s.contentQueries(1, t[o], o)
            }
          }
        }(o, c, r)), null !== i && wc(r, c)
      }

      function h() {
        let n = Be();
        Cl() ? wl() : (n = n.parent, ln(n, !1));
        const e = n;
        N.lFrame.elementDepthCount--;
        const t = Z();
        t.firstCreatePass && (is(t, n), fl(n) && t.queries.elementEnd(n)), null != e.classesWithoutHost && function (n) {
          return 0 != (16 & n.flags)
        }(e) && zc(t, e, E(), e.classesWithoutHost, !0), null != e.stylesWithoutHost && function (n) {
          return 0 != (32 & n.flags)
        }(e) && zc(t, e, E(), e.stylesWithoutHost, !1)
      }

      function y(n, e, t, i) {
        d(n, e, t, i), h()
      }

      function Fs() {
        return E()
      }

      function $c(n) {
        return !!n && "function" == typeof n.then
      }
      const fM = function (n) {
        return !!n && "function" == typeof n.subscribe
      };

      function Y(n, e, t, i) {
        const r = E(),
          o = Z(),
          s = Be();
        return zp(o, r, r[z], s, n, e, !!t, i), Y
      }

      function Uc(n, e) {
        const t = Be(),
          i = E(),
          r = Z();
        return zp(r, i, Zm(Ml(r.data), t, i), t, n, e, !1), Uc
      }

      function zp(n, e, t, i, r, o, s, a) {
        const l = Zo(i),
          u = n.firstCreatePass && Qm(n),
          f = e[8],
          m = Ym(e);
        let p = !0;
        if (3 & i.type || a) {
          const C = Rt(i, e),
            D = a ? a(C) : C,
            b = m.length,
            x = a ? O => a(Ae(O[i.index])) : i.index;
          if (Ee(t)) {
            let O = null;
            if (!a && l && (O = function (n, e, t, i) {
                const r = n.cleanup;
                if (null != r)
                  for (let o = 0; o < r.length - 1; o += 2) {
                    const s = r[o];
                    if (s === t && r[o + 1] === i) {
                      const a = e[7],
                        l = r[o + 2];
                      return a.length > l ? a[l] : null
                    }
                    "string" == typeof s && (o += 2)
                  }
                return null
              }(n, e, r, i.index)), null !== O)(O.__ngLastListenerFn__ || O).__ngNextListenerFn__ = o, O.__ngLastListenerFn__ = o, p = !1;
            else {
              o = Gc(i, e, f, o, !1);
              const G = t.listen(D, r, o);
              m.push(o, G), u && u.push(r, x, b, b + 1)
            }
          } else o = Gc(i, e, f, o, !0), D.addEventListener(r, o, s), m.push(o), u && u.push(r, x, b, s)
        } else o = Gc(i, e, f, o, !1);
        const _ = i.outputs;
        let v;
        if (p && null !== _ && (v = _[r])) {
          const C = v.length;
          if (C)
            for (let D = 0; D < C; D += 2) {
              const pe = e[v[D]][v[D + 1]].subscribe(o),
                De = m.length;
              m.push(o, pe), u && u.push(r, i.index, De, -(De + 1))
            }
        }
      }

      function $p(n, e, t, i) {
        try {
          return !1 !== t(i)
        } catch (r) {
          return Xm(n, r), !1
        }
      }

      function Gc(n, e, t, i, r) {
        return function o(s) {
          if (s === Function) return i;
          const a = 2 & n.flags ? _t(n.index, e) : e;
          0 == (32 & e[2]) && xc(a);
          let l = $p(e, 0, i, s),
            c = o.__ngNextListenerFn__;
          for (; c;) l = $p(e, 0, c, s) && l, c = c.__ngNextListenerFn__;
          return r && !1 === l && (s.preventDefault(), s.returnValue = !1), l
        }
      }

      function Qt(n = 1) {
        return function (n) {
          return (N.lFrame.contextLView = function (n, e) {
            for (; n > 0;) e = e[15], n--;
            return e
          }(n, N.lFrame.contextLView))[8]
        }(n)
      }

      function pM(n, e) {
        let t = null;
        const i = function (n) {
          const e = n.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1]
          }
          return null
        }(n);
        for (let r = 0; r < e.length; r++) {
          const o = e[r];
          if ("*" !== o) {
            if (null === i ? bm(n, o, !0) : Mw(i, o)) return r
          } else t = r
        }
        return t
      }

      function Rs(n) {
        const e = E()[16][6];
        if (!e.projection) {
          const i = e.projection = $r(n ? n.length : 1, null),
            r = i.slice();
          let o = e.child;
          for (; null !== o;) {
            const s = n ? pM(o, n) : 0;
            null !== s && (r[s] ? r[s].projectionNext = o : i[s] = o, r[s] = o), o = o.next
          }
        }
      }

      function Ns(n, e = 0, t) {
        const i = E(),
          r = Z(),
          o = Ui(r, 20 + n, 16, null, t || null);
        null === o.projection && (o.projection = e), wl(), 64 != (64 & o.flags) && function (n, e, t) {
          pm(e[z], 0, e, t, om(n, t, e), cm(t.parent || e[6], t, e))
        }(r, i, o)
      }

      function Jp(n, e, t, i, r) {
        const o = n[t + 1],
          s = null === e;
        let a = i ? Kt(o) : Mn(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s);) {
          const u = n[a + 1];
          yM(n[a], e) && (l = !0, n[a + 1] = i ? dc(u) : cc(u)), a = i ? Kt(u) : Mn(u)
        }
        l && (n[t + 1] = i ? cc(o) : dc(o))
      }

      function yM(n, e) {
        return null === n || null == e || (Array.isArray(n) ? n[1] : n) === e || !(!Array.isArray(n) || "string" != typeof e) && Li(n, e) >= 0
      }

      function Je(n, e) {
        return function (n, e, t, i) {
          const r = E(),
            o = Z(),
            s = function (n) {
              const e = N.lFrame,
                t = e.bindingIndex;
              return e.bindingIndex = e.bindingIndex + n, t
            }(2);
          o.firstUpdatePass && function (n, e, t, i) {
            const r = n.data;
            if (null === r[t + 1]) {
              const o = r[it()],
                s = function (n, e) {
                  return e >= n.expandoStartIndex
                }(n, t);
              (function (n, e) {
                return 0 != (n.flags & (e ? 16 : 32))
              })(o, i) && null === e && !s && (e = !1), e = function (n, e, t, i) {
                  const r = Ml(n);
                  let o = i ? e.residualClasses : e.residualStyles;
                  if (null === r) 0 === (i ? e.classBindings : e.styleBindings) && (t = so(t = qc(null, n, e, t, i), e.attrs, i), o = null);
                  else {
                    const s = e.directiveStylingLast;
                    if (-1 === s || n[s] !== r)
                      if (t = qc(r, n, e, t, i), null === o) {
                        let l = function (n, e, t) {
                          const i = t ? e.classBindings : e.styleBindings;
                          if (0 !== Mn(i)) return n[Kt(i)]
                        }(n, e, i);
                        void 0 !== l && Array.isArray(l) && (l = qc(null, n, e, l[1], i), l = so(l, e.attrs, i), function (n, e, t, i) {
                          n[Kt(t ? e.classBindings : e.styleBindings)] = i
                        }(n, e, i, l))
                      } else o = function (n, e, t) {
                        let i;
                        const r = e.directiveEnd;
                        for (let o = 1 + e.directiveStylingLast; o < r; o++) i = so(i, n[o].hostAttrs, t);
                        return so(i, e.attrs, t)
                      }(n, e, i)
                  }
                  return void 0 !== o && (i ? e.residualClasses = o : e.residualStyles = o), t
                }(r, o, e, i),
                function (n, e, t, i, r, o) {
                  let s = o ? e.classBindings : e.styleBindings,
                    a = Kt(s),
                    l = Mn(s);
                  n[i] = t;
                  let u, c = !1;
                  if (Array.isArray(t)) {
                    const f = t;
                    u = f[1], (null === u || Li(f, u) > 0) && (c = !0)
                  } else u = t;
                  if (r)
                    if (0 !== l) {
                      const m = Kt(n[a + 1]);
                      n[i + 1] = Es(m, a), 0 !== m && (n[m + 1] = uc(n[m + 1], i)), n[a + 1] = function (n, e) {
                        return 131071 & n | e << 17
                      }(n[a + 1], i)
                    } else n[i + 1] = Es(a, 0), 0 !== a && (n[a + 1] = uc(n[a + 1], i)), a = i;
                  else n[i + 1] = Es(l, 0), 0 === a ? a = i : n[l + 1] = uc(n[l + 1], i), l = i;
                  c && (n[i + 1] = cc(n[i + 1])), Jp(n, u, i, !0), Jp(n, u, i, !1),
                    function (n, e, t, i, r) {
                      const o = r ? n.residualClasses : n.residualStyles;
                      null != o && "string" == typeof e && Li(o, e) >= 0 && (t[i + 1] = dc(t[i + 1]))
                    }(e, u, n, i, o), s = Es(a, l), o ? e.classBindings = s : e.styleBindings = s
                }(r, o, e, t, s, i)
            }
          }(o, n, s, i), e !== j && Xe(r, s, e) && function (n, e, t, i, r, o, s, a) {
            if (!(3 & e.type)) return;
            const l = n.data,
              c = l[a + 1];
            Ls(function (n) {
              return 1 == (1 & n)
            }(c) ? dg(l, e, t, r, Mn(c), s) : void 0) || (Ls(o) || function (n) {
              return 2 == (2 & n)
            }(c) && (o = dg(l, null, t, r, a, s)), function (n, e, t, i, r) {
              const o = Ee(n);
              if (e) r ? o ? n.addClass(t, i) : t.classList.add(i) : o ? n.removeClass(t, i) : t.classList.remove(i);
              else {
                let s = -1 === i.indexOf("-") ? void 0 : vt.DashCase;
                if (null == r) o ? n.removeStyle(t, i, s) : t.style.removeProperty(i);
                else {
                  const a = "string" == typeof r && r.endsWith("!important");
                  a && (r = r.slice(0, -10), s |= vt.Important), o ? n.setStyle(t, i, r, s) : t.style.setProperty(i, r, a ? "important" : "")
                }
              }
            }(i, s, Xo(it(), t), r, o))
          }(o, o.data[it()], r, r[z], n, r[s + 1] = function (n, e) {
            return null == n || ("string" == typeof e ? n += e : "object" == typeof n && (n = Q(Bn(n)))), n
          }(e, t), i, s)
        }(n, e, null, !0), Je
      }

      function qc(n, e, t, i, r) {
        let o = null;
        const s = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (-1 === a ? a = t.directiveStart : a++; a < s && (o = e[a], i = so(i, o.hostAttrs, r), o !== n);) a++;
        return null !== n && (t.directiveStylingLast = a), i
      }

      function so(n, e, t) {
        const i = t ? 1 : 2;
        let r = -1;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const s = e[o];
            "number" == typeof s ? r = s : r === i && (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]), yt(n, s, !!t || e[++o]))
          }
        return void 0 === n ? null : n
      }

      function dg(n, e, t, i, r, o) {
        const s = null === e;
        let a;
        for (; r > 0;) {
          const l = n[r],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            f = null === u;
          let m = t[r + 1];
          m === j && (m = f ? se : void 0);
          let p = f ? Nl(m, i) : u === i ? m : void 0;
          if (c && !Ls(p) && (p = Nl(l, i)), Ls(p) && (a = p, s)) return a;
          const _ = n[r + 1];
          r = s ? Kt(_) : Mn(_)
        }
        if (null !== e) {
          let l = o ? e.residualClasses : e.residualStyles;
          null != l && (a = Nl(l, i))
        }
        return a
      }

      function Ls(n) {
        return void 0 !== n
      }

      function g(n, e = "") {
        const t = E(),
          i = Z(),
          r = n + 20,
          o = i.firstCreatePass ? Ui(i, r, 1, e, null) : i.data[r],
          s = t[r] = function (n, e) {
            return Ee(n) ? n.createText(e) : n.createTextNode(e)
          }(t[z], e);
        Ds(i, t, s, o), ln(o, !1)
      }

      function Bs(n) {
        return Kc("", n, ""), Bs
      }

      function Kc(n, e, t) {
        const i = E(),
          r = function (n, e, t, i) {
            return Xe(n, Si(), t) ? e + B(t) + i : j
          }(i, n, e, t);
        return r !== j && En(i, it(), r), Kc
      }

      function js(n, e, t) {
        const i = E();
        return Xe(i, Si(), e) && bt(Z(), xe(), i, n, e, i[z], t, !0), js
      }

      function Yc(n, e, t) {
        const i = E();
        if (Xe(i, Si(), e)) {
          const o = Z(),
            s = xe();
          bt(o, s, i, n, e, Zm(Ml(o.data), s, i), t, !0)
        }
        return Yc
      }
      const si = void 0;
      var JM = ["en", [
          ["a", "p"],
          ["AM", "PM"], si
        ],
        [
          ["AM", "PM"], si, si
        ],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        ], si, [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        ], si, [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"]
        ], 0, [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", si, "{1} 'at' {0}", si],
        [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr",
        function (n) {
          const t = Math.floor(Math.abs(n)),
            i = n.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === i ? 1 : 5
        }
      ];
      let ar = {};

      function Og(n) {
        return n in ar || (ar[n] = ie.ng && ie.ng.common && ie.ng.common.locales && ie.ng.common.locales[n]), ar[n]
      }
      var k = (() => ((k = k || {})[k.LocaleId = 0] = "LocaleId", k[k.DayPeriodsFormat = 1] = "DayPeriodsFormat", k[k.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", k[k.DaysFormat = 3] = "DaysFormat", k[k.DaysStandalone = 4] = "DaysStandalone", k[k.MonthsFormat = 5] = "MonthsFormat", k[k.MonthsStandalone = 6] = "MonthsStandalone", k[k.Eras = 7] = "Eras", k[k.FirstDayOfWeek = 8] = "FirstDayOfWeek", k[k.WeekendRange = 9] = "WeekendRange", k[k.DateFormat = 10] = "DateFormat", k[k.TimeFormat = 11] = "TimeFormat", k[k.DateTimeFormat = 12] = "DateTimeFormat", k[k.NumberSymbols = 13] = "NumberSymbols", k[k.NumberFormats = 14] = "NumberFormats", k[k.CurrencyCode = 15] = "CurrencyCode", k[k.CurrencySymbol = 16] = "CurrencySymbol", k[k.CurrencyName = 17] = "CurrencyName", k[k.Currencies = 18] = "Currencies", k[k.Directionality = 19] = "Directionality", k[k.PluralCase = 20] = "PluralCase", k[k.ExtraData = 21] = "ExtraData", k))();
      const Vs = "en-US";
      let Ag = Vs;

      function Xc(n, e, t, i, r) {
        if (n = H(n), Array.isArray(n))
          for (let o = 0; o < n.length; o++) Xc(n[o], e, t, i, r);
        else {
          const o = Z(),
            s = E();
          let a = Ki(n) ? n : H(n.provide),
            l = rp(n);
          const c = Be(),
            u = 1048575 & c.providerIndexes,
            f = c.directiveStart,
            m = c.providerIndexes >> 20;
          if (Ki(n) || !n.multi) {
            const p = new Nr(l, r, w),
              _ = eu(a, e, r ? u : u + m, f); - 1 === _ ? (us(Br(c, s), o, a), Jc(o, n, e.length), e.push(a), c.directiveStart++, c.directiveEnd++, r && (c.providerIndexes += 1048576), t.push(p), s.push(p)) : (t[_] = p, s[_] = p)
          } else {
            const p = eu(a, e, u + m, f),
              _ = eu(a, e, u, u + m),
              v = p >= 0 && t[p],
              C = _ >= 0 && t[_];
            if (r && !C || !r && !v) {
              us(Br(c, s), o, a);
              const D = function (n, e, t, i, r) {
                const o = new Nr(n, t, w);
                return o.multi = [], o.index = e, o.componentProviders = 0, n_(o, r, i && !t), o
              }(r ? ZE : QE, t.length, r, i, l);
              !r && C && (t[_].providerFactory = D), Jc(o, n, e.length, 0), e.push(a), c.directiveStart++, c.directiveEnd++, r && (c.providerIndexes += 1048576), t.push(D), s.push(D)
            } else Jc(o, n, p > -1 ? p : _, n_(t[r ? _ : p], l, !r && i));
            !r && i && C && t[_].componentProviders++
          }
        }
      }

      function Jc(n, e, t, i) {
        const r = Ki(e),
          o = function (n) {
            return !!n.useClass
          }(e);
        if (r || o) {
          const l = (o ? H(e.useClass) : e).prototype.ngOnDestroy;
          if (l) {
            const c = n.destroyHooks || (n.destroyHooks = []);
            if (!r && e.multi) {
              const u = c.indexOf(t); - 1 === u ? c.push(t, [i, l]) : c[u + 1].push(i, l)
            } else c.push(t, l)
          }
        }
      }

      function n_(n, e, t) {
        return t && n.componentProviders++, n.multi.push(e) - 1
      }

      function eu(n, e, t, i) {
        for (let r = t; r < i; r++)
          if (e[r] === n) return r;
        return -1
      }

      function QE(n, e, t, i) {
        return tu(this.multi, [])
      }

      function ZE(n, e, t, i) {
        const r = this.multi;
        let o;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = jr(t, t[1], this.providerFactory.index, i);
          o = a.slice(0, s), tu(r, o);
          for (let l = s; l < a.length; l++) o.push(a[l])
        } else o = [], tu(r, o);
        return o
      }

      function tu(n, e) {
        for (let t = 0; t < n.length; t++) e.push((0, n[t])());
        return e
      }

      function nu(n, e = []) {
        return t => {
          t.providersResolver = (i, r) => function (n, e, t) {
            const i = Z();
            if (i.firstCreatePass) {
              const r = Wt(n);
              Xc(t, i.data, i.blueprint, r, !0), Xc(e, i.data, i.blueprint, r, !1)
            }
          }(i, r ? r(n) : n, e)
        }
      }
      class i_ {}
      class tx {
        resolveComponentFactory(e) {
          throw function (n) {
            const e = Error(`No component factory found for ${Q(n)}. Did you add it to @NgModule.entryComponents?`);
            return e.ngComponent = n, e
          }(e)
        }
      }
      let zn = (() => {
        class n {}
        return n.NULL = new tx, n
      })();

      function nx() {
        return cr(Be(), E())
      }

      function cr(n, e) {
        return new de(Rt(n, e))
      }
      let de = (() => {
        class n {
          constructor(t) {
            this.nativeElement = t
          }
        }
        return n.__NG_ELEMENT_ID__ = nx, n
      })();

      function ix(n) {
        return n instanceof de ? n.nativeElement : n
      }
      class ho {}
      let o_ = (() => {
          class n {}
          return n.__NG_ELEMENT_ID__ = () => function () {
            const n = E(),
              t = _t(Be().index, n);
            return function (n) {
              return n[z]
            }(an(t) ? t : n)
          }(), n
        })(),
        sx = (() => {
          class n {}
          return n.\u0275prov = I({
            token: n,
            providedIn: "root",
            factory: () => null
          }), n
        })();
      class ur {
        constructor(e) {
          this.full = e, this.major = e.split(".")[0], this.minor = e.split(".")[1], this.patch = e.split(".").slice(2).join(".")
        }
      }
      const ax = new ur("13.0.3"),
        iu = {};

      function Gs(n, e, t, i, r = !1) {
        for (; null !== t;) {
          const o = e[t.index];
          if (null !== o && i.push(Ae(o)), Gt(o))
            for (let a = 10; a < o.length; a++) {
              const l = o[a],
                c = l[1].firstChild;
              null !== c && Gs(l[1], l, c, i)
            }
          const s = t.type;
          if (8 & s) Gs(n, e, t.child, i);
          else if (32 & s) {
            const a = Xl(t, e);
            let l;
            for (; l = a();) i.push(l)
          } else if (16 & s) {
            const a = fm(e, t);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = Jr(e[16]);
              Gs(l[1], l, a, i, !0)
            }
          }
          t = r ? t.projectionNext : t.next
        }
        return i
      }
      class fo {
        constructor(e, t) {
          this._lView = e, this._cdRefInjectingView = t, this._appRef = null, this._attachedToViewContainer = !1
        }
        get rootNodes() {
          const e = this._lView,
            t = e[1];
          return Gs(t, e, t.firstChild, [])
        }
        get context() {
          return this._lView[8]
        }
        set context(e) {
          this._lView[8] = e
        }
        get destroyed() {
          return 256 == (256 & this._lView[2])
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (Gt(e)) {
              const t = e[8],
                i = t ? t.indexOf(this) : -1;
              i > -1 && (ic(e, i), hs(t, i))
            }
            this._attachedToViewContainer = !1
          }
          rm(this._lView[1], this._lView)
        }
        onDestroy(e) {
          jm(this._lView[1], this._lView, null, e)
        }
        markForCheck() {
          xc(this._cdRefInjectingView || this._lView)
        }
        detach() {
          this._lView[2] &= -129
        }
        reattach() {
          this._lView[2] |= 128
        }
        detectChanges() {
          kc(this._lView[1], this._lView, this.context)
        }
        checkNoChanges() {
          ! function (n, e, t) {
            es(!0);
            try {
              kc(n, e, t)
            } finally {
              es(!1)
            }
          }(this._lView[1], this._lView, this.context)
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
          this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
          var e;
          this._appRef = null, eo(this._lView[1], e = this._lView, e[z], 2, null, null)
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer) throw new Error("This view is already attached to a ViewContainer!");
          this._appRef = e
        }
      }
      class lx extends fo {
        constructor(e) {
          super(e), this._view = e
        }
        detectChanges() {
          Km(this._view)
        }
        checkNoChanges() {
          ! function (n) {
            es(!0);
            try {
              Km(n)
            } finally {
              es(!1)
            }
          }(this._view)
        }
        get context() {
          return null
        }
      }
      class s_ extends zn {
        constructor(e) {
          super(), this.ngModule = e
        }
        resolveComponentFactory(e) {
          const t = Ke(e);
          return new ru(t, this.ngModule)
        }
      }

      function a_(n) {
        const e = [];
        for (let t in n) n.hasOwnProperty(t) && e.push({
          propName: n[t],
          templateName: t
        });
        return e
      }
      const ux = new P("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Yf
      });
      class ru extends i_ {
        constructor(e, t) {
          super(), this.componentDef = e, this.ngModule = t, this.componentType = e.type, this.selector = e.selectors.map(Ew).join(","), this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : [], this.isBoundToModule = !!t
        }
        get inputs() {
          return a_(this.componentDef.inputs)
        }
        get outputs() {
          return a_(this.componentDef.outputs)
        }
        create(e, t, i, r) {
          const o = (r = r || this.ngModule) ? function (n, e) {
              return {
                get: (t, i, r) => {
                  const o = n.get(t, iu, r);
                  return o !== iu || i === iu ? o : e.get(t, i, r)
                }
              }
            }(e, r.injector) : e,
            s = o.get(ho, Uh),
            a = o.get(sx, null),
            l = s.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            u = i ? function (n, e, t) {
              if (Ee(n)) return n.selectRootElement(e, t === $t.ShadowDom);
              let i = "string" == typeof e ? n.querySelector(e) : e;
              return i.textContent = "", i
            }(l, i, this.componentDef.encapsulation) : nc(s.createRenderer(null, this.componentDef), c, function (n) {
              const e = n.toLowerCase();
              return "svg" === e ? "http://www.w3.org/2000/svg" : "math" === e ? "http://www.w3.org/1998/MathML/" : null
            }(c)),
            f = this.componentDef.onPush ? 576 : 528,
            m = function (n, e) {
              return {
                components: [],
                scheduler: n || Yf,
                clean: hD,
                playerHandler: e || null,
                flags: 0
              }
            }(),
            p = ks(0, null, null, 1, 0, null, null, null, null, null),
            _ = to(null, p, m, f, null, null, s, l, a, o);
          let v, C;
          ts(_);
          try {
            const D = function (n, e, t, i, r, o) {
              const s = t[1];
              t[20] = n;
              const l = Ui(s, 20, 2, "#host", null),
                c = l.mergedAttrs = e.hostAttrs;
              null !== c && (Ps(l, c, !0), null !== n && (ss(r, n, c), null !== l.classes && lc(r, n, l.classes), null !== l.styles && gm(r, n, l.styles)));
              const u = i.createRenderer(n, e),
                f = to(t, Nm(e), null, e.onPush ? 64 : 16, t[20], l, i, u, o || null, null);
              return s.firstCreatePass && (us(Br(l, t), s, e.type), Um(s, l), Gm(l, t.length, 1)), Ss(t, f), t[20] = f
            }(u, this.componentDef, _, s, l);
            if (u)
              if (i) ss(l, u, ["ng-version", ax.full]);
              else {
                const {
                  attrs: b,
                  classes: x
                } = function (n) {
                  const e = [],
                    t = [];
                  let i = 1,
                    r = 2;
                  for (; i < n.length;) {
                    let o = n[i];
                    if ("string" == typeof o) 2 === r ? "" !== o && e.push(o, n[++i]) : 8 === r && t.push(o);
                    else {
                      if (!qt(r)) break;
                      r = o
                    }
                    i++
                  }
                  return {
                    attrs: e,
                    classes: t
                  }
                }(this.componentDef.selectors[0]);
                b && ss(l, u, b), x && x.length > 0 && lc(l, u, x.join(" "))
              } if (C = yl(p, 20), void 0 !== t) {
              const b = C.projection = [];
              for (let x = 0; x < this.ngContentSelectors.length; x++) {
                const O = t[x];
                b.push(null != O ? Array.from(O) : null)
              }
            }
            v = function (n, e, t, i, r) {
              const o = t[1],
                s = function (n, e, t) {
                  const i = Be();
                  n.firstCreatePass && (t.providersResolver && t.providersResolver(t), Wm(n, i, e, Gi(n, e, 1, null), t));
                  const r = jr(e, n, i.directiveStart, i);
                  Qe(r, e);
                  const o = Rt(i, e);
                  return o && Qe(o, e), r
                }(o, t, e);
              if (i.components.push(s), n[8] = s, r && r.forEach(l => l(s, e)), e.contentQueries) {
                const l = Be();
                e.contentQueries(1, s, l.directiveStart)
              }
              const a = Be();
              return !o.firstCreatePass || null === e.hostBindings && null === e.hostAttrs || (Nn(a.index), zm(t[1], a, 0, a.directiveStart, a.directiveEnd, e), $m(e, s)), s
            }(D, this.componentDef, _, m, [AD]), no(p, _, null)
          } finally {
            ns()
          }
          return new fx(this.componentType, v, cr(C, _), _, C)
        }
      }
      class fx extends class {} {
        constructor(e, t, i, r, o) {
          super(), this.location = i, this._rootLView = r, this._tNode = o, this.instance = t, this.hostView = this.changeDetectorRef = new lx(r), this.componentType = e
        }
        get injector() {
          return new Ai(this._tNode, this._rootLView)
        }
        destroy() {
          this.hostView.destroy()
        }
        onDestroy(e) {
          this.hostView.onDestroy(e)
        }
      }
      class dr {}
      const hr = new Map;
      class u_ extends dr {
        constructor(e, t) {
          super(), this._parent = t, this._bootstrapComponents = [], this.injector = this, this.destroyCbs = [], this.componentFactoryResolver = new s_(this);
          const i = At(e);
          this._bootstrapComponents = dn(i.bootstrap), this._r3Injector = ip(e, t, [{
            provide: dr,
            useValue: this
          }, {
            provide: zn,
            useValue: this.componentFactoryResolver
          }], Q(e)), this._r3Injector._resolveInjectorDefTypes(), this.instance = this.get(e)
        }
        get(e, t = Ze.THROW_IF_NOT_FOUND, i = V.Default) {
          return e === Ze || e === dr || e === Pc ? this : this._r3Injector.get(e, t, i)
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
        }
        onDestroy(e) {
          this.destroyCbs.push(e)
        }
      }
      class ou extends class {} {
        constructor(e) {
          super(), this.moduleType = e, null !== At(e) && function (n) {
            const e = new Set;
            ! function t(i) {
              const r = At(i, !0),
                o = r.id;
              null !== o && (function (n, e, t) {
                if (e && e !== t) throw new Error(`Duplicate module registered for ${n} - ${Q(e)} vs ${Q(e.name)}`)
              }(o, hr.get(o), i), hr.set(o, i));
              const s = dn(r.imports);
              for (const a of s) e.has(a) || (e.add(a), t(a))
            }(n)
          }(e)
        }
        create(e) {
          return new u_(this.moduleType, e)
        }
      }

      function su(n, e, t, i) {
        return function (n, e, t, i, r, o) {
          const s = e + t;
          return Xe(n, s, r) ? fn(n, s + 1, o ? i.call(o, r) : i(r)) : mo(n, s + 1)
        }(E(), nt(), n, e, t, i)
      }

      function d_(n, e, t, i, r) {
        return function (n, e, t, i, r, o, s) {
          const a = e + t;
          return function (n, e, t, i) {
            const r = Xe(n, e, t);
            return Xe(n, e + 1, i) || r
          }(n, a, r, o) ? fn(n, a + 2, s ? i.call(s, r, o) : i(r, o)) : mo(n, a + 2)
        }(E(), nt(), n, e, t, i, r)
      }

      function mo(n, e) {
        const t = n[e];
        return t === j ? void 0 : t
      }

      function au(n) {
        return e => {
          setTimeout(n, void 0, e)
        }
      }
      const he = class extends re {
        constructor(e = !1) {
          super(), this.__isAsync = e
        }
        emit(e) {
          super.next(e)
        }
        subscribe(e, t, i) {
          var l, c, u;
          let r = e,
            o = t || (() => null),
            s = i;
          if (e && "object" == typeof e) {
            const f = e;
            r = null == (l = f.next) ? void 0 : l.bind(f), o = null == (c = f.error) ? void 0 : c.bind(f), s = null == (u = f.complete) ? void 0 : u.bind(f)
          }
          this.__isAsync && (o = au(o), r && (r = au(r)), s && (s = au(s)));
          const a = super.subscribe({
            next: r,
            error: o,
            complete: s
          });
          return e instanceof Se && e.add(a), a
        }
      };

      function Ix() {
        return this._results[Yi()]()
      }
      class fr {
        constructor(e = !1) {
          this._emitDistinctChangesOnly = e, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = null, this.length = 0, this.first = void 0, this.last = void 0;
          const t = Yi(),
            i = fr.prototype;
          i[t] || (i[t] = Ix)
        }
        get changes() {
          return this._changes || (this._changes = new he)
        }
        get(e) {
          return this._results[e]
        }
        map(e) {
          return this._results.map(e)
        }
        filter(e) {
          return this._results.filter(e)
        }
        find(e) {
          return this._results.find(e)
        }
        reduce(e, t) {
          return this._results.reduce(e, t)
        }
        forEach(e) {
          this._results.forEach(e)
        }
        some(e) {
          return this._results.some(e)
        }
        toArray() {
          return this._results.slice()
        }
        toString() {
          return this._results.toString()
        }
        reset(e, t) {
          const i = this;
          i.dirty = !1;
          const r = Nt(e);
          (this._changesDetected = ! function (n, e, t) {
            if (n.length !== e.length) return !1;
            for (let i = 0; i < n.length; i++) {
              let r = n[i],
                o = e[i];
              if (t && (r = t(r), o = t(o)), o !== r) return !1
            }
            return !0
          }(i._results, r, t)) && (i._results = r, i.length = r.length, i.last = r[this.length - 1], i.first = r[0])
        }
        notifyOnChanges() {
          this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
        }
        setDirty() {
          this.dirty = !0
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe()
        }
      }
      Symbol;
      let Bt = (() => {
        class n {}
        return n.__NG_ELEMENT_ID__ = Nx, n
      })();
      const Fx = Bt,
        Rx = class extends Fx {
          constructor(e, t, i) {
            super(), this._declarationLView = e, this._declarationTContainer = t, this.elementRef = i
          }
          createEmbeddedView(e) {
            const t = this._declarationTContainer.tViews,
              i = to(this._declarationLView, t, e, 16, null, t.declTNode, null, null, null, null);
            i[17] = this._declarationLView[this._declarationTContainer.index];
            const o = this._declarationLView[19];
            return null !== o && (i[19] = o.createEmbeddedView(t)), no(t, i, e), new fo(i)
          }
        };

      function Nx() {
        return Ws(Be(), E())
      }

      function Ws(n, e) {
        return 4 & n.type ? new Rx(e, n, cr(n, e)) : null
      }
      let Ct = (() => {
        class n {}
        return n.__NG_ELEMENT_ID__ = Lx, n
      })();

      function Lx() {
        return v_(Be(), E())
      }
      const Bx = Ct,
        __ = class extends Bx {
          constructor(e, t, i) {
            super(), this._lContainer = e, this._hostTNode = t, this._hostLView = i
          }
          get element() {
            return cr(this._hostTNode, this._hostLView)
          }
          get injector() {
            return new Ai(this._hostTNode, this._hostLView)
          }
          get parentInjector() {
            const e = cs(this._hostTNode, this._hostLView);
            if (lf(e)) {
              const t = Oi(e, this._hostLView),
                i = Pi(e);
              return new Ai(t[1].data[i + 8], t)
            }
            return new Ai(null, this._hostLView)
          }
          clear() {
            for (; this.length > 0;) this.remove(this.length - 1)
          }
          get(e) {
            const t = y_(this._lContainer);
            return null !== t && t[e] || null
          }
          get length() {
            return this._lContainer.length - 10
          }
          createEmbeddedView(e, t, i) {
            const r = e.createEmbeddedView(t || {});
            return this.insert(r, i), r
          }
          createComponent(e, t, i, r, o) {
            const s = e && !("function" == typeof e);
            let a;
            if (s) a = t;
            else {
              const f = t || {};
              a = f.index, i = f.injector, r = f.projectableNodes, o = f.ngModuleRef
            }
            const l = s ? e : new ru(Ke(e)),
              c = i || this.parentInjector;
            if (!o && null == l.ngModule && c) {
              const f = c.get(dr, null);
              f && (o = f)
            }
            const u = l.create(c, r, void 0, o);
            return this.insert(u.hostView, a), u
          }
          insert(e, t) {
            const i = e._lView,
              r = i[1];
            if (Gt(i[3])) {
              const u = this.indexOf(e);
              if (-1 !== u) this.detach(u);
              else {
                const f = i[3],
                  m = new __(f, f[6], f[3]);
                m.detach(m.indexOf(e))
              }
            }
            const o = this._adjustIndex(t),
              s = this._lContainer;
            ! function (n, e, t, i) {
              const r = 10 + i,
                o = t.length;
              i > 0 && (t[r - 1][4] = e), i < o - 10 ? (e[4] = t[r], yf(t, 10 + i, e)) : (t.push(e), e[4] = null), e[3] = t;
              const s = e[17];
              null !== s && t !== s && function (n, e) {
                const t = n[9];
                e[16] !== e[3][3][16] && (n[2] = !0), null === t ? n[9] = [e] : t.push(e)
              }(s, e);
              const a = e[19];
              null !== a && a.insertView(n), e[2] |= 128
            }(r, i, s, o);
            const a = sc(o, s),
              l = i[z],
              c = ws(l, s[7]);
            return null !== c && function (n, e, t, i, r, o) {
              i[0] = r, i[6] = e, eo(n, i, t, 1, r, o)
            }(r, s[6], l, i, c, a), e.attachToViewContainerRef(), yf(lu(s), o, e), e
          }
          move(e, t) {
            return this.insert(e, t)
          }
          indexOf(e) {
            const t = y_(this._lContainer);
            return null !== t ? t.indexOf(e) : -1
          }
          remove(e) {
            const t = this._adjustIndex(e, -1),
              i = ic(this._lContainer, t);
            i && (hs(lu(this._lContainer), t), rm(i[1], i))
          }
          detach(e) {
            const t = this._adjustIndex(e, -1),
              i = ic(this._lContainer, t);
            return i && null != hs(lu(this._lContainer), t) ? new fo(i) : null
          }
          _adjustIndex(e, t = 0) {
            return null == e ? this.length + t : e
          }
        };

      function y_(n) {
        return n[8]
      }

      function lu(n) {
        return n[8] || (n[8] = [])
      }

      function v_(n, e) {
        let t;
        const i = e[n.index];
        if (Gt(i)) t = i;
        else {
          let r;
          if (8 & n.type) r = Ae(i);
          else {
            const o = e[z];
            r = o.createComment("");
            const s = Rt(n, e);
            ri(o, ws(o, s), r, function (n, e) {
              return Ee(n) ? n.nextSibling(e) : e.nextSibling
            }(o, s), !1)
          }
          e[n.index] = t = qm(i, e, r, n), Ss(e, t)
        }
        return new __(t, n, e)
      }
      class cu {
        constructor(e) {
          this.queryList = e, this.matches = null
        }
        clone() {
          return new cu(this.queryList)
        }
        setDirty() {
          this.queryList.setDirty()
        }
      }
      class uu {
        constructor(e = []) {
          this.queries = e
        }
        createEmbeddedView(e) {
          const t = e.queries;
          if (null !== t) {
            const i = null !== e.contentQueries ? e.contentQueries[0] : t.length,
              r = [];
            for (let o = 0; o < i; o++) {
              const s = t.getByIndex(o);
              r.push(this.queries[s.indexInDeclarationView].clone())
            }
            return new uu(r)
          }
          return null
        }
        insertView(e) {
          this.dirtyQueriesWithMatches(e)
        }
        detachView(e) {
          this.dirtyQueriesWithMatches(e)
        }
        dirtyQueriesWithMatches(e) {
          for (let t = 0; t < this.queries.length; t++) null !== M_(e, t).matches && this.queries[t].setDirty()
        }
      }
      class b_ {
        constructor(e, t, i = null) {
          this.predicate = e, this.flags = t, this.read = i
        }
      }
      class du {
        constructor(e = []) {
          this.queries = e
        }
        elementStart(e, t) {
          for (let i = 0; i < this.queries.length; i++) this.queries[i].elementStart(e, t)
        }
        elementEnd(e) {
          for (let t = 0; t < this.queries.length; t++) this.queries[t].elementEnd(e)
        }
        embeddedTView(e) {
          let t = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== t ? t.length : 0,
              o = this.getByIndex(i).embeddedTView(e, r);
            o && (o.indexInDeclarationView = i, null !== t ? t.push(o) : t = [o])
          }
          return null !== t ? new du(t) : null
        }
        template(e, t) {
          for (let i = 0; i < this.queries.length; i++) this.queries[i].template(e, t)
        }
        getByIndex(e) {
          return this.queries[e]
        }
        get length() {
          return this.queries.length
        }
        track(e) {
          this.queries.push(e)
        }
      }
      class hu {
        constructor(e, t = -1) {
          this.metadata = e, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = t
        }
        elementStart(e, t) {
          this.isApplyingToNode(t) && this.matchTNode(e, t)
        }
        elementEnd(e) {
          this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1)
        }
        template(e, t) {
          this.elementStart(e, t)
        }
        embeddedTView(e, t) {
          return this.isApplyingToNode(e) ? (this.crossesNgTemplate = !0, this.addMatch(-e.index, t), new hu(this.metadata)) : null
        }
        isApplyingToNode(e) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let i = e.parent;
            for (; null !== i && 8 & i.type && i.index !== t;) i = i.parent;
            return t === (null !== i ? i.index : -1)
          }
          return this._appliesToNextNode
        }
        matchTNode(e, t) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const o = i[r];
              this.matchTNodeWithReadOption(e, t, Hx(t, o)), this.matchTNodeWithReadOption(e, t, ds(t, e, o, !1, !1))
            } else i === Bt ? 4 & t.type && this.matchTNodeWithReadOption(e, t, -1) : this.matchTNodeWithReadOption(e, t, ds(t, e, i, !1, !1))
        }
        matchTNodeWithReadOption(e, t, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === de || r === Ct || r === Bt && 4 & t.type) this.addMatch(t.index, -2);
              else {
                const o = ds(t, e, r, !1, !1);
                null !== o && this.addMatch(t.index, o)
              }
            else this.addMatch(t.index, i)
          }
        }
        addMatch(e, t) {
          null === this.matches ? this.matches = [e, t] : this.matches.push(e, t)
        }
      }

      function Hx(n, e) {
        const t = n.localNames;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2)
            if (t[i] === e) return t[i + 1];
        return null
      }

      function $x(n, e, t, i) {
        return -1 === t ? function (n, e) {
          return 11 & n.type ? cr(n, e) : 4 & n.type ? Ws(n, e) : null
        }(e, n) : -2 === t ? function (n, e, t) {
          return t === de ? cr(e, n) : t === Bt ? Ws(e, n) : t === Ct ? v_(e, n) : void 0
        }(n, e, i) : jr(n, n[1], t, e)
      }

      function C_(n, e, t, i) {
        const r = e[19].queries[i];
        if (null === r.matches) {
          const o = n.data,
            s = t.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : $x(e, o[c], s[l + 1], t.metadata.read))
          }
          r.matches = a
        }
        return r.matches
      }

      function fu(n, e, t, i) {
        const r = n.queries.getByIndex(t),
          o = r.matches;
        if (null !== o) {
          const s = C_(n, e, r, t);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) i.push(s[a / 2]);
            else {
              const c = o[a + 1],
                u = e[-l];
              for (let f = 10; f < u.length; f++) {
                const m = u[f];
                m[17] === m[3] && fu(m[1], m, c, i)
              }
              if (null !== u[9]) {
                const f = u[9];
                for (let m = 0; m < f.length; m++) {
                  const p = f[m];
                  fu(p[1], p, c, i)
                }
              }
            }
          }
        }
        return i
      }

      function Ue(n) {
        const e = E(),
          t = Z(),
          i = Zh();
        El(i + 1);
        const r = M_(t, i);
        if (n.dirty && Gh(e) === (2 == (2 & r.metadata.flags))) {
          if (null === r.matches) n.reset([]);
          else {
            const o = r.crossesNgTemplate ? fu(t, e, i, []) : C_(t, e, r, i);
            n.reset(o, ix), n.notifyOnChanges()
          }
          return !0
        }
        return !1
      }

      function ut(n, e, t) {
        const i = Z();
        i.firstCreatePass && (D_(i, new b_(n, e, t), -1), 2 == (2 & e) && (i.staticViewQueries = !0)), w_(i, E(), e)
      }

      function go(n, e, t, i) {
        const r = Z();
        if (r.firstCreatePass) {
          const o = Be();
          D_(r, new b_(e, t, i), o.index),
            function (n, e) {
              const t = n.contentQueries || (n.contentQueries = []);
              e !== (t.length ? t[t.length - 1] : -1) && t.push(n.queries.length - 1, e)
            }(r, n), 2 == (2 & t) && (r.staticContentQueries = !0)
        }
        w_(r, E(), t)
      }

      function Ge() {
        return n = E(), e = Zh(), n[19].queries[e].queryList;
        var n, e
      }

      function w_(n, e, t) {
        const i = new fr(4 == (4 & t));
        jm(n, e, i, i.destroy), null === e[19] && (e[19] = new uu), e[19].queries.push(new cu(i))
      }

      function D_(n, e, t) {
        null === n.queries && (n.queries = new du), n.queries.track(new hu(e, t))
      }

      function M_(n, e) {
        return n.queries.getByIndex(e)
      }

      function Ys(...n) {}
      const vu = new P("Application Initializer");
      let pr = (() => {
        class n {
          constructor(t) {
            this.appInits = t, this.resolve = Ys, this.reject = Ys, this.initialized = !1, this.done = !1, this.donePromise = new Promise((i, r) => {
              this.resolve = i, this.reject = r
            })
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              i = () => {
                this.done = !0, this.resolve()
              };
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const o = this.appInits[r]();
                if ($c(o)) t.push(o);
                else if (fM(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({
                      complete: a,
                      error: l
                    })
                  });
                  t.push(s)
                }
              }
            Promise.all(t).then(() => {
              i()
            }).catch(r => {
              this.reject(r)
            }), 0 === t.length && i(), this.initialized = !0
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(vu, 8))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      const yo = new P("AppId"),
        hT = {
          provide: yo,
          useFactory: function () {
            return `${bu()}${bu()}${bu()}`
          },
          deps: []
        };

      function bu() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()))
      }
      const z_ = new P("Platform Initializer"),
        Qs = new P("Platform ID"),
        fT = new P("appBootstrapListener");
      let mT = (() => {
        class n {
          log(t) {
            console.log(t)
          }
          warn(t) {
            console.warn(t)
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      const xn = new P("LocaleId"),
        $_ = new P("DefaultCurrencyCode");
      class pT {
        constructor(e, t) {
          this.ngModuleFactory = e, this.componentFactories = t
        }
      }
      let U_ = (() => {
        class n {
          compileModuleSync(t) {
            return new ou(t)
          }
          compileModuleAsync(t) {
            return Promise.resolve(this.compileModuleSync(t))
          }
          compileModuleAndAllComponentsSync(t) {
            const i = this.compileModuleSync(t),
              o = dn(At(t).declarations).reduce((s, a) => {
                const l = Ke(a);
                return l && s.push(new ru(l)), s
              }, []);
            return new pT(i, o)
          }
          compileModuleAndAllComponentsAsync(t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t))
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return n.\u0275fac = function (t) {
          return new(t || n)
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      const _T = (() => Promise.resolve(0))();

      function Cu(n) {
        "undefined" == typeof Zone ? _T.then(() => {
          n && n.apply(null, null)
        }) : Zone.current.scheduleMicroTask("scheduleMicrotask", n)
      }
      class J {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: i = !1
        }) {
          if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new he(!1), this.onMicrotaskEmpty = new he(!1), this.onStable = new he(!1), this.onError = new he(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const r = this;
          r._nesting = 0, r._outer = r._inner = Zone.current, Zone.TaskTrackingZoneSpec && (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec)), e && Zone.longStackTraceZoneSpec && (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)), r.shouldCoalesceEventChangeDetection = !i && t, r.shouldCoalesceRunChangeDetection = i, r.lastRequestAnimationFrameId = -1, r.nativeRequestAnimationFrame = function () {
              let n = ie.requestAnimationFrame,
                e = ie.cancelAnimationFrame;
              if ("undefined" != typeof Zone && n && e) {
                const t = n[Zone.__symbol__("OriginalDelegate")];
                t && (n = t);
                const i = e[Zone.__symbol__("OriginalDelegate")];
                i && (e = i)
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: e
              }
            }().nativeRequestAnimationFrame,
            function (n) {
              const e = () => {
                ! function (n) {
                  n.isCheckStableRunning || -1 !== n.lastRequestAnimationFrameId || (n.lastRequestAnimationFrameId = n.nativeRequestAnimationFrame.call(ie, () => {
                    n.fakeTopEventTask || (n.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                      n.lastRequestAnimationFrameId = -1, Du(n), n.isCheckStableRunning = !0, wu(n), n.isCheckStableRunning = !1
                    }, void 0, () => {}, () => {})), n.fakeTopEventTask.invoke()
                  }), Du(n))
                }(n)
              };
              n._inner = n._inner.fork({
                name: "angular",
                properties: {
                  isAngularZone: !0
                },
                onInvokeTask: (t, i, r, o, s, a) => {
                  try {
                    return G_(n), t.invokeTask(r, o, s, a)
                  } finally {
                    (n.shouldCoalesceEventChangeDetection && "eventTask" === o.type || n.shouldCoalesceRunChangeDetection) && e(), W_(n)
                  }
                },
                onInvoke: (t, i, r, o, s, a, l) => {
                  try {
                    return G_(n), t.invoke(r, o, s, a, l)
                  } finally {
                    n.shouldCoalesceRunChangeDetection && e(), W_(n)
                  }
                },
                onHasTask: (t, i, r, o) => {
                  t.hasTask(r, o), i === r && ("microTask" == o.change ? (n._hasPendingMicrotasks = o.microTask, Du(n), wu(n)) : "macroTask" == o.change && (n.hasPendingMacrotasks = o.macroTask))
                },
                onHandleError: (t, i, r, o) => (t.handleError(r, o), n.runOutsideAngular(() => n.onError.emit(o)), !1)
              })
            }(r)
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone")
        }
        static assertInAngularZone() {
          if (!J.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!")
        }
        static assertNotInAngularZone() {
          if (J.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!")
        }
        run(e, t, i) {
          return this._inner.run(e, t, i)
        }
        runTask(e, t, i, r) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + r, e, vT, Ys, Ys);
          try {
            return o.runTask(s, t, i)
          } finally {
            o.cancelTask(s)
          }
        }
        runGuarded(e, t, i) {
          return this._inner.runGuarded(e, t, i)
        }
        runOutsideAngular(e) {
          return this._outer.run(e)
        }
      }
      const vT = {};

      function wu(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable) try {
          n._nesting++, n.onMicrotaskEmpty.emit(null)
        } finally {
          if (n._nesting--, !n.hasPendingMicrotasks) try {
            n.runOutsideAngular(() => n.onStable.emit(null))
          } finally {
            n.isStable = !0
          }
        }
      }

      function Du(n) {
        n.hasPendingMicrotasks = !!(n._hasPendingMicrotasks || (n.shouldCoalesceEventChangeDetection || n.shouldCoalesceRunChangeDetection) && -1 !== n.lastRequestAnimationFrameId)
      }

      function G_(n) {
        n._nesting++, n.isStable && (n.isStable = !1, n.onUnstable.emit(null))
      }

      function W_(n) {
        n._nesting--, wu(n)
      }
      class wT {
        constructor() {
          this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new he, this.onMicrotaskEmpty = new he, this.onStable = new he, this.onError = new he
        }
        run(e, t, i) {
          return e.apply(t, i)
        }
        runGuarded(e, t, i) {
          return e.apply(t, i)
        }
        runOutsideAngular(e) {
          return e()
        }
        runTask(e, t, i, r) {
          return e.apply(t, i)
        }
      }
      let Mu = (() => {
          class n {
            constructor(t) {
              this._ngZone = t, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), t.run(() => {
                this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
              })
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  this._didWork = !0, this._isZoneStable = !1
                }
              }), this._ngZone.runOutsideAngular(() => {
                this._ngZone.onStable.subscribe({
                  next: () => {
                    J.assertNotInAngularZone(), Cu(() => {
                      this._isZoneStable = !0, this._runCallbacksIfReady()
                    })
                  }
                })
              })
            }
            increasePendingRequestCount() {
              return this._pendingCount += 1, this._didWork = !0, this._pendingCount
            }
            decreasePendingRequestCount() {
              if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable() {
              return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
            }
            _runCallbacksIfReady() {
              if (this.isStable()) Cu(() => {
                for (; 0 !== this._callbacks.length;) {
                  let t = this._callbacks.pop();
                  clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                }
                this._didWork = !1
              });
              else {
                let t = this.getPendingTasks();
                this._callbacks = this._callbacks.filter(i => !i.updateCb || !i.updateCb(t) || (clearTimeout(i.timeoutId), !1)), this._didWork = !0
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                source: t.source,
                creationLocation: t.creationLocation,
                data: t.data
              })) : []
            }
            addCallback(t, i, r) {
              let o = -1;
              i && i > 0 && (o = setTimeout(() => {
                this._callbacks = this._callbacks.filter(s => s.timeoutId !== o), t(this._didWork, this.getPendingTasks())
              }, i)), this._callbacks.push({
                doneCb: t,
                timeoutId: o,
                updateCb: r
              })
            }
            whenStable(t, i, r) {
              if (r && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
              this.addCallback(t, i, r), this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
              return this._pendingCount
            }
            findProviders(t, i, r) {
              return []
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(J))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac
          }), n
        })(),
        q_ = (() => {
          class n {
            constructor() {
              this._applications = new Map, Eu.addToWindow(this)
            }
            registerApplication(t, i) {
              this._applications.set(t, i)
            }
            unregisterApplication(t) {
              this._applications.delete(t)
            }
            unregisterAllApplications() {
              this._applications.clear()
            }
            getTestability(t) {
              return this._applications.get(t) || null
            }
            getAllTestabilities() {
              return Array.from(this._applications.values())
            }
            getAllRootElements() {
              return Array.from(this._applications.keys())
            }
            findTestabilityInTree(t, i = !0) {
              return Eu.findTestabilityInTree(this, t, i)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac
          }), n
        })();
      class DT {
        addToWindow(e) {}
        findTestabilityInTree(e, t, i) {
          return null
        }
      }
      let Jt, Eu = new DT;
      const K_ = new P("AllowMultipleToken");

      function Y_(n, e, t = []) {
        const i = `Platform: ${e}`,
          r = new P(i);
        return (o = []) => {
          let s = Q_();
          if (!s || s.injector.get(K_, !1))
            if (n) n(t.concat(o).concat({
              provide: r,
              useValue: !0
            }));
            else {
              const a = t.concat(o).concat({
                provide: r,
                useValue: !0
              }, {
                provide: Oc,
                useValue: "platform"
              });
              ! function (n) {
                if (Jt && !Jt.destroyed && !Jt.injector.get(K_, !1)) throw new ft("400", "");
                Jt = n.get(Z_);
                const e = n.get(z_, null);
                e && e.forEach(t => t())
              }(Ze.create({
                providers: a,
                name: i
              }))
            } return function (n) {
            const e = Q_();
            if (!e) throw new ft("401", "");
            return e
          }()
        }
      }

      function Q_() {
        return Jt && !Jt.destroyed ? Jt : null
      }
      let Z_ = (() => {
        class n {
          constructor(t) {
            this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
          }
          bootstrapModuleFactory(t, i) {
            const a = function (n, e) {
                let t;
                return t = "noop" === n ? new wT : ("zone.js" === n ? void 0 : n) || new J({
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: !!(null == e ? void 0 : e.ngZoneEventCoalescing),
                  shouldCoalesceRunChangeDetection: !!(null == e ? void 0 : e.ngZoneRunCoalescing)
                }), t
              }(i ? i.ngZone : void 0, {
                ngZoneEventCoalescing: i && i.ngZoneEventCoalescing || !1,
                ngZoneRunCoalescing: i && i.ngZoneRunCoalescing || !1
              }),
              l = [{
                provide: J,
                useValue: a
              }];
            return a.run(() => {
              const c = Ze.create({
                  providers: l,
                  parent: this.injector,
                  name: t.moduleType.name
                }),
                u = t.create(c),
                f = u.injector.get(Hi, null);
              if (!f) throw new ft("402", "");
              return a.runOutsideAngular(() => {
                  const m = a.onError.subscribe({
                    next: p => {
                      f.handleError(p)
                    }
                  });
                  u.onDestroy(() => {
                    xu(this._modules, u), m.unsubscribe()
                  })
                }),
                function (n, e, t) {
                  try {
                    const i = t();
                    return $c(i) ? i.catch(r => {
                      throw e.runOutsideAngular(() => n.handleError(r)), r
                    }) : i
                  } catch (i) {
                    throw e.runOutsideAngular(() => n.handleError(i)), i
                  }
                }(f, a, () => {
                  const m = u.injector.get(pr);
                  return m.runInitializers(), m.donePromise.then(() => (function (n) {
                    pt(n, "Expected localeId to be defined"), "string" == typeof n && (Ag = n.toLowerCase().replace(/_/g, "-"))
                  }(u.injector.get(xn, Vs) || Vs), this._moduleDoBootstrap(u), u))
                })
            })
          }
          bootstrapModule(t, i = []) {
            const r = X_({}, i);
            return function (n, e, t) {
              const i = new ou(t);
              return Promise.resolve(i)
            }(0, 0, t).then(o => this.bootstrapModuleFactory(o, r))
          }
          _moduleDoBootstrap(t) {
            const i = t.injector.get(vo);
            if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(r => i.bootstrap(r));
            else {
              if (!t.instance.ngDoBootstrap) throw new ft("403", "");
              t.instance.ngDoBootstrap(i)
            }
            this._modules.push(t)
          }
          onDestroy(t) {
            this._destroyListeners.push(t)
          }
          get injector() {
            return this._injector
          }
          destroy() {
            if (this._destroyed) throw new ft("404", "");
            this._modules.slice().forEach(t => t.destroy()), this._destroyListeners.forEach(t => t()), this._destroyed = !0
          }
          get destroyed() {
            return this._destroyed
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(Ze))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();

      function X_(n, e) {
        return Array.isArray(e) ? e.reduce(X_, n) : te(te({}, n), e)
      }
      let vo = (() => {
        class n {
          constructor(t, i, r, o, s) {
            this._zone = t, this._injector = i, this._exceptionHandler = r, this._componentFactoryResolver = o, this._initStatus = s, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
              next: () => {
                this._zone.run(() => {
                  this.tick()
                })
              }
            });
            const a = new Le(c => {
                this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                  c.next(this._stable), c.complete()
                })
              }),
              l = new Le(c => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    J.assertNotInAngularZone(), Cu(() => {
                      !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0, c.next(!0))
                    })
                  })
                });
                const f = this._zone.onUnstable.subscribe(() => {
                  J.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                    c.next(!1)
                  }))
                });
                return () => {
                  u.unsubscribe(), f.unsubscribe()
                }
              });
            this.isStable = Pr(a, l.pipe(function (n = {}) {
              const {
                connector: e = (() => new re),
                resetOnError: t = !0,
                resetOnComplete: i = !0,
                resetOnRefCountZero: r = !0
              } = n;
              return o => {
                let s = null,
                  a = null,
                  l = null,
                  c = 0,
                  u = !1,
                  f = !1;
                const m = () => {
                    null == a || a.unsubscribe(), a = null
                  },
                  p = () => {
                    m(), s = l = null, u = f = !1
                  },
                  _ = () => {
                    const v = s;
                    p(), null == v || v.unsubscribe()
                  };
                return ht((v, C) => {
                  c++, !f && !u && m();
                  const D = l = null != l ? l : e();
                  C.add(() => {
                    c--, 0 === c && !f && !u && (a = nl(_, r))
                  }), D.subscribe(C), s || (s = new Wa({
                    next: b => D.next(b),
                    error: b => {
                      f = !0, m(), a = nl(p, t, b), D.error(b)
                    },
                    complete: () => {
                      u = !0, m(), a = nl(p, i), D.complete()
                    }
                  }), zo(v).subscribe(s))
                })(o)
              }
            }()))
          }
          bootstrap(t, i) {
            if (!this._initStatus.done) throw new ft("405", "");
            let r;
            r = t instanceof i_ ? t : this._componentFactoryResolver.resolveComponentFactory(t), this.componentTypes.push(r.componentType);
            const o = function (n) {
                return n.isBoundToModule
              }(r) ? void 0 : this._injector.get(dr),
              a = r.create(Ze.NULL, [], i || r.selector, o),
              l = a.location.nativeElement,
              c = a.injector.get(Mu, null),
              u = c && a.injector.get(q_);
            return c && u && u.registerApplication(l, c), a.onDestroy(() => {
              this.detachView(a.hostView), xu(this.components, a), u && u.unregisterApplication(l)
            }), this._loadComponent(a), a
          }
          tick() {
            if (this._runningTick) throw new ft("101", "");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges()
            } catch (t) {
              this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t))
            } finally {
              this._runningTick = !1
            }
          }
          attachView(t) {
            const i = t;
            this._views.push(i), i.attachToAppRef(this)
          }
          detachView(t) {
            const i = t;
            xu(this._views, i), i.detachFromAppRef()
          }
          _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t), this._injector.get(fT, []).concat(this._bootstrapListeners).forEach(r => r(t))
          }
          ngOnDestroy() {
            this._views.slice().forEach(t => t.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
          }
          get viewCount() {
            return this._views.length
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(J), M(Ze), M(Hi), M(zn), M(pr))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();

      function xu(n, e) {
        const t = n.indexOf(e);
        t > -1 && n.splice(t, 1)
      }
      let ey = !0,
        Tn = (() => {
          class n {}
          return n.__NG_ELEMENT_ID__ = FT, n
        })();

      function FT(n) {
        return function (n, e, t) {
          if (Qo(n) && !t) {
            const i = _t(n.index, e);
            return new fo(i, i)
          }
          return 47 & n.type ? new fo(e[16], e) : null
        }(Be(), E(), 16 == (16 & n))
      }
      class ay {
        constructor() {}
        supports(e) {
          return ro(e)
        }
        create(e) {
          return new HT(e)
        }
      }
      const VT = (n, e) => e;
      class HT {
        constructor(e) {
          this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = e || VT
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t)
        }
        forEachOperation(e) {
          let t = this._itHead,
            i = this._removalsHead,
            r = 0,
            o = null;
          for (; t || i;) {
            const s = !i || t && t.currentIndex < cy(i, r, o) ? t : i,
              a = cy(s, r, o),
              l = s.currentIndex;
            if (s === i) r--, i = i._nextRemoved;
            else if (t = t._next, null == s.previousIndex) r++;
            else {
              o || (o = []);
              const c = a - r,
                u = l - r;
              if (c != u) {
                for (let m = 0; m < c; m++) {
                  const p = m < o.length ? o[m] : o[m] = 0,
                    _ = p + m;
                  u <= _ && _ < c && (o[m] = p + 1)
                }
                o[s.previousIndex] = u - c
              }
            }
            a !== l && e(s, a, l)
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t)
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t)
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t)
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t)
        }
        forEachIdentityChange(e) {
          let t;
          for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) e(t)
        }
        diff(e) {
          if (null == e && (e = []), !ro(e)) throw new Error(`Error trying to diff '${Q(e)}'. Only arrays and iterables are allowed`);
          return this.check(e) ? this : null
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let r, o, s, t = this._itHead,
            i = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++) o = e[a], s = this._trackByFn(a, o), null !== t && Object.is(t.trackById, s) ? (i && (t = this._verifyReinsertion(t, o, s, a)), Object.is(t.item, o) || this._addIdentityChange(t, o)) : (t = this._mismatch(t, o, s, a), i = !0), t = t._next
          } else r = 0,
            function (n, e) {
              if (Array.isArray(n))
                for (let t = 0; t < n.length; t++) e(n[t]);
              else {
                const t = n[Yi()]();
                let i;
                for (; !(i = t.next()).done;) e(i.value)
              }
            }(e, a => {
              s = this._trackByFn(r, a), null !== t && Object.is(t.trackById, s) ? (i && (t = this._verifyReinsertion(t, a, s, r)), Object.is(t.item, a) || this._addIdentityChange(t, a)) : (t = this._mismatch(t, a, s, r), i = !0), t = t._next, r++
            }), this.length = r;
          return this._truncate(t), this.collection = e, this.isDirty
        }
        get isDirty() {
          return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (e = this._previousItHead = this._itHead; null !== e; e = e._next) e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded) e.previousIndex = e.currentIndex;
            for (this._additionsHead = this._additionsTail = null, e = this._movesHead; null !== e; e = e._nextMoved) e.previousIndex = e.currentIndex;
            this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
          }
        }
        _mismatch(e, t, i, r) {
          let o;
          return null === e ? o = this._itTail : (o = e._prev, this._remove(e)), null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(i, null)) ? (Object.is(e.item, t) || this._addIdentityChange(e, t), this._reinsertAfter(e, o, r)) : null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(i, r)) ? (Object.is(e.item, t) || this._addIdentityChange(e, t), this._moveAfter(e, o, r)) : e = this._addAfter(new zT(t, i), o, r), e
        }
        _verifyReinsertion(e, t, i, r) {
          let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(i, null);
          return null !== o ? e = this._reinsertAfter(o, e._prev, r) : e.currentIndex != r && (e.currentIndex = r, this._addToMoves(e, r)), e
        }
        _truncate(e) {
          for (; null !== e;) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), e = t
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
        }
        _reinsertAfter(e, t, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const r = e._prevRemoved,
            o = e._nextRemoved;
          return null === r ? this._removalsHead = o : r._nextRemoved = o, null === o ? this._removalsTail = r : o._prevRemoved = r, this._insertAfter(e, t, i), this._addToMoves(e, i), e
        }
        _moveAfter(e, t, i) {
          return this._unlink(e), this._insertAfter(e, t, i), this._addToMoves(e, i), e
        }
        _addAfter(e, t, i) {
          return this._insertAfter(e, t, i), this._additionsTail = null === this._additionsTail ? this._additionsHead = e : this._additionsTail._nextAdded = e, e
        }
        _insertAfter(e, t, i) {
          const r = null === t ? this._itHead : t._next;
          return e._next = r, e._prev = t, null === r ? this._itTail = e : r._prev = e, null === t ? this._itHead = e : t._next = e, null === this._linkedRecords && (this._linkedRecords = new ly), this._linkedRecords.put(e), e.currentIndex = i, e
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e))
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            i = e._next;
          return null === t ? this._itHead = i : t._next = i, null === i ? this._itTail = t : i._prev = t, e
        }
        _addToMoves(e, t) {
          return e.previousIndex === t || (this._movesTail = null === this._movesTail ? this._movesHead = e : this._movesTail._nextMoved = e), e
        }
        _addToRemovals(e) {
          return null === this._unlinkedRecords && (this._unlinkedRecords = new ly), this._unlinkedRecords.put(e), e.currentIndex = null, e._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = e, e._prevRemoved = null) : (e._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = e), e
        }
        _addIdentityChange(e, t) {
          return e.item = t, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = e : this._identityChangesTail._nextIdentityChange = e, e
        }
      }
      class zT {
        constructor(e, t) {
          this.item = e, this.trackById = t, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
        }
      }
      class $T {
        constructor() {
          this._head = null, this._tail = null
        }
        add(e) {
          null === this._head ? (this._head = this._tail = e, e._nextDup = null, e._prevDup = null) : (this._tail._nextDup = e, e._prevDup = this._tail, e._nextDup = null, this._tail = e)
        }
        get(e, t) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if ((null === t || t <= i.currentIndex) && Object.is(i.trackById, e)) return i;
          return null
        }
        remove(e) {
          const t = e._prevDup,
            i = e._nextDup;
          return null === t ? this._head = i : t._nextDup = i, null === i ? this._tail = t : i._prevDup = t, null === this._head
        }
      }
      class ly {
        constructor() {
          this.map = new Map
        }
        put(e) {
          const t = e.trackById;
          let i = this.map.get(t);
          i || (i = new $T, this.map.set(t, i)), i.add(e)
        }
        get(e, t) {
          const r = this.map.get(e);
          return r ? r.get(e, t) : null
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e
        }
        get isEmpty() {
          return 0 === this.map.size
        }
        clear() {
          this.map.clear()
        }
      }

      function cy(n, e, t) {
        const i = n.previousIndex;
        if (null === i) return i;
        let r = 0;
        return t && i < t.length && (r = t[i]), i + e + r
      }
      class uy {
        constructor() {}
        supports(e) {
          return e instanceof Map || Lc(e)
        }
        create() {
          return new UT
        }
      }
      class UT {
        constructor() {
          this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
        }
        get isDirty() {
          return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
        }
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t)
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t)
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t)
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t)
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t)
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || Lc(e))) throw new Error(`Error trying to diff '${Q(e)}'. Only maps and objects are allowed`)
          } else e = new Map;
          return this.check(e) ? this : null
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (this._appendAfter = null, this._forEach(e, (i, r) => {
              if (t && t.key === r) this._maybeAddToChanges(t, i), this._appendAfter = t, t = t._next;
              else {
                const o = this._getOrCreateRecordForKey(r, i);
                t = this._insertBeforeOrAppend(t, o)
              }
            }), t) {
            t._prev && (t._prev._next = null), this._removalsHead = t;
            for (let i = t; null !== i; i = i._nextRemoved) i === this._mapHead && (this._mapHead = null), this._records.delete(i.key), i._nextRemoved = i._next, i.previousValue = i.currentValue, i.currentValue = null, i._prev = null, i._next = null
          }
          return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const i = e._prev;
            return t._next = e, t._prev = i, e._prev = t, i && (i._next = t), e === this._mapHead && (this._mapHead = t), this._appendAfter = e, e
          }
          return this._appendAfter ? (this._appendAfter._next = t, t._prev = this._appendAfter) : this._mapHead = t, this._appendAfter = t, null
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const r = this._records.get(e);
            this._maybeAddToChanges(r, t);
            const o = r._prev,
              s = r._next;
            return o && (o._next = s), s && (s._prev = o), r._next = null, r._prev = null, r
          }
          const i = new GT(e);
          return this._records.set(e, i), i.currentValue = t, this._addToAdditions(i), i
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (this._previousMapHead = this._mapHead, e = this._previousMapHead; null !== e; e = e._next) e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged) e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded) e.previousValue = e.currentValue;
            this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
          }
        }
        _maybeAddToChanges(e, t) {
          Object.is(t, e.currentValue) || (e.previousValue = e.currentValue, e.currentValue = t, this._addToChanges(e))
        }
        _addToAdditions(e) {
          null === this._additionsHead ? this._additionsHead = this._additionsTail = e : (this._additionsTail._nextAdded = e, this._additionsTail = e)
        }
        _addToChanges(e) {
          null === this._changesHead ? this._changesHead = this._changesTail = e : (this._changesTail._nextChanged = e, this._changesTail = e)
        }
        _forEach(e, t) {
          e instanceof Map ? e.forEach(t) : Object.keys(e).forEach(i => t(e[i], i))
        }
      }
      class GT {
        constructor(e) {
          this.key = e, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
        }
      }

      function dy() {
        return new bo([new ay])
      }
      let bo = (() => {
        class n {
          constructor(t) {
            this.factories = t
          }
          static create(t, i) {
            if (null != i) {
              const r = i.factories.slice();
              t = t.concat(r)
            }
            return new n(t)
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: i => n.create(t, i || dy()),
              deps: [
                [n, new qr, new Bi]
              ]
            }
          }
          find(t) {
            const i = this.factories.find(r => r.supports(t));
            if (null != i) return i;
            throw new Error(`Cannot find a differ supporting object '${t}' of type '${function(n){return n.name||typeof n}(t)}'`)
          }
        }
        return n.\u0275prov = I({
          token: n,
          providedIn: "root",
          factory: dy
        }), n
      })();

      function hy() {
        return new gr([new uy])
      }
      let gr = (() => {
        class n {
          constructor(t) {
            this.factories = t
          }
          static create(t, i) {
            if (i) {
              const r = i.factories.slice();
              t = t.concat(r)
            }
            return new n(t)
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: i => n.create(t, i || hy()),
              deps: [
                [n, new qr, new Bi]
              ]
            }
          }
          find(t) {
            const i = this.factories.find(r => r.supports(t));
            if (i) return i;
            throw new Error(`Cannot find a differ supporting object '${t}'`)
          }
        }
        return n.\u0275prov = I({
          token: n,
          providedIn: "root",
          factory: hy
        }), n
      })();
      const qT = [new uy],
        YT = new bo([new ay]),
        QT = new gr(qT),
        ZT = Y_(null, "core", [{
          provide: Qs,
          useValue: "unknown"
        }, {
          provide: Z_,
          deps: [Ze]
        }, {
          provide: q_,
          deps: []
        }, {
          provide: mT,
          deps: []
        }]),
        nk = [{
          provide: vo,
          useClass: vo,
          deps: [J, Ze, Hi, zn, pr]
        }, {
          provide: ux,
          deps: [J],
          useFactory: function (n) {
            let e = [];
            return n.onStable.subscribe(() => {
                for (; e.length;) e.pop()()
              }),
              function (t) {
                e.push(t)
              }
          }
        }, {
          provide: pr,
          useClass: pr,
          deps: [
            [new Bi, vu]
          ]
        }, {
          provide: U_,
          useClass: U_,
          deps: []
        }, hT, {
          provide: bo,
          useFactory: function () {
            return YT
          },
          deps: []
        }, {
          provide: gr,
          useFactory: function () {
            return QT
          },
          deps: []
        }, {
          provide: xn,
          useFactory: function (n) {
            return n || "undefined" != typeof $localize && $localize.locale || Vs
          },
          deps: [
            [new ps(xn), new Bi, new qr]
          ]
        }, {
          provide: $_,
          useValue: "USD"
        }];
      let rk = (() => {
          class n {
            constructor(t) {}
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(vo))
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            providers: nk
          }), n
        })(),
        Xs = null;

      function $n() {
        return Xs
      }
      const ee = new P("DocumentToken");
      let Co = (() => {
          class n {
            historyGo(t) {
              throw new Error("Not implemented")
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275prov = I({
            token: n,
            factory: function () {
              return M(fy)
            },
            providedIn: "platform"
          }), n
        })(),
        fy = (() => {
          class n extends Co {
            constructor(t) {
              super(), this._doc = t, this._init()
            }
            _init() {
              this.location = window.location, this._history = window.history
            }
            getBaseHrefFromDOM() {
              return $n().getBaseHref(this._doc)
            }
            onPopState(t) {
              const i = $n().getGlobalEventTarget(this._doc, "window");
              return i.addEventListener("popstate", t, !1), () => i.removeEventListener("popstate", t)
            }
            onHashChange(t) {
              const i = $n().getGlobalEventTarget(this._doc, "window");
              return i.addEventListener("hashchange", t, !1), () => i.removeEventListener("hashchange", t)
            }
            get href() {
              return this.location.href
            }
            get protocol() {
              return this.location.protocol
            }
            get hostname() {
              return this.location.hostname
            }
            get port() {
              return this.location.port
            }
            get pathname() {
              return this.location.pathname
            }
            get search() {
              return this.location.search
            }
            get hash() {
              return this.location.hash
            }
            set pathname(t) {
              this.location.pathname = t
            }
            pushState(t, i, r) {
              my() ? this._history.pushState(t, i, r) : this.location.hash = r
            }
            replaceState(t, i, r) {
              my() ? this._history.replaceState(t, i, r) : this.location.hash = r
            }
            forward() {
              this._history.forward()
            }
            back() {
              this._history.back()
            }
            historyGo(t = 0) {
              this._history.go(t)
            }
            getState() {
              return this._history.state
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(ee))
          }, n.\u0275prov = I({
            token: n,
            factory: function () {
              return new fy(M(ee))
            },
            providedIn: "platform"
          }), n
        })();

      function my() {
        return !!window.history.pushState
      }

      function py(n, e) {
        if (0 == n.length) return e;
        if (0 == e.length) return n;
        let t = 0;
        return n.endsWith("/") && t++, e.startsWith("/") && t++, 2 == t ? n + e.substring(1) : 1 == t ? n + e : n + "/" + e
      }

      function gy(n) {
        const e = n.match(/#|\?|$/),
          t = e && e.index || n.length;
        return n.slice(0, t - ("/" === n[t - 1] ? 1 : 0)) + n.slice(t)
      }

      function li(n) {
        return n && "?" !== n[0] ? "?" + n : n
      }
      let Ou = (() => {
        class n {
          historyGo(t) {
            throw new Error("Not implemented")
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)
        }, n.\u0275prov = I({
          token: n,
          factory: function () {
            return function (n) {
              const e = M(ee).location;
              return new hk(M(Co), e && e.origin || "")
            }()
          },
          providedIn: "root"
        }), n
      })();
      const dk = new P("appBaseHref");
      let hk = (() => {
          class n extends Ou {
            constructor(t, i) {
              if (super(), this._platformLocation = t, this._removeListenerFns = [], null == i && (i = this._platformLocation.getBaseHrefFromDOM()), null == i) throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
              this._baseHref = i
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
            }
            onPopState(t) {
              this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
            }
            getBaseHref() {
              return this._baseHref
            }
            prepareExternalUrl(t) {
              return py(this._baseHref, t)
            }
            path(t = !1) {
              const i = this._platformLocation.pathname + li(this._platformLocation.search),
                r = this._platformLocation.hash;
              return r && t ? `${i}${r}` : i
            }
            pushState(t, i, r, o) {
              const s = this.prepareExternalUrl(r + li(o));
              this._platformLocation.pushState(t, i, s)
            }
            replaceState(t, i, r, o) {
              const s = this.prepareExternalUrl(r + li(o));
              this._platformLocation.replaceState(t, i, s)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
            historyGo(t = 0) {
              var i, r;
              null == (r = (i = this._platformLocation).historyGo) || r.call(i, t)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(Co), M(dk, 8))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac
          }), n
        })(),
        Au = (() => {
          class n {
            constructor(t, i) {
              this._subject = new he, this._urlChangeListeners = [], this._platformStrategy = t;
              const r = this._platformStrategy.getBaseHref();
              this._platformLocation = i, this._baseHref = gy(_y(r)), this._platformStrategy.onPopState(o => {
                this._subject.emit({
                  url: this.path(!0),
                  pop: !0,
                  state: o.state,
                  type: o.type
                })
              })
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t))
            }
            getState() {
              return this._platformLocation.getState()
            }
            isCurrentPathEqualTo(t, i = "") {
              return this.path() == this.normalize(t + li(i))
            }
            normalize(t) {
              return n.stripTrailingSlash(function (n, e) {
                return n && e.startsWith(n) ? e.substring(n.length) : e
              }(this._baseHref, _y(t)))
            }
            prepareExternalUrl(t) {
              return t && "/" !== t[0] && (t = "/" + t), this._platformStrategy.prepareExternalUrl(t)
            }
            go(t, i = "", r = null) {
              this._platformStrategy.pushState(r, "", t, i), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + li(i)), r)
            }
            replaceState(t, i = "", r = null) {
              this._platformStrategy.replaceState(r, "", t, i), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + li(i)), r)
            }
            forward() {
              this._platformStrategy.forward()
            }
            back() {
              this._platformStrategy.back()
            }
            historyGo(t = 0) {
              var i, r;
              null == (r = (i = this._platformStrategy).historyGo) || r.call(i, t)
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(i => {
                this._notifyUrlChangeListeners(i.url, i.state)
              }))
            }
            _notifyUrlChangeListeners(t = "", i) {
              this._urlChangeListeners.forEach(r => r(t, i))
            }
            subscribe(t, i, r) {
              return this._subject.subscribe({
                next: t,
                error: i,
                complete: r
              })
            }
          }
          return n.normalizeQueryParams = li, n.joinWithSlash = py, n.stripTrailingSlash = gy, n.\u0275fac = function (t) {
            return new(t || n)(M(Ou), M(Co))
          }, n.\u0275prov = I({
            token: n,
            factory: function () {
              return new Au(M(Ou), M(Co))
            },
            providedIn: "root"
          }), n
        })();

      function _y(n) {
        return n.replace(/\/index.html$/, "")
      }
      var Fe = (() => ((Fe = Fe || {})[Fe.Zero = 0] = "Zero", Fe[Fe.One = 1] = "One", Fe[Fe.Two = 2] = "Two", Fe[Fe.Few = 3] = "Few", Fe[Fe.Many = 4] = "Many", Fe[Fe.Other = 5] = "Other", Fe))();
      const Ck = function (n) {
        return function (n) {
          const e = function (n) {
            return n.toLowerCase().replace(/_/g, "-")
          }(n);
          let t = Og(e);
          if (t) return t;
          const i = e.split("-")[0];
          if (t = Og(i), t) return t;
          if ("en" === i) return JM;
          throw new Error(`Missing locale data for the locale "${n}".`)
        }(n)[k.PluralCase]
      };
      class la {}
      let Qk = (() => {
          class n extends la {
            constructor(t) {
              super(), this.locale = t
            }
            getPluralCategory(t, i) {
              switch (Ck(i || this.locale)(t)) {
                case Fe.Zero:
                  return "zero";
                case Fe.One:
                  return "one";
                case Fe.Two:
                  return "two";
                case Fe.Few:
                  return "few";
                case Fe.Many:
                  return "many";
                default:
                  return "other"
              }
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(xn))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac
          }), n
        })(),
        xy = (() => {
          class n {
            constructor(t, i, r, o) {
              this._iterableDiffers = t, this._keyValueDiffers = i, this._ngEl = r, this._renderer = o, this._iterableDiffer = null, this._keyValueDiffer = null, this._initialClasses = [], this._rawClass = null
            }
            set klass(t) {
              this._removeClasses(this._initialClasses), this._initialClasses = "string" == typeof t ? t.split(/\s+/) : [], this._applyClasses(this._initialClasses), this._applyClasses(this._rawClass)
            }
            set ngClass(t) {
              this._removeClasses(this._rawClass), this._applyClasses(this._initialClasses), this._iterableDiffer = null, this._keyValueDiffer = null, this._rawClass = "string" == typeof t ? t.split(/\s+/) : t, this._rawClass && (ro(this._rawClass) ? this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create() : this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create())
            }
            ngDoCheck() {
              if (this._iterableDiffer) {
                const t = this._iterableDiffer.diff(this._rawClass);
                t && this._applyIterableChanges(t)
              } else if (this._keyValueDiffer) {
                const t = this._keyValueDiffer.diff(this._rawClass);
                t && this._applyKeyValueChanges(t)
              }
            }
            _applyKeyValueChanges(t) {
              t.forEachAddedItem(i => this._toggleClass(i.key, i.currentValue)), t.forEachChangedItem(i => this._toggleClass(i.key, i.currentValue)), t.forEachRemovedItem(i => {
                i.previousValue && this._toggleClass(i.key, !1)
              })
            }
            _applyIterableChanges(t) {
              t.forEachAddedItem(i => {
                if ("string" != typeof i.item) throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${Q(i.item)}`);
                this._toggleClass(i.item, !0)
              }), t.forEachRemovedItem(i => this._toggleClass(i.item, !1))
            }
            _applyClasses(t) {
              t && (Array.isArray(t) || t instanceof Set ? t.forEach(i => this._toggleClass(i, !0)) : Object.keys(t).forEach(i => this._toggleClass(i, !!t[i])))
            }
            _removeClasses(t) {
              t && (Array.isArray(t) || t instanceof Set ? t.forEach(i => this._toggleClass(i, !1)) : Object.keys(t).forEach(i => this._toggleClass(i, !1)))
            }
            _toggleClass(t, i) {
              (t = t.trim()) && t.split(/\s+/g).forEach(r => {
                i ? this._renderer.addClass(this._ngEl.nativeElement, r) : this._renderer.removeClass(this._ngEl.nativeElement, r)
              })
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(bo), w(gr), w(de), w(o_))
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "ngClass", ""]
            ],
            inputs: {
              klass: ["class", "klass"],
              ngClass: "ngClass"
            }
          }), n
        })();
      class Jk {
        constructor(e, t, i, r) {
          this.$implicit = e, this.ngForOf = t, this.index = i, this.count = r
        }
        get first() {
          return 0 === this.index
        }
        get last() {
          return this.index === this.count - 1
        }
        get even() {
          return this.index % 2 == 0
        }
        get odd() {
          return !this.even
        }
      }
      let Hu = (() => {
        class n {
          constructor(t, i, r) {
            this._viewContainer = t, this._template = i, this._differs = r, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null
          }
          set ngForOf(t) {
            this._ngForOf = t, this._ngForOfDirty = !0
          }
          set ngForTrackBy(t) {
            this._trackByFn = t
          }
          get ngForTrackBy() {
            return this._trackByFn
          }
          set ngForTemplate(t) {
            t && (this._template = t)
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              if (!this._differ && t) try {
                this._differ = this._differs.find(t).create(this.ngForTrackBy)
              } catch (i) {
                throw new Error(`Cannot find a differ supporting object '${t}' of type '${function(n){return n.name||typeof n}(t)}'. NgFor only supports binding to Iterables such as Arrays.`)
              }
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t)
            }
          }
          _applyChanges(t) {
            const i = [];
            t.forEachOperation((r, o, s) => {
              if (null == r.previousIndex) {
                const a = this._viewContainer.createEmbeddedView(this._template, new Jk(null, this._ngForOf, -1, -1), null === s ? void 0 : s),
                  l = new Ty(r, a);
                i.push(l)
              } else if (null == s) this._viewContainer.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = this._viewContainer.get(o);
                this._viewContainer.move(a, s);
                const l = new Ty(r, a);
                i.push(l)
              }
            });
            for (let r = 0; r < i.length; r++) this._perViewChange(i[r].view, i[r].record);
            for (let r = 0, o = this._viewContainer.length; r < o; r++) {
              const s = this._viewContainer.get(r);
              s.context.index = r, s.context.count = o, s.context.ngForOf = this._ngForOf
            }
            t.forEachIdentityChange(r => {
              this._viewContainer.get(r.currentIndex).context.$implicit = r.item
            })
          }
          _perViewChange(t, i) {
            t.context.$implicit = i.item
          }
          static ngTemplateContextGuard(t, i) {
            return !0
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(w(Ct), w(Bt), w(bo))
        }, n.\u0275dir = ne({
          type: n,
          selectors: [
            ["", "ngFor", "", "ngForOf", ""]
          ],
          inputs: {
            ngForOf: "ngForOf",
            ngForTrackBy: "ngForTrackBy",
            ngForTemplate: "ngForTemplate"
          }
        }), n
      })();
      class Ty {
        constructor(e, t) {
          this.record = e, this.view = t
        }
      }
      let ky = (() => {
        class n {
          constructor(t, i) {
            this._viewContainer = t, this._context = new tS, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = i
          }
          set ngIf(t) {
            this._context.$implicit = this._context.ngIf = t, this._updateView()
          }
          set ngIfThen(t) {
            Sy("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView()
          }
          set ngIfElse(t) {
            Sy("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView()
          }
          _updateView() {
            this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
          }
          static ngTemplateContextGuard(t, i) {
            return !0
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(w(Ct), w(Bt))
        }, n.\u0275dir = ne({
          type: n,
          selectors: [
            ["", "ngIf", ""]
          ],
          inputs: {
            ngIf: "ngIf",
            ngIfThen: "ngIfThen",
            ngIfElse: "ngIfElse"
          }
        }), n
      })();
      class tS {
        constructor() {
          this.$implicit = null, this.ngIf = null
        }
      }

      function Sy(n, e) {
        if (e && !e.createEmbeddedView) throw new Error(`${n} must be a TemplateRef, but received '${Q(e)}'.`)
      }
      let Wu = (() => {
        class n {}
        return n.\u0275fac = function (t) {
          return new(t || n)
        }, n.\u0275mod = Me({
          type: n
        }), n.\u0275inj = ge({
          providers: [{
            provide: la,
            useClass: Qk
          }]
        }), n
      })();
      const Ay = "browser";
      class qu extends class extends class {} {
        constructor() {
          super(...arguments), this.supportsDOMEvents = !0
        }
      } {
        static makeCurrent() {
          var n;
          n = new qu, Xs || (Xs = n)
        }
        onAndCancel(e, t, i) {
          return e.addEventListener(t, i, !1), () => {
            e.removeEventListener(t, i, !1)
          }
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t)
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e)
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e)
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle")
        }
        getDefaultDocument() {
          return document
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment
        }
        getGlobalEventTarget(e, t) {
          return "window" === t ? window : "document" === t ? e : "body" === t ? e.body : null
        }
        getBaseHref(e) {
          const t = (Mo = Mo || document.querySelector("base"), Mo ? Mo.getAttribute("href") : null);
          return null == t ? null : function (n) {
            ca = ca || document.createElement("a"), ca.setAttribute("href", n);
            const e = ca.pathname;
            return "/" === e.charAt(0) ? e : `/${e}`
          }(t)
        }
        resetBaseElement() {
          Mo = null
        }
        getUserAgent() {
          return window.navigator.userAgent
        }
        getCookie(e) {
          return function (n, e) {
            e = encodeURIComponent(e);
            for (const t of n.split(";")) {
              const i = t.indexOf("="),
                [r, o] = -1 == i ? [t, ""] : [t.slice(0, i), t.slice(i + 1)];
              if (r.trim() === e) return decodeURIComponent(o)
            }
            return null
          }(document.cookie, e)
        }
      }
      let ca, Mo = null;
      const Fy = new P("TRANSITION_ID"),
        BS = [{
          provide: vu,
          useFactory: function (n, e, t) {
            return () => {
              t.get(pr).donePromise.then(() => {
                const i = $n(),
                  r = e.querySelectorAll(`style[ng-transition="${n}"]`);
                for (let o = 0; o < r.length; o++) i.remove(r[o])
              })
            }
          },
          deps: [Fy, ee, Ze],
          multi: !0
        }];
      class Ku {
        static init() {
          var n;
          n = new Ku, Eu = n
        }
        addToWindow(e) {
          ie.getAngularTestability = (i, r = !0) => {
            const o = e.findTestabilityInTree(i, r);
            if (null == o) throw new Error("Could not find testability for element.");
            return o
          }, ie.getAllAngularTestabilities = () => e.getAllTestabilities(), ie.getAllAngularRootElements = () => e.getAllRootElements(), ie.frameworkStabilizers || (ie.frameworkStabilizers = []), ie.frameworkStabilizers.push(i => {
            const r = ie.getAllAngularTestabilities();
            let o = r.length,
              s = !1;
            const a = function (l) {
              s = s || l, o--, 0 == o && i(s)
            };
            r.forEach(function (l) {
              l.whenStable(a)
            })
          })
        }
        findTestabilityInTree(e, t, i) {
          if (null == t) return null;
          const r = e.getTestability(t);
          return null != r ? r : i ? $n().isShadowRoot(t) ? this.findTestabilityInTree(e, t.host, !0) : this.findTestabilityInTree(e, t.parentElement, !0) : null
        }
      }
      let jS = (() => {
        class n {
          build() {
            return new XMLHttpRequest
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      const ua = new P("EventManagerPlugins");
      let da = (() => {
        class n {
          constructor(t, i) {
            this._zone = i, this._eventNameToPlugin = new Map, t.forEach(r => r.manager = this), this._plugins = t.slice().reverse()
          }
          addEventListener(t, i, r) {
            return this._findPluginFor(i).addEventListener(t, i, r)
          }
          addGlobalEventListener(t, i, r) {
            return this._findPluginFor(i).addGlobalEventListener(t, i, r)
          }
          getZone() {
            return this._zone
          }
          _findPluginFor(t) {
            const i = this._eventNameToPlugin.get(t);
            if (i) return i;
            const r = this._plugins;
            for (let o = 0; o < r.length; o++) {
              const s = r[o];
              if (s.supports(t)) return this._eventNameToPlugin.set(t, s), s
            }
            throw new Error(`No event manager plugin found for event ${t}`)
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(ua), M(J))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      class Ry {
        constructor(e) {
          this._doc = e
        }
        addGlobalEventListener(e, t, i) {
          const r = $n().getGlobalEventTarget(this._doc, e);
          if (!r) throw new Error(`Unsupported event target ${r} for event ${t}`);
          return this.addEventListener(r, t, i)
        }
      }
      let Ny = (() => {
          class n {
            constructor() {
              this._stylesSet = new Set
            }
            addStyles(t) {
              const i = new Set;
              t.forEach(r => {
                this._stylesSet.has(r) || (this._stylesSet.add(r), i.add(r))
              }), this.onStylesAdded(i)
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac
          }), n
        })(),
        Eo = (() => {
          class n extends Ny {
            constructor(t) {
              super(), this._doc = t, this._hostNodes = new Map, this._hostNodes.set(t.head, [])
            }
            _addStylesToHost(t, i, r) {
              t.forEach(o => {
                const s = this._doc.createElement("style");
                s.textContent = o, r.push(i.appendChild(s))
              })
            }
            addHost(t) {
              const i = [];
              this._addStylesToHost(this._stylesSet, t, i), this._hostNodes.set(t, i)
            }
            removeHost(t) {
              const i = this._hostNodes.get(t);
              i && i.forEach(Ly), this._hostNodes.delete(t)
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((i, r) => {
                this._addStylesToHost(t, r, i)
              })
            }
            ngOnDestroy() {
              this._hostNodes.forEach(t => t.forEach(Ly))
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(ee))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac
          }), n
        })();

      function Ly(n) {
        $n().remove(n)
      }
      const Yu = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/"
        },
        Qu = /%COMP%/g;

      function ha(n, e, t) {
        for (let i = 0; i < e.length; i++) {
          let r = e[i];
          Array.isArray(r) ? ha(n, r, t) : (r = r.replace(Qu, n), t.push(r))
        }
        return t
      }

      function Vy(n) {
        return e => {
          if ("__ngUnwrap__" === e) return n;
          !1 === n(e) && (e.preventDefault(), e.returnValue = !1)
        }
      }
      let fa = (() => {
        class n {
          constructor(t, i, r) {
            this.eventManager = t, this.sharedStylesHost = i, this.appId = r, this.rendererByCompId = new Map, this.defaultRenderer = new Zu(t)
          }
          createRenderer(t, i) {
            if (!t || !i) return this.defaultRenderer;
            switch (i.encapsulation) {
              case $t.Emulated: {
                let r = this.rendererByCompId.get(i.id);
                return r || (r = new GS(this.eventManager, this.sharedStylesHost, i, this.appId), this.rendererByCompId.set(i.id, r)), r.applyToHost(t), r
              }
              case 1:
              case $t.ShadowDom:
                return new WS(this.eventManager, this.sharedStylesHost, t, i);
              default:
                if (!this.rendererByCompId.has(i.id)) {
                  const r = ha(i.id, i.styles, []);
                  this.sharedStylesHost.addStyles(r), this.rendererByCompId.set(i.id, this.defaultRenderer)
                }
                return this.defaultRenderer
            }
          }
          begin() {}
          end() {}
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(da), M(Eo), M(yo))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      class Zu {
        constructor(e) {
          this.eventManager = e, this.data = Object.create(null), this.destroyNode = null
        }
        destroy() {}
        createElement(e, t) {
          return t ? document.createElementNS(Yu[t] || t, e) : document.createElement(e)
        }
        createComment(e) {
          return document.createComment(e)
        }
        createText(e) {
          return document.createTextNode(e)
        }
        appendChild(e, t) {
          e.appendChild(t)
        }
        insertBefore(e, t, i) {
          e && e.insertBefore(t, i)
        }
        removeChild(e, t) {
          e && e.removeChild(t)
        }
        selectRootElement(e, t) {
          let i = "string" == typeof e ? document.querySelector(e) : e;
          if (!i) throw new Error(`The selector "${e}" did not match any elements`);
          return t || (i.textContent = ""), i
        }
        parentNode(e) {
          return e.parentNode
        }
        nextSibling(e) {
          return e.nextSibling
        }
        setAttribute(e, t, i, r) {
          if (r) {
            t = r + ":" + t;
            const o = Yu[r];
            o ? e.setAttributeNS(o, t, i) : e.setAttribute(t, i)
          } else e.setAttribute(t, i)
        }
        removeAttribute(e, t, i) {
          if (i) {
            const r = Yu[i];
            r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${i}:${t}`)
          } else e.removeAttribute(t)
        }
        addClass(e, t) {
          e.classList.add(t)
        }
        removeClass(e, t) {
          e.classList.remove(t)
        }
        setStyle(e, t, i, r) {
          r & (vt.DashCase | vt.Important) ? e.style.setProperty(t, i, r & vt.Important ? "important" : "") : e.style[t] = i
        }
        removeStyle(e, t, i) {
          i & vt.DashCase ? e.style.removeProperty(t) : e.style[t] = ""
        }
        setProperty(e, t, i) {
          e[t] = i
        }
        setValue(e, t) {
          e.nodeValue = t
        }
        listen(e, t, i) {
          return "string" == typeof e ? this.eventManager.addGlobalEventListener(e, t, Vy(i)) : this.eventManager.addEventListener(e, t, Vy(i))
        }
      }
      class GS extends Zu {
        constructor(e, t, i, r) {
          super(e), this.component = i;
          const o = ha(r + "-" + i.id, i.styles, []);
          t.addStyles(o), this.contentAttr = "_ngcontent-%COMP%".replace(Qu, r + "-" + i.id), this.hostAttr = "_nghost-%COMP%".replace(Qu, r + "-" + i.id)
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "")
        }
        createElement(e, t) {
          const i = super.createElement(e, t);
          return super.setAttribute(i, this.contentAttr, ""), i
        }
      }
      class WS extends Zu {
        constructor(e, t, i, r) {
          super(e), this.sharedStylesHost = t, this.hostEl = i, this.shadowRoot = i.attachShadow({
            mode: "open"
          }), this.sharedStylesHost.addHost(this.shadowRoot);
          const o = ha(r.id, r.styles, []);
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement("style");
            a.textContent = o[s], this.shadowRoot.appendChild(a)
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t)
        }
        insertBefore(e, t, i) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, i)
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t)
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))
        }
      }
      let qS = (() => {
        class n extends Ry {
          constructor(t) {
            super(t)
          }
          supports(t) {
            return !0
          }
          addEventListener(t, i, r) {
            return t.addEventListener(i, r, !1), () => this.removeEventListener(t, i, r)
          }
          removeEventListener(t, i, r) {
            return t.removeEventListener(i, r)
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(ee))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      const zy = ["alt", "control", "meta", "shift"],
        YS = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS"
        },
        $y = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock"
        },
        QS = {
          alt: n => n.altKey,
          control: n => n.ctrlKey,
          meta: n => n.metaKey,
          shift: n => n.shiftKey
        };
      let ZS = (() => {
        class n extends Ry {
          constructor(t) {
            super(t)
          }
          supports(t) {
            return null != n.parseEventName(t)
          }
          addEventListener(t, i, r) {
            const o = n.parseEventName(i),
              s = n.eventCallback(o.fullKey, r, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(() => $n().onAndCancel(t, o.domEventName, s))
          }
          static parseEventName(t) {
            const i = t.toLowerCase().split("."),
              r = i.shift();
            if (0 === i.length || "keydown" !== r && "keyup" !== r) return null;
            const o = n._normalizeKey(i.pop());
            let s = "";
            if (zy.forEach(l => {
                const c = i.indexOf(l);
                c > -1 && (i.splice(c, 1), s += l + ".")
              }), s += o, 0 != i.length || 0 === o.length) return null;
            const a = {};
            return a.domEventName = r, a.fullKey = s, a
          }
          static getEventFullKey(t) {
            let i = "",
              r = function (n) {
                let e = n.key;
                if (null == e) {
                  if (e = n.keyIdentifier, null == e) return "Unidentified";
                  e.startsWith("U+") && (e = String.fromCharCode(parseInt(e.substring(2), 16)), 3 === n.location && $y.hasOwnProperty(e) && (e = $y[e]))
                }
                return YS[e] || e
              }(t);
            return r = r.toLowerCase(), " " === r ? r = "space" : "." === r && (r = "dot"), zy.forEach(o => {
              o != r && QS[o](t) && (i += o + ".")
            }), i += r, i
          }
          static eventCallback(t, i, r) {
            return o => {
              n.getEventFullKey(o) === t && r.runGuarded(() => i(o))
            }
          }
          static _normalizeKey(t) {
            return "esc" === t ? "escape" : t
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(ee))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      const nP = Y_(ZT, "browser", [{
          provide: Qs,
          useValue: Ay
        }, {
          provide: z_,
          useValue: function () {
            qu.makeCurrent(), Ku.init()
          },
          multi: !0
        }, {
          provide: ee,
          useFactory: function () {
            return n = document, gl = n, document;
            var n
          },
          deps: []
        }]),
        iP = [{
          provide: Oc,
          useValue: "root"
        }, {
          provide: Hi,
          useFactory: function () {
            return new Hi
          },
          deps: []
        }, {
          provide: ua,
          useClass: qS,
          multi: !0,
          deps: [ee, J, Qs]
        }, {
          provide: ua,
          useClass: ZS,
          multi: !0,
          deps: [ee]
        }, {
          provide: fa,
          useClass: fa,
          deps: [da, Eo, yo]
        }, {
          provide: ho,
          useExisting: fa
        }, {
          provide: Ny,
          useExisting: Eo
        }, {
          provide: Eo,
          useClass: Eo,
          deps: [ee]
        }, {
          provide: Mu,
          useClass: Mu,
          deps: [J]
        }, {
          provide: da,
          useClass: da,
          deps: [ua, J]
        }, {
          provide: class {},
          useClass: jS,
          deps: []
        }];
      let Uy = (() => {
        class n {
          constructor(t) {
            if (t) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
          }
          static withServerTransition(t) {
            return {
              ngModule: n,
              providers: [{
                provide: yo,
                useValue: t.appId
              }, {
                provide: Fy,
                useExisting: yo
              }, BS]
            }
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(n, 12))
        }, n.\u0275mod = Me({
          type: n
        }), n.\u0275inj = ge({
          providers: iP,
          imports: [Wu, rk]
        }), n
      })();
      "undefined" != typeof window && window;
      class mP extends re {
        constructor(e) {
          super(), this._value = e
        }
        get value() {
          return this.getValue()
        }
        _subscribe(e) {
          const t = super._subscribe(e);
          return !t.closed && e.next(this._value), t
        }
        getValue() {
          const {
            hasError: e,
            thrownError: t,
            _value: i
          } = this;
          if (e) throw t;
          return this._throwIfClosed(), i
        }
        next(e) {
          super.next(this._value = e)
        }
      }

      function ma(...n) {
        return zo(n, Ho(n))
      }

      function Ju(n, ...e) {
        return e.length ? e.some(t => n[t]) : n.altKey || n.shiftKey || n.ctrlKey || n.metaKey
      }
      class RP extends Se {
        constructor(e, t) {
          super()
        }
        schedule(e, t = 0) {
          return this
        }
      }
      const pa = {
        setInterval(...n) {
          const {
            delegate: e
          } = pa;
          return ((null == e ? void 0 : e.setInterval) || setInterval)(...n)
        },
        clearInterval(n) {
          const {
            delegate: e
          } = pa;
          return ((null == e ? void 0 : e.clearInterval) || clearInterval)(n)
        },
        delegate: void 0
      };
      class ed extends RP {
        constructor(e, t) {
          super(e, t), this.scheduler = e, this.work = t, this.pending = !1
        }
        schedule(e, t = 0) {
          if (this.closed) return this;
          this.state = e;
          const i = this.id,
            r = this.scheduler;
          return null != i && (this.id = this.recycleAsyncId(r, i, t)), this.pending = !0, this.delay = t, this.id = this.id || this.requestAsyncId(r, this.id, t), this
        }
        requestAsyncId(e, t, i = 0) {
          return pa.setInterval(e.flush.bind(e, this), i)
        }
        recycleAsyncId(e, t, i = 0) {
          if (null != i && this.delay === i && !1 === this.pending) return t;
          pa.clearInterval(t)
        }
        execute(e, t) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const i = this._execute(e, t);
          if (i) return i;
          !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
        }
        _execute(e, t) {
          let r, i = !1;
          try {
            this.work(e)
          } catch (o) {
            i = !0, r = o || new Error("Scheduled action threw falsy error")
          }
          if (i) return this.unsubscribe(), r
        }
        unsubscribe() {
          if (!this.closed) {
            const {
              id: e,
              scheduler: t
            } = this, {
              actions: i
            } = t;
            this.work = this.state = this.scheduler = null, this.pending = !1, vi(i, this), null != e && (this.id = this.recycleAsyncId(t, e, null)), this.delay = null, super.unsubscribe()
          }
        }
      }
      const qy = {
        now: () => (qy.delegate || Date).now(),
        delegate: void 0
      };
      class xo {
        constructor(e, t = xo.now) {
          this.schedulerActionCtor = e, this.now = t
        }
        schedule(e, t = 0, i) {
          return new this.schedulerActionCtor(this, e).schedule(i, t)
        }
      }
      xo.now = qy.now;
      class td extends xo {
        constructor(e, t = xo.now) {
          super(e, t), this.actions = [], this._active = !1, this._scheduled = void 0
        }
        flush(e) {
          const {
            actions: t
          } = this;
          if (this._active) return void t.push(e);
          let i;
          this._active = !0;
          do {
            if (i = e.execute(e.state, e.delay)) break
          } while (e = t.shift());
          if (this._active = !1, i) {
            for (; e = t.shift();) e.unsubscribe();
            throw i
          }
        }
      }
      const Ky = new td(ed),
        Yy = Ky;

      function Qy(n, e = Ky) {
        return ht((t, i) => {
          let r = null,
            o = null,
            s = null;
          const a = () => {
            if (r) {
              r.unsubscribe(), r = null;
              const c = o;
              o = null, i.next(c)
            }
          };

          function l() {
            const c = s + n,
              u = e.now();
            if (u < c) return r = this.schedule(void 0, c - u), void i.add(r);
            a()
          }
          t.subscribe(new Pt(i, c => {
            o = c, s = e.now(), r || (r = e.schedule(l, n), i.add(r))
          }, () => {
            a(), i.complete()
          }, void 0, () => {
            o = r = null
          }))
        })
      }

      function ci(n, e) {
        return ht((t, i) => {
          let r = 0;
          t.subscribe(new Pt(i, o => n.call(e, o, r++) && i.next(o)))
        })
      }

      function Zy(n, e = Vo) {
        return n = null != n ? n : LP, ht((t, i) => {
          let r, o = !0;
          t.subscribe(new Pt(i, s => {
            const a = e(s);
            (o || !n(r, a)) && (o = !1, r = a, i.next(s))
          }))
        })
      }

      function LP(n, e) {
        return n === e
      }

      function Gn(n) {
        return ht((e, t) => {
          sn(n).subscribe(new Pt(t, () => t.complete(), Sr)), !t.closed && e.subscribe(t)
        })
      }

      function To(n) {
        return null != n && "false" != `${n}`
      }

      function ga(n, e = 0) {
        return function (n) {
          return !isNaN(parseFloat(n)) && !isNaN(Number(n))
        }(n) ? Number(n) : e
      }

      function Xy(n) {
        return Array.isArray(n) ? n : [n]
      }

      function Ne(n) {
        return null == n ? "" : "string" == typeof n ? n : `${n}px`
      }

      function ui(n) {
        return n instanceof de ? n.nativeElement : n
      }
      let nd;
      try {
        nd = "undefined" != typeof Intl && Intl.v8BreakIterator
      } catch (n) {
        nd = !1
      }
      let ko, di, id, wt = (() => {
          class n {
            constructor(t) {
              this._platformId = t, this.isBrowser = this._platformId ? function (n) {
                return n === Ay
              }(this._platformId) : "object" == typeof document && !!document, this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent), this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent), this.BLINK = this.isBrowser && !(!window.chrome && !nd) && "undefined" != typeof CSS && !this.EDGE && !this.TRIDENT, this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT, this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window), this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent), this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT, this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(Qs))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        _a = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({}), n
        })();

      function So(n) {
        return function () {
          if (null == ko && "undefined" != typeof window) try {
            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
              get: () => ko = !0
            }))
          } finally {
            ko = ko || !1
          }
          return ko
        }() ? n : !!n.capture
      }

      function VP() {
        if (null == di) {
          if ("object" != typeof document || !document || "function" != typeof Element || !Element) return di = !1, di;
          if ("scrollBehavior" in document.documentElement.style) di = !0;
          else {
            const n = Element.prototype.scrollTo;
            di = !!n && !/\{\s*\[native code\]\s*\}/.test(n.toString())
          }
        }
        return di
      }

      function rd() {
        let n = "undefined" != typeof document && document ? document.activeElement : null;
        for (; n && n.shadowRoot;) {
          const e = n.shadowRoot.activeElement;
          if (e === n) break;
          n = e
        }
        return n
      }

      function hi(n) {
        return n.composedPath ? n.composedPath()[0] : n.target
      }

      function od() {
        return "undefined" != typeof __karma__ && !!__karma__ || "undefined" != typeof jasmine && !!jasmine || "undefined" != typeof jest && !!jest || "undefined" != typeof Mocha && !!Mocha
      }
      let ev = (() => {
          class n {
            create(t) {
              return "undefined" == typeof MutationObserver ? null : new MutationObserver(t)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        $P = (() => {
          class n {
            constructor(t) {
              this._mutationObserverFactory = t, this._observedElements = new Map
            }
            ngOnDestroy() {
              this._observedElements.forEach((t, i) => this._cleanupObserver(i))
            }
            observe(t) {
              const i = ui(t);
              return new Le(r => {
                const s = this._observeElement(i).subscribe(r);
                return () => {
                  s.unsubscribe(), this._unobserveElement(i)
                }
              })
            }
            _observeElement(t) {
              if (this._observedElements.has(t)) this._observedElements.get(t).count++;
              else {
                const i = new re,
                  r = this._mutationObserverFactory.create(o => i.next(o));
                r && r.observe(t, {
                  characterData: !0,
                  childList: !0,
                  subtree: !0
                }), this._observedElements.set(t, {
                  observer: r,
                  stream: i,
                  count: 1
                })
              }
              return this._observedElements.get(t).stream
            }
            _unobserveElement(t) {
              this._observedElements.has(t) && (this._observedElements.get(t).count--, this._observedElements.get(t).count || this._cleanupObserver(t))
            }
            _cleanupObserver(t) {
              if (this._observedElements.has(t)) {
                const {
                  observer: i,
                  stream: r
                } = this._observedElements.get(t);
                i && i.disconnect(), r.complete(), this._observedElements.delete(t)
              }
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(ev))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        UP = (() => {
          class n {
            constructor(t, i, r) {
              this._contentObserver = t, this._elementRef = i, this._ngZone = r, this.event = new he, this._disabled = !1, this._currentSubscription = null
            }
            get disabled() {
              return this._disabled
            }
            set disabled(t) {
              this._disabled = To(t), this._disabled ? this._unsubscribe() : this._subscribe()
            }
            get debounce() {
              return this._debounce
            }
            set debounce(t) {
              this._debounce = ga(t), this._subscribe()
            }
            ngAfterContentInit() {
              !this._currentSubscription && !this.disabled && this._subscribe()
            }
            ngOnDestroy() {
              this._unsubscribe()
            }
            _subscribe() {
              this._unsubscribe();
              const t = this._contentObserver.observe(this._elementRef);
              this._ngZone.runOutsideAngular(() => {
                this._currentSubscription = (this.debounce ? t.pipe(Qy(this.debounce)) : t).subscribe(this.event)
              })
            }
            _unsubscribe() {
              var t;
              null == (t = this._currentSubscription) || t.unsubscribe()
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w($P), w(de), w(J))
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "cdkObserveContent", ""]
            ],
            inputs: {
              disabled: ["cdkObserveContentDisabled", "disabled"],
              debounce: "debounce"
            },
            outputs: {
              event: "cdkObserveContent"
            },
            exportAs: ["cdkObserveContent"]
          }), n
        })(),
        sd = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            providers: [ev]
          }), n
        })();
      class KP extends class {
        constructor(e) {
          this._items = e, this._activeItemIndex = -1, this._activeItem = null, this._wrap = !1, this._letterKeyStream = new re, this._typeaheadSubscription = Se.EMPTY, this._vertical = !0, this._allowedModifierKeys = [], this._homeAndEnd = !1, this._skipPredicateFn = t => t.disabled, this._pressedLetters = [], this.tabOut = new re, this.change = new re, e instanceof fr && e.changes.subscribe(t => {
            if (this._activeItem) {
              const r = t.toArray().indexOf(this._activeItem);
              r > -1 && r !== this._activeItemIndex && (this._activeItemIndex = r)
            }
          })
        }
        skipPredicate(e) {
          return this._skipPredicateFn = e, this
        }
        withWrap(e = !0) {
          return this._wrap = e, this
        }
        withVerticalOrientation(e = !0) {
          return this._vertical = e, this
        }
        withHorizontalOrientation(e) {
          return this._horizontal = e, this
        }
        withAllowedModifierKeys(e) {
          return this._allowedModifierKeys = e, this
        }
        withTypeAhead(e = 200) {
          return this._typeaheadSubscription.unsubscribe(), this._typeaheadSubscription = this._letterKeyStream.pipe(function (n, e, t) {
            const i = U(n) ? {
              next: n,
              error: e,
              complete: t
            } : n;
            return i ? ht((r, o) => {
              var s;
              null === (s = i.subscribe) || void 0 === s || s.call(i);
              let a = !0;
              r.subscribe(new Pt(o, l => {
                var c;
                null === (c = i.next) || void 0 === c || c.call(i, l), o.next(l)
              }, () => {
                var l;
                a = !1, null === (l = i.complete) || void 0 === l || l.call(i), o.complete()
              }, l => {
                var c;
                a = !1, null === (c = i.error) || void 0 === c || c.call(i, l), o.error(l)
              }, () => {
                var l, c;
                a && (null === (l = i.unsubscribe) || void 0 === l || l.call(i)), null === (c = i.finalize) || void 0 === c || c.call(i)
              }))
            }) : Vo
          }(t => this._pressedLetters.push(t)), Qy(e), ci(() => this._pressedLetters.length > 0), Qa(() => this._pressedLetters.join(""))).subscribe(t => {
            const i = this._getItemsArray();
            for (let r = 1; r < i.length + 1; r++) {
              const o = (this._activeItemIndex + r) % i.length,
                s = i[o];
              if (!this._skipPredicateFn(s) && 0 === s.getLabel().toUpperCase().trim().indexOf(t)) {
                this.setActiveItem(o);
                break
              }
            }
            this._pressedLetters = []
          }), this
        }
        withHomeAndEnd(e = !0) {
          return this._homeAndEnd = e, this
        }
        setActiveItem(e) {
          const t = this._activeItem;
          this.updateActiveItem(e), this._activeItem !== t && this.change.next(this._activeItemIndex)
        }
        onKeydown(e) {
          const t = e.keyCode,
            r = ["altKey", "ctrlKey", "metaKey", "shiftKey"].every(o => !e[o] || this._allowedModifierKeys.indexOf(o) > -1);
          switch (t) {
            case 9:
              return void this.tabOut.next();
            case 40:
              if (this._vertical && r) {
                this.setNextItemActive();
                break
              }
              return;
            case 38:
              if (this._vertical && r) {
                this.setPreviousItemActive();
                break
              }
              return;
            case 39:
              if (this._horizontal && r) {
                "rtl" === this._horizontal ? this.setPreviousItemActive() : this.setNextItemActive();
                break
              }
              return;
            case 37:
              if (this._horizontal && r) {
                "rtl" === this._horizontal ? this.setNextItemActive() : this.setPreviousItemActive();
                break
              }
              return;
            case 36:
              if (this._homeAndEnd && r) {
                this.setFirstItemActive();
                break
              }
              return;
            case 35:
              if (this._homeAndEnd && r) {
                this.setLastItemActive();
                break
              }
              return;
            default:
              return void((r || Ju(e, "shiftKey")) && (e.key && 1 === e.key.length ? this._letterKeyStream.next(e.key.toLocaleUpperCase()) : (t >= 65 && t <= 90 || t >= 48 && t <= 57) && this._letterKeyStream.next(String.fromCharCode(t))))
          }
          this._pressedLetters = [], e.preventDefault()
        }
        get activeItemIndex() {
          return this._activeItemIndex
        }
        get activeItem() {
          return this._activeItem
        }
        isTyping() {
          return this._pressedLetters.length > 0
        }
        setFirstItemActive() {
          this._setActiveItemByIndex(0, 1)
        }
        setLastItemActive() {
          this._setActiveItemByIndex(this._items.length - 1, -1)
        }
        setNextItemActive() {
          this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1)
        }
        setPreviousItemActive() {
          this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive() : this._setActiveItemByDelta(-1)
        }
        updateActiveItem(e) {
          const t = this._getItemsArray(),
            i = "number" == typeof e ? e : t.indexOf(e),
            r = t[i];
          this._activeItem = null == r ? null : r, this._activeItemIndex = i
        }
        _setActiveItemByDelta(e) {
          this._wrap ? this._setActiveInWrapMode(e) : this._setActiveInDefaultMode(e)
        }
        _setActiveInWrapMode(e) {
          const t = this._getItemsArray();
          for (let i = 1; i <= t.length; i++) {
            const r = (this._activeItemIndex + e * i + t.length) % t.length;
            if (!this._skipPredicateFn(t[r])) return void this.setActiveItem(r)
          }
        }
        _setActiveInDefaultMode(e) {
          this._setActiveItemByIndex(this._activeItemIndex + e, e)
        }
        _setActiveItemByIndex(e, t) {
          const i = this._getItemsArray();
          if (i[e]) {
            for (; this._skipPredicateFn(i[e]);)
              if (!i[e += t]) return;
            this.setActiveItem(e)
          }
        }
        _getItemsArray() {
          return this._items instanceof fr ? this._items.toArray() : this._items
        }
      } {
        constructor() {
          super(...arguments), this._origin = "program"
        }
        setFocusOrigin(e) {
          return this._origin = e, this
        }
        setActiveItem(e) {
          super.setActiveItem(e), this.activeItem && this.activeItem.focus(this._origin)
        }
      }
      let iv = (() => {
        class n {
          constructor(t) {
            this._platform = t
          }
          isDisabled(t) {
            return t.hasAttribute("disabled")
          }
          isVisible(t) {
            return function (n) {
              return !!(n.offsetWidth || n.offsetHeight || "function" == typeof n.getClientRects && n.getClientRects().length)
            }(t) && "visible" === getComputedStyle(t).visibility
          }
          isTabbable(t) {
            if (!this._platform.isBrowser) return !1;
            const i = function (n) {
              try {
                return n.frameElement
              } catch (e) {
                return null
              }
            }(function (n) {
              return n.ownerDocument && n.ownerDocument.defaultView || window
            }(t));
            if (i && (-1 === ov(i) || !this.isVisible(i))) return !1;
            let r = t.nodeName.toLowerCase(),
              o = ov(t);
            return t.hasAttribute("contenteditable") ? -1 !== o : !("iframe" === r || "object" === r || this._platform.WEBKIT && this._platform.IOS && ! function (n) {
              let e = n.nodeName.toLowerCase(),
                t = "input" === e && n.type;
              return "text" === t || "password" === t || "select" === e || "textarea" === e
            }(t)) && ("audio" === r ? !!t.hasAttribute("controls") && -1 !== o : "video" === r ? -1 !== o && (null !== o || this._platform.FIREFOX || t.hasAttribute("controls")) : t.tabIndex >= 0)
          }
          isFocusable(t, i) {
            return function (n) {
              return ! function (n) {
                return function (n) {
                  return "input" == n.nodeName.toLowerCase()
                }(n) && "hidden" == n.type
              }(n) && (function (n) {
                let e = n.nodeName.toLowerCase();
                return "input" === e || "select" === e || "button" === e || "textarea" === e
              }(n) || function (n) {
                return function (n) {
                  return "a" == n.nodeName.toLowerCase()
                }(n) && n.hasAttribute("href")
              }(n) || n.hasAttribute("contenteditable") || rv(n))
            }(t) && !this.isDisabled(t) && ((null == i ? void 0 : i.ignoreVisibility) || this.isVisible(t))
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(wt))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac,
          providedIn: "root"
        }), n
      })();

      function rv(n) {
        if (!n.hasAttribute("tabindex") || void 0 === n.tabIndex) return !1;
        let e = n.getAttribute("tabindex");
        return !(!e || isNaN(parseInt(e, 10)))
      }

      function ov(n) {
        if (!rv(n)) return null;
        const e = parseInt(n.getAttribute("tabindex") || "", 10);
        return isNaN(e) ? -1 : e
      }
      class oO {
        constructor(e, t, i, r, o = !1) {
          this._element = e, this._checker = t, this._ngZone = i, this._document = r, this._hasAttached = !1, this.startAnchorListener = () => this.focusLastTabbableElement(), this.endAnchorListener = () => this.focusFirstTabbableElement(), this._enabled = !0, o || this.attachAnchors()
        }
        get enabled() {
          return this._enabled
        }
        set enabled(e) {
          this._enabled = e, this._startAnchor && this._endAnchor && (this._toggleAnchorTabIndex(e, this._startAnchor), this._toggleAnchorTabIndex(e, this._endAnchor))
        }
        destroy() {
          const e = this._startAnchor,
            t = this._endAnchor;
          e && (e.removeEventListener("focus", this.startAnchorListener), e.remove()), t && (t.removeEventListener("focus", this.endAnchorListener), t.remove()), this._startAnchor = this._endAnchor = null, this._hasAttached = !1
        }
        attachAnchors() {
          return !!this._hasAttached || (this._ngZone.runOutsideAngular(() => {
            this._startAnchor || (this._startAnchor = this._createAnchor(), this._startAnchor.addEventListener("focus", this.startAnchorListener)), this._endAnchor || (this._endAnchor = this._createAnchor(), this._endAnchor.addEventListener("focus", this.endAnchorListener))
          }), this._element.parentNode && (this._element.parentNode.insertBefore(this._startAnchor, this._element), this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling), this._hasAttached = !0), this._hasAttached)
        }
        focusInitialElementWhenReady(e) {
          return new Promise(t => {
            this._executeOnStable(() => t(this.focusInitialElement(e)))
          })
        }
        focusFirstTabbableElementWhenReady(e) {
          return new Promise(t => {
            this._executeOnStable(() => t(this.focusFirstTabbableElement(e)))
          })
        }
        focusLastTabbableElementWhenReady(e) {
          return new Promise(t => {
            this._executeOnStable(() => t(this.focusLastTabbableElement(e)))
          })
        }
        _getRegionBoundary(e) {
          const t = this._element.querySelectorAll(`[cdk-focus-region-${e}], [cdkFocusRegion${e}], [cdk-focus-${e}]`);
          return "start" == e ? t.length ? t[0] : this._getFirstTabbableElement(this._element) : t.length ? t[t.length - 1] : this._getLastTabbableElement(this._element)
        }
        focusInitialElement(e) {
          const t = this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");
          if (t) {
            if (!this._checker.isFocusable(t)) {
              const i = this._getFirstTabbableElement(t);
              return null == i || i.focus(e), !!i
            }
            return t.focus(e), !0
          }
          return this.focusFirstTabbableElement(e)
        }
        focusFirstTabbableElement(e) {
          const t = this._getRegionBoundary("start");
          return t && t.focus(e), !!t
        }
        focusLastTabbableElement(e) {
          const t = this._getRegionBoundary("end");
          return t && t.focus(e), !!t
        }
        hasAttached() {
          return this._hasAttached
        }
        _getFirstTabbableElement(e) {
          if (this._checker.isFocusable(e) && this._checker.isTabbable(e)) return e;
          const t = e.children;
          for (let i = 0; i < t.length; i++) {
            const r = t[i].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(t[i]) : null;
            if (r) return r
          }
          return null
        }
        _getLastTabbableElement(e) {
          if (this._checker.isFocusable(e) && this._checker.isTabbable(e)) return e;
          const t = e.children;
          for (let i = t.length - 1; i >= 0; i--) {
            const r = t[i].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(t[i]) : null;
            if (r) return r
          }
          return null
        }
        _createAnchor() {
          const e = this._document.createElement("div");
          return this._toggleAnchorTabIndex(this._enabled, e), e.classList.add("cdk-visually-hidden"), e.classList.add("cdk-focus-trap-anchor"), e.setAttribute("aria-hidden", "true"), e
        }
        _toggleAnchorTabIndex(e, t) {
          e ? t.setAttribute("tabindex", "0") : t.removeAttribute("tabindex")
        }
        toggleAnchors(e) {
          this._startAnchor && this._endAnchor && (this._toggleAnchorTabIndex(e, this._startAnchor), this._toggleAnchorTabIndex(e, this._endAnchor))
        }
        _executeOnStable(e) {
          this._ngZone.isStable ? e() : this._ngZone.onStable.pipe(bi(1)).subscribe(e)
        }
      }
      let sO = (() => {
        class n {
          constructor(t, i, r) {
            this._checker = t, this._ngZone = i, this._document = r
          }
          create(t, i = !1) {
            return new oO(t, this._checker, this._ngZone, this._document, i)
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(iv), M(J), M(ee))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac,
          providedIn: "root"
        }), n
      })();

      function sv(n) {
        return 0 === n.offsetX && 0 === n.offsetY
      }

      function av(n) {
        const e = n.touches && n.touches[0] || n.changedTouches && n.changedTouches[0];
        return !(!e || -1 !== e.identifier || null != e.radiusX && 1 !== e.radiusX || null != e.radiusY && 1 !== e.radiusY)
      }
      const aO = new P("cdk-input-modality-detector-options"),
        lO = {
          ignoreKeys: [18, 17, 224, 91, 16]
        },
        yr = So({
          passive: !0,
          capture: !0
        });
      let cO = (() => {
        class n {
          constructor(t, i, r, o) {
            this._platform = t, this._mostRecentTarget = null, this._modality = new mP(null), this._lastTouchMs = 0, this._onKeydown = s => {
              var a, l;
              (null == (l = null == (a = this._options) ? void 0 : a.ignoreKeys) ? void 0 : l.some(c => c === s.keyCode)) || (this._modality.next("keyboard"), this._mostRecentTarget = hi(s))
            }, this._onMousedown = s => {
              Date.now() - this._lastTouchMs < 650 || (this._modality.next(sv(s) ? "keyboard" : "mouse"), this._mostRecentTarget = hi(s))
            }, this._onTouchstart = s => {
              av(s) ? this._modality.next("keyboard") : (this._lastTouchMs = Date.now(), this._modality.next("touch"), this._mostRecentTarget = hi(s))
            }, this._options = te(te({}, lO), o), this.modalityDetected = this._modality.pipe(ci((e, t) => 1 <= t)), this.modalityChanged = this.modalityDetected.pipe(Zy()), t.isBrowser && i.runOutsideAngular(() => {
              r.addEventListener("keydown", this._onKeydown, yr), r.addEventListener("mousedown", this._onMousedown, yr), r.addEventListener("touchstart", this._onTouchstart, yr)
            })
          }
          get mostRecentModality() {
            return this._modality.value
          }
          ngOnDestroy() {
            this._modality.complete(), this._platform.isBrowser && (document.removeEventListener("keydown", this._onKeydown, yr), document.removeEventListener("mousedown", this._onMousedown, yr), document.removeEventListener("touchstart", this._onTouchstart, yr))
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(wt), M(J), M(ee), M(aO, 8))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac,
          providedIn: "root"
        }), n
      })();
      const dO = new P("cdk-focus-monitor-default-options"),
        va = So({
          passive: !0,
          capture: !0
        });
      let ad = (() => {
          class n {
            constructor(t, i, r, o, s) {
              this._ngZone = t, this._platform = i, this._inputModalityDetector = r, this._origin = null, this._windowFocused = !1, this._originFromTouchInteraction = !1, this._elementInfo = new Map, this._monitoredElementCount = 0, this._rootNodeFocusListenerCount = new Map, this._windowFocusListener = () => {
                this._windowFocused = !0, this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = !1)
              }, this._stopInputModalityDetector = new re, this._rootNodeFocusAndBlurListener = a => {
                const l = hi(a),
                  c = "focus" === a.type ? this._onFocus : this._onBlur;
                for (let u = l; u; u = u.parentElement) c.call(this, a, u)
              }, this._document = o, this._detectionMode = (null == s ? void 0 : s.detectionMode) || 0
            }
            monitor(t, i = !1) {
              const r = ui(t);
              if (!this._platform.isBrowser || 1 !== r.nodeType) return ma(null);
              const o = function (n) {
                  if (function () {
                      if (null == id) {
                        const n = "undefined" != typeof document ? document.head : null;
                        id = !(!n || !n.createShadowRoot && !n.attachShadow)
                      }
                      return id
                    }()) {
                    const e = n.getRootNode ? n.getRootNode() : null;
                    if ("undefined" != typeof ShadowRoot && ShadowRoot && e instanceof ShadowRoot) return e
                  }
                  return null
                }(r) || this._getDocument(),
                s = this._elementInfo.get(r);
              if (s) return i && (s.checkChildren = !0), s.subject;
              const a = {
                checkChildren: i,
                subject: new re,
                rootNode: o
              };
              return this._elementInfo.set(r, a), this._registerGlobalListeners(a), a.subject
            }
            stopMonitoring(t) {
              const i = ui(t),
                r = this._elementInfo.get(i);
              r && (r.subject.complete(), this._setClasses(i), this._elementInfo.delete(i), this._removeGlobalListeners(r))
            }
            focusVia(t, i, r) {
              const o = ui(t);
              o === this._getDocument().activeElement ? this._getClosestElementsInfo(o).forEach(([a, l]) => this._originChanged(a, i, l)) : (this._setOrigin(i), "function" == typeof o.focus && o.focus(r))
            }
            ngOnDestroy() {
              this._elementInfo.forEach((t, i) => this.stopMonitoring(i))
            }
            _getDocument() {
              return this._document || document
            }
            _getWindow() {
              return this._getDocument().defaultView || window
            }
            _getFocusOrigin(t) {
              return this._origin ? this._originFromTouchInteraction ? this._shouldBeAttributedToTouch(t) ? "touch" : "program" : this._origin : this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : "program"
            }
            _shouldBeAttributedToTouch(t) {
              return 1 === this._detectionMode || !!(null == t ? void 0 : t.contains(this._inputModalityDetector._mostRecentTarget))
            }
            _setClasses(t, i) {
              t.classList.toggle("cdk-focused", !!i), t.classList.toggle("cdk-touch-focused", "touch" === i), t.classList.toggle("cdk-keyboard-focused", "keyboard" === i), t.classList.toggle("cdk-mouse-focused", "mouse" === i), t.classList.toggle("cdk-program-focused", "program" === i)
            }
            _setOrigin(t, i = !1) {
              this._ngZone.runOutsideAngular(() => {
                this._origin = t, this._originFromTouchInteraction = "touch" === t && i, 0 === this._detectionMode && (clearTimeout(this._originTimeoutId), this._originTimeoutId = setTimeout(() => this._origin = null, this._originFromTouchInteraction ? 650 : 1))
              })
            }
            _onFocus(t, i) {
              const r = this._elementInfo.get(i),
                o = hi(t);
              !r || !r.checkChildren && i !== o || this._originChanged(i, this._getFocusOrigin(o), r)
            }
            _onBlur(t, i) {
              const r = this._elementInfo.get(i);
              !r || r.checkChildren && t.relatedTarget instanceof Node && i.contains(t.relatedTarget) || (this._setClasses(i), this._emitOrigin(r.subject, null))
            }
            _emitOrigin(t, i) {
              this._ngZone.run(() => t.next(i))
            }
            _registerGlobalListeners(t) {
              if (!this._platform.isBrowser) return;
              const i = t.rootNode,
                r = this._rootNodeFocusListenerCount.get(i) || 0;
              r || this._ngZone.runOutsideAngular(() => {
                i.addEventListener("focus", this._rootNodeFocusAndBlurListener, va), i.addEventListener("blur", this._rootNodeFocusAndBlurListener, va)
              }), this._rootNodeFocusListenerCount.set(i, r + 1), 1 == ++this._monitoredElementCount && (this._ngZone.runOutsideAngular(() => {
                this._getWindow().addEventListener("focus", this._windowFocusListener)
              }), this._inputModalityDetector.modalityDetected.pipe(Gn(this._stopInputModalityDetector)).subscribe(o => {
                this._setOrigin(o, !0)
              }))
            }
            _removeGlobalListeners(t) {
              const i = t.rootNode;
              if (this._rootNodeFocusListenerCount.has(i)) {
                const r = this._rootNodeFocusListenerCount.get(i);
                r > 1 ? this._rootNodeFocusListenerCount.set(i, r - 1) : (i.removeEventListener("focus", this._rootNodeFocusAndBlurListener, va), i.removeEventListener("blur", this._rootNodeFocusAndBlurListener, va), this._rootNodeFocusListenerCount.delete(i))
              }--this._monitoredElementCount || (this._getWindow().removeEventListener("focus", this._windowFocusListener), this._stopInputModalityDetector.next(), clearTimeout(this._windowFocusTimeoutId), clearTimeout(this._originTimeoutId))
            }
            _originChanged(t, i, r) {
              this._setClasses(t, i), this._emitOrigin(r.subject, i), this._lastFocusOrigin = i
            }
            _getClosestElementsInfo(t) {
              const i = [];
              return this._elementInfo.forEach((r, o) => {
                (o === t || r.checkChildren && o.contains(t)) && i.push([o, r])
              }), i
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(J), M(wt), M(cO), M(ee, 8), M(dO, 8))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        hO = (() => {
          class n {
            constructor(t, i) {
              this._elementRef = t, this._focusMonitor = i, this.cdkFocusChange = new he
            }
            ngAfterViewInit() {
              const t = this._elementRef.nativeElement;
              this._monitorSubscription = this._focusMonitor.monitor(t, 1 === t.nodeType && t.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(i => this.cdkFocusChange.emit(i))
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef), this._monitorSubscription && this._monitorSubscription.unsubscribe()
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(ad))
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "cdkMonitorElementFocus", ""],
              ["", "cdkMonitorSubtreeFocus", ""]
            ],
            outputs: {
              cdkFocusChange: "cdkFocusChange"
            }
          }), n
        })();
      const cv = "cdk-high-contrast-black-on-white",
        uv = "cdk-high-contrast-white-on-black",
        ld = "cdk-high-contrast-active";
      let dv = (() => {
          class n {
            constructor(t, i) {
              this._platform = t, this._document = i
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const t = this._document.createElement("div");
              t.style.backgroundColor = "rgb(1,2,3)", t.style.position = "absolute", this._document.body.appendChild(t);
              const i = this._document.defaultView || window,
                r = i && i.getComputedStyle ? i.getComputedStyle(t) : null,
                o = (r && r.backgroundColor || "").replace(/ /g, "");
              switch (t.remove(), o) {
                case "rgb(0,0,0)":
                  return 2;
                case "rgb(255,255,255)":
                  return 1
              }
              return 0
            }
            _applyBodyHighContrastModeCssClasses() {
              if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
                const t = this._document.body.classList;
                t.remove(ld), t.remove(cv), t.remove(uv), this._hasCheckedHighContrastMode = !0;
                const i = this.getHighContrastMode();
                1 === i ? (t.add(ld), t.add(cv)) : 2 === i && (t.add(ld), t.add(uv))
              }
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(wt), M(ee))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        fO = (() => {
          class n {
            constructor(t) {
              t._applyBodyHighContrastModeCssClasses()
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(dv))
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            imports: [
              [_a, sd]
            ]
          }), n
        })();
      const mO = new P("cdk-dir-doc", {
          providedIn: "root",
          factory: function () {
            return xf(ee)
          }
        }),
        gO = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
      let Wn = (() => {
          class n {
            constructor(t) {
              if (this.value = "ltr", this.change = new he, t) {
                const r = t.documentElement ? t.documentElement.dir : null;
                this.value = function (n) {
                  const e = (null == n ? void 0 : n.toLowerCase()) || "";
                  return "auto" === e && "undefined" != typeof navigator && (null == navigator ? void 0 : navigator.language) ? gO.test(navigator.language) ? "rtl" : "ltr" : "rtl" === e ? "rtl" : "ltr"
                }((t.body ? t.body.dir : null) || r || "ltr")
              }
            }
            ngOnDestroy() {
              this.change.complete()
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(mO, 8))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        Po = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({}), n
        })();
      class fv {}
      const Sn = "*";

      function cd(n, e) {
        return {
          type: 7,
          name: n,
          definitions: e,
          options: {}
        }
      }

      function vr(n, e = null) {
        return {
          type: 4,
          styles: e,
          timings: n
        }
      }

      function mv(n, e = null) {
        return {
          type: 2,
          steps: n,
          options: e
        }
      }

      function Dt(n) {
        return {
          type: 6,
          styles: n,
          offset: null
        }
      }

      function br(n, e, t) {
        return {
          type: 0,
          name: n,
          styles: e,
          options: t
        }
      }

      function Cr(n, e, t = null) {
        return {
          type: 1,
          expr: n,
          animation: e,
          options: t
        }
      }

      function pv(n) {
        Promise.resolve(null).then(n)
      }
      class wr {
        constructor(e = 0, t = 0) {
          this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = e + t
        }
        _onFinish() {
          this._finished || (this._finished = !0, this._onDoneFns.forEach(e => e()), this._onDoneFns = [])
        }
        onStart(e) {
          this._onStartFns.push(e)
        }
        onDone(e) {
          this._onDoneFns.push(e)
        }
        onDestroy(e) {
          this._onDestroyFns.push(e)
        }
        hasStarted() {
          return this._started
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0
        }
        triggerMicrotask() {
          pv(() => this._onFinish())
        }
        _onStart() {
          this._onStartFns.forEach(e => e()), this._onStartFns = []
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish()
        }
        destroy() {
          this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(e => e()), this._onDestroyFns = [])
        }
        reset() {
          this._started = !1
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach(i => i()), t.length = 0
        }
      }
      class gv {
        constructor(e) {
          this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = e;
          let t = 0,
            i = 0,
            r = 0;
          const o = this.players.length;
          0 == o ? pv(() => this._onFinish()) : this.players.forEach(s => {
            s.onDone(() => {
              ++t == o && this._onFinish()
            }), s.onDestroy(() => {
              ++i == o && this._onDestroy()
            }), s.onStart(() => {
              ++r == o && this._onStart()
            })
          }), this.totalTime = this.players.reduce((s, a) => Math.max(s, a.totalTime), 0)
        }
        _onFinish() {
          this._finished || (this._finished = !0, this._onDoneFns.forEach(e => e()), this._onDoneFns = [])
        }
        init() {
          this.players.forEach(e => e.init())
        }
        onStart(e) {
          this._onStartFns.push(e)
        }
        _onStart() {
          this.hasStarted() || (this._started = !0, this._onStartFns.forEach(e => e()), this._onStartFns = [])
        }
        onDone(e) {
          this._onDoneFns.push(e)
        }
        onDestroy(e) {
          this._onDestroyFns.push(e)
        }
        hasStarted() {
          return this._started
        }
        play() {
          this.parentPlayer || this.init(), this._onStart(), this.players.forEach(e => e.play())
        }
        pause() {
          this.players.forEach(e => e.pause())
        }
        restart() {
          this.players.forEach(e => e.restart())
        }
        finish() {
          this._onFinish(), this.players.forEach(e => e.finish())
        }
        destroy() {
          this._onDestroy()
        }
        _onDestroy() {
          this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(e => e.destroy()), this._onDestroyFns.forEach(e => e()), this._onDestroyFns = [])
        }
        reset() {
          this.players.forEach(e => e.reset()), this._destroyed = !1, this._finished = !1, this._started = !1
        }
        setPosition(e) {
          const t = e * this.totalTime;
          this.players.forEach(i => {
            const r = i.totalTime ? Math.min(1, t / i.totalTime) : 1;
            i.setPosition(r)
          })
        }
        getPosition() {
          const e = this.players.reduce((t, i) => null === t || i.totalTime > t.totalTime ? i : t, null);
          return null != e ? e.getPosition() : 0
        }
        beforeDestroy() {
          this.players.forEach(e => {
            e.beforeDestroy && e.beforeDestroy()
          })
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach(i => i()), t.length = 0
        }
      }

      function _v() {
        return "undefined" != typeof window && void 0 !== window.document
      }

      function dd() {
        return "undefined" != typeof process && "[object process]" === {}.toString.call(process)
      }

      function qn(n) {
        switch (n.length) {
          case 0:
            return new wr;
          case 1:
            return n[0];
          default:
            return new gv(n)
        }
      }

      function yv(n, e, t, i, r = {}, o = {}) {
        const s = [],
          a = [];
        let l = -1,
          c = null;
        if (i.forEach(u => {
            const f = u.offset,
              m = f == l,
              p = m && c || {};
            Object.keys(u).forEach(_ => {
              let v = _,
                C = u[_];
              if ("offset" !== _) switch (v = e.normalizePropertyName(v, s), C) {
                case "!":
                  C = r[_];
                  break;
                case Sn:
                  C = o[_];
                  break;
                default:
                  C = e.normalizeStyleValue(_, v, C, s)
              }
              p[v] = C
            }), m || a.push(p), c = p, l = f
          }), s.length) {
          const u = "\n - ";
          throw new Error(`Unable to animate due to the following errors:${u}${s.join(u)}`)
        }
        return a
      }

      function hd(n, e, t, i) {
        switch (e) {
          case "start":
            n.onStart(() => i(t && fd(t, "start", n)));
            break;
          case "done":
            n.onDone(() => i(t && fd(t, "done", n)));
            break;
          case "destroy":
            n.onDestroy(() => i(t && fd(t, "destroy", n)))
        }
      }

      function fd(n, e, t) {
        const i = t.totalTime,
          o = md(n.element, n.triggerName, n.fromState, n.toState, e || n.phaseName, null == i ? n.totalTime : i, !!t.disabled),
          s = n._data;
        return null != s && (o._data = s), o
      }

      function md(n, e, t, i, r = "", o = 0, s) {
        return {
          element: n,
          triggerName: e,
          fromState: t,
          toState: i,
          phaseName: r,
          totalTime: o,
          disabled: !!s
        }
      }

      function Mt(n, e, t) {
        let i;
        return n instanceof Map ? (i = n.get(e), i || n.set(e, i = t)) : (i = n[e], i || (i = n[e] = t)), i
      }

      function vv(n) {
        const e = n.indexOf(":");
        return [n.substring(1, e), n.substr(e + 1)]
      }
      let pd = (n, e) => !1,
        gd = (n, e) => !1,
        bv = (n, e, t) => [];
      const Cv = dd();
      (Cv || "undefined" != typeof Element) && (pd = _v() ? (n, e) => {
        for (; e && e !== document.documentElement;) {
          if (e === n) return !0;
          e = e.parentNode || e.host
        }
        return !1
      } : (n, e) => n.contains(e), gd = (() => {
        if (Cv || Element.prototype.matches) return (n, e) => n.matches(e); {
          const n = Element.prototype,
            e = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector;
          return e ? (t, i) => e.apply(t, [i]) : gd
        }
      })(), bv = (n, e, t) => {
        let i = [];
        if (t) {
          const r = n.querySelectorAll(e);
          for (let o = 0; o < r.length; o++) i.push(r[o])
        } else {
          const r = n.querySelector(e);
          r && i.push(r)
        }
        return i
      });
      let fi = null,
        wv = !1;

      function _d(n) {
        fi || (fi = ("undefined" != typeof document ? document.body : null) || {}, wv = !!fi.style && "WebkitAppearance" in fi.style);
        let e = !0;
        return fi.style && ! function (n) {
          return "ebkit" == n.substring(1, 6)
        }(n) && (e = n in fi.style, !e && wv && (e = "Webkit" + n.charAt(0).toUpperCase() + n.substr(1) in fi.style)), e
      }
      const yd = gd,
        vd = pd,
        bd = bv;

      function Dv(n) {
        const e = {};
        return Object.keys(n).forEach(t => {
          const i = t.replace(/([a-z])([A-Z])/g, "$1-$2");
          e[i] = n[t]
        }), e
      }
      let Mv = (() => {
          class n {
            validateStyleProperty(t) {
              return _d(t)
            }
            matchesElement(t, i) {
              return yd(t, i)
            }
            containsElement(t, i) {
              return vd(t, i)
            }
            query(t, i, r) {
              return bd(t, i, r)
            }
            computeStyle(t, i, r) {
              return r || ""
            }
            animate(t, i, r, o, s, a = [], l) {
              return new wr(r, o)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac
          }), n
        })(),
        Cd = (() => {
          class n {}
          return n.NOOP = new Mv, n
        })();
      const wd = "ng-enter",
        ba = "ng-leave",
        Ca = "ng-trigger",
        wa = ".ng-trigger",
        xv = "ng-animating",
        Dd = ".ng-animating";

      function mi(n) {
        if ("number" == typeof n) return n;
        const e = n.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : Md(parseFloat(e[1]), e[2])
      }

      function Md(n, e) {
        return "s" === e ? 1e3 * n : n
      }

      function Da(n, e, t) {
        return n.hasOwnProperty("duration") ? n : function (n, e, t) {
          let r, o = 0,
            s = "";
          if ("string" == typeof n) {
            const a = n.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
            if (null === a) return e.push(`The provided timing value "${n}" is invalid.`), {
              duration: 0,
              delay: 0,
              easing: ""
            };
            r = Md(parseFloat(a[1]), a[2]);
            const l = a[3];
            null != l && (o = Md(parseFloat(l), a[4]));
            const c = a[5];
            c && (s = c)
          } else r = n;
          if (!t) {
            let a = !1,
              l = e.length;
            r < 0 && (e.push("Duration values below 0 are not allowed for this animation step."), a = !0), o < 0 && (e.push("Delay values below 0 are not allowed for this animation step."), a = !0), a && e.splice(l, 0, `The provided timing value "${n}" is invalid.`)
          }
          return {
            duration: r,
            delay: o,
            easing: s
          }
        }(n, e, t)
      }

      function Dr(n, e = {}) {
        return Object.keys(n).forEach(t => {
          e[t] = n[t]
        }), e
      }

      function Kn(n, e, t = {}) {
        if (e)
          for (let i in n) t[i] = n[i];
        else Dr(n, t);
        return t
      }

      function kv(n, e, t) {
        return t ? e + ":" + t + ";" : ""
      }

      function Sv(n) {
        let e = "";
        for (let t = 0; t < n.style.length; t++) {
          const i = n.style.item(t);
          e += kv(0, i, n.style.getPropertyValue(i))
        }
        for (const t in n.style) n.style.hasOwnProperty(t) && !t.startsWith("_") && (e += kv(0, xO(t), n.style[t]));
        n.setAttribute("style", e)
      }

      function _n(n, e, t) {
        n.style && (Object.keys(e).forEach(i => {
          const r = xd(i);
          t && !t.hasOwnProperty(i) && (t[i] = n.style[r]), n.style[r] = e[i]
        }), dd() && Sv(n))
      }

      function pi(n, e) {
        n.style && (Object.keys(e).forEach(t => {
          const i = xd(t);
          n.style[i] = ""
        }), dd() && Sv(n))
      }

      function Oo(n) {
        return Array.isArray(n) ? 1 == n.length ? n[0] : mv(n) : n
      }
      const Ed = new RegExp("{{\\s*(.+?)\\s*}}", "g");

      function Pv(n) {
        let e = [];
        if ("string" == typeof n) {
          let t;
          for (; t = Ed.exec(n);) e.push(t[1]);
          Ed.lastIndex = 0
        }
        return e
      }

      function Ma(n, e, t) {
        const i = n.toString(),
          r = i.replace(Ed, (o, s) => {
            let a = e[s];
            return e.hasOwnProperty(s) || (t.push(`Please provide a value for the animation param ${s}`), a = ""), a.toString()
          });
        return r == i ? n : r
      }

      function Ea(n) {
        const e = [];
        let t = n.next();
        for (; !t.done;) e.push(t.value), t = n.next();
        return e
      }
      const EO = /-+([a-z0-9])/g;

      function xd(n) {
        return n.replace(EO, (...e) => e[1].toUpperCase())
      }

      function xO(n) {
        return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
      }

      function Ov(n, e) {
        return 0 === n || 0 === e
      }

      function Av(n, e, t) {
        const i = Object.keys(t);
        if (i.length && e.length) {
          let o = e[0],
            s = [];
          if (i.forEach(a => {
              o.hasOwnProperty(a) || s.push(a), o[a] = t[a]
            }), s.length)
            for (var r = 1; r < e.length; r++) {
              let a = e[r];
              s.forEach(function (l) {
                a[l] = Td(n, l)
              })
            }
        }
        return e
      }

      function Et(n, e, t) {
        switch (e.type) {
          case 7:
            return n.visitTrigger(e, t);
          case 0:
            return n.visitState(e, t);
          case 1:
            return n.visitTransition(e, t);
          case 2:
            return n.visitSequence(e, t);
          case 3:
            return n.visitGroup(e, t);
          case 4:
            return n.visitAnimate(e, t);
          case 5:
            return n.visitKeyframes(e, t);
          case 6:
            return n.visitStyle(e, t);
          case 8:
            return n.visitReference(e, t);
          case 9:
            return n.visitAnimateChild(e, t);
          case 10:
            return n.visitAnimateRef(e, t);
          case 11:
            return n.visitQuery(e, t);
          case 12:
            return n.visitStagger(e, t);
          default:
            throw new Error(`Unable to resolve animation metadata node #${e.type}`)
        }
      }

      function Td(n, e) {
        return window.getComputedStyle(n)[e]
      }

      function TO(n, e) {
        const t = [];
        return "string" == typeof n ? n.split(/\s*,\s*/).forEach(i => function (n, e, t) {
          if (":" == n[0]) {
            const l = function (n, e) {
              switch (n) {
                case ":enter":
                  return "void => *";
                case ":leave":
                  return "* => void";
                case ":increment":
                  return (t, i) => parseFloat(i) > parseFloat(t);
                case ":decrement":
                  return (t, i) => parseFloat(i) < parseFloat(t);
                default:
                  return e.push(`The transition alias value "${n}" is not supported`), "* => *"
              }
            }(n, t);
            if ("function" == typeof l) return void e.push(l);
            n = l
          }
          const i = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
          if (null == i || i.length < 4) return t.push(`The provided transition expression "${n}" is not supported`), e;
          const r = i[1],
            o = i[2],
            s = i[3];
          e.push(Iv(r, s));
          "<" == o[0] && !("*" == r && "*" == s) && e.push(Iv(s, r))
        }(i, t, e)) : t.push(n), t
      }
      const Ta = new Set(["true", "1"]),
        ka = new Set(["false", "0"]);

      function Iv(n, e) {
        const t = Ta.has(n) || ka.has(n),
          i = Ta.has(e) || ka.has(e);
        return (r, o) => {
          let s = "*" == n || n == r,
            a = "*" == e || e == o;
          return !s && t && "boolean" == typeof r && (s = r ? Ta.has(n) : ka.has(n)), !a && i && "boolean" == typeof o && (a = o ? Ta.has(e) : ka.has(e)), s && a
        }
      }
      const PO = new RegExp("s*:selfs*,?", "g");

      function kd(n, e, t) {
        return new OO(n).build(e, t)
      }
      class OO {
        constructor(e) {
          this._driver = e
        }
        build(e, t) {
          const i = new FO(t);
          return this._resetContextStyleTimingState(i), Et(this, Oo(e), i)
        }
        _resetContextStyleTimingState(e) {
          e.currentQuerySelector = "", e.collectedStyles = {}, e.collectedStyles[""] = {}, e.currentTime = 0
        }
        visitTrigger(e, t) {
          let i = t.queryCount = 0,
            r = t.depCount = 0;
          const o = [],
            s = [];
          return "@" == e.name.charAt(0) && t.errors.push("animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"), e.definitions.forEach(a => {
            if (this._resetContextStyleTimingState(t), 0 == a.type) {
              const l = a,
                c = l.name;
              c.toString().split(/\s*,\s*/).forEach(u => {
                l.name = u, o.push(this.visitState(l, t))
              }), l.name = c
            } else if (1 == a.type) {
              const l = this.visitTransition(a, t);
              i += l.queryCount, r += l.depCount, s.push(l)
            } else t.errors.push("only state() and transition() definitions can sit inside of a trigger()")
          }), {
            type: 7,
            name: e.name,
            states: o,
            transitions: s,
            queryCount: i,
            depCount: r,
            options: null
          }
        }
        visitState(e, t) {
          const i = this.visitStyle(e.styles, t),
            r = e.options && e.options.params || null;
          if (i.containsDynamicStyles) {
            const o = new Set,
              s = r || {};
            if (i.styles.forEach(a => {
                if (Sa(a)) {
                  const l = a;
                  Object.keys(l).forEach(c => {
                    Pv(l[c]).forEach(u => {
                      s.hasOwnProperty(u) || o.add(u)
                    })
                  })
                }
              }), o.size) {
              const a = Ea(o.values());
              t.errors.push(`state("${e.name}", ...) must define default values for all the following style substitutions: ${a.join(", ")}`)
            }
          }
          return {
            type: 0,
            name: e.name,
            style: i,
            options: r ? {
              params: r
            } : null
          }
        }
        visitTransition(e, t) {
          t.queryCount = 0, t.depCount = 0;
          const i = Et(this, Oo(e.animation), t);
          return {
            type: 1,
            matchers: TO(e.expr, t.errors),
            animation: i,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: gi(e.options)
          }
        }
        visitSequence(e, t) {
          return {
            type: 2,
            steps: e.steps.map(i => Et(this, i, t)),
            options: gi(e.options)
          }
        }
        visitGroup(e, t) {
          const i = t.currentTime;
          let r = 0;
          const o = e.steps.map(s => {
            t.currentTime = i;
            const a = Et(this, s, t);
            return r = Math.max(r, t.currentTime), a
          });
          return t.currentTime = r, {
            type: 3,
            steps: o,
            options: gi(e.options)
          }
        }
        visitAnimate(e, t) {
          const i = function (n, e) {
            let t = null;
            if (n.hasOwnProperty("duration")) t = n;
            else if ("number" == typeof n) return Sd(Da(n, e).duration, 0, "");
            const i = n;
            if (i.split(/\s+/).some(o => "{" == o.charAt(0) && "{" == o.charAt(1))) {
              const o = Sd(0, 0, "");
              return o.dynamic = !0, o.strValue = i, o
            }
            return t = t || Da(i, e), Sd(t.duration, t.delay, t.easing)
          }(e.timings, t.errors);
          t.currentAnimateTimings = i;
          let r, o = e.styles ? e.styles : Dt({});
          if (5 == o.type) r = this.visitKeyframes(o, t);
          else {
            let s = e.styles,
              a = !1;
            if (!s) {
              a = !0;
              const c = {};
              i.easing && (c.easing = i.easing), s = Dt(c)
            }
            t.currentTime += i.duration + i.delay;
            const l = this.visitStyle(s, t);
            l.isEmptyStep = a, r = l
          }
          return t.currentAnimateTimings = null, {
            type: 4,
            timings: i,
            style: r,
            options: null
          }
        }
        visitStyle(e, t) {
          const i = this._makeStyleAst(e, t);
          return this._validateStyleAst(i, t), i
        }
        _makeStyleAst(e, t) {
          const i = [];
          Array.isArray(e.styles) ? e.styles.forEach(s => {
            "string" == typeof s ? s == Sn ? i.push(s) : t.errors.push(`The provided style string value ${s} is not allowed.`) : i.push(s)
          }) : i.push(e.styles);
          let r = !1,
            o = null;
          return i.forEach(s => {
            if (Sa(s)) {
              const a = s,
                l = a.easing;
              if (l && (o = l, delete a.easing), !r)
                for (let c in a)
                  if (a[c].toString().indexOf("{{") >= 0) {
                    r = !0;
                    break
                  }
            }
          }), {
            type: 6,
            styles: i,
            easing: o,
            offset: e.offset,
            containsDynamicStyles: r,
            options: null
          }
        }
        _validateStyleAst(e, t) {
          const i = t.currentAnimateTimings;
          let r = t.currentTime,
            o = t.currentTime;
          i && o > 0 && (o -= i.duration + i.delay), e.styles.forEach(s => {
            "string" != typeof s && Object.keys(s).forEach(a => {
              if (!this._driver.validateStyleProperty(a)) return void t.errors.push(`The provided animation property "${a}" is not a supported CSS property for animations`);
              const l = t.collectedStyles[t.currentQuerySelector],
                c = l[a];
              let u = !0;
              c && (o != r && o >= c.startTime && r <= c.endTime && (t.errors.push(`The CSS property "${a}" that exists between the times of "${c.startTime}ms" and "${c.endTime}ms" is also being animated in a parallel animation between the times of "${o}ms" and "${r}ms"`), u = !1), o = c.startTime), u && (l[a] = {
                startTime: o,
                endTime: r
              }), t.options && function (n, e, t) {
                const i = e.params || {},
                  r = Pv(n);
                r.length && r.forEach(o => {
                  i.hasOwnProperty(o) || t.push(`Unable to resolve the local animation param ${o} in the given list of values`)
                })
              }(s[a], t.options, t.errors)
            })
          })
        }
        visitKeyframes(e, t) {
          const i = {
            type: 5,
            styles: [],
            options: null
          };
          if (!t.currentAnimateTimings) return t.errors.push("keyframes() must be placed inside of a call to animate()"), i;
          let o = 0;
          const s = [];
          let a = !1,
            l = !1,
            c = 0;
          const u = e.steps.map(D => {
            const b = this._makeStyleAst(D, t);
            let x = null != b.offset ? b.offset : function (n) {
                if ("string" == typeof n) return null;
                let e = null;
                if (Array.isArray(n)) n.forEach(t => {
                  if (Sa(t) && t.hasOwnProperty("offset")) {
                    const i = t;
                    e = parseFloat(i.offset), delete i.offset
                  }
                });
                else if (Sa(n) && n.hasOwnProperty("offset")) {
                  const t = n;
                  e = parseFloat(t.offset), delete t.offset
                }
                return e
              }(b.styles),
              O = 0;
            return null != x && (o++, O = b.offset = x), l = l || O < 0 || O > 1, a = a || O < c, c = O, s.push(O), b
          });
          l && t.errors.push("Please ensure that all keyframe offsets are between 0 and 1"), a && t.errors.push("Please ensure that all keyframe offsets are in order");
          const f = e.steps.length;
          let m = 0;
          o > 0 && o < f ? t.errors.push("Not all style() steps within the declared keyframes() contain offsets") : 0 == o && (m = 1 / (f - 1));
          const p = f - 1,
            _ = t.currentTime,
            v = t.currentAnimateTimings,
            C = v.duration;
          return u.forEach((D, b) => {
            const x = m > 0 ? b == p ? 1 : m * b : s[b],
              O = x * C;
            t.currentTime = _ + v.delay + O, v.duration = O, this._validateStyleAst(D, t), D.offset = x, i.styles.push(D)
          }), i
        }
        visitReference(e, t) {
          return {
            type: 8,
            animation: Et(this, Oo(e.animation), t),
            options: gi(e.options)
          }
        }
        visitAnimateChild(e, t) {
          return t.depCount++, {
            type: 9,
            options: gi(e.options)
          }
        }
        visitAnimateRef(e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: gi(e.options)
          }
        }
        visitQuery(e, t) {
          const i = t.currentQuerySelector,
            r = e.options || {};
          t.queryCount++, t.currentQuery = e;
          const [o, s] = function (n) {
            const e = !!n.split(/\s*,\s*/).find(t => ":self" == t);
            return e && (n = n.replace(PO, "")), n = n.replace(/@\*/g, wa).replace(/@\w+/g, t => wa + "-" + t.substr(1)).replace(/:animating/g, Dd), [n, e]
          }(e.selector);
          t.currentQuerySelector = i.length ? i + " " + o : o, Mt(t.collectedStyles, t.currentQuerySelector, {});
          const a = Et(this, Oo(e.animation), t);
          return t.currentQuery = null, t.currentQuerySelector = i, {
            type: 11,
            selector: o,
            limit: r.limit || 0,
            optional: !!r.optional,
            includeSelf: s,
            animation: a,
            originalSelector: e.selector,
            options: gi(e.options)
          }
        }
        visitStagger(e, t) {
          t.currentQuery || t.errors.push("stagger() can only be used inside of query()");
          const i = "full" === e.timings ? {
            duration: 0,
            delay: 0,
            easing: "full"
          } : Da(e.timings, t.errors, !0);
          return {
            type: 12,
            animation: Et(this, Oo(e.animation), t),
            timings: i,
            options: null
          }
        }
      }
      class FO {
        constructor(e) {
          this.errors = e, this.queryCount = 0, this.depCount = 0, this.currentTransition = null, this.currentQuery = null, this.currentQuerySelector = null, this.currentAnimateTimings = null, this.currentTime = 0, this.collectedStyles = {}, this.options = null
        }
      }

      function Sa(n) {
        return !Array.isArray(n) && "object" == typeof n
      }

      function gi(n) {
        return n ? (n = Dr(n)).params && (n.params = function (n) {
          return n ? Dr(n) : null
        }(n.params)) : n = {}, n
      }

      function Sd(n, e, t) {
        return {
          duration: n,
          delay: e,
          easing: t
        }
      }

      function Pd(n, e, t, i, r, o, s = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: e,
          preStyleProps: t,
          postStyleProps: i,
          duration: r,
          delay: o,
          totalTime: r + o,
          easing: s,
          subTimeline: a
        }
      }
      class Pa {
        constructor() {
          this._map = new Map
        }
        consume(e) {
          let t = this._map.get(e);
          return t ? this._map.delete(e) : t = [], t
        }
        append(e, t) {
          let i = this._map.get(e);
          i || this._map.set(e, i = []), i.push(...t)
        }
        has(e) {
          return this._map.has(e)
        }
        clear() {
          this._map.clear()
        }
      }
      const jO = new RegExp(":enter", "g"),
        HO = new RegExp(":leave", "g");

      function Od(n, e, t, i, r, o = {}, s = {}, a, l, c = []) {
        return (new zO).buildKeyframes(n, e, t, i, r, o, s, a, l, c)
      }
      class zO {
        buildKeyframes(e, t, i, r, o, s, a, l, c, u = []) {
          c = c || new Pa;
          const f = new Ad(e, t, c, r, o, u, []);
          f.options = l, f.currentTimeline.setStyles([s], null, f.errors, l), Et(this, i, f);
          const m = f.timelines.filter(p => p.containsAnimation());
          if (m.length && Object.keys(a).length) {
            const p = m[m.length - 1];
            p.allowOnlyTimelineStyles() || p.setStyles([a], null, f.errors, l)
          }
          return m.length ? m.map(p => p.buildKeyframes()) : [Pd(t, [], [], [], 0, 0, "", !1)]
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
          const i = t.subInstructions.consume(t.element);
          if (i) {
            const r = t.createSubContext(e.options),
              o = t.currentTimeline.currentTime,
              s = this._visitSubInstructions(i, r, r.options);
            o != s && t.transformIntoNewTimeline(s)
          }
          t.previousNode = e
        }
        visitAnimateRef(e, t) {
          const i = t.createSubContext(e.options);
          i.transformIntoNewTimeline(), this.visitReference(e.animation, i), t.transformIntoNewTimeline(i.currentTimeline.currentTime), t.previousNode = e
        }
        _visitSubInstructions(e, t, i) {
          let o = t.currentTimeline.currentTime;
          const s = null != i.duration ? mi(i.duration) : null,
            a = null != i.delay ? mi(i.delay) : null;
          return 0 !== s && e.forEach(l => {
            const c = t.appendInstructionToTimeline(l, s, a);
            o = Math.max(o, c.duration + c.delay)
          }), o
        }
        visitReference(e, t) {
          t.updateOptions(e.options, !0), Et(this, e.animation, t), t.previousNode = e
        }
        visitSequence(e, t) {
          const i = t.subContextCount;
          let r = t;
          const o = e.options;
          if (o && (o.params || o.delay) && (r = t.createSubContext(o), r.transformIntoNewTimeline(), null != o.delay)) {
            6 == r.previousNode.type && (r.currentTimeline.snapshotCurrentStyles(), r.previousNode = Oa);
            const s = mi(o.delay);
            r.delayNextStep(s)
          }
          e.steps.length && (e.steps.forEach(s => Et(this, s, r)), r.currentTimeline.applyStylesToKeyframe(), r.subContextCount > i && r.transformIntoNewTimeline()), t.previousNode = e
        }
        visitGroup(e, t) {
          const i = [];
          let r = t.currentTimeline.currentTime;
          const o = e.options && e.options.delay ? mi(e.options.delay) : 0;
          e.steps.forEach(s => {
            const a = t.createSubContext(e.options);
            o && a.delayNextStep(o), Et(this, s, a), r = Math.max(r, a.currentTimeline.currentTime), i.push(a.currentTimeline)
          }), i.forEach(s => t.currentTimeline.mergeTimelineCollectedStyles(s)), t.transformIntoNewTimeline(r), t.previousNode = e
        }
        _visitTiming(e, t) {
          if (e.dynamic) {
            const i = e.strValue;
            return Da(t.params ? Ma(i, t.params, t.errors) : i, t.errors)
          }
          return {
            duration: e.duration,
            delay: e.delay,
            easing: e.easing
          }
        }
        visitAnimate(e, t) {
          const i = t.currentAnimateTimings = this._visitTiming(e.timings, t),
            r = t.currentTimeline;
          i.delay && (t.incrementTime(i.delay), r.snapshotCurrentStyles());
          const o = e.style;
          5 == o.type ? this.visitKeyframes(o, t) : (t.incrementTime(i.duration), this.visitStyle(o, t), r.applyStylesToKeyframe()), t.currentAnimateTimings = null, t.previousNode = e
        }
        visitStyle(e, t) {
          const i = t.currentTimeline,
            r = t.currentAnimateTimings;
          !r && i.getCurrentStyleProperties().length && i.forwardFrame();
          const o = r && r.easing || e.easing;
          e.isEmptyStep ? i.applyEmptyStep(o) : i.setStyles(e.styles, o, t.errors, t.options), t.previousNode = e
        }
        visitKeyframes(e, t) {
          const i = t.currentAnimateTimings,
            r = t.currentTimeline.duration,
            o = i.duration,
            a = t.createSubContext().currentTimeline;
          a.easing = i.easing, e.styles.forEach(l => {
            a.forwardTime((l.offset || 0) * o), a.setStyles(l.styles, l.easing, t.errors, t.options), a.applyStylesToKeyframe()
          }), t.currentTimeline.mergeTimelineCollectedStyles(a), t.transformIntoNewTimeline(r + o), t.previousNode = e
        }
        visitQuery(e, t) {
          const i = t.currentTimeline.currentTime,
            r = e.options || {},
            o = r.delay ? mi(r.delay) : 0;
          o && (6 === t.previousNode.type || 0 == i && t.currentTimeline.getCurrentStyleProperties().length) && (t.currentTimeline.snapshotCurrentStyles(), t.previousNode = Oa);
          let s = i;
          const a = t.invokeQuery(e.selector, e.originalSelector, e.limit, e.includeSelf, !!r.optional, t.errors);
          t.currentQueryTotal = a.length;
          let l = null;
          a.forEach((c, u) => {
            t.currentQueryIndex = u;
            const f = t.createSubContext(e.options, c);
            o && f.delayNextStep(o), c === t.element && (l = f.currentTimeline), Et(this, e.animation, f), f.currentTimeline.applyStylesToKeyframe(), s = Math.max(s, f.currentTimeline.currentTime)
          }), t.currentQueryIndex = 0, t.currentQueryTotal = 0, t.transformIntoNewTimeline(s), l && (t.currentTimeline.mergeTimelineCollectedStyles(l), t.currentTimeline.snapshotCurrentStyles()), t.previousNode = e
        }
        visitStagger(e, t) {
          const i = t.parentContext,
            r = t.currentTimeline,
            o = e.timings,
            s = Math.abs(o.duration),
            a = s * (t.currentQueryTotal - 1);
          let l = s * t.currentQueryIndex;
          switch (o.duration < 0 ? "reverse" : o.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = i.currentStaggerTime
          }
          const u = t.currentTimeline;
          l && u.delayNextStep(l);
          const f = u.currentTime;
          Et(this, e.animation, t), t.previousNode = e, i.currentStaggerTime = r.currentTime - f + (r.startTime - i.currentTimeline.startTime)
        }
      }
      const Oa = {};
      class Ad {
        constructor(e, t, i, r, o, s, a, l) {
          this._driver = e, this.element = t, this.subInstructions = i, this._enterClassName = r, this._leaveClassName = o, this.errors = s, this.timelines = a, this.parentContext = null, this.currentAnimateTimings = null, this.previousNode = Oa, this.subContextCount = 0, this.options = {}, this.currentQueryIndex = 0, this.currentQueryTotal = 0, this.currentStaggerTime = 0, this.currentTimeline = l || new Aa(this._driver, t, 0), a.push(this.currentTimeline)
        }
        get params() {
          return this.options.params
        }
        updateOptions(e, t) {
          if (!e) return;
          const i = e;
          let r = this.options;
          null != i.duration && (r.duration = mi(i.duration)), null != i.delay && (r.delay = mi(i.delay));
          const o = i.params;
          if (o) {
            let s = r.params;
            s || (s = this.options.params = {}), Object.keys(o).forEach(a => {
              (!t || !s.hasOwnProperty(a)) && (s[a] = Ma(o[a], s, this.errors))
            })
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const i = e.params = {};
              Object.keys(t).forEach(r => {
                i[r] = t[r]
              })
            }
          }
          return e
        }
        createSubContext(e = null, t, i) {
          const r = t || this.element,
            o = new Ad(this._driver, r, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(r, i || 0));
          return o.previousNode = this.previousNode, o.currentAnimateTimings = this.currentAnimateTimings, o.options = this._copyOptions(), o.updateOptions(e), o.currentQueryIndex = this.currentQueryIndex, o.currentQueryTotal = this.currentQueryTotal, o.parentContext = this, this.subContextCount++, o
        }
        transformIntoNewTimeline(e) {
          return this.previousNode = Oa, this.currentTimeline = this.currentTimeline.fork(this.element, e), this.timelines.push(this.currentTimeline), this.currentTimeline
        }
        appendInstructionToTimeline(e, t, i) {
          const r = {
              duration: null != t ? t : e.duration,
              delay: this.currentTimeline.currentTime + (null != i ? i : 0) + e.delay,
              easing: ""
            },
            o = new $O(this._driver, e.element, e.keyframes, e.preStyleProps, e.postStyleProps, r, e.stretchStartingKeyframe);
          return this.timelines.push(o), r
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e)
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e)
        }
        invokeQuery(e, t, i, r, o, s) {
          let a = [];
          if (r && a.push(this.element), e.length > 0) {
            e = (e = e.replace(jO, "." + this._enterClassName)).replace(HO, "." + this._leaveClassName);
            let c = this._driver.query(this.element, e, 1 != i);
            0 !== i && (c = i < 0 ? c.slice(c.length + i, c.length) : c.slice(0, i)), a.push(...c)
          }
          return !o && 0 == a.length && s.push(`\`query("${t}")\` returned zero elements. (Use \`query("${t}", { optional: true })\` if you wish to allow this.)`), a
        }
      }
      class Aa {
        constructor(e, t, i, r) {
          this._driver = e, this.element = t, this.startTime = i, this._elementTimelineStylesLookup = r, this.duration = 0, this._previousKeyframe = {}, this._currentKeyframe = {}, this._keyframes = new Map, this._styleSummary = {}, this._pendingStyles = {}, this._backFill = {}, this._currentEmptyStepKeyframe = null, this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map), this._localTimelineStyles = Object.create(this._backFill, {}), this._globalTimelineStyles = this._elementTimelineStylesLookup.get(t), this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, this._elementTimelineStylesLookup.set(t, this._localTimelineStyles)), this._loadKeyframe()
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe)
        }
        get currentTime() {
          return this.startTime + this.duration
        }
        delayNextStep(e) {
          const t = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
          this.duration || t ? (this.forwardTime(this.currentTime + e), t && this.snapshotCurrentStyles()) : this.startTime += e
        }
        fork(e, t) {
          return this.applyStylesToKeyframe(), new Aa(this._driver, e, t || this.currentTime, this._elementTimelineStylesLookup)
        }
        _loadKeyframe() {
          this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe), this._currentKeyframe = this._keyframes.get(this.duration), this._currentKeyframe || (this._currentKeyframe = Object.create(this._backFill, {}), this._keyframes.set(this.duration, this._currentKeyframe))
        }
        forwardFrame() {
          this.duration += 1, this._loadKeyframe()
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(), this.duration = e, this._loadKeyframe()
        }
        _updateStyle(e, t) {
          this._localTimelineStyles[e] = t, this._globalTimelineStyles[e] = t, this._styleSummary[e] = {
            time: this.currentTime,
            value: t
          }
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe
        }
        applyEmptyStep(e) {
          e && (this._previousKeyframe.easing = e), Object.keys(this._globalTimelineStyles).forEach(t => {
            this._backFill[t] = this._globalTimelineStyles[t] || Sn, this._currentKeyframe[t] = Sn
          }), this._currentEmptyStepKeyframe = this._currentKeyframe
        }
        setStyles(e, t, i, r) {
          t && (this._previousKeyframe.easing = t);
          const o = r && r.params || {},
            s = function (n, e) {
              const t = {};
              let i;
              return n.forEach(r => {
                "*" === r ? (i = i || Object.keys(e), i.forEach(o => {
                  t[o] = Sn
                })) : Kn(r, !1, t)
              }), t
            }(e, this._globalTimelineStyles);
          Object.keys(s).forEach(a => {
            const l = Ma(s[a], o, i);
            this._pendingStyles[a] = l, this._localTimelineStyles.hasOwnProperty(a) || (this._backFill[a] = this._globalTimelineStyles.hasOwnProperty(a) ? this._globalTimelineStyles[a] : Sn), this._updateStyle(a, l)
          })
        }
        applyStylesToKeyframe() {
          const e = this._pendingStyles,
            t = Object.keys(e);
          0 != t.length && (this._pendingStyles = {}, t.forEach(i => {
            this._currentKeyframe[i] = e[i]
          }), Object.keys(this._localTimelineStyles).forEach(i => {
            this._currentKeyframe.hasOwnProperty(i) || (this._currentKeyframe[i] = this._localTimelineStyles[i])
          }))
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach(e => {
            const t = this._localTimelineStyles[e];
            this._pendingStyles[e] = t, this._updateStyle(e, t)
          })
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration)
        }
        get properties() {
          const e = [];
          for (let t in this._currentKeyframe) e.push(t);
          return e
        }
        mergeTimelineCollectedStyles(e) {
          Object.keys(e._styleSummary).forEach(t => {
            const i = this._styleSummary[t],
              r = e._styleSummary[t];
            (!i || r.time > i.time) && this._updateStyle(t, r.value)
          })
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set,
            t = new Set,
            i = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((a, l) => {
            const c = Kn(a, !0);
            Object.keys(c).forEach(u => {
              const f = c[u];
              "!" == f ? e.add(u) : f == Sn && t.add(u)
            }), i || (c.offset = l / this.duration), r.push(c)
          });
          const o = e.size ? Ea(e.values()) : [],
            s = t.size ? Ea(t.values()) : [];
          if (i) {
            const a = r[0],
              l = Dr(a);
            a.offset = 0, l.offset = 1, r = [a, l]
          }
          return Pd(this.element, r, o, s, this.duration, this.startTime, this.easing, !1)
        }
      }
      class $O extends Aa {
        constructor(e, t, i, r, o, s, a = !1) {
          super(e, t, s.delay), this.keyframes = i, this.preStyleProps = r, this.postStyleProps = o, this._stretchStartingKeyframe = a, this.timings = {
            duration: s.duration,
            delay: s.delay,
            easing: s.easing
          }
        }
        containsAnimation() {
          return this.keyframes.length > 1
        }
        buildKeyframes() {
          let e = this.keyframes,
            {
              delay: t,
              duration: i,
              easing: r
            } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const o = [],
              s = i + t,
              a = t / s,
              l = Kn(e[0], !1);
            l.offset = 0, o.push(l);
            const c = Kn(e[0], !1);
            c.offset = Nv(a), o.push(c);
            const u = e.length - 1;
            for (let f = 1; f <= u; f++) {
              let m = Kn(e[f], !1);
              m.offset = Nv((t + m.offset * i) / s), o.push(m)
            }
            i = s, t = 0, r = "", e = o
          }
          return Pd(this.element, e, this.preStyleProps, this.postStyleProps, i, t, r, !0)
        }
      }

      function Nv(n, e = 3) {
        const t = Math.pow(10, e - 1);
        return Math.round(n * t) / t
      }
      class Id {}
      class GO extends Id {
        normalizePropertyName(e, t) {
          return xd(e)
        }
        normalizeStyleValue(e, t, i, r) {
          let o = "";
          const s = i.toString().trim();
          if (WO[t] && 0 !== i && "0" !== i)
            if ("number" == typeof i) o = "px";
            else {
              const a = i.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a && 0 == a[1].length && r.push(`Please provide a CSS unit value for ${e}:${i}`)
            } return s + o
        }
      }
      const WO = (() => function (n) {
        const e = {};
        return n.forEach(t => e[t] = !0), e
      }("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(",")))();

      function Lv(n, e, t, i, r, o, s, a, l, c, u, f, m) {
        return {
          type: 0,
          element: n,
          triggerName: e,
          isRemovalTransition: r,
          fromState: t,
          fromStyles: o,
          toState: i,
          toStyles: s,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: f,
          errors: m
        }
      }
      const Fd = {};
      class Bv {
        constructor(e, t, i) {
          this._triggerName = e, this.ast = t, this._stateStyles = i
        }
        match(e, t, i, r) {
          return function (n, e, t, i, r) {
            return n.some(o => o(e, t, i, r))
          }(this.ast.matchers, e, t, i, r)
        }
        buildStyles(e, t, i) {
          const r = this._stateStyles["*"],
            o = this._stateStyles[e],
            s = r ? r.buildStyles(t, i) : {};
          return o ? o.buildStyles(t, i) : s
        }
        build(e, t, i, r, o, s, a, l, c, u) {
          const f = [],
            m = this.ast.options && this.ast.options.params || Fd,
            _ = this.buildStyles(i, a && a.params || Fd, f),
            v = l && l.params || Fd,
            C = this.buildStyles(r, v, f),
            D = new Set,
            b = new Map,
            x = new Map,
            O = "void" === r,
            G = {
              params: te(te({}, m), v)
            },
            pe = u ? [] : Od(e, t, this.ast.animation, o, s, _, C, G, c, f);
          let De = 0;
          if (pe.forEach(Tt => {
              De = Math.max(Tt.duration + Tt.delay, De)
            }), f.length) return Lv(t, this._triggerName, i, r, O, _, C, [], [], b, x, De, f);
          pe.forEach(Tt => {
            const kt = Tt.element,
              xr = Mt(b, kt, {});
            Tt.preStyleProps.forEach(on => xr[on] = !0);
            const Pn = Mt(x, kt, {});
            Tt.postStyleProps.forEach(on => Pn[on] = !0), kt !== t && D.add(kt)
          });
          const xt = Ea(D.values());
          return Lv(t, this._triggerName, i, r, O, _, C, pe, xt, b, x, De)
        }
      }
      class YO {
        constructor(e, t, i) {
          this.styles = e, this.defaultParams = t, this.normalizer = i
        }
        buildStyles(e, t) {
          const i = {},
            r = Dr(this.defaultParams);
          return Object.keys(e).forEach(o => {
            const s = e[o];
            null != s && (r[o] = s)
          }), this.styles.styles.forEach(o => {
            if ("string" != typeof o) {
              const s = o;
              Object.keys(s).forEach(a => {
                let l = s[a];
                l.length > 1 && (l = Ma(l, r, t));
                const c = this.normalizer.normalizePropertyName(a, t);
                l = this.normalizer.normalizeStyleValue(a, c, l, t), i[c] = l
              })
            }
          }), i
        }
      }
      class ZO {
        constructor(e, t, i) {
          this.name = e, this.ast = t, this._normalizer = i, this.transitionFactories = [], this.states = {}, t.states.forEach(r => {
            this.states[r.name] = new YO(r.style, r.options && r.options.params || {}, i)
          }), jv(this.states, "true", "1"), jv(this.states, "false", "0"), t.transitions.forEach(r => {
            this.transitionFactories.push(new Bv(e, r, this.states))
          }), this.fallbackTransition = function (n, e, t) {
            return new Bv(n, {
              type: 1,
              animation: {
                type: 2,
                steps: [],
                options: null
              },
              matchers: [(s, a) => !0],
              options: null,
              queryCount: 0,
              depCount: 0
            }, e)
          }(e, this.states)
        }
        get containsQueries() {
          return this.ast.queryCount > 0
        }
        matchTransition(e, t, i, r) {
          return this.transitionFactories.find(s => s.match(e, t, i, r)) || null
        }
        matchStyles(e, t, i) {
          return this.fallbackTransition.buildStyles(e, t, i)
        }
      }

      function jv(n, e, t) {
        n.hasOwnProperty(e) ? n.hasOwnProperty(t) || (n[t] = n[e]) : n.hasOwnProperty(t) && (n[e] = n[t])
      }
      const JO = new Pa;
      class eA {
        constructor(e, t, i) {
          this.bodyNode = e, this._driver = t, this._normalizer = i, this._animations = {}, this._playersById = {}, this.players = []
        }
        register(e, t) {
          const i = [],
            r = kd(this._driver, t, i);
          if (i.length) throw new Error(`Unable to build the animation due to the following errors: ${i.join("\n")}`);
          this._animations[e] = r
        }
        _buildPlayer(e, t, i) {
          const r = e.element,
            o = yv(0, this._normalizer, 0, e.keyframes, t, i);
          return this._driver.animate(r, o, e.duration, e.delay, e.easing, [], !0)
        }
        create(e, t, i = {}) {
          const r = [],
            o = this._animations[e];
          let s;
          const a = new Map;
          if (o ? (s = Od(this._driver, t, o, wd, ba, {}, {}, i, JO, r), s.forEach(u => {
              const f = Mt(a, u.element, {});
              u.postStyleProps.forEach(m => f[m] = null)
            })) : (r.push("The requested animation doesn't exist or has already been destroyed"), s = []), r.length) throw new Error(`Unable to create the animation due to the following errors: ${r.join("\n")}`);
          a.forEach((u, f) => {
            Object.keys(u).forEach(m => {
              u[m] = this._driver.computeStyle(f, m, Sn)
            })
          });
          const c = qn(s.map(u => {
            const f = a.get(u.element);
            return this._buildPlayer(u, {}, f)
          }));
          return this._playersById[e] = c, c.onDestroy(() => this.destroy(e)), this.players.push(c), c
        }
        destroy(e) {
          const t = this._getPlayer(e);
          t.destroy(), delete this._playersById[e];
          const i = this.players.indexOf(t);
          i >= 0 && this.players.splice(i, 1)
        }
        _getPlayer(e) {
          const t = this._playersById[e];
          if (!t) throw new Error(`Unable to find the timeline player referenced by ${e}`);
          return t
        }
        listen(e, t, i, r) {
          const o = md(t, "", "", "");
          return hd(this._getPlayer(e), i, o, r), () => {}
        }
        command(e, t, i, r) {
          if ("register" == i) return void this.register(e, r[0]);
          if ("create" == i) return void this.create(e, t, r[0] || {});
          const o = this._getPlayer(e);
          switch (i) {
            case "play":
              o.play();
              break;
            case "pause":
              o.pause();
              break;
            case "reset":
              o.reset();
              break;
            case "restart":
              o.restart();
              break;
            case "finish":
              o.finish();
              break;
            case "init":
              o.init();
              break;
            case "setPosition":
              o.setPosition(parseFloat(r[0]));
              break;
            case "destroy":
              this.destroy(e)
          }
        }
      }
      const Vv = "ng-animate-queued",
        Hv = "ng-animate-disabled",
        zv = ".ng-animate-disabled",
        rA = [],
        $v = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1
        },
        oA = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0
        },
        Ht = "__ng_removed";
      class Rd {
        constructor(e, t = "") {
          this.namespaceId = t;
          const i = e && e.hasOwnProperty("value");
          if (this.value = null != (n = i ? e.value : e) ? n : null, i) {
            const o = Dr(e);
            delete o.value, this.options = o
          } else this.options = {};
          var n;
          this.options.params || (this.options.params = {})
        }
        get params() {
          return this.options.params
        }
        absorbOptions(e) {
          const t = e.params;
          if (t) {
            const i = this.options.params;
            Object.keys(t).forEach(r => {
              null == i[r] && (i[r] = t[r])
            })
          }
        }
      }
      const Ao = "void",
        Nd = new Rd(Ao);
      class sA {
        constructor(e, t, i) {
          this.id = e, this.hostElement = t, this._engine = i, this.players = [], this._triggers = {}, this._queue = [], this._elementListeners = new Map, this._hostClassName = "ng-tns-" + e, zt(t, this._hostClassName)
        }
        listen(e, t, i, r) {
          if (!this._triggers.hasOwnProperty(t)) throw new Error(`Unable to listen on the animation trigger event "${i}" because the animation trigger "${t}" doesn't exist!`);
          if (null == i || 0 == i.length) throw new Error(`Unable to listen on the animation trigger "${t}" because the provided event is undefined!`);
          if ("start" != (n = i) && "done" != n) throw new Error(`The provided animation trigger event "${i}" for the animation trigger "${t}" is not supported!`);
          var n;
          const o = Mt(this._elementListeners, e, []),
            s = {
              name: t,
              phase: i,
              callback: r
            };
          o.push(s);
          const a = Mt(this._engine.statesByElement, e, {});
          return a.hasOwnProperty(t) || (zt(e, Ca), zt(e, Ca + "-" + t), a[t] = Nd), () => {
            this._engine.afterFlush(() => {
              const l = o.indexOf(s);
              l >= 0 && o.splice(l, 1), this._triggers[t] || delete a[t]
            })
          }
        }
        register(e, t) {
          return !this._triggers[e] && (this._triggers[e] = t, !0)
        }
        _getTrigger(e) {
          const t = this._triggers[e];
          if (!t) throw new Error(`The provided animation trigger "${e}" has not been registered!`);
          return t
        }
        trigger(e, t, i, r = !0) {
          const o = this._getTrigger(t),
            s = new Ld(this.id, t, e);
          let a = this._engine.statesByElement.get(e);
          a || (zt(e, Ca), zt(e, Ca + "-" + t), this._engine.statesByElement.set(e, a = {}));
          let l = a[t];
          const c = new Rd(i, this.id);
          if (!(i && i.hasOwnProperty("value")) && l && c.absorbOptions(l.options), a[t] = c, l || (l = Nd), c.value !== Ao && l.value === c.value) {
            if (! function (n, e) {
                const t = Object.keys(n),
                  i = Object.keys(e);
                if (t.length != i.length) return !1;
                for (let r = 0; r < t.length; r++) {
                  const o = t[r];
                  if (!e.hasOwnProperty(o) || n[o] !== e[o]) return !1
                }
                return !0
              }(l.params, c.params)) {
              const v = [],
                C = o.matchStyles(l.value, l.params, v),
                D = o.matchStyles(c.value, c.params, v);
              v.length ? this._engine.reportError(v) : this._engine.afterFlush(() => {
                pi(e, C), _n(e, D)
              })
            }
            return
          }
          const m = Mt(this._engine.playersByElement, e, []);
          m.forEach(v => {
            v.namespaceId == this.id && v.triggerName == t && v.queued && v.destroy()
          });
          let p = o.matchTransition(l.value, c.value, e, c.params),
            _ = !1;
          if (!p) {
            if (!r) return;
            p = o.fallbackTransition, _ = !0
          }
          return this._engine.totalQueuedPlayers++, this._queue.push({
            element: e,
            triggerName: t,
            transition: p,
            fromState: l,
            toState: c,
            player: s,
            isFallbackTransition: _
          }), _ || (zt(e, Vv), s.onStart(() => {
            Mr(e, Vv)
          })), s.onDone(() => {
            let v = this.players.indexOf(s);
            v >= 0 && this.players.splice(v, 1);
            const C = this._engine.playersByElement.get(e);
            if (C) {
              let D = C.indexOf(s);
              D >= 0 && C.splice(D, 1)
            }
          }), this.players.push(s), m.push(s), s
        }
        deregister(e) {
          delete this._triggers[e], this._engine.statesByElement.forEach((t, i) => {
            delete t[e]
          }), this._elementListeners.forEach((t, i) => {
            this._elementListeners.set(i, t.filter(r => r.name != e))
          })
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e), this._elementListeners.delete(e);
          const t = this._engine.playersByElement.get(e);
          t && (t.forEach(i => i.destroy()), this._engine.playersByElement.delete(e))
        }
        _signalRemovalForInnerTriggers(e, t) {
          const i = this._engine.driver.query(e, wa, !0);
          i.forEach(r => {
            if (r[Ht]) return;
            const o = this._engine.fetchNamespacesByElement(r);
            o.size ? o.forEach(s => s.triggerLeaveAnimation(r, t, !1, !0)) : this.clearElementCache(r)
          }), this._engine.afterFlushAnimationsDone(() => i.forEach(r => this.clearElementCache(r)))
        }
        triggerLeaveAnimation(e, t, i, r) {
          const o = this._engine.statesByElement.get(e);
          if (o) {
            const s = [];
            if (Object.keys(o).forEach(a => {
                if (this._triggers[a]) {
                  const l = this.trigger(e, a, Ao, r);
                  l && s.push(l)
                }
              }), s.length) return this._engine.markElementAsRemoved(this.id, e, !0, t), i && qn(s).onDone(() => this._engine.processLeaveNode(e)), !0
          }
          return !1
        }
        prepareLeaveAnimationListeners(e) {
          const t = this._elementListeners.get(e),
            i = this._engine.statesByElement.get(e);
          if (t && i) {
            const r = new Set;
            t.forEach(o => {
              const s = o.name;
              if (r.has(s)) return;
              r.add(s);
              const l = this._triggers[s].fallbackTransition,
                c = i[s] || Nd,
                u = new Rd(Ao),
                f = new Ld(this.id, s, e);
              this._engine.totalQueuedPlayers++, this._queue.push({
                element: e,
                triggerName: s,
                transition: l,
                fromState: c,
                toState: u,
                player: f,
                isFallbackTransition: !0
              })
            })
          }
        }
        removeNode(e, t) {
          const i = this._engine;
          if (e.childElementCount && this._signalRemovalForInnerTriggers(e, t), this.triggerLeaveAnimation(e, t, !0)) return;
          let r = !1;
          if (i.totalAnimations) {
            const o = i.players.length ? i.playersByQueriedElement.get(e) : [];
            if (o && o.length) r = !0;
            else {
              let s = e;
              for (; s = s.parentNode;)
                if (i.statesByElement.get(s)) {
                  r = !0;
                  break
                }
            }
          }
          if (this.prepareLeaveAnimationListeners(e), r) i.markElementAsRemoved(this.id, e, !1, t);
          else {
            const o = e[Ht];
            (!o || o === $v) && (i.afterFlush(() => this.clearElementCache(e)), i.destroyInnerAnimations(e), i._onRemovalComplete(e, t))
          }
        }
        insertNode(e, t) {
          zt(e, this._hostClassName)
        }
        drainQueuedTransitions(e) {
          const t = [];
          return this._queue.forEach(i => {
            const r = i.player;
            if (r.destroyed) return;
            const o = i.element,
              s = this._elementListeners.get(o);
            s && s.forEach(a => {
              if (a.name == i.triggerName) {
                const l = md(o, i.triggerName, i.fromState.value, i.toState.value);
                l._data = e, hd(i.player, a.phase, l, a.callback)
              }
            }), r.markedForDestroy ? this._engine.afterFlush(() => {
              r.destroy()
            }) : t.push(i)
          }), this._queue = [], t.sort((i, r) => {
            const o = i.transition.ast.depCount,
              s = r.transition.ast.depCount;
            return 0 == o || 0 == s ? o - s : this._engine.driver.containsElement(i.element, r.element) ? 1 : -1
          })
        }
        destroy(e) {
          this.players.forEach(t => t.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, e)
        }
        elementContainsData(e) {
          let t = !1;
          return this._elementListeners.has(e) && (t = !0), t = !!this._queue.find(i => i.element === e) || t, t
        }
      }
      class aA {
        constructor(e, t, i) {
          this.bodyNode = e, this.driver = t, this._normalizer = i, this.players = [], this.newHostElements = new Map, this.playersByElement = new Map, this.playersByQueriedElement = new Map, this.statesByElement = new Map, this.disabledNodes = new Set, this.totalAnimations = 0, this.totalQueuedPlayers = 0, this._namespaceLookup = {}, this._namespaceList = [], this._flushFns = [], this._whenQuietFns = [], this.namespacesByHostElement = new Map, this.collectedEnterElements = [], this.collectedLeaveElements = [], this.onRemovalComplete = (r, o) => {}
        }
        _onRemovalComplete(e, t) {
          this.onRemovalComplete(e, t)
        }
        get queuedPlayers() {
          const e = [];
          return this._namespaceList.forEach(t => {
            t.players.forEach(i => {
              i.queued && e.push(i)
            })
          }), e
        }
        createNamespace(e, t) {
          const i = new sA(e, t, this);
          return this.bodyNode && this.driver.containsElement(this.bodyNode, t) ? this._balanceNamespaceList(i, t) : (this.newHostElements.set(t, i), this.collectEnterElement(t)), this._namespaceLookup[e] = i
        }
        _balanceNamespaceList(e, t) {
          const i = this._namespaceList.length - 1;
          if (i >= 0) {
            let r = !1;
            for (let o = i; o >= 0; o--)
              if (this.driver.containsElement(this._namespaceList[o].hostElement, t)) {
                this._namespaceList.splice(o + 1, 0, e), r = !0;
                break
              } r || this._namespaceList.splice(0, 0, e)
          } else this._namespaceList.push(e);
          return this.namespacesByHostElement.set(t, e), e
        }
        register(e, t) {
          let i = this._namespaceLookup[e];
          return i || (i = this.createNamespace(e, t)), i
        }
        registerTrigger(e, t, i) {
          let r = this._namespaceLookup[e];
          r && r.register(t, i) && this.totalAnimations++
        }
        destroy(e, t) {
          if (!e) return;
          const i = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(i.hostElement), delete this._namespaceLookup[e];
            const r = this._namespaceList.indexOf(i);
            r >= 0 && this._namespaceList.splice(r, 1)
          }), this.afterFlushAnimationsDone(() => i.destroy(t))
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e]
        }
        fetchNamespacesByElement(e) {
          const t = new Set,
            i = this.statesByElement.get(e);
          if (i) {
            const r = Object.keys(i);
            for (let o = 0; o < r.length; o++) {
              const s = i[r[o]].namespaceId;
              if (s) {
                const a = this._fetchNamespace(s);
                a && t.add(a)
              }
            }
          }
          return t
        }
        trigger(e, t, i, r) {
          if (Ia(t)) {
            const o = this._fetchNamespace(e);
            if (o) return o.trigger(t, i, r), !0
          }
          return !1
        }
        insertNode(e, t, i, r) {
          if (!Ia(t)) return;
          const o = t[Ht];
          if (o && o.setForRemoval) {
            o.setForRemoval = !1, o.setForMove = !0;
            const s = this.collectedLeaveElements.indexOf(t);
            s >= 0 && this.collectedLeaveElements.splice(s, 1)
          }
          if (e) {
            const s = this._fetchNamespace(e);
            s && s.insertNode(t, i)
          }
          r && this.collectEnterElement(t)
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e)
        }
        markElementAsDisabled(e, t) {
          t ? this.disabledNodes.has(e) || (this.disabledNodes.add(e), zt(e, Hv)) : this.disabledNodes.has(e) && (this.disabledNodes.delete(e), Mr(e, Hv))
        }
        removeNode(e, t, i, r) {
          if (Ia(t)) {
            const o = e ? this._fetchNamespace(e) : null;
            if (o ? o.removeNode(t, r) : this.markElementAsRemoved(e, t, !1, r), i) {
              const s = this.namespacesByHostElement.get(t);
              s && s.id !== e && s.removeNode(t, r)
            }
          } else this._onRemovalComplete(t, r)
        }
        markElementAsRemoved(e, t, i, r) {
          this.collectedLeaveElements.push(t), t[Ht] = {
            namespaceId: e,
            setForRemoval: r,
            hasAnimation: i,
            removedBeforeQueried: !1
          }
        }
        listen(e, t, i, r, o) {
          return Ia(t) ? this._fetchNamespace(e).listen(t, i, r, o) : () => {}
        }
        _buildInstruction(e, t, i, r, o) {
          return e.transition.build(this.driver, e.element, e.fromState.value, e.toState.value, i, r, e.fromState.options, e.toState.options, t, o)
        }
        destroyInnerAnimations(e) {
          let t = this.driver.query(e, wa, !0);
          t.forEach(i => this.destroyActiveAnimationsForElement(i)), 0 != this.playersByQueriedElement.size && (t = this.driver.query(e, Dd, !0), t.forEach(i => this.finishActiveQueriedAnimationOnElement(i)))
        }
        destroyActiveAnimationsForElement(e) {
          const t = this.playersByElement.get(e);
          t && t.forEach(i => {
            i.queued ? i.markedForDestroy = !0 : i.destroy()
          })
        }
        finishActiveQueriedAnimationOnElement(e) {
          const t = this.playersByQueriedElement.get(e);
          t && t.forEach(i => i.finish())
        }
        whenRenderingDone() {
          return new Promise(e => {
            if (this.players.length) return qn(this.players).onDone(() => e());
            e()
          })
        }
        processLeaveNode(e) {
          const t = e[Ht];
          if (t && t.setForRemoval) {
            if (e[Ht] = $v, t.namespaceId) {
              this.destroyInnerAnimations(e);
              const i = this._fetchNamespace(t.namespaceId);
              i && i.clearElementCache(e)
            }
            this._onRemovalComplete(e, t.setForRemoval)
          }
          this.driver.matchesElement(e, zv) && this.markElementAsDisabled(e, !1), this.driver.query(e, zv, !0).forEach(i => {
            this.markElementAsDisabled(i, !1)
          })
        }
        flush(e = -1) {
          let t = [];
          if (this.newHostElements.size && (this.newHostElements.forEach((i, r) => this._balanceNamespaceList(i, r)), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length)
            for (let i = 0; i < this.collectedEnterElements.length; i++) zt(this.collectedEnterElements[i], "ng-star-inserted");
          if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
            const i = [];
            try {
              t = this._flushAnimations(i, e)
            } finally {
              for (let r = 0; r < i.length; r++) i[r]()
            }
          } else
            for (let i = 0; i < this.collectedLeaveElements.length; i++) this.processLeaveNode(this.collectedLeaveElements[i]);
          if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, this._flushFns.forEach(i => i()), this._flushFns = [], this._whenQuietFns.length) {
            const i = this._whenQuietFns;
            this._whenQuietFns = [], t.length ? qn(t).onDone(() => {
              i.forEach(r => r())
            }) : i.forEach(r => r())
          }
        }
        reportError(e) {
          throw new Error(`Unable to process animations due to the following failed trigger transitions\n ${e.join("\n")}`)
        }
        _flushAnimations(e, t) {
          const i = new Pa,
            r = [],
            o = new Map,
            s = [],
            a = new Map,
            l = new Map,
            c = new Map,
            u = new Set;
          this.disabledNodes.forEach(S => {
            u.add(S);
            const A = this.driver.query(S, ".ng-animate-queued", !0);
            for (let L = 0; L < A.length; L++) u.add(A[L])
          });
          const f = this.bodyNode,
            m = Array.from(this.statesByElement.keys()),
            p = Wv(m, this.collectedEnterElements),
            _ = new Map;
          let v = 0;
          p.forEach((S, A) => {
            const L = wd + v++;
            _.set(A, L), S.forEach(X => zt(X, L))
          });
          const C = [],
            D = new Set,
            b = new Set;
          for (let S = 0; S < this.collectedLeaveElements.length; S++) {
            const A = this.collectedLeaveElements[S],
              L = A[Ht];
            L && L.setForRemoval && (C.push(A), D.add(A), L.hasAnimation ? this.driver.query(A, ".ng-star-inserted", !0).forEach(X => D.add(X)) : b.add(A))
          }
          const x = new Map,
            O = Wv(m, Array.from(D));
          O.forEach((S, A) => {
            const L = ba + v++;
            x.set(A, L), S.forEach(X => zt(X, L))
          }), e.push(() => {
            p.forEach((S, A) => {
              const L = _.get(A);
              S.forEach(X => Mr(X, L))
            }), O.forEach((S, A) => {
              const L = x.get(A);
              S.forEach(X => Mr(X, L))
            }), C.forEach(S => {
              this.processLeaveNode(S)
            })
          });
          const G = [],
            pe = [];
          for (let S = this._namespaceList.length - 1; S >= 0; S--) this._namespaceList[S].drainQueuedTransitions(t).forEach(L => {
            const X = L.player,
              We = L.element;
            if (G.push(X), this.collectedEnterElements.length) {
              const vn = We[Ht];
              if (vn && vn.setForMove) return void X.destroy()
            }
            const yn = !f || !this.driver.containsElement(f, We),
              St = x.get(We),
              Yn = _.get(We),
              ke = this._buildInstruction(L, i, Yn, St, yn);
            if (ke.errors && ke.errors.length) pe.push(ke);
            else {
              if (yn) return X.onStart(() => pi(We, ke.fromStyles)), X.onDestroy(() => _n(We, ke.toStyles)), void r.push(X);
              if (L.isFallbackTransition) return X.onStart(() => pi(We, ke.fromStyles)), X.onDestroy(() => _n(We, ke.toStyles)), void r.push(X);
              ke.timelines.forEach(vn => vn.stretchStartingKeyframe = !0), i.append(We, ke.timelines), s.push({
                instruction: ke,
                player: X,
                element: We
              }), ke.queriedElements.forEach(vn => Mt(a, vn, []).push(X)), ke.preStyleProps.forEach((vn, Lo) => {
                const $a = Object.keys(vn);
                if ($a.length) {
                  let yi = l.get(Lo);
                  yi || l.set(Lo, yi = new Set), $a.forEach(th => yi.add(th))
                }
              }), ke.postStyleProps.forEach((vn, Lo) => {
                const $a = Object.keys(vn);
                let yi = c.get(Lo);
                yi || c.set(Lo, yi = new Set), $a.forEach(th => yi.add(th))
              })
            }
          });
          if (pe.length) {
            const S = [];
            pe.forEach(A => {
              S.push(`@${A.triggerName} has failed due to:\n`), A.errors.forEach(L => S.push(`- ${L}\n`))
            }), G.forEach(A => A.destroy()), this.reportError(S)
          }
          const De = new Map,
            xt = new Map;
          s.forEach(S => {
            const A = S.element;
            i.has(A) && (xt.set(A, A), this._beforeAnimationBuild(S.player.namespaceId, S.instruction, De))
          }), r.forEach(S => {
            const A = S.element;
            this._getPreviousPlayers(A, !1, S.namespaceId, S.triggerName, null).forEach(X => {
              Mt(De, A, []).push(X), X.destroy()
            })
          });
          const Tt = C.filter(S => Kv(S, l, c)),
            kt = new Map;
          Gv(kt, this.driver, b, c, Sn).forEach(S => {
            Kv(S, l, c) && Tt.push(S)
          });
          const Pn = new Map;
          p.forEach((S, A) => {
            Gv(Pn, this.driver, new Set(S), l, "!")
          }), Tt.forEach(S => {
            const A = kt.get(S),
              L = Pn.get(S);
            kt.set(S, te(te({}, A), L))
          });
          const on = [],
            Tr = [],
            kr = {};
          s.forEach(S => {
            const {
              element: A,
              player: L,
              instruction: X
            } = S;
            if (i.has(A)) {
              if (u.has(A)) return L.onDestroy(() => _n(A, X.toStyles)), L.disabled = !0, L.overrideTotalTime(X.totalTime), void r.push(L);
              let We = kr;
              if (xt.size > 1) {
                let St = A;
                const Yn = [];
                for (; St = St.parentNode;) {
                  const ke = xt.get(St);
                  if (ke) {
                    We = ke;
                    break
                  }
                  Yn.push(St)
                }
                Yn.forEach(ke => xt.set(ke, We))
              }
              const yn = this._buildAnimation(L.namespaceId, X, De, o, Pn, kt);
              if (L.setRealPlayer(yn), We === kr) on.push(L);
              else {
                const St = this.playersByElement.get(We);
                St && St.length && (L.parentPlayer = qn(St)), r.push(L)
              }
            } else pi(A, X.fromStyles), L.onDestroy(() => _n(A, X.toStyles)), Tr.push(L), u.has(A) && r.push(L)
          }), Tr.forEach(S => {
            const A = o.get(S.element);
            if (A && A.length) {
              const L = qn(A);
              S.setRealPlayer(L)
            }
          }), r.forEach(S => {
            S.parentPlayer ? S.syncPlayerEvents(S.parentPlayer) : S.destroy()
          });
          for (let S = 0; S < C.length; S++) {
            const A = C[S],
              L = A[Ht];
            if (Mr(A, ba), L && L.hasAnimation) continue;
            let X = [];
            if (a.size) {
              let yn = a.get(A);
              yn && yn.length && X.push(...yn);
              let St = this.driver.query(A, Dd, !0);
              for (let Yn = 0; Yn < St.length; Yn++) {
                let ke = a.get(St[Yn]);
                ke && ke.length && X.push(...ke)
              }
            }
            const We = X.filter(yn => !yn.destroyed);
            We.length ? dA(this, A, We) : this.processLeaveNode(A)
          }
          return C.length = 0, on.forEach(S => {
            this.players.push(S), S.onDone(() => {
              S.destroy();
              const A = this.players.indexOf(S);
              this.players.splice(A, 1)
            }), S.play()
          }), on
        }
        elementContainsData(e, t) {
          let i = !1;
          const r = t[Ht];
          return r && r.setForRemoval && (i = !0), this.playersByElement.has(t) && (i = !0), this.playersByQueriedElement.has(t) && (i = !0), this.statesByElement.has(t) && (i = !0), this._fetchNamespace(e).elementContainsData(t) || i
        }
        afterFlush(e) {
          this._flushFns.push(e)
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e)
        }
        _getPreviousPlayers(e, t, i, r, o) {
          let s = [];
          if (t) {
            const a = this.playersByQueriedElement.get(e);
            a && (s = a)
          } else {
            const a = this.playersByElement.get(e);
            if (a) {
              const l = !o || o == Ao;
              a.forEach(c => {
                c.queued || !l && c.triggerName != r || s.push(c)
              })
            }
          }
          return (i || r) && (s = s.filter(a => !(i && i != a.namespaceId || r && r != a.triggerName))), s
        }
        _beforeAnimationBuild(e, t, i) {
          const o = t.element,
            s = t.isRemovalTransition ? void 0 : e,
            a = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const l of t.timelines) {
            const c = l.element,
              u = c !== o,
              f = Mt(i, c, []);
            this._getPreviousPlayers(c, u, s, a, t.toState).forEach(p => {
              const _ = p.getRealPlayer();
              _.beforeDestroy && _.beforeDestroy(), p.destroy(), f.push(p)
            })
          }
          pi(o, t.fromStyles)
        }
        _buildAnimation(e, t, i, r, o, s) {
          const a = t.triggerName,
            l = t.element,
            c = [],
            u = new Set,
            f = new Set,
            m = t.timelines.map(_ => {
              const v = _.element;
              u.add(v);
              const C = v[Ht];
              if (C && C.removedBeforeQueried) return new wr(_.duration, _.delay);
              const D = v !== l,
                b = function (n) {
                  const e = [];
                  return qv(n, e), e
                }((i.get(v) || rA).map(De => De.getRealPlayer())).filter(De => !!De.element && De.element === v),
                x = o.get(v),
                O = s.get(v),
                G = yv(0, this._normalizer, 0, _.keyframes, x, O),
                pe = this._buildPlayer(_, G, b);
              if (_.subTimeline && r && f.add(v), D) {
                const De = new Ld(e, a, v);
                De.setRealPlayer(pe), c.push(De)
              }
              return pe
            });
          c.forEach(_ => {
            Mt(this.playersByQueriedElement, _.element, []).push(_), _.onDone(() => function (n, e, t) {
              let i;
              if (n instanceof Map) {
                if (i = n.get(e), i) {
                  if (i.length) {
                    const r = i.indexOf(t);
                    i.splice(r, 1)
                  }
                  0 == i.length && n.delete(e)
                }
              } else if (i = n[e], i) {
                if (i.length) {
                  const r = i.indexOf(t);
                  i.splice(r, 1)
                }
                0 == i.length && delete n[e]
              }
              return i
            }(this.playersByQueriedElement, _.element, _))
          }), u.forEach(_ => zt(_, xv));
          const p = qn(m);
          return p.onDestroy(() => {
            u.forEach(_ => Mr(_, xv)), _n(l, t.toStyles)
          }), f.forEach(_ => {
            Mt(r, _, []).push(p)
          }), p
        }
        _buildPlayer(e, t, i) {
          return t.length > 0 ? this.driver.animate(e.element, t, e.duration, e.delay, e.easing, i) : new wr(e.duration, e.delay)
        }
      }
      class Ld {
        constructor(e, t, i) {
          this.namespaceId = e, this.triggerName = t, this.element = i, this._player = new wr, this._containsRealPlayer = !1, this._queuedCallbacks = {}, this.destroyed = !1, this.markedForDestroy = !1, this.disabled = !1, this.queued = !0, this.totalTime = 0
        }
        setRealPlayer(e) {
          this._containsRealPlayer || (this._player = e, Object.keys(this._queuedCallbacks).forEach(t => {
            this._queuedCallbacks[t].forEach(i => hd(e, t, void 0, i))
          }), this._queuedCallbacks = {}, this._containsRealPlayer = !0, this.overrideTotalTime(e.totalTime), this.queued = !1)
        }
        getRealPlayer() {
          return this._player
        }
        overrideTotalTime(e) {
          this.totalTime = e
        }
        syncPlayerEvents(e) {
          const t = this._player;
          t.triggerCallback && e.onStart(() => t.triggerCallback("start")), e.onDone(() => this.finish()), e.onDestroy(() => this.destroy())
        }
        _queueEvent(e, t) {
          Mt(this._queuedCallbacks, e, []).push(t)
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e)
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e)
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e), this._player.onDestroy(e)
        }
        init() {
          this._player.init()
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted()
        }
        play() {
          !this.queued && this._player.play()
        }
        pause() {
          !this.queued && this._player.pause()
        }
        restart() {
          !this.queued && this._player.restart()
        }
        finish() {
          this._player.finish()
        }
        destroy() {
          this.destroyed = !0, this._player.destroy()
        }
        reset() {
          !this.queued && this._player.reset()
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e)
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition()
        }
        triggerCallback(e) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(e)
        }
      }

      function Ia(n) {
        return n && 1 === n.nodeType
      }

      function Uv(n, e) {
        const t = n.style.display;
        return n.style.display = null != e ? e : "none", t
      }

      function Gv(n, e, t, i, r) {
        const o = [];
        t.forEach(l => o.push(Uv(l)));
        const s = [];
        i.forEach((l, c) => {
          const u = {};
          l.forEach(f => {
            const m = u[f] = e.computeStyle(c, f, r);
            (!m || 0 == m.length) && (c[Ht] = oA, s.push(c))
          }), n.set(c, u)
        });
        let a = 0;
        return t.forEach(l => Uv(l, o[a++])), s
      }

      function Wv(n, e) {
        const t = new Map;
        if (n.forEach(a => t.set(a, [])), 0 == e.length) return t;
        const r = new Set(e),
          o = new Map;

        function s(a) {
          if (!a) return 1;
          let l = o.get(a);
          if (l) return l;
          const c = a.parentNode;
          return l = t.has(c) ? c : r.has(c) ? 1 : s(c), o.set(a, l), l
        }
        return e.forEach(a => {
          const l = s(a);
          1 !== l && t.get(l).push(a)
        }), t
      }
      const Fa = "$$classes";

      function zt(n, e) {
        if (n.classList) n.classList.add(e);
        else {
          let t = n[Fa];
          t || (t = n[Fa] = {}), t[e] = !0
        }
      }

      function Mr(n, e) {
        if (n.classList) n.classList.remove(e);
        else {
          let t = n[Fa];
          t && delete t[e]
        }
      }

      function dA(n, e, t) {
        qn(t).onDone(() => n.processLeaveNode(e))
      }

      function qv(n, e) {
        for (let t = 0; t < n.length; t++) {
          const i = n[t];
          i instanceof gv ? qv(i.players, e) : e.push(i)
        }
      }

      function Kv(n, e, t) {
        const i = t.get(n);
        if (!i) return !1;
        let r = e.get(n);
        return r ? i.forEach(o => r.add(o)) : e.set(n, i), t.delete(n), !0
      }
      class Ra {
        constructor(e, t, i) {
          this.bodyNode = e, this._driver = t, this._normalizer = i, this._triggerCache = {}, this.onRemovalComplete = (r, o) => {}, this._transitionEngine = new aA(e, t, i), this._timelineEngine = new eA(e, t, i), this._transitionEngine.onRemovalComplete = (r, o) => this.onRemovalComplete(r, o)
        }
        registerTrigger(e, t, i, r, o) {
          const s = e + "-" + r;
          let a = this._triggerCache[s];
          if (!a) {
            const l = [],
              c = kd(this._driver, o, l);
            if (l.length) throw new Error(`The animation trigger "${r}" has failed to build due to the following errors:\n - ${l.join("\n - ")}`);
            a = function (n, e, t) {
              return new ZO(n, e, t)
            }(r, c, this._normalizer), this._triggerCache[s] = a
          }
          this._transitionEngine.registerTrigger(t, r, a)
        }
        register(e, t) {
          this._transitionEngine.register(e, t)
        }
        destroy(e, t) {
          this._transitionEngine.destroy(e, t)
        }
        onInsert(e, t, i, r) {
          this._transitionEngine.insertNode(e, t, i, r)
        }
        onRemove(e, t, i, r) {
          this._transitionEngine.removeNode(e, t, r || !1, i)
        }
        disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t)
        }
        process(e, t, i, r) {
          if ("@" == i.charAt(0)) {
            const [o, s] = vv(i);
            this._timelineEngine.command(o, t, s, r)
          } else this._transitionEngine.trigger(e, t, i, r)
        }
        listen(e, t, i, r, o) {
          if ("@" == i.charAt(0)) {
            const [s, a] = vv(i);
            return this._timelineEngine.listen(s, t, a, o)
          }
          return this._transitionEngine.listen(e, t, i, r, o)
        }
        flush(e = -1) {
          this._transitionEngine.flush(e)
        }
        get players() {
          return this._transitionEngine.players.concat(this._timelineEngine.players)
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone()
        }
      }

      function Yv(n, e) {
        let t = null,
          i = null;
        return Array.isArray(e) && e.length ? (t = Bd(e[0]), e.length > 1 && (i = Bd(e[e.length - 1]))) : e && (t = Bd(e)), t || i ? new mA(n, t, i) : null
      }
      let mA = (() => {
        class n {
          constructor(t, i, r) {
            this._element = t, this._startStyles = i, this._endStyles = r, this._state = 0;
            let o = n.initialStylesByElement.get(t);
            o || n.initialStylesByElement.set(t, o = {}), this._initialStyles = o
          }
          start() {
            this._state < 1 && (this._startStyles && _n(this._element, this._startStyles, this._initialStyles), this._state = 1)
          }
          finish() {
            this.start(), this._state < 2 && (_n(this._element, this._initialStyles), this._endStyles && (_n(this._element, this._endStyles), this._endStyles = null), this._state = 1)
          }
          destroy() {
            this.finish(), this._state < 3 && (n.initialStylesByElement.delete(this._element), this._startStyles && (pi(this._element, this._startStyles), this._endStyles = null), this._endStyles && (pi(this._element, this._endStyles), this._endStyles = null), _n(this._element, this._initialStyles), this._state = 3)
          }
        }
        return n.initialStylesByElement = new WeakMap, n
      })();

      function Bd(n) {
        let e = null;
        const t = Object.keys(n);
        for (let i = 0; i < t.length; i++) {
          const r = t[i];
          pA(r) && (e = e || {}, e[r] = n[r])
        }
        return e
      }

      function pA(n) {
        return "display" === n || "position" === n
      }
      const Qv = "animation",
        Zv = "animationend";
      class yA {
        constructor(e, t, i, r, o, s, a) {
          this._element = e, this._name = t, this._duration = i, this._delay = r, this._easing = o, this._fillMode = s, this._onDoneFn = a, this._finished = !1, this._destroyed = !1, this._startTime = 0, this._position = 0, this._eventFn = l => this._handleCallback(l)
        }
        apply() {
          (function (n, e) {
            const t = Vd(n, "").trim();
            let i = 0;
            t.length && (function (n, e) {
              let t = 0;
              for (let i = 0; i < n.length; i++) "," === n.charAt(i) && t++;
              return t
            }(t) + 1, e = `${t}, ${e}`), Na(n, "", e)
          })(this._element, `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`), eb(this._element, this._eventFn, !1), this._startTime = Date.now()
        }
        pause() {
          Xv(this._element, this._name, "paused")
        }
        resume() {
          Xv(this._element, this._name, "running")
        }
        setPosition(e) {
          const t = Jv(this._element, this._name);
          this._position = e * this._duration, Na(this._element, "Delay", `-${this._position}ms`, t)
        }
        getPosition() {
          return this._position
        }
        _handleCallback(e) {
          const t = e._ngTestManualTimestamp || Date.now(),
            i = 1e3 * parseFloat(e.elapsedTime.toFixed(3));
          e.animationName == this._name && Math.max(t - this._startTime, 0) >= this._delay && i >= this._duration && this.finish()
        }
        finish() {
          this._finished || (this._finished = !0, this._onDoneFn(), eb(this._element, this._eventFn, !0))
        }
        destroy() {
          this._destroyed || (this._destroyed = !0, this.finish(), function (n, e) {
            const i = Vd(n, "").split(","),
              r = jd(i, e);
            r >= 0 && (i.splice(r, 1), Na(n, "", i.join(",")))
          }(this._element, this._name))
        }
      }

      function Xv(n, e, t) {
        Na(n, "PlayState", t, Jv(n, e))
      }

      function Jv(n, e) {
        const t = Vd(n, "");
        return t.indexOf(",") > 0 ? jd(t.split(","), e) : jd([t], e)
      }

      function jd(n, e) {
        for (let t = 0; t < n.length; t++)
          if (n[t].indexOf(e) >= 0) return t;
        return -1
      }

      function eb(n, e, t) {
        t ? n.removeEventListener(Zv, e) : n.addEventListener(Zv, e)
      }

      function Na(n, e, t, i) {
        const r = Qv + e;
        if (null != i) {
          const o = n.style[r];
          if (o.length) {
            const s = o.split(",");
            s[i] = t, t = s.join(",")
          }
        }
        n.style[r] = t
      }

      function Vd(n, e) {
        return n.style[Qv + e] || ""
      }
      class tb {
        constructor(e, t, i, r, o, s, a, l) {
          this.element = e, this.keyframes = t, this.animationName = i, this._duration = r, this._delay = o, this._finalStyles = a, this._specialStyles = l, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this.currentSnapshot = {}, this._state = 0, this.easing = s || "linear", this.totalTime = r + o, this._buildStyler()
        }
        onStart(e) {
          this._onStartFns.push(e)
        }
        onDone(e) {
          this._onDoneFns.push(e)
        }
        onDestroy(e) {
          this._onDestroyFns.push(e)
        }
        destroy() {
          this.init(), !(this._state >= 4) && (this._state = 4, this._styler.destroy(), this._flushStartFns(), this._flushDoneFns(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(e => e()), this._onDestroyFns = [])
        }
        _flushDoneFns() {
          this._onDoneFns.forEach(e => e()), this._onDoneFns = []
        }
        _flushStartFns() {
          this._onStartFns.forEach(e => e()), this._onStartFns = []
        }
        finish() {
          this.init(), !(this._state >= 3) && (this._state = 3, this._styler.finish(), this._flushStartFns(), this._specialStyles && this._specialStyles.finish(), this._flushDoneFns())
        }
        setPosition(e) {
          this._styler.setPosition(e)
        }
        getPosition() {
          return this._styler.getPosition()
        }
        hasStarted() {
          return this._state >= 2
        }
        init() {
          this._state >= 1 || (this._state = 1, this._styler.apply(), this._delay && this._styler.pause())
        }
        play() {
          this.init(), this.hasStarted() || (this._flushStartFns(), this._state = 2, this._specialStyles && this._specialStyles.start()), this._styler.resume()
        }
        pause() {
          this.init(), this._styler.pause()
        }
        restart() {
          this.reset(), this.play()
        }
        reset() {
          this._state = 0, this._styler.destroy(), this._buildStyler(), this._styler.apply()
        }
        _buildStyler() {
          this._styler = new yA(this.element, this.animationName, this._duration, this._delay, this.easing, "forwards", () => this.finish())
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach(i => i()), t.length = 0
        }
        beforeDestroy() {
          this.init();
          const e = {};
          if (this.hasStarted()) {
            const t = this._state >= 3;
            Object.keys(this._finalStyles).forEach(i => {
              "offset" != i && (e[i] = t ? this._finalStyles[i] : Td(this.element, i))
            })
          }
          this.currentSnapshot = e
        }
      }
      class MA extends wr {
        constructor(e, t) {
          super(), this.element = e, this._startingStyles = {}, this.__initialized = !1, this._styles = Dv(t)
        }
        init() {
          this.__initialized || !this._startingStyles || (this.__initialized = !0, Object.keys(this._styles).forEach(e => {
            this._startingStyles[e] = this.element.style[e]
          }), super.init())
        }
        play() {
          !this._startingStyles || (this.init(), Object.keys(this._styles).forEach(e => this.element.style.setProperty(e, this._styles[e])), super.play())
        }
        destroy() {
          !this._startingStyles || (Object.keys(this._startingStyles).forEach(e => {
            const t = this._startingStyles[e];
            t ? this.element.style.setProperty(e, t) : this.element.style.removeProperty(e)
          }), this._startingStyles = null, super.destroy())
        }
      }
      class ib {
        constructor() {
          this._count = 0
        }
        validateStyleProperty(e) {
          return _d(e)
        }
        matchesElement(e, t) {
          return yd(e, t)
        }
        containsElement(e, t) {
          return vd(e, t)
        }
        query(e, t, i) {
          return bd(e, t, i)
        }
        computeStyle(e, t, i) {
          return window.getComputedStyle(e)[t]
        }
        buildKeyframeElement(e, t, i) {
          i = i.map(a => Dv(a));
          let r = `@keyframes ${t} {\n`,
            o = "";
          i.forEach(a => {
            o = " ";
            const l = parseFloat(a.offset);
            r += `${o}${100*l}% {\n`, o += " ", Object.keys(a).forEach(c => {
              const u = a[c];
              switch (c) {
                case "offset":
                  return;
                case "easing":
                  return void(u && (r += `${o}animation-timing-function: ${u};\n`));
                default:
                  return void(r += `${o}${c}: ${u};\n`)
              }
            }), r += `${o}}\n`
          }), r += "}\n";
          const s = document.createElement("style");
          return s.textContent = r, s
        }
        animate(e, t, i, r, o, s = [], a) {
          const l = s.filter(C => C instanceof tb),
            c = {};
          Ov(i, r) && l.forEach(C => {
            let D = C.currentSnapshot;
            Object.keys(D).forEach(b => c[b] = D[b])
          });
          const u = function (n) {
            let e = {};
            return n && (Array.isArray(n) ? n : [n]).forEach(i => {
              Object.keys(i).forEach(r => {
                "offset" == r || "easing" == r || (e[r] = i[r])
              })
            }), e
          }(t = Av(e, t, c));
          if (0 == i) return new MA(e, u);
          const f = "gen_css_kf_" + this._count++,
            m = this.buildKeyframeElement(e, f, t);
          (function (n) {
            var t;
            const e = null == (t = n.getRootNode) ? void 0 : t.call(n);
            return "undefined" != typeof ShadowRoot && e instanceof ShadowRoot ? e : document.head
          })(e).appendChild(m);
          const _ = Yv(e, t),
            v = new tb(e, t, f, i, r, o, u, _);
          return v.onDestroy(() => {
            var n;
            (n = m).parentNode.removeChild(n)
          }), v
        }
      }
      class ob {
        constructor(e, t, i, r) {
          this.element = e, this.keyframes = t, this.options = i, this._specialStyles = r, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._initialized = !1, this._finished = !1, this._started = !1, this._destroyed = !1, this.time = 0, this.parentPlayer = null, this.currentSnapshot = {}, this._duration = i.duration, this._delay = i.delay || 0, this.time = this._duration + this._delay
        }
        _onFinish() {
          this._finished || (this._finished = !0, this._onDoneFns.forEach(e => e()), this._onDoneFns = [])
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart()
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          this.domPlayer = this._triggerWebAnimation(this.element, e, this.options), this._finalKeyframe = e.length ? e[e.length - 1] : {}, this.domPlayer.addEventListener("finish", () => this._onFinish())
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
        }
        _triggerWebAnimation(e, t, i) {
          return e.animate(t, i)
        }
        onStart(e) {
          this._onStartFns.push(e)
        }
        onDone(e) {
          this._onDoneFns.push(e)
        }
        onDestroy(e) {
          this._onDestroyFns.push(e)
        }
        play() {
          this._buildPlayer(), this.hasStarted() || (this._onStartFns.forEach(e => e()), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()), this.domPlayer.play()
        }
        pause() {
          this.init(), this.domPlayer.pause()
        }
        finish() {
          this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish()
        }
        reset() {
          this._resetDomPlayerState(), this._destroyed = !1, this._finished = !1, this._started = !1
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel()
        }
        restart() {
          this.reset(), this.play()
        }
        hasStarted() {
          return this._started
        }
        destroy() {
          this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(e => e()), this._onDestroyFns = [])
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(), this.domPlayer.currentTime = e * this.time
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time
        }
        get totalTime() {
          return this._delay + this._duration
        }
        beforeDestroy() {
          const e = {};
          this.hasStarted() && Object.keys(this._finalKeyframe).forEach(t => {
            "offset" != t && (e[t] = this._finished ? this._finalKeyframe[t] : Td(this.element, t))
          }), this.currentSnapshot = e
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach(i => i()), t.length = 0
        }
      }
      class SA {
        constructor() {
          this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(sb().toString()), this._cssKeyframesDriver = new ib
        }
        validateStyleProperty(e) {
          return _d(e)
        }
        matchesElement(e, t) {
          return yd(e, t)
        }
        containsElement(e, t) {
          return vd(e, t)
        }
        query(e, t, i) {
          return bd(e, t, i)
        }
        computeStyle(e, t, i) {
          return window.getComputedStyle(e)[t]
        }
        overrideWebAnimationsSupport(e) {
          this._isNativeImpl = e
        }
        animate(e, t, i, r, o, s = [], a) {
          if (!a && !this._isNativeImpl) return this._cssKeyframesDriver.animate(e, t, i, r, o, s);
          const u = {
            duration: i,
            delay: r,
            fill: 0 == r ? "both" : "forwards"
          };
          o && (u.easing = o);
          const f = {},
            m = s.filter(_ => _ instanceof ob);
          Ov(i, r) && m.forEach(_ => {
            let v = _.currentSnapshot;
            Object.keys(v).forEach(C => f[C] = v[C])
          });
          const p = Yv(e, t = Av(e, t = t.map(_ => Kn(_, !1)), f));
          return new ob(e, t, u, p)
        }
      }

      function sb() {
        return _v() && Element.prototype.animate || {}
      }
      let OA = (() => {
        class n extends fv {
          constructor(t, i) {
            super(), this._nextAnimationId = 0, this._renderer = t.createRenderer(i.body, {
              id: "0",
              encapsulation: $t.None,
              styles: [],
              data: {
                animation: []
              }
            })
          }
          build(t) {
            const i = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const r = Array.isArray(t) ? mv(t) : t;
            return ab(this._renderer, null, i, "register", [r]), new AA(i, this._renderer)
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(ho), M(ee))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      class AA extends class {} {
        constructor(e, t) {
          super(), this._id = e, this._renderer = t
        }
        create(e, t) {
          return new IA(this._id, e, t || {}, this._renderer)
        }
      }
      class IA {
        constructor(e, t, i, r) {
          this.id = e, this.element = t, this._renderer = r, this.parentPlayer = null, this._started = !1, this.totalTime = 0, this._command("create", i)
        }
        _listen(e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t)
        }
        _command(e, ...t) {
          return ab(this._renderer, this.element, this.id, e, t)
        }
        onDone(e) {
          this._listen("done", e)
        }
        onStart(e) {
          this._listen("start", e)
        }
        onDestroy(e) {
          this._listen("destroy", e)
        }
        init() {
          this._command("init")
        }
        hasStarted() {
          return this._started
        }
        play() {
          this._command("play"), this._started = !0
        }
        pause() {
          this._command("pause")
        }
        restart() {
          this._command("restart")
        }
        finish() {
          this._command("finish")
        }
        destroy() {
          this._command("destroy")
        }
        reset() {
          this._command("reset"), this._started = !1
        }
        setPosition(e) {
          this._command("setPosition", e)
        }
        getPosition() {
          var e, t;
          return null != (t = null == (e = this._renderer.engine.players[+this.id]) ? void 0 : e.getPosition()) ? t : 0
        }
      }

      function ab(n, e, t, i, r) {
        return n.setProperty(e, `@@${t}:${i}`, r)
      }
      const lb = "@.disabled";
      let FA = (() => {
        class n {
          constructor(t, i, r) {
            this.delegate = t, this.engine = i, this._zone = r, this._currentId = 0, this._microtaskId = 1, this._animationCallbacksBuffer = [], this._rendererCache = new Map, this._cdRecurDepth = 0, this.promise = Promise.resolve(0), i.onRemovalComplete = (o, s) => {
              const a = null == s ? void 0 : s.parentNode(o);
              a && s.removeChild(a, o)
            }
          }
          createRenderer(t, i) {
            const o = this.delegate.createRenderer(t, i);
            if (!(t && i && i.data && i.data.animation)) {
              let u = this._rendererCache.get(o);
              return u || (u = new cb("", o, this.engine), this._rendererCache.set(o, u)), u
            }
            const s = i.id,
              a = i.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, t);
            const l = u => {
              Array.isArray(u) ? u.forEach(l) : this.engine.registerTrigger(s, a, t, u.name, u)
            };
            return i.data.animation.forEach(l), new RA(this, a, o, this.engine)
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin()
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++
            })
          }
          scheduleListenerCallback(t, i, r) {
            t >= 0 && t < this._microtaskId ? this._zone.run(() => i(r)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(() => {
              this._zone.run(() => {
                this._animationCallbacksBuffer.forEach(o => {
                  const [s, a] = o;
                  s(a)
                }), this._animationCallbacksBuffer = []
              })
            }), this._animationCallbacksBuffer.push([i, r]))
          }
          end() {
            this._cdRecurDepth--, 0 == this._cdRecurDepth && this._zone.runOutsideAngular(() => {
              this._scheduleCountTask(), this.engine.flush(this._microtaskId)
            }), this.delegate.end && this.delegate.end()
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone()
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(ho), M(Ra), M(J))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      class cb {
        constructor(e, t, i) {
          this.namespaceId = e, this.delegate = t, this.engine = i, this.destroyNode = this.delegate.destroyNode ? r => t.destroyNode(r) : null
        }
        get data() {
          return this.delegate.data
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy()
        }
        createElement(e, t) {
          return this.delegate.createElement(e, t)
        }
        createComment(e) {
          return this.delegate.createComment(e)
        }
        createText(e) {
          return this.delegate.createText(e)
        }
        appendChild(e, t) {
          this.delegate.appendChild(e, t), this.engine.onInsert(this.namespaceId, t, e, !1)
        }
        insertBefore(e, t, i, r = !0) {
          this.delegate.insertBefore(e, t, i), this.engine.onInsert(this.namespaceId, t, e, r)
        }
        removeChild(e, t, i) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, i)
        }
        selectRootElement(e, t) {
          return this.delegate.selectRootElement(e, t)
        }
        parentNode(e) {
          return this.delegate.parentNode(e)
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e)
        }
        setAttribute(e, t, i, r) {
          this.delegate.setAttribute(e, t, i, r)
        }
        removeAttribute(e, t, i) {
          this.delegate.removeAttribute(e, t, i)
        }
        addClass(e, t) {
          this.delegate.addClass(e, t)
        }
        removeClass(e, t) {
          this.delegate.removeClass(e, t)
        }
        setStyle(e, t, i, r) {
          this.delegate.setStyle(e, t, i, r)
        }
        removeStyle(e, t, i) {
          this.delegate.removeStyle(e, t, i)
        }
        setProperty(e, t, i) {
          "@" == t.charAt(0) && t == lb ? this.disableAnimations(e, !!i) : this.delegate.setProperty(e, t, i)
        }
        setValue(e, t) {
          this.delegate.setValue(e, t)
        }
        listen(e, t, i) {
          return this.delegate.listen(e, t, i)
        }
        disableAnimations(e, t) {
          this.engine.disableAnimations(e, t)
        }
      }
      class RA extends cb {
        constructor(e, t, i, r) {
          super(t, i, r), this.factory = e, this.namespaceId = t
        }
        setProperty(e, t, i) {
          "@" == t.charAt(0) ? "." == t.charAt(1) && t == lb ? this.disableAnimations(e, i = void 0 === i || !!i) : this.engine.process(this.namespaceId, e, t.substr(1), i) : this.delegate.setProperty(e, t, i)
        }
        listen(e, t, i) {
          if ("@" == t.charAt(0)) {
            const r = function (n) {
              switch (n) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return n
              }
            }(e);
            let o = t.substr(1),
              s = "";
            return "@" != o.charAt(0) && ([o, s] = function (n) {
              const e = n.indexOf(".");
              return [n.substring(0, e), n.substr(e + 1)]
            }(o)), this.engine.listen(this.namespaceId, r, o, s, a => {
              this.factory.scheduleListenerCallback(a._data || -1, i, a)
            })
          }
          return this.delegate.listen(e, t, i)
        }
      }
      let BA = (() => {
        class n extends Ra {
          constructor(t, i, r) {
            super(t.body, i, r)
          }
          ngOnDestroy() {
            this.flush()
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(ee), M(Cd), M(Id))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac
        }), n
      })();
      const nn = new P("AnimationModuleType"),
        ub = [{
          provide: fv,
          useClass: OA
        }, {
          provide: Id,
          useFactory: function () {
            return new GO
          }
        }, {
          provide: Ra,
          useClass: BA
        }, {
          provide: ho,
          useFactory: function (n, e, t) {
            return new FA(n, e, t)
          },
          deps: [fa, Ra, J]
        }],
        db = [{
          provide: Cd,
          useFactory: function () {
            return "function" == typeof sb() ? new SA : new ib
          }
        }, {
          provide: nn,
          useValue: "BrowserAnimations"
        }, ...ub],
        zA = [{
          provide: Cd,
          useClass: Mv
        }, {
          provide: nn,
          useValue: "NoopAnimations"
        }, ...ub];
      let hb = (() => {
        class n {
          static withConfig(t) {
            return {
              ngModule: n,
              providers: t.disableAnimations ? zA : db
            }
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)
        }, n.\u0275mod = Me({
          type: n
        }), n.\u0275inj = ge({
          providers: db,
          imports: [Uy]
        }), n
      })();
      const UA = new P("mat-sanity-checks", {
        providedIn: "root",
        factory: function () {
          return !0
        }
      });
      let rn = (() => {
        class n {
          constructor(t, i, r) {
            this._sanityChecks = i, this._document = r, this._hasDoneGlobalChecks = !1, t._applyBodyHighContrastModeCssClasses(), this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0)
          }
          _checkIsEnabled(t) {
            return !od() && ("boolean" == typeof this._sanityChecks ? this._sanityChecks : !!this._sanityChecks[t])
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(dv), M(UA, 8), M(ee))
        }, n.\u0275mod = Me({
          type: n
        }), n.\u0275inj = ge({
          imports: [
            [Po], Po
          ]
        }), n
      })();

      function Hd(n) {
        return class extends n {
          constructor(...e) {
            super(...e), this._disabled = !1
          }
          get disabled() {
            return this._disabled
          }
          set disabled(e) {
            this._disabled = To(e)
          }
        }
      }

      function mb(n, e) {
        return class extends n {
          constructor(...t) {
            super(...t), this.defaultColor = e, this.color = e
          }
          get color() {
            return this._color
          }
          set color(t) {
            const i = t || this.defaultColor;
            i !== this._color && (this._color && this._elementRef.nativeElement.classList.remove(`mat-${this._color}`), i && this._elementRef.nativeElement.classList.add(`mat-${i}`), this._color = i)
          }
        }
      }

      function pb(n) {
        return class extends n {
          constructor(...e) {
            super(...e), this._disableRipple = !1
          }
          get disableRipple() {
            return this._disableRipple
          }
          set disableRipple(e) {
            this._disableRipple = To(e)
          }
        }
      }
      let WA = (() => {
        class n {
          isErrorState(t, i) {
            return !!(t && t.invalid && (t.touched || i && i.submitted))
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac,
          providedIn: "root"
        }), n
      })();
      class qA {
        constructor(e, t, i) {
          this._renderer = e, this.element = t, this.config = i, this.state = 3
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this)
        }
      }
      const gb = {
          enterDuration: 225,
          exitDuration: 150
        },
        zd = So({
          passive: !0
        }),
        _b = ["mousedown", "touchstart"],
        yb = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class YA {
        constructor(e, t, i, r) {
          this._target = e, this._ngZone = t, this._isPointerDown = !1, this._activeRipples = new Set, this._pointerUpEventsRegistered = !1, r.isBrowser && (this._containerElement = ui(i))
        }
        fadeInRipple(e, t, i = {}) {
          const r = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect(),
            o = te(te({}, gb), i.animation);
          i.centered && (e = r.left + r.width / 2, t = r.top + r.height / 2);
          const s = i.radius || function (n, e, t) {
              const i = Math.max(Math.abs(n - t.left), Math.abs(n - t.right)),
                r = Math.max(Math.abs(e - t.top), Math.abs(e - t.bottom));
              return Math.sqrt(i * i + r * r)
            }(e, t, r),
            a = e - r.left,
            l = t - r.top,
            c = o.enterDuration,
            u = document.createElement("div");
          u.classList.add("mat-ripple-element"), u.style.left = a - s + "px", u.style.top = l - s + "px", u.style.height = 2 * s + "px", u.style.width = 2 * s + "px", null != i.color && (u.style.backgroundColor = i.color), u.style.transitionDuration = `${c}ms`, this._containerElement.appendChild(u), window.getComputedStyle(u).getPropertyValue("opacity"), u.style.transform = "scale(1)";
          const f = new qA(this, u, i);
          return f.state = 0, this._activeRipples.add(f), i.persistent || (this._mostRecentTransientRipple = f), this._runTimeoutOutsideZone(() => {
            const m = f === this._mostRecentTransientRipple;
            f.state = 1, !i.persistent && (!m || !this._isPointerDown) && f.fadeOut()
          }, c), f
        }
        fadeOutRipple(e) {
          const t = this._activeRipples.delete(e);
          if (e === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null), this._activeRipples.size || (this._containerRect = null), !t) return;
          const i = e.element,
            r = te(te({}, gb), e.config.animation);
          i.style.transitionDuration = `${r.exitDuration}ms`, i.style.opacity = "0", e.state = 2, this._runTimeoutOutsideZone(() => {
            e.state = 3, i.remove()
          }, r.exitDuration)
        }
        fadeOutAll() {
          this._activeRipples.forEach(e => e.fadeOut())
        }
        fadeOutAllNonPersistent() {
          this._activeRipples.forEach(e => {
            e.config.persistent || e.fadeOut()
          })
        }
        setupTriggerEvents(e) {
          const t = ui(e);
          !t || t === this._triggerElement || (this._removeTriggerEvents(), this._triggerElement = t, this._registerEvents(_b))
        }
        handleEvent(e) {
          "mousedown" === e.type ? this._onMousedown(e) : "touchstart" === e.type ? this._onTouchStart(e) : this._onPointerUp(), this._pointerUpEventsRegistered || (this._registerEvents(yb), this._pointerUpEventsRegistered = !0)
        }
        _onMousedown(e) {
          const t = sv(e),
            i = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled && !t && !i && (this._isPointerDown = !0, this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig))
        }
        _onTouchStart(e) {
          if (!this._target.rippleDisabled && !av(e)) {
            this._lastTouchStartEvent = Date.now(), this._isPointerDown = !0;
            const t = e.changedTouches;
            for (let i = 0; i < t.length; i++) this.fadeInRipple(t[i].clientX, t[i].clientY, this._target.rippleConfig)
          }
        }
        _onPointerUp() {
          !this._isPointerDown || (this._isPointerDown = !1, this._activeRipples.forEach(e => {
            !e.config.persistent && (1 === e.state || e.config.terminateOnPointerUp && 0 === e.state) && e.fadeOut()
          }))
        }
        _runTimeoutOutsideZone(e, t = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(e, t))
        }
        _registerEvents(e) {
          this._ngZone.runOutsideAngular(() => {
            e.forEach(t => {
              this._triggerElement.addEventListener(t, this, zd)
            })
          })
        }
        _removeTriggerEvents() {
          this._triggerElement && (_b.forEach(e => {
            this._triggerElement.removeEventListener(e, this, zd)
          }), this._pointerUpEventsRegistered && yb.forEach(e => {
            this._triggerElement.removeEventListener(e, this, zd)
          }))
        }
      }
      const XA = new P("mat-ripple-global-options");
      let Ba = (() => {
          class n {
            constructor(t, i, r, o, s) {
              this._elementRef = t, this._animationMode = s, this.radius = 0, this._disabled = !1, this._isInitialized = !1, this._globalOptions = o || {}, this._rippleRenderer = new YA(this, i, t, r)
            }
            get disabled() {
              return this._disabled
            }
            set disabled(t) {
              t && this.fadeOutAllNonPersistent(), this._disabled = t, this._setupTriggerEventsIfEnabled()
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement
            }
            set trigger(t) {
              this._trigger = t, this._setupTriggerEventsIfEnabled()
            }
            ngOnInit() {
              this._isInitialized = !0, this._setupTriggerEventsIfEnabled()
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents()
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll()
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent()
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: te(te(te({}, this._globalOptions.animation), "NoopAnimations" === this._animationMode ? {
                  enterDuration: 0,
                  exitDuration: 0
                } : {}), this.animation),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
              }
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger)
            }
            launch(t, i = 0, r) {
              return "number" == typeof t ? this._rippleRenderer.fadeInRipple(t, i, te(te({}, this.rippleConfig), r)) : this._rippleRenderer.fadeInRipple(0, 0, te(te({}, this.rippleConfig), t))
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(J), w(wt), w(XA, 8), w(nn, 8))
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "mat-ripple", ""],
              ["", "matRipple", ""]
            ],
            hostAttrs: [1, "mat-ripple"],
            hostVars: 2,
            hostBindings: function (t, i) {
              2 & t && Je("mat-ripple-unbounded", i.unbounded)
            },
            inputs: {
              color: ["matRippleColor", "color"],
              unbounded: ["matRippleUnbounded", "unbounded"],
              centered: ["matRippleCentered", "centered"],
              radius: ["matRippleRadius", "radius"],
              animation: ["matRippleAnimation", "animation"],
              disabled: ["matRippleDisabled", "disabled"],
              trigger: ["matRippleTrigger", "trigger"]
            },
            exportAs: ["matRipple"]
          }), n
        })(),
        vb = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            imports: [
              [rn, _a], rn
            ]
          }), n
        })();
      const JA = ["mat-button", ""],
        eI = ["*"],
        nI = ["mat-button", "mat-flat-button", "mat-icon-button", "mat-raised-button", "mat-stroked-button", "mat-mini-fab", "mat-fab"],
        iI = mb(Hd(pb(class {
          constructor(n) {
            this._elementRef = n
          }
        })));
      let ce = (() => {
          class n extends iI {
            constructor(t, i, r) {
              super(t), this._focusMonitor = i, this._animationMode = r, this.isRoundButton = this._hasHostAttributes("mat-fab", "mat-mini-fab"), this.isIconButton = this._hasHostAttributes("mat-icon-button");
              for (const o of nI) this._hasHostAttributes(o) && this._getHostElement().classList.add(o);
              t.nativeElement.classList.add("mat-button-base"), this.isRoundButton && (this.color = "accent")
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0)
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef)
            }
            focus(t, i) {
              t ? this._focusMonitor.focusVia(this._getHostElement(), t, i) : this._getHostElement().focus(i)
            }
            _getHostElement() {
              return this._elementRef.nativeElement
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled
            }
            _hasHostAttributes(...t) {
              return t.some(i => this._getHostElement().hasAttribute(i))
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(ad), w(nn, 8))
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["button", "mat-button", ""],
              ["button", "mat-raised-button", ""],
              ["button", "mat-icon-button", ""],
              ["button", "mat-fab", ""],
              ["button", "mat-mini-fab", ""],
              ["button", "mat-stroked-button", ""],
              ["button", "mat-flat-button", ""]
            ],
            viewQuery: function (t, i) {
              if (1 & t && ut(Ba, 5), 2 & t) {
                let r;
                Ue(r = Ge()) && (i.ripple = r.first)
              }
            },
            hostAttrs: [1, "mat-focus-indicator"],
            hostVars: 5,
            hostBindings: function (t, i) {
              2 & t && (Hn("disabled", i.disabled || null), Je("_mat-animation-noopable", "NoopAnimations" === i._animationMode)("mat-button-disabled", i.disabled))
            },
            inputs: {
              disabled: "disabled",
              disableRipple: "disableRipple",
              color: "color"
            },
            exportAs: ["matButton"],
            features: [ct],
            attrs: JA,
            ngContentSelectors: eI,
            decls: 4,
            vars: 5,
            consts: [
              [1, "mat-button-wrapper"],
              ["matRipple", "", 1, "mat-button-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"],
              [1, "mat-button-focus-overlay"]
            ],
            template: function (t, i) {
              1 & t && (Rs(), d(0, "span", 0), Ns(1), h(), y(2, "span", 1), y(3, "span", 2)), 2 & t && ($e(2), Je("mat-button-ripple-round", i.isRoundButton || i.isIconButton), _e("matRippleDisabled", i._isRippleDisabled())("matRippleCentered", i.isIconButton)("matRippleTrigger", i._getHostElement()))
            },
            directives: [Ba],
            styles: [".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n"],
            encapsulation: 2,
            changeDetection: 0
          }), n
        })(),
        rI = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            imports: [
              [vb, rn], rn
            ]
          }), n
        })();
      const oI = ["stickyMenu"],
        sI = function (n) {
          return {
            active: n
          }
        };

      function aI(n, e) {
        if (1 & n) {
          const t = Fs();
          d(0, "li", 6), Y("click", function () {
            const o = ki(t).index;
            return Qt().selectedItem = o
          }), d(1, "a", 7), g(2), h(), h()
        }
        if (2 & n) {
          const t = e.$implicit,
            i = e.index,
            r = Qt();
          _e("value", t.value), $e(1), _e("ngClass", su(4, sI, r.selectedItem === i))("href", t.link, Cs), $e(1), Bs(t.value)
        }
      }
      let lI = (() => {
          class n {
            constructor() {
              this.myFileName = "PrasannaResume.pdf", this.fileUrl = "/asset/Docs/PrasannaResume.pdf", this.selectedItem = 0, this.count = 2, this.items = [{
                value: "Home",
                link: "#home"
              }, {
                value: "About",
                link: "#about"
              }, {
                value: "Portfolio",
                link: "#Portfolio"
              }, {
                value: "Contact",
                link: "#contact"
              }], this.sticky = !1
            }
            ngOnInit() {}
            ngAfterViewInit() {
              this.elementPosition = this.menuElement.nativeElement.offsetTop
            }
            handleScroll() {
              this.sticky = window.pageYOffset >= this.elementPosition
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["app-navigation"]
            ],
            viewQuery: function (t, i) {
              if (1 & t && ut(oI, 5), 2 & t) {
                let r;
                Ue(r = Ge()) && (i.menuElement = r.first)
              }
            },
            hostBindings: function (t, i) {
              1 & t && Y("scroll", function (o) {
                return i.handleScroll(o)
              }, !1, Qf)
            },
            decls: 8,
            vars: 5,
            consts: [
              ["stickyMenu", ""],
              [1, "menu"],
              [3, "value", "click", 4, "ngFor", "ngForOf"],
              [1, "resume"],
              [3, "download", "href"],
              ["mat-raised-button", "", "color", "primary"],
              [3, "value", "click"],
              [3, "ngClass", "href"]
            ],
            template: function (t, i) {
              1 & t && (d(0, "nav", null, 0), d(2, "ul", 1), mn(3, aI, 3, 6, "li", 2), d(4, "li", 3), d(5, "a", 4), d(6, "button", 5), g(7, "Resume"), h(), h(), h(), h(), h()), 2 & t && (Je("sticky", i.sticky), $e(3), _e("ngForOf", i.items), $e(2), _e("download", i.myFileName)("href", i.fileUrl, Cs))
            },
            directives: [Hu, ce, xy],
            styles: ['ul[_ngcontent-%COMP%]{list-style:none;display:flex}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding-left:35px;font-weight:normal;font-size:18px;cursor:pointer;padding-top:30px;color:#444;font-family:"Barlow",sans-serif!important;font-weight:500}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#444}.sticky[_ngcontent-%COMP%]{position:fixed;top:0;overflow:hidden;height:51px;z-index:10;width:100%;background:#fff;box-shadow:0 3px 12px #00000014}.sticky[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding-top:0!important}a.active[_ngcontent-%COMP%]{color:#1e0660!important;border-bottom:3px solid #1e0660}.resume[_ngcontent-%COMP%]{padding-top:21px!important}[mat-raised-button][_ngcontent-%COMP%]{background-color:#1e0660;box-shadow:3px 3px 14px #1e066099;transform:translateY(-7px);margin-top:10px}.sticky[_ngcontent-%COMP%]   [mat-raised-button][_ngcontent-%COMP%]{margin:0}']
          }), n
        })(),
        cI = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["app-banner-intro"]
            ],
            decls: 11,
            vars: 0,
            consts: [
              [1, "banner-intro"],
              ["data-aos", "fade-up", 1, "hello"],
              ["data-aos", "fade-up", 1, "name"],
              ["data-aos", "fade-up", 1, "descr"],
              ["href", "#Portfolio"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"]
            ],
            template: function (t, i) {
              1 & t && (d(0, "div", 0), d(1, "p", 1), g(2, "Hello!"), h(), d(3, "p", 2), g(4, "I\u2019M PRASANNA"), h(), d(5, "p", 3), g(6, "I\u2019m a software developer based in Chennai."), h(), d(7, "a", 4), d(8, "button", 5), g(9, "View My Work \xa0 "), y(10, "i", 6), h(), h(), h())
            },
            directives: [ce],
            styles: [".banner-intro[_ngcontent-%COMP%]{padding:200px 68px;align-items:stretch}.name[_ngcontent-%COMP%]{font-size:36pt;color:#1e0660;font-weight:800;font-style:italic;margin:0 0 30px}.hello[_ngcontent-%COMP%]{margin:0 0 30px;color:#6f6f70;font-size:30px;position:relative;left:10px}.descr[_ngcontent-%COMP%]{color:#6f6f70;font-size:20px;margin:0 0 20px}[mat-raised-button][_ngcontent-%COMP%]{margin-top:10px;background-color:#1e0660;box-shadow:3px 3px 14px #1e066099;transform:translateY(-7px)}"]
          }), n
        })(),
        uI = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["app-about-us"]
            ],
            decls: 112,
            vars: 0,
            consts: [
              ["data-aos", "fade-up", 1, "about-div"],
              [1, "known-technology"],
              ["data-aos", "flip-left", 1, "code-circle"],
              [1, "fal", "fa-tachometer-alt-slow"],
              ["data-aos", "fade-up"],
              [1, "fal", "fa-phone-laptop"],
              [1, "far", "fa-lightbulb"],
              [1, "fal", "fa-rocket-launch"],
              [1, "skills-wrapper", "flex", "row-gt-sm"],
              ["data-animation", "slide-in-left", 1, "flex", "flex-50-gt-sm", "waypoint", "animated", "slide-in-left"],
              ["data-aos", "zoom-out-up", "src", ".../assets/prasanna-profile-pic.png", 1, "me"],
              ["data-aos", "zoom-out-down", 1, "label", "bold"],
              ["data-aos", "zoom-out-down", 1, "dis"],
              ["href", "#Portfolio"],
              ["data-aos", "zoom-out-down", "dest", "contact", 1, "page-link", "highlight"],
              ["data-animation", "slide-in-right", 1, "flex", "flex-50-gt-sm", "waypoint", "bars-wrap", "animated", "slide-in-right"],
              [1, "bar", "flex"],
              ["data-aos", "fade-right", "data-aos-offset", "300", "data-aos-easing", "ease-in-sine", 1, "bar", "fill", 2, "width", "90%"],
              [1, "tag", "bold", "flex"],
              ["data-aos", "fade-right", "data-aos-offset", "300", "data-aos-easing", "ease-in-sine", "data-aos", "fade-right", "data-aos-offset", "300", "data-aos-easing", "ease-in-sine", 1, "bar", "fill", 2, "width", "90%"],
              ["data-aos", "fade-right", "data-aos-offset", "300", "data-aos-easing", "ease-in-sine", 1, "bar", "fill", 2, "width", "80%"],
              ["data-aos", "fade-right", "data-aos-offset", "300", "data-aos-easing", "ease-in-sine", 1, "bar", "fill", 2, "width", "70%"]
            ],
            template: function (t, i) {
              1 & t && (d(0, "div", 0), d(1, "h1"), g(2, "ABOUT"), h(), h(), d(3, "div", 1), d(4, "div"), d(5, "div", 2), d(6, "span"), y(7, "i", 3), h(), h(), d(8, "h3", 4), g(9, " Fast "), h(), d(10, "p", 4), g(11, "Fast load times and lag free interaction, my highest priority."), h(), h(), d(12, "div"), d(13, "div", 2), d(14, "span"), y(15, "i", 5), h(), h(), d(16, "h3", 4), g(17, "Responsive"), h(), d(18, "p", 4), g(19, "My layouts will work on any device, big or small."), h(), h(), d(20, "div"), d(21, "div", 2), d(22, "span"), y(23, "i", 6), h(), h(), d(24, "h3", 4), g(25, "Intuitive"), h(), d(26, "p", 4), g(27, "Strong preference for easy to use, intuitive UX/UI."), h(), h(), d(28, "div"), d(29, "div", 2), d(30, "span"), y(31, "i", 7), h(), h(), d(32, "h3", 4), g(33, "Dynamic"), h(), d(34, "p", 4), g(35, "Websites don't have to be static, I love making pages come to life."), h(), h(), h(), d(36, "div", 8), d(37, "div", 9), y(38, "img", 10), d(39, "div", 11), g(40, "Who's this guy?"), h(), d(41, "div", 12), g(42, " I'm a Front-End Developer for CISCO in Bangalore, India. "), y(43, "br"), g(44, " I have serious passion for UI effects, animations and creating intuitive, "), y(45, "br"), g(46, "frond-end development dynamic user experiences and product development. "), y(47, "br"), d(48, "a", 13), d(49, "span", 14), g(50, "Let's make something special."), h(), h(), h(), h(), d(51, "div", 15), d(52, "div", 16), d(53, "div", 17), d(54, "div", 18), g(55, "CSS"), h(), h(), d(56, "span"), g(57, "90%"), h(), h(), d(58, "div", 16), d(59, "div", 19), d(60, "div", 18), g(61, "HTML"), h(), h(), d(62, "span"), g(63, "90%"), h(), h(), d(64, "div", 16), d(65, "div", 20), d(66, "div", 18), g(67, "JavaScript"), h(), h(), d(68, "span"), g(69, "80%"), h(), h(), d(70, "div", 16), d(71, "div", 21), d(72, "div", 18), g(73, "Angular"), h(), h(), d(74, "span"), g(75, "70%"), h(), h(), d(76, "div", 16), d(77, "div", 17), d(78, "div", 18), g(79, "Highchart"), h(), h(), d(80, "span"), g(81, "90%"), h(), h(), d(82, "div", 16), d(83, "div", 20), d(84, "div", 18), g(85, "SASS"), h(), h(), d(86, "span"), g(87, "80%"), h(), h(), d(88, "div", 16), d(89, "div", 20), d(90, "div", 18), g(91, "Logic Apps"), h(), h(), d(92, "span"), g(93, "80%"), h(), h(), d(94, "div", 16), d(95, "div", 17), d(96, "div", 18), g(97, "UI Design"), h(), h(), d(98, "span"), g(99, "90%"), h(), h(), d(100, "div", 16), d(101, "div", 17), d(102, "div", 18), g(103, "Photoshop"), h(), h(), d(104, "span"), g(105, "90%"), h(), h(), d(106, "div", 16), d(107, "div", 21), d(108, "div", 18), g(109, "Illutrator"), h(), h(), d(110, "span"), g(111, "70%"), h(), h(), h(), h())
            },
            styles: [".about-div[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:40px;font-weight:500;padding-bottom:20px;border-bottom:3px solid #444;color:#444;padding-top:50px;width:123px}.about-div[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.known-technology[_ngcontent-%COMP%]{display:flex;flex-direction:row;padding:20px 50px}.known-technology[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:18px}.known-technology[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex:25%;text-align:center;padding:10px}h3[_ngcontent-%COMP%]{font-size:24px;font-weight:600;margin-top:20px}.code-circle[_ngcontent-%COMP%]{background:#3c14ac;border-radius:50%;width:100px;height:100px;text-align:center;margin:auto}.code-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{vertical-align:middle;color:#fff;font-size:50px;margin-top:24px}section[_ngcontent-%COMP%]:nth-of-type(2)   .bar[_ngcontent-%COMP%]{align-items:flex-end;background-color:#eee;color:#666;font-size:7pt;height:22px;margin:0 0 12px;position:relative}.flex[_ngcontent-%COMP%]{align-items:center;display:flex;flex-direction:row;justify-content:center}.flex-50-gt-sm[_ngcontent-%COMP%]{display:block;text-align:center}.skills-wrapper[_ngcontent-%COMP%]   .me[_ngcontent-%COMP%]{height:200px}.skills-wrapper[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{margin:20px 0 15px}.bars-wrap[_ngcontent-%COMP%]{margin:50px auto 0;width:calc(100% - 15px);max-width:40%}.bar[_ngcontent-%COMP%]{align-items:flex-end;background-color:#eee;color:#666;font-size:7pt;height:28px;margin:0 0 12px;position:relative;color:#fff}.bar.fill[_ngcontent-%COMP%]{left:0;position:absolute;top:0;background-color:#1e0660;opacity:1;padding:0}.bar[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]{left:0;position:absolute;top:0;background-color:#3c14ac;color:#fff;height:100%;width:110px;font-size:14px}.bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:0 15px 0 0;z-index:1;color:#444;top:-4px;position:relative;font-size:12px;right:-272px}.skills-wrapper.flex.row-gt-sm[_ngcontent-%COMP%]{padding:60px}.label[_ngcontent-%COMP%]{font-size:30px;font-weight:bold}.dis[_ngcontent-%COMP%]{font-size:16px}.highlight[_ngcontent-%COMP%]{color:#3c14ac;font-size:18px;margin-top:30px;display:block;cursor:pointer}"]
          }), n
        })();
      const {
        isArray: dI
      } = Array;
      const mI = ["addListener", "removeListener"],
        pI = ["addEventListener", "removeEventListener"],
        gI = ["on", "off"];

      function Er(n, e, t, i) {
        if (U(t) && (i = t, t = void 0), i) return Er(n, e, t).pipe(function (n) {
          return Qa(e => function (n, e) {
            return dI(e) ? n(...e) : n(e)
          }(n, e))
        }(i));
        const [r, o] = function (n) {
          return U(n.addEventListener) && U(n.removeEventListener)
        }(n) ? pI.map(s => a => n[s](e, a, t)): function (n) {
          return U(n.addListener) && U(n.removeListener)
        }(n) ? mI.map(bb(n, e)) : function (n) {
          return U(n.on) && U(n.off)
        }(n) ? gI.map(bb(n, e)) : [];
        if (!r && Xa(n)) return Ja(s => Er(s, e, t))(sn(n));
        if (!r) throw new TypeError("Invalid event target");
        return new Le(s => {
          const a = (...l) => s.next(1 < l.length ? l : l[0]);
          return r(a), () => o(a)
        })
      }

      function bb(n, e) {
        return t => i => n[t](e, i)
      }
      const Fo = {
        schedule(n) {
          let e = requestAnimationFrame,
            t = cancelAnimationFrame;
          const {
            delegate: i
          } = Fo;
          i && (e = i.requestAnimationFrame, t = i.cancelAnimationFrame);
          const r = e(o => {
            t = void 0, n(o)
          });
          return new Se(() => null == t ? void 0 : t(r))
        },
        requestAnimationFrame(...n) {
          const {
            delegate: e
          } = Fo;
          return ((null == e ? void 0 : e.requestAnimationFrame) || requestAnimationFrame)(...n)
        },
        cancelAnimationFrame(...n) {
          const {
            delegate: e
          } = Fo;
          return ((null == e ? void 0 : e.cancelAnimationFrame) || cancelAnimationFrame)(...n)
        },
        delegate: void 0
      };
      new class extends td {
        flush(e) {
          this._active = !0, this._scheduled = void 0;
          const {
            actions: t
          } = this;
          let i, r = -1;
          e = e || t.shift();
          const o = t.length;
          do {
            if (i = e.execute(e.state, e.delay)) break
          } while (++r < o && (e = t.shift()));
          if (this._active = !1, i) {
            for (; ++r < o && (e = t.shift());) e.unsubscribe();
            throw i
          }
        }
      }(class extends ed {
        constructor(e, t) {
          super(e, t), this.scheduler = e, this.work = t
        }
        requestAsyncId(e, t, i = 0) {
          return null !== i && i > 0 ? super.requestAsyncId(e, t, i) : (e.actions.push(this), e._scheduled || (e._scheduled = Fo.requestAnimationFrame(() => e.flush(void 0))))
        }
        recycleAsyncId(e, t, i = 0) {
          if (null != i && i > 0 || null == i && this.delay > 0) return super.recycleAsyncId(e, t, i);
          0 === e.actions.length && (Fo.cancelAnimationFrame(t), e._scheduled = void 0)
        }
      });
      let $d, DI = 1;
      const ja = {};

      function Cb(n) {
        return n in ja && (delete ja[n], !0)
      }
      const MI = {
          setImmediate(n) {
            const e = DI++;
            return ja[e] = !0, $d || ($d = Promise.resolve()), $d.then(() => Cb(e) && n()), e
          },
          clearImmediate(n) {
            Cb(n)
          }
        },
        {
          setImmediate: EI,
          clearImmediate: xI
        } = MI,
        Va = {
          setImmediate(...n) {
            const {
              delegate: e
            } = Va;
            return ((null == e ? void 0 : e.setImmediate) || EI)(...n)
          },
          clearImmediate(n) {
            const {
              delegate: e
            } = Va;
            return ((null == e ? void 0 : e.clearImmediate) || xI)(n)
          },
          delegate: void 0
        };
      new class extends td {
        flush(e) {
          this._active = !0, this._scheduled = void 0;
          const {
            actions: t
          } = this;
          let i, r = -1;
          e = e || t.shift();
          const o = t.length;
          do {
            if (i = e.execute(e.state, e.delay)) break
          } while (++r < o && (e = t.shift()));
          if (this._active = !1, i) {
            for (; ++r < o && (e = t.shift());) e.unsubscribe();
            throw i
          }
        }
      }(class extends ed {
        constructor(e, t) {
          super(e, t), this.scheduler = e, this.work = t
        }
        requestAsyncId(e, t, i = 0) {
          return null !== i && i > 0 ? super.requestAsyncId(e, t, i) : (e.actions.push(this), e._scheduled || (e._scheduled = Va.setImmediate(e.flush.bind(e, void 0))))
        }
        recycleAsyncId(e, t, i = 0) {
          if (null != i && i > 0 || null == i && this.delay > 0) return super.recycleAsyncId(e, t, i);
          0 === e.actions.length && (Va.clearImmediate(t), e._scheduled = void 0)
        }
      });

      function wb(n = 0, e, t = Yy) {
        let i = -1;
        return null != e && (Mh(e) ? t = e : i = e), new Le(r => {
          let o = function (n) {
            return n instanceof Date && !isNaN(n)
          }(n) ? +n - t.now() : n;
          o < 0 && (o = 0);
          let s = 0;
          return t.schedule(function () {
            r.closed || (r.next(s++), 0 <= i ? this.schedule(void 0, i) : r.complete())
          }, o)
        })
      }

      function Db(n, e = Yy) {
        return function (n) {
          return ht((e, t) => {
            let i = !1,
              r = null,
              o = null,
              s = !1;
            const a = () => {
                if (null == o || o.unsubscribe(), o = null, i) {
                  i = !1;
                  const c = r;
                  r = null, t.next(c)
                }
                s && t.complete()
              },
              l = () => {
                o = null, s && t.complete()
              };
            e.subscribe(new Pt(t, c => {
              i = !0, r = c, o || sn(n()).subscribe(o = new Pt(t, a, l))
            }, () => {
              s = !0, (!i || !o || o.closed) && t.complete()
            }))
          })
        }(() => wb(n, e))
      }
      let II = (() => {
          class n {
            constructor(t, i, r) {
              this._ngZone = t, this._platform = i, this._scrolled = new re, this._globalSubscription = null, this._scrolledCount = 0, this.scrollContainers = new Map, this._document = r
            }
            register(t) {
              this.scrollContainers.has(t) || this.scrollContainers.set(t, t.elementScrolled().subscribe(() => this._scrolled.next(t)))
            }
            deregister(t) {
              const i = this.scrollContainers.get(t);
              i && (i.unsubscribe(), this.scrollContainers.delete(t))
            }
            scrolled(t = 20) {
              return this._platform.isBrowser ? new Le(i => {
                this._globalSubscription || this._addGlobalListener();
                const r = t > 0 ? this._scrolled.pipe(Db(t)).subscribe(i) : this._scrolled.subscribe(i);
                return this._scrolledCount++, () => {
                  r.unsubscribe(), this._scrolledCount--, this._scrolledCount || this._removeGlobalListener()
                }
              }) : ma()
            }
            ngOnDestroy() {
              this._removeGlobalListener(), this.scrollContainers.forEach((t, i) => this.deregister(i)), this._scrolled.complete()
            }
            ancestorScrolled(t, i) {
              const r = this.getAncestorScrollContainers(t);
              return this.scrolled(i).pipe(ci(o => !o || r.indexOf(o) > -1))
            }
            getAncestorScrollContainers(t) {
              const i = [];
              return this.scrollContainers.forEach((r, o) => {
                this._scrollableContainsElement(o, t) && i.push(o)
              }), i
            }
            _getWindow() {
              return this._document.defaultView || window
            }
            _scrollableContainsElement(t, i) {
              let r = ui(i),
                o = t.getElementRef().nativeElement;
              do {
                if (r == o) return !0
              } while (r = r.parentElement);
              return !1
            }
            _addGlobalListener() {
              this._globalSubscription = this._ngZone.runOutsideAngular(() => Er(this._getWindow().document, "scroll").subscribe(() => this._scrolled.next()))
            }
            _removeGlobalListener() {
              this._globalSubscription && (this._globalSubscription.unsubscribe(), this._globalSubscription = null)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(J), M(wt), M(ee, 8))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        Ro = (() => {
          class n {
            constructor(t, i, r) {
              this._platform = t, this._change = new re, this._changeListener = o => {
                this._change.next(o)
              }, this._document = r, i.runOutsideAngular(() => {
                if (t.isBrowser) {
                  const o = this._getWindow();
                  o.addEventListener("resize", this._changeListener), o.addEventListener("orientationchange", this._changeListener)
                }
                this.change().subscribe(() => this._viewportSize = null)
              })
            }
            ngOnDestroy() {
              if (this._platform.isBrowser) {
                const t = this._getWindow();
                t.removeEventListener("resize", this._changeListener), t.removeEventListener("orientationchange", this._changeListener)
              }
              this._change.complete()
            }
            getViewportSize() {
              this._viewportSize || this._updateViewportSize();
              const t = {
                width: this._viewportSize.width,
                height: this._viewportSize.height
              };
              return this._platform.isBrowser || (this._viewportSize = null), t
            }
            getViewportRect() {
              const t = this.getViewportScrollPosition(),
                {
                  width: i,
                  height: r
                } = this.getViewportSize();
              return {
                top: t.top,
                left: t.left,
                bottom: t.top + r,
                right: t.left + i,
                height: r,
                width: i
              }
            }
            getViewportScrollPosition() {
              if (!this._platform.isBrowser) return {
                top: 0,
                left: 0
              };
              const t = this._document,
                i = this._getWindow(),
                r = t.documentElement,
                o = r.getBoundingClientRect();
              return {
                top: -o.top || t.body.scrollTop || i.scrollY || r.scrollTop || 0,
                left: -o.left || t.body.scrollLeft || i.scrollX || r.scrollLeft || 0
              }
            }
            change(t = 20) {
              return t > 0 ? this._change.pipe(Db(t)) : this._change
            }
            _getWindow() {
              return this._document.defaultView || window
            }
            _updateViewportSize() {
              const t = this._getWindow();
              this._viewportSize = this._platform.isBrowser ? {
                width: t.innerWidth,
                height: t.innerHeight
              } : {
                width: 0,
                height: 0
              }
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(wt), M(J), M(ee, 8))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        Mb = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({}), n
        })(),
        Eb = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            imports: [
              [Po, _a, Mb], Po, Mb
            ]
          }), n
        })();
      class Ud {
        attach(e) {
          return this._attachedHost = e, e.attach(this)
        }
        detach() {
          let e = this._attachedHost;
          null != e && (this._attachedHost = null, e.detach())
        }
        get isAttached() {
          return null != this._attachedHost
        }
        setAttachedHost(e) {
          this._attachedHost = e
        }
      }
      class Gd extends Ud {
        constructor(e, t, i, r) {
          super(), this.component = e, this.viewContainerRef = t, this.injector = i, this.componentFactoryResolver = r
        }
      }
      class Wd extends Ud {
        constructor(e, t, i) {
          super(), this.templateRef = e, this.viewContainerRef = t, this.context = i
        }
        get origin() {
          return this.templateRef.elementRef
        }
        attach(e, t = this.context) {
          return this.context = t, super.attach(e)
        }
        detach() {
          return this.context = void 0, super.detach()
        }
      }
      class RI extends Ud {
        constructor(e) {
          super(), this.element = e instanceof de ? e.nativeElement : e
        }
      }
      class qd {
        constructor() {
          this._isDisposed = !1, this.attachDomPortal = null
        }
        hasAttached() {
          return !!this._attachedPortal
        }
        attach(e) {
          return e instanceof Gd ? (this._attachedPortal = e, this.attachComponentPortal(e)) : e instanceof Wd ? (this._attachedPortal = e, this.attachTemplatePortal(e)) : this.attachDomPortal && e instanceof RI ? (this._attachedPortal = e, this.attachDomPortal(e)) : void 0
        }
        detach() {
          this._attachedPortal && (this._attachedPortal.setAttachedHost(null), this._attachedPortal = null), this._invokeDisposeFn()
        }
        dispose() {
          this.hasAttached() && this.detach(), this._invokeDisposeFn(), this._isDisposed = !0
        }
        setDisposeFn(e) {
          this._disposeFn = e
        }
        _invokeDisposeFn() {
          this._disposeFn && (this._disposeFn(), this._disposeFn = null)
        }
      }
      class NI extends qd {
        constructor(e, t, i, r, o) {
          super(), this.outletElement = e, this._componentFactoryResolver = t, this._appRef = i, this._defaultInjector = r, this.attachDomPortal = s => {
            const a = s.element,
              l = this._document.createComment("dom-portal");
            a.parentNode.insertBefore(l, a), this.outletElement.appendChild(a), this._attachedPortal = s, super.setDisposeFn(() => {
              l.parentNode && l.parentNode.replaceChild(a, l)
            })
          }, this._document = o
        }
        attachComponentPortal(e) {
          const i = (e.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(e.component);
          let r;
          return e.viewContainerRef ? (r = e.viewContainerRef.createComponent(i, e.viewContainerRef.length, e.injector || e.viewContainerRef.injector), this.setDisposeFn(() => r.destroy())) : (r = i.create(e.injector || this._defaultInjector), this._appRef.attachView(r.hostView), this.setDisposeFn(() => {
            this._appRef.detachView(r.hostView), r.destroy()
          })), this.outletElement.appendChild(this._getComponentRootNode(r)), this._attachedPortal = e, r
        }
        attachTemplatePortal(e) {
          let t = e.viewContainerRef,
            i = t.createEmbeddedView(e.templateRef, e.context);
          return i.rootNodes.forEach(r => this.outletElement.appendChild(r)), i.detectChanges(), this.setDisposeFn(() => {
            let r = t.indexOf(i); - 1 !== r && t.remove(r)
          }), this._attachedPortal = e, i
        }
        dispose() {
          super.dispose(), this.outletElement.remove()
        }
        _getComponentRootNode(e) {
          return e.hostView.rootNodes[0]
        }
      }
      let No = (() => {
          class n extends qd {
            constructor(t, i, r) {
              super(), this._componentFactoryResolver = t, this._viewContainerRef = i, this._isInitialized = !1, this.attached = new he, this.attachDomPortal = o => {
                const s = o.element,
                  a = this._document.createComment("dom-portal");
                o.setAttachedHost(this), s.parentNode.insertBefore(a, s), this._getRootNode().appendChild(s), this._attachedPortal = o, super.setDisposeFn(() => {
                  a.parentNode && a.parentNode.replaceChild(s, a)
                })
              }, this._document = r
            }
            get portal() {
              return this._attachedPortal
            }
            set portal(t) {
              this.hasAttached() && !t && !this._isInitialized || (this.hasAttached() && super.detach(), t && super.attach(t), this._attachedPortal = t || null)
            }
            get attachedRef() {
              return this._attachedRef
            }
            ngOnInit() {
              this._isInitialized = !0
            }
            ngOnDestroy() {
              super.dispose(), this._attachedPortal = null, this._attachedRef = null
            }
            attachComponentPortal(t) {
              t.setAttachedHost(this);
              const i = null != t.viewContainerRef ? t.viewContainerRef : this._viewContainerRef,
                o = (t.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(t.component),
                s = i.createComponent(o, i.length, t.injector || i.injector);
              return i !== this._viewContainerRef && this._getRootNode().appendChild(s.hostView.rootNodes[0]), super.setDisposeFn(() => s.destroy()), this._attachedPortal = t, this._attachedRef = s, this.attached.emit(s), s
            }
            attachTemplatePortal(t) {
              t.setAttachedHost(this);
              const i = this._viewContainerRef.createEmbeddedView(t.templateRef, t.context);
              return super.setDisposeFn(() => this._viewContainerRef.clear()), this._attachedPortal = t, this._attachedRef = i, this.attached.emit(i), i
            }
            _getRootNode() {
              const t = this._viewContainerRef.element.nativeElement;
              return t.nodeType === t.ELEMENT_NODE ? t : t.parentNode
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(zn), w(Ct), w(ee))
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "cdkPortalOutlet", ""]
            ],
            inputs: {
              portal: ["cdkPortalOutlet", "portal"]
            },
            outputs: {
              attached: "attached"
            },
            exportAs: ["cdkPortalOutlet"],
            features: [ct]
          }), n
        })(),
        Kd = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({}), n
        })();
      const xb = VP();
      class LI {
        constructor(e, t) {
          this._viewportRuler = e, this._previousHTMLStyles = {
            top: "",
            left: ""
          }, this._isEnabled = !1, this._document = t
        }
        attach() {}
        enable() {
          if (this._canBeEnabled()) {
            const e = this._document.documentElement;
            this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition(), this._previousHTMLStyles.left = e.style.left || "", this._previousHTMLStyles.top = e.style.top || "", e.style.left = Ne(-this._previousScrollPosition.left), e.style.top = Ne(-this._previousScrollPosition.top), e.classList.add("cdk-global-scrollblock"), this._isEnabled = !0
          }
        }
        disable() {
          if (this._isEnabled) {
            const e = this._document.documentElement,
              i = e.style,
              r = this._document.body.style,
              o = i.scrollBehavior || "",
              s = r.scrollBehavior || "";
            this._isEnabled = !1, i.left = this._previousHTMLStyles.left, i.top = this._previousHTMLStyles.top, e.classList.remove("cdk-global-scrollblock"), xb && (i.scrollBehavior = r.scrollBehavior = "auto"), window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top), xb && (i.scrollBehavior = o, r.scrollBehavior = s)
          }
        }
        _canBeEnabled() {
          if (this._document.documentElement.classList.contains("cdk-global-scrollblock") || this._isEnabled) return !1;
          const t = this._document.body,
            i = this._viewportRuler.getViewportSize();
          return t.scrollHeight > i.height || t.scrollWidth > i.width
        }
      }
      class BI {
        constructor(e, t, i, r) {
          this._scrollDispatcher = e, this._ngZone = t, this._viewportRuler = i, this._config = r, this._scrollSubscription = null, this._detach = () => {
            this.disable(), this._overlayRef.hasAttached() && this._ngZone.run(() => this._overlayRef.detach())
          }
        }
        attach(e) {
          this._overlayRef = e
        }
        enable() {
          if (this._scrollSubscription) return;
          const e = this._scrollDispatcher.scrolled(0);
          this._config && this._config.threshold && this._config.threshold > 1 ? (this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top, this._scrollSubscription = e.subscribe(() => {
            const t = this._viewportRuler.getViewportScrollPosition().top;
            Math.abs(t - this._initialScrollPosition) > this._config.threshold ? this._detach() : this._overlayRef.updatePosition()
          })) : this._scrollSubscription = e.subscribe(this._detach)
        }
        disable() {
          this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
        }
        detach() {
          this.disable(), this._overlayRef = null
        }
      }
      class Tb {
        enable() {}
        disable() {}
        attach() {}
      }

      function Yd(n, e) {
        return e.some(t => n.bottom < t.top || n.top > t.bottom || n.right < t.left || n.left > t.right)
      }

      function kb(n, e) {
        return e.some(t => n.top < t.top || n.bottom > t.bottom || n.left < t.left || n.right > t.right)
      }
      class jI {
        constructor(e, t, i, r) {
          this._scrollDispatcher = e, this._viewportRuler = t, this._ngZone = i, this._config = r, this._scrollSubscription = null
        }
        attach(e) {
          this._overlayRef = e
        }
        enable() {
          this._scrollSubscription || (this._scrollSubscription = this._scrollDispatcher.scrolled(this._config ? this._config.scrollThrottle : 0).subscribe(() => {
            if (this._overlayRef.updatePosition(), this._config && this._config.autoClose) {
              const t = this._overlayRef.overlayElement.getBoundingClientRect(),
                {
                  width: i,
                  height: r
                } = this._viewportRuler.getViewportSize();
              Yd(t, [{
                width: i,
                height: r,
                bottom: r,
                right: i,
                top: 0,
                left: 0
              }]) && (this.disable(), this._ngZone.run(() => this._overlayRef.detach()))
            }
          }))
        }
        disable() {
          this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
        }
        detach() {
          this.disable(), this._overlayRef = null
        }
      }
      let VI = (() => {
        class n {
          constructor(t, i, r, o) {
            this._scrollDispatcher = t, this._viewportRuler = i, this._ngZone = r, this.noop = () => new Tb, this.close = s => new BI(this._scrollDispatcher, this._ngZone, this._viewportRuler, s), this.block = () => new LI(this._viewportRuler, this._document), this.reposition = s => new jI(this._scrollDispatcher, this._viewportRuler, this._ngZone, s), this._document = o
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(M(II), M(Ro), M(J), M(ee))
        }, n.\u0275prov = I({
          token: n,
          factory: n.\u0275fac,
          providedIn: "root"
        }), n
      })();
      class Sb {
        constructor(e) {
          if (this.scrollStrategy = new Tb, this.panelClass = "", this.hasBackdrop = !1, this.backdropClass = "cdk-overlay-dark-backdrop", this.disposeOnNavigation = !1, e) {
            const t = Object.keys(e);
            for (const i of t) void 0 !== e[i] && (this[i] = e[i])
          }
        }
      }
      class HI {
        constructor(e, t) {
          this.connectionPair = e, this.scrollableViewProperties = t
        }
      }
      let Pb = (() => {
          class n {
            constructor(t) {
              this._attachedOverlays = [], this._document = t
            }
            ngOnDestroy() {
              this.detach()
            }
            add(t) {
              this.remove(t), this._attachedOverlays.push(t)
            }
            remove(t) {
              const i = this._attachedOverlays.indexOf(t);
              i > -1 && this._attachedOverlays.splice(i, 1), 0 === this._attachedOverlays.length && this.detach()
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(ee))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        zI = (() => {
          class n extends Pb {
            constructor(t) {
              super(t), this._keydownListener = i => {
                const r = this._attachedOverlays;
                for (let o = r.length - 1; o > -1; o--)
                  if (r[o]._keydownEvents.observers.length > 0) {
                    r[o]._keydownEvents.next(i);
                    break
                  }
              }
            }
            add(t) {
              super.add(t), this._isAttached || (this._document.body.addEventListener("keydown", this._keydownListener), this._isAttached = !0)
            }
            detach() {
              this._isAttached && (this._document.body.removeEventListener("keydown", this._keydownListener), this._isAttached = !1)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(ee))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        $I = (() => {
          class n extends Pb {
            constructor(t, i) {
              super(t), this._platform = i, this._cursorStyleIsSet = !1, this._pointerDownListener = r => {
                this._pointerDownEventTarget = hi(r)
              }, this._clickListener = r => {
                const o = hi(r),
                  s = "click" === r.type && this._pointerDownEventTarget ? this._pointerDownEventTarget : o;
                this._pointerDownEventTarget = null;
                const a = this._attachedOverlays.slice();
                for (let l = a.length - 1; l > -1; l--) {
                  const c = a[l];
                  if (!(c._outsidePointerEvents.observers.length < 1) && c.hasAttached()) {
                    if (c.overlayElement.contains(o) || c.overlayElement.contains(s)) break;
                    c._outsidePointerEvents.next(r)
                  }
                }
              }
            }
            add(t) {
              if (super.add(t), !this._isAttached) {
                const i = this._document.body;
                i.addEventListener("pointerdown", this._pointerDownListener, !0), i.addEventListener("click", this._clickListener, !0), i.addEventListener("auxclick", this._clickListener, !0), i.addEventListener("contextmenu", this._clickListener, !0), this._platform.IOS && !this._cursorStyleIsSet && (this._cursorOriginalValue = i.style.cursor, i.style.cursor = "pointer", this._cursorStyleIsSet = !0), this._isAttached = !0
              }
            }
            detach() {
              if (this._isAttached) {
                const t = this._document.body;
                t.removeEventListener("pointerdown", this._pointerDownListener, !0), t.removeEventListener("click", this._clickListener, !0), t.removeEventListener("auxclick", this._clickListener, !0), t.removeEventListener("contextmenu", this._clickListener, !0), this._platform.IOS && this._cursorStyleIsSet && (t.style.cursor = this._cursorOriginalValue, this._cursorStyleIsSet = !1), this._isAttached = !1
              }
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(ee), M(wt))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        Qd = (() => {
          class n {
            constructor(t, i) {
              this._platform = i, this._document = t
            }
            ngOnDestroy() {
              var t;
              null == (t = this._containerElement) || t.remove()
            }
            getContainerElement() {
              return this._containerElement || this._createContainer(), this._containerElement
            }
            _createContainer() {
              const t = "cdk-overlay-container";
              if (this._platform.isBrowser || od()) {
                const r = this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);
                for (let o = 0; o < r.length; o++) r[o].remove()
              }
              const i = this._document.createElement("div");
              i.classList.add(t), od() ? i.setAttribute("platform", "test") : this._platform.isBrowser || i.setAttribute("platform", "server"), this._document.body.appendChild(i), this._containerElement = i
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(ee), M(wt))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })();
      class UI {
        constructor(e, t, i, r, o, s, a, l, c) {
          this._portalOutlet = e, this._host = t, this._pane = i, this._config = r, this._ngZone = o, this._keyboardDispatcher = s, this._document = a, this._location = l, this._outsideClickDispatcher = c, this._backdropElement = null, this._backdropClick = new re, this._attachments = new re, this._detachments = new re, this._locationChanges = Se.EMPTY, this._backdropClickHandler = u => this._backdropClick.next(u), this._keydownEvents = new re, this._outsidePointerEvents = new re, r.scrollStrategy && (this._scrollStrategy = r.scrollStrategy, this._scrollStrategy.attach(this)), this._positionStrategy = r.positionStrategy
        }
        get overlayElement() {
          return this._pane
        }
        get backdropElement() {
          return this._backdropElement
        }
        get hostElement() {
          return this._host
        }
        attach(e) {
          let t = this._portalOutlet.attach(e);
          return !this._host.parentElement && this._previousHostParent && this._previousHostParent.appendChild(this._host), this._positionStrategy && this._positionStrategy.attach(this), this._updateStackingOrder(), this._updateElementSize(), this._updateElementDirection(), this._scrollStrategy && this._scrollStrategy.enable(), this._ngZone.onStable.pipe(bi(1)).subscribe(() => {
            this.hasAttached() && this.updatePosition()
          }), this._togglePointerEvents(!0), this._config.hasBackdrop && this._attachBackdrop(), this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0), this._attachments.next(), this._keyboardDispatcher.add(this), this._config.disposeOnNavigation && (this._locationChanges = this._location.subscribe(() => this.dispose())), this._outsideClickDispatcher.add(this), t
        }
        detach() {
          if (!this.hasAttached()) return;
          this.detachBackdrop(), this._togglePointerEvents(!1), this._positionStrategy && this._positionStrategy.detach && this._positionStrategy.detach(), this._scrollStrategy && this._scrollStrategy.disable();
          const e = this._portalOutlet.detach();
          return this._detachments.next(), this._keyboardDispatcher.remove(this), this._detachContentWhenStable(), this._locationChanges.unsubscribe(), this._outsideClickDispatcher.remove(this), e
        }
        dispose() {
          var t;
          const e = this.hasAttached();
          this._positionStrategy && this._positionStrategy.dispose(), this._disposeScrollStrategy(), this._disposeBackdrop(this._backdropElement), this._locationChanges.unsubscribe(), this._keyboardDispatcher.remove(this), this._portalOutlet.dispose(), this._attachments.complete(), this._backdropClick.complete(), this._keydownEvents.complete(), this._outsidePointerEvents.complete(), this._outsideClickDispatcher.remove(this), null == (t = this._host) || t.remove(), this._previousHostParent = this._pane = this._host = null, e && this._detachments.next(), this._detachments.complete()
        }
        hasAttached() {
          return this._portalOutlet.hasAttached()
        }
        backdropClick() {
          return this._backdropClick
        }
        attachments() {
          return this._attachments
        }
        detachments() {
          return this._detachments
        }
        keydownEvents() {
          return this._keydownEvents
        }
        outsidePointerEvents() {
          return this._outsidePointerEvents
        }
        getConfig() {
          return this._config
        }
        updatePosition() {
          this._positionStrategy && this._positionStrategy.apply()
        }
        updatePositionStrategy(e) {
          e !== this._positionStrategy && (this._positionStrategy && this._positionStrategy.dispose(), this._positionStrategy = e, this.hasAttached() && (e.attach(this), this.updatePosition()))
        }
        updateSize(e) {
          this._config = te(te({}, this._config), e), this._updateElementSize()
        }
        setDirection(e) {
          this._config = nh(te({}, this._config), {
            direction: e
          }), this._updateElementDirection()
        }
        addPanelClass(e) {
          this._pane && this._toggleClasses(this._pane, e, !0)
        }
        removePanelClass(e) {
          this._pane && this._toggleClasses(this._pane, e, !1)
        }
        getDirection() {
          const e = this._config.direction;
          return e ? "string" == typeof e ? e : e.value : "ltr"
        }
        updateScrollStrategy(e) {
          e !== this._scrollStrategy && (this._disposeScrollStrategy(), this._scrollStrategy = e, this.hasAttached() && (e.attach(this), e.enable()))
        }
        _updateElementDirection() {
          this._host.setAttribute("dir", this.getDirection())
        }
        _updateElementSize() {
          if (!this._pane) return;
          const e = this._pane.style;
          e.width = Ne(this._config.width), e.height = Ne(this._config.height), e.minWidth = Ne(this._config.minWidth), e.minHeight = Ne(this._config.minHeight), e.maxWidth = Ne(this._config.maxWidth), e.maxHeight = Ne(this._config.maxHeight)
        }
        _togglePointerEvents(e) {
          this._pane.style.pointerEvents = e ? "" : "none"
        }
        _attachBackdrop() {
          const e = "cdk-overlay-backdrop-showing";
          this._backdropElement = this._document.createElement("div"), this._backdropElement.classList.add("cdk-overlay-backdrop"), this._config.backdropClass && this._toggleClasses(this._backdropElement, this._config.backdropClass, !0), this._host.parentElement.insertBefore(this._backdropElement, this._host), this._backdropElement.addEventListener("click", this._backdropClickHandler), "undefined" != typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
              this._backdropElement && this._backdropElement.classList.add(e)
            })
          }) : this._backdropElement.classList.add(e)
        }
        _updateStackingOrder() {
          this._host.nextSibling && this._host.parentNode.appendChild(this._host)
        }
        detachBackdrop() {
          const e = this._backdropElement;
          if (!e) return;
          let t;
          const i = () => {
            e && (e.removeEventListener("click", this._backdropClickHandler), e.removeEventListener("transitionend", i), this._disposeBackdrop(e)), this._config.backdropClass && this._toggleClasses(e, this._config.backdropClass, !1), clearTimeout(t)
          };
          e.classList.remove("cdk-overlay-backdrop-showing"), this._ngZone.runOutsideAngular(() => {
            e.addEventListener("transitionend", i)
          }), e.style.pointerEvents = "none", t = this._ngZone.runOutsideAngular(() => setTimeout(i, 500))
        }
        _toggleClasses(e, t, i) {
          const r = Xy(t || []).filter(o => !!o);
          r.length && (i ? e.classList.add(...r) : e.classList.remove(...r))
        }
        _detachContentWhenStable() {
          this._ngZone.runOutsideAngular(() => {
            const e = this._ngZone.onStable.pipe(Gn(Pr(this._attachments, this._detachments))).subscribe(() => {
              (!this._pane || !this._host || 0 === this._pane.children.length) && (this._pane && this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !1), this._host && this._host.parentElement && (this._previousHostParent = this._host.parentElement, this._host.remove()), e.unsubscribe())
            })
          })
        }
        _disposeScrollStrategy() {
          const e = this._scrollStrategy;
          e && (e.disable(), e.detach && e.detach())
        }
        _disposeBackdrop(e) {
          e && (e.remove(), this._backdropElement === e && (this._backdropElement = null))
        }
      }
      const Ob = "cdk-overlay-connected-position-bounding-box",
        GI = /([A-Za-z%]+)$/;
      class WI {
        constructor(e, t, i, r, o) {
          this._viewportRuler = t, this._document = i, this._platform = r, this._overlayContainer = o, this._lastBoundingBoxSize = {
            width: 0,
            height: 0
          }, this._isPushed = !1, this._canPush = !0, this._growAfterOpen = !1, this._hasFlexibleDimensions = !0, this._positionLocked = !1, this._viewportMargin = 0, this._scrollables = [], this._preferredPositions = [], this._positionChanges = new re, this._resizeSubscription = Se.EMPTY, this._offsetX = 0, this._offsetY = 0, this._appliedPanelClasses = [], this.positionChanges = this._positionChanges, this.setOrigin(e)
        }
        get positions() {
          return this._preferredPositions
        }
        attach(e) {
          this._validatePositions(), e.hostElement.classList.add(Ob), this._overlayRef = e, this._boundingBox = e.hostElement, this._pane = e.overlayElement, this._isDisposed = !1, this._isInitialRender = !0, this._lastPosition = null, this._resizeSubscription.unsubscribe(), this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
            this._isInitialRender = !0, this.apply()
          })
        }
        apply() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          if (!this._isInitialRender && this._positionLocked && this._lastPosition) return void this.reapplyLastPosition();
          this._clearPanelClasses(), this._resetOverlayElementStyles(), this._resetBoundingBoxStyles(), this._viewportRect = this._getNarrowedViewportRect(), this._originRect = this._getOriginRect(), this._overlayRect = this._pane.getBoundingClientRect();
          const e = this._originRect,
            t = this._overlayRect,
            i = this._viewportRect,
            r = [];
          let o;
          for (let s of this._preferredPositions) {
            let a = this._getOriginPoint(e, s),
              l = this._getOverlayPoint(a, t, s),
              c = this._getOverlayFit(l, t, i, s);
            if (c.isCompletelyWithinViewport) return this._isPushed = !1, void this._applyPosition(s, a);
            this._canFitWithFlexibleDimensions(c, l, i) ? r.push({
              position: s,
              origin: a,
              overlayRect: t,
              boundingBoxRect: this._calculateBoundingBoxRect(a, s)
            }) : (!o || o.overlayFit.visibleArea < c.visibleArea) && (o = {
              overlayFit: c,
              overlayPoint: l,
              originPoint: a,
              position: s,
              overlayRect: t
            })
          }
          if (r.length) {
            let s = null,
              a = -1;
            for (const l of r) {
              const c = l.boundingBoxRect.width * l.boundingBoxRect.height * (l.position.weight || 1);
              c > a && (a = c, s = l)
            }
            return this._isPushed = !1, void this._applyPosition(s.position, s.origin)
          }
          if (this._canPush) return this._isPushed = !0, void this._applyPosition(o.position, o.originPoint);
          this._applyPosition(o.position, o.originPoint)
        }
        detach() {
          this._clearPanelClasses(), this._lastPosition = null, this._previousPushAmount = null, this._resizeSubscription.unsubscribe()
        }
        dispose() {
          this._isDisposed || (this._boundingBox && _i(this._boundingBox.style, {
            top: "",
            left: "",
            right: "",
            bottom: "",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: ""
          }), this._pane && this._resetOverlayElementStyles(), this._overlayRef && this._overlayRef.hostElement.classList.remove(Ob), this.detach(), this._positionChanges.complete(), this._overlayRef = this._boundingBox = null, this._isDisposed = !0)
        }
        reapplyLastPosition() {
          if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
            this._originRect = this._getOriginRect(), this._overlayRect = this._pane.getBoundingClientRect(), this._viewportRect = this._getNarrowedViewportRect();
            const e = this._lastPosition || this._preferredPositions[0],
              t = this._getOriginPoint(this._originRect, e);
            this._applyPosition(e, t)
          }
        }
        withScrollableContainers(e) {
          return this._scrollables = e, this
        }
        withPositions(e) {
          return this._preferredPositions = e, -1 === e.indexOf(this._lastPosition) && (this._lastPosition = null), this._validatePositions(), this
        }
        withViewportMargin(e) {
          return this._viewportMargin = e, this
        }
        withFlexibleDimensions(e = !0) {
          return this._hasFlexibleDimensions = e, this
        }
        withGrowAfterOpen(e = !0) {
          return this._growAfterOpen = e, this
        }
        withPush(e = !0) {
          return this._canPush = e, this
        }
        withLockedPosition(e = !0) {
          return this._positionLocked = e, this
        }
        setOrigin(e) {
          return this._origin = e, this
        }
        withDefaultOffsetX(e) {
          return this._offsetX = e, this
        }
        withDefaultOffsetY(e) {
          return this._offsetY = e, this
        }
        withTransformOriginOn(e) {
          return this._transformOriginSelector = e, this
        }
        _getOriginPoint(e, t) {
          let i, r;
          if ("center" == t.originX) i = e.left + e.width / 2;
          else {
            const o = this._isRtl() ? e.right : e.left,
              s = this._isRtl() ? e.left : e.right;
            i = "start" == t.originX ? o : s
          }
          return r = "center" == t.originY ? e.top + e.height / 2 : "top" == t.originY ? e.top : e.bottom, {
            x: i,
            y: r
          }
        }
        _getOverlayPoint(e, t, i) {
          let r, o;
          return r = "center" == i.overlayX ? -t.width / 2 : "start" === i.overlayX ? this._isRtl() ? -t.width : 0 : this._isRtl() ? 0 : -t.width, o = "center" == i.overlayY ? -t.height / 2 : "top" == i.overlayY ? 0 : -t.height, {
            x: e.x + r,
            y: e.y + o
          }
        }
        _getOverlayFit(e, t, i, r) {
          const o = Ib(t);
          let {
            x: s,
            y: a
          } = e, l = this._getOffset(r, "x"), c = this._getOffset(r, "y");
          l && (s += l), c && (a += c);
          let m = 0 - a,
            p = a + o.height - i.height,
            _ = this._subtractOverflows(o.width, 0 - s, s + o.width - i.width),
            v = this._subtractOverflows(o.height, m, p),
            C = _ * v;
          return {
            visibleArea: C,
            isCompletelyWithinViewport: o.width * o.height === C,
            fitsInViewportVertically: v === o.height,
            fitsInViewportHorizontally: _ == o.width
          }
        }
        _canFitWithFlexibleDimensions(e, t, i) {
          if (this._hasFlexibleDimensions) {
            const r = i.bottom - t.y,
              o = i.right - t.x,
              s = Ab(this._overlayRef.getConfig().minHeight),
              a = Ab(this._overlayRef.getConfig().minWidth),
              c = e.fitsInViewportHorizontally || null != a && a <= o;
            return (e.fitsInViewportVertically || null != s && s <= r) && c
          }
          return !1
        }
        _pushOverlayOnScreen(e, t, i) {
          if (this._previousPushAmount && this._positionLocked) return {
            x: e.x + this._previousPushAmount.x,
            y: e.y + this._previousPushAmount.y
          };
          const r = Ib(t),
            o = this._viewportRect,
            s = Math.max(e.x + r.width - o.width, 0),
            a = Math.max(e.y + r.height - o.height, 0),
            l = Math.max(o.top - i.top - e.y, 0),
            c = Math.max(o.left - i.left - e.x, 0);
          let u = 0,
            f = 0;
          return u = r.width <= o.width ? c || -s : e.x < this._viewportMargin ? o.left - i.left - e.x : 0, f = r.height <= o.height ? l || -a : e.y < this._viewportMargin ? o.top - i.top - e.y : 0, this._previousPushAmount = {
            x: u,
            y: f
          }, {
            x: e.x + u,
            y: e.y + f
          }
        }
        _applyPosition(e, t) {
          if (this._setTransformOrigin(e), this._setOverlayElementStyles(t, e), this._setBoundingBoxStyles(t, e), e.panelClass && this._addPanelClasses(e.panelClass), this._lastPosition = e, this._positionChanges.observers.length) {
            const i = this._getScrollVisibility(),
              r = new HI(e, i);
            this._positionChanges.next(r)
          }
          this._isInitialRender = !1
        }
        _setTransformOrigin(e) {
          if (!this._transformOriginSelector) return;
          const t = this._boundingBox.querySelectorAll(this._transformOriginSelector);
          let i, r = e.overlayY;
          i = "center" === e.overlayX ? "center" : this._isRtl() ? "start" === e.overlayX ? "right" : "left" : "start" === e.overlayX ? "left" : "right";
          for (let o = 0; o < t.length; o++) t[o].style.transformOrigin = `${i} ${r}`
        }
        _calculateBoundingBoxRect(e, t) {
          const i = this._viewportRect,
            r = this._isRtl();
          let o, s, a, u, f, m;
          if ("top" === t.overlayY) s = e.y, o = i.height - s + this._viewportMargin;
          else if ("bottom" === t.overlayY) a = i.height - e.y + 2 * this._viewportMargin, o = i.height - a + this._viewportMargin;
          else {
            const p = Math.min(i.bottom - e.y + i.top, e.y),
              _ = this._lastBoundingBoxSize.height;
            o = 2 * p, s = e.y - p, o > _ && !this._isInitialRender && !this._growAfterOpen && (s = e.y - _ / 2)
          }
          if ("end" === t.overlayX && !r || "start" === t.overlayX && r) m = i.width - e.x + this._viewportMargin, u = e.x - this._viewportMargin;
          else if ("start" === t.overlayX && !r || "end" === t.overlayX && r) f = e.x, u = i.right - e.x;
          else {
            const p = Math.min(i.right - e.x + i.left, e.x),
              _ = this._lastBoundingBoxSize.width;
            u = 2 * p, f = e.x - p, u > _ && !this._isInitialRender && !this._growAfterOpen && (f = e.x - _ / 2)
          }
          return {
            top: s,
            left: f,
            bottom: a,
            right: m,
            width: u,
            height: o
          }
        }
        _setBoundingBoxStyles(e, t) {
          const i = this._calculateBoundingBoxRect(e, t);
          !this._isInitialRender && !this._growAfterOpen && (i.height = Math.min(i.height, this._lastBoundingBoxSize.height), i.width = Math.min(i.width, this._lastBoundingBoxSize.width));
          const r = {};
          if (this._hasExactPosition()) r.top = r.left = "0", r.bottom = r.right = r.maxHeight = r.maxWidth = "", r.width = r.height = "100%";
          else {
            const o = this._overlayRef.getConfig().maxHeight,
              s = this._overlayRef.getConfig().maxWidth;
            r.height = Ne(i.height), r.top = Ne(i.top), r.bottom = Ne(i.bottom), r.width = Ne(i.width), r.left = Ne(i.left), r.right = Ne(i.right), r.alignItems = "center" === t.overlayX ? "center" : "end" === t.overlayX ? "flex-end" : "flex-start", r.justifyContent = "center" === t.overlayY ? "center" : "bottom" === t.overlayY ? "flex-end" : "flex-start", o && (r.maxHeight = Ne(o)), s && (r.maxWidth = Ne(s))
          }
          this._lastBoundingBoxSize = i, _i(this._boundingBox.style, r)
        }
        _resetBoundingBoxStyles() {
          _i(this._boundingBox.style, {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: ""
          })
        }
        _resetOverlayElementStyles() {
          _i(this._pane.style, {
            top: "",
            left: "",
            bottom: "",
            right: "",
            position: "",
            transform: ""
          })
        }
        _setOverlayElementStyles(e, t) {
          const i = {},
            r = this._hasExactPosition(),
            o = this._hasFlexibleDimensions,
            s = this._overlayRef.getConfig();
          if (r) {
            const u = this._viewportRuler.getViewportScrollPosition();
            _i(i, this._getExactOverlayY(t, e, u)), _i(i, this._getExactOverlayX(t, e, u))
          } else i.position = "static";
          let a = "",
            l = this._getOffset(t, "x"),
            c = this._getOffset(t, "y");
          l && (a += `translateX(${l}px) `), c && (a += `translateY(${c}px)`), i.transform = a.trim(), s.maxHeight && (r ? i.maxHeight = Ne(s.maxHeight) : o && (i.maxHeight = "")), s.maxWidth && (r ? i.maxWidth = Ne(s.maxWidth) : o && (i.maxWidth = "")), _i(this._pane.style, i)
        }
        _getExactOverlayY(e, t, i) {
          let r = {
              top: "",
              bottom: ""
            },
            o = this._getOverlayPoint(t, this._overlayRect, e);
          this._isPushed && (o = this._pushOverlayOnScreen(o, this._overlayRect, i));
          let s = this._overlayContainer.getContainerElement().getBoundingClientRect().top;
          return o.y -= s, "bottom" === e.overlayY ? r.bottom = this._document.documentElement.clientHeight - (o.y + this._overlayRect.height) + "px" : r.top = Ne(o.y), r
        }
        _getExactOverlayX(e, t, i) {
          let s, r = {
              left: "",
              right: ""
            },
            o = this._getOverlayPoint(t, this._overlayRect, e);
          return this._isPushed && (o = this._pushOverlayOnScreen(o, this._overlayRect, i)), s = this._isRtl() ? "end" === e.overlayX ? "left" : "right" : "end" === e.overlayX ? "right" : "left", "right" === s ? r.right = this._document.documentElement.clientWidth - (o.x + this._overlayRect.width) + "px" : r.left = Ne(o.x), r
        }
        _getScrollVisibility() {
          const e = this._getOriginRect(),
            t = this._pane.getBoundingClientRect(),
            i = this._scrollables.map(r => r.getElementRef().nativeElement.getBoundingClientRect());
          return {
            isOriginClipped: kb(e, i),
            isOriginOutsideView: Yd(e, i),
            isOverlayClipped: kb(t, i),
            isOverlayOutsideView: Yd(t, i)
          }
        }
        _subtractOverflows(e, ...t) {
          return t.reduce((i, r) => i - Math.max(r, 0), e)
        }
        _getNarrowedViewportRect() {
          const e = this._document.documentElement.clientWidth,
            t = this._document.documentElement.clientHeight,
            i = this._viewportRuler.getViewportScrollPosition();
          return {
            top: i.top + this._viewportMargin,
            left: i.left + this._viewportMargin,
            right: i.left + e - this._viewportMargin,
            bottom: i.top + t - this._viewportMargin,
            width: e - 2 * this._viewportMargin,
            height: t - 2 * this._viewportMargin
          }
        }
        _isRtl() {
          return "rtl" === this._overlayRef.getDirection()
        }
        _hasExactPosition() {
          return !this._hasFlexibleDimensions || this._isPushed
        }
        _getOffset(e, t) {
          return "x" === t ? null == e.offsetX ? this._offsetX : e.offsetX : null == e.offsetY ? this._offsetY : e.offsetY
        }
        _validatePositions() {}
        _addPanelClasses(e) {
          this._pane && Xy(e).forEach(t => {
            "" !== t && -1 === this._appliedPanelClasses.indexOf(t) && (this._appliedPanelClasses.push(t), this._pane.classList.add(t))
          })
        }
        _clearPanelClasses() {
          this._pane && (this._appliedPanelClasses.forEach(e => {
            this._pane.classList.remove(e)
          }), this._appliedPanelClasses = [])
        }
        _getOriginRect() {
          const e = this._origin;
          if (e instanceof de) return e.nativeElement.getBoundingClientRect();
          if (e instanceof Element) return e.getBoundingClientRect();
          const t = e.width || 0,
            i = e.height || 0;
          return {
            top: e.y,
            bottom: e.y + i,
            left: e.x,
            right: e.x + t,
            height: i,
            width: t
          }
        }
      }

      function _i(n, e) {
        for (let t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
        return n
      }

      function Ab(n) {
        if ("number" != typeof n && null != n) {
          const [e, t] = n.split(GI);
          return t && "px" !== t ? null : parseFloat(e)
        }
        return n || null
      }

      function Ib(n) {
        return {
          top: Math.floor(n.top),
          right: Math.floor(n.right),
          bottom: Math.floor(n.bottom),
          left: Math.floor(n.left),
          width: Math.floor(n.width),
          height: Math.floor(n.height)
        }
      }
      const Fb = "cdk-global-overlay-wrapper";
      class qI {
        constructor() {
          this._cssPosition = "static", this._topOffset = "", this._bottomOffset = "", this._leftOffset = "", this._rightOffset = "", this._alignItems = "", this._justifyContent = "", this._width = "", this._height = ""
        }
        attach(e) {
          const t = e.getConfig();
          this._overlayRef = e, this._width && !t.width && e.updateSize({
            width: this._width
          }), this._height && !t.height && e.updateSize({
            height: this._height
          }), e.hostElement.classList.add(Fb), this._isDisposed = !1
        }
        top(e = "") {
          return this._bottomOffset = "", this._topOffset = e, this._alignItems = "flex-start", this
        }
        left(e = "") {
          return this._rightOffset = "", this._leftOffset = e, this._justifyContent = "flex-start", this
        }
        bottom(e = "") {
          return this._topOffset = "", this._bottomOffset = e, this._alignItems = "flex-end", this
        }
        right(e = "") {
          return this._leftOffset = "", this._rightOffset = e, this._justifyContent = "flex-end", this
        }
        width(e = "") {
          return this._overlayRef ? this._overlayRef.updateSize({
            width: e
          }) : this._width = e, this
        }
        height(e = "") {
          return this._overlayRef ? this._overlayRef.updateSize({
            height: e
          }) : this._height = e, this
        }
        centerHorizontally(e = "") {
          return this.left(e), this._justifyContent = "center", this
        }
        centerVertically(e = "") {
          return this.top(e), this._alignItems = "center", this
        }
        apply() {
          if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
          const e = this._overlayRef.overlayElement.style,
            t = this._overlayRef.hostElement.style,
            i = this._overlayRef.getConfig(),
            {
              width: r,
              height: o,
              maxWidth: s,
              maxHeight: a
            } = i,
            l = !("100%" !== r && "100vw" !== r || s && "100%" !== s && "100vw" !== s),
            c = !("100%" !== o && "100vh" !== o || a && "100%" !== a && "100vh" !== a);
          e.position = this._cssPosition, e.marginLeft = l ? "0" : this._leftOffset, e.marginTop = c ? "0" : this._topOffset, e.marginBottom = this._bottomOffset, e.marginRight = this._rightOffset, l ? t.justifyContent = "flex-start" : "center" === this._justifyContent ? t.justifyContent = "center" : "rtl" === this._overlayRef.getConfig().direction ? "flex-start" === this._justifyContent ? t.justifyContent = "flex-end" : "flex-end" === this._justifyContent && (t.justifyContent = "flex-start") : t.justifyContent = this._justifyContent, t.alignItems = c ? "flex-start" : this._alignItems
        }
        dispose() {
          if (this._isDisposed || !this._overlayRef) return;
          const e = this._overlayRef.overlayElement.style,
            t = this._overlayRef.hostElement,
            i = t.style;
          t.classList.remove(Fb), i.justifyContent = i.alignItems = e.marginTop = e.marginBottom = e.marginLeft = e.marginRight = e.position = "", this._overlayRef = null, this._isDisposed = !0
        }
      }
      let KI = (() => {
          class n {
            constructor(t, i, r, o) {
              this._viewportRuler = t, this._document = i, this._platform = r, this._overlayContainer = o
            }
            global() {
              return new qI
            }
            flexibleConnectedTo(t) {
              return new WI(t, this._viewportRuler, this._document, this._platform, this._overlayContainer)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(Ro), M(ee), M(wt), M(Qd))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
          }), n
        })(),
        YI = 0,
        Ha = (() => {
          class n {
            constructor(t, i, r, o, s, a, l, c, u, f, m) {
              this.scrollStrategies = t, this._overlayContainer = i, this._componentFactoryResolver = r, this._positionBuilder = o, this._keyboardDispatcher = s, this._injector = a, this._ngZone = l, this._document = c, this._directionality = u, this._location = f, this._outsideClickDispatcher = m
            }
            create(t) {
              const i = this._createHostElement(),
                r = this._createPaneElement(i),
                o = this._createPortalOutlet(r),
                s = new Sb(t);
              return s.direction = s.direction || this._directionality.value, new UI(o, i, r, s, this._ngZone, this._keyboardDispatcher, this._document, this._location, this._outsideClickDispatcher)
            }
            position() {
              return this._positionBuilder
            }
            _createPaneElement(t) {
              const i = this._document.createElement("div");
              return i.id = "cdk-overlay-" + YI++, i.classList.add("cdk-overlay-pane"), t.appendChild(i), i
            }
            _createHostElement() {
              const t = this._document.createElement("div");
              return this._overlayContainer.getContainerElement().appendChild(t), t
            }
            _createPortalOutlet(t) {
              return this._appRef || (this._appRef = this._injector.get(vo)), new NI(t, this._componentFactoryResolver, this._appRef, this._injector, this._document)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(VI), M(Qd), M(zn), M(KI), M(zI), M(Ze), M(J), M(ee), M(Wn), M(Au), M($I))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac
          }), n
        })();
      const XI = {
        provide: new P("cdk-connected-overlay-scroll-strategy"),
        deps: [Ha],
        useFactory: function (n) {
          return () => n.scrollStrategies.reposition()
        }
      };
      let JI = (() => {
        class n {}
        return n.\u0275fac = function (t) {
          return new(t || n)
        }, n.\u0275mod = Me({
          type: n
        }), n.\u0275inj = ge({
          providers: [Ha, XI],
          imports: [
            [Po, Kd, Eb], Eb
          ]
        }), n
      })();

      function Rb(...n) {
        return Dh(1)(zo(n, Ho(n)))
      }

      function Zd(...n) {
        const e = Ho(n);
        return ht((t, i) => {
          (e ? Rb(n, t, e) : Rb(n, t)).subscribe(i)
        })
      }

      function nF(n, e) {}
      class Xd {
        constructor() {
          this.role = "dialog", this.panelClass = "", this.hasBackdrop = !0, this.backdropClass = "", this.disableClose = !1, this.width = "", this.height = "", this.maxWidth = "80vw", this.data = null, this.ariaDescribedBy = null, this.ariaLabelledBy = null, this.ariaLabel = null, this.autoFocus = "first-tabbable", this.restoreFocus = !0, this.closeOnNavigation = !0
        }
      }
      const iF = {
        dialogContainer: cd("dialogContainer", [br("void, exit", Dt({
          opacity: 0,
          transform: "scale(0.7)"
        })), br("enter", Dt({
          transform: "none"
        })), Cr("* => enter", vr("150ms cubic-bezier(0, 0, 0.2, 1)", Dt({
          transform: "none",
          opacity: 1
        }))), Cr("* => void, * => exit", vr("75ms cubic-bezier(0.4, 0.0, 0.2, 1)", Dt({
          opacity: 0
        })))])
      };
      let rF = (() => {
          class n extends qd {
            constructor(t, i, r, o, s, a, l, c) {
              super(), this._elementRef = t, this._focusTrapFactory = i, this._changeDetectorRef = r, this._config = s, this._interactivityChecker = a, this._ngZone = l, this._focusMonitor = c, this._animationStateChanged = new he, this._elementFocusedBeforeDialogWasOpened = null, this._closeInteractionType = null, this.attachDomPortal = u => (this._portalOutlet.hasAttached(), this._portalOutlet.attachDomPortal(u)), this._ariaLabelledBy = s.ariaLabelledBy || null, this._document = o
            }
            _initializeWithAttachedContent() {
              this._setupFocusTrap(), this._capturePreviouslyFocusedElement()
            }
            attachComponentPortal(t) {
              return this._portalOutlet.hasAttached(), this._portalOutlet.attachComponentPortal(t)
            }
            attachTemplatePortal(t) {
              return this._portalOutlet.hasAttached(), this._portalOutlet.attachTemplatePortal(t)
            }
            _recaptureFocus() {
              this._containsFocus() || this._trapFocus()
            }
            _forceFocus(t, i) {
              this._interactivityChecker.isFocusable(t) || (t.tabIndex = -1, this._ngZone.runOutsideAngular(() => {
                t.addEventListener("blur", () => t.removeAttribute("tabindex")), t.addEventListener("mousedown", () => t.removeAttribute("tabindex"))
              })), t.focus(i)
            }
            _focusByCssSelector(t, i) {
              let r = this._elementRef.nativeElement.querySelector(t);
              r && this._forceFocus(r, i)
            }
            _trapFocus() {
              const t = this._elementRef.nativeElement;
              switch (this._config.autoFocus) {
                case !1:
                case "dialog":
                  this._containsFocus() || t.focus();
                  break;
                case !0:
                case "first-tabbable":
                  this._focusTrap.focusInitialElementWhenReady().then(i => {
                    i || this._focusDialogContainer()
                  });
                  break;
                case "first-heading":
                  this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');
                  break;
                default:
                  this._focusByCssSelector(this._config.autoFocus)
              }
            }
            _restoreFocus() {
              const t = this._elementFocusedBeforeDialogWasOpened;
              if (this._config.restoreFocus && t && "function" == typeof t.focus) {
                const i = rd(),
                  r = this._elementRef.nativeElement;
                (!i || i === this._document.body || i === r || r.contains(i)) && (this._focusMonitor ? (this._focusMonitor.focusVia(t, this._closeInteractionType), this._closeInteractionType = null) : t.focus())
              }
              this._focusTrap && this._focusTrap.destroy()
            }
            _setupFocusTrap() {
              this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement)
            }
            _capturePreviouslyFocusedElement() {
              this._document && (this._elementFocusedBeforeDialogWasOpened = rd())
            }
            _focusDialogContainer() {
              this._elementRef.nativeElement.focus && this._elementRef.nativeElement.focus()
            }
            _containsFocus() {
              const t = this._elementRef.nativeElement,
                i = rd();
              return t === i || t.contains(i)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(sO), w(Tn), w(ee, 8), w(Xd), w(iv), w(J), w(ad))
          }, n.\u0275dir = ne({
            type: n,
            viewQuery: function (t, i) {
              if (1 & t && ut(No, 7), 2 & t) {
                let r;
                Ue(r = Ge()) && (i._portalOutlet = r.first)
              }
            },
            features: [ct]
          }), n
        })(),
        oF = (() => {
          class n extends rF {
            constructor() {
              super(...arguments), this._state = "enter"
            }
            _onAnimationDone({
              toState: t,
              totalTime: i
            }) {
              "enter" === t ? (this._trapFocus(), this._animationStateChanged.next({
                state: "opened",
                totalTime: i
              })) : "exit" === t && (this._restoreFocus(), this._animationStateChanged.next({
                state: "closed",
                totalTime: i
              }))
            }
            _onAnimationStart({
              toState: t,
              totalTime: i
            }) {
              "enter" === t ? this._animationStateChanged.next({
                state: "opening",
                totalTime: i
              }) : ("exit" === t || "void" === t) && this._animationStateChanged.next({
                state: "closing",
                totalTime: i
              })
            }
            _startExitAnimation() {
              this._state = "exit", this._changeDetectorRef.markForCheck()
            }
          }
          return n.\u0275fac = function () {
            let e;
            return function (i) {
              return (e || (e = function (n) {
                return In(() => {
                  const e = n.prototype.constructor,
                    t = e[Cn] || Al(e),
                    i = Object.prototype;
                  let r = Object.getPrototypeOf(n.prototype).constructor;
                  for (; r && r !== i;) {
                    const o = r[Cn] || Al(r);
                    if (o && o !== t) return o;
                    r = Object.getPrototypeOf(r)
                  }
                  return o => new o
                })
              }(n)))(i || n)
            }
          }(), n.\u0275cmp = W({
            type: n,
            selectors: [
              ["mat-dialog-container"]
            ],
            hostAttrs: ["tabindex", "-1", "aria-modal", "true", 1, "mat-dialog-container"],
            hostVars: 6,
            hostBindings: function (t, i) {
              1 & t && Uc("@dialogContainer.start", function (o) {
                return i._onAnimationStart(o)
              })("@dialogContainer.done", function (o) {
                return i._onAnimationDone(o)
              }), 2 & t && (js("id", i._id), Hn("role", i._config.role)("aria-labelledby", i._config.ariaLabel ? null : i._ariaLabelledBy)("aria-label", i._config.ariaLabel)("aria-describedby", i._config.ariaDescribedBy || null), Yc("@dialogContainer", i._state))
            },
            features: [ct],
            decls: 1,
            vars: 0,
            consts: [
              ["cdkPortalOutlet", ""]
            ],
            template: function (t, i) {
              1 & t && mn(0, nF, 0, 0, "ng-template", 0)
            },
            directives: [No],
            styles: [".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;box-sizing:content-box;margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],
            encapsulation: 2,
            data: {
              animation: [iF.dialogContainer]
            }
          }), n
        })(),
        sF = 0;
      class Jd {
        constructor(e, t, i = "mat-dialog-" + sF++) {
          this._overlayRef = e, this._containerInstance = t, this.id = i, this.disableClose = this._containerInstance._config.disableClose, this._afterOpened = new re, this._afterClosed = new re, this._beforeClosed = new re, this._state = 0, t._id = i, t._animationStateChanged.pipe(ci(r => "opened" === r.state), bi(1)).subscribe(() => {
            this._afterOpened.next(), this._afterOpened.complete()
          }), t._animationStateChanged.pipe(ci(r => "closed" === r.state), bi(1)).subscribe(() => {
            clearTimeout(this._closeFallbackTimeout), this._finishDialogClose()
          }), e.detachments().subscribe(() => {
            this._beforeClosed.next(this._result), this._beforeClosed.complete(), this._afterClosed.next(this._result), this._afterClosed.complete(), this.componentInstance = null, this._overlayRef.dispose()
          }), e.keydownEvents().pipe(ci(r => 27 === r.keyCode && !this.disableClose && !Ju(r))).subscribe(r => {
            r.preventDefault(), eh(this, "keyboard")
          }), e.backdropClick().subscribe(() => {
            this.disableClose ? this._containerInstance._recaptureFocus() : eh(this, "mouse")
          })
        }
        close(e) {
          this._result = e, this._containerInstance._animationStateChanged.pipe(ci(t => "closing" === t.state), bi(1)).subscribe(t => {
            this._beforeClosed.next(e), this._beforeClosed.complete(), this._overlayRef.detachBackdrop(), this._closeFallbackTimeout = setTimeout(() => this._finishDialogClose(), t.totalTime + 100)
          }), this._state = 1, this._containerInstance._startExitAnimation()
        }
        afterOpened() {
          return this._afterOpened
        }
        afterClosed() {
          return this._afterClosed
        }
        beforeClosed() {
          return this._beforeClosed
        }
        backdropClick() {
          return this._overlayRef.backdropClick()
        }
        keydownEvents() {
          return this._overlayRef.keydownEvents()
        }
        updatePosition(e) {
          let t = this._getPositionStrategy();
          return e && (e.left || e.right) ? e.left ? t.left(e.left) : t.right(e.right) : t.centerHorizontally(), e && (e.top || e.bottom) ? e.top ? t.top(e.top) : t.bottom(e.bottom) : t.centerVertically(), this._overlayRef.updatePosition(), this
        }
        updateSize(e = "", t = "") {
          return this._overlayRef.updateSize({
            width: e,
            height: t
          }), this._overlayRef.updatePosition(), this
        }
        addPanelClass(e) {
          return this._overlayRef.addPanelClass(e), this
        }
        removePanelClass(e) {
          return this._overlayRef.removePanelClass(e), this
        }
        getState() {
          return this._state
        }
        _finishDialogClose() {
          this._state = 2, this._overlayRef.dispose()
        }
        _getPositionStrategy() {
          return this._overlayRef.getConfig().positionStrategy
        }
      }

      function eh(n, e, t) {
        return void 0 !== n._containerInstance && (n._containerInstance._closeInteractionType = e), n.close(t)
      }
      const aF = new P("MatDialogData"),
        lF = new P("mat-dialog-default-options"),
        Nb = new P("mat-dialog-scroll-strategy"),
        uF = {
          provide: Nb,
          deps: [Ha],
          useFactory: function (n) {
            return () => n.scrollStrategies.block()
          }
        };
      let dF = (() => {
          class n {
            constructor(t, i, r, o, s, a, l, c, u, f) {
              this._overlay = t, this._injector = i, this._defaultOptions = r, this._parentDialog = o, this._overlayContainer = s, this._dialogRefConstructor = l, this._dialogContainerType = c, this._dialogDataToken = u, this._animationMode = f, this._openDialogsAtThisLevel = [], this._afterAllClosedAtThisLevel = new re, this._afterOpenedAtThisLevel = new re, this._ariaHiddenElements = new Map, this._dialogAnimatingOpen = !1, this.afterAllClosed = function (n) {
                return new Le(e => {
                  sn(n()).subscribe(e)
                })
              }(() => this.openDialogs.length ? this._getAfterAllClosed() : this._getAfterAllClosed().pipe(Zd(void 0))), this._scrollStrategy = a
            }
            get openDialogs() {
              return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel
            }
            get afterOpened() {
              return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel
            }
            _getAfterAllClosed() {
              const t = this._parentDialog;
              return t ? t._getAfterAllClosed() : this._afterAllClosedAtThisLevel
            }
            open(t, i) {
              if (i = function (n, e) {
                  return te(te({}, e), n)
                }(i, this._defaultOptions || new Xd), i.id && this.getDialogById(i.id), this._dialogAnimatingOpen) return this._lastDialogRef;
              const r = this._createOverlay(i),
                o = this._attachDialogContainer(r, i);
              if ("NoopAnimations" !== this._animationMode) {
                const a = o._animationStateChanged.subscribe(l => {
                  "opening" === l.state && (this._dialogAnimatingOpen = !0), "opened" === l.state && (this._dialogAnimatingOpen = !1, a.unsubscribe())
                });
                this._animationStateSubscriptions || (this._animationStateSubscriptions = new Se), this._animationStateSubscriptions.add(a)
              }
              const s = this._attachDialogContent(t, o, r, i);
              return this._lastDialogRef = s, this.openDialogs.length || this._hideNonDialogContentFromAssistiveTechnology(), this.openDialogs.push(s), s.afterClosed().subscribe(() => this._removeOpenDialog(s)), this.afterOpened.next(s), o._initializeWithAttachedContent(), s
            }
            closeAll() {
              this._closeDialogs(this.openDialogs)
            }
            getDialogById(t) {
              return this.openDialogs.find(i => i.id === t)
            }
            ngOnDestroy() {
              this._closeDialogs(this._openDialogsAtThisLevel), this._afterAllClosedAtThisLevel.complete(), this._afterOpenedAtThisLevel.complete(), this._animationStateSubscriptions && this._animationStateSubscriptions.unsubscribe()
            }
            _createOverlay(t) {
              const i = this._getOverlayConfig(t);
              return this._overlay.create(i)
            }
            _getOverlayConfig(t) {
              const i = new Sb({
                positionStrategy: this._overlay.position().global(),
                scrollStrategy: t.scrollStrategy || this._scrollStrategy(),
                panelClass: t.panelClass,
                hasBackdrop: t.hasBackdrop,
                direction: t.direction,
                minWidth: t.minWidth,
                minHeight: t.minHeight,
                maxWidth: t.maxWidth,
                maxHeight: t.maxHeight,
                disposeOnNavigation: t.closeOnNavigation
              });
              return t.backdropClass && (i.backdropClass = t.backdropClass), i
            }
            _attachDialogContainer(t, i) {
              const o = Ze.create({
                  parent: i && i.viewContainerRef && i.viewContainerRef.injector || this._injector,
                  providers: [{
                    provide: Xd,
                    useValue: i
                  }]
                }),
                s = new Gd(this._dialogContainerType, i.viewContainerRef, o, i.componentFactoryResolver);
              return t.attach(s).instance
            }
            _attachDialogContent(t, i, r, o) {
              const s = new this._dialogRefConstructor(r, i, o.id);
              if (t instanceof Bt) i.attachTemplatePortal(new Wd(t, null, {
                $implicit: o.data,
                dialogRef: s
              }));
              else {
                const a = this._createInjector(o, s, i),
                  l = i.attachComponentPortal(new Gd(t, o.viewContainerRef, a));
                s.componentInstance = l.instance
              }
              return s.updateSize(o.width, o.height).updatePosition(o.position), s
            }
            _createInjector(t, i, r) {
              const o = t && t.viewContainerRef && t.viewContainerRef.injector,
                s = [{
                  provide: this._dialogContainerType,
                  useValue: r
                }, {
                  provide: this._dialogDataToken,
                  useValue: t.data
                }, {
                  provide: this._dialogRefConstructor,
                  useValue: i
                }];
              return t.direction && (!o || !o.get(Wn, null, V.Optional)) && s.push({
                provide: Wn,
                useValue: {
                  value: t.direction,
                  change: ma()
                }
              }), Ze.create({
                parent: o || this._injector,
                providers: s
              })
            }
            _removeOpenDialog(t) {
              const i = this.openDialogs.indexOf(t);
              i > -1 && (this.openDialogs.splice(i, 1), this.openDialogs.length || (this._ariaHiddenElements.forEach((r, o) => {
                r ? o.setAttribute("aria-hidden", r) : o.removeAttribute("aria-hidden")
              }), this._ariaHiddenElements.clear(), this._getAfterAllClosed().next()))
            }
            _hideNonDialogContentFromAssistiveTechnology() {
              const t = this._overlayContainer.getContainerElement();
              if (t.parentElement) {
                const i = t.parentElement.children;
                for (let r = i.length - 1; r > -1; r--) {
                  let o = i[r];
                  o !== t && "SCRIPT" !== o.nodeName && "STYLE" !== o.nodeName && !o.hasAttribute("aria-live") && (this._ariaHiddenElements.set(o, o.getAttribute("aria-hidden")), o.setAttribute("aria-hidden", "true"))
                }
              }
            }
            _closeDialogs(t) {
              let i = t.length;
              for (; i--;) t[i].close()
            }
          }
          return n.\u0275fac = function (t) {
            ! function () {
              throw new Error("invalid")
            }()
          }, n.\u0275dir = ne({
            type: n
          }), n
        })(),
        za = (() => {
          class n extends dF {
            constructor(t, i, r, o, s, a, l, c) {
              super(t, i, o, a, l, s, Jd, oF, aF, c)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(M(Ha), M(Ze), M(Au, 8), M(lF, 8), M(Nb), M(n, 12), M(Qd), M(nn, 8))
          }, n.\u0275prov = I({
            token: n,
            factory: n.\u0275fac
          }), n
        })(),
        fF = 0,
        ve = (() => {
          class n {
            constructor(t, i, r) {
              this.dialogRef = t, this._elementRef = i, this._dialog = r, this.type = "button"
            }
            ngOnInit() {
              this.dialogRef || (this.dialogRef = Lb(this._elementRef, this._dialog.openDialogs))
            }
            ngOnChanges(t) {
              const i = t._matDialogClose || t._matDialogCloseResult;
              i && (this.dialogResult = i.currentValue)
            }
            _onButtonClick(t) {
              eh(this.dialogRef, 0 === t.screenX && 0 === t.screenY ? "keyboard" : "mouse", this.dialogResult)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(Jd, 8), w(de), w(za))
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "mat-dialog-close", ""],
              ["", "matDialogClose", ""]
            ],
            hostVars: 2,
            hostBindings: function (t, i) {
              1 & t && Y("click", function (o) {
                return i._onButtonClick(o)
              }), 2 & t && Hn("aria-label", i.ariaLabel || null)("type", i.type)
            },
            inputs: {
              ariaLabel: ["aria-label", "ariaLabel"],
              type: "type",
              dialogResult: ["mat-dialog-close", "dialogResult"],
              _matDialogClose: ["matDialogClose", "_matDialogClose"]
            },
            exportAs: ["matDialogClose"],
            features: [xi]
          }), n
        })(),
        be = (() => {
          class n {
            constructor(t, i, r) {
              this._dialogRef = t, this._elementRef = i, this._dialog = r, this.id = "mat-dialog-title-" + fF++
            }
            ngOnInit() {
              this._dialogRef || (this._dialogRef = Lb(this._elementRef, this._dialog.openDialogs)), this._dialogRef && Promise.resolve().then(() => {
                const t = this._dialogRef._containerInstance;
                t && !t._ariaLabelledBy && (t._ariaLabelledBy = this.id)
              })
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(Jd, 8), w(de), w(za))
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "mat-dialog-title", ""],
              ["", "matDialogTitle", ""]
            ],
            hostAttrs: [1, "mat-dialog-title"],
            hostVars: 1,
            hostBindings: function (t, i) {
              2 & t && js("id", i.id)
            },
            inputs: {
              id: "id"
            },
            exportAs: ["matDialogTitle"]
          }), n
        })(),
        Ce = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "mat-dialog-content", ""],
              ["mat-dialog-content"],
              ["", "matDialogContent", ""]
            ],
            hostAttrs: [1, "mat-dialog-content"]
          }), n
        })(),
        we = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "mat-dialog-actions", ""],
              ["mat-dialog-actions"],
              ["", "matDialogActions", ""]
            ],
            hostAttrs: [1, "mat-dialog-actions"]
          }), n
        })();

      function Lb(n, e) {
        let t = n.nativeElement.parentElement;
        for (; t && !t.classList.contains("mat-dialog-container");) t = t.parentElement;
        return t ? e.find(i => i.id === t.id) : null
      }
      let mF = (() => {
        class n {}
        return n.\u0275fac = function (t) {
          return new(t || n)
        }, n.\u0275mod = Me({
          type: n
        }), n.\u0275inj = ge({
          providers: [za, uF],
          imports: [
            [JI, Kd, rn], rn
          ]
        }), n
      })();

      function pF(n, e) {
        1 & n && Ns(0)
      }
      const Bb = ["*"];

      function gF(n, e) {}
      const _F = function (n) {
          return {
            animationDuration: n
          }
        },
        yF = function (n, e) {
          return {
            value: n,
            params: e
          }
        },
        vF = ["tabListContainer"],
        bF = ["tabList"],
        CF = ["tabListInner"],
        wF = ["nextPaginator"],
        DF = ["previousPaginator"],
        MF = ["tabBodyWrapper"],
        EF = ["tabHeader"];

      function xF(n, e) {}

      function TF(n, e) {
        1 & n && mn(0, xF, 0, 0, "ng-template", 9), 2 & n && _e("cdkPortalOutlet", Qt().$implicit.templateLabel)
      }

      function kF(n, e) {
        1 & n && g(0), 2 & n && Bs(Qt().$implicit.textLabel)
      }

      function SF(n, e) {
        if (1 & n) {
          const t = Fs();
          d(0, "div", 6), Y("click", function () {
            const r = ki(t),
              o = r.$implicit,
              s = r.index,
              a = Qt(),
              l = function (n) {
                return function (n, e) {
                  return n[e]
                }(N.lFrame.contextLView, 20 + n)
              }(1);
            return a._handleClick(o, l, s)
          })("cdkFocusChange", function (r) {
            const s = ki(t).index;
            return Qt()._tabFocusChanged(r, s)
          }), d(1, "div", 7), mn(2, TF, 1, 1, "ng-template", 8), mn(3, kF, 1, 1, "ng-template", 8), h(), h()
        }
        if (2 & n) {
          const t = e.$implicit,
            i = e.index,
            r = Qt();
          Je("mat-tab-label-active", r.selectedIndex == i), _e("id", r._getTabLabelId(i))("disabled", t.disabled)("matRippleDisabled", t.disabled || r.disableRipple), Hn("tabIndex", r._getTabIndex(t, i))("aria-posinset", i + 1)("aria-setsize", r._tabs.length)("aria-controls", r._getTabContentId(i))("aria-selected", r.selectedIndex == i)("aria-label", t.ariaLabel || null)("aria-labelledby", !t.ariaLabel && t.ariaLabelledby ? t.ariaLabelledby : null), $e(2), _e("ngIf", t.templateLabel), $e(1), _e("ngIf", !t.templateLabel)
        }
      }

      function PF(n, e) {
        if (1 & n) {
          const t = Fs();
          d(0, "mat-tab-body", 10), Y("_onCentered", function () {
            return ki(t), Qt()._removeTabBodyWrapperHeight()
          })("_onCentering", function (r) {
            return ki(t), Qt()._setTabBodyWrapperHeight(r)
          }), h()
        }
        if (2 & n) {
          const t = e.$implicit,
            i = e.index,
            r = Qt();
          Je("mat-tab-body-active", r.selectedIndex === i), _e("id", r._getTabContentId(i))("content", t.content)("position", t.position)("origin", t.origin)("animationDuration", r.animationDuration), Hn("tabindex", null != r.contentTabIndex && r.selectedIndex === i ? r.contentTabIndex : null)("aria-labelledby", r._getTabLabelId(i))
        }
      }
      const OF = new P("MatInkBarPositioner", {
        providedIn: "root",
        factory: function () {
          return e => ({
            left: e ? (e.offsetLeft || 0) + "px" : "0",
            width: e ? (e.offsetWidth || 0) + "px" : "0"
          })
        }
      });
      let jb = (() => {
        class n {
          constructor(t, i, r, o) {
            this._elementRef = t, this._ngZone = i, this._inkBarPositioner = r, this._animationMode = o
          }
          alignToElement(t) {
            this.show(), "undefined" != typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
              requestAnimationFrame(() => this._setStyles(t))
            }) : this._setStyles(t)
          }
          show() {
            this._elementRef.nativeElement.style.visibility = "visible"
          }
          hide() {
            this._elementRef.nativeElement.style.visibility = "hidden"
          }
          _setStyles(t) {
            const i = this._inkBarPositioner(t),
              r = this._elementRef.nativeElement;
            r.style.left = i.left, r.style.width = i.width
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(w(de), w(J), w(OF), w(nn, 8))
        }, n.\u0275dir = ne({
          type: n,
          selectors: [
            ["mat-ink-bar"]
          ],
          hostAttrs: [1, "mat-ink-bar"],
          hostVars: 2,
          hostBindings: function (t, i) {
            2 & t && Je("_mat-animation-noopable", "NoopAnimations" === i._animationMode)
          }
        }), n
      })();
      const IF = new P("MatTabContent"),
        FF = new P("MatTabLabel"),
        RF = new P("MAT_TAB"),
        NF = Hd(class {}),
        Vb = new P("MAT_TAB_GROUP");
      let Hb = (() => {
        class n extends NF {
          constructor(t, i) {
            super(), this._viewContainerRef = t, this._closestTabGroup = i, this.textLabel = "", this._contentPortal = null, this._stateChanges = new re, this.position = null, this.origin = null, this.isActive = !1
          }
          get templateLabel() {
            return this._templateLabel
          }
          set templateLabel(t) {
            this._setTemplateLabelInput(t)
          }
          get content() {
            return this._contentPortal
          }
          ngOnChanges(t) {
            (t.hasOwnProperty("textLabel") || t.hasOwnProperty("disabled")) && this._stateChanges.next()
          }
          ngOnDestroy() {
            this._stateChanges.complete()
          }
          ngOnInit() {
            this._contentPortal = new Wd(this._explicitContent || this._implicitContent, this._viewContainerRef)
          }
          _setTemplateLabelInput(t) {
            t && t._closestTab === this && (this._templateLabel = t)
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(w(Ct), w(Vb, 8))
        }, n.\u0275cmp = W({
          type: n,
          selectors: [
            ["mat-tab"]
          ],
          contentQueries: function (t, i, r) {
            if (1 & t && (go(r, FF, 5), go(r, IF, 7, Bt)), 2 & t) {
              let o;
              Ue(o = Ge()) && (i.templateLabel = o.first), Ue(o = Ge()) && (i._explicitContent = o.first)
            }
          },
          viewQuery: function (t, i) {
            if (1 & t && ut(Bt, 7), 2 & t) {
              let r;
              Ue(r = Ge()) && (i._implicitContent = r.first)
            }
          },
          inputs: {
            disabled: "disabled",
            textLabel: ["label", "textLabel"],
            ariaLabel: ["aria-label", "ariaLabel"],
            ariaLabelledby: ["aria-labelledby", "ariaLabelledby"]
          },
          exportAs: ["matTab"],
          features: [nu([{
            provide: RF,
            useExisting: n
          }]), ct, xi],
          ngContentSelectors: Bb,
          decls: 1,
          vars: 0,
          template: function (t, i) {
            1 & t && (Rs(), mn(0, pF, 1, 0, "ng-template"))
          },
          encapsulation: 2
        }), n
      })();
      const LF = {
        translateTab: cd("translateTab", [br("center, void, left-origin-center, right-origin-center", Dt({
          transform: "none"
        })), br("left", Dt({
          transform: "translate3d(-100%, 0, 0)",
          minHeight: "1px"
        })), br("right", Dt({
          transform: "translate3d(100%, 0, 0)",
          minHeight: "1px"
        })), Cr("* => left, * => right, left => center, right => center", vr("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)")), Cr("void => left-origin-center", [Dt({
          transform: "translate3d(-100%, 0, 0)"
        }), vr("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)")]), Cr("void => right-origin-center", [Dt({
          transform: "translate3d(100%, 0, 0)"
        }), vr("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)")])])
      };
      let BF = (() => {
          class n extends No {
            constructor(t, i, r, o) {
              super(t, i, o), this._host = r, this._centeringSub = Se.EMPTY, this._leavingSub = Se.EMPTY
            }
            ngOnInit() {
              super.ngOnInit(), this._centeringSub = this._host._beforeCentering.pipe(Zd(this._host._isCenterPosition(this._host._position))).subscribe(t => {
                t && !this.hasAttached() && this.attach(this._host._content)
              }), this._leavingSub = this._host._afterLeavingCenter.subscribe(() => {
                this.detach()
              })
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this._centeringSub.unsubscribe(), this._leavingSub.unsubscribe()
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(zn), w(Ct), w($o(() => zb)), w(ee))
          }, n.\u0275dir = ne({
            type: n,
            selectors: [
              ["", "matTabBodyHost", ""]
            ],
            features: [ct]
          }), n
        })(),
        jF = (() => {
          class n {
            constructor(t, i, r) {
              this._elementRef = t, this._dir = i, this._dirChangeSubscription = Se.EMPTY, this._translateTabComplete = new re, this._onCentering = new he, this._beforeCentering = new he, this._afterLeavingCenter = new he, this._onCentered = new he(!0), this.animationDuration = "500ms", i && (this._dirChangeSubscription = i.change.subscribe(o => {
                this._computePositionAnimationState(o), r.markForCheck()
              })), this._translateTabComplete.pipe(Zy((o, s) => o.fromState === s.fromState && o.toState === s.toState)).subscribe(o => {
                this._isCenterPosition(o.toState) && this._isCenterPosition(this._position) && this._onCentered.emit(), this._isCenterPosition(o.fromState) && !this._isCenterPosition(this._position) && this._afterLeavingCenter.emit()
              })
            }
            set position(t) {
              this._positionIndex = t, this._computePositionAnimationState()
            }
            ngOnInit() {
              "center" == this._position && null != this.origin && (this._position = this._computePositionFromOrigin(this.origin))
            }
            ngOnDestroy() {
              this._dirChangeSubscription.unsubscribe(), this._translateTabComplete.complete()
            }
            _onTranslateTabStarted(t) {
              const i = this._isCenterPosition(t.toState);
              this._beforeCentering.emit(i), i && this._onCentering.emit(this._elementRef.nativeElement.clientHeight)
            }
            _getLayoutDirection() {
              return this._dir && "rtl" === this._dir.value ? "rtl" : "ltr"
            }
            _isCenterPosition(t) {
              return "center" == t || "left-origin-center" == t || "right-origin-center" == t
            }
            _computePositionAnimationState(t = this._getLayoutDirection()) {
              this._position = this._positionIndex < 0 ? "ltr" == t ? "left" : "right" : this._positionIndex > 0 ? "ltr" == t ? "right" : "left" : "center"
            }
            _computePositionFromOrigin(t) {
              const i = this._getLayoutDirection();
              return "ltr" == i && t <= 0 || "rtl" == i && t > 0 ? "left-origin-center" : "right-origin-center"
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(Wn, 8), w(Tn))
          }, n.\u0275dir = ne({
            type: n,
            inputs: {
              _content: ["content", "_content"],
              origin: "origin",
              animationDuration: "animationDuration",
              position: "position"
            },
            outputs: {
              _onCentering: "_onCentering",
              _beforeCentering: "_beforeCentering",
              _afterLeavingCenter: "_afterLeavingCenter",
              _onCentered: "_onCentered"
            }
          }), n
        })(),
        zb = (() => {
          class n extends jF {
            constructor(t, i, r) {
              super(t, i, r)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(Wn, 8), w(Tn))
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["mat-tab-body"]
            ],
            viewQuery: function (t, i) {
              if (1 & t && ut(No, 5), 2 & t) {
                let r;
                Ue(r = Ge()) && (i._portalHost = r.first)
              }
            },
            hostAttrs: [1, "mat-tab-body"],
            features: [ct],
            decls: 3,
            vars: 6,
            consts: [
              ["cdkScrollable", "", 1, "mat-tab-body-content"],
              ["content", ""],
              ["matTabBodyHost", ""]
            ],
            template: function (t, i) {
              1 & t && (d(0, "div", 0, 1), Y("@translateTab.start", function (o) {
                return i._onTranslateTabStarted(o)
              })("@translateTab.done", function (o) {
                return i._translateTabComplete.next(o)
              }), mn(2, gF, 0, 0, "ng-template", 2), h()), 2 & t && _e("@translateTab", d_(3, yF, i._position, su(1, _F, i.animationDuration)))
            },
            directives: [BF],
            styles: [".mat-tab-body-content{height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}\n"],
            encapsulation: 2,
            data: {
              animation: [LF.translateTab]
            }
          }), n
        })();
      const $b = new P("MAT_TABS_CONFIG"),
        VF = Hd(class {});
      let Ub = (() => {
        class n extends VF {
          constructor(t) {
            super(), this.elementRef = t
          }
          focus() {
            this.elementRef.nativeElement.focus()
          }
          getOffsetLeft() {
            return this.elementRef.nativeElement.offsetLeft
          }
          getOffsetWidth() {
            return this.elementRef.nativeElement.offsetWidth
          }
        }
        return n.\u0275fac = function (t) {
          return new(t || n)(w(de))
        }, n.\u0275dir = ne({
          type: n,
          selectors: [
            ["", "matTabLabelWrapper", ""]
          ],
          hostVars: 3,
          hostBindings: function (t, i) {
            2 & t && (Hn("aria-disabled", !!i.disabled), Je("mat-tab-disabled", i.disabled))
          },
          inputs: {
            disabled: "disabled"
          },
          features: [ct]
        }), n
      })();
      const Gb = So({
        passive: !0
      });
      let $F = (() => {
          class n {
            constructor(t, i, r, o, s, a, l) {
              this._elementRef = t, this._changeDetectorRef = i, this._viewportRuler = r, this._dir = o, this._ngZone = s, this._platform = a, this._animationMode = l, this._scrollDistance = 0, this._selectedIndexChanged = !1, this._destroyed = new re, this._showPaginationControls = !1, this._disableScrollAfter = !0, this._disableScrollBefore = !0, this._stopScrolling = new re, this.disablePagination = !1, this._selectedIndex = 0, this.selectFocusedIndex = new he, this.indexFocused = new he, s.runOutsideAngular(() => {
                Er(t.nativeElement, "mouseleave").pipe(Gn(this._destroyed)).subscribe(() => {
                  this._stopInterval()
                })
              })
            }
            get selectedIndex() {
              return this._selectedIndex
            }
            set selectedIndex(t) {
              t = ga(t), this._selectedIndex != t && (this._selectedIndexChanged = !0, this._selectedIndex = t, this._keyManager && this._keyManager.updateActiveItem(t))
            }
            ngAfterViewInit() {
              Er(this._previousPaginator.nativeElement, "touchstart", Gb).pipe(Gn(this._destroyed)).subscribe(() => {
                this._handlePaginatorPress("before")
              }), Er(this._nextPaginator.nativeElement, "touchstart", Gb).pipe(Gn(this._destroyed)).subscribe(() => {
                this._handlePaginatorPress("after")
              })
            }
            ngAfterContentInit() {
              const t = this._dir ? this._dir.change : ma("ltr"),
                i = this._viewportRuler.change(150),
                r = () => {
                  this.updatePagination(), this._alignInkBarToSelectedTab()
                };
              this._keyManager = new KP(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap(), this._keyManager.updateActiveItem(this._selectedIndex), "undefined" != typeof requestAnimationFrame ? requestAnimationFrame(r) : r(), Pr(t, i, this._items.changes).pipe(Gn(this._destroyed)).subscribe(() => {
                this._ngZone.run(() => Promise.resolve().then(r)), this._keyManager.withHorizontalOrientation(this._getLayoutDirection())
              }), this._keyManager.change.pipe(Gn(this._destroyed)).subscribe(o => {
                this.indexFocused.emit(o), this._setTabFocus(o)
              })
            }
            ngAfterContentChecked() {
              this._tabLabelCount != this._items.length && (this.updatePagination(), this._tabLabelCount = this._items.length, this._changeDetectorRef.markForCheck()), this._selectedIndexChanged && (this._scrollToLabel(this._selectedIndex), this._checkScrollingControls(), this._alignInkBarToSelectedTab(), this._selectedIndexChanged = !1, this._changeDetectorRef.markForCheck()), this._scrollDistanceChanged && (this._updateTabScrollPosition(), this._scrollDistanceChanged = !1, this._changeDetectorRef.markForCheck())
            }
            ngOnDestroy() {
              this._destroyed.next(), this._destroyed.complete(), this._stopScrolling.complete()
            }
            _handleKeydown(t) {
              if (!Ju(t)) switch (t.keyCode) {
                case 13:
                case 32:
                  this.focusIndex !== this.selectedIndex && (this.selectFocusedIndex.emit(this.focusIndex), this._itemSelected(t));
                  break;
                default:
                  this._keyManager.onKeydown(t)
              }
            }
            _onContentChanges() {
              const t = this._elementRef.nativeElement.textContent;
              t !== this._currentTextContent && (this._currentTextContent = t || "", this._ngZone.run(() => {
                this.updatePagination(), this._alignInkBarToSelectedTab(), this._changeDetectorRef.markForCheck()
              }))
            }
            updatePagination() {
              this._checkPaginationEnabled(), this._checkScrollingControls(), this._updateTabScrollPosition()
            }
            get focusIndex() {
              return this._keyManager ? this._keyManager.activeItemIndex : 0
            }
            set focusIndex(t) {
              !this._isValidIndex(t) || this.focusIndex === t || !this._keyManager || this._keyManager.setActiveItem(t)
            }
            _isValidIndex(t) {
              if (!this._items) return !0;
              const i = this._items ? this._items.toArray()[t] : null;
              return !!i && !i.disabled
            }
            _setTabFocus(t) {
              if (this._showPaginationControls && this._scrollToLabel(t), this._items && this._items.length) {
                this._items.toArray()[t].focus();
                const i = this._tabListContainer.nativeElement;
                i.scrollLeft = "ltr" == this._getLayoutDirection() ? 0 : i.scrollWidth - i.offsetWidth
              }
            }
            _getLayoutDirection() {
              return this._dir && "rtl" === this._dir.value ? "rtl" : "ltr"
            }
            _updateTabScrollPosition() {
              if (this.disablePagination) return;
              const t = this.scrollDistance,
                i = "ltr" === this._getLayoutDirection() ? -t : t;
              this._tabList.nativeElement.style.transform = `translateX(${Math.round(i)}px)`, (this._platform.TRIDENT || this._platform.EDGE) && (this._tabListContainer.nativeElement.scrollLeft = 0)
            }
            get scrollDistance() {
              return this._scrollDistance
            }
            set scrollDistance(t) {
              this._scrollTo(t)
            }
            _scrollHeader(t) {
              return this._scrollTo(this._scrollDistance + ("before" == t ? -1 : 1) * this._tabListContainer.nativeElement.offsetWidth / 3)
            }
            _handlePaginatorClick(t) {
              this._stopInterval(), this._scrollHeader(t)
            }
            _scrollToLabel(t) {
              if (this.disablePagination) return;
              const i = this._items ? this._items.toArray()[t] : null;
              if (!i) return;
              const r = this._tabListContainer.nativeElement.offsetWidth,
                {
                  offsetLeft: o,
                  offsetWidth: s
                } = i.elementRef.nativeElement;
              let a, l;
              "ltr" == this._getLayoutDirection() ? (a = o, l = a + s) : (l = this._tabListInner.nativeElement.offsetWidth - o, a = l - s);
              const c = this.scrollDistance,
                u = this.scrollDistance + r;
              a < c ? this.scrollDistance -= c - a + 60 : l > u && (this.scrollDistance += l - u + 60)
            }
            _checkPaginationEnabled() {
              if (this.disablePagination) this._showPaginationControls = !1;
              else {
                const t = this._tabListInner.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
                t || (this.scrollDistance = 0), t !== this._showPaginationControls && this._changeDetectorRef.markForCheck(), this._showPaginationControls = t
              }
            }
            _checkScrollingControls() {
              this.disablePagination ? this._disableScrollAfter = this._disableScrollBefore = !0 : (this._disableScrollBefore = 0 == this.scrollDistance, this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance(), this._changeDetectorRef.markForCheck())
            }
            _getMaxScrollDistance() {
              return this._tabListInner.nativeElement.scrollWidth - this._tabListContainer.nativeElement.offsetWidth || 0
            }
            _alignInkBarToSelectedTab() {
              const t = this._items && this._items.length ? this._items.toArray()[this.selectedIndex] : null,
                i = t ? t.elementRef.nativeElement : null;
              i ? this._inkBar.alignToElement(i) : this._inkBar.hide()
            }
            _stopInterval() {
              this._stopScrolling.next()
            }
            _handlePaginatorPress(t, i) {
              i && null != i.button && 0 !== i.button || (this._stopInterval(), wb(650, 100).pipe(Gn(Pr(this._stopScrolling, this._destroyed))).subscribe(() => {
                const {
                  maxScrollDistance: r,
                  distance: o
                } = this._scrollHeader(t);
                (0 === o || o >= r) && this._stopInterval()
              }))
            }
            _scrollTo(t) {
              if (this.disablePagination) return {
                maxScrollDistance: 0,
                distance: 0
              };
              const i = this._getMaxScrollDistance();
              return this._scrollDistance = Math.max(0, Math.min(i, t)), this._scrollDistanceChanged = !0, this._checkScrollingControls(), {
                maxScrollDistance: i,
                distance: this._scrollDistance
              }
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(Tn), w(Ro), w(Wn, 8), w(J), w(wt), w(nn, 8))
          }, n.\u0275dir = ne({
            type: n,
            inputs: {
              disablePagination: "disablePagination"
            }
          }), n
        })(),
        UF = (() => {
          class n extends $F {
            constructor(t, i, r, o, s, a, l) {
              super(t, i, r, o, s, a, l), this._disableRipple = !1
            }
            get disableRipple() {
              return this._disableRipple
            }
            set disableRipple(t) {
              this._disableRipple = To(t)
            }
            _itemSelected(t) {
              t.preventDefault()
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(Tn), w(Ro), w(Wn, 8), w(J), w(wt), w(nn, 8))
          }, n.\u0275dir = ne({
            type: n,
            inputs: {
              disableRipple: "disableRipple"
            },
            features: [ct]
          }), n
        })(),
        GF = (() => {
          class n extends UF {
            constructor(t, i, r, o, s, a, l) {
              super(t, i, r, o, s, a, l)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(Tn), w(Ro), w(Wn, 8), w(J), w(wt), w(nn, 8))
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["mat-tab-header"]
            ],
            contentQueries: function (t, i, r) {
              if (1 & t && go(r, Ub, 4), 2 & t) {
                let o;
                Ue(o = Ge()) && (i._items = o)
              }
            },
            viewQuery: function (t, i) {
              if (1 & t && (ut(jb, 7), ut(vF, 7), ut(bF, 7), ut(CF, 7), ut(wF, 5), ut(DF, 5)), 2 & t) {
                let r;
                Ue(r = Ge()) && (i._inkBar = r.first), Ue(r = Ge()) && (i._tabListContainer = r.first), Ue(r = Ge()) && (i._tabList = r.first), Ue(r = Ge()) && (i._tabListInner = r.first), Ue(r = Ge()) && (i._nextPaginator = r.first), Ue(r = Ge()) && (i._previousPaginator = r.first)
              }
            },
            hostAttrs: [1, "mat-tab-header"],
            hostVars: 4,
            hostBindings: function (t, i) {
              2 & t && Je("mat-tab-header-pagination-controls-enabled", i._showPaginationControls)("mat-tab-header-rtl", "rtl" == i._getLayoutDirection())
            },
            inputs: {
              selectedIndex: "selectedIndex"
            },
            outputs: {
              selectFocusedIndex: "selectFocusedIndex",
              indexFocused: "indexFocused"
            },
            features: [ct],
            ngContentSelectors: Bb,
            decls: 14,
            vars: 8,
            consts: [
              ["aria-hidden", "true", "mat-ripple", "", 1, "mat-tab-header-pagination", "mat-tab-header-pagination-before", "mat-elevation-z4", 3, "matRippleDisabled", "click", "mousedown", "touchend"],
              ["previousPaginator", ""],
              [1, "mat-tab-header-pagination-chevron"],
              [1, "mat-tab-label-container", 3, "keydown"],
              ["tabListContainer", ""],
              ["role", "tablist", 1, "mat-tab-list", 3, "cdkObserveContent"],
              ["tabList", ""],
              [1, "mat-tab-labels"],
              ["tabListInner", ""],
              ["aria-hidden", "true", "mat-ripple", "", 1, "mat-tab-header-pagination", "mat-tab-header-pagination-after", "mat-elevation-z4", 3, "matRippleDisabled", "mousedown", "click", "touchend"],
              ["nextPaginator", ""]
            ],
            template: function (t, i) {
              1 & t && (Rs(), d(0, "div", 0, 1), Y("click", function () {
                return i._handlePaginatorClick("before")
              })("mousedown", function (o) {
                return i._handlePaginatorPress("before", o)
              })("touchend", function () {
                return i._stopInterval()
              }), y(2, "div", 2), h(), d(3, "div", 3, 4), Y("keydown", function (o) {
                return i._handleKeydown(o)
              }), d(5, "div", 5, 6), Y("cdkObserveContent", function () {
                return i._onContentChanges()
              }), d(7, "div", 7, 8), Ns(9), h(), y(10, "mat-ink-bar"), h(), h(), d(11, "div", 9, 10), Y("mousedown", function (o) {
                return i._handlePaginatorPress("after", o)
              })("click", function () {
                return i._handlePaginatorClick("after")
              })("touchend", function () {
                return i._stopInterval()
              }), y(13, "div", 2), h()), 2 & t && (Je("mat-tab-header-pagination-disabled", i._disableScrollBefore), _e("matRippleDisabled", i._disableScrollBefore || i.disableRipple), $e(5), Je("_mat-animation-noopable", "NoopAnimations" === i._animationMode), $e(6), Je("mat-tab-header-pagination-disabled", i._disableScrollAfter), _e("matRippleDisabled", i._disableScrollAfter || i.disableRipple))
            },
            directives: [Ba, UP, jb],
            styles: [".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-header-pagination{-webkit-user-select:none;-moz-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-rtl .mat-tab-header-pagination-before,.mat-tab-header-pagination-after{padding-right:4px}.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable.mat-ink-bar{transition:none;animation:none}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}.cdk-high-contrast-active .mat-ink-bar{outline:solid 2px;height:0}.mat-tab-labels{display:flex}[mat-align-tabs=center]>.mat-tab-header .mat-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-tab-header .mat-tab-labels{justify-content:flex-end}.mat-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}._mat-animation-noopable.mat-tab-list{transition:none;animation:none}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:none}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}.cdk-high-contrast-active .mat-tab-label:focus{outline:dotted 2px;outline-offset:-2px}.mat-tab-label.mat-tab-disabled{cursor:default}.cdk-high-contrast-active .mat-tab-label.mat-tab-disabled{opacity:.5}.mat-tab-label .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}.cdk-high-contrast-active .mat-tab-label{opacity:1}@media(max-width: 599px){.mat-tab-label{min-width:72px}}\n"],
            encapsulation: 2
          }), n
        })(),
        WF = 0;
      class qF {}
      const KF = mb(pb(class {
        constructor(n) {
          this._elementRef = n
        }
      }), "primary");
      let YF = (() => {
          class n extends KF {
            constructor(t, i, r, o) {
              var s;
              super(t), this._changeDetectorRef = i, this._animationMode = o, this._tabs = new fr, this._indexToSelect = 0, this._tabBodyWrapperHeight = 0, this._tabsSubscription = Se.EMPTY, this._tabLabelSubscription = Se.EMPTY, this._selectedIndex = null, this.headerPosition = "above", this.selectedIndexChange = new he, this.focusChange = new he, this.animationDone = new he, this.selectedTabChange = new he(!0), this._groupId = WF++, this.animationDuration = r && r.animationDuration ? r.animationDuration : "500ms", this.disablePagination = !(!r || null == r.disablePagination) && r.disablePagination, this.dynamicHeight = !(!r || null == r.dynamicHeight) && r.dynamicHeight, this.contentTabIndex = null != (s = null == r ? void 0 : r.contentTabIndex) ? s : null
            }
            get dynamicHeight() {
              return this._dynamicHeight
            }
            set dynamicHeight(t) {
              this._dynamicHeight = To(t)
            }
            get selectedIndex() {
              return this._selectedIndex
            }
            set selectedIndex(t) {
              this._indexToSelect = ga(t, null)
            }
            get animationDuration() {
              return this._animationDuration
            }
            set animationDuration(t) {
              this._animationDuration = /^\d+$/.test(t + "") ? t + "ms" : t
            }
            get contentTabIndex() {
              return this._contentTabIndex
            }
            set contentTabIndex(t) {
              this._contentTabIndex = ga(t, null)
            }
            get backgroundColor() {
              return this._backgroundColor
            }
            set backgroundColor(t) {
              const i = this._elementRef.nativeElement;
              i.classList.remove(`mat-background-${this.backgroundColor}`), t && i.classList.add(`mat-background-${t}`), this._backgroundColor = t
            }
            ngAfterContentChecked() {
              const t = this._indexToSelect = this._clampTabIndex(this._indexToSelect);
              if (this._selectedIndex != t) {
                const i = null == this._selectedIndex;
                if (!i) {
                  this.selectedTabChange.emit(this._createChangeEvent(t));
                  const r = this._tabBodyWrapper.nativeElement;
                  r.style.minHeight = r.clientHeight + "px"
                }
                Promise.resolve().then(() => {
                  this._tabs.forEach((r, o) => r.isActive = o === t), i || (this.selectedIndexChange.emit(t), this._tabBodyWrapper.nativeElement.style.minHeight = "")
                })
              }
              this._tabs.forEach((i, r) => {
                i.position = r - t, null != this._selectedIndex && 0 == i.position && !i.origin && (i.origin = t - this._selectedIndex)
              }), this._selectedIndex !== t && (this._selectedIndex = t, this._changeDetectorRef.markForCheck())
            }
            ngAfterContentInit() {
              this._subscribeToAllTabChanges(), this._subscribeToTabLabels(), this._tabsSubscription = this._tabs.changes.subscribe(() => {
                if (this._clampTabIndex(this._indexToSelect) === this._selectedIndex) {
                  const i = this._tabs.toArray();
                  for (let r = 0; r < i.length; r++)
                    if (i[r].isActive) {
                      this._indexToSelect = this._selectedIndex = r;
                      break
                    }
                }
                this._changeDetectorRef.markForCheck()
              })
            }
            _subscribeToAllTabChanges() {
              this._allTabs.changes.pipe(Zd(this._allTabs)).subscribe(t => {
                this._tabs.reset(t.filter(i => i._closestTabGroup === this || !i._closestTabGroup)), this._tabs.notifyOnChanges()
              })
            }
            ngOnDestroy() {
              this._tabs.destroy(), this._tabsSubscription.unsubscribe(), this._tabLabelSubscription.unsubscribe()
            }
            realignInkBar() {
              this._tabHeader && this._tabHeader._alignInkBarToSelectedTab()
            }
            focusTab(t) {
              const i = this._tabHeader;
              i && (i.focusIndex = t)
            }
            _focusChanged(t) {
              this.focusChange.emit(this._createChangeEvent(t))
            }
            _createChangeEvent(t) {
              const i = new qF;
              return i.index = t, this._tabs && this._tabs.length && (i.tab = this._tabs.toArray()[t]), i
            }
            _subscribeToTabLabels() {
              this._tabLabelSubscription && this._tabLabelSubscription.unsubscribe(), this._tabLabelSubscription = Pr(...this._tabs.map(t => t._stateChanges)).subscribe(() => this._changeDetectorRef.markForCheck())
            }
            _clampTabIndex(t) {
              return Math.min(this._tabs.length - 1, Math.max(t || 0, 0))
            }
            _getTabLabelId(t) {
              return `mat-tab-label-${this._groupId}-${t}`
            }
            _getTabContentId(t) {
              return `mat-tab-content-${this._groupId}-${t}`
            }
            _setTabBodyWrapperHeight(t) {
              if (!this._dynamicHeight || !this._tabBodyWrapperHeight) return;
              const i = this._tabBodyWrapper.nativeElement;
              i.style.height = this._tabBodyWrapperHeight + "px", this._tabBodyWrapper.nativeElement.offsetHeight && (i.style.height = t + "px")
            }
            _removeTabBodyWrapperHeight() {
              const t = this._tabBodyWrapper.nativeElement;
              this._tabBodyWrapperHeight = t.clientHeight, t.style.height = "", this.animationDone.emit()
            }
            _handleClick(t, i, r) {
              t.disabled || (this.selectedIndex = i.focusIndex = r)
            }
            _getTabIndex(t, i) {
              return t.disabled ? null : this.selectedIndex === i ? 0 : -1
            }
            _tabFocusChanged(t, i) {
              t && "mouse" !== t && "touch" !== t && (this._tabHeader.focusIndex = i)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(Tn), w($b, 8), w(nn, 8))
          }, n.\u0275dir = ne({
            type: n,
            inputs: {
              dynamicHeight: "dynamicHeight",
              selectedIndex: "selectedIndex",
              headerPosition: "headerPosition",
              animationDuration: "animationDuration",
              contentTabIndex: "contentTabIndex",
              disablePagination: "disablePagination",
              backgroundColor: "backgroundColor"
            },
            outputs: {
              selectedIndexChange: "selectedIndexChange",
              focusChange: "focusChange",
              animationDone: "animationDone",
              selectedTabChange: "selectedTabChange"
            },
            features: [ct]
          }), n
        })(),
        QF = (() => {
          class n extends YF {
            constructor(t, i, r, o) {
              super(t, i, r, o)
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(de), w(Tn), w($b, 8), w(nn, 8))
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["mat-tab-group"]
            ],
            contentQueries: function (t, i, r) {
              if (1 & t && go(r, Hb, 5), 2 & t) {
                let o;
                Ue(o = Ge()) && (i._allTabs = o)
              }
            },
            viewQuery: function (t, i) {
              if (1 & t && (ut(MF, 5), ut(EF, 5)), 2 & t) {
                let r;
                Ue(r = Ge()) && (i._tabBodyWrapper = r.first), Ue(r = Ge()) && (i._tabHeader = r.first)
              }
            },
            hostAttrs: [1, "mat-tab-group"],
            hostVars: 4,
            hostBindings: function (t, i) {
              2 & t && Je("mat-tab-group-dynamic-height", i.dynamicHeight)("mat-tab-group-inverted-header", "below" === i.headerPosition)
            },
            inputs: {
              color: "color",
              disableRipple: "disableRipple"
            },
            exportAs: ["matTabGroup"],
            features: [nu([{
              provide: Vb,
              useExisting: n
            }]), ct],
            decls: 6,
            vars: 7,
            consts: [
              [3, "selectedIndex", "disableRipple", "disablePagination", "indexFocused", "selectFocusedIndex"],
              ["tabHeader", ""],
              ["class", "mat-tab-label mat-focus-indicator", "role", "tab", "matTabLabelWrapper", "", "mat-ripple", "", "cdkMonitorElementFocus", "", 3, "id", "mat-tab-label-active", "disabled", "matRippleDisabled", "click", "cdkFocusChange", 4, "ngFor", "ngForOf"],
              [1, "mat-tab-body-wrapper"],
              ["tabBodyWrapper", ""],
              ["role", "tabpanel", 3, "id", "mat-tab-body-active", "content", "position", "origin", "animationDuration", "_onCentered", "_onCentering", 4, "ngFor", "ngForOf"],
              ["role", "tab", "matTabLabelWrapper", "", "mat-ripple", "", "cdkMonitorElementFocus", "", 1, "mat-tab-label", "mat-focus-indicator", 3, "id", "disabled", "matRippleDisabled", "click", "cdkFocusChange"],
              [1, "mat-tab-label-content"],
              [3, "ngIf"],
              [3, "cdkPortalOutlet"],
              ["role", "tabpanel", 3, "id", "content", "position", "origin", "animationDuration", "_onCentered", "_onCentering"]
            ],
            template: function (t, i) {
              1 & t && (d(0, "mat-tab-header", 0, 1), Y("indexFocused", function (o) {
                return i._focusChanged(o)
              })("selectFocusedIndex", function (o) {
                return i.selectedIndex = o
              }), mn(2, SF, 4, 14, "div", 2), h(), d(3, "div", 3, 4), mn(5, PF, 1, 9, "mat-tab-body", 5), h()), 2 & t && (_e("selectedIndex", i.selectedIndex || 0)("disableRipple", i.disableRipple)("disablePagination", i.disablePagination), $e(2), _e("ngForOf", i._tabs), $e(1), Je("_mat-animation-noopable", "NoopAnimations" === i._animationMode), $e(2), _e("ngForOf", i._tabs))
            },
            directives: [GF, Hu, Ub, Ba, hO, ky, No, zb],
            styles: [".mat-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-tab-group.mat-tab-group-inverted-header{flex-direction:column-reverse}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:none}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}.cdk-high-contrast-active .mat-tab-label:focus{outline:dotted 2px;outline-offset:-2px}.mat-tab-label.mat-tab-disabled{cursor:default}.cdk-high-contrast-active .mat-tab-label.mat-tab-disabled{opacity:.5}.mat-tab-label .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}.cdk-high-contrast-active .mat-tab-label{opacity:1}@media(max-width: 599px){.mat-tab-label{padding:0 12px}}@media(max-width: 959px){.mat-tab-label{padding:0 12px}}.mat-tab-group[mat-stretch-tabs]>.mat-tab-header .mat-tab-label{flex-basis:0;flex-grow:1}.mat-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable.mat-tab-body-wrapper{transition:none;animation:none}.mat-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-tab-body.mat-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-tab-group.mat-tab-group-dynamic-height .mat-tab-body.mat-tab-body-active{overflow-y:hidden}\n"],
            encapsulation: 2
          }), n
        })(),
        ZF = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            imports: [
              [Wu, rn, Kd, vb, sd, fO], rn
            ]
          }), n
        })();
      const me = '.project-div[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.project-div[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:40px;font-weight:500;border-bottom:3px solid #444;color:#444;padding:30px 0 40px;width:145px;margin-bottom:50px}.flex-box[_ngcontent-%COMP%]{flex-direction:row;display:flex}.javascript-mask1[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/ACM.PNG);height:200px;background-repeat:no-repeat;background-size:217%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.ui-design-mask1[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/food-app.jpg);height:200px;background-repeat:no-repeat;background-size:121%;background-position:-31px -234px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.ui-design-mask2[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/pet-corner-image.png);height:200px;background-repeat:no-repeat;background-size:121%;background-position:-30px 1px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.ui-design-mask3[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/food-website.png);height:200px;background-repeat:no-repeat;background-size:100%;border:1px solid #1e0660;margin:30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.ui-design-mask4[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/ping-network.png);height:200px;background-repeat:no-repeat;background-size:145%;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.ui-design-mask5[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/profile-log.png);height:200px;background-repeat:no-repeat;background-size:100%;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.ui-design-mask6[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/school-img.png);height:200px;background-repeat:no-repeat;background-size:100%;border:1px solid #1e0660;margin:30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.html-mask1[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/UAE-Exchange.PNG);height:200px;background-repeat:no-repeat;background-size:100%;border:1px solid #1e0660;margin:30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.html-mask2[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Adoptive-cards.PNG);height:200px;background-repeat:no-repeat;background-size:100%;border:1px solid #1e0660;margin:30px;cursor:pointer;flex:0 0 31%;display:inline-block}.html-mask3[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Cloudcherry-Dashbord-ui.PNG);height:200px;background-repeat:no-repeat;background-size:100%;border:1px solid #1e0660;margin:30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.html-mask4[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Webex-University.PNG);height:200px;background-repeat:no-repeat;background-size:138%;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.html-mask5[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Email-template.png);height:200px;background-repeat:no-repeat;background-size:217%;background-position:-194px 18px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.html-mask6[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/journey-mapping.PNG);height:200px;background-repeat:no-repeat;background-size:120%;border:1px solid #1e0660;margin:30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.javascript-mask2[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Humana.PNG);height:200px;background-repeat:no-repeat;background-size:100%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.javascript-mask3[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/starhub-dashboard.PNG);height:200px;background-repeat:no-repeat;background-size:135%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.javascript-mask4[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Starhub-usermanagement.PNG);height:200px;background-repeat:no-repeat;background-size:135%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.javascript-mask5[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/DBS-Report.PNG);height:200px;background-repeat:no-repeat;background-size:100%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.javascript-mask6[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/confirm-email-activation.PNG);height:200px;background-repeat:no-repeat;background-size:100%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.angular-mask1[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Channels.PNG);height:200px;background-repeat:no-repeat;background-size:150%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.angular-mask2[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Cli-config-generator.PNG);height:200px;background-repeat:no-repeat;background-size:150%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.angular-mask3[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Bulk-token-creation.PNG);height:200px;background-repeat:no-repeat;background-size:150%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.angular-mask4[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Export-reponses.PNG);height:200px;background-repeat:no-repeat;background-size:150%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.angular-mask5[_ngcontent-%COMP%]{background-image:url(./assets/My-project-images/Ticket-Setup.PNG);height:200px;background-repeat:no-repeat;background-size:150%;background-position:-5px -2px;border:1px solid #1e0660;margin:30px 30px 30px 0;cursor:pointer;flex:0 0 31%;display:inline-block}.my-projects[_ngcontent-%COMP%]{width:70%;margin:auto}.hover-title[_ngcontent-%COMP%]{margin-bottom:7px!important;font-size:30px}.inf-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/food-app.jpg);background-size:118%;background-position:-59px -521px;background-repeat:no-repeat;margin-bottom:30px}.petcorner-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/pet-corner-image.png);background-size:118%;background-position:-59px 0px;background-repeat:no-repeat;margin-bottom:30px}.dethai-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/food-website.png);background-size:118%;background-position:-59px 0px;background-repeat:no-repeat;margin-bottom:30px}.pingnetwork-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/ping-network.png);background-size:118%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.blackbooth-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/profile-log.png);background-size:118%;background-position:0px -680px;background-repeat:no-repeat;margin-bottom:30px}.beekids-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/school-img.png);background-size:119%;background-position:-56px -38px;background-repeat:no-repeat;margin-bottom:30px}.starhubinsight-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Adoptive-cards.PNG);background-size:108%;background-position:-8px -38px;background-repeat:no-repeat;margin-bottom:30px}.pushnotification-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Adoptive-cards.PNG);background-size:108%;background-position:-8px -38px;background-repeat:no-repeat;margin-bottom:30px}.menupanel-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Cloudcherry-Dashbord-ui.PNG);background-size:108%;background-position:-8px -38px;background-repeat:no-repeat;margin-bottom:30px}.wxmuniversity-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Webex-University.PNG);background-size:108%;background-position:-8px -38px;background-repeat:no-repeat;margin-bottom:30px}.emailtemplate-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Email-template.png);background-size:237%;background-position:-451px -8px;background-repeat:no-repeat;margin-bottom:30px}.journeymapping-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/journey-mapping.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.acm-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/ACM.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.singlepage-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Humana.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.starhubdashboard-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/starhub-dashboard.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.usermanagement-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Starhub-usermanagement.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.starhubreport-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/DBS-Report.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.activateuser-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/confirm-email-activation.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.channel-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Channels.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.CliDispatcher-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Cli-config-generator.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.bulktoken-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Bulk-token-creation.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.Exportresponses-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Export-reponses.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.ticketsetup-app-img[_ngcontent-%COMP%]{width:100%;height:300px;background-image:url(./assets/My-project-images/Ticket-Setup.PNG);background-size:100%;background-position:0px 0px;background-repeat:no-repeat;margin-bottom:30px}.subtitle[_ngcontent-%COMP%]{color:#a9a9a9;font-size:16px;margin-bottom:15px!important;display:block}hr[_ngcontent-%COMP%]{margin-bottom:15px}.box[_ngcontent-%COMP%]{text-align:center;overflow:hidden;position:relative}.box[_ngcontent-%COMP%]:before{content:"";background:linear-gradient(89.8deg,#1e0660 4.7%,#171730 120.3%);width:0;height:100%;opacity:0;position:absolute;top:0;left:50%;transition:all .5s ease}.box[_ngcontent-%COMP%]:hover:before{width:100%;opacity:.8;left:0}.box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;transform:scale(1);transition:all .5s ease-in-out}.box[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%]{opacity:.2;transform:scale(1.5)}.box[_ngcontent-%COMP%]   .box-content[_ngcontent-%COMP%]{color:#fff;width:100%;opacity:0;transform:translateY(-50%) scale(3);position:absolute;top:50%;left:0;z-index:1;transition:all .5s ease}.box[_ngcontent-%COMP%]:hover   .box-content[_ngcontent-%COMP%]{transform:translateY(-50%) scale(1);opacity:1}.box[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:25px;font-weight:700;letter-spacing:1px;text-transform:capitalize;margin:0 0 7px}.box[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]{font-size:15px;font-weight:400;font-style:italic;letter-spacing:1px;text-transform:capitalize;margin:0 0 11px;padding:0 0 2px;border:1px dashed rgba(255,255,255,.3);border-right:none;border-left:none;display:inline-block}@media only screen and (max-width: 990px){.box[_ngcontent-%COMP%]{margin:0 0 30px}}';
      let XF = (() => {
          class n {
            constructor(t) {
              this.dialog = t
            }
            openDialog() {
              this.dialog.open(JF, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            petcorner() {
              this.dialog.open(eR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            dethai() {
              this.dialog.open(tR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            pingnetwork() {
              this.dialog.open(nR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            blackbooth() {
              this.dialog.open(iR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            beekids() {
              this.dialog.open(rR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            starhubinsight() {
              this.dialog.open(oR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            pushnotification() {
              this.dialog.open(sR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            menupanel() {
              this.dialog.open(aR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            wxmuniversity() {
              this.dialog.open(lR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            emailtemplate() {
              this.dialog.open(cR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            journeymapping() {
              this.dialog.open(uR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            acm() {
              this.dialog.open(dR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            singlepage() {
              this.dialog.open(hR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            starhubdashboard() {
              this.dialog.open(fR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            usermanagement() {
              this.dialog.open(mR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            starhubreport() {
              this.dialog.open(pR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            activateuser() {
              this.dialog.open(gR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            Channel() {
              this.dialog.open(_R, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            clidispatcher() {
              this.dialog.open(yR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            bulktoken() {
              this.dialog.open(vR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            exportresponses() {
              this.dialog.open(bR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            ticketsetup() {
              this.dialog.open(CR, {
                height: "auto",
                width: "700px"
              }).afterClosed().subscribe(i => {})
            }
            ngOnInit() {}
          }
          return n.\u0275fac = function (t) {
            return new(t || n)(w(za))
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["app-project"]
            ],
            decls: 158,
            vars: 0,
            consts: [
              [1, "project-div"],
              ["id", "Portfolio", 1, "my-projects"],
              ["label", "UI Design"],
              [1, "flex-box"],
              ["data-aos", "flip-left", "data-aos-easing", "ease-out-cubic", "data-aos-duration", "2000", 1, "ui-design-mask1", "box", 3, "click"],
              [1, "box-content"],
              [1, "hover-title"],
              [1, "post"],
              ["data-aos", "flip-left", "data-aos-easing", "ease-out-cubic", "data-aos-duration", "2000", 1, "ui-design-mask2", "box", 3, "click"],
              ["data-aos", "flip-left", "data-aos-easing", "ease-out-cubic", "data-aos-duration", "2000", 1, "ui-design-mask3", "box", 3, "click"],
              ["data-aos", "flip-left", "data-aos-easing", "ease-out-cubic", "data-aos-duration", "2000", 1, "ui-design-mask4", "box", 3, "click"],
              ["data-aos", "flip-left", "data-aos-easing", "ease-out-cubic", "data-aos-duration", "2000", 1, "ui-design-mask5", "box", 3, "click"],
              ["data-aos", "flip-left", "data-aos-easing", "ease-out-cubic", "data-aos-duration", "2000", 1, "ui-design-mask6", "box", 3, "click"],
              ["label", "HTML & CSS"],
              [1, "html-mask1", "box", 3, "click"],
              [1, "html-mask2", "box", 3, "click"],
              [1, "html-mask3", "box", 3, "click"],
              [1, "html-mask4", "box", 3, "click"],
              [1, "html-mask5", "box", 3, "click"],
              [1, "html-mask6", "box", 3, "click"],
              ["label", "JavaScript"],
              [1, "javascript-mask1", "box", 3, "click"],
              [1, "javascript-mask2", "box", 3, "click"],
              [1, "javascript-mask3", "box"],
              [1, "box-content", 3, "click"],
              [1, "javascript-mask4", "box", 3, "click"],
              [1, "javascript-mask5", "box", 3, "click"],
              [1, "javascript-mask6", "box", 3, "click"],
              ["label", "Angular"],
              [1, "angular-mask1", "box", 3, "click"],
              [1, "angular-mask2", "box", 3, "click"],
              [1, "angular-mask3", "box", 3, "click"],
              [1, "angular-mask4", "box", 3, "click"],
              [1, "angular-mask5", "box", 3, "click"],
              [1, "angular-mask6", "box"]
            ],
            template: function (t, i) {
              1 & t && (d(0, "div", 0), d(1, "h1"), g(2, "Projects"), h(), h(), d(3, "mat-tab-group", 1), d(4, "mat-tab", 2), d(5, "div", 3), d(6, "div", 4), Y("click", function () {
                return i.openDialog()
              }), d(7, "div", 5), d(8, "h3", 6), g(9, "IFN App"), h(), d(10, "span", 7), g(11, "Food Network app design"), h(), h(), h(), d(12, "div", 8), Y("click", function () {
                return i.petcorner()
              }), d(13, "div", 5), d(14, "h3", 6), g(15, "Petcorner"), h(), d(16, "span", 7), g(17, "Petcorner website design"), h(), h(), h(), d(18, "div", 9), Y("click", function () {
                return i.dethai()
              }), d(19, "div", 5), d(20, "h3", 6), g(21, "Dethai"), h(), d(22, "span", 7), g(23, "Dethai website design"), h(), h(), h(), h(), d(24, "div", 3), d(25, "div", 10), Y("click", function () {
                return i.pingnetwork()
              }), d(26, "div", 5), d(27, "h3", 6), g(28, "Ping Network"), h(), d(29, "span", 7), g(30, "Ping Network website Design"), h(), h(), h(), d(31, "div", 11), Y("click", function () {
                return i.blackbooth()
              }), d(32, "div", 5), d(33, "h3", 6), g(34, "Black Booth App"), h(), d(35, "span", 7), g(36, "Black Booth App Design"), h(), h(), h(), d(37, "div", 12), Y("click", function () {
                return i.beekids()
              }), d(38, "div", 5), d(39, "h3", 6), g(40, "Beekids Design"), h(), d(41, "span", 7), g(42, "Beekids website design"), h(), h(), h(), h(), h(), d(43, "mat-tab", 13), d(44, "div", 3), d(45, "div", 14), Y("click", function () {
                return i.starhubinsight()
              }), d(46, "div", 5), d(47, "h3", 6), g(48, "Starhub Insight"), h(), d(49, "span", 7), g(50, "Starhub Monthly Analysis"), h(), h(), h(), d(51, "div", 15), Y("click", function () {
                return i.pushnotification()
              }), d(52, "div", 5), d(53, "h3", 6), g(54, "Cisco Webex teams"), h(), d(55, "span", 7), g(56, "Push Notification integration in the Webex Teams"), h(), h(), h(), d(57, "div", 16), Y("click", function () {
                return i.menupanel()
              }), d(58, "div", 5), d(59, "h3", 6), g(60, "Menu Panel"), h(), d(61, "span", 7), g(62, "Menu Panel POC for the cloudcherry Dashboard"), h(), h(), h(), h(), d(63, "div", 3), d(64, "div", 17), Y("click", function () {
                return i.wxmuniversity()
              }), d(65, "div", 5), d(66, "h3", 6), g(67, "Webex University"), h(), d(68, "span", 7), g(69, "Webex Experience Managements for Documentation "), h(), h(), h(), d(70, "div", 18), Y("click", function () {
                return i.emailtemplate()
              }), d(71, "div", 5), d(72, "h3", 6), g(73, "Email Template"), h(), d(74, "span", 7), g(75, "Webex Custermer Experiance management Email template for Notification, Response collection, onboarding user to the product. etc. "), h(), h(), h(), d(76, "div", 19), Y("click", function () {
                return i.journeymapping()
              }), d(77, "div", 5), d(78, "h3", 6), g(79, "Customer Journey Mapping"), h(), d(80, "span", 7), g(81, "Customer Journey Mapping to truck all kind of customer activity with the product "), h(), h(), h(), h(), h(), d(82, "mat-tab", 20), d(83, "div", 3), d(84, "div", 21), Y("click", function () {
                return i.acm()
              }), d(85, "div", 5), d(86, "h3", 6), g(87, "ACM"), h(), d(88, "span", 7), g(89, "Account configuration Management"), h(), h(), h(), d(90, "div", 22), Y("click", function () {
                return i.singlepage()
              }), d(91, "div", 5), d(92, "h3", 6), g(93, "Web Survey"), h(), d(94, "span", 7), g(95, "Single Page Web Survey"), h(), h(), h(), d(96, "div", 23), d(97, "div", 24), Y("click", function () {
                return i.starhubdashboard()
              }), d(98, "h3", 6), g(99, "Starhub"), h(), d(100, "span", 7), g(101, "Starhub Analytical Dashboard"), h(), h(), h(), h(), d(102, "div", 3), d(103, "div", 25), Y("click", function () {
                return i.usermanagement()
              }), d(104, "div", 5), d(105, "h3", 6), g(106, "Starhub"), h(), d(107, "span", 7), g(108, "User Management Dashboard"), h(), h(), h(), d(109, "div", 26), Y("click", function () {
                return i.starhubreport()
              }), d(110, "div", 5), d(111, "h3", 6), g(112, "Starhub"), h(), d(113, "span", 7), g(114, "Starhub Daily Report"), h(), h(), h(), d(115, "div", 27), Y("click", function () {
                return i.activateuser()
              }), d(116, "div", 5), d(117, "h3", 6), g(118, "WXM"), h(), d(119, "span", 7), g(120, "Webex Customer Experience Mangement Login activation Page"), h(), h(), h(), h(), h(), d(121, "mat-tab", 28), d(122, "div", 3), d(123, "div", 29), Y("click", function () {
                return i.Channel()
              }), d(124, "div", 5), d(125, "h3", 6), g(126, "Channel"), h(), d(127, "span", 7), g(128, "Cloudcherry Single Page Survey"), h(), h(), h(), d(129, "div", 30), Y("click", function () {
                return i.clidispatcher()
              }), d(130, "div", 5), d(131, "h3", 6), g(132, "CLI Dispatcher"), h(), d(133, "span", 7), g(134, "CLI Dispatcher Config generator "), h(), h(), h(), d(135, "div", 31), Y("click", function () {
                return i.bulktoken()
              }), d(136, "div", 5), d(137, "h3", 6), g(138, "Cisco"), h(), d(139, "span", 7), g(140, "Bulk Import Token"), h(), h(), h(), h(), d(141, "div", 3), d(142, "div", 32), Y("click", function () {
                return i.exportresponses()
              }), d(143, "div", 5), d(144, "h3", 6), g(145, "CloudCherry"), h(), d(146, "span", 7), g(147, "Cloudchery Export Response"), h(), h(), h(), d(148, "div", 33), Y("click", function () {
                return i.ticketsetup()
              }), d(149, "div", 5), d(150, "h3", 6), g(151, "Cisco"), h(), d(152, "span", 7), g(153, "Ticket Setup"), h(), h(), h(), d(154, "div", 34), d(155, "div", 5), y(156, "h3", 6), y(157, "span", 7), h(), h(), h(), h(), h())
            },
            directives: [QF, Hb],
            styles: [me]
          }), n
        })(),
        JF = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "inf-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28540953/Inf-app-food-network-app-design", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "INF App Design "), h(), d(4, "span", 3), g(5, "Food Network app design"), h(), y(6, "hr"), d(7, "p"), g(8, "Food Network app is a platform that lets customer discover food recipes videos, all kind recipes videos in the world, famous chefs food videos and more in a sigle platform."), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        eR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "petcorner-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28540059/etcorner-website", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Petcornor"), h(), d(4, "span", 3), g(5, "Petcornor Ecommerce"), h(), y(6, "hr"), d(7, "p"), g(8, "This one's for the pets. Petcornor leads the pack with 1,000+ trusted brands of food and supplies, It\u2019s everything you love about Petcornor, with a few extra tricks just for our app customers"), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        tR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "dethai-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28542109/Dethai-website", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Dethai"), h(), d(4, "span", 3), g(5, "Dethai Website"), h(), y(6, "hr"), d(7, "p"), g(8, "Dethai is the culmination of giving our best to the community by providing great food, service, and atmosphere. Tucked inside one of the premier breweries in Nevada, this collaboration project allows us another opportunity to create a memorable setting for you to catch up with friends"), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        nR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "pingnetwork-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28542109/Dethai-website", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Ping Network"), h(), d(4, "span", 3), g(5, "Youtube Channel website"), h(), y(6, "hr"), d(7, "p"), g(8, "Ping Network Cable-free live TV. No cable box required. Watch major broadcast and cable networks, including ABC, CBS, FOX, NBC, NFL Network, ESPN, AMC, Univision, HGTV, TNT and more, including your local news and sports channels."), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        iR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "blackbooth-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28541065/black-booth-App", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Black Booth"), h(), d(4, "span", 3), g(5, "Black Booth App"), h(), y(6, "hr"), d(7, "p"), g(8, "Black Booth is one of the best mobile apps for AI photo editing. Turn your selfie into a modeling portrait using one of the most popular apps. Black booth gives you everything you need to create Instagram-worthy edits for free"), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        rR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "beekids-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28541745/Beekids-design", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Beekids"), h(), d(4, "span", 3), g(5, "School Website"), h(), y(6, "hr"), d(7, "p"), g(8, "Educational games are a great tool for building language skills that today's elementary school curriculum requires.This game teach important skills for preschool and elementary school kids."), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        oR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 19,
            vars: 1,
            consts: [
              [1, "starhubinsight-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28541745/Beekids-design", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary", 3, "disabled"],
              [1, "fas", "fa-arrow-right"],
              [2, "color", "darkgray"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Starhub Insight"), h(), d(4, "span", 3), g(5, "Starhub hub monthly analysis"), h(), y(6, "hr"), d(7, "p"), g(8, "Starhub Insight is a monthly report will be provided to the client. Analysis is done based upon monthly response collection and NPS score, SCAT score etc."), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), g(13, " \xa0 "), d(14, "span", 7), g(15, "Link won't be avaible for public"), h(), h(), d(16, "mat-dialog-actions", 8), d(17, "button", 9), g(18, "Cancel"), h(), h()), 2 & t && ($e(10), _e("disabled", !0))
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        sR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 19,
            vars: 1,
            consts: [
              [1, "pushnotification-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28541745/Beekids-design", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary", 3, "disabled"],
              [1, "fas", "fa-arrow-right"],
              [2, "color", "darkgray"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Push Notification integration"), h(), d(4, "span", 3), g(5, "It push the notification responses to the Webex Teams "), h(), y(6, "hr"), d(7, "p"), g(8, "While user submit the response through WXM web survey. whenever the pariticular condition meet, it will push the response to the Webex teams, for instance the NPS rating is less than 6 it will push the notification to the Webex Teams "), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), g(13, " \xa0 "), d(14, "span", 7), g(15, "Link won't be avaible for public"), h(), h(), d(16, "mat-dialog-actions", 8), d(17, "button", 9), g(18, "Cancel"), h(), h()), 2 & t && ($e(10), _e("disabled", !0))
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        aR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 19,
            vars: 1,
            consts: [
              [1, "menupanel-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28541745/Beekids-design", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary", 3, "disabled"],
              [1, "fas", "fa-arrow-right"],
              [2, "color", "darkgray"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Menu Panel"), h(), d(4, "span", 3), g(5, "Menu Panel for Cloudcherry dashboard"), h(), y(6, "hr"), d(7, "p"), g(8, "Menu panel is navigate the user to the various page in the CloudCherry dashboard. Menu options is done using css animation etc. "), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), g(13, " \xa0 "), d(14, "span", 7), g(15, "Link won't be avaible for public"), h(), h(), d(16, "mat-dialog-actions", 8), d(17, "button", 9), g(18, "Cancel"), h(), h()), 2 & t && ($e(10), _e("disabled", !0))
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        lR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "wxmuniversity-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28540059/etcorner-website", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "WXM University"), h(), d(4, "span", 3), g(5, "Documentation website for WXM product"), h(), y(6, "hr"), d(7, "p"), g(8, "This website is the best place to learn more about Webex Experience Management, understand product features and benefits, and best practices for making the most out of the world\u2019s leading DIY Customer Experience Management (CEM) product"), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        cR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 19,
            vars: 1,
            consts: [
              [1, "emailtemplate-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28541745/Beekids-design", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary", 3, "disabled"],
              [1, "fas", "fa-arrow-right"],
              [2, "color", "darkgray"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Email Template"), h(), d(4, "span", 3), g(5, "Email Template for WXM Product"), h(), y(6, "hr"), d(7, "p"), g(8, "Email template used to represent the brand of the WXM Product. The product send the email template to the customer like End of the day reponse collection, Real time notification email, Welcome email, Report email etc "), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), g(13, " \xa0 "), d(14, "span", 7), g(15, "Link won't be avaible for public"), h(), h(), d(16, "mat-dialog-actions", 8), d(17, "button", 9), g(18, "Cancel"), h(), h()), 2 & t && ($e(10), _e("disabled", !0))
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        uR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "journeymapping-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://xm.webex.com/", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Customer Journey Mapping"), h(), d(4, "span", 3), g(5, "Customer Journey Mapping of the WXM Product"), h(), y(6, "hr"), d(7, "p"), g(8, "A journey is composed of several stages. As seen in the example above, a journey has been mapped in 4 stages, namely discover, join, engage and advocate. Each stage has its set of touchpoints and channels via which responses are collected. We can see a number of responses collected at each stages of the journey"), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        dR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "acm-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "http://3.6.197.60/acm/ccreethu/config-file.html", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "ACM"), h(), d(4, "span", 3), g(5, "Account Configuaration Management"), h(), y(6, "hr"), d(7, "p"), g(8, "This tool will help you configure the setup required to send invites using Webex Experience Management. Start by selecting a dispatch created in Experience Management and setup all required modules below."), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        hR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "singlepage-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28540059/etcorner-website", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Web Survey"), h(), d(4, "span", 3), g(5, "A Single Page Web Survey"), h(), y(6, "hr"), d(7, "p"), g(8, "Use of single page web survey is collect the feedback after the call ends. It used to track the call quality of the webex teams"), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        fR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "starhubdashboard-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "http://3.6.197.60/acm/ccreethu/config-file.html", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Starhub"), h(), d(4, "span", 3), g(5, "Starhub Personal Dashboard"), h(), y(6, "hr"), d(7, "p"), g(8, "Starhub Dashboard is showcase the NPS value of the different vendor, performance each branch, comments of the vendor in a single dashboard using that they can able to track the performance of branch "), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        mR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "usermanagement-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "http://3.6.197.60/acm/ccreethu/user-management.html", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "User Management"), h(), d(4, "span", 3), g(5, "Starhub User Management portal"), h(), y(6, "hr"), d(7, "p"), g(8, "Starhub User management will handle the users of the starhub dashboard, features contain like create user, delete user, edit user, enable user and disable user etc. "), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        pR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "activateuser-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://xm.webex.com/", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Activate User"), h(), d(4, "span", 3), g(5, "Activate User in the WXM Dashboard"), h(), y(6, "hr"), d(7, "p"), g(8, "Activate User is used to activate the onboarding user in the dashboard. this will done using the secure way of activation "), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        gR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "activateuser-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://xm.webex.com/", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Activate User"), h(), d(4, "span", 3), g(5, "Activate User in the WXM Dashboard"), h(), y(6, "hr"), d(7, "p"), g(8, "Activate User is used to activate the onboarding user in the dashboard. this will done using the secure way of activation "), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        _R = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 19,
            vars: 1,
            consts: [
              [1, "channel-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28541745/Beekids-design", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary", 3, "disabled"],
              [1, "fas", "fa-arrow-right"],
              [2, "color", "darkgray"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Channels"), h(), d(4, "span", 3), g(5, "CloudCherry channels"), h(), y(6, "hr"), d(7, "p"), g(8, "The success of a Customer Experience Management Program lies in delighting the customer at every touchpoint across the customer\u2019s journey, made possible through an organization-level approach that ensures support from each employee. Webex Experience Management helps to design a shared company vision by bringing all employees on board, optimizes customer research, and improves the customer satisfaction by enhancing the brand experiences and impact. The platform enables businesses to acquire, engage, and analyze customers by gathering real-time Customer Experience (CX) data using multiple channels"), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), g(13, " \xa0 "), d(14, "span", 7), g(15, "Link won't be avaible for public"), h(), h(), d(16, "mat-dialog-actions", 8), d(17, "button", 9), g(18, "Cancel"), h(), h()), 2 & t && ($e(10), _e("disabled", !0))
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        yR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "CliDispatcher-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://www.behance.net/gallery/28542109/Dethai-website", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "CLI Dispatcher"), h(), d(4, "span", 3), g(5, "Cli Dispatcher config generator"), h(), y(6, "hr"), d(7, "p"), g(8, "Cli Dispatcher config generator is used to convert the JSON file format into HTML form format, After required input is received from the user than convert that back to JSON format."), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        vR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "bulktoken-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://xm.webex.com/", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Bulk Token"), h(), d(4, "span", 3), g(5, "Bulk survey token creation"), h(), y(6, "hr"), d(7, "p"), g(8, "Bulk token creation using a use case. Let\u2019s consider a scenario where an integration with a Marketing automation tool is being built. You would like to embed Webex Experience Management surveys into a marketing mailer going out to millions of your customers."), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        bR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "Exportresponses-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://xm.webex.com/", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Export Response"), h(), d(4, "span", 3), g(5, "Export WXM Responses"), h(), y(6, "hr"), d(7, "p"), g(8, "Webex Experience Management provides open API\u2019s to export data out of Webex Experience Management based on the needs of the brand."), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        CR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["dialog-content-example-dialog"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "ticketsetup-app-img"],
              [1, "mat-typography"],
              ["mat-dialog-title", "", 1, "title"],
              [1, "subtitle"],
              ["href", "https://xm.webex.com/", "target", "_blank"],
              ["mat-raised-button", "", "color", "primary"],
              [1, "fas", "fa-arrow-right"],
              ["align", "end"],
              ["mat-button", "", "mat-dialog-close", ""]
            ],
            template: function (t, i) {
              1 & t && (y(0, "div", 0), d(1, "mat-dialog-content", 1), d(2, "h2", 2), g(3, "Ticket Setup"), h(), d(4, "span", 3), g(5, "Ticket Setup"), h(), y(6, "hr"), d(7, "p"), g(8, "Ticket Setup and Actions help to define the current state of the ticket, giving you the flexibility to identify and filter the tickets with ease. Ticket Actions can be customized. You can either create a new list of actions or add to the predefined list. The default Ticket Statuses cannot be removed and any additions made will be added to the predefined list."), h(), d(9, "a", 4), d(10, "button", 5), g(11, "Link \xa0 "), y(12, "i", 6), h(), h(), h(), d(13, "mat-dialog-actions", 7), d(14, "button", 8), g(15, "Cancel"), h(), h())
            },
            directives: [Ce, be, ce, we, ve],
            styles: [me]
          }), n
        })(),
        wR = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["app-contact-us"]
            ],
            decls: 13,
            vars: 0,
            consts: [
              [1, "contactus-div"],
              ["data-aos", "fade-down", "data-aos-easing", "linear", "data-aos-duration", "1500"],
              [1, "container"],
              ["action", "https://formspree.io/f/xwkyovgo", "method", "POST"],
              ["type", "name", "data-aos", "fade-down", "data-aos-easing", "linear", "data-aos-duration", "1500", "name", "name", "placeholder", "Enter the name"],
              ["type", "email", "data-aos", "fade-down", "data-aos-easing", "linear", "data-aos-duration", "1500", "name", "email", "placeholder", "Enter the Email"],
              ["rows", "15", "data-aos", "fade-down", "data-aos-easing", "linear", "data-aos-duration", "1500", "cols", "50", "name", "message", "placeholder", "Enter the meassge"],
              ["mat-raised-button", "", "color", "primary", "type", "submit"]
            ],
            template: function (t, i) {
              1 & t && (d(0, "div", 0), d(1, "h1", 1), g(2, "Contact Us"), h(), h(), d(3, "div", 2), d(4, "form", 3), d(5, "div"), y(6, "input", 4), h(), d(7, "div"), y(8, "input", 5), h(), d(9, "div"), y(10, "textarea", 6), h(), d(11, "button", 7), g(12, "Form Submit"), h(), h(), h())
            },
            directives: [ce],
            styles: [".contactus-div[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.contactus-div[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:40px;font-weight:500;border-bottom:3px solid #fff;color:#fff;padding:70px 0 40px;width:200px;margin-bottom:50px}input[_ngcontent-%COMP%]{width:40%;height:30px;margin-bottom:30px}textarea[_ngcontent-%COMP%]{width:40%;margin-bottom:30px}.container[_ngcontent-%COMP%]{text-align:center}.container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:30px}"]
          }), n
        })(),
        DR = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["app-footer"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              [1, "social-icon"],
              ["href", "https://www.behance.net/prasannat", "target", "_blank"],
              [1, "fab", "fa-behance-square"],
              ["href", "https://www.linkedin.com/in/prasanna-t-955b071b/", "target", "_blank"],
              [1, "fab", "fa-linkedin"],
              ["href", "https://twitter.com/prasannawatson", "target", "_blank"],
              [1, "fab", "fa-twitter-square"],
              ["href", "https://github.com/prasannawatson", "target", "_blank"],
              [1, "fab", "fa-github-square"],
              [1, "copyright"]
            ],
            template: function (t, i) {
              1 & t && (d(0, "div", 0), d(1, "a", 1), d(2, "span"), y(3, "i", 2), h(), h(), d(4, "a", 3), d(5, "span"), y(6, "i", 4), h(), h(), d(7, "a", 5), d(8, "span"), y(9, "i", 6), h(), h(), d(10, "a", 7), d(11, "span"), y(12, "i", 8), h(), h(), h(), d(13, "div", 9), d(14, "span"), g(15, " Copyright \xa9 Praya Inc. All rights Reserved "), h(), h())
            },
            styles: [".social-icon[_ngcontent-%COMP%]{width:20%;margin-right:auto;margin-left:100px}.social-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#fff;margin-right:20px;font-size:34px;cursor:pointer}.copyright[_ngcontent-%COMP%]{width:20%;margin-left:auto;margin-right:100px;margin-top:4px}.copyright[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff}"]
          }), n
        })(),
        MR = (() => {
          class n {
            constructor() {
              this.title = "prasanna-portfolio"
            }
          }
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275cmp = W({
            type: n,
            selectors: [
              ["app-root"]
            ],
            decls: 214,
            vars: 0,
            consts: [
              ["id", "home", 1, "portfolio", "flex"],
              [1, "container"],
              [1, "circle-container"],
              [1, "circle"],
              ["id", "about", 1, "about-us"],
              [1, "projects"],
              [1, "my-project"],
              ["id", "contact", 1, "contact-us"],
              [1, "my-contact-us"],
              [1, "footer"],
              [1, "my-footer-us"]
            ],
            template: function (t, i) {
              1 & t && (d(0, "section", 0), d(1, "div", 1), d(2, "div", 2), y(3, "div", 3), h(), d(4, "div", 2), y(5, "div", 3), h(), d(6, "div", 2), y(7, "div", 3), h(), d(8, "div", 2), y(9, "div", 3), h(), d(10, "div", 2), y(11, "div", 3), h(), d(12, "div", 2), y(13, "div", 3), h(), d(14, "div", 2), y(15, "div", 3), h(), d(16, "div", 2), y(17, "div", 3), h(), d(18, "div", 2), y(19, "div", 3), h(), d(20, "div", 2), y(21, "div", 3), h(), d(22, "div", 2), y(23, "div", 3), h(), d(24, "div", 2), y(25, "div", 3), h(), d(26, "div", 2), y(27, "div", 3), h(), d(28, "div", 2), y(29, "div", 3), h(), d(30, "div", 2), y(31, "div", 3), h(), d(32, "div", 2), y(33, "div", 3), h(), d(34, "div", 2), y(35, "div", 3), h(), d(36, "div", 2), y(37, "div", 3), h(), d(38, "div", 2), y(39, "div", 3), h(), d(40, "div", 2), y(41, "div", 3), h(), d(42, "div", 2), y(43, "div", 3), h(), d(44, "div", 2), y(45, "div", 3), h(), d(46, "div", 2), y(47, "div", 3), h(), d(48, "div", 2), y(49, "div", 3), h(), d(50, "div", 2), y(51, "div", 3), h(), d(52, "div", 2), y(53, "div", 3), h(), d(54, "div", 2), y(55, "div", 3), h(), d(56, "div", 2), y(57, "div", 3), h(), d(58, "div", 2), y(59, "div", 3), h(), d(60, "div", 2), y(61, "div", 3), h(), d(62, "div", 2), y(63, "div", 3), h(), d(64, "div", 2), y(65, "div", 3), h(), d(66, "div", 2), y(67, "div", 3), h(), d(68, "div", 2), y(69, "div", 3), h(), d(70, "div", 2), y(71, "div", 3), h(), d(72, "div", 2), y(73, "div", 3), h(), d(74, "div", 2), y(75, "div", 3), h(), d(76, "div", 2), y(77, "div", 3), h(), d(78, "div", 2), y(79, "div", 3), h(), d(80, "div", 2), y(81, "div", 3), h(), d(82, "div", 2), y(83, "div", 3), h(), d(84, "div", 2), y(85, "div", 3), h(), d(86, "div", 2), y(87, "div", 3), h(), d(88, "div", 2), y(89, "div", 3), h(), d(90, "div", 2), y(91, "div", 3), h(), d(92, "div", 2), y(93, "div", 3), h(), d(94, "div", 2), y(95, "div", 3), h(), d(96, "div", 2), y(97, "div", 3), h(), d(98, "div", 2), y(99, "div", 3), h(), d(100, "div", 2), y(101, "div", 3), h(), d(102, "div", 2), y(103, "div", 3), h(), d(104, "div", 2), y(105, "div", 3), h(), d(106, "div", 2), y(107, "div", 3), h(), d(108, "div", 2), y(109, "div", 3), h(), d(110, "div", 2), y(111, "div", 3), h(), d(112, "div", 2), y(113, "div", 3), h(), d(114, "div", 2), y(115, "div", 3), h(), d(116, "div", 2), y(117, "div", 3), h(), d(118, "div", 2), y(119, "div", 3), h(), d(120, "div", 2), y(121, "div", 3), h(), d(122, "div", 2), y(123, "div", 3), h(), d(124, "div", 2), y(125, "div", 3), h(), d(126, "div", 2), y(127, "div", 3), h(), d(128, "div", 2), y(129, "div", 3), h(), d(130, "div", 2), y(131, "div", 3), h(), d(132, "div", 2), y(133, "div", 3), h(), d(134, "div", 2), y(135, "div", 3), h(), d(136, "div", 2), y(137, "div", 3), h(), d(138, "div", 2), y(139, "div", 3), h(), d(140, "div", 2), y(141, "div", 3), h(), d(142, "div", 2), y(143, "div", 3), h(), d(144, "div", 2), y(145, "div", 3), h(), d(146, "div", 2), y(147, "div", 3), h(), d(148, "div", 2), y(149, "div", 3), h(), d(150, "div", 2), y(151, "div", 3), h(), d(152, "div", 2), y(153, "div", 3), h(), d(154, "div", 2), y(155, "div", 3), h(), d(156, "div", 2), y(157, "div", 3), h(), d(158, "div", 2), y(159, "div", 3), h(), d(160, "div", 2), y(161, "div", 3), h(), d(162, "div", 2), y(163, "div", 3), h(), d(164, "div", 2), y(165, "div", 3), h(), d(166, "div", 2), y(167, "div", 3), h(), d(168, "div", 2), y(169, "div", 3), h(), d(170, "div", 2), y(171, "div", 3), h(), d(172, "div", 2), y(173, "div", 3), h(), d(174, "div", 2), y(175, "div", 3), h(), d(176, "div", 2), y(177, "div", 3), h(), d(178, "div", 2), y(179, "div", 3), h(), d(180, "div", 2), y(181, "div", 3), h(), d(182, "div", 2), y(183, "div", 3), h(), d(184, "div", 2), y(185, "div", 3), h(), d(186, "div", 2), y(187, "div", 3), h(), d(188, "div", 2), y(189, "div", 3), h(), d(190, "div", 2), y(191, "div", 3), h(), d(192, "div", 2), y(193, "div", 3), h(), d(194, "div", 2), y(195, "div", 3), h(), d(196, "div", 2), y(197, "div", 3), h(), d(198, "div", 2), y(199, "div", 3), h(), d(200, "div", 2), y(201, "div", 3), h(), h(), d(202, "div"), y(203, "app-navigation"), h(), d(204, "div"), y(205, "app-banner-intro"), h(), h(), d(206, "section", 4), y(207, "app-about-us"), h(), d(208, "section", 5), y(209, "app-project", 6), h(), d(210, "section", 7), y(211, "app-contact-us", 8), h(), d(212, "section", 9), y(213, "app-footer", 10), h())
            },
            directives: [lI, cI, uI, XF, wR, DR],
            styles: ['.portfolio[_ngcontent-%COMP%]{background:url(prasanna-banner.2d2edfb26c73d9c4.jpg);display:flex;width:100%;height:100vh;background-position:80% 46%;flex-direction:column}.circle-container[_ngcontent-%COMP%]{position:absolute;transform:translateY(-10vh);animation-iteration-count:infinite;animation-timing-function:linear}.circle-container[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%]{width:100%;height:100%;border-radius:50%;mix-blend-mode:screen;background-image:radial-gradient(#99ffff,#99ffff 10%,rgba(153,255,255,0) 56%);animation:fadein-frames .2s infinite,scale-frames 2s infinite}@keyframes fade-frames{0%{opacity:1}50%{opacity:.7}to{opacity:1}}@keyframes scale-frames{0%{transform:scale(.4)}50%{transform:scale(2.2)}to{transform:scale(.4)}}.circle-container[_ngcontent-%COMP%]:nth-child(1){width:7px;height:7px;animation-name:move-frames-1;animation-duration:28247ms;animation-delay:13213ms}@keyframes move-frames-1{0%{transform:translate(62vw,106vh)}to{transform:translate(83vw,-132vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(1)   .circle[_ngcontent-%COMP%]{animation-delay:1236ms}.circle-container[_ngcontent-%COMP%]:nth-child(2){width:3px;height:3px;animation-name:move-frames-2;animation-duration:36081ms;animation-delay:14435ms}@keyframes move-frames-2{0%{transform:translate(55vw,101vh)}to{transform:translate(55vw,-120vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(2)   .circle[_ngcontent-%COMP%]{animation-delay:3086ms}.circle-container[_ngcontent-%COMP%]:nth-child(3){width:6px;height:6px;animation-name:move-frames-3;animation-duration:29366ms;animation-delay:18305ms}@keyframes move-frames-3{0%{transform:translate(99vw,102vh)}to{transform:translate(32vw,-121vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(3)   .circle[_ngcontent-%COMP%]{animation-delay:1776ms}.circle-container[_ngcontent-%COMP%]:nth-child(4){width:4px;height:4px;animation-name:move-frames-4;animation-duration:34263ms;animation-delay:28375ms}@keyframes move-frames-4{0%{transform:translate(14vw,103vh)}to{transform:translate(71vw,-105vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(4)   .circle[_ngcontent-%COMP%]{animation-delay:3856ms}.circle-container[_ngcontent-%COMP%]:nth-child(5){width:7px;height:7px;animation-name:move-frames-5;animation-duration:33737ms;animation-delay:24095ms}@keyframes move-frames-5{0%{transform:translate(98vw,109vh)}to{transform:translate(23vw,-138vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(5)   .circle[_ngcontent-%COMP%]{animation-delay:1196ms}.circle-container[_ngcontent-%COMP%]:nth-child(6){width:2px;height:2px;animation-name:move-frames-6;animation-duration:31379ms;animation-delay:29778ms}@keyframes move-frames-6{0%{transform:translate(17vw,104vh)}to{transform:translate(89vw,-123vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(6)   .circle[_ngcontent-%COMP%]{animation-delay:1.43s}.circle-container[_ngcontent-%COMP%]:nth-child(7){width:1px;height:1px;animation-name:move-frames-7;animation-duration:28934ms;animation-delay:25519ms}@keyframes move-frames-7{0%{transform:translate(92vw,106vh)}to{transform:translate(79vw,-111vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(7)   .circle[_ngcontent-%COMP%]{animation-delay:1853ms}.circle-container[_ngcontent-%COMP%]:nth-child(8){width:3px;height:3px;animation-name:move-frames-8;animation-duration:35374ms;animation-delay:831ms}@keyframes move-frames-8{0%{transform:translate(51vw,105vh)}to{transform:translate(77vw,-135vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(8)   .circle[_ngcontent-%COMP%]{animation-delay:15ms}.circle-container[_ngcontent-%COMP%]:nth-child(9){width:5px;height:5px;animation-name:move-frames-9;animation-duration:36455ms;animation-delay:13401ms}@keyframes move-frames-9{0%{transform:translate(83vw,105vh)}to{transform:translate(87vw,-135vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(9)   .circle[_ngcontent-%COMP%]{animation-delay:1024ms}.circle-container[_ngcontent-%COMP%]:nth-child(10){width:2px;height:2px;animation-name:move-frames-10;animation-duration:35008ms;animation-delay:3528ms}@keyframes move-frames-10{0%{transform:translate(14vw,106vh)}to{transform:translate(23vw,-109vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(10)   .circle[_ngcontent-%COMP%]{animation-delay:1847ms}.circle-container[_ngcontent-%COMP%]:nth-child(11){width:3px;height:3px;animation-name:move-frames-11;animation-duration:33951ms;animation-delay:24.22s}@keyframes move-frames-11{0%{transform:translate(49vw,110vh)}to{transform:translate(59vw,-137vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(11)   .circle[_ngcontent-%COMP%]{animation-delay:3202ms}.circle-container[_ngcontent-%COMP%]:nth-child(12){width:5px;height:5px;animation-name:move-frames-12;animation-duration:35.77s;animation-delay:13168ms}@keyframes move-frames-12{0%{transform:translate(5vw,102vh)}to{transform:translate(79vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(12)   .circle[_ngcontent-%COMP%]{animation-delay:1056ms}.circle-container[_ngcontent-%COMP%]:nth-child(13){width:2px;height:2px;animation-name:move-frames-13;animation-duration:35581ms;animation-delay:23687ms}@keyframes move-frames-13{0%{transform:translate(93vw,104vh)}to{transform:translate(87vw,-116vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(13)   .circle[_ngcontent-%COMP%]{animation-delay:2332ms}.circle-container[_ngcontent-%COMP%]:nth-child(14){width:6px;height:6px;animation-name:move-frames-14;animation-duration:32365ms;animation-delay:3333ms}@keyframes move-frames-14{0%{transform:translate(46vw,103vh)}to{transform:translate(48vw,-127vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(14)   .circle[_ngcontent-%COMP%]{animation-delay:385ms}.circle-container[_ngcontent-%COMP%]:nth-child(15){width:6px;height:6px;animation-name:move-frames-15;animation-duration:31387ms;animation-delay:11403ms}@keyframes move-frames-15{0%{transform:translate(41vw,106vh)}to{transform:translate(19vw,-133vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(15)   .circle[_ngcontent-%COMP%]{animation-delay:3412ms}.circle-container[_ngcontent-%COMP%]:nth-child(16){width:8px;height:8px;animation-name:move-frames-16;animation-duration:34354ms;animation-delay:20246ms}@keyframes move-frames-16{0%{transform:translate(3vw,107vh)}to{transform:translate(77vw,-121vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(16)   .circle[_ngcontent-%COMP%]{animation-delay:1532ms}.circle-container[_ngcontent-%COMP%]:nth-child(17){width:8px;height:8px;animation-name:move-frames-17;animation-duration:30714ms;animation-delay:7907ms}@keyframes move-frames-17{0%{transform:translate(96vw,102vh)}to{transform:translate(71vw,-118vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(17)   .circle[_ngcontent-%COMP%]{animation-delay:1853ms}.circle-container[_ngcontent-%COMP%]:nth-child(18){width:8px;height:8px;animation-name:move-frames-18;animation-duration:34283ms;animation-delay:7841ms}@keyframes move-frames-18{0%{transform:translate(41vw,102vh)}to{transform:translate(2vw,-132vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(18)   .circle[_ngcontent-%COMP%]{animation-delay:2095ms}.circle-container[_ngcontent-%COMP%]:nth-child(19){width:4px;height:4px;animation-name:move-frames-19;animation-duration:36717ms;animation-delay:11195ms}@keyframes move-frames-19{0%{transform:translate(38vw,107vh)}to{transform:translate(71vw,-115vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(19)   .circle[_ngcontent-%COMP%]{animation-delay:3661ms}.circle-container[_ngcontent-%COMP%]:nth-child(20){width:6px;height:6px;animation-name:move-frames-20;animation-duration:33653ms;animation-delay:5.24s}@keyframes move-frames-20{0%{transform:translate(6vw,102vh)}to{transform:translate(6vw,-114vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(20)   .circle[_ngcontent-%COMP%]{animation-delay:2726ms}.circle-container[_ngcontent-%COMP%]:nth-child(21){width:2px;height:2px;animation-name:move-frames-21;animation-duration:34404ms;animation-delay:21.22s}@keyframes move-frames-21{0%{transform:translate(80vw,103vh)}to{transform:translate(20vw,-121vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(21)   .circle[_ngcontent-%COMP%]{animation-delay:491ms}.circle-container[_ngcontent-%COMP%]:nth-child(22){width:3px;height:3px;animation-name:move-frames-22;animation-duration:30653ms;animation-delay:16346ms}@keyframes move-frames-22{0%{transform:translate(24vw,104vh)}to{transform:translate(93vw,-121vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(22)   .circle[_ngcontent-%COMP%]{animation-delay:1.68s}.circle-container[_ngcontent-%COMP%]:nth-child(23){width:2px;height:2px;animation-name:move-frames-23;animation-duration:36961ms;animation-delay:12242ms}@keyframes move-frames-23{0%{transform:translate(6vw,107vh)}to{transform:translate(86vw,-137vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(23)   .circle[_ngcontent-%COMP%]{animation-delay:479ms}.circle-container[_ngcontent-%COMP%]:nth-child(24){width:8px;height:8px;animation-name:move-frames-24;animation-duration:28691ms;animation-delay:1652ms}@keyframes move-frames-24{0%{transform:translate(40vw,106vh)}to{transform:translate(32vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(24)   .circle[_ngcontent-%COMP%]{animation-delay:1119ms}.circle-container[_ngcontent-%COMP%]:nth-child(25){width:3px;height:3px;animation-name:move-frames-25;animation-duration:32987ms;animation-delay:4392ms}@keyframes move-frames-25{0%{transform:translate(18vw,104vh)}to{transform:translate(15vw,-115vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(25)   .circle[_ngcontent-%COMP%]{animation-delay:.39s}.circle-container[_ngcontent-%COMP%]:nth-child(26){width:1px;height:1px;animation-name:move-frames-26;animation-duration:36758ms;animation-delay:1197ms}@keyframes move-frames-26{0%{transform:translate(55vw,110vh)}to{transform:translate(66vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(26)   .circle[_ngcontent-%COMP%]{animation-delay:1661ms}.circle-container[_ngcontent-%COMP%]:nth-child(27){width:1px;height:1px;animation-name:move-frames-27;animation-duration:35868ms;animation-delay:13599ms}@keyframes move-frames-27{0%{transform:translate(94vw,107vh)}to{transform:translate(13vw,-109vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(27)   .circle[_ngcontent-%COMP%]{animation-delay:3462ms}.circle-container[_ngcontent-%COMP%]:nth-child(28){width:3px;height:3px;animation-name:move-frames-28;animation-duration:31741ms;animation-delay:20212ms}@keyframes move-frames-28{0%{transform:translate(94vw,105vh)}to{transform:translate(4vw,-133vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(28)   .circle[_ngcontent-%COMP%]{animation-delay:2078ms}.circle-container[_ngcontent-%COMP%]:nth-child(29){width:5px;height:5px;animation-name:move-frames-29;animation-duration:30632ms;animation-delay:16.49s}@keyframes move-frames-29{0%{transform:translate(91vw,106vh)}to{transform:translate(18vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(29)   .circle[_ngcontent-%COMP%]{animation-delay:963ms}.circle-container[_ngcontent-%COMP%]:nth-child(30){width:3px;height:3px;animation-name:move-frames-30;animation-duration:36445ms;animation-delay:13405ms}@keyframes move-frames-30{0%{transform:translate(98vw,104vh)}to{transform:translate(12vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(30)   .circle[_ngcontent-%COMP%]{animation-delay:1392ms}.circle-container[_ngcontent-%COMP%]:nth-child(31){width:2px;height:2px;animation-name:move-frames-31;animation-duration:30575ms;animation-delay:12744ms}@keyframes move-frames-31{0%{transform:translate(30vw,109vh)}to{transform:translate(81vw,-124vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(31)   .circle[_ngcontent-%COMP%]{animation-delay:3149ms}.circle-container[_ngcontent-%COMP%]:nth-child(32){width:6px;height:6px;animation-name:move-frames-32;animation-duration:33183ms;animation-delay:13.22s}@keyframes move-frames-32{0%{transform:translate(98vw,103vh)}to{transform:translate(41vw,-115vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(32)   .circle[_ngcontent-%COMP%]{animation-delay:3834ms}.circle-container[_ngcontent-%COMP%]:nth-child(33){width:7px;height:7px;animation-name:move-frames-33;animation-duration:35248ms;animation-delay:12567ms}@keyframes move-frames-33{0%{transform:translate(81vw,108vh)}to{transform:translate(25vw,-136vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(33)   .circle[_ngcontent-%COMP%]{animation-delay:3223ms}.circle-container[_ngcontent-%COMP%]:nth-child(34){width:1px;height:1px;animation-name:move-frames-34;animation-duration:29.7s;animation-delay:15197ms}@keyframes move-frames-34{0%{transform:translate(90vw,107vh)}to{transform:translate(43vw,-111vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(34)   .circle[_ngcontent-%COMP%]{animation-delay:1875ms}.circle-container[_ngcontent-%COMP%]:nth-child(35){width:6px;height:6px;animation-name:move-frames-35;animation-duration:35439ms;animation-delay:12828ms}@keyframes move-frames-35{0%{transform:translate(73vw,107vh)}to{transform:translate(58vw,-134vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(35)   .circle[_ngcontent-%COMP%]{animation-delay:3244ms}.circle-container[_ngcontent-%COMP%]:nth-child(36){width:1px;height:1px;animation-name:move-frames-36;animation-duration:34.64s;animation-delay:16437ms}@keyframes move-frames-36{0%{transform:translate(63vw,110vh)}to{transform:translate(26vw,-123vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(36)   .circle[_ngcontent-%COMP%]{animation-delay:3132ms}.circle-container[_ngcontent-%COMP%]:nth-child(37){width:1px;height:1px;animation-name:move-frames-37;animation-duration:30758ms;animation-delay:1147ms}@keyframes move-frames-37{0%{transform:translate(49vw,102vh)}to{transform:translate(20vw,-118vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(37)   .circle[_ngcontent-%COMP%]{animation-delay:3712ms}.circle-container[_ngcontent-%COMP%]:nth-child(38){width:7px;height:7px;animation-name:move-frames-38;animation-duration:28225ms;animation-delay:35961ms}@keyframes move-frames-38{0%{transform:translate(66vw,102vh)}to{transform:translate(15vw,-132vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(38)   .circle[_ngcontent-%COMP%]{animation-delay:1611ms}.circle-container[_ngcontent-%COMP%]:nth-child(39){width:4px;height:4px;animation-name:move-frames-39;animation-duration:31826ms;animation-delay:2313ms}@keyframes move-frames-39{0%{transform:translate(88vw,108vh)}to{transform:translate(85vw,-114vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(39)   .circle[_ngcontent-%COMP%]{animation-delay:3568ms}.circle-container[_ngcontent-%COMP%]:nth-child(40){width:8px;height:8px;animation-name:move-frames-40;animation-duration:32138ms;animation-delay:1596ms}@keyframes move-frames-40{0%{transform:translate(33vw,109vh)}to{transform:translate(48vw,-136vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(40)   .circle[_ngcontent-%COMP%]{animation-delay:2459ms}.circle-container[_ngcontent-%COMP%]:nth-child(41){width:2px;height:2px;animation-name:move-frames-41;animation-duration:28281ms;animation-delay:19601ms}@keyframes move-frames-41{0%{transform:translate(87vw,108vh)}to{transform:translate(30vw,-112vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(41)   .circle[_ngcontent-%COMP%]{animation-delay:1244ms}.circle-container[_ngcontent-%COMP%]:nth-child(42){width:2px;height:2px;animation-name:move-frames-42;animation-duration:30437ms;animation-delay:36374ms}@keyframes move-frames-42{0%{transform:translate(78vw,104vh)}to{transform:translate(39vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(42)   .circle[_ngcontent-%COMP%]{animation-delay:3089ms}.circle-container[_ngcontent-%COMP%]:nth-child(43){width:2px;height:2px;animation-name:move-frames-43;animation-duration:36877ms;animation-delay:10.37s}@keyframes move-frames-43{0%{transform:translate(71vw,105vh)}to{transform:translate(23vw,-115vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(43)   .circle[_ngcontent-%COMP%]{animation-delay:3513ms}.circle-container[_ngcontent-%COMP%]:nth-child(44){width:1px;height:1px;animation-name:move-frames-44;animation-duration:31582ms;animation-delay:8281ms}@keyframes move-frames-44{0%{transform:translate(91vw,109vh)}to{transform:translate(45vw,-128vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(44)   .circle[_ngcontent-%COMP%]{animation-delay:1809ms}.circle-container[_ngcontent-%COMP%]:nth-child(45){width:7px;height:7px;animation-name:move-frames-45;animation-duration:36153ms;animation-delay:15938ms}@keyframes move-frames-45{0%{transform:translate(62vw,105vh)}to{transform:translate(83vw,-125vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(45)   .circle[_ngcontent-%COMP%]{animation-delay:.36s}.circle-container[_ngcontent-%COMP%]:nth-child(46){width:3px;height:3px;animation-name:move-frames-46;animation-duration:28194ms;animation-delay:27123ms}@keyframes move-frames-46{0%{transform:translate(46vw,104vh)}to{transform:translate(3vw,-125vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(46)   .circle[_ngcontent-%COMP%]{animation-delay:1442ms}.circle-container[_ngcontent-%COMP%]:nth-child(47){width:8px;height:8px;animation-name:move-frames-47;animation-duration:33566ms;animation-delay:10049ms}@keyframes move-frames-47{0%{transform:translate(63vw,105vh)}to{transform:translate(22vw,-112vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(47)   .circle[_ngcontent-%COMP%]{animation-delay:1997ms}.circle-container[_ngcontent-%COMP%]:nth-child(48){width:3px;height:3px;animation-name:move-frames-48;animation-duration:32869ms;animation-delay:21.73s}@keyframes move-frames-48{0%{transform:translate(80vw,104vh)}to{transform:translate(26vw,-133vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(48)   .circle[_ngcontent-%COMP%]{animation-delay:1557ms}.circle-container[_ngcontent-%COMP%]:nth-child(49){width:1px;height:1px;animation-name:move-frames-49;animation-duration:32328ms;animation-delay:30639ms}@keyframes move-frames-49{0%{transform:translate(39vw,106vh)}to{transform:translate(55vw,-108vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(49)   .circle[_ngcontent-%COMP%]{animation-delay:419ms}.circle-container[_ngcontent-%COMP%]:nth-child(50){width:7px;height:7px;animation-name:move-frames-50;animation-duration:29382ms;animation-delay:24363ms}@keyframes move-frames-50{0%{transform:translate(66vw,110vh)}to{transform:translate(42vw,-111vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(50)   .circle[_ngcontent-%COMP%]{animation-delay:1915ms}.circle-container[_ngcontent-%COMP%]:nth-child(51){width:7px;height:7px;animation-name:move-frames-51;animation-duration:35247ms;animation-delay:12392ms}@keyframes move-frames-51{0%{transform:translate(45vw,101vh)}to{transform:translate(16vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(51)   .circle[_ngcontent-%COMP%]{animation-delay:2225ms}.circle-container[_ngcontent-%COMP%]:nth-child(52){width:8px;height:8px;animation-name:move-frames-52;animation-duration:28.7s;animation-delay:21.83s}@keyframes move-frames-52{0%{transform:translate(45vw,104vh)}to{transform:translate(33vw,-131vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(52)   .circle[_ngcontent-%COMP%]{animation-delay:56ms}.circle-container[_ngcontent-%COMP%]:nth-child(53){width:2px;height:2px;animation-name:move-frames-53;animation-duration:35457ms;animation-delay:9737ms}@keyframes move-frames-53{0%{transform:translate(78vw,110vh)}to{transform:translate(28vw,-124vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(53)   .circle[_ngcontent-%COMP%]{animation-delay:2949ms}.circle-container[_ngcontent-%COMP%]:nth-child(54){width:4px;height:4px;animation-name:move-frames-54;animation-duration:30942ms;animation-delay:391ms}@keyframes move-frames-54{0%{transform:translate(81vw,109vh)}to{transform:translate(38vw,-136vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(54)   .circle[_ngcontent-%COMP%]{animation-delay:3981ms}.circle-container[_ngcontent-%COMP%]:nth-child(55){width:1px;height:1px;animation-name:move-frames-55;animation-duration:35101ms;animation-delay:28121ms}@keyframes move-frames-55{0%{transform:translate(67vw,101vh)}to{transform:translate(100vw,-121vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(55)   .circle[_ngcontent-%COMP%]{animation-delay:2941ms}.circle-container[_ngcontent-%COMP%]:nth-child(56){width:7px;height:7px;animation-name:move-frames-56;animation-duration:36499ms;animation-delay:509ms}@keyframes move-frames-56{0%{transform:translate(42vw,101vh)}to{transform:translate(6vw,-107vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(56)   .circle[_ngcontent-%COMP%]{animation-delay:2494ms}.circle-container[_ngcontent-%COMP%]:nth-child(57){width:2px;height:2px;animation-name:move-frames-57;animation-duration:31386ms;animation-delay:23.59s}@keyframes move-frames-57{0%{transform:translate(66vw,108vh)}to{transform:translate(61vw,-134vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(57)   .circle[_ngcontent-%COMP%]{animation-delay:2225ms}.circle-container[_ngcontent-%COMP%]:nth-child(58){width:6px;height:6px;animation-name:move-frames-58;animation-duration:34088ms;animation-delay:35017ms}@keyframes move-frames-58{0%{transform:translate(81vw,106vh)}to{transform:translate(92vw,-130vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(58)   .circle[_ngcontent-%COMP%]{animation-delay:3077ms}.circle-container[_ngcontent-%COMP%]:nth-child(59){width:5px;height:5px;animation-name:move-frames-59;animation-duration:36.38s;animation-delay:29519ms}@keyframes move-frames-59{0%{transform:translate(30vw,109vh)}to{transform:translate(40vw,-110vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(59)   .circle[_ngcontent-%COMP%]{animation-delay:881ms}.circle-container[_ngcontent-%COMP%]:nth-child(60){width:1px;height:1px;animation-name:move-frames-60;animation-duration:31454ms;animation-delay:24454ms}@keyframes move-frames-60{0%{transform:translate(70vw,106vh)}to{transform:translate(62vw,-110vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(60)   .circle[_ngcontent-%COMP%]{animation-delay:734ms}.circle-container[_ngcontent-%COMP%]:nth-child(61){width:4px;height:4px;animation-name:move-frames-61;animation-duration:35162ms;animation-delay:6015ms}@keyframes move-frames-61{0%{transform:translate(43vw,110vh)}to{transform:translate(97vw,-118vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(61)   .circle[_ngcontent-%COMP%]{animation-delay:3803ms}.circle-container[_ngcontent-%COMP%]:nth-child(62){width:2px;height:2px;animation-name:move-frames-62;animation-duration:34.07s;animation-delay:14735ms}@keyframes move-frames-62{0%{transform:translate(70vw,105vh)}to{transform:translate(68vw,-121vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(62)   .circle[_ngcontent-%COMP%]{animation-delay:2086ms}.circle-container[_ngcontent-%COMP%]:nth-child(63){width:5px;height:5px;animation-name:move-frames-63;animation-duration:31668ms;animation-delay:24317ms}@keyframes move-frames-63{0%{transform:translate(77vw,108vh)}to{transform:translate(23vw,-128vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(63)   .circle[_ngcontent-%COMP%]{animation-delay:2045ms}.circle-container[_ngcontent-%COMP%]:nth-child(64){width:4px;height:4px;animation-name:move-frames-64;animation-duration:33428ms;animation-delay:35417ms}@keyframes move-frames-64{0%{transform:translate(42vw,106vh)}to{transform:translate(6vw,-127vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(64)   .circle[_ngcontent-%COMP%]{animation-delay:1926ms}.circle-container[_ngcontent-%COMP%]:nth-child(65){width:7px;height:7px;animation-name:move-frames-65;animation-duration:28709ms;animation-delay:6077ms}@keyframes move-frames-65{0%{transform:translate(50vw,104vh)}to{transform:translate(72vw,-120vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(65)   .circle[_ngcontent-%COMP%]{animation-delay:1828ms}.circle-container[_ngcontent-%COMP%]:nth-child(66){width:3px;height:3px;animation-name:move-frames-66;animation-duration:31164ms;animation-delay:28029ms}@keyframes move-frames-66{0%{transform:translate(63vw,110vh)}to{transform:translate(12vw,-131vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(66)   .circle[_ngcontent-%COMP%]{animation-delay:3392ms}.circle-container[_ngcontent-%COMP%]:nth-child(67){width:7px;height:7px;animation-name:move-frames-67;animation-duration:30609ms;animation-delay:35861ms}@keyframes move-frames-67{0%{transform:translate(19vw,108vh)}to{transform:translate(28vw,-124vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(67)   .circle[_ngcontent-%COMP%]{animation-delay:1016ms}.circle-container[_ngcontent-%COMP%]:nth-child(68){width:7px;height:7px;animation-name:move-frames-68;animation-duration:36818ms;animation-delay:14968ms}@keyframes move-frames-68{0%{transform:translate(16vw,108vh)}to{transform:translate(5vw,-112vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(68)   .circle[_ngcontent-%COMP%]{animation-delay:3812ms}.circle-container[_ngcontent-%COMP%]:nth-child(69){width:3px;height:3px;animation-name:move-frames-69;animation-duration:32653ms;animation-delay:3362ms}@keyframes move-frames-69{0%{transform:translate(83vw,105vh)}to{transform:translate(47vw,-117vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(69)   .circle[_ngcontent-%COMP%]{animation-delay:3067ms}.circle-container[_ngcontent-%COMP%]:nth-child(70){width:2px;height:2px;animation-name:move-frames-70;animation-duration:36698ms;animation-delay:2997ms}@keyframes move-frames-70{0%{transform:translate(1vw,102vh)}to{transform:translate(60vw,-119vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(70)   .circle[_ngcontent-%COMP%]{animation-delay:3.75s}.circle-container[_ngcontent-%COMP%]:nth-child(71){width:5px;height:5px;animation-name:move-frames-71;animation-duration:35591ms;animation-delay:21896ms}@keyframes move-frames-71{0%{transform:translate(15vw,107vh)}to{transform:translate(5vw,-134vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(71)   .circle[_ngcontent-%COMP%]{animation-delay:2466ms}.circle-container[_ngcontent-%COMP%]:nth-child(72){width:4px;height:4px;animation-name:move-frames-72;animation-duration:32356ms;animation-delay:23624ms}@keyframes move-frames-72{0%{transform:translate(22vw,101vh)}to{transform:translate(49vw,-108vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(72)   .circle[_ngcontent-%COMP%]{animation-delay:556ms}.circle-container[_ngcontent-%COMP%]:nth-child(73){width:6px;height:6px;animation-name:move-frames-73;animation-duration:31723ms;animation-delay:18836ms}@keyframes move-frames-73{0%{transform:translate(55vw,107vh)}to{transform:translate(81vw,-119vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(73)   .circle[_ngcontent-%COMP%]{animation-delay:73ms}.circle-container[_ngcontent-%COMP%]:nth-child(74){width:7px;height:7px;animation-name:move-frames-74;animation-duration:29641ms;animation-delay:608ms}@keyframes move-frames-74{0%{transform:translate(42vw,109vh)}to{transform:translate(45vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(74)   .circle[_ngcontent-%COMP%]{animation-delay:508ms}.circle-container[_ngcontent-%COMP%]:nth-child(75){width:6px;height:6px;animation-name:move-frames-75;animation-duration:31005ms;animation-delay:15889ms}@keyframes move-frames-75{0%{transform:translate(40vw,105vh)}to{transform:translate(30vw,-112vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(75)   .circle[_ngcontent-%COMP%]{animation-delay:.28s}.circle-container[_ngcontent-%COMP%]:nth-child(76){width:7px;height:7px;animation-name:move-frames-76;animation-duration:28102ms;animation-delay:6615ms}@keyframes move-frames-76{0%{transform:translate(76vw,110vh)}to{transform:translate(21vw,-131vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(76)   .circle[_ngcontent-%COMP%]{animation-delay:3736ms}.circle-container[_ngcontent-%COMP%]:nth-child(77){width:1px;height:1px;animation-name:move-frames-77;animation-duration:36127ms;animation-delay:29136ms}@keyframes move-frames-77{0%{transform:translate(33vw,110vh)}to{transform:translate(20vw,-118vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(77)   .circle[_ngcontent-%COMP%]{animation-delay:2895ms}.circle-container[_ngcontent-%COMP%]:nth-child(78){width:5px;height:5px;animation-name:move-frames-78;animation-duration:30.31s;animation-delay:13252ms}@keyframes move-frames-78{0%{transform:translate(16vw,103vh)}to{transform:translate(8vw,-107vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(78)   .circle[_ngcontent-%COMP%]{animation-delay:2337ms}.circle-container[_ngcontent-%COMP%]:nth-child(79){width:6px;height:6px;animation-name:move-frames-79;animation-duration:35.24s;animation-delay:10507ms}@keyframes move-frames-79{0%{transform:translate(8vw,105vh)}to{transform:translate(3vw,-118vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(79)   .circle[_ngcontent-%COMP%]{animation-delay:3776ms}.circle-container[_ngcontent-%COMP%]:nth-child(80){width:4px;height:4px;animation-name:move-frames-80;animation-duration:30265ms;animation-delay:36803ms}@keyframes move-frames-80{0%{transform:translate(4vw,106vh)}to{transform:translate(53vw,-134vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(80)   .circle[_ngcontent-%COMP%]{animation-delay:3294ms}.circle-container[_ngcontent-%COMP%]:nth-child(81){width:4px;height:4px;animation-name:move-frames-81;animation-duration:35677ms;animation-delay:10469ms}@keyframes move-frames-81{0%{transform:translate(36vw,107vh)}to{transform:translate(72vw,-114vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(81)   .circle[_ngcontent-%COMP%]{animation-delay:2305ms}.circle-container[_ngcontent-%COMP%]:nth-child(82){width:7px;height:7px;animation-name:move-frames-82;animation-duration:33949ms;animation-delay:13.96s}@keyframes move-frames-82{0%{transform:translate(84vw,102vh)}to{transform:translate(19vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(82)   .circle[_ngcontent-%COMP%]{animation-delay:2124ms}.circle-container[_ngcontent-%COMP%]:nth-child(83){width:8px;height:8px;animation-name:move-frames-83;animation-duration:33631ms;animation-delay:17424ms}@keyframes move-frames-83{0%{transform:translate(54vw,103vh)}to{transform:translate(7vw,-125vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(83)   .circle[_ngcontent-%COMP%]{animation-delay:2064ms}.circle-container[_ngcontent-%COMP%]:nth-child(84){width:4px;height:4px;animation-name:move-frames-84;animation-duration:33858ms;animation-delay:35743ms}@keyframes move-frames-84{0%{transform:translate(33vw,105vh)}to{transform:translate(52vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(84)   .circle[_ngcontent-%COMP%]{animation-delay:3915ms}.circle-container[_ngcontent-%COMP%]:nth-child(85){width:2px;height:2px;animation-name:move-frames-85;animation-duration:29735ms;animation-delay:11117ms}@keyframes move-frames-85{0%{transform:translate(66vw,104vh)}to{transform:translate(49vw,-123vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(85)   .circle[_ngcontent-%COMP%]{animation-delay:1012ms}.circle-container[_ngcontent-%COMP%]:nth-child(86){width:2px;height:2px;animation-name:move-frames-86;animation-duration:31577ms;animation-delay:14.25s}@keyframes move-frames-86{0%{transform:translate(90vw,106vh)}to{transform:translate(67vw,-114vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(86)   .circle[_ngcontent-%COMP%]{animation-delay:1277ms}.circle-container[_ngcontent-%COMP%]:nth-child(87){width:2px;height:2px;animation-name:move-frames-87;animation-duration:33.71s;animation-delay:2806ms}@keyframes move-frames-87{0%{transform:translate(6vw,107vh)}to{transform:translate(86vw,-122vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(87)   .circle[_ngcontent-%COMP%]{animation-delay:2725ms}.circle-container[_ngcontent-%COMP%]:nth-child(88){width:5px;height:5px;animation-name:move-frames-88;animation-duration:36354ms;animation-delay:144ms}@keyframes move-frames-88{0%{transform:translate(29vw,102vh)}to{transform:translate(51vw,-131vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(88)   .circle[_ngcontent-%COMP%]{animation-delay:1239ms}.circle-container[_ngcontent-%COMP%]:nth-child(89){width:2px;height:2px;animation-name:move-frames-89;animation-duration:35487ms;animation-delay:32955ms}@keyframes move-frames-89{0%{transform:translate(63vw,103vh)}to{transform:translate(64vw,-106vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(89)   .circle[_ngcontent-%COMP%]{animation-delay:3921ms}.circle-container[_ngcontent-%COMP%]:nth-child(90){width:5px;height:5px;animation-name:move-frames-90;animation-duration:28169ms;animation-delay:36234ms}@keyframes move-frames-90{0%{transform:translate(98vw,109vh)}to{transform:translate(31vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(90)   .circle[_ngcontent-%COMP%]{animation-delay:2.4s}.circle-container[_ngcontent-%COMP%]:nth-child(91){width:2px;height:2px;animation-name:move-frames-91;animation-duration:30725ms;animation-delay:6595ms}@keyframes move-frames-91{0%{transform:translate(61vw,104vh)}to{transform:translate(43vw,-116vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(91)   .circle[_ngcontent-%COMP%]{animation-delay:3354ms}.circle-container[_ngcontent-%COMP%]:nth-child(92){width:3px;height:3px;animation-name:move-frames-92;animation-duration:31655ms;animation-delay:4325ms}@keyframes move-frames-92{0%{transform:translate(2vw,103vh)}to{transform:translate(99vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(92)   .circle[_ngcontent-%COMP%]{animation-delay:2623ms}.circle-container[_ngcontent-%COMP%]:nth-child(93){width:7px;height:7px;animation-name:move-frames-93;animation-duration:31593ms;animation-delay:3861ms}@keyframes move-frames-93{0%{transform:translate(53vw,108vh)}to{transform:translate(25vw,-133vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(93)   .circle[_ngcontent-%COMP%]{animation-delay:2206ms}.circle-container[_ngcontent-%COMP%]:nth-child(94){width:3px;height:3px;animation-name:move-frames-94;animation-duration:33446ms;animation-delay:1.12s}@keyframes move-frames-94{0%{transform:translate(20vw,103vh)}to{transform:translate(36vw,-122vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(94)   .circle[_ngcontent-%COMP%]{animation-delay:1943ms}.circle-container[_ngcontent-%COMP%]:nth-child(95){width:8px;height:8px;animation-name:move-frames-95;animation-duration:30359ms;animation-delay:29842ms}@keyframes move-frames-95{0%{transform:translate(87vw,110vh)}to{transform:translate(6vw,-122vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(95)   .circle[_ngcontent-%COMP%]{animation-delay:1631ms}.circle-container[_ngcontent-%COMP%]:nth-child(96){width:5px;height:5px;animation-name:move-frames-96;animation-duration:31776ms;animation-delay:35684ms}@keyframes move-frames-96{0%{transform:translate(75vw,106vh)}to{transform:translate(14vw,-109vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(96)   .circle[_ngcontent-%COMP%]{animation-delay:2259ms}.circle-container[_ngcontent-%COMP%]:nth-child(97){width:3px;height:3px;animation-name:move-frames-97;animation-duration:33398ms;animation-delay:7851ms}@keyframes move-frames-97{0%{transform:translate(80vw,104vh)}to{transform:translate(32vw,-119vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(97)   .circle[_ngcontent-%COMP%]{animation-delay:738ms}.circle-container[_ngcontent-%COMP%]:nth-child(98){width:4px;height:4px;animation-name:move-frames-98;animation-duration:31211ms;animation-delay:29117ms}@keyframes move-frames-98{0%{transform:translate(98vw,102vh)}to{transform:translate(63vw,-132vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(98)   .circle[_ngcontent-%COMP%]{animation-delay:1.24s}.circle-container[_ngcontent-%COMP%]:nth-child(99){width:8px;height:8px;animation-name:move-frames-99;animation-duration:31839ms;animation-delay:12845ms}@keyframes move-frames-99{0%{transform:translate(100vw,101vh)}to{transform:translate(57vw,-128vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(99)   .circle[_ngcontent-%COMP%]{animation-delay:3793ms}.circle-container[_ngcontent-%COMP%]:nth-child(100){width:5px;height:5px;animation-name:move-frames-100;animation-duration:31.7s;animation-delay:29321ms}@keyframes move-frames-100{0%{transform:translate(55vw,107vh)}to{transform:translate(52vw,-109vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(100)   .circle[_ngcontent-%COMP%]{animation-delay:3222ms}.circle-container[_ngcontent-%COMP%]:nth-child(101){width:6px;height:6px;animation-name:move-frames-101;animation-duration:36718ms;animation-delay:28598ms}@keyframes move-frames-101{0%{transform:translate(6vw,106vh)}to{transform:translate(67vw,-107vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(101)   .circle[_ngcontent-%COMP%]{animation-delay:1889ms}.circle-container[_ngcontent-%COMP%]:nth-child(102){width:6px;height:6px;animation-name:move-frames-102;animation-duration:33808ms;animation-delay:13179ms}@keyframes move-frames-102{0%{transform:translate(86vw,109vh)}to{transform:translate(97vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(102)   .circle[_ngcontent-%COMP%]{animation-delay:1596ms}.circle-container[_ngcontent-%COMP%]:nth-child(103){width:6px;height:6px;animation-name:move-frames-103;animation-duration:36585ms;animation-delay:7182ms}@keyframes move-frames-103{0%{transform:translate(65vw,109vh)}to{transform:translate(20vw,-127vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(103)   .circle[_ngcontent-%COMP%]{animation-delay:2132ms}.circle-container[_ngcontent-%COMP%]:nth-child(104){width:7px;height:7px;animation-name:move-frames-104;animation-duration:33079ms;animation-delay:2432ms}@keyframes move-frames-104{0%{transform:translate(24vw,110vh)}to{transform:translate(56vw,-134vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(104)   .circle[_ngcontent-%COMP%]{animation-delay:1578ms}.circle-container[_ngcontent-%COMP%]:nth-child(105){width:1px;height:1px;animation-name:move-frames-105;animation-duration:30.09s;animation-delay:36546ms}@keyframes move-frames-105{0%{transform:translate(20vw,103vh)}to{transform:translate(95vw,-106vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(105)   .circle[_ngcontent-%COMP%]{animation-delay:356ms}.circle-container[_ngcontent-%COMP%]:nth-child(106){width:5px;height:5px;animation-name:move-frames-106;animation-duration:30444ms;animation-delay:23316ms}@keyframes move-frames-106{0%{transform:translate(54vw,105vh)}to{transform:translate(69vw,-107vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(106)   .circle[_ngcontent-%COMP%]{animation-delay:.81s}.circle-container[_ngcontent-%COMP%]:nth-child(107){width:7px;height:7px;animation-name:move-frames-107;animation-duration:30907ms;animation-delay:25834ms}@keyframes move-frames-107{0%{transform:translate(81vw,107vh)}to{transform:translate(39vw,-114vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(107)   .circle[_ngcontent-%COMP%]{animation-delay:751ms}.circle-container[_ngcontent-%COMP%]:nth-child(108){width:8px;height:8px;animation-name:move-frames-108;animation-duration:28862ms;animation-delay:30979ms}@keyframes move-frames-108{0%{transform:translate(1vw,105vh)}to{transform:translate(78vw,-118vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(108)   .circle[_ngcontent-%COMP%]{animation-delay:276ms}.circle-container[_ngcontent-%COMP%]:nth-child(109){width:3px;height:3px;animation-name:move-frames-109;animation-duration:30073ms;animation-delay:30813ms}@keyframes move-frames-109{0%{transform:translate(47vw,102vh)}to{transform:translate(79vw,-115vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(109)   .circle[_ngcontent-%COMP%]{animation-delay:2536ms}.circle-container[_ngcontent-%COMP%]:nth-child(110){width:5px;height:5px;animation-name:move-frames-110;animation-duration:28995ms;animation-delay:21609ms}@keyframes move-frames-110{0%{transform:translate(15vw,101vh)}to{transform:translate(81vw,-116vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(110)   .circle[_ngcontent-%COMP%]{animation-delay:1386ms}.circle-container[_ngcontent-%COMP%]:nth-child(111){width:2px;height:2px;animation-name:move-frames-111;animation-duration:35832ms;animation-delay:7004ms}@keyframes move-frames-111{0%{transform:translate(21vw,103vh)}to{transform:translate(53vw,-109vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(111)   .circle[_ngcontent-%COMP%]{animation-delay:3591ms}.circle-container[_ngcontent-%COMP%]:nth-child(112){width:7px;height:7px;animation-name:move-frames-112;animation-duration:29515ms;animation-delay:4.79s}@keyframes move-frames-112{0%{transform:translate(10vw,103vh)}to{transform:translate(87vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(112)   .circle[_ngcontent-%COMP%]{animation-delay:1283ms}.circle-container[_ngcontent-%COMP%]:nth-child(113){width:6px;height:6px;animation-name:move-frames-113;animation-duration:32287ms;animation-delay:15.99s}@keyframes move-frames-113{0%{transform:translate(19vw,103vh)}to{transform:translate(39vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(113)   .circle[_ngcontent-%COMP%]{animation-delay:869ms}.circle-container[_ngcontent-%COMP%]:nth-child(114){width:4px;height:4px;animation-name:move-frames-114;animation-duration:36355ms;animation-delay:20948ms}@keyframes move-frames-114{0%{transform:translate(57vw,109vh)}to{transform:translate(49vw,-122vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(114)   .circle[_ngcontent-%COMP%]{animation-delay:3195ms}.circle-container[_ngcontent-%COMP%]:nth-child(115){width:6px;height:6px;animation-name:move-frames-115;animation-duration:36526ms;animation-delay:21994ms}@keyframes move-frames-115{0%{transform:translate(49vw,105vh)}to{transform:translate(52vw,-120vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(115)   .circle[_ngcontent-%COMP%]{animation-delay:2578ms}.circle-container[_ngcontent-%COMP%]:nth-child(116){width:6px;height:6px;animation-name:move-frames-116;animation-duration:35138ms;animation-delay:15117ms}@keyframes move-frames-116{0%{transform:translate(49vw,108vh)}to{transform:translate(99vw,-116vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(116)   .circle[_ngcontent-%COMP%]{animation-delay:2269ms}.circle-container[_ngcontent-%COMP%]:nth-child(117){width:2px;height:2px;animation-name:move-frames-117;animation-duration:30975ms;animation-delay:849ms}@keyframes move-frames-117{0%{transform:translate(65vw,107vh)}to{transform:translate(66vw,-116vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(117)   .circle[_ngcontent-%COMP%]{animation-delay:1874ms}.circle-container[_ngcontent-%COMP%]:nth-child(118){width:3px;height:3px;animation-name:move-frames-118;animation-duration:31012ms;animation-delay:3979ms}@keyframes move-frames-118{0%{transform:translate(8vw,109vh)}to{transform:translate(33vw,-127vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(118)   .circle[_ngcontent-%COMP%]{animation-delay:3995ms}.circle-container[_ngcontent-%COMP%]:nth-child(119){width:8px;height:8px;animation-name:move-frames-119;animation-duration:34537ms;animation-delay:12141ms}@keyframes move-frames-119{0%{transform:translate(63vw,106vh)}to{transform:translate(53vw,-121vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(119)   .circle[_ngcontent-%COMP%]{animation-delay:3555ms}.circle-container[_ngcontent-%COMP%]:nth-child(120){width:4px;height:4px;animation-name:move-frames-120;animation-duration:29185ms;animation-delay:28707ms}@keyframes move-frames-120{0%{transform:translate(100vw,107vh)}to{transform:translate(23vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(120)   .circle[_ngcontent-%COMP%]{animation-delay:1604ms}.circle-container[_ngcontent-%COMP%]:nth-child(121){width:6px;height:6px;animation-name:move-frames-121;animation-duration:33249ms;animation-delay:15735ms}@keyframes move-frames-121{0%{transform:translate(74vw,102vh)}to{transform:translate(88vw,-111vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(121)   .circle[_ngcontent-%COMP%]{animation-delay:1.2s}.circle-container[_ngcontent-%COMP%]:nth-child(122){width:2px;height:2px;animation-name:move-frames-122;animation-duration:36386ms;animation-delay:34.03s}@keyframes move-frames-122{0%{transform:translate(32vw,103vh)}to{transform:translate(46vw,-111vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(122)   .circle[_ngcontent-%COMP%]{animation-delay:2503ms}.circle-container[_ngcontent-%COMP%]:nth-child(123){width:4px;height:4px;animation-name:move-frames-123;animation-duration:32178ms;animation-delay:4772ms}@keyframes move-frames-123{0%{transform:translate(8vw,103vh)}to{transform:translate(81vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(123)   .circle[_ngcontent-%COMP%]{animation-delay:1505ms}.circle-container[_ngcontent-%COMP%]:nth-child(124){width:2px;height:2px;animation-name:move-frames-124;animation-duration:32565ms;animation-delay:24671ms}@keyframes move-frames-124{0%{transform:translate(67vw,109vh)}to{transform:translate(100vw,-119vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(124)   .circle[_ngcontent-%COMP%]{animation-delay:1244ms}.circle-container[_ngcontent-%COMP%]:nth-child(125){width:4px;height:4px;animation-name:move-frames-125;animation-duration:36265ms;animation-delay:28616ms}@keyframes move-frames-125{0%{transform:translate(60vw,107vh)}to{transform:translate(6vw,-117vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(125)   .circle[_ngcontent-%COMP%]{animation-delay:1922ms}.circle-container[_ngcontent-%COMP%]:nth-child(126){width:3px;height:3px;animation-name:move-frames-126;animation-duration:34046ms;animation-delay:29.31s}@keyframes move-frames-126{0%{transform:translate(10vw,110vh)}to{transform:translate(81vw,-133vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(126)   .circle[_ngcontent-%COMP%]{animation-delay:815ms}.circle-container[_ngcontent-%COMP%]:nth-child(127){width:3px;height:3px;animation-name:move-frames-127;animation-duration:33877ms;animation-delay:26962ms}@keyframes move-frames-127{0%{transform:translate(82vw,109vh)}to{transform:translate(26vw,-133vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(127)   .circle[_ngcontent-%COMP%]{animation-delay:3262ms}.circle-container[_ngcontent-%COMP%]:nth-child(128){width:8px;height:8px;animation-name:move-frames-128;animation-duration:32181ms;animation-delay:17549ms}@keyframes move-frames-128{0%{transform:translate(17vw,101vh)}to{transform:translate(47vw,-112vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(128)   .circle[_ngcontent-%COMP%]{animation-delay:1232ms}.circle-container[_ngcontent-%COMP%]:nth-child(129){width:2px;height:2px;animation-name:move-frames-129;animation-duration:30.48s;animation-delay:25018ms}@keyframes move-frames-129{0%{transform:translate(71vw,106vh)}to{transform:translate(3vw,-116vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(129)   .circle[_ngcontent-%COMP%]{animation-delay:1.48s}.circle-container[_ngcontent-%COMP%]:nth-child(130){width:5px;height:5px;animation-name:move-frames-130;animation-duration:33827ms;animation-delay:13366ms}@keyframes move-frames-130{0%{transform:translate(28vw,106vh)}to{transform:translate(47vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(130)   .circle[_ngcontent-%COMP%]{animation-delay:3021ms}.circle-container[_ngcontent-%COMP%]:nth-child(131){width:8px;height:8px;animation-name:move-frames-131;animation-duration:30644ms;animation-delay:5.77s}@keyframes move-frames-131{0%{transform:translate(23vw,103vh)}to{transform:translate(73vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(131)   .circle[_ngcontent-%COMP%]{animation-delay:2462ms}.circle-container[_ngcontent-%COMP%]:nth-child(132){width:6px;height:6px;animation-name:move-frames-132;animation-duration:28.4s;animation-delay:17723ms}@keyframes move-frames-132{0%{transform:translate(83vw,102vh)}to{transform:translate(48vw,-120vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(132)   .circle[_ngcontent-%COMP%]{animation-delay:.66s}.circle-container[_ngcontent-%COMP%]:nth-child(133){width:3px;height:3px;animation-name:move-frames-133;animation-duration:29264ms;animation-delay:497ms}@keyframes move-frames-133{0%{transform:translate(11vw,104vh)}to{transform:translate(44vw,-130vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(133)   .circle[_ngcontent-%COMP%]{animation-delay:932ms}.circle-container[_ngcontent-%COMP%]:nth-child(134){width:4px;height:4px;animation-name:move-frames-134;animation-duration:28847ms;animation-delay:1802ms}@keyframes move-frames-134{0%{transform:translate(48vw,107vh)}to{transform:translate(88vw,-135vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(134)   .circle[_ngcontent-%COMP%]{animation-delay:3246ms}.circle-container[_ngcontent-%COMP%]:nth-child(135){width:4px;height:4px;animation-name:move-frames-135;animation-duration:32.69s;animation-delay:22287ms}@keyframes move-frames-135{0%{transform:translate(94vw,101vh)}to{transform:translate(26vw,-103vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(135)   .circle[_ngcontent-%COMP%]{animation-delay:781ms}.circle-container[_ngcontent-%COMP%]:nth-child(136){width:1px;height:1px;animation-name:move-frames-136;animation-duration:36451ms;animation-delay:7116ms}@keyframes move-frames-136{0%{transform:translate(30vw,109vh)}to{transform:translate(82vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(136)   .circle[_ngcontent-%COMP%]{animation-delay:3399ms}.circle-container[_ngcontent-%COMP%]:nth-child(137){width:8px;height:8px;animation-name:move-frames-137;animation-duration:30641ms;animation-delay:36536ms}@keyframes move-frames-137{0%{transform:translate(81vw,101vh)}to{transform:translate(21vw,-117vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(137)   .circle[_ngcontent-%COMP%]{animation-delay:3876ms}.circle-container[_ngcontent-%COMP%]:nth-child(138){width:7px;height:7px;animation-name:move-frames-138;animation-duration:36613ms;animation-delay:8079ms}@keyframes move-frames-138{0%{transform:translate(2vw,108vh)}to{transform:translate(37vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(138)   .circle[_ngcontent-%COMP%]{animation-delay:1094ms}.circle-container[_ngcontent-%COMP%]:nth-child(139){width:8px;height:8px;animation-name:move-frames-139;animation-duration:28266ms;animation-delay:33109ms}@keyframes move-frames-139{0%{transform:translate(98vw,109vh)}to{transform:translate(38vw,-111vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(139)   .circle[_ngcontent-%COMP%]{animation-delay:3149ms}.circle-container[_ngcontent-%COMP%]:nth-child(140){width:3px;height:3px;animation-name:move-frames-140;animation-duration:33001ms;animation-delay:15349ms}@keyframes move-frames-140{0%{transform:translate(62vw,102vh)}to{transform:translate(12vw,-115vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(140)   .circle[_ngcontent-%COMP%]{animation-delay:2718ms}.circle-container[_ngcontent-%COMP%]:nth-child(141){width:3px;height:3px;animation-name:move-frames-141;animation-duration:30.73s;animation-delay:21813ms}@keyframes move-frames-141{0%{transform:translate(68vw,101vh)}to{transform:translate(48vw,-119vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(141)   .circle[_ngcontent-%COMP%]{animation-delay:2862ms}.circle-container[_ngcontent-%COMP%]:nth-child(142){width:6px;height:6px;animation-name:move-frames-142;animation-duration:33007ms;animation-delay:3635ms}@keyframes move-frames-142{0%{transform:translate(88vw,103vh)}to{transform:translate(65vw,-112vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(142)   .circle[_ngcontent-%COMP%]{animation-delay:137ms}.circle-container[_ngcontent-%COMP%]:nth-child(143){width:7px;height:7px;animation-name:move-frames-143;animation-duration:32.29s;animation-delay:921ms}@keyframes move-frames-143{0%{transform:translate(67vw,106vh)}to{transform:translate(38vw,-110vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(143)   .circle[_ngcontent-%COMP%]{animation-delay:842ms}.circle-container[_ngcontent-%COMP%]:nth-child(144){width:8px;height:8px;animation-name:move-frames-144;animation-duration:29911ms;animation-delay:30244ms}@keyframes move-frames-144{0%{transform:translate(48vw,104vh)}to{transform:translate(83vw,-105vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(144)   .circle[_ngcontent-%COMP%]{animation-delay:438ms}.circle-container[_ngcontent-%COMP%]:nth-child(145){width:2px;height:2px;animation-name:move-frames-145;animation-duration:34946ms;animation-delay:9591ms}@keyframes move-frames-145{0%{transform:translate(87vw,102vh)}to{transform:translate(48vw,-132vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(145)   .circle[_ngcontent-%COMP%]{animation-delay:312ms}.circle-container[_ngcontent-%COMP%]:nth-child(146){width:2px;height:2px;animation-name:move-frames-146;animation-duration:31.08s;animation-delay:10458ms}@keyframes move-frames-146{0%{transform:translate(11vw,103vh)}to{transform:translate(4vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(146)   .circle[_ngcontent-%COMP%]{animation-delay:934ms}.circle-container[_ngcontent-%COMP%]:nth-child(147){width:8px;height:8px;animation-name:move-frames-147;animation-duration:33364ms;animation-delay:29125ms}@keyframes move-frames-147{0%{transform:translate(2vw,102vh)}to{transform:translate(68vw,-108vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(147)   .circle[_ngcontent-%COMP%]{animation-delay:632ms}.circle-container[_ngcontent-%COMP%]:nth-child(148){width:8px;height:8px;animation-name:move-frames-148;animation-duration:36312ms;animation-delay:22384ms}@keyframes move-frames-148{0%{transform:translate(26vw,109vh)}to{transform:translate(13vw,-137vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(148)   .circle[_ngcontent-%COMP%]{animation-delay:2086ms}.circle-container[_ngcontent-%COMP%]:nth-child(149){width:8px;height:8px;animation-name:move-frames-149;animation-duration:31597ms;animation-delay:31758ms}@keyframes move-frames-149{0%{transform:translate(21vw,108vh)}to{transform:translate(52vw,-132vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(149)   .circle[_ngcontent-%COMP%]{animation-delay:2834ms}.circle-container[_ngcontent-%COMP%]:nth-child(150){width:2px;height:2px;animation-name:move-frames-150;animation-duration:30433ms;animation-delay:1125ms}@keyframes move-frames-150{0%{transform:translate(98vw,101vh)}to{transform:translate(89vw,-125vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(150)   .circle[_ngcontent-%COMP%]{animation-delay:3134ms}.circle-container[_ngcontent-%COMP%]:nth-child(151){width:2px;height:2px;animation-name:move-frames-151;animation-duration:32954ms;animation-delay:18631ms}@keyframes move-frames-151{0%{transform:translate(82vw,107vh)}to{transform:translate(90vw,-118vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(151)   .circle[_ngcontent-%COMP%]{animation-delay:913ms}.circle-container[_ngcontent-%COMP%]:nth-child(152){width:5px;height:5px;animation-name:move-frames-152;animation-duration:31447ms;animation-delay:26553ms}@keyframes move-frames-152{0%{transform:translate(100vw,108vh)}to{transform:translate(46vw,-137vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(152)   .circle[_ngcontent-%COMP%]{animation-delay:641ms}.circle-container[_ngcontent-%COMP%]:nth-child(153){width:3px;height:3px;animation-name:move-frames-153;animation-duration:36537ms;animation-delay:23364ms}@keyframes move-frames-153{0%{transform:translate(74vw,104vh)}to{transform:translate(20vw,-123vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(153)   .circle[_ngcontent-%COMP%]{animation-delay:1129ms}.circle-container[_ngcontent-%COMP%]:nth-child(154){width:1px;height:1px;animation-name:move-frames-154;animation-duration:35204ms;animation-delay:28621ms}@keyframes move-frames-154{0%{transform:translate(71vw,104vh)}to{transform:translate(21vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(154)   .circle[_ngcontent-%COMP%]{animation-delay:2871ms}.circle-container[_ngcontent-%COMP%]:nth-child(155){width:5px;height:5px;animation-name:move-frames-155;animation-duration:34.54s;animation-delay:2.61s}@keyframes move-frames-155{0%{transform:translate(12vw,104vh)}to{transform:translate(94vw,-128vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(155)   .circle[_ngcontent-%COMP%]{animation-delay:144ms}.circle-container[_ngcontent-%COMP%]:nth-child(156){width:8px;height:8px;animation-name:move-frames-156;animation-duration:29587ms;animation-delay:2937ms}@keyframes move-frames-156{0%{transform:translate(21vw,108vh)}to{transform:translate(56vw,-133vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(156)   .circle[_ngcontent-%COMP%]{animation-delay:537ms}.circle-container[_ngcontent-%COMP%]:nth-child(157){width:8px;height:8px;animation-name:move-frames-157;animation-duration:36317ms;animation-delay:12523ms}@keyframes move-frames-157{0%{transform:translate(99vw,107vh)}to{transform:translate(52vw,-130vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(157)   .circle[_ngcontent-%COMP%]{animation-delay:.27s}.circle-container[_ngcontent-%COMP%]:nth-child(158){width:4px;height:4px;animation-name:move-frames-158;animation-duration:30175ms;animation-delay:29634ms}@keyframes move-frames-158{0%{transform:translate(57vw,102vh)}to{transform:translate(32vw,-118vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(158)   .circle[_ngcontent-%COMP%]{animation-delay:3925ms}.circle-container[_ngcontent-%COMP%]:nth-child(159){width:6px;height:6px;animation-name:move-frames-159;animation-duration:28547ms;animation-delay:34651ms}@keyframes move-frames-159{0%{transform:translate(67vw,101vh)}to{transform:translate(27vw,-109vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(159)   .circle[_ngcontent-%COMP%]{animation-delay:1934ms}.circle-container[_ngcontent-%COMP%]:nth-child(160){width:1px;height:1px;animation-name:move-frames-160;animation-duration:33285ms;animation-delay:3303ms}@keyframes move-frames-160{0%{transform:translate(26vw,109vh)}to{transform:translate(22vw,-122vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(160)   .circle[_ngcontent-%COMP%]{animation-delay:2836ms}.circle-container[_ngcontent-%COMP%]:nth-child(161){width:1px;height:1px;animation-name:move-frames-161;animation-duration:31153ms;animation-delay:7689ms}@keyframes move-frames-161{0%{transform:translate(81vw,110vh)}to{transform:translate(54vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(161)   .circle[_ngcontent-%COMP%]{animation-delay:3912ms}.circle-container[_ngcontent-%COMP%]:nth-child(162){width:5px;height:5px;animation-name:move-frames-162;animation-duration:34531ms;animation-delay:9334ms}@keyframes move-frames-162{0%{transform:translate(80vw,102vh)}to{transform:translate(64vw,-122vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(162)   .circle[_ngcontent-%COMP%]{animation-delay:218ms}.circle-container[_ngcontent-%COMP%]:nth-child(163){width:3px;height:3px;animation-name:move-frames-163;animation-duration:28621ms;animation-delay:27972ms}@keyframes move-frames-163{0%{transform:translate(8vw,102vh)}to{transform:translate(3vw,-124vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(163)   .circle[_ngcontent-%COMP%]{animation-delay:511ms}.circle-container[_ngcontent-%COMP%]:nth-child(164){width:1px;height:1px;animation-name:move-frames-164;animation-duration:34403ms;animation-delay:3928ms}@keyframes move-frames-164{0%{transform:translate(53vw,110vh)}to{transform:translate(81vw,-123vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(164)   .circle[_ngcontent-%COMP%]{animation-delay:3868ms}.circle-container[_ngcontent-%COMP%]:nth-child(165){width:5px;height:5px;animation-name:move-frames-165;animation-duration:36893ms;animation-delay:21973ms}@keyframes move-frames-165{0%{transform:translate(40vw,101vh)}to{transform:translate(19vw,-128vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(165)   .circle[_ngcontent-%COMP%]{animation-delay:164ms}.circle-container[_ngcontent-%COMP%]:nth-child(166){width:6px;height:6px;animation-name:move-frames-166;animation-duration:35338ms;animation-delay:27267ms}@keyframes move-frames-166{0%{transform:translate(9vw,105vh)}to{transform:translate(27vw,-110vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(166)   .circle[_ngcontent-%COMP%]{animation-delay:3.26s}.circle-container[_ngcontent-%COMP%]:nth-child(167){width:4px;height:4px;animation-name:move-frames-167;animation-duration:28267ms;animation-delay:3859ms}@keyframes move-frames-167{0%{transform:translate(36vw,104vh)}to{transform:translate(51vw,-116vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(167)   .circle[_ngcontent-%COMP%]{animation-delay:3698ms}.circle-container[_ngcontent-%COMP%]:nth-child(168){width:7px;height:7px;animation-name:move-frames-168;animation-duration:29147ms;animation-delay:32599ms}@keyframes move-frames-168{0%{transform:translate(42vw,107vh)}to{transform:translate(48vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(168)   .circle[_ngcontent-%COMP%]{animation-delay:3826ms}.circle-container[_ngcontent-%COMP%]:nth-child(169){width:6px;height:6px;animation-name:move-frames-169;animation-duration:32241ms;animation-delay:30921ms}@keyframes move-frames-169{0%{transform:translate(47vw,107vh)}to{transform:translate(35vw,-111vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(169)   .circle[_ngcontent-%COMP%]{animation-delay:1356ms}.circle-container[_ngcontent-%COMP%]:nth-child(170){width:6px;height:6px;animation-name:move-frames-170;animation-duration:29.5s;animation-delay:10288ms}@keyframes move-frames-170{0%{transform:translate(67vw,108vh)}to{transform:translate(40vw,-124vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(170)   .circle[_ngcontent-%COMP%]{animation-delay:923ms}.circle-container[_ngcontent-%COMP%]:nth-child(171){width:4px;height:4px;animation-name:move-frames-171;animation-duration:33257ms;animation-delay:34625ms}@keyframes move-frames-171{0%{transform:translate(63vw,106vh)}to{transform:translate(8vw,-110vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(171)   .circle[_ngcontent-%COMP%]{animation-delay:2934ms}.circle-container[_ngcontent-%COMP%]:nth-child(172){width:4px;height:4px;animation-name:move-frames-172;animation-duration:31647ms;animation-delay:36576ms}@keyframes move-frames-172{0%{transform:translate(53vw,104vh)}to{transform:translate(57vw,-114vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(172)   .circle[_ngcontent-%COMP%]{animation-delay:3732ms}.circle-container[_ngcontent-%COMP%]:nth-child(173){width:1px;height:1px;animation-name:move-frames-173;animation-duration:34279ms;animation-delay:16329ms}@keyframes move-frames-173{0%{transform:translate(67vw,110vh)}to{transform:translate(47vw,-134vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(173)   .circle[_ngcontent-%COMP%]{animation-delay:1869ms}.circle-container[_ngcontent-%COMP%]:nth-child(174){width:3px;height:3px;animation-name:move-frames-174;animation-duration:36492ms;animation-delay:8546ms}@keyframes move-frames-174{0%{transform:translate(11vw,102vh)}to{transform:translate(12vw,-119vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(174)   .circle[_ngcontent-%COMP%]{animation-delay:2.06s}.circle-container[_ngcontent-%COMP%]:nth-child(175){width:5px;height:5px;animation-name:move-frames-175;animation-duration:32353ms;animation-delay:33259ms}@keyframes move-frames-175{0%{transform:translate(11vw,109vh)}to{transform:translate(59vw,-119vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(175)   .circle[_ngcontent-%COMP%]{animation-delay:2804ms}.circle-container[_ngcontent-%COMP%]:nth-child(176){width:5px;height:5px;animation-name:move-frames-176;animation-duration:33053ms;animation-delay:21148ms}@keyframes move-frames-176{0%{transform:translate(91vw,107vh)}to{transform:translate(87vw,-130vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(176)   .circle[_ngcontent-%COMP%]{animation-delay:283ms}.circle-container[_ngcontent-%COMP%]:nth-child(177){width:3px;height:3px;animation-name:move-frames-177;animation-duration:34277ms;animation-delay:26998ms}@keyframes move-frames-177{0%{transform:translate(26vw,109vh)}to{transform:translate(88vw,-133vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(177)   .circle[_ngcontent-%COMP%]{animation-delay:1141ms}.circle-container[_ngcontent-%COMP%]:nth-child(178){width:5px;height:5px;animation-name:move-frames-178;animation-duration:35303ms;animation-delay:6417ms}@keyframes move-frames-178{0%{transform:translate(54vw,101vh)}to{transform:translate(83vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(178)   .circle[_ngcontent-%COMP%]{animation-delay:3245ms}.circle-container[_ngcontent-%COMP%]:nth-child(179){width:1px;height:1px;animation-name:move-frames-179;animation-duration:30442ms;animation-delay:23241ms}@keyframes move-frames-179{0%{transform:translate(26vw,104vh)}to{transform:translate(7vw,-120vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(179)   .circle[_ngcontent-%COMP%]{animation-delay:2185ms}.circle-container[_ngcontent-%COMP%]:nth-child(180){width:5px;height:5px;animation-name:move-frames-180;animation-duration:35251ms;animation-delay:27079ms}@keyframes move-frames-180{0%{transform:translate(75vw,106vh)}to{transform:translate(91vw,-122vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(180)   .circle[_ngcontent-%COMP%]{animation-delay:1802ms}.circle-container[_ngcontent-%COMP%]:nth-child(181){width:1px;height:1px;animation-name:move-frames-181;animation-duration:36489ms;animation-delay:23491ms}@keyframes move-frames-181{0%{transform:translate(91vw,103vh)}to{transform:translate(73vw,-115vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(181)   .circle[_ngcontent-%COMP%]{animation-delay:2906ms}.circle-container[_ngcontent-%COMP%]:nth-child(182){width:1px;height:1px;animation-name:move-frames-182;animation-duration:31135ms;animation-delay:31708ms}@keyframes move-frames-182{0%{transform:translate(64vw,107vh)}to{transform:translate(38vw,-108vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(182)   .circle[_ngcontent-%COMP%]{animation-delay:2213ms}.circle-container[_ngcontent-%COMP%]:nth-child(183){width:8px;height:8px;animation-name:move-frames-183;animation-duration:28072ms;animation-delay:15629ms}@keyframes move-frames-183{0%{transform:translate(17vw,107vh)}to{transform:translate(84vw,-113vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(183)   .circle[_ngcontent-%COMP%]{animation-delay:2149ms}.circle-container[_ngcontent-%COMP%]:nth-child(184){width:8px;height:8px;animation-name:move-frames-184;animation-duration:28734ms;animation-delay:33738ms}@keyframes move-frames-184{0%{transform:translate(2vw,108vh)}to{transform:translate(56vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(184)   .circle[_ngcontent-%COMP%]{animation-delay:2.91s}.circle-container[_ngcontent-%COMP%]:nth-child(185){width:8px;height:8px;animation-name:move-frames-185;animation-duration:29591ms;animation-delay:32287ms}@keyframes move-frames-185{0%{transform:translate(38vw,101vh)}to{transform:translate(90vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(185)   .circle[_ngcontent-%COMP%]{animation-delay:1411ms}.circle-container[_ngcontent-%COMP%]:nth-child(186){width:4px;height:4px;animation-name:move-frames-186;animation-duration:28162ms;animation-delay:6513ms}@keyframes move-frames-186{0%{transform:translate(51vw,107vh)}to{transform:translate(75vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(186)   .circle[_ngcontent-%COMP%]{animation-delay:2252ms}.circle-container[_ngcontent-%COMP%]:nth-child(187){width:1px;height:1px;animation-name:move-frames-187;animation-duration:35064ms;animation-delay:8569ms}@keyframes move-frames-187{0%{transform:translate(22vw,106vh)}to{transform:translate(80vw,-120vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(187)   .circle[_ngcontent-%COMP%]{animation-delay:1989ms}.circle-container[_ngcontent-%COMP%]:nth-child(188){width:2px;height:2px;animation-name:move-frames-188;animation-duration:36423ms;animation-delay:35395ms}@keyframes move-frames-188{0%{transform:translate(100vw,106vh)}to{transform:translate(75vw,-134vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(188)   .circle[_ngcontent-%COMP%]{animation-delay:1135ms}.circle-container[_ngcontent-%COMP%]:nth-child(189){width:7px;height:7px;animation-name:move-frames-189;animation-duration:30958ms;animation-delay:30385ms}@keyframes move-frames-189{0%{transform:translate(45vw,107vh)}to{transform:translate(80vw,-129vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(189)   .circle[_ngcontent-%COMP%]{animation-delay:2.21s}.circle-container[_ngcontent-%COMP%]:nth-child(190){width:7px;height:7px;animation-name:move-frames-190;animation-duration:35154ms;animation-delay:.54s}@keyframes move-frames-190{0%{transform:translate(70vw,108vh)}to{transform:translate(57vw,-110vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(190)   .circle[_ngcontent-%COMP%]{animation-delay:1981ms}.circle-container[_ngcontent-%COMP%]:nth-child(191){width:5px;height:5px;animation-name:move-frames-191;animation-duration:29859ms;animation-delay:13602ms}@keyframes move-frames-191{0%{transform:translate(3vw,101vh)}to{transform:translate(48vw,-116vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(191)   .circle[_ngcontent-%COMP%]{animation-delay:2359ms}.circle-container[_ngcontent-%COMP%]:nth-child(192){width:6px;height:6px;animation-name:move-frames-192;animation-duration:30219ms;animation-delay:4945ms}@keyframes move-frames-192{0%{transform:translate(31vw,101vh)}to{transform:translate(16vw,-103vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(192)   .circle[_ngcontent-%COMP%]{animation-delay:3311ms}.circle-container[_ngcontent-%COMP%]:nth-child(193){width:1px;height:1px;animation-name:move-frames-193;animation-duration:30205ms;animation-delay:27.43s}@keyframes move-frames-193{0%{transform:translate(42vw,110vh)}to{transform:translate(16vw,-120vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(193)   .circle[_ngcontent-%COMP%]{animation-delay:2643ms}.circle-container[_ngcontent-%COMP%]:nth-child(194){width:6px;height:6px;animation-name:move-frames-194;animation-duration:31277ms;animation-delay:10325ms}@keyframes move-frames-194{0%{transform:translate(97vw,106vh)}to{transform:translate(96vw,-134vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(194)   .circle[_ngcontent-%COMP%]{animation-delay:1267ms}.circle-container[_ngcontent-%COMP%]:nth-child(195){width:4px;height:4px;animation-name:move-frames-195;animation-duration:34258ms;animation-delay:15662ms}@keyframes move-frames-195{0%{transform:translate(88vw,106vh)}to{transform:translate(23vw,-108vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(195)   .circle[_ngcontent-%COMP%]{animation-delay:508ms}.circle-container[_ngcontent-%COMP%]:nth-child(196){width:6px;height:6px;animation-name:move-frames-196;animation-duration:30478ms;animation-delay:12.12s}@keyframes move-frames-196{0%{transform:translate(51vw,101vh)}to{transform:translate(92vw,-126vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(196)   .circle[_ngcontent-%COMP%]{animation-delay:905ms}.circle-container[_ngcontent-%COMP%]:nth-child(197){width:6px;height:6px;animation-name:move-frames-197;animation-duration:29455ms;animation-delay:7242ms}@keyframes move-frames-197{0%{transform:translate(5vw,107vh)}to{transform:translate(45vw,-125vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(197)   .circle[_ngcontent-%COMP%]{animation-delay:3028ms}.circle-container[_ngcontent-%COMP%]:nth-child(198){width:6px;height:6px;animation-name:move-frames-198;animation-duration:36711ms;animation-delay:15028ms}@keyframes move-frames-198{0%{transform:translate(68vw,103vh)}to{transform:translate(44vw,-132vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(198)   .circle[_ngcontent-%COMP%]{animation-delay:2668ms}.circle-container[_ngcontent-%COMP%]:nth-child(199){width:1px;height:1px;animation-name:move-frames-199;animation-duration:28342ms;animation-delay:2029ms}@keyframes move-frames-199{0%{transform:translate(17vw,108vh)}to{transform:translate(40vw,-118vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(199)   .circle[_ngcontent-%COMP%]{animation-delay:3.88s}.circle-container[_ngcontent-%COMP%]:nth-child(200){width:3px;height:3px;animation-name:move-frames-200;animation-duration:30504ms;animation-delay:11487ms}@keyframes move-frames-200{0%{transform:translate(5vw,106vh)}to{transform:translate(37vw,-136vh)}}.circle-container[_ngcontent-%COMP%]:nth-child(200)   .circle[_ngcontent-%COMP%]{animation-delay:97ms}.message[_ngcontent-%COMP%]{position:absolute;right:20px;bottom:10px;color:#fff;font-family:"Josefin Slab",serif;line-height:27px;font-size:18px;text-align:right;pointer-events:none;animation:message-frames 1.5s ease 5s forwards;opacity:0}@keyframes message-frames{0%{opacity:0}to{opacity:1}}.about-us[_ngcontent-%COMP%], .projects[_ngcontent-%COMP%], .contact-us[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.about-us[_ngcontent-%COMP%]   .my-project[_ngcontent-%COMP%], .projects[_ngcontent-%COMP%]   .my-project[_ngcontent-%COMP%], .contact-us[_ngcontent-%COMP%]   .my-project[_ngcontent-%COMP%]{width:100%}.footer[_ngcontent-%COMP%]{display:flex;height:7vh;flex-direction:column;align-items:center;background-color:#141414;justify-content:space-between}.contact-us[_ngcontent-%COMP%]{margin-top:30px;background-color:#1e0660}.my-contact-us[_ngcontent-%COMP%], .my-footer-us[_ngcontent-%COMP%]{width:100%}.my-footer-us[_ngcontent-%COMP%]{display:inline-flex;padding-top:10px;background:#141414}']
          }), n
        })(),
        qb = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            imports: [
              [_a]
            ]
          }), n
        })(),
        Kb = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            imports: [
              [Wu, rn, sd], rn
            ]
          }), n
        })(),
        SR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n
          }), n.\u0275inj = ge({
            providers: [WA],
            imports: [
              [qb, Kb, rn], qb, Kb
            ]
          }), n
        })(),
        PR = (() => {
          class n {}
          return n.\u0275fac = function (t) {
            return new(t || n)
          }, n.\u0275mod = Me({
            type: n,
            bootstrap: [MR]
          }), n.\u0275inj = ge({
            providers: [],
            imports: [
              [Uy, hb, rI, ZF, mF, SR, hb]
            ]
          }), n
        })();
      ey = !1, nP().bootstrapModule(PR).catch(n => console.error(n))
    }
  },
  U => {
    U(U.s = 495)
  }
]);
