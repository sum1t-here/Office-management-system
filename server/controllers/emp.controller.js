import Emp from '../models/emp.model.js';
import AppError from '../utils/error.util.js';

// Configuration for the cookie options.
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  httpOnly: true, // The cookie cannot be accessed via client-side JavaScript
  secure: true, // The cookie is only sent over HTTPS connections
};

// Async function to handle user registration.
const register = async (req, res, next) => {
  // Destructure the request body to extract "fullName", "email", and "password".
  const { fullName, email, password } = req.body;

  // If any of the fields is missing, return a new instance of "AppError" with a 400 status code.
  // This will be passed to the "next()" function to handle the error.
  if (!fullName || !email || !password) {
    return next(new AppError('All fields are required', 400));
  }
  // Minimum password length required.
  const minPasswordLength = 8;

  // If the password is too short, return a new instance of "AppError" with a 400 status code.
  // This will be passed to the "next()" function to handle the error.
  if (password.length < minPasswordLength) {
    return next(new AppError('Password must be at least 8 characters', 400));
  }
  // Check if a employee with the same email already exists in the database using the "Emp" model.
  const empExist = await Emp.findOne({ email });

  // If a user with the same email exists, return a new instance of "AppError" with a 400 status code.
  // This will be passed to the "next()" function to handle the error.
  if (empExist) {
    return next(new AppError('Email already exist', 400));
  }

  try {
    // Create a new employee object using the "Emp" model and provided data.
    const emp = await Emp.create({
      fullName,
      email,
      password,
    });

    // Check if the employee object was successfully created.
    if (!emp) {
      // If the employee creation fails, return a new instance of "AppError" with a 404 status code.
      // This will be passed to the "next()" function to handle the error.
      return next(new AppError('Try again, user registration failed', 404));
    }
    // If the employee object is successfully created, proceed with the registration process.

    // Save the employee object to the database.
    await emp.save();
    // Clear the "password" field to avoid sending it in the response for security reasons.
    emp.password = undefined;

    // Generate a JSON Web Token (JWT) for the user using the "generateJWTToken()" method.
    const token = await emp.generateJWTToken();

    // Set the generated token as a cookie with the provided cookie options.
    res.cookie('token', token, cookieOptions);

    // Respond with a status of 201 (Created) and a JSON object containing a success message and user details.
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      emp,
    });
  } catch (error) {
    return next(error);
  }
};

export { register };
