import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [tableData, setTableData] = useState([])
  const [tableDataCopy, setTableDataCopy] = useState([])
  const [select, setSelect] = useState(false)
  const [defaultCheckbox, setDefaultCheckBox] = useState(true)
  useEffect(()=>{
    const fetchData=()=>{
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        
        setTableData(json)
        
        setTableDataCopy(json)})
    }
    fetchData()
  }, [])
  const onChangeCheckBoxEvent=(e, index)=>{
    // console.log(e, index)
    let res = [...tableData]
    res[index].completed = e.target.checked
    setTableData(res)

  }
  const onChangeSelectBox=(e)=>{
    setSelect(e.target.checked)
    setDefaultCheckBox(false)
    if(e.target.checked === true){
      let arr = []
      tableDataCopy.map((item)=>{
        console.log("item", item)
        if(item.completed === true){
            arr.push(item)
        }
      })
      
      setTableData(arr)
    }
    if(e.target.checked === false){
        let arr = []
        tableDataCopy.map((item)=>{
          if(item.completed === false){
            arr.push(item)
          }
        })
      setTableData(arr)
    }
  }
  const onChangeDefaultBox=(e)=>{
    setDefaultCheckBox(e.target.checked)
    setSelect(false)
    setTableData(tableDataCopy)
  }
  return (
    <div className="App">
        <div>
           {select ? "Unselect" : "Select"}
          <input checked={select} type="checkbox" onChange={(e)=>onChangeSelectBox(e)}/>
        </div>
        <div>
          Default<input checked={defaultCheckbox} type="checkbox" onChange={(e)=>onChangeDefaultBox(e)}/>
        </div>
      <table>
        <th>Id</th>
        <th>Title</th>
        <th>Status</th>
          {
            tableData.map((item, index)=>{
              return(
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td><input type="checkbox" checked={item.completed} onChange={(e)=>onChangeCheckBoxEvent(e, index)}/></td>
                </tr>
              )
            })
          }
      </table>
    </div>
  );
}

export default App;
