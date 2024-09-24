document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const form = document.getElementById('contact-form')
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNo = document.getElementById('phone-no').value;
    const programmingLanguage = document.getElementById('programming-language').value
    const message = document.getElementById('Tell me about yourself').value;
    const file = document.getElementById('file-resume').files[0]
    
    if (name && email && phoneNo && programmingLanguage && file) {
        if(file.type !== 'application/pdf'){
            alert('Please upload a valid file.');
            event.preventDefault();
            return;
        }

        const formData = new FormData()
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNo', phoneNo);
        formData.append('programmingLanguage', programmingLanguage);
        formData.append('message', message);
        formData.append('file', file);
        
        const response = await fetch(`http://localhost:4000/contact/createContact`,{
            method: 'POST',
                body: formData
            });

            const data = await response.json()
            console.log(data)

    } else {
        alert('Please fill in all fields before submitting.');
    }
});
