import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Airport from '../components/AirportNext';
import AirportDropoff from '../components/AirportDropoff';
import Passenger from '../components/Passenger';
import PickCar from '../components/PickCar';
import Contact from '../components/Contact';
import PaymentMethod from '../components/PaymentMethod';
import Included from '../components/Included';
import Summary from '../components/Summary';

import { Grid } from '@material-ui/core';

//   variables
let bookingObj = {};

let fields = {
	time: '',
};
// let dropoffFields = {
//   pickupAddress: "",
//   pickupDate: "",
//   passengers: "",
//   dropoffAirport: "",
// };

const passengerFields = {
	title: '',
	firstName: '',
	lastName: '',
	email: '',
	countryCode: '',
	mobile: '',
};
// COMPONENT
const Booking = () => {
	const [country, setCountry] = useState('default');
	const [carRates, setCarRates] = useState([]);
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
				console.log(response);
				setcountry(response.country);
			})
			.catch((err) => {
				console.log('Request failed', err);
			});
		fetch('https://shuttlelaneee.herokuapp.com/api/vehicles', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				setCarRates(response.data);
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
		if (fields.formType == 'Airport-Pickup') {
			console.log('ADD FLIGHTNUBER FIELD');
			fields['flightNumber'] = '';
		}
	} catch (error) {
		console.log('split err', error);
	}
	const [data, setData] = useState(fields);

	const [selectedCar, setSelectedCar] = useState(fields.selectedCar || '');
	const [total, setTotal] = useState('');
	const [passengerDetails, setPassengerDetails] = useState(passengerFields);

	const carHandler = (e) => {
		setSelectedCar(() => {
			return e.target.value;
		});
	};

	const passengerHandler = (name, value) => {
		setPassengerDetails((e) => {
			return { ...passengerDetails, [name]: value };
		});
	};

	bookingObj = {
		carType: selectedCar,
		...passengerDetails,
		...data,
		amount:
			parseInt(
				carRates.filter((car) => car.name == selectedCar)[0]?.rate
			) * parseInt(data.passengers),
	};

	console.log(bookingObj);
	console.log('passengerDetails', passengerDetails);
	console.log('Airport Details', data);
	console.log(country);

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
				<Grid item sm={12} md={6}>
					{data.formType === 'Airport-Dropoff' ? (
						<AirportDropoff data={data} setData={setData} />
					) : data.formType === 'Airport-Pickup' ? (
						<Airport data={data} setData={setData} />
					) : (
						<div> Loading</div>
					)}
					<PickCar
						handler={carHandler}
						car={selectedCar}
						country={country}
					/>
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
						subTotal={bookingObj.amount * 5}
						country={country}
						setCountry={setCountry}
					/>
					<Included />
				</Grid>
				<Grid item sm={12}>
					<Contact />
				</Grid>
			</Grid>
		</section>
	);
};
export default Booking;
