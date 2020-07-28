import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useState } from "react";

const data = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "Percent Sales",
			backgroundColor: "#34222e",
			borderColor: "#34222e",
			borderWidth: 1,
			hoverBackgroundColor: "#e2434b",
			hoverBorderColor: "#e2434b",
			data: [65, 59, 80, 81, 56, 55, 40],
		},
		// {
		// 	label: "Target",
		// 	backgroundColor: "rgba(100,99,132,0.2)",
		// 	borderColor: "rgba(100,150,20,1)",
		// 	borderWidth: 1,
		// 	hoverBackgroundColor: "rgba(100,20,152,0.4)",
		// 	hoverBorderColor: "rgba(100,20,152,1)",
		// 	data: [90, 75, 120, 92, 60, 77, 53],
		// },
	],
};

function BarChart(props) {
	const [newData, setNewData] = useState(data);
	const fetchedData = useContext(UserContext);
	useEffect(() => {
		const defaultData = { ...newData };
		defaultData.labels = [];
		defaultData.datasets[0].data = [];
		//console.log(fetchedData.lastIms);
		if (fetchedData.lastIms) {
			fetchedData.lastIms.ims.map((product) => {
				if (product.product !== null) {
					defaultData.labels.push(product.product.productCode);
					defaultData.datasets[0].data.push(
						product.percent.toFixed(2)
					);
				}
			});
		}
		setNewData(defaultData);
	}, [fetchedData.lastIms]);
	return (
		<div>
			<h3>Sales vs Target</h3>
			<Bar
				data={newData}
				height={200}
				options={{
					maintainAspectRatio: true,
				}}
			/>
		</div>
	);
}

export default BarChart;
