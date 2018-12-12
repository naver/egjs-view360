/* eslint-disable */

var Tab = {
	$tabs: $(".tab"),
	currentTab: "",
	close: function(tab) {
		var $tab = $(".tab[data-tab=\"" + tab + "\"]");
	
		$tab.removeClass("show appear");
	},
	open: function open(tab) {
		if (Tab.currentTab === tab) {
			return;
		}
		var $tab = $(".tab[data-tab=\"" + tab + "\"]");
		var currentTab = Tab.currentTab;
	
		Tab.currentTab = tab;
		Tab.$tabs.css("display", "none");
		currentTab && Tab.close(currentTab);

		$tab.addClass("show");

		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				$tab.addClass("appear");
			});
		});
	}
};