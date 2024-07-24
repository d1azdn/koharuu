import React from "react"
import { useState } from "react"
import { loadStudentInfo } from "../../initialDataLoad"

export default function CustomizePage(){
    const [studentName, setStudentName] = useState('')
    const [studentSchool, setStudentSchool] = useState('')
    const [studentInfo, setStudentInfo] = useState<any[]>([])
    const [studentSchoolmate, setStudentSchoolmate] = useState<any[]>([])

    React.useEffect(()=>{
        setStudentName(sessionStorage.getItem('oneStudent') as string)
    },[])
    
    React.useEffect(()=>{
        const prevStudentName = JSON.parse(sessionStorage.getItem('oneStudentInfo') as string)

        if (studentName == '') return

        if (studentName == prevStudentName[0].character.name.toLowerCase()){
            setStudentSchoolmate(JSON.parse(sessionStorage.getItem('oneStudentSchoolmate') as any))
            setStudentInfo(JSON.parse(sessionStorage.getItem('oneStudentInfo') as string))
        } else {
            const loadAllData = async () => {
                const staticRes:any = await loadStudentInfo(studentName)
                console.log(staticRes)
                setStudentSchoolmate(JSON.parse(sessionStorage.getItem('oneStudentSchoolmate') as any))
                setStudentInfo(JSON.parse(sessionStorage.getItem('oneStudentInfo') as string))
            }
            loadAllData()
        }
    }, [studentName])


    React.useEffect(()=>{
        if (studentInfo.length > 0){
            const findStudentSchool:any = studentInfo?.map(
                e=>{return e.info.school}
            )
            setStudentSchool(findStudentSchool as string)
            
        }
    },[studentInfo])


    return(
        <div className="customize">

            <section className="studentInfo mx-32 my-24">
            {
                studentInfo?.map(
                    e=>{
                        return(
                            <div key={e.id} className="justify-center flex flex-row gap-10 border border-rose-300 shadow-md shadow-rose-300 py-6 px-14 rounded-lg">

                            <div className="images w-1/3">
                                <img src={e.image.icon} alt="..." className="w-full h-96 object-cover"/>
                                <p className="text-xs text-center mt-2">Lowres img because the API is slow.</p>
                            </div>

                            <div className="desc w-2/3">
                                <h4 className="text-4xl">{e.character.name}</h4>
                                <p className="mt-2 mb-4">{e.info.school} - Club {e.info.club}</p>
                                <hr className="m-6"/>
                                <p>{e.character.profile}</p>
                                <div className="role grid-cols-3 grid border-2 rounded-xl p-4 me-6 gap-5 border-rose-300 mt-8 place-items-center text-center">
                                    <p><b>{e.character.baseStar} Stars {e.character.rarity}</b></p>
                                    <p><b>{e.character.armorType} (Armor)</b></p>
                                    <p><b>{e.character.bulletType} (Damage)</b></p>
                                    <p>{e.character.position} (Position)</p>
                                    <p>{e.character.role} (Role)</p>
                                    <p>{e.character.squadType} (Squad)</p>
                                </div>
                            </div>

                            </div>
                        )
                    }
                )
            }
                
                
            </section>

            <section className="student mx-32 mt-20 mb-8">
                <h4 className="text-2xl font-semibold">Student with same school : {studentSchool}</h4>
                <div className="studentList grid grid-cols-3 gap-4 mt-6">
                    {
                        studentSchoolmate?.map(
                            e=>{return(
                                <a href="#" key={e.name} className="border p-4 text-center hover:border-rose-300 hover:scale-105 hover:shadow-rose-300 shadow-md shadow-neutral-200 rounded-xl duration-200" onClick={()=>setStudentName(e.name)}>{e.name}</a>
                            )}
                        )
                    }
                </div>
            </section>

        </div>
    )
}