import data from "@emoji-mart/data"
import Picker from '@emoji-mart/react'
interface ChildProp {
    setText: React.Dispatch<React.SetStateAction<string>>;
  }
export const  EmojiPicker=({setText}:ChildProp)=>{
    return(
        <Picker data={data} onEmojiSelect={(e:{native:string})=>setText((prev)=>`${prev}${e.native}`)}/>
    )
}