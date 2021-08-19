import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import PeopleIcon from '@material-ui/icons/People';
import LocalMallIcon from '@material-ui/icons/LocalMall';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function App() {
	const [vehicles, setVehicles] = useState([]);
	useEffect(() => {
		try {
			fetch('https://shuttlelaneee.herokuapp.com/api/vehicles')
				.then((res) => res.json())
				.then((result) => {
					setVehicles(result.data);
					console.log('fetch', vehicles);
				})
				.catch((error) => console.log('error in fetch', error));
		} catch (error) {
			console.log(error);
		}
	}, []);
	return (
		<>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				navigation={true}
				className='mySwiper'
			>
				<SwiperSlide>
					<div className='direct' style={{ background: '#fff' }}>
						<img
							src={`${prefix}/assets/images/eco.png`}
							alt='Car'
						/>
						<h4>ECONOMY</h4>
						<p>
							{vehicles?.map((vehicle) => {
								return vehicle.name.includes('Economy')
									? `${vehicle.cars},`
									: null;
							})}
						</p>
						<p>
							The most economic and popular class suitable for
							most trips. Promises a smooth and convenient ride.
							Can accommodate up to 4 passengers and 2 luggages.
						</p>
						<div
							style={{
								display: 'flex',
								fontSize: '.8rem',
								marginTop: '10px',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<PeopleIcon />
								<span> 4</span>
							</span>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<LocalMallIcon fontSize='small' />
								<span>2</span>
							</span>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='direct' style={{ background: '#fff' }}>
						<img
							src={`${prefix}/assets/images/exe.png`}
							alt='Car'
						/>
						<h4>EXECUTIVE</h4>
						<p>
							{/* {vehicles
                .filter((item) => {
                  console.log(item);
                  return item.name === "Executive";
                })
                .cars?.map((e) => {
                  console.log(e);
                  return e;
                })} */}
							(Mercedes Benz E350, BMW Grancoupe 428i, BMW 523i,
							Toyota Camry 2018, Jagua XF, Mercedez Benz E200,
							Mercedez Benz E300,) etc.
						</p>
						<p>
							A step closer to luxury. Comfort and convenience is
							guaranteed. Can accommodate up to 4 passengers and 2
							luggages.
						</p>
						<div
							style={{
								display: 'flex',
								fontSize: '.8rem',
								marginTop: '10px',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<PeopleIcon />
								<span> 4</span>
							</span>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<LocalMallIcon fontSize='small' />
								<span>2</span>
							</span>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					{' '}
					<div className='direct' style={{ background: '#fff' }}>
						<img
							src={`${prefix}/assets/images/biz.png`}
							alt='Car'
						/>
						<h4>BUSINESS</h4>
						<p>
							{vehicles?.map((vehicle) => {
								return vehicle.name.includes('Business')
									? vehicle.cars
									: null;
							})}
						</p>
						<p>
							Can accommodate up to 4 passengers and comes with
							extra space for luggages. It also promises a smooth
							and convenient ride.
						</p>
						<div
							style={{
								display: 'flex',
								fontSize: '.8rem',
								marginTop: '10px',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<PeopleIcon />
								<span> 4</span>
							</span>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<LocalMallIcon fontSize='small' />
								<span>3</span>
							</span>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					{' '}
					<div className='direct' style={{ background: '#fff' }}>
						<img
							src={`${prefix}/assets/images/lux.png`}
							alt='Car'
						/>
						<h4>LUXURY</h4>
						<p>
							{vehicles?.map((vehicle) => {
								return vehicle.name.includes('Luxury')
									? vehicle.cars
									: null;
							})}
						</p>
						<p>
							The most prestigious vehicles in our fleet. It is
							for those who love luxury and comfort. Takes you on
							your trip in elegance and style.
						</p>
						<div
							style={{
								display: 'flex',
								fontSize: '.8rem',
								marginTop: '10px',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<PeopleIcon />
								<span> 4</span>
							</span>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<LocalMallIcon fontSize='small' />
								<span>3</span>
							</span>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='direct' style={{ background: '#fff' }}>
						<img
							src={`${prefix}/assets/images/shutle.png`}
							alt='Car'
						/>
						<h4>SHUTTLE</h4>
						<p>
							{vehicles?.map((vehicle) => {
								return vehicle.name.includes('Shuttle')
									? vehicle.cars
									: null;
							})}
						</p>
						<p>
							The most spacious vehicles in our fleet. It is for
							those who love to travel in numbers and comfort. Can
							accommodate up to 10 passengers and 6 luggages. It
							also promises a smooth and convenient ride.
						</p>
						<div
							style={{
								display: 'flex',
								fontSize: '.8rem',
								marginTop: '10px',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<PeopleIcon />
								<span> 10</span>
							</span>
							<span
								style={{
									display: 'flex',
									marginLeft: '10px',
									justifyContent: 'center',
									color: '#3b3b3b',
									alignItems: 'center',
								}}
							>
								<LocalMallIcon fontSize='small' />
								<span>6</span>
							</span>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	);
}
