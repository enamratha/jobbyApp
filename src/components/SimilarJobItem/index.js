import {Link} from 'react-router-dom'
import {FaStar, FaShoppingBag} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {job} = props
  const {
    title,
    rating,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
    id,
  } = job
  return (
    <div>
      <Link className="similar-job-item" to={`/jobs/${id}`}>
        <li className="similar-card">
          <div>
            <img src={companyLogoUrl} alt="" />
            <div>
              <p>{title}</p>
              <div className="job-card-rating">
                <FaStar className="star" />
                <p>{rating}</p>
              </div>
              <h1>Description</h1>
              <p>{jobDescription}</p>
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
            </div>
          </div>
        </li>
      </Link>
    </div>
  )
}

export default SimilarJobItem
