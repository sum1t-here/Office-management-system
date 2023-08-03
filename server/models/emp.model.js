import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const empSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [6, 'Name must be atleast six characters'],
      maxLength: [50, 'Name must not exceed twenty characters'],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        'Please enter a valid email id',
      ],
    },
    password: {
      type: String,
      required: [true, 'Pasword is required'],
      minLength: [8, 'Password must be of 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['EMP', 'HR', 'ADMIN'],
      default: 'EMP',
    },
    forgotPasswordToken: String,
    forgotTokenDate: Date,
  },
  {
    timestamps: true,
  }
);

// hashes password when new user is being created
empSchema.pre('save', async function next() {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 8);
  } catch (error) {
    console.log(error);
  }
});

const Emp = model('Emp', empSchema);

export default Emp;
