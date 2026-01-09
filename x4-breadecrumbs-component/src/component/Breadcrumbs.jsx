import React, { memo, useEffect } from 'react'
import { Link, useLocation } from "react-router"


const Breadcrumbs = () => {
    const location = useLocation();
    let path = location?.pathname?.split("/").filter(val => val);
    // console.log(location?.pathname?.split("/").filter(val=>val))
    let BreadCrumbsPath = "";
    return (
        <>
            <div className={` pl-12 gap-2 py-4 w-full bg-gray-100 m-h-[48px]`}>

                {path.length > 0 &&

                    (
                        <>

                            <Link to={"/"} className='text-blue-500'>Home</Link>

                            {
                                path.map((val, idx) => {
                                    BreadCrumbsPath += `/${val}`;

                                    let isLast = idx == path.length - 1 ? true : false;
                                    return isLast ? <span className='text-gray-500 '>{">" + val}</span> : <Link to={BreadCrumbsPath}><span className='text-blue-500 '>{">" + val}</span></Link>

                                })
                            }
                        </>

                    )
                }



            </div>

        </>
    )
}

export default memo(Breadcrumbs)