import axios from 'axios'
import { API_URL } from '@/common/constants'
import { IRegisterAuth } from '@/interfaces/auth.interfaces'

const axiosInstance = axios.create({ baseURL: API_URL })

export default axiosInstance
