/*
 * Video.js plugin for Pannellum
 * Copyright (c) 2015-2017 Matthew Petroff
 * MIT License
 */

(function(document, videojs, PanoViewer) {
    'use strict';
    
    videojs.plugin('panoviewer', function(config) {
        // Create PanoViewer instance
        var player = window.player = this;
        var container = player.el();
        var vid = container.getElementsByTagName('video')[0],
            panoViewerContainer = document.createElement('div');
        config = config || {};

        let containerStyle = { 
            margin: 0,
            padding: 0,
            overflow: "hidden",
            position: "relative",
            width: "100%",
            height: "100%",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-o-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
            outline: 0,
            contain: "content",
        };
        for (var keyIdx in Object.keys(containerStyle)) {
            var key = Object.keys(containerStyle)[keyIdx];
            panoViewerContainer.style[key] = containerStyle[key];
        }
        player.panoViewer = new eg.view360.PanoViewer(panoViewerContainer, {
            video: vid,
            projectionType: "equirectangular",
            width: parseInt(window.getComputedStyle(container).width, 10),
            height: parseInt(window.getComputedStyle(container).height, 10)
        });
        player.panoViewer.resume();

        container.insertBefore(panoViewerContainer, container.firstChild);
        vid.style.display = 'none';
    });
    
    })(document, videojs, eg.view360.PanoViewer);