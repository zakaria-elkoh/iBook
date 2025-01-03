import {
  Briefcase,
  Facebook,
  Instagram,
  MessageCircle,
  Rocket,
  Youtube,
} from "lucide-react";
import "./Home.css";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Home = () => {
  return (
    <div className="">
      <main>
        <article>
          <section className="hero" id="home">
            <div className="container">
              <div className="hero-content">
                <h1 className="h1 hero-title">
                  Your full-funnel growth agency
                </h1>

                <p className="hero-text">
                  Capture and retrieve your lists across devices to help you
                  stay organized at work, home, and on the go.
                </p>

                <button className="btn btn-primary">Get started</button>
              </div>

              <div className="hero-banner"></div>
            </div>

            <img
              src="./assets/images/bg.png"
              alt="shape"
              className="shape-content"
            />
          </section>

          <section className="about" id="about">
            <div className="container">
              <div className="about-top">
                <h2 className="h2 section-title">What we do</h2>

                <p className="section-text">
                  Each time a digital asset is purchased or sold, Sequoir
                  donates a percentage of the fees back into the development of
                  the asset through its charitable foundation.
                </p>

                <ul className="about-list">
                  <li>
                    <div className="about-card">
                      <div className="card-icon">
                        <Briefcase className="w-14 h-14" />
                      </div>

                      <h3 className="h3 card-title">
                        Paid Search and Social Management
                      </h3>

                      <p className="card-text">
                        Each time a digital asset is purchased or sold, Sequoir
                        donates a percentage of the fees back
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="about-card">
                      <div className="card-icon">
                        <MessageCircle className="w-14 h-14" />
                      </div>

                      <h3 className="h3 card-title">Direct Response Content</h3>

                      <p className="card-text">
                        Each time a digital asset is purchased or sold, Sequoir
                        donates a percentage of the fees back
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="about-card">
                      <div className="card-icon">
                        <Rocket className="w-14 h-14" />
                      </div>

                      <h3 className="h3 card-title">
                        CRO and Retention Optimizations
                      </h3>

                      <p className="card-text">
                        Each time a digital asset is purchased or sold, Sequoir
                        donates a percentage of the fees back
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="about-bottom">
                <figure className="about-bottom-banner">
                  <img
                    src="./images/about-banner.png"
                    alt="about banner"
                    className="about-banner"
                  />
                </figure>

                <div className="about-bottom-content">
                  <h2 className="h2 section-title">
                    We’re obsessed with growth
                  </h2>

                  <p className="section-text">
                    Each time a digital asset is purchased or sold, Sequoir
                    donates a percentage of the fees back into the development
                    of the asset through its charitable foundation.
                  </p>

                  <button className="btn btn-secondary">
                    Sign Up For Free
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="features" id="features">
            <div className="container">
              <h2 className="h2 section-title">
                Our team is made up of all different backgrounds from all over
                the world.
              </h2>

              <p className="section-text">
                Each time a digital asset is purchased or sold, Sequoir donates
                a percentage of the fees back into the development of the asset
                through its charitable foundation.
              </p>

              <ul className="features-list">
                <li className="features-item">
                  <figure className="features-item-banner">
                    <img src="./images/feature-1.png" alt="feature banner" />
                  </figure>

                  <div className="feature-item-content">
                    <h3 className="h2 item-title">
                      Cover your everyday expenses
                    </h3>

                    <p className="item-text">
                      Inspiration comes in many ways and you like to save
                      everything from. sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </div>
                </li>

                <li className="features-item">
                  <figure className="features-item-banner">
                    <img src="./images/feature-2.png" alt="feature banner" />
                  </figure>

                  <div className="feature-item-content">
                    <h3 className="h2 item-title">
                      We offer low fees that are transparent
                    </h3>

                    <p className="item-text">
                      Each time a digital asset is purchased or sold, Sequoir
                      donates a percentage of the fees back into the development
                      of the asset through its charitable foundation.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="cta">
            <div className="container">
              <div className="cta-card">
                <h3 className="cta-title">Try for 7 days free</h3>

                <p className="cta-text">
                  Each time a digital asset is purchased or sold, Sequoir
                  donates a percentage of the fees back.
                </p>

                <form action="" className="cta-form">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                  />

                  <button type="submit" className="btn btn-secondary">
                    Try It Now
                  </button>
                </form>
              </div>
            </div>
          </section>

          <section className="contact" id="contact">
            <div className="container">
              <div className="contact-content">
                <h2 className="h2 contact-title">
                  Let’s scale your brand, together
                </h2>

                <figure className="contact-banner">
                  <img src="./images/contact.png" alt="contact banner" />
                </figure>
              </div>

              <form action="" className="contact-form">
                <div className="input-wrapper">
                  <label form="name" className="input-label">
                    Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Type Name"
                    className="input-field"
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="phone" className="input-label">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Type Phone Number"
                    className="input-field"
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="email" className="input-label">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Type Email Address"
                    className="input-field"
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="message" className="input-label">
                    How can we help? *
                  </label>

                  <textarea
                    name="message"
                    id="message"
                    placeholder="Type Description"
                    required
                    className="input-field"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </article>
      </main>

      <footer>
        <div className="footer-top">
          <div className="container">
            <div className="footer-brand">
              <a href="#" className="logo">
                <img src="./images/logo.png" alt="Funel logo" />
              </a>

              <p className="footer-text">Follow us on</p>

              <ul className="social-list">
                <li>
                  <a
                    href="https://github.com/zakaria-elkoh"
                    className="social-link"
                  >
                    <GitHubLogoIcon className="w-5 h-5" />
                  </a>
                </li>

                <li>
                  <a
                    href="https://instagram.com/codewithsadee"
                    className="social-link"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </li>

                <li>
                  <a
                    href="https://youtube.com/c/codewithsadee"
                    className="social-link"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link">
                    <Facebook className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-link-box">
              <ul className="footer-link-list">
                <li>
                  <h3 className="h4 link-title">Company</h3>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    About Us
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Features
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Pricing
                  </a>
                </li>
              </ul>

              <ul className="footer-link-list">
                <li>
                  <h3 className="h4 link-title">Products</h3>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Blog
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Help Center
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Contact
                  </a>
                </li>
              </ul>

              <ul className="footer-link-list">
                <li>
                  <h3 className="h4 link-title">Resources</h3>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    FAQ’S
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Testimonial
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Terms & Conditions
                  </a>
                </li>
              </ul>

              <ul className="footer-link-list">
                <li>
                  <h3 className="h4 link-title">Relevent</h3>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Why
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Products
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Customers
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; 2022 <a href="#">@codewithsadee</a> All right reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
