import { useState } from "react"
import React from "react";
import axios from "axios";

import { loadInitialData, loadStaticData } from "./landingMethod";

export default function LandingPage(props:any){

    const [query, setQuery] = useState('')
    const [finalQuery, setFinalQuery] = useState('')

    const [allStudent, setAllStudent] = useState<any[]>([])
    const [studentFilter, setStudentFilter] = useState<any[]>([])
    const [image, setImage] = useState<any[]>([])
    const [oneStudent, setOneStudent] = useState('')

    const [staticData, setStaticData] = useState<any[]>([])
    const [showStaticData, setShowStaticData] = useState<any[]>([])

    React.useEffect(() => {
        const loadAllData = async () => {
            const staticRes:any = await loadStaticData()
            setStaticData(staticRes)

            const allRes:any = await loadInitialData('allStudent')
            setAllStudent(allRes)
        }
        loadAllData()
    },[]);

    React.useEffect(() => {
        if (query != ''){
            const timeOutId = setTimeout(() => (
                setFinalQuery(query.toLowerCase())
            ), 750);
            return () => clearTimeout(timeOutId)
        }
    }, [query]);

    React.useEffect(()=>{
        const filterStudent = allStudent?.filter(
            (e)=>{
                return e.name.toLowerCase().includes(finalQuery)
            }
        )
        setStudentFilter(filterStudent.map((e)=>e.name))
    }, [finalQuery])

    React.useEffect(() => {
        if (oneStudent != ""){
            sessionStorage.setItem('oneStudent', oneStudent)
        }
    }, [oneStudent]);


    async function imageQuery(props:string){
        const imageApiURL = "https://danbooru.donmai.us/posts.json?tags="+props.split(" ").join("_")+"_(blue_archive)&limit=10"
        const res = await axios.get(imageApiURL);
        setImage(res.data)
        setOneStudent(props)
    }


    return(
        <div className="hero">
            {
                staticData?.map(
                    e=>{
                        return(
                            <img src={e.landingPage.heroImage} key={e.landingPage.heroImage} alt="..." className="w-screen h-72 object-cover brightness-75 relative" />
                        )
                    }
                )
            }
            <section className="hero-main flex flex-col text-center mx-32 my-14">
                <h4 className="text-5xl text-center">
                    <b>Find your waifu.</b>
                </h4>
                <p className="mt-2 tracking-widest text-center">
                    Search your beloved blue archive students here.
                </p>
                 <form className="mt-10" onSubmit={(e)=>e.preventDefault()}>
                    <input type="text" name="waifu" id="waifu" placeholder="Search here..." className="py-2 px-20 text-center text-lg font-light border-2 border-rose-300 rounded-full bg-neutral-50 focus:px-40 focus:scale-105 duration-200" onChange={(e) => setQuery(e.target.value)}/>
                 </form>
                
                <div className="taglist grid grid-cols-5 gap-4 mt-8">
                {
                    studentFilter?.slice(0,20).map(
                        (e)=>{
                            return(
                                <button key={e} className="text-sm rounded-full bg-white border text-neutral-800 hover:text-white hover:bg-neutral-500 p-2 break-words" onClick={()=>imageQuery(e.toLowerCase())}>{e}</button>
                            )
                        }
                    )
                }
                </div>

            </section>

            

            <section className="waifu px-24 py-10">
                <h4 className="text-4xl">
                    <b>Images</b>
                </h4>
                <p className="mt-2">
                    Your waifu should appear here.
                </p>

                <div className="imagelist grid-cols-3 grid gap-5 mt-8">

                {
                    image?.map(
                        (e)=>{
                            if(e.rating == "g" || e.rating == "s"){
                            return(
                                <a href={e.large_file_url} target="_blank" key={e.id}><img src={e.large_file_url} alt={e.id} className="border-2 border-rose-300 rounded-md h-80 w-full object-cover hover:shadow-rose-300 shadow-sm hover:scale-110 hover:cursor-pointer duration-200"/>
                                </a>
                            )
                            }
                        }
                    )
                }
                </div>

                <div className="toCategories mt-12 text-center">
                    <h4 className="text-xl">
                        <b>Want to know more about your student, {
                            oneStudent} ?</b>
                    </h4>
                    <a onClick={()=>{props.handlePage('customize')}} className="hover:cursor-pointer"><p className="bg-rose-300 p-2 mt-2 rounded-md hover:bg-rose-200 duration-200">Go here.</p></a>
                </div>
            </section>


            <section className="authorwaifu px-24 pb-10 pt-24" key="ada">
                <h4 className="text-3xl text-center">
                    <b>Personal preferences.</b>
                </h4>

                <div className="waifulist flex mx-40 mt-8">
                    {
                        staticData?.map(
                            e=>{
                                return(
                                    <div key={e} className="grid grid-cols-5 gap-4 mx-auto w-full">
                                    {e.landingPage.myWaifu.map(
                                        (b:any)=>{
                                            return(
                                                <img src={b.image} key={b.id} alt="..." className="w-full h-36 object-cover bg-white rounded-md shadow-md shadow-rose-300 hover:scale-105 hover:cursor-pointer duration-200"
                                                onClick={()=>setShowStaticData([{
                                                    "name":b.name,
                                                    "school":b.school,
                                                    "image":b.image,
                                                    "desc":b.desc,
                                                }])} />
                                            )
                                        }
                                    )}
                                    </div>
                                )
                            }
                        )
                    }
                </div>

                <p className="text-center mt-8">&#9711; &#9711;	&#9711;</p>

                    {
                        showStaticData?.map(
                            (e)=>{
                                return(
                                    <div key={e} className="mywaifu grid grid-cols-1 mt-8 border-2 border-rose-300 rounded-lg p-6">
                                        <div className="waifu w-full flex gap-10 items-center">
                                        <img src={e.image} alt="..." className="w-72 h-80 object-cover"/>
                                            <div className="desc">
                                                <h4 className="text-3xl font-semibold">{e.name}</h4>
                                                <p>{e.school}</p>
                                                <hr className="m-8"/>
                                                <p className="">{e.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
     
                    
                    

            </section>


        </div>
    )
}