import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Aapki Atlas Connection String
const MONGODB_URI = "mongodb+srv://naharlakshita3_db_user:portfolio8003859853@cluster0.agwjqzk.mongodb.net/PortfolioLAB?retryWrites=true&w=majority&appName=Cluster0";

const portfolioSchema = new mongoose.Schema({
  projectTitle: String,
  owner: String,
  theme: Object,
  sections: Array
});

// Add virtual `id` and tidy JSON output
portfolioSchema.virtual('id').get(function () {
  return this._id.toString();
});
portfolioSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully! 🚀");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  
  // Abhi ke liye ye sirf console mein dikhayega ki data mil gaya
  console.log("Data from PortfolioLAB:", body);
  // Ensure model is registered only once
  const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

  try {
    const created = await Portfolio.create(body);
    const payload = created.toJSON();
    return NextResponse.json({
      success: true,
      data: payload,
      message: 'Portfolio data saved to MongoDB!'
    });
  } catch (err) {
    console.error('Error saving portfolio:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}