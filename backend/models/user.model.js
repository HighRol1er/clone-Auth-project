import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String, // 비밀번호 재설정을 위한 임시 토큰
  resetPasswordExpiresAt: Date, // 해당 토큰의 만료 시간 Ex)1시간 내에 비밀번호를 바꾸지 않으면 토큰이 만료되어 토큰을 재요청해야 함.
  verificationToken: String,
  verificationTokenExpiresAt: Date,
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);