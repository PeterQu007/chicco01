console.log(">>>>>>>mapview js injected!!<<<<<<<<<???????");

let countTimer = setInterval(checkComplete, 100);
let loginCount = 0;
let x1 = $("input#inputListingInfo", top.document);
let zoomNumber;
if (x1.val() == "Attached") {
  zoomNumber = 18;
} else {
  zoomNumber = 20;
}
function showLargeMap() {
  console.log("show large map clicked");
  var x = $(window.frameElement);
  var z = $("#divMap");
  var v = $("#jqMpCntlTopMenu");
  var w = $("div.jqMpCntlSubMenuImg.jqMpCntlSubMenuMpTypeAerial");
  w.click();

  v.css("z-index", 9999);

  if (z.hasClass("mapBox__large")) {
    // z.removeClass("mapbox__large");
    x.width(500);
    x.height(810);
    x.css("z-index", 5000);

    console.log(z);
    z.removeClass("mapBox__large");
    z.width(498);
    z.css("z-index", 5000);
    z.height(800);
  } else {
    // console.log(x);
    x.width(1000);
    x.height(820);
    x.css("z-index", 5000);

    console.log(z);
    z.addClass("mapBox__large");
    z.width(990);
    z.css("z-index", 5000);
    z.height(810);
  }
}

function checkComplete() {
  console.log("Check bkfsMap:");
  console.log($.bkfsMap);

  loginCount++;
  if (
    $("#jqMpCntlTopMenuList").children("li.jqMpCntlTopMenListItm").length ==
      11 ||
    $("#jqMpCntlTopMenuList").children("li.jqMpCntlTopMenListItm").length == 9
  ) {
    if ($("li.zoomInChange").length == 0) {
      //check the new item exists or not
      console.log($("#jqMpCntlTopMenuList"));
      var menu = $("#jqMpCntlTopMenuList");
      var newItem = $(`<li class="jqMpCntlTopMenListItm"><div class="jqMpCntlTopMenuDivider"></div></li>
                    <li class="jqMpCntlTopMenListItm zoomInChange", id="jqMpCntlTopMenuActionLayers">
                    <div class="jqMpCntlTopMenuBtn zoomInChange" onclick="$.bkfsMap.divMap.setZoom(${zoomNumber})" 
                    data-tooltip="Change Map Zoom"><span><strong>+</strong></span></div>
                    </li>`);
      newItem.appendTo(menu);
    } else if ($("li.zoomOutChange").length == 0) {
      console.log($("#jqMpCntlTopMenuList"));
      var menu = $("#jqMpCntlTopMenuList");
      var newItem = $(`<li class="jqMpCntlTopMenListItm"><div class="jqMpCntlTopMenuDivider"></div></li>
                    <li class="jqMpCntlTopMenListItm zoomOutChange", id="jqMpCntlTopMenuActionLegends">
                    <div class="jqMpCntlTopMenuBtn zoomOutChange" onclick="$.bkfsMap.divMap.setZoom(15)" 
                    data-tooltip="Change Map Zoom"><span><strong>-</strong></span></div>
                    </li>`);
      newItem.appendTo(menu);
      var newMapTypeItem = $(`<li class="jqMpCntlTopMenListItm"><div class="jqMpCntlTopMenuDivider"></div></li>
                    <li class="jqMpCntlTopMenListItm">
                    <div class="jqMpCntlTopMenuBtn jqMpCntlSubMenuImg jqMpCntlSubMenuMpTypeRoad roadMapType" onclick="$.bkfsMap.divMap.setMapTypeId('roadmap')" 
                    data-tooltip="Change Map Zoom"></div>
                    </li>`);
      newMapTypeItem.appendTo(menu);
      var newMapType2Item = $(`<li class="jqMpCntlTopMenListItm"><div class="jqMpCntlTopMenuDivider"></div></li>
                    <li class="jqMpCntlTopMenListItm">
                    <div class="jqMpCntlTopMenuBtn jqMpCntlSubMenuImg jqMpCntlSubMenuMpTypeAerial aerialMapType" onclick="$.bkfsMap.divMap.setMapTypeId('satellite')" 
                    data-tooltip="Change Map Zoom"></div>
                    </li>`);
      newMapType2Item.appendTo(menu);
      var newButtonItem = $(`<li class="jqMpCntlTopMenListItm"><div class="jqMpCntlTopMenuDivider"></div></li>
                    <li class="jqMpCntlTopMenListItm">
                    <button id="changeSizeButton" class="changeSizeButton"  
                    data-tooltip="Change Map Size">Size</button>
                    </li>`);
      newButtonItem.appendTo(menu);

      var y = $("div.jqMpCntlTopMenuBtn.zoomInChange");
      y.click();
      var z = $("#divMap");
      z.addClass("mapBox__large");
      var x = $("div.jqMpCntlSubMenuImg.jqMpCntlSubMenuMpTypeAerial");
      x.click();
      // var z = $("div.jqMpCntlTopMenuBtn.zoomOutChange");
      // //  onclick="$.bkfsMap.divMap.setZoom(15).setMapTypeId('roadmap'
      // z.bind("click", function() {
      //   $.bkfsMap.divMap.setZoom(15);
      //   $.bkfsMap.divMap.setMapTypeId("roadmap");
      // });
    }
  }
  if (loginCount > 25) {
    clearInterval(countTimer);
    var x = $("#changeSizeButton");
    x.click(function() {
      console.log("test");
      showLargeMap();
    });
    console.log("Map Failed");
  } else if ($("div.jqMpCntlSubMenuImg.jqMpCntlSubMenuMpTypeAerial").length) {
    // clearInterval(countTimer);
  }
}
