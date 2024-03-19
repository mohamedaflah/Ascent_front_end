
import Image from '../../assets/IMG 3.png'
import { Button } from '@/shadcn/ui/button'
export function JobCompanyCard(){
    return(
        <div className="w-full h-32 border  flex justify-center items-center">
            <div className="w-[95%] h-[80%] flex justify-between">
                <div className="flex items-start w-44  ">
                    <img src={Image} alt="" className='h-16  sm:h-20 object-cover rounded-full ' />
                </div>
                <div className='w-full flex flex-col justify-between'>
                    <div>
                        <h1 className='text-lg md:text-2xl font-semibold'>Social Media Assistant</h1>
                    </div>
                    <div>
                        <h3 className='text-textPrimary'>Nomad Paris Frans</h3>
                    </div>
                    <div className='flex gap-2 md:gap-5'>
                        <div className='min-w-20 md:w-28 h-8 rounded-full flex items-center justify-center p-2  border-[1px] border-green-500 text-green-500'>
                            Full time
                        </div>
                        <div className='h-full w-[1px] dark:bg-backgroundAccent bg-textPrimary/15'/>
                        <div className='min-w-20 md:min-w-28 h-8 rounded-full flex items-center justify-center p-2  border-[1px] border-yellow-500 text-yellow-500'>
                            Marketing
                        </div>
                        <div className='min-w-20 md:min-w-28 h-8 rounded-full flex items-center justify-center p-2  border-[1px] border-blue-500 text-blue-500'>
                            Design
                        </div>
                    </div>
                </div>
                <div className='w-60 flex flex-col items-center  gap-2'>
                    <Button className='rounded-none md:w-32 w-28'>Apply</Button>
                    <div className='bg-gray-300 h-2 md:w-32 w-28'>
                        <div className='h-full w-[60%] bg-green-600'/>
                    </div>
                    <div className='flex tex-sm'>
                        <span className='font-semibold'>5 applied </span> <span>{" "} of 10</span>
                    </div>
                </div>
            </div>
        </div>
    )
}