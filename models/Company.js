const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// const RequestSchema = new Schema({
//   customer_id: {
//     type: Number,
//     required: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
// });

// const SessionSchema = new Schema({
//   sessionActive: {
//     type: Boolean,
//     required: true,
//   },
//   sessionParticipants: {
//     type: Number,
//     default: 0,
//   },
//   sessionOpened: {
//     type: Date,
//     default: Date.now(),
//   },
//   sessionClosed: {
//     type: Boolean,
//     required: true,
//   },
//   requests: [RequestSchema],
// });

const ChatSchema = new Schema(
  {
    message: {
      type: String,
    },
    customer_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TableSchema = new Schema({
  company_id: {
    type: String,
    required: true,
  },
  table_num: {
    type: Number,
    required: true,
  },
  QR_code: String,
  isActive: Boolean,
  customer_number: {
    type: Number,
    default: 001,
  },
  chat: [],
});

const ReviewSchema = new Schema({
  overall_experience_rating: {
    type: Number,
    required: false,
  },
  overall_experience_message: {
    type: Number,
    required: false,
  },
  overall_cleanliness: {
    type: Number,
    required: false,
  },
  food_quality: {
    type: Number,
    required: false,
  },
  covid_question: {
    type: Number,
    required: false,
  },
  additional_comments: {
    type: String,
    required: false,
  },
  timeliness: {
    type: Number,
    required: false,
  },
  session_id: {
    type: Number,
    required: true,
  },
  table_id: {
    type: Number,
    required: true,
  },
});

const CompanySchema = new Schema({
  restaurant_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  company_logo: {
    type: String,
    required: false,
  },
  QR_codes: [String],
  tables: [TableSchema],
  reviews: [ReviewSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Execute before each user.save() call
CompanySchema.pre("save", async function () {
  const user = this;

  // Break out if the password hasn't changed
  if (!user.isModified("password")) {
    return;
  }

  // Password changed so we need to hash it
  const SALT_ROUNDS = 10;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
});

CompanySchema.methods.verifyPassword = async function (plainTextPassword) {
  return bcrypt.compare(plainTextPassword, this.password);
  // bcrypt.compare(password, this.password, (err, isMatch) => {
  //   if (err) {
  //     return cb(err);
  //   }
  //   cb(null, isMatch);
  // });
};

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
