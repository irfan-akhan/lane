import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Airport from '../components/AirportNext';
import AirportDropoff from '../components/AirportDropoff';
import Passenger from '../components/Passenger';
import PickCar from '../components/PickCar';
import Contact from '../components/Contact';
import PaymentMethod from '../components/PaymentMethod';
import Included from '../components/Included';
import Summary from '../components/Summary';
import CarHire from '../components/CarHireNext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message) => toast(message);

import { Grid } from '@material-ui/core';
import Head from 'next/head';

//   variables
let bookingData = {};

let fields = {};

const passengerFields = {
	title: '',
	firstName: '',
	lastName: '',
	email: '',
	countryCode: '',
	mobile: '',
};

// HELPER FUNCTIONS

// create Booking
function createBooking(data) {
	console.log('SUBMOISSSSSSs', data);

	fetch('https://shuttlelaneee.herokuapp.com/api/booking/car', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...data,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log('result fro server', data);
			toast.success(data.message, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
			return data;
		})
		.catch((err) => {
			console.log('err in catch', err);
			toast.error(err, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
		});
	return 'created';
}

// validate

function validataDate(data) {
	console.log('validate data', data);
	return (
		Object.values(data).includes('') || Object.values(data).includes(' ')
	);
}

// COMPONENT
const CarBooking = () => {
	const [country, setcountry] = useState('default');
	const [vehicles, setVehicles] = useState([]);
	const router = useRouter();
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
		fetch('https:/shuttlelaneee.herokuapp.com/api/cars')
			.then((res) => res.json())
			.then((result) => {
				setVehicles(result.data);
				console.log(result);
			})
			.catch((error) => console.log('error in fetch', error));
	}, []);
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

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log('TRYIN GTO CREAT CAR BOOKING', bookingData);
		const verified = validataDate(bookingData);
		if (!verified) {
			const response = createBooking(bookingData);
			console.log('VACK', response);
			toast.info('Thank you for choosing shuttlelane, Please wait', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
		} else {
			console.log('validation Error');
		}
	};

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
		console.log(name, value);
		setPassengerDetails((e) => {
			return { ...passengerDetails, [name]: value };
		});
	};

	bookingData = {
		carType: selectedCar,
		...passengerDetails,
		...data,
	};
	(bookingData['amount'] =
		vehicles.filter((car) => car.name == bookingData.carType)[0]?.rate *
		parseInt(data.days)),
		console.log(vehicles);
	let carRate = vehicles.filter((car) => car.name == bookingData.carType)[0]
		?.rate;

	console.log(carRate);
	console.log('passengerDetails', passengerDetails);
	console.log('Airport Details', data);
	console.log(country);

	return (
		<section style={{ width: '80vw', margin: 'auto' }}>
			<Head>
				<title>{bookingData?.formType} service | shuttlelane.com</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Grid container spacing={2} justifyContent='center'>
				<Grid item sm={8}>
					<div style={{ marginTop: '8rem' }}>
						<Passenger
							values={passengerDetails}
							handler={passengerHandler}
						/>
					</div>
					<CarHire data={data} setData={setData} />
					{/*  <Summary
            title="Airport Transfer"
            total={carRates[selectedCar]}
            handler={setTotal}
            subTotal={carRates[selectedCar] * 5}
            country={country}
          />*/}
					<button
						onClick={onSubmitHandler}
						type='text'
						style={{ marginTop: '2rem' }}
						className='btnGrad'
					>
						Hire
					</button>
					<ToastContainer />
				</Grid>
				<Grid item sm={12} md={3} style={{ marginTop: '8rem' }}>
					<Summary
						title='Airport Transfer'
						total={carRate * parseInt(data.days) || 0}
						// handler={setTotal}
						subTotal={carRate * 2 || 0}
						country={country}
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
export default CarBooking;
