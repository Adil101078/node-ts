import '@core/declarations';
import { Schema, model as Model } from 'mongoose';
import bcrypt from 'bcrypt';
import constant from '@core/constants';

type documents = {
    key: string;
    url: string
}

interface I_Image {
    key?: string;
    url?: string;
    _id?: boolean;
    status: string;
    rejectReason: string;
}
export interface I_User {
    userType: string;
    name: string;
    email: string;
    password: string;
    country: string;
    companyRegistrationNumber?: string;
    countryCode: string;
    mobile: string;
    website?: string;
    otp?: number;
    otpExpiresIn?: Date;
    resetPasswordToken?: string;
    isEmailVerified: boolean;
    isMobileVerified: boolean;
    profilePicture: documents;
    addressProof: documents;
    passport: {
        front: documents;
        back: documents;
    },
    isBlocked: boolean;
    kycStatus: string;
    blockedReason: string,
    resetPasswordTokenExpiresIn: Date
}

const imageSchema = new Schema<I_Image>({
    key: String,
    url: String,
    status: {
        type: String,
        enum: constant.DOC_STATUS,
        default: constant.DOC_STATUS[0]
    },
    rejectReason: String,
    _id: false
})

const UserSchema = new Schema<I_User>({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: { type: String },
    country: { type: String },
    countryCode: { type: String },
    mobile: { type: String },
    userType: {
        type: String,
        enum: constant.USER_TYPES
    },
    isEmailVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    blockedReason: String,
    website: String,
    profilePicture: imageSchema,
    addressProof: imageSchema,
    passport: {
        front: imageSchema,
        back: imageSchema,
        passportNumber: String
    },
    kycStatus: {
        type: String,
        enum: constant.KYC_STATUS,
        default: constant.KYC_STATUS[0]
    },
    otp: Number,
    otpExpiresIn: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiresIn: Date
}, {
    timestamps: true,
    versionKey: false
})

const UserModel = Model(constant.MODELS.USER, UserSchema)
export default UserModel