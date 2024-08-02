import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaStar, FaShoppingBag} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    skills: [],
    similarJobs: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  onSuccessfulAccess = data => {
    const details = data.job_details
    const lifeAtCompany = {
      description: details.life_at_company.description,
      imageUrl: details.life_at_company.image_url,
    }
    const jobDetails = {
      companyLogoUrl: details.company_logo_url,
      companyWebsiteUrl: details.company_website_url,
      employmentType: details.employment_type,
      id: details.id,
      location: details.location,
      packagePerAnnum: details.package_per_annum,
      rating: details.rating,
      jobDescription: details.job_description,
    }

    const skills = details.skills.map(skill => ({
      name: skill.name,
      imageUrl: skill.image_url,
    }))

    const similarJobs = data.similar_jobs.map(job => ({
      id: job.id,
      companyLogoUrl: job.company_logo_url,
      employmentType: job.employment_type,
      jobDescription: job.job_description,
      location: job.location,
      rating: job.rating,
      title: job.title,
    }))

    this.setState({
      jobDetails,
      lifeAtCompany,
      skills,
      similarJobs,
      status: apiStatus.success,
    })
  }

  failedAccess = () => {
    this.setState({status: apiStatus.failure})
  }

  getJobItemDetails = async () => {
    this.setState({status: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const recData = await response.json()
    if (response.ok === true) {
      this.onSuccessfulAccess(recData)
    } else {
      this.failedAccess()
    }
  }

  renderResults = () => {
    const {jobDetails, lifeAtCompany, skills, status, similarJobs} = this.state
    console.log(similarJobs)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      location,
      packagePerAnnum,
      rating,
      jobDescription,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    switch (status) {
      case apiStatus.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiStatus.success:
        return (
          <>
            <div className="job-card-bg-container">
              <div className="job-card-top-section">
                <div>
                  <img
                    className="company-logo"
                    src={companyLogoUrl}
                    alt="job details company logo"
                  />
                </div>
                <div>
                  {/* <h1 className="job-card-title">{title}</h1> */}
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
                <div className="job-details-description-visit">
                  <h1>Description</h1>
                  <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </div>
                <p>{jobDescription}</p>
              </div>
              <div>
                <h1>Skills</h1>
                <ul className="job-details-skill-list">
                  {skills.map(skill => (
                    <li className="job-details-skill" key={skill.name}>
                      <img src={skill.imageUrl} alt="skill" />
                      <p>{skill.name}</p>
                    </li>
                  ))}
                </ul>
                <div className="job-details-company-life">
                  <div>
                    <h1>Life at company</h1>
                    <p>{description}</p>
                  </div>
                  <div>
                    <img src={imageUrl} alt="life at company" />
                  </div>
                </div>
              </div>
            </div>

            <div className="similar-jobs-container">
              <h1>Similar jobs</h1>
              <ul className="similar-jobs-list">
                {similarJobs.map(job => (
                  <SimilarJobItem key={job.id} job={job} />
                ))}
              </ul>
            </div>
          </>
        )
      case apiStatus.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.pn"
              alt="failure view"
            />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-route-bg">{this.renderResults()}</div>
      </>
    )
  }
}

export default JobItemDetails
