var viewer = new View360("#el", {
  projection: new View360.EquirectProjection({
    src: "../../demo/static/pano/equirect/equi.jpg"
  })
});

viewer.on("ready", function() {
  console.log("ready");
})

viewer.on("viewChange", function(evt) {
  console.log(evt);
})
