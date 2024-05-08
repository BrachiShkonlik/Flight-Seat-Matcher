import axios from "axios";
import { useState } from "react";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
function passengerFunc(){
     const [id, setId] = useState();
    // const [password, setPassword] = useState();
    // const [conpany, setConpany] = useState();
    // const [model, setModel] = useState();
    // const [weghit, setWeghit] = useState();  
    
    const schema = yup.object().shape({

    id : yup.number().required(), 
    firstName: yup.string().required("Your name is requird"),
    lastName: yup.string().required("Your name is requird"),
    phoneNumber: yup.string().required("Your phone number is requird"),
    email: yup.string().required(),
    flightCode: yup.string().required(),
    favoriteSomeoneFirstName: yup.string().required(),
    favoriteSomeoneLastName: yup.string().required(),
    preferred: yup.string().required(),
    age: yup.number().required(),
    userName: yup.string().required(),
    password : yup.string().required("Your password is requird").min(5).max(20),
   
   })

   const {register  , handleSubmit , formState : {errors}} = useForm({
    resolver : yupResolver(schema),
   });
   
   const onSubmit = (data) => { createPassenger(data);}

    const getAllPassengers = async () => {
        let url = `http://localhost:5170/api/Passengeres`;
       await axios.get(url)
       .then((response) => {})
       
    };
    const createPassenger = async(data) =>{
        
        data.flight = {
            id : 0,
            _Id : "",
            date : new Date,
            numberPlaces : 0,   
            company : "",   
            target : "",
            exit : "",
        }
        
        let url = `http://localhost:5170/api/Passengeres`;
        await axios
          .post(url,
           data
          )
          .then((response) => {
          });
      }
      
    //   function deleteManager(id) {
    //     let url = `http://localhost:5237/api/Manager/${id}`
    //     axios
    //       .delete(url)
    //       .then(() => {
    //         alert("user deleted!");
    //       });
    //   }
    //   function updateManager(data) {
    //     let url = `http://localhost:5237/api/Manager`
    //     axios.put(url, data)
    //   .then(response => {});
    //   }

    // const companyDetails = [
    //     { ... },
    //     { ... },
    //     { ... },
    //   ];
      
    //   axios.post("https://localhost:7170/api/Passengeres", companyDetails)
    //     .then(response => {})
    //     .catch(error => {});
      
    return(
    <>
    <button onClick={getAllPassengers}>get all</button>
    {/* <form>
        <input type = "text" placeholder="id to delete" onChange={(e)=>setId(e.target.value)} />

        <input type = "button" placeholder="click" onClick={() => {deleteManager(id)}}/>
    </form> */}
    <form onSubmit={handleSubmit(onSubmit) }>
        <input type = "text" placeholder="id" {...register("id")} />
        <p>{errors.ID?.message}</p>
        <input type = "text" placeholder="first name" {...register("firstName")} />
        <p>{errors.FirstName?.message}</p>
        <input type = "text" placeholder="last name" {...register("lastName")} />
        <p>{errors.LastName?.message}</p>
        <input type = "text" placeholder="phone number" {...register("phoneNumber")} />
        <p>{errors.PhoneNumber?.message}</p>
        <input type = "email" placeholder="email" {...register("email")} />
        <p>{errors.Email?.message}</p>
        <input type = "text" placeholder="flightCode" {...register("flightCode")}/>
        <p>{errors.FlightCode?.message}</p>
        <input type = "text" placeholder="favoriteSomeoneFirstName" {...register("favoriteSomeoneFirstName")}/>
        <p>{errors.favoriteSomeoneFirstName?.message}</p>
        <input type = "text" placeholder="favoriteSomeoneLastName" {...register("favoriteSomeoneLastName")}/>
        <p>{errors.favoriteSomeoneLastName?.message}</p>
        <input type = "text" placeholder="preferred" {...register("preferred")}/>
        <p>{errors.Preferred?.message}</p>
        <input type = "number" placeholder="age" {...register("age")}/>
        <p>{errors.Age?.message}</p>
        <input type = "text" placeholder="userName" {...register("userName")}/>
        <p>{errors.UserName?.message}</p>
        <input type = "password" placeholder="password" {...register("password")}/>
        <p>{errors.Password?.message}</p>
        <input type = "submit"/>
    </form>

    {/* <form onSubmit={handleSubmit(onSubmit)}>
       
        <input type = "text" placeholder="name" {...register("Name")} />
        <p>{errors.Name?.message}</p>
        <input type = "password" placeholder="password" {...register("Password")}/>
        <p>{errors.password?.message}</p>
        <input type = "text" placeholder="company" {...register("WashingMachineDTO.Company")}/>
        <p>{errors.Company?.message}</p>
        <input type = "text" placeholder="model" {...register("WashingMachineDTO.Model")}/>
        <p>{errors.Model?.message}</p>
        <input type = "number" placeholder="weghit" {...register("WashingMachineDTO.LaundryWeight")}/>
        <p>{errors.LaundryWeight?.message}</p>
        <input type = "submit"/>
    </form> */}

    </>
    ) ;
     
};
export default passengerFunc;

