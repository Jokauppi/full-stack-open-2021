import axios from "axios";
const dbUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(dbUrl)
    return request.then(response => response.data)
}

const add = (personObject) => {
    const request = axios.post(dbUrl, personObject)
    return request.then(response => response.data)
}

const remove = (personId) => {
    const request = axios.delete(`${dbUrl}/${personId}`)
    return request.then(response => response.data)
}

const update = (personObject) => {
    const request = axios.put(`${dbUrl}/${personObject.id}`, personObject)
    return request.then(response => response.data)
} 

const exports = { getAll, add, remove, update } 

export default exports