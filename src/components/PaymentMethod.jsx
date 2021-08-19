import { Grid } from '@material-ui/core';
import { useState } from 'react';
import styles from '../styles/Summary.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

const notify = (message) => toast(message);

function createBooking(data, paymentMethod) {
	console.log('SUBMOISSSSSSs', paymentMethod);
	console.log(paymentMethod, data);

	if (data.formType == 'Priority-Pass') {
		console.log('IN PRIO');
		fetch('https://shuttlelaneee.herokuapp.com/api/booking/priority', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...data,
				paymentMethod: paymentMethod,
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
	} else {
		fetch('https://shuttlelaneee.herokuapp.com/api/booking/airport', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...data,
				paymentMethod: paymentMethod,
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
	}
}

function validataDate(data) {
	console.log('validate data', data);

	return (
		Object.values(data).includes('') || Object.values(data).includes(' ')
	);
}

const PaymentMethod = ({ bookingData }) => {
	let [selectedPayment, setSelectedPayment] = useState('');

	function paymentOptionHandler(e) {
		console.log(e.target.id);
		setSelectedPayment(e.target.id);
	}
	const onSubmitHandler = async (e) => {
		e.preventDefault();

		const verified =
			selectedPayment !== '' ? validataDate(bookingData) : true;
		if (!verified) {
			toast.info('Thank you for choosing shuttlelane, Please wait', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
			const response = await createBooking(bookingData, selectedPayment);
			console.log('VACK', response);
		} else {
			console.log('validation Error');
			toast.error('Please provide valid inputs', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
		}
	};
	return (
		<div className={styles.card}>
			<h4>Select Payment Method</h4>
			<div className={styles.paymentOption}>
				<div
					id='Flutterwave'
					onClick={paymentOptionHandler}
					style={{
						backgroundImage: `url('https://shuttlelane.com/images/flutterwaveP.png')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						backgroundPosition: 'center center',
					}}
				></div>
				<div
					id='Paypal'
					onClick={paymentOptionHandler}
					style={{
						background: `url('https://shuttlelane.com/images/paypalP.png')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						backgroundPosition: 'center center',
					}}
				></div>
				<div
					id='Stripe'
					onClick={paymentOptionHandler}
					style={{
						background: `url('https://shuttlelane.com/images/stripeP.png')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						backgroundPosition: 'center center',
					}}
				></div>
			</div>
			<button className='btnGrad' type='submit' onClick={onSubmitHandler}>
				Proceed to Payment
			</button>
			<ToastContainer />
		</div>
	);
};

export default PaymentMethod;
