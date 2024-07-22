async function loadAllStudent(){
    const fetchAllStudent = await fetch("https://api.ennead.cc/buruaka/character/")
    const convertAllStudent = await fetchAllStudent.json()
    sessionStorage.setItem('allStudent', JSON.stringify(convertAllStudent))
}

export async function loadStudentInfo(props:string){
            const fetchOneStudent = await fetch("https://api.ennead.cc/buruaka/character/"+props)
            const convertOneStudent = await fetchOneStudent.json()
            const convertOneStudentFlat = [convertOneStudent].flat() 
    sessionStorage.setItem('oneStudentInfo', JSON.stringify(convertOneStudentFlat))

            const oneStudentSchool = convertOneStudentFlat?.map((e:any)=>{return e.info.school})
            const fetchOneStudentSchoolmate = await fetch("https://api.ennead.cc/buruaka/character/query?school="+oneStudentSchool)
            const convertOneStudentSchoolmate = await fetchOneStudentSchoolmate.json()
    sessionStorage.setItem('oneStudentSchoolmate', JSON.stringify(convertOneStudentSchoolmate))

}

export default async function initialDataSetter(){
    if (!sessionStorage.getItem('currentPage') || !sessionStorage.getItem('oneStudentInfo')|| !sessionStorage.getItem('allStudent')) {
        sessionStorage.setItem('currentPage', 'landing')

        sessionStorage.setItem('oneStudent', 'koharu')
        
        loadAllStudent()

        loadStudentInfo('koharu')
      }
}