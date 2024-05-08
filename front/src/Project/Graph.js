
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Graph() {

	const passenger = useSelector((state) => state.passengerReducer);
	// const passenger = passengerArr[0];


	const preferredArr = [ "לדבר עם השכנים שלי" ,"לסרוג", "לקרוא", "לישון", "לעבוד", "לצפות בסרטים"];
	const countArr = [0, 0, 0, 0, 0, 0];

	(passenger.flightsRegistration).map(p => {
		for (let index = 0; index < preferredArr.length; index++) {
			
			if (preferredArr[index] === p.preferred) {
				countArr[index]++;
			}
		}
	})
	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2",
		axisY: {
			includeZero: true
		},
		data: [{
			type: "pie", 
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "outside",
			dataPoints: [
				{ x: 70, y: countArr[0], indexLabel: preferredArr[0] },
				{ x: 80, y: countArr[1], indexLabel: preferredArr[1] },
				{ x: 90, y: countArr[2] , indexLabel: preferredArr[2]},
				{ x: 100, y: countArr[3] , indexLabel: preferredArr[3]},
				{ x: 110, y: countArr[4] , indexLabel: preferredArr[4]},
				{ x: 120, y: countArr[5] , indexLabel: preferredArr[5]},
				
			]
		}]
	}

	return (
		<div>
			<CanvasJSChart options={options}
				containerProps={{ width: '100%', height: '300px' }}
			/>
		</div>
	);
}
