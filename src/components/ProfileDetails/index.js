import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {
    profile: {},
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  onProfileApiSuccess = data => {
    const details = {
      name: data.name,
      profileImageUrl: data.profile_image_url,
      shortBio: data.short_bio,
    }
    this.setState({profile: details, status: apiStatus.success})
  }

  onProfileApiFailure = () => {
    this.setState({status: apiStatus.failure})
  }

  getProfileDetails = async () => {
    this.setState({status: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onProfileApiSuccess(data.profile_details)
    } else {
      this.onProfileApiFailure()
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="profile-bg">
        <img src={profileImageUrl} alt="user profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <button onClick={this.getProfileDetails} type="button">
        Retry
      </button>
    </div>
  )

  renderOutput = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderProfile()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-bg-container">{this.renderOutput()}</div>
  }
}

export default ProfileDetails
