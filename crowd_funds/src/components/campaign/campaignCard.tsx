import Image, { StaticImageData } from "next/image"

interface ICampaignProps {
    title: string;
    desc: string;
    img: StaticImageData;
}

const CampaignCard = ({ title, desc, img }: ICampaignProps) => {

    return (
        <div className="min-w-[300px] min-h-[300px] rounded-[15px] border-[1px] flex flex-col gap-[10px] overflow-hidden">
            {/* small banner */}
            <Image src={img} placeholder="blur" className="w-full h-[50%] object-cover cursor-pointer transition-[scale,500ms] hover:scale-[1.1]" alt="campaign-banner" />

            <article className="h-[50%] p-[10px] flex flex-col justify-between gap-[15px] w-full">
                <div className="flex flex-col gap-[5px]">
                    {/* campaign title */}
                    <h3 className="font-bold"> {title} </h3>
                    {/* campaign desc */}
                    <p> {desc} </p>
                </div>
                {/* donate button */}
                <button className="py-[5px] bg-[#fff] text-[#000] px-[10px] border-[1px] rounded-[15px] font-bold w-full"> Support </button>
            </article>
        </div>
    )
}

export default CampaignCard