import { getDownloadURL } from "firebase/storage";

// Saves the upload method in a promise
const uploadImageAsPromise = (task) => {
  return new Promise((resolve, reject) => {

    // The task is the uploadTask that return the method uploadImages (firebase/client.js)
    task.on('state_changed',
      // When the upload of the images is in progress this function is called
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },

      //If an error occurred while the image is uploaded then call the error function
      (error) => {
        console.log(error)
      },
      //successful uploaded, call this function
      () => {
        // Generate the downloadURL
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          // With the resolve return the downloadURL

          resolve({
            downloadURL,
            name: task["_metadata"].name,
          })

        });
      }
    );
  })
}

const getAllUrls = (tasks) => {

  const arrayImagesPromises = []

  tasks?.forEach(task => {
    // With the task I turn the uploaded method in a promise than resolve the downloadedURL and the name
    // the name is useful if i need delete the image. 
    const imagePromise = uploadImageAsPromise(task)
    arrayImagesPromises.push(imagePromise)
  })

  // No matter if tasks?.forEach doesnt execute because return an array, in this way the Promise.all in handleSubmit doesnt return error
  // and then the addDevit is executed
  return arrayImagesPromises
}

export { getAllUrls }
