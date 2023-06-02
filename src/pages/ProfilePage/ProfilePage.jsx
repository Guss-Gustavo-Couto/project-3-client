import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import userService from '../../services/user.service';

function EditProfilePage() {
    // Write State 
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    // req.params => Express 
    // useParams() => ReactJS

    const {userId} = useParams();

    const navigate = useNavigate();

    // Have a Side-Effect after initial rendering of component
    useEffect(()=>{
        userService.getUser(userId)
        .then((response)=>{
            const oneUser = response.data; 
            setName(oneUser.name);
            setDescription(oneUser.description);
        })
        .catch((error)=>{
            console.log(error)
        })

    }, [userId]);

    // Create a function that Handles Form Submit 
    const handleFormSubmit = (e)=>{
        // prevent the default action of the form => refreshing the page
        e.preventDefault();

        // store title, description that is going to be received
        // in ExpressJS as req.body.
        const requestBody = {name, description};      

        // make a PUT request to update the profile
       userService.updateUser(userId, requestBody)
             .then(()=>{
                navigate(`/profile/${userId}`)
             })
             .catch((error)=>{
                console.log(error)
             })
    }

  return (
    <div>
    <h3>Edit the Profile</h3>

    <form onSubmit={handleFormSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <label>Description:</label>
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Edit</button>
    </form>
  </div>    
  )
}

export default EditProfilePage