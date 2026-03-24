import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import type { StationCoords } from "../types/common";

const style = document.createElement("style");
style.textContent = `
	.ol-attribution { font-size: 0px !important; }
	.ol-attribution button { display: none !important; }
	.ol-attribution ul { display: none !important; }
	.ol-zoom { top: auto !important; bottom: 20px !important; left: auto !important; right: 20px !important; }
	.ol-zoom-in, .ol-zoom-out { 
		width: 40px !important; 
		height: 40px !important; 
		border-radius: 8px !important;
		background-color: #ffffff !important;
		border: 2px solid #e5e7eb !important;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
		color: #393E46 !important;
		font-size: 20px !important;
		font-weight: bold !important;
	}
	.ol-zoom-in:hover, .ol-zoom-out:hover {
		background-color: #FFCC00 !important;
		border-color: #FFCC00 !important;
		color: #ffffff !important;
	}
	.ol-zoom-in { margin-bottom: 8px !important; }
`;
document.head.appendChild(style);

export const createTripMap = (target: string, stations: StationCoords): Map => {
	const { departure, arrival } = stations;

	const departureFeature = new Feature({
		geometry: new Point(fromLonLat([departure.longitude, departure.latitude])),
	});

	departureFeature.setStyle(
		new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({ color: "#FFCC00" }),
				stroke: new Stroke({ color: "#FFFFFF", width: 2 }),
			}),
		})
	);

	const arrivalFeature = new Feature({
		geometry: new Point(fromLonLat([arrival.longitude, arrival.latitude])),
	});

	arrivalFeature.setStyle(
		new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({ color: "#22C55E" }),
				stroke: new Stroke({ color: "#FFFFFF", width: 2 }),
			}),
		})
	);

	const map = new Map({
		target,
		layers: [
			new TileLayer({
				source: new OSM(),
			}),
		],
		view: new View({
			center: fromLonLat([
				(departure.longitude + arrival.longitude) / 2,
				(departure.latitude + arrival.latitude) / 2,
			]),
			zoom: 6,
		}),
	});

	const departureExtent = departureFeature.getGeometry()?.getExtent();
	const arrivalExtent = arrivalFeature.getGeometry()?.getExtent();

	if (departureExtent && arrivalExtent) {
		map.getView().fit([...departureExtent, ...arrivalExtent], {
			padding: [50, 50, 50, 50],
		});
	}

	return map;
};
