import {Link} from 'react-router-dom'
import {FaStar, FaShoppingBag} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {job} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = job
  return (
    <Link className="job-card-component" to={`/jobs/${id}`}>
      <li className="job-card-bg-container">
        <div className="job-card-top-section">
          <div>
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="company logo"
            />
          </div>
          <div>
            <h1 className="job-card-title">{title}</h1>
            <div className="job-card-rating">
              <FaStar className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-middle-section">
          <div className="middle-section-first-part">
            <div className="job-card-detail-cont">
              <MdLocationOn className="job-card-icon" />
              <p>{location}</p>
            </div>
            <div className="job-card-detail-cont">
              <FaShoppingBag className="job-card-icon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="job-card-package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div>
          <p>Description</p>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
