import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-5e083-default-rtdb.firebaseio.com/',
})

export default journalApi