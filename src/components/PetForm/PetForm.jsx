// src/components/PetForm/PetForm.jsx

import { useState, useEffect } from 'react'; // Import useEffect

const PetForm = (props) => {
  const initialState = {
    name: '',
    age: '',
    breed: '',
    img: '', // Keep img in state for potential future use, but don't bind to file input value
  };

  // Use state for form data
  const [formData, setFormData] = useState(initialState);

  // Use useEffect to update form when 'selected' prop changes (for editing)
  useEffect(() => {
    if (props.selected) {
      // If editing, set form data to the selected pet's data
      setFormData({
        name: props.selected.name || '',
        age: props.selected.age || '',
        breed: props.selected.breed || '',
        img: props.selected.img || '', // Store existing img URL, but don't put in file input value
      });
    } else {
      // If adding a new pet, reset to initial state
      setFormData(initialState);
    }
    // Dependency array: run effect when props.selected changes
  }, [props.selected]);

  const handleChange = (evt) => {
    // Handle regular inputs
    if (evt.target.type !== 'file') {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
    } else {
      // Handle file input - Store the File object itself if needed for upload
      // For now, let's just update a different state or ignore for display purposes
      // If you need to upload the file, you'd typically handle evt.target.files[0]
      console.log('File selected:', evt.target.files[0]);
      // You might want state specifically for the selected file:
      // setSelectedFile(evt.target.files[0]);
      // Or update formData.img if you are replacing it immediately (less common)
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // IMPORTANT: If handling actual file uploads, you need to use FormData()
    // For now, assuming you're just sending the text data and potentially the old img URL
    const dataToSend = {
        name: formData.name,
        age: formData.age,
        breed: formData.breed,
        img: formData.img // Send the existing img URL or handle file upload separately
    };

    if (props.selected) {
      props.handleUpdatePet(dataToSend, props.selected._id);
    } else {
      props.handleAddPet(dataToSend);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Age Input */}
        <label htmlFor="age"> Age </label>
        <input
          id="age"
          name="age"
          type="number" // Good practice for age
          value={formData.age}
          onChange={handleChange}
          required
        />

        {/* Breed Input */}
        <label htmlFor="breed"> Breed </label>
        <input
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />

        {/* Image Input - REMOVED value attribute */}
        <label htmlFor="img"> Replace Image (Optional) </label>
        <input
          id="img"
          type="file"
          name="imgFile" // Use a different name to avoid conflict with img URL state?
          // value={formData.img} // <-- REMOVED THIS LINE
          onChange={handleChange}
          accept="image/*" // Good practice: specify accepted file types
        />
        {/* Optionally display the current image when editing */}
        {props.selected && formData.img && (
            <div>
                <p>Current Image:</p>
                <img src={formData.img} alt="Current Pet" style={{maxWidth: '100px', maxHeight: '100px'}} />
            </div>
        )}

        <button type="submit">{props.selected ? 'Update Pet' : 'Add New Pet'}</button>
      </form>
    </div>
  );
};

export default PetForm;