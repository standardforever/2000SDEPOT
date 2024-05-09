import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Components/ThemeContext";
import ReactSwitch from "react-switch";
import "./style/loginpage.css";
import "./style/switch.css";
import { useEffect } from "react";
const LoginPage = ({ setUser }) => {
	const { isDarkMode, toggleTheme } = useTheme();
	const [signUp, setSignUp] = useState(true);
	const navigate = useNavigate();
	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	}, [isDarkMode]);
	const signUpSchema = yup.object().shape({
		first_name: yup
			.string()
			.min(4, " Name is too short!")
			.max(15, "Name is too long"),
		last_name: yup
			.string()
			.min(4, "Last Name is too short!")
			.max(30, "Last Name is too long"),
		username: yup
			.string()
			.min(6, "Username is too short!")
			.max(12, "Username is too long!"),
		password: yup
			.string()
			.min(6, "Password is too short!")
			.max(12, "Password is too long!"),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref("password")], "Password must match."),
	});
	const loginSchema = yup.object().shape({
		username: yup.string().required("username is required"),
		password: yup.string().required("password is required"),
	});
	const formik = useFormik({
		initialValues: {
			first_name: "",
			last_name: "",
			username: "",
			password: "",
			passwordConfirmation: "",
		},
		validationSchema: signUp ? signUpSchema : loginSchema,
		onSubmit: async (values) => {
			const endpoint = signUp ? "/signup" : "/login";
			{
				const response = await fetch(
					`http://127.0.0.1:5000/api${endpoint}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJkZWZhdWx0X3VzZXIifQ.hWBCFTI8zh4jcMuuxoR9bUfl_PgUYh258AnH9-EhYXs",
						},
						body: JSON.stringify(values),
					}
				);
				const data = await response.json();
				if (response.ok) {
					setUser(data.user);
					navigate("/games");
				} else {
					console.error("Failed Login! Try Again:");
				}
			}
		},
	});

	function toggleSignUp() {
		setSignUp((currentSignUp) => !currentSignUp);
	}

	return (
		<div>
			<Container className="auth-container d-flex flex-column">
				<section>
					<h1>Welcome to the Auth page</h1>
				</section>

				<Button onClick={toggleSignUp} variant="primary">
					{signUp
						? "Please login to see games"
						: "Signup to acess forum!"}
				</Button>
				<Form onSubmit={formik.handleSubmit}>
					<Form.Group controlId="username">
						<Form.Label></Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter username"
							name="username"
							value={formik.values.username}
							onChange={formik.handleChange}
							isInvalid={
								formik.touched.username &&
								!!formik.errors.username
							}
						/>
						<Form.Control.Feedback type="invalid">
							{formik.errors.username}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label></Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							name="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							isInvalid={
								formik.touched.password &&
								!!formik.errors.password
							}
						/>
						<Form.Control.Feedback type="invalid">
							{formik.errors.password}
						</Form.Control.Feedback>
					</Form.Group>
					{signUp && (
						<Form.Group controlId="passwordConfirmation">
							<Form.Label></Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm password"
								name="passwordConfirmation"
								value={formik.values.passwordConfirmation}
								onChange={formik.handleChange}
								isInvalid={
									formik.touched.passwordConfirmation &&
									!!formik.errors.passwordConfirmation
								}
							/>
							<Form.Control.Feedback type="invalid">
								{formik.errors.passwordConfirmation}
							</Form.Control.Feedback>
						</Form.Group>
					)}
					<br />
					<br />
					<div className="d-flex justify-content-center">
						<Button
							variant="primary"
							type="submit"
							style={{ cursor: "pointer" }}>
							Submit
						</Button>
					</div>
				</Form>
			</Container>
			<div className="switch">
				<label> {isDarkMode ? "Dark-mode" : "Light-mode"}</label>
				<ReactSwitch onChange={toggleTheme} checked={isDarkMode} />
			</div>
		</div>
	);
};

export default LoginPage;
