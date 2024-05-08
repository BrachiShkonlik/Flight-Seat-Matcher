import React from 'react'
import Select from 'react-select'

// const specific =(){

// }
const employmentInFlight =() =>{
    const options = [
        { value: 'sleeping', label: 'sleeping' },
        { value: 'chattering', label: 'chattering' },
        { value: 'toWork', label: 'toWork' }
      ];
      return (
        <div className="container">
          <div className="mt-5 m-auto w-50">
            <Select options={options} />
          </div>
        </div>
      );
      
    };
    
    export default employmentInFlight;
    const   workingInFlight =()=>{
        if(employmentInFlight() ==toWork){
            const options = [
                { value: 'programming', label: 'programming' },
                { value: 'Accounting', label: 'Accounting' },
                { value: 'graphic', label: 'graphic' }
              ];
              return (
                <div className="container">
                  <div className="mt-5 m-auto w-50">
                    <Select options={options} />
                  </div>
                </div>
              );

        }

    }
     