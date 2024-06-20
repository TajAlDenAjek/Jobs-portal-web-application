export const jobSeekerObjectToForm=(obj:any)=>{
    return{
        ...obj,
        birthDate:obj?.birthDate?.substring(0,10) ?? ''
    }
}