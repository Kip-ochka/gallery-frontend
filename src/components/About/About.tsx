import iconBehance from '../../img/social-icon/icon-behance.svg';
import iconFacebook from '../../img/social-icon/icon-facebook.svg';
import iconInsta from '../../img/social-icon/icon-instagram.svg';
import iconLinked from '../../img/social-icon/icon-linkedin.svg';
import userPhoto from '../../img/user-photo.png';
import './About.scss';

function About() {
  return (
    <section className="about">
      <h1 className="about__author-name">Виталик</h1>
      <div className="about__container">
        <img src={userPhoto} alt="Фотография автора" className="about__photo" />
        <div className="about__wrapper">
          <h2 className="about__title">About</h2>
          <p className="about__description">
            We are a creative duo based in Noida, India - who work as a team and
            individually, across a range of creative disciplines including
            photography, styling, illustration and design.
          </p>
          <h3 className="about__subtitle">CLIENTS</h3>
          <p className="about__clients-descriptiob">
            {
              'Argentor / Acquaviva / Aqua Plus Global / Bathline Sensations / Bikano / Apollomedics Super Speciality Hospital, Lucknow / Ashirwad Hospital, Varanasi / Government Institute Of Medical Sciences, Noida / HCG NCHRI, Nagpur / HCG Regency Oncology Hospital, Kanpur / Nayati Medicity, Mathura / Paras HMRI Hospital, Patna / Paras Hospital, Gurgaon'
            }
          </p>
          <ul className="about__contacts-list">
            <li className="about__contacts-item">
              <p className="about__contacts-title">
                Represented By
                <span className="about__company">{'YA_ZAGLUSHKA'}</span>
              </p>
            </li>
            <li className="about__contacts-item">
              <p className="about__contacts-title">
                E-mail.
                <span className="about__contacts-email-adress">
                  {'office@noughtsncrosses.in / us@anwita-arun.in'}
                </span>
              </p>
            </li>
            <li className="about__contacts-item">
              <p className="about__contacts-title">
                Tel.
                <span className="about__contacts-telephone-number">
                  {'8-800-555-35-35'}
                </span>
              </p>
            </li>
          </ul>
          <ul className="social-network">
            <li className="social-newtwork__item">
              <a
                href="!#"
                className="social-network__link social-network__link_type_facebook"
              >
                <img
                  src={iconFacebook}
                  alt="Facebook icon"
                  className="social-network__icon social-network__icon_type_facebook"
                />
              </a>
            </li>
            <li className="social-newtwork__item">
              <a
                href="!#"
                className="social-network__link social-network__link_type_instagram"
              >
                <img
                  src={iconInsta}
                  alt="Instagram icon"
                  className="social-network__icon social-network__icon_type_instagram"
                />
              </a>
            </li>
            <li className="social-newtwork__item">
              <a
                href="!#"
                className="social-network__link social-network__link_type_linkedin"
              >
                <img
                  src={iconLinked}
                  alt="Linkedin icon"
                  className="social-network__icon social-network__icon_type_linkedin"
                />
              </a>
            </li>
            <li className="social-newtwork__item">
              <a
                href="!#"
                className="social-network__link social-network__link_type_behance"
              >
                <img
                  src={iconBehance}
                  alt="Behance icon"
                  className="social-network__icon social-network__icon_type_behance"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
