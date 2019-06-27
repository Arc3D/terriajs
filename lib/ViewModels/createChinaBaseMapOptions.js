"use strict";

/*global require*/
var ArcGisMapServerCatalogItem = require("../Models/ArcGisMapServerCatalogItem");
var UrlTemplateCatalogItem = require("../../lib/Models/UrlTemplateCatalogItem");
//var WebMapTileServiceCatalogItem = require("../../lib/Models/WebMapTileServiceCatalogItem");
var BaseMapViewModel = require("./BaseMapViewModel");

var createChinaBaseMapOptions = function(terria) {
  var result = [];

  // 中国地图彩色版（含POI）
  var chinaCommunity = new ArcGisMapServerCatalogItem(terria);
  chinaCommunity.url =
    "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer";
  chinaCommunity.opacity = 1.0;
  chinaCommunity.isRequiredForRendering = true;
  chinaCommunity.name = "中国地图彩色版（含POI）";
  chinaCommunity.allowFeaturePicking = false;

  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/china-community.jpg"),
      catalogItem: chinaCommunity,
      contrastColor: "#000000"
    })
  );

  // 中国地图彩色版
  var chinaStreetWarm = new ArcGisMapServerCatalogItem(terria);
  chinaStreetWarm.url =
    "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer";
  chinaStreetWarm.opacity = 1.0;
  chinaStreetWarm.isRequiredForRendering = true;
  chinaStreetWarm.name = "中国地图彩色版";
  chinaStreetWarm.allowFeaturePicking = false;

  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/china-street-warm.png"),
      catalogItem: chinaStreetWarm,
      contrastColor: "#000000"
    })
  );

  // 中国地图灰色版
  var chinaStreetGray = new ArcGisMapServerCatalogItem(terria);
  chinaStreetGray.url =
    "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer";
  chinaStreetGray.opacity = 1.0;
  chinaStreetGray.isRequiredForRendering = true;
  chinaStreetGray.name = "中国地图灰色版";
  chinaStreetGray.allowFeaturePicking = false;

  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/china-street-gray.jpg"),
      catalogItem: chinaStreetGray,
      contrastColor: "#000000"
    })
  );

  // 中国地图午夜蓝版
  var chinaStreetPurplishBlue = new ArcGisMapServerCatalogItem(terria);
  chinaStreetPurplishBlue.url =
    "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer";
  chinaStreetPurplishBlue.opacity = 1.0;
  chinaStreetPurplishBlue.isRequiredForRendering = true;
  chinaStreetPurplishBlue.name = "中国地图午夜蓝版";
  chinaStreetPurplishBlue.allowFeaturePicking = false;

  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/china-street-purplish-blue.png"),
      catalogItem: chinaStreetPurplishBlue,
      contrastColor: "#000000"
    })
  );

  /*
  // 天地图矢量地图
  var tdtVectorMap = new WebMapTileServiceCatalogItem(terria);
  tdtVectorMap.url = "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles";
  tdtVectorMap.layer = "tdtVecBasicLayer";
  tdtVectorMap.style = "default";
  tdtVectorMap.format = "image/jpeg";
  tdtVectorMap.tileMatrixSetID = "GoogleMapsCompatible";
  tdtVectorMap.subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
  tdtVectorMap.opacity = 1.0;
  tdtVectorMap.isRequiredForRendering = true;
  tdtVectorMap.name = "天地图矢量地图";
  tdtVectorMap.allowFeaturePicking = false;
  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/china-tianditu.jpg"),
      catalogItem: tdtVectorMap,
      contrastColor: "#000000"
    })
  );
  */

  // 高德地图
  var gaodeNormalMap = new UrlTemplateCatalogItem(terria);
  gaodeNormalMap.url =
    "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
  gaodeNormalMap.subdomains = ["1", "2", "3", "4"];
  gaodeNormalMap.opacity = 1.0;
  gaodeNormalMap.isRequiredForRendering = true;
  gaodeNormalMap.name = "高德地图";
  gaodeNormalMap.allowFeaturePicking = false;

  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/china-gaode-normal.png"),
      catalogItem: gaodeNormalMap,
      contrastColor: "#000000"
    })
  );

  return result;
};

module.exports = createChinaBaseMapOptions;
