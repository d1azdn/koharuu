export default function UserNavbar(props:any){
    
    return(
        <nav>
            <ul className="border py-4 px-24 flex list-none gap-20 text-sm">
                <div className="navigation flex gap-16 me-auto items-center">
                    <li><a className="text-lg">
                        <b>koharuu</b>
                    </a></li>

                    <li><a className={(props.activePage == 'landing' ? 'text-rose-300' : '') + " hover:text-rose-300 p-1 duration-200 hover:cursor-pointer"} onClick={()=>{props.handlePage('landing')}}>
                        Introduction
                    </a></li>

                    <li><a className={(props.activePage == 'customize' ? 'text-rose-300' : '') + " hover:text-rose-300 p-1 duration-200 hover:cursor-pointer"} onClick={()=>{props.handlePage('customize')}}>
                        Customize
                    </a></li>
                    
                    <li><a className={(props.activePage == 'credit' ? 'text-rose-300' : '') + " hover:text-rose-300 p-1 duration-200 hover:cursor-pointer"} onClick={()=>{props.handlePage('credit')}}>
                        Credit
                    </a></li>
                </div>

                <div className="github flex items-center">
                <li><a href="https://github.com/d1azdn" target="_blank" className="bg-neutral-800 px-4 py-2 rounded-lg text-white hover:bg-neutral-700 duration-200">
                    See on github
                </a></li>
                </div>
            </ul>
        </nav>
    )
}