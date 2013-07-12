;(function($) {
	var Knewton = {

		urls: [],
		_study_plan_visible: false,
		_previous_active_tab: false,

		init: function() {
			this._setup_interface();
		},

		_setup_interface: function() {
			//hide the top and bottom nav arrows
			$('.sequence-nav').hide();
			$('.sequence-bottom').hide();

			//mutate the left nav to remove the links but keep the text
			//also preserve all the url links in the url_map var
			$('#accordion .chapter ul a').each((function(i, el) {
				el = $(el);
				this.urls.push(el.attr('href'));
				var p = $('p', el);
				el.after(p);
				el.remove();
			}).bind(this));

			//insert the study plan link
			$('.course-tabs').append('<li><a id="knewton-study-plan-toggle" href="javascript:void(0);">Study Plan</a></li>');
			// $('#knewton-study-plan').live('click', (function() {
			// 	this._show_study_plan();
			// }).bind(this));

			$('.course-tabs a').live('click', (function(e) {
				var target = $(e.target);
				if (target.attr('id') == 'knewton-study-plan-toggle') {
					this._show_study_plan();
				}
			}).bind(this));
		},

		_show_study_plan: function() {
			if (!this._study_plan_visible) {
				this._study_plan_visible = true;
				this._previous_active_tab = $('.course-tabs a.active');
				this._previous_active_tab.removeClass('active');
				$('#knewton-study-plan-toggle').addClass('active');
				$('section.container div:first-child').hide();
				$('section.container').append('<div style="padding:40px;" id="knewton-study-plan"><h2>Study Plan</h2><p>Study plan content goes here</p></div>');
			} else {
				this._hide_study_plan();
			}
		},

		_hide_study_plan: function() {
			if (this._study_plan_visible) {
				$('#knewton-study-plan-toggle').removeClass('active');
				this._previous_active_tab.addClass('active');
				$('#knewton-study-plan').remove();
				$('section.container div:first-child').show();
				this._study_plan_visible = false;
			}
		}
	};

	$(function() {
		Knewton.init();
	});
})(jQuery);