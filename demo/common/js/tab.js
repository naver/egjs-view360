/* eslint-disable */

var Tab = {
	$tabs: $(".tabs"),
	currentTab: "",
	close: function(tab) {
		var scrollView = $(".tab-" + tab);
	
		scrollView.removeClass("appear");
	},
	open: function open(tab) {
		if (Tab.currentTab === name) {
			return;
		}
		var scrollView = $(".tab-" + tab);
		var currentTab = Tab.currentTab;
	
		scrollView.addClass("appear");
		Tab.currentTab = tab;
		Tab.$tabs.css("display", "none");
		currentTab && Tab.close(currentTab);
	}
};