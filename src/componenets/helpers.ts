export const jobSeekerObjectToForm=(obj:any)=>{
    return{
        ...obj,
        birthDate:obj?.birthDate?.substring(0,10) ?? '',
        password:'',
    }
}
export const CompanyObjectToForm=(obj:any)=>{
    return{
        ...obj,
        password:'',
    }
}