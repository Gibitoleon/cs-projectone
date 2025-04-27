import React from "react";
import Homeicon from "../../Components/Homeicon";
import { Mail } from "lucide-react";
import { LockKeyholeOpen } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import sectiontwo from "../../assets/sectiontWO.png";
import { useState } from "react";

export const Signup = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="signupoverlay">
      <div className="signupcontainer">
        <section className="signup-section">
          <div className="signup-progress">
            <span className={`dot ${step === 1 ? "active" : ""}`}></span>
            <span className={`dot ${step === 2 ? "active" : ""}`}></span>
            <span className={`dot ${step === 3 ? "active" : ""}`}></span>
          </div>
          <div className="logo">
            {step == 1 && <Homeicon />}
            {step == 2 && <Mail size={45} className="Mail-icon" />}
          </div>
          {step == 1 && (
            <div className="signup-content">
              <h1>Create Your Account</h1>
              <h5>Sign up to manage your rentals or pay your rent online.</h5>
              <form className="initialsignup-form" action="">
                <article>
                  <Mail />
                  <input type="email" placeholder="Email address" />
                </article>
                <article>
                  <LockKeyholeOpen />
                  <input type="password" placeholder="Password" />
                  <EyeOff />
                </article>
                <button onClick={() => setStep(2)} className="button">
                  Getting Started
                </button>
              </form>
              <p>Already have an account? Sign in</p>
            </div>
          )}
          {step == 2 && (
            <div className="check-email-container enhanced-step">
              <h1>Verify Your Email</h1>
              <p className="check-desc">
                A verification link has been sent to your email address:
              </p>
              <h3 className="highlighted-email">gabrielleon9928@gmail.com</h3>
              <p className="check-desc">
                Please check your inbox and click the link to continue with the
                registration process.
              </p>
              <div className="resend-wrapper">
                <p>Didn't receive the email?</p>
                <button className="resend-button">Resend Link</button>
              </div>
            </div>
          )}
        </section>
        <section className="section2">
          <p className="section2-Heading">
            The easiest way to pay and collect Rent
          </p>
          <p className="sub-heading">
            Manage properties,tenants and payment in one place.
          </p>
          <div className="rent-summary">
            <h2>Rent Collected This Month</h2>
            <div className="amount">Ksh 5,600</div>

            <div className="rent-stats">
              <div>
                <span className="count">24</span>
                <span className="label">Paid</span>
              </div>
              <div>
                <span className="count">4</span>
                <span className="label">Partially Paid</span>
              </div>
              <div>
                <span className="count">5</span>
                <span className="label">Pending</span>
              </div>
              <div>
                <span className="count">3</span>
                <span className="label">Overdue</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
