import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const remove = (personId) => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

const update = (personObject) => {
    const request = axios.put(`${baseUrl}/${personObject.id}`, personObject)
    return request.then(response => response.data)
} 

const exports = { getAll, add, remove, update } 

export default exports