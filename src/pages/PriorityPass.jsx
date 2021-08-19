import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Airport from '../components/AirportNext';
import AirportDropoff from '../components/AirportDropoff';
import Passenger from '../components/Passenger';
import PickCar from '../components/PickCar';
import PriorityPassNext from '../components/PriorityPassNext';
import Contact from '../components/Contact';
import PaymentMethod from '../components/PaymentMethod';
import Included from '../components/Included';
import Summary from '../components/Summary';

import { Grid } from '@material-ui/core';
import Head from 'next/head';

//   variables
let bookingObj = {};

let fields = {
	flightNumber: '',
	date: '',
	time: '',
	mobile: '',
};

const passengerFields = {
	title: '',
	firstName: '',
	lastName: '',
	email: '',
	countryCode: '',
	mobile: '',
};

// COMPONENT
const PriorityPass = () => {
	const [country, setcountry] = useState('default');
	const [classes, setClasses] = useState([]);
	useEffect(() => {
		try {
			fetch('https:/shuttlelaneee.herokuapp.com/api/priority')
				.then((res) => res.json())
				.then((response) => {
					console.log('CANIB CLASS FROM', response);
					setClasses(response.data);
				})
				.catch((err) => {
					console.log('Request failed', err);
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetch('http://ip-api.com/json', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((response) => {
				setcountry(response.country);
			})
			.catch((err) => {
				console.log('Request failed', err);
			});
	}, []);
	const router = useRouter();
	try {
		router.asPath
			.split('?')[1]
			.split('&')
			.forEach((item) => {
				let entry = item.split('=');
				fields[entry[0]] = entry[1].split('+').join(' ');
			});
		console.log('fields', fields);
	} catch (error) {
		console.log('split err', error);
	}
	const [data, setData] = useState(fields);

	// const [selectedCar, setSelectedCar] = useState(fields.selectedCar || "");
	const [total, setTotal] = useState('');
	const [passengerDetails, setPassengerDetails] = useState(passengerFields);

	// const carHandler = (e) => {
	//   setSelectedCar(() => {
	//     return e.target.value;
	//   });
	// };

	const passengerHandler = (name, value) => {
		setPassengerDetails((e) => {
			return { ...passengerDetails, [name]: value };
		});
	};

	bookingObj = {
		...data,
		...passengerDetails,
		amount:
			parseInt(data.passengers) *
			classes.filter((cabin) => cabin.name == data.cabinClass)[0]?.rate,
	};
	console.log('CABIN', bookingObj.cabinClass);
	console.log('passengerDetails', passengerDetails);
	console.log('Airport Details', data);

	console.log(classes);
	let cabinRate = classes?.filter(
		(cabin) => cabin.name == bookingObj.cabinClass
	)[0]?.rate;
	console.log(cabinRate);

	return (
		<section style={{ width: '80vw', margin: 'auto' }}>
			<Head>
				<title>{bookingObj?.formType} service | shuttlelane.com</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Grid container spacing={2} justifyContent='center'>
				<Grid item sm={8}>
					<PriorityPassNext data={data} setData={setData} />
					{/* <PickCar handler={carHandler} car={selectedCar} /> */}
					<Passenger
						values={passengerDetails}
						handler={passengerHandler}
					/>

					<PaymentMethod bookingData={bookingObj} />
				</Grid>
				<Grid item sm={12} md={3} style={{ marginTop: '5rem' }}>
					<Summary
						title='Airport Transfer'
						total={bookingObj.amount}
						handler={setTotal}
						subTotal={bookingObj.amount * 3}
						country={country}
					/>
					<Included />
				</Grid>
				<Grid item={12}>
					<Contact />
				</Grid>
			</Grid>
		</section>
	);
};
export default PriorityPass;
