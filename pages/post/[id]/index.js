import { useRouter } from "next/router"

const Post = () => {

    //Simple example of the useRouter hook to obtain a parameter from the url
    const router = useRouter()
    const { id } = router.query

    return(
        <>
            <p>El id del post es: {id}</p>
        </>
    )
}

export default Post