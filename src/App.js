import React, { useState, useEffect } from 'react'
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'

const getDatafromLS = () => {
  const data = localStorage.getItem('records');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}

export const App = () => {
  const [records, setrecords] = useState(getDatafromLS());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [imagelink, setImagelink] = useState('');
  const [gender, setGender] = useState('');
  const [skills, setSkills] = useState('');

  const handleAddRecordSubmit = (e) => {
    e.preventDefault();
    let record = {
      name: name,
      email: email,
      website: website,
      imagelink: imagelink,
      gender: gender,
      skills: skills,
    }
    console.log(record)
    setrecords([...records, record]);
    setName('');
    setEmail('');
    setWebsite('');
    setImagelink('');
    setGender('');
    setSkills('');
  }

  const deleteRecord = (email) => {
    const filteredRecords = records.filter((element, index) => {
      return element.email !== email
    })
    setrecords(filteredRecords);
  }

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records])

  return (
    <div className='wrapper'>
      <div className='heading'><h1>Registration Form</h1></div>
      <div className='main'>
        <div className='form-container'>
          <form autoComplete="off" className='form-group' onSubmit={handleAddRecordSubmit}>
            <div className='form-div'>
              <label>Name</label>
              <input type="text" className='form-control' required
                onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className='form-div'>
              <label>Email</label>
              <input type="email" className='form-control' required
                onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className='form-div'>
              <label>Website</label>
              <input type="text" className='form-control' required
                onChange={(e) => setWebsite(e.target.value)} value={website} />
            </div>
            <div className='form-div'>
              <label>Image Link</label>
              <input type="text" className='form-control' required
                onChange={(e) => setImagelink(e.target.value)} value={imagelink}></input>
            </div>

            <div className='gender'>
              <label className='gen-lab'>Gender</label>
              <div>
                <div>
                  <input type="radio" className='radio' required
                    onChange={(e) => setGender(e.target.value)} value="Male" checked={gender === "Male"} />
                  <label className='radio-opt'>Male</label>
                </div>
                <div>
                  <input type="radio" className='radio' required
                    onChange={(e) => setGender(e.target.value)} value="Female" checked={gender === "Female"} />
                  <label className='radio-opt'>Female</label>
                </div>
                <div>
                  <input type="radio" className='radio' required
                    onChange={(e) => setGender(e.target.value)} value="Other" checked={gender === "Other"} />
                  <label className='radio-opt'>Other</label>
                </div>
              </div>
            </div>

            <div className='form-div'>
              <label>Skills</label>
              <input type="text" className='form-control' required
                onChange={(e) => setSkills(e.target.value)} value={skills}></input>
            </div>

            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
          {records.length > 0 && <>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th className='tb-head'>Description</th>
                    <th className='tb-head'>Image</th>
                    <th className='tb-head'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr className='line' key={record.email}>
                      <td>{record.name}<br></br>
                        {record.gender}<br></br>
                        {record.email}<br></br>
                        <a href={record.website}>{record.website}</a><br></br>
                        {record.skills}</td>
                      <td><img src={record.imagelink} alt={record.name + " photo"}></img></td>
                      <td className='delete-btn' onClick={() => deleteRecord(record.email)}>
                        <Icon icon={trash} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
              onClick={() => setrecords([])}>Remove All</button>
          </>}
          {records.length < 1 && <div>No records added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
