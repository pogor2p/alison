'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var bodyOverflow = exports.bodyOverflow = function (body) {
	var scrollTop = void 0;
	return {
		fixBody: function fixBody() {
			scrollTop = body.scrollTop;
			body.classList.add('fixed');
			body.style.top = -scrollTop;
		},
		unfixBody: function unfixBody() {
			body.classList.remove('fixed');
			body.scrollTop = scrollTop;
		}
	};
}(document.body);