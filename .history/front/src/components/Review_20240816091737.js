import { Rating } from 'primereact/rating'
import { Avatar } from 'primereact/avatar'
import { ScrollPanel } from 'primereact/scrollpanel'
export default function Review(props) {
    
    const getLabelAvatar = (str) =>{
        if (str.length > 0) {
            return str.charAt(0)
        }
        return ''
    }

    return(
        <div className = "bg-white border p-4 rounded shadow">
            <div>
                <Rating value={props.rate} disabled cancel={false} className = "mb-3"
                    pt={{
                        onIcon:()=>({
                            style:{
                                "color":"#FFD700"
                            }
                        })
                    }}
                />
            </div>

            <ScrollPanel >
                <p className = "font-poppins text-sm">
                    {props.review}
                </p>
            </ScrollPanel>
            
            <div>
                <Avatar className = "border" image={props.userPhoto ? props.userPhoto : null} label={getLabelAvatar(props.username)} shape="circle" />
                <div className = "-mt-6 ms-12">
                    <p className = "text-xs font-medium">{props.username}</p>
                </div>
            </div>
        </div>
    )
}