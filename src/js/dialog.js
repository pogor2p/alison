'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dialog = undefined;

var _bodyOverflow = require('./bodyOverflow');

// modals
var dialog = exports.dialog = function () {
	var triggers = document.querySelectorAll('[data-modal]');

	var clickTrigger = function clickTrigger(event) {
		try {
			event.preventDefault();
			var modalSelector = this.dataset.modal;
			// const target = event.target;
			// target.classList.add('opened');
			if (!modalSelector) {
				console.warn('modal selector is ' + modalSelector);
				return;
			}
			openDialog(modalSelector);
		} catch (error) {
			console.error(error);
		}
	},
	    closeTrigger = function closeTrigger(event) {
		var target = event.target;
		if (this === target || target.classList.contains('app-dialog-close')) {
			closeDialog();
		}
	},
	    openDialog = function openDialog(modalSelector) {
		var modal = document.querySelector(modalSelector);
		if (!modal) {
			console.warn('modal not found ' + modalSelector);
			return;
		}
		modal.classList.add('opening');
		setTimeout(function () {
			modal.classList.add('opened');
		}, 1);
		setTimeout(function () {
			_bodyOverflow.bodyOverflow.fixBody();
			modal.classList.remove('opening');
		}, 300);
		if (!modal.dataset.enabled) {
			modal.addEventListener('click', closeTrigger);
			modal.dataset.enabled = 1;
		}
	},
	    closeDialog = function closeDialog() {
		var target = document.querySelector('.app-dialog.opened');
		var trigger = document.querySelectorAll('[data-modal]');
		trigger.forEach(function (element) {
			element.classList.remove('opened');
		});
		if (!target) {
			return;
		}
		target.classList.add('clothing');
		setTimeout(function () {
			target.classList.remove('clothing');
			target.classList.remove('opened');
			_bodyOverflow.bodyOverflow.unfixBody();
		}, 300);
	};

	for (var i = 0; i < triggers.length; i++) {
		triggers[i].addEventListener('click', clickTrigger);
	}

	window.addEventListener('keyup', function (event) {
		if (event.keyCode === 27) {
			closeDialog();
		};
	});

	return {
		closeDialog: closeDialog
	};
}();