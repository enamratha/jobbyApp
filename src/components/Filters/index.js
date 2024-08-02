import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = props => {
  const {checkEmployment, selectSalaryRange} = props

  const onCheckEmployment = event => {
    const {checked, id} = event.target
    checkEmployment(checked, id)
  }

  const onSelectSalary = event => {
    const {id} = event.target
    selectSalaryRange(id)
  }

  return (
    <div>
      <div className="employment-type-section">
        <h1>Type of Employment</h1>
        <ul className="employment-type-list">
          {employmentTypesList.map(type => (
            <li key={type.label}>
              <input
                onClick={onCheckEmployment}
                type="checkbox"
                id={`${type.employmentTypeId}`}
              />
              <label htmlFor={type.employmentTypeId}>{type.label}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="salary-range-section">
        <h1>Salary Range</h1>
        <ul className="salary-range-list">
          {salaryRangesList.map(salary => (
            <li key={salary.salaryRangeId}>
              <input
                onClick={onSelectSalary}
                type="radio"
                id={salary.salaryRangeId}
                name="salaryRange"
              />
              <label htmlFor={salary.salaryRangeId}>{salary.label}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Filters
