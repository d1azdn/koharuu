export async function loadStaticData(){
    const fetchStaticData = await fetch('./data.json')
    const convertStaticData = await fetchStaticData.json()
    return convertStaticData
}

export function loadInitialData(props:string){
    switch (props){
        case 'allStudent' : return JSON.parse(sessionStorage.getItem('allStudent') as string)
        case 'oneStudent' : return sessionStorage.getItem('oneStudent')
        case 'oneStudentInfo' : return sessionStorage.getItem('oneStudentInfo')
        case 'oneStudentSchoolmate' : return sessionStorage.getItem('oneStudentSchoolmate')
    }
}
