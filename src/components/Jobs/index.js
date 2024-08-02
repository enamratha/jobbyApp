import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobCard from '../JobCard'
import ProfileDetails from '../ProfileDetails'
import Filters from '../Filters'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobs: [],
    employmentTypes: [],
    salaryRange: '',
    searchInput: '',
    getJobsStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  handleSuccess = data => {
    const jobs = data.map(each => ({
      id: each.id,
      title: each.title,
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
    }))
    this.setState({jobs, getJobsStatus: apiStatus.success})
  }

  handleFailure = () => {
    this.setState({getJobsStatus: apiStatus.failure})
  }

  getJobs = async () => {
    this.setState({getJobsStatus: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')

    const {employmentTypes, salaryRange, searchInput} = this.state
    const employmentTypesQueryParam = employmentTypes.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesQueryParam}&&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.handleSuccess(data.jobs)
    } else {
      this.handleFailure()
    }
  }

  renderJobs = () => {
    const {jobs} = this.state
    const jobViewCond = jobs.length >= 1
    return (
      <div>
        {jobViewCond ? (
          <ul className="jobs-container">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </ul>
        ) : (
          <div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
            </div>
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        )}
      </div>
    )
  }

  checkEmployment = (checked, id) => {
    const {employmentTypes} = this.state
    if (checked === true) {
      employmentTypes.push(id)
    } else {
      const index = employmentTypes.indexOf(id)
      employmentTypes.splice(index, 1)
    }
    this.setState({employmentTypes}, this.getJobs)
  }

  selectSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onClickSearchButton = () => {
    this.getJobs()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsResults = () => {
    const {getJobsStatus} = this.state
    switch (getJobsStatus) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderJobs()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="job-route-design">
          <div className="profile-filters-container">
            <div className="sm-device-search-bar">
              <input
                className=""
                type="search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                onClick={this.onClickSearchButton}
                type="button"
                data-testid="searchButton"
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ProfileDetails />
            <Filters
              checkEmployment={this.checkEmployment}
              selectSalaryRange={this.selectSalaryRange}
            />
          </div>
          <div>
            <div className="md-device-search-bar">
              <input
                className=""
                type="search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                onClick={this.onClickSearchButton}
                type="button"
                data-testid="searchButton"
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="job-results-container">
              {this.renderJobsResults()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
