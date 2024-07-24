export const bigDecimal = (function (e) {
	var n = {};
	function t(r) {
		if (n[r]) return n[r].exports;
		var i = (n[r] = { i: r, l: !1, exports: {} });
		return e[r].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
	}
	return (
		(t.m = e),
		(t.c = n),
		(t.d = function (e, n, r) {
			t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r });
		}),
		(t.r = function (e) {
			'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
				Object.defineProperty(e, '__esModule', { value: !0 });
		}),
		(t.t = function (e, n) {
			if ((1 & n && (e = t(e)), 8 & n)) return e;
			if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
			var r = Object.create(null);
			if ((t.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & n && 'string' != typeof e))
				for (var i in e)
					t.d(
						r,
						i,
						function (n) {
							return e[n];
						}.bind(null, i),
					);
			return r;
		}),
		(t.n = function (e) {
			var n =
				e && e.__esModule
					? function () {
							return e.default;
					  }
					: function () {
							return e;
					  };
			return t.d(n, 'a', n), n;
		}),
		(t.o = function (e, n) {
			return Object.prototype.hasOwnProperty.call(e, n);
		}),
		(t.p = ''),
		t((t.s = 6))
	);
})([
	function (e, n, t) {
		'use strict';
		function r(e) {
			for (var n = '', t = e.length, r = e.split('.')[1], i = r ? r.length : 0, o = 0; o < t; o++)
				e[o] >= '0' && e[o] <= '9' ? (n += 9 - parseInt(e[o])) : (n += e[o]);
			return u(n, i > 0 ? '0.' + new Array(i).join('0') + '1' : '1');
		}
		function i(e) {
			var n = e.split('.');
			for (n[0] || (n[0] = '0'); '0' == n[0][0] && n[0].length > 1; ) n[0] = n[0].substring(1);
			return n[0] + (n[1] ? '.' + n[1] : '');
		}
		function o(e, n) {
			var t = e.split('.'),
				r = n.split('.'),
				i = t[0].length,
				o = r[0].length;
			return (
				i > o
					? (r[0] = new Array(Math.abs(i - o) + 1).join('0') + (r[0] ? r[0] : ''))
					: (t[0] = new Array(Math.abs(i - o) + 1).join('0') + (t[0] ? t[0] : '')),
				(i = t[1] ? t[1].length : 0),
				(o = r[1] ? r[1].length : 0),
				(i || o) &&
					(i > o
						? (r[1] = (r[1] ? r[1] : '') + new Array(Math.abs(i - o) + 1).join('0'))
						: (t[1] = (t[1] ? t[1] : '') + new Array(Math.abs(i - o) + 1).join('0'))),
				[(e = t[0] + (t[1] ? '.' + t[1] : '')), (n = r[0] + (r[1] ? '.' + r[1] : ''))]
			);
		}
		function u(e, n) {
			var t;
			(e = (t = o(e, n))[0]), (n = t[1]);
			for (var r = '', i = 0, u = e.length - 1; u >= 0; u--)
				if ('.' !== e[u]) {
					var a = parseInt(e[u]) + parseInt(n[u]) + i;
					(r = (a % 10) + r), (i = Math.floor(a / 10));
				} else r = '.' + r;
			return i ? i.toString() + r : r;
		}
		Object.defineProperty(n, '__esModule', { value: !0 }),
			(n.pad = n.trim = n.add = void 0),
			(n.add = function (e, n) {
				var t;
				void 0 === n && (n = '0');
				var a = 0,
					s = -1;
				'-' == e[0] && (a++, (s = 1), (e = e.substring(1)).length),
					'-' == n[0] && (a++, (s = 2), (n = n.substring(1)).length),
					(e = i(e)),
					(n = i(n)),
					(e = (t = o(i(e), i(n)))[0]),
					(n = t[1]),
					1 == a && (1 == s ? (e = r(e)) : (n = r(n)));
				var d = u(e, n);
				return a ? (2 == a ? '-' + i(d) : e.length < d.length ? i(d.substring(1)) : '-' + i(r(d))) : i(d);
			}),
			(n.trim = i),
			(n.pad = o);
	},
	function (e, n, t) {
		'use strict';
		Object.defineProperty(n, '__esModule', { value: !0 }), (n.roundOff = void 0);
		var r = t(2);
		function i(e, n, t, i) {
			if (!e || e === new Array(e.length + 1).join('0')) return !1;
			if (i === r.RoundingModes.DOWN || (!t && i === r.RoundingModes.FLOOR) || (t && i === r.RoundingModes.CEILING)) return !1;
			if (i === r.RoundingModes.UP || (t && i === r.RoundingModes.FLOOR) || (!t && i === r.RoundingModes.CEILING)) return !0;
			var o = '5' + new Array(e.length).join('0');
			if (e > o) return !0;
			if (e < o) return !1;
			switch (i) {
				case r.RoundingModes.HALF_DOWN:
					return !1;
				case r.RoundingModes.HALF_UP:
					return !0;
				case r.RoundingModes.HALF_EVEN:
				default:
					return parseInt(n[n.length - 1]) % 2 == 1;
			}
		}
		function o(e, n) {
			void 0 === n && (n = 0), n || (n = 1), 'number' == typeof e && e.toString();
			for (var t = '', r = e.length - 1; r >= 0; r--) {
				var i = parseInt(e[r]) + n;
				10 == i ? ((n = 1), (i = 0)) : (n = 0), (t += i);
			}
			return n && (t += n), t.split('').reverse().join('');
		}
		n.roundOff = function e(n, t, u) {
			if ((void 0 === t && (t = 0), void 0 === u && (u = r.RoundingModes.HALF_EVEN), u === r.RoundingModes.UNNECESSARY))
				throw new Error('UNNECESSARY Rounding Mode has not yet been implemented');
			'number' == typeof n && (n = n.toString());
			var a = !1;
			'-' === n[0] && ((a = !0), (n = n.substring(1)));
			var s = n.split('.'),
				d = s[0],
				l = s[1];
			if (t < 0) {
				if (((t = -t), d.length <= t)) return '0';
				var f = d.substr(0, d.length - t);
				return (a ? '-' : '') + (f = e((n = f + '.' + d.substr(d.length - t) + l), 0, u)) + new Array(t + 1).join('0');
			}
			if (0 == t) {
				d.length;
				return i(s[1], d, a, u) ? (a ? '-' : '') + o(d) : (a ? '-' : '') + d;
			}
			if (!s[1]) return (a ? '-' : '') + d + '.' + new Array(t + 1).join('0');
			if (s[1].length < t) return (a ? '-' : '') + d + '.' + s[1] + new Array(t - s[1].length + 1).join('0');
			l = s[1].substring(0, t);
			var g = s[1].substring(t);
			return g && i(g, l, a, u) && (l = o(l)).length > t
				? o(d, parseInt(l[0])) + '.' + l.substring(1)
				: (a ? '-' : '') + d + '.' + l;
		};
	},
	function (e, n, t) {
		'use strict';
		Object.defineProperty(n, '__esModule', { value: !0 }),
			(n.RoundingModes = void 0),
			(function (e) {
				(e[(e.CEILING = 0)] = 'CEILING'),
					(e[(e.DOWN = 1)] = 'DOWN'),
					(e[(e.FLOOR = 2)] = 'FLOOR'),
					(e[(e.HALF_DOWN = 3)] = 'HALF_DOWN'),
					(e[(e.HALF_EVEN = 4)] = 'HALF_EVEN'),
					(e[(e.HALF_UP = 5)] = 'HALF_UP'),
					(e[(e.UNNECESSARY = 6)] = 'UNNECESSARY'),
					(e[(e.UP = 7)] = 'UP');
			})(n.RoundingModes || (n.RoundingModes = {}));
	},
	function (e, n, t) {
		'use strict';
		function r(e) {
			for (; '0' == e[0]; ) e = e.substr(1);
			if (-1 != e.indexOf('.')) for (; '0' == e[e.length - 1]; ) e = e.substr(0, e.length - 1);
			return (
				'' == e || '.' == e ? (e = '0') : '.' == e[e.length - 1] && (e = e.substr(0, e.length - 1)),
				'.' == e[0] && (e = '0' + e),
				e
			);
		}
		Object.defineProperty(n, '__esModule', { value: !0 }),
			(n.multiply = void 0),
			(n.multiply = function (e, n) {
				(e = e.toString()), (n = n.toString());
				var t = 0;
				'-' == e[0] && (t++, (e = e.substr(1))), '-' == n[0] && (t++, (n = n.substr(1))), (e = r(e)), (n = r(n));
				var i = 0,
					o = 0;
				-1 != e.indexOf('.') && (i = e.length - e.indexOf('.') - 1), -1 != n.indexOf('.') && (o = n.length - n.indexOf('.') - 1);
				var u = i + o;
				if (((e = r(e.replace('.', ''))), (n = r(n.replace('.', ''))), e.length < n.length)) {
					var a = e;
					(e = n), (n = a);
				}
				if ('0' == n) return '0';
				for (var s, d, l = n.length, f = 0, g = [], c = l - 1, v = '', p = 0; p < l; p++) g[p] = e.length - 1;
				for (p = 0; p < 2 * e.length; p++) {
					for (var h = 0, b = n.length - 1; b >= c && b >= 0; b--)
						g[b] > -1 && g[b] < e.length && (h += parseInt(e[g[b]--]) * parseInt(n[b]));
					(h += f), (f = Math.floor(h / 10)), (v = (h % 10) + v), c--;
				}
				return (
					(v = r(
						((s = v),
						0 == (d = u)
							? s
							: (s = d >= s.length ? new Array(d - s.length + 1).join('0') + s : s).substr(0, s.length - d) +
							  '.' +
							  s.substr(s.length - d, d)),
					)),
					1 == t && (v = '-' + v),
					v
				);
			});
	},
	function (e, n, t) {
		'use strict';
		Object.defineProperty(n, '__esModule', { value: !0 }), (n.divide = void 0);
		var r = t(0),
			i = t(1);
		n.divide = function (e, n, t) {
			if ((void 0 === t && (t = 8), 0 == n)) throw new Error('Cannot divide by 0');
			if (
				((e = e.toString()),
				(n = n.toString()),
				(e = e.replace(/(\.\d*?[1-9])0+$/g, '$1').replace(/\.0+$/, '')),
				(n = n.replace(/(\.\d*?[1-9])0+$/g, '$1').replace(/\.0+$/, '')),
				0 == e)
			)
				return '0';
			var o = 0;
			'-' == n[0] && ((n = n.substring(1)), o++), '-' == e[0] && ((e = e.substring(1)), o++);
			var u = n.indexOf('.') > 0 ? n.length - n.indexOf('.') - 1 : -1;
			if (((n = r.trim(n.replace('.', ''))), u >= 0)) {
				var a = e.indexOf('.') > 0 ? e.length - e.indexOf('.') - 1 : -1;
				if (-1 == a) e = r.trim(e + new Array(u + 1).join('0'));
				else if (u > a) (e = e.replace('.', '')), (e = r.trim(e + new Array(u - a + 1).join('0')));
				else if (u < a) {
					var s = (e = e.replace('.', '')).length - a + u;
					e = r.trim(e.substring(0, s) + '.' + e.substring(s));
				} else u == a && (e = r.trim(e.replace('.', '')));
			}
			var d = 0,
				l = n.length,
				f = '',
				g = e.indexOf('.') > -1 && e.indexOf('.') < l ? e.substring(0, l + 1) : e.substring(0, l);
			if (((e = e.indexOf('.') > -1 && e.indexOf('.') < l ? e.substring(l + 1) : e.substring(l)), g.indexOf('.') > -1)) {
				var c = g.length - g.indexOf('.') - 1;
				l > (g = g.replace('.', '')).length && ((c += l - g.length), (g += new Array(l - g.length + 1).join('0'))),
					(d = c),
					(f = '0.' + new Array(c).join('0'));
			}
			for (t += 2; d <= t; ) {
				for (var v = 0; parseInt(g) >= parseInt(n); ) (g = r.add(g, '-' + n)), v++;
				(f += v),
					e
						? ('.' == e[0] && ((f += '.'), d++, (e = e.substring(1))), (g += e.substring(0, 1)), (e = e.substring(1)))
						: (d || (f += '.'), d++, (g += '0'));
			}
			return (1 == o ? '-' : '') + r.trim(i.roundOff(f, t - 2));
		};
	},
	function (e, n, t) {
		'use strict';
		Object.defineProperty(n, '__esModule', { value: !0 }), (n.negate = n.subtract = void 0);
		var r = t(0);
		function i(e) {
			return (e = '-' == e[0] ? e.substr(1) : '-' + e);
		}
		(n.subtract = function (e, n) {
			return (e = e.toString()), (n = i((n = n.toString()))), r.add(e, n);
		}),
			(n.negate = i);
	},
	function (e, n, t) {
		'use strict';
		var r = t(0),
			i = t(1),
			o = t(3),
			u = t(4),
			a = t(7),
			s = t(8),
			d = t(5),
			l = t(2),
			f = (function () {
				function e(n) {
					void 0 === n && (n = '0'), (this.value = e.validate(n));
				}
				return (
					(e.validate = function (e) {
						if (e) {
							if (((e = e.toString()), isNaN(e))) throw Error('Parameter is not a number: ' + e);
							'+' == e[0] && (e = e.substring(1));
						} else e = '0';
						if (/e/i.test(e)) {
							var n = e.split(/[eE]/),
								t = n[0],
								i = n[1];
							(t = r.trim(t)),
								(i = parseInt(i) + t.indexOf('.')),
								(e =
									(t = t.replace('.', '')).length < i
										? t + new Array(i - t.length + 1).join('0')
										: t.length >= i && i > 0
										? r.trim(t.substring(0, i)) + (t.length > i ? '.' + t.substring(i) : '')
										: '0.' + new Array(1 - i).join('0') + t);
						}
						return e;
					}),
					(e.prototype.getValue = function () {
						return this.value;
					}),
					(e.getPrettyValue = function (n, t, r) {
						if (t || r) {
							if (!t || !r) throw Error('Illegal Arguments. Should pass both digits and separator or pass none');
						} else (t = 3), (r = ',');
						var i = '-' == (n = e.validate(n)).charAt(0);
						i && (n = n.substring(1));
						for (var o = n.indexOf('.'), u = '', a = (o = o > 0 ? o : n.length); a > 0; )
							a < t ? ((t = a), (a = 0)) : (a -= t), (u = n.substring(a, a + t) + (a < o - t && a >= 0 ? r : '') + u);
						return (i ? '-' : '') + u + n.substring(o);
					}),
					(e.prototype.getPrettyValue = function (n, t) {
						return e.getPrettyValue(this.value, n, t);
					}),
					(e.round = function (n, t, r) {
						if ((void 0 === t && (t = 0), void 0 === r && (r = l.RoundingModes.HALF_EVEN), (n = e.validate(n)), isNaN(t)))
							throw Error('Precision is not a number: ' + t);
						return i.roundOff(n, t, r);
					}),
					(e.prototype.round = function (n, t) {
						if ((void 0 === n && (n = 0), void 0 === t && (t = l.RoundingModes.HALF_EVEN), isNaN(n)))
							throw Error('Precision is not a number: ' + n);
						return new e(i.roundOff(this.value, n, t));
					}),
					(e.floor = function (n) {
						return -1 === (n = e.validate(n)).indexOf('.') ? n : e.round(n, 0, l.RoundingModes.FLOOR);
					}),
					(e.prototype.floor = function () {
						return -1 === this.value.indexOf('.') ? new e(this.value) : new e(this.value).round(0, l.RoundingModes.FLOOR);
					}),
					(e.ceil = function (n) {
						return -1 === (n = e.validate(n)).indexOf('.') ? n : e.round(n, 0, l.RoundingModes.CEILING);
					}),
					(e.prototype.ceil = function () {
						return -1 === this.value.indexOf('.') ? new e(this.value) : new e(this.value).round(0, l.RoundingModes.CEILING);
					}),
					(e.add = function (n, t) {
						return (n = e.validate(n)), (t = e.validate(t)), r.add(n, t);
					}),
					(e.prototype.add = function (n) {
						return new e(r.add(this.value, n.getValue()));
					}),
					(e.subtract = function (n, t) {
						return (n = e.validate(n)), (t = e.validate(t)), d.subtract(n, t);
					}),
					(e.prototype.subtract = function (n) {
						return new e(d.subtract(this.value, n.getValue()));
					}),
					(e.multiply = function (n, t) {
						return (n = e.validate(n)), (t = e.validate(t)), o.multiply(n, t);
					}),
					(e.prototype.multiply = function (n) {
						return new e(o.multiply(this.value, n.getValue()));
					}),
					(e.divide = function (n, t, r) {
						return (n = e.validate(n)), (t = e.validate(t)), u.divide(n, t, r);
					}),
					(e.prototype.divide = function (n, t) {
						return new e(u.divide(this.value, n.getValue(), t));
					}),
					(e.modulus = function (n, t) {
						return (n = e.validate(n)), (t = e.validate(t)), a.modulus(n, t);
					}),
					(e.prototype.modulus = function (n) {
						return new e(a.modulus(this.value, n.getValue()));
					}),
					(e.compareTo = function (n, t) {
						return (n = e.validate(n)), (t = e.validate(t)), s.compareTo(n, t);
					}),
					(e.prototype.compareTo = function (e) {
						return s.compareTo(this.value, e.getValue());
					}),
					(e.negate = function (n) {
						return (n = e.validate(n)), d.negate(n);
					}),
					(e.prototype.negate = function () {
						return new e(d.negate(this.value));
					}),
					(e.RoundingModes = l.RoundingModes),
					e
				);
			})();
		e.exports = f;
	},
	function (e, n, t) {
		'use strict';
		Object.defineProperty(n, '__esModule', { value: !0 }), (n.modulus = void 0);
		var r = t(4),
			i = t(1),
			o = t(3),
			u = t(5),
			a = t(2);
		function s(e) {
			if (-1 != e.indexOf('.')) throw new Error('Modulus of non-integers not supported');
		}
		n.modulus = function (e, n) {
			if (0 == n) throw new Error('Cannot divide by 0');
			(e = e.toString()), (n = n.toString()), s(e), s(n);
			var t = '';
			return (
				'-' == e[0] && ((t = '-'), (e = e.substr(1))),
				'-' == n[0] && (n = n.substr(1)),
				t + u.subtract(e, o.multiply(n, i.roundOff(r.divide(e, n), 0, a.RoundingModes.FLOOR)))
			);
		};
	},
	function (e, n, t) {
		'use strict';
		Object.defineProperty(n, '__esModule', { value: !0 }), (n.compareTo = void 0);
		var r = t(0);
		n.compareTo = function (e, n) {
			var t,
				i = !1;
			if ('-' == e[0] && '-' != n[0]) return -1;
			if ('-' != e[0] && '-' == n[0]) return 1;
			if (
				('-' == e[0] && '-' == n[0] && ((e = e.substr(1)), (n = n.substr(1)), (i = !0)),
				(e = (t = r.pad(e, n))[0]),
				(n = t[1]),
				0 == e.localeCompare(n))
			)
				return 0;
			for (var o = 0; o < e.length; o++) if (e[o] != n[o]) return e[o] > n[o] ? (i ? -1 : 1) : i ? 1 : -1;
			return 0;
		};
	},
]);
