const baseURL = 'https://62df4c989c47ff309e83c999.mockapi.io';




class Student {
    constructor(firstName, lastName,studentEmail) {
    this.firstName = firstName
    this.lastName = lastName        
    this.studentEmail = studentEmail

    }

////////////////////////       CREATE           ///////////////////////////////////

    createNewStudent() {
        return fetch(`${baseURL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "firstName": `${this.firstName}` ,
                "lastName": `${this.lastName}` ,
                "studentEmail": `${this.studentEmail}`
            })
        }).then (res => res.json())
    }

////////////////////         UPDATE                  ////////////////////////////////

    updateStudent(id) {
        
        fetch(`${baseURL}/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "firstName": `${this.firstName}` ,
                "lastName": `${this.lastName}` ,
                "studentEmail": `${this.studentEmail}`
            })
        }).then (res => res.json())
          
    }
 
//////////////////                  READ                //////////////////////////
    readStudent() {
        fetch(`${baseURL}/students`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (err) {
            console.log('error: ' + err);
        })
         
    }


////////////////////            DELETE           ///////////////////////////////////

    deleteStudent() {
        
        fetch(`${baseURL}/students/${this.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then (res => res.json())
    }

    
}
const student1 = new Student('Ryan', 'Singleton','ryanbsingleton3@yahoo.com')
const student2 = new Student('Alyssa', 'Singleton','alyssa.singleton18@yahoo.com' )

let form = document.querySelector('#form');
let first = document.querySelector("input[placeholder = 'First Name']")
let last = document.querySelector("input[placeholder = 'Last Name']")
let email = document.querySelector("input[placeholder = 'Email']")

let newStudent;  
// student1.readStudent('10')  



studentsArray = []

function submitData() {
    let firstName = first.value
    let lastName = last.value
    let studentEmail = email.value
    let newStudent = new Student(firstName,lastName,studentEmail)
        studentsArray.push(newStudent)
        newStudent.createNewStudent()
        .then(student => {
            console.log(student)
            let table = document.getElementById('list');
            let row = table.insertRow(-1);
            row.setAttribute('id', `item-${student.id}`);
            row.dataset.id = student.id
            row.insertCell(0).innerHTML = student.firstName
            row.insertCell(1).innerHTML = student.lastName
            row.insertCell(2).innerHTML = student.studentEmail
            row.insertCell(3).innerHTML = student.id
            row.insertCell(4).appendChild(createDeleteButton(student.id))
            newStudent.id = student.id
        })
        document.getElementById('create-student-form').reset();    
}

// form.addEventListener('submit', (e) => {
//    let anything = null 
// })


function getAllStudents() {
    fetch(`${baseURL}/students`)
        .then (res => res.json())
        .then( res => console.log(res))

}


//////////////////// Delete Onclick Function //////////////////////////////////
document.getElementById('list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        for (let student of studentsArray) { // for of loops return the value, whereas for in loops return the index
            if (e.target.dataset.id == student.id) { // if the id of the delete button equals the student ID
                // let table = document.getElementById('list')
                // let currentRow = student.id
                let td = e.target.parentNode
                let tr = td.parentNode
                tr.parentNode.removeChild(tr)
                // table.deleteRow(currentRow)  ---- This could be used in place of lines 152-154, but the student ID's are not always the same as the row indexes
                student.deleteStudent()  // calls on the deleteStudent method to delete the student from the API
                let studentIndex = studentsArray.indexOf(student) // finds the index of the current student in studentArray
                studentsArray.splice(studentIndex, 1) // deletes that student from studentArray
                
                
               
                
                // delete the row by its ID, delete data from API and array
                // search table for row that matches the student ID XXXXXXXXXX
                // use deleteRow() to delete the row. Must know index of row to delete it.XXXXXXX
                // deleteStudent() can be called to delete from the API
                // use splice(start, 1) method to delete from studentsArray
            }
        }        
        // student.deleteStudent()
        // .then(res => {
        //     console.log(res)
        // })
    }
})



//////////////////// Update ad Replace Onclick Function //////////////////////////////////

document.getElementById('update').addEventListener('click', (e) => {
    // rename the update student form label id's to be different from the create student form label id's and make them new variables in the js file
    // call on them as "newEmail = document.getElementById('New-Email').value" for all of them

    let formID = document.querySelector("input[placeholder = 'Student ID']")
    let newFirstName = document.querySelector("input[placeholder = 'New First Name']")
    let newLastName = document.querySelector("input[placeholder = 'New Last Name']")
    let newEmail = document.querySelector("input[placeholder = 'New Email']")
    formID = formID.value
    newFirstName = newFirstName.value
    newLastName = newLastName.value
    newEmail = newEmail.value
    
    for (let student of studentsArray) { 
        if (student.id == formID) {
            firstName = newFirstName
            lastName = newLastName
            studentEmail = newEmail
            let newStudent = new Student(firstName,lastName,studentEmail)

            let studentIndex = studentsArray.indexOf(student) // finds the index of the current student in studentArray
            studentsArray.splice(studentIndex, 1, newStudent) // replaces the old student with the updated student instance
            newStudent.updateStudent(student.id)

            
            let rowID = document.getElementById(`item-${student.id}`)
            let td0 = rowID.childNodes[0]
            let td1 = rowID.childNodes[1]
            let td2 = rowID.childNodes[2]
            let td3 = rowID.childNodes[3]
            if (student.id == td3.innerHTML) {
                td0.innerHTML = `${newStudent.firstName}`
                td1.innerHTML = `${newStudent.lastName}`
                td2.innerHTML = `${newStudent.studentEmail}`
            }
        }


        // find out if the student ID inputted in the form matches any student ID already in the list/API XXXXXXXX
        // create a variable for the new student ID ie let newID = formID  XXXXXXX
        // 
        // replace the old student ID with the new one in studentsArray with the splice method (splice(index, 1, newID)) XXXXXX
        // update the table with the new student ID  XXXXXX
        // call on the updateStudent method for it to update in the API and pass the old ID in url XXXXXXX

        

    }
    document.getElementById('update-student-form').reset(); 
    console.log(studentsArray)
    getAllStudents()
})


console.log(studentsArray)




///////////////////////////////////////////////////////////////////////////
// student1.createNewStudent();
// student2.createNewStudent();
// getAllStudents();
// let tableID = 0;

// document.getElementById('add').addEventListener('click', () => {
//     let table = document.getElementById('list');
//     let row = table.insertRow(1);
    
//     // let updateButton = row.insertCell(3);
//     // updateButton.appendChild(createUpdateButton(id++))
//     // document.getElementById('First-Name').value = first.value
//     // document.getElementById('Last-Name').value = last.value
//     // document.getElementById('Email').value = email.value
    
//     let deleteButton = row.insertCell(4);
//     deleteButton.appendChild(createDeleteButton(tableID++))
//     document.getElementById('First-Name').value = '';
//     document.getElementById('Last-Name').value = '';
//     document.getElementById('Email').value = '';


    

// })

function createDeleteButton(id) {
    let deleteBTN = document.createElement('button');
    deleteBTN.className = 'btn btn-danger delete-button';
    deleteBTN.dataset.id = id
    // deleteBTN.id = id;
    deleteBTN.innerHTML = 'Delete';
    // deleteBTN.onclick = () => {
    //     console.log(`Deleting row with id: item-${tableID}.`)
    //     let elementToDelete = document.getElementById(`item-${tableID}`);
    //     elementToDelete.parentNode.removeChild(elementToDelete)
    // };
    return deleteBTN;
}

// function createUpdateButton(id) {
//     let updateBTN = document.createElement('button');
//     updateBTN.className - 'btn btn-primary';
//     updateBTN.id = id;
//     updateBTN.innerHTML = 'Update';
//     updateBTN.onclick = () => {
//         console.log(`Updating row with id: item-${id}.`)
//         let elementToUpdate = document.getElementById(`item-${id}`);
//         elementToUpdate.parentNode.removeChild(elementToUpdate);
//     };
//     return updateBTN;
// }