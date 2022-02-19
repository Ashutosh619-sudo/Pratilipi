export async function getContent() {
    const response = await fetch("http://localhost:8001/content",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const res = await response.json()
    if(response.status === 200){
        return res
    }
}

export async function likeContent(user_id,content_id){
    console.log(user_id,content_id)
    const response = await fetch(`http://localhost:8000/users/validate-user/${user_id}`,
            {method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({content_id:content_id,user_id:user_id})
            })
    return response

}   
