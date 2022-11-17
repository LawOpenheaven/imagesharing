import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/share.mp4";

import { client } from "../client";

const Login = () => {
	const navigate = useNavigate();
	const [authMode, setAuthMode] = useState("signin");
	const [account, setAccount] = useState([]);
	const [authenticated, setauthenticated] = useState(
		localStorage.getItem(localStorage.getItem("authenticated") || false)
	);
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const value = Object.fromEntries(data.entries());
		client.fetch(`*[_type == "user" && email == '${value.email}']`).then((data) => {
			setAccount(data[0])
		});
		if (account && account.password === value.password) {
			localStorage.setItem("authenticated", true);
			localStorage.setItem("user", JSON.stringify(value));
			navigate("/");
		} else if (account && account.password !== value.password) {
			alert('Wrong password')
		} else {
			alert("Please Register Your account")
			setAuthMode(authMode==="signup")
		}
	};
	const handleRegis = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const value = Object.fromEntries(data.entries());
		localStorage.setItem("user", JSON.stringify(value));
		const doc = {
			_type: 'user',
			userName: value.name,
			email: value.email,
			password:value.password,
		}
		client.create(doc).then(() => {
			navigate('/',{replace:true})
		})
	}
	const changeAuthMode = () => {
		setAuthMode(authMode === "signin" ? "signup" : "signin");
	};

	if (authMode === "signin") {
		return (
			<div className='flex justify-start items-center flex-col h-screen'>
				<div className=' relative w-full h-full'>
					<video
						src={bgImage}
						type='video/mp4'
						loop
						controls={false}
						muted
						autoPlay
						className='w-full h-full object-cover'
					/>

					<div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay'>
						<div className='Auth-form-container'>
							<form className='Auth-form' onSubmit={handleSubmit}>
								<div className='Auth-form-content'>
									<h3 className='Auth-form-title'>Sign In</h3>
									<div className='text-center'>
										Not registered yet?{" "}
										<span className='link-primary' onClick={changeAuthMode}>
											Sign Up
										</span>
									</div>
									<div className='form-group mt-3'>
										<label>Email address</label>
										<input
											type='email'
											className='form-control mt-1'
											placeholder='Enter email'
											id='email'
											name='email'
										/>
									</div>
									<div className='form-group mt-3'>
										<label>Password</label>
										<input
											type='password'
											className='form-control mt-1'
											placeholder='Enter password'
											id='password'
											name='password'
										/>
									</div>
									<div className='d-grid gap-2 mt-3'>
										<button
											style={{ backgroundColor: "#007bff" }}
											type='submit'
											className='btn btn-primary'
											onMouseEnter={(e) => {
												e.target.style.background = "#0069d9";
											}}
											onMouseOut={(e) => {
												e.target.style.background = "#007bff";
											}}>
											Log In
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='flex justify-start items-center flex-col h-screen'>
			<div className=' relative w-full h-full'>
				<video
					src={bgImage}
					type='video/mp4'
					loop
					controls={false}
					muted
					autoPlay
					className='w-full h-full object-cover'
				/>

				<div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay'>
					<div className='Auth-form-container'>
						<form className='Auth-form' onSubmit={handleRegis}>
							<div className='Auth-form-content'>
								<h3 className='Auth-form-title'>Register</h3>
								<div className='text-center'>
									Already registered?{" "}
									<span className='link-primary' onClick={changeAuthMode}>
										Sign In
									</span>
								</div>
								<div className='form-group mt-3'>
									<label>Email address</label>
									<input
										type='email'
										className='form-control mt-1'
										placeholder='Email Address'
										id='email'
										name='email'
									/>
								</div>
								<div className='form-group mt-3'>
									<label>Password</label>
									<input
										type='password'
										className='form-control mt-1'
										placeholder='Password'
										id='password'
										name='password'
									/>
								</div>
								<div className='form-group mt-3'>
									<label>Full Name</label>
									<input
										type='text'
										className='form-control mt-1'
										placeholder='e.g Jane Doe'
										id='name'
										name='name'
									/>
								</div>
								<div className='d-grid gap-2 mt-3'>
									<button
										style={{ backgroundColor: "#007bff" }}
										type='submit'
										className='btn btn-primary'
										onMouseEnter={(e) => {
											e.target.style.background = "#0069d9";
										}}
										onMouseOut={(e) => {
											e.target.style.background = "#007bff";
										}}>
										Register
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
