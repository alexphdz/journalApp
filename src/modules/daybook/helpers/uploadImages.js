import axios from "axios"

export const uploadImage = async ( file ) =>  {
    if(!file) return 
    try{
        const formData = new FormData()
        formData.append('upload_preset','curso-vue')
        formData.append('file',file)

        const url = 'https://api.cloudinary.com/v1_1/hir-casa/image/upload'
        const {data} = await axios.post(url, formData)
        return data.secure_url

    } catch(err) {
        console.log('Error al cargar la imagen')
        console.log(err)
        return null
    }
}