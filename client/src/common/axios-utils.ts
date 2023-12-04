import axios from 'axios'
import { API_URL } from '@/common/constants'

const axiosInstance = axios.create({ baseURL: API_URL })

export default axiosInstance
