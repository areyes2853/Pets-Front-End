// src/components/PetDetail/PetDetail.jsx

const PetDetail = (props) => {
// src/components/PetDetail/PetDetail.jsx

if (!props.selected)
    return (
      <div className="details-container">
        <h1>NO DETAILS</h1>
      </div>
    );
  
  return (
    <div className="details-container">
      <h1>{props.selected.name}</h1>
      <h2>Breed: {props.selected.breed}</h2>
      <h2>
        Age: {props.selected.age} year{props.selected.age > 1 ? 's' : ''} old
      </h2>
      <img src={props.selected.img} alt={props.selected.name}/>
  
      <div className="button-container">
        <button onClick={() => props.handleFormView(props.selected)}>
          Edit Pet
        </button>
        <button onClick={() => props.handleDeletePet(props.selected._id)}>
          Delete Pet
        </button>
      </div>
    </div>
  );
  
  };
  
  export default PetDetail;
  