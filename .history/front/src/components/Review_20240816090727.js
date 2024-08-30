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
        <div >
            <div>
                <Rating value={props.rate} disabled cancel={false}
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
                <p>
                    {props.review}
                </p>
            </ScrollPanel>
            
            <div>
                <Avatar className = "border" image={props.userPhoto ? props.userPhoto : null} label={getLabelAvatar(props.username)} size="large" shape="circle" />
                <div>
                    <span>{props.username}</span>
                </div>
            </div>
        </div>
    )
}