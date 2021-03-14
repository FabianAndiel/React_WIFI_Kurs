import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';

import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef(); //Referenz zu einem Objekt im DOM aufbauen

  // diesen Effekt immer dann ausführen, wenn sich der File ändert
  useEffect(() => {
    // Preview generieren
    // wenn kein gültiger File dann Funktion beenden
    if (!file) {
      return;
    }
    // Preview-URL mit eingebautem Filereader-Objekt erzeugen
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    // console.log(event.target);
    // check ob sich 1 File in der Auswahl befindet
    let pickedFile;
    let fileIsValid = isValid; //Extra-Variable, weil der mit setState der Status zeitverzögert upgedatet wird!
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    // wir nehmen an, dass diese Callback-Funktion onInput übermittelt wird
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click(); //current ist total wichtig!!!!!
  };

  return (
    <div className='form-control'>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={pickedHandler}
      ></input>
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
