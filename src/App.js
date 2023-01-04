import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css';

function App() {

  const [students, setStudents] = useState([]);
  // var students = useMemo(() => [], []);
  const [currentP, setcurrentP] = useState(0);
  const [data, setdata] = useState({
    name: '',
    rollNo: '',
    checkin: '',
    checkout: ''
  })

  const { name, rollNo } = data;
  const date = useMemo(() => new Date(), []);

  const handelChange = useCallback((name) => e => {
    const time = date.getHours() + ':' + date.getMinutes();
    setdata({ ...data, [name]: e.target.value, checkin: time });
  }, [data, date])

  const handelSubmit = useCallback(() => {
    students.push(data)
    setdata({
      name: '',
      rollNo: '',
      checkin: '',
      checkout: ''
    })
  }, [data, students])

  const checkout = useCallback((key) => {
    const time = date.getHours() + ':' + date.getMinutes();
    const newArray = [...students];
    newArray[key].checkout = time;
    setStudents(newArray);
  }, [date, students]);

  useEffect(() => {
    var no = students.filter(e=>e.checkout==='').length;
    setcurrentP(no);
  }, [checkout, handelSubmit, students])


  return (
    <>
      <h1 className='w-fit mx-auto my-20 font-bold text-2xl' >School Attendance</h1>

      <input
        className="w-fit pl-3 py-2 mx-3 border border-black rounded-sm"
        type="text" placeholder="Enter your Name"
        value={name}
        onChange={handelChange("name")}
      />
      <br />
      <input
        className="w-fit pl-3 py-2 mx-3 border my-2 border-black rounded-sm appearance-none"
        type="number"
        value={rollNo}
        placeholder="Enter your Roll No."
        onChange={handelChange("rollNo")}

      />
      <br />
      <button
        className="bg-green-500 mx-3 my-2 hover:bg-green-800 px-4 py-2 rounded-full font-bold text-white border-2 border-green-800"
        onClick={handelSubmit}
      >
        Submit
      </button>

      <p className='mx-3 font-bold  mt-5' >Total Present = {students.length}</p>
      <p className='mx-3 font-bold mb-5' >Current Present = {currentP}</p>

      <table className="table-fixed mx-3 mt-5">

        <thead>

          <tr>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Checkin Time</th>
            <th>Checkout</th>
            <th>Checkout Time</th>
          </tr>

        </thead>
        <tbody>

          {students.map((student, key) =>
            <tr key={key}>
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.checkin}</td>
              <td className='text-red-700 ' >
                {!student.checkout &&
                  <i className="fa fa-close cursor-pointer" onClick={() => checkout(key)}></i>
                }
              </td>
              <td>{student.checkout}</td>
            </tr>
          )}

        </tbody>

      </table>

    </>
  );
}

export default App;
